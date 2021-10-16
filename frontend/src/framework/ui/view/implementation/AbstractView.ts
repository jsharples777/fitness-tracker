import {DRAGGABLE_FROM, DRAGGABLE_KEY_ID, DRAGGABLE_TYPE, ViewDOMConfig} from "../../ConfigurationTypes";
import {View} from "../interface/View";
import debug from "debug";
import {ViewListenerForwarder} from "../delegate/ViewListenerForwarder";
import {ViewListener} from "../interface/ViewListener";

const avLogger = debug('abstract-view-ts');
const avLoggerDetails = debug('abstract-view-ts-detail');


export abstract class AbstractView implements View {

    public static DATA_SOURCE = 'data-source';


    protected uiConfig: ViewDOMConfig;

    protected eventForwarder: ViewListenerForwarder;
    protected containerEl: HTMLElement | null = null;
    protected viewEl: HTMLElement | null;


    protected constructor(uiConfig: ViewDOMConfig) {
        this.uiConfig = uiConfig;
        this.viewEl = null;
        this.eventForwarder = new ViewListenerForwarder();

        this.handleDrop = this.handleDrop.bind(this);

    }

    getItemId(from: string, item: any): string {
        throw new Error("Method not implemented.");
    }

    getItemDescription(from: string, item: any): string {
        throw new Error("Method not implemented.");
    }


    hasActionPermission(actionName: string, from: string, item: any): boolean {
        throw new Error("Not implemented");
    }

    getUIConfig(): ViewDOMConfig {
        return this.uiConfig;
    }


    addEventListener(listener: ViewListener) {
        this.eventForwarder.addListener(listener);
    }

    onDocumentLoaded(): void {
        this.viewEl = document.getElementById(this.uiConfig.resultsContainerId);
        this.eventForwarder.documentLoaded(this);
    }


    setContainedBy(container: HTMLElement): void {
        this.containerEl = container;
    }


    getName(): string {
        return this.uiConfig.dataSourceId;
    }


    hasChanged(): boolean {
        return false;
    }

    getDataSourceKeyId(): string {
        return AbstractView.DATA_SOURCE;
    }

    abstract hidden(): void

    abstract show(): void;

    abstract render(): void;

    public handleDrop(event: Event): void {
        avLogger(`view ${this.getName()}: drop event`);
        avLoggerDetails(event.target);
        // @ts-ignore
        const draggedObjectJSON = event.dataTransfer.getData(DRAGGABLE_KEY_ID);
        const draggedObject = JSON.parse(draggedObjectJSON);
        avLoggerDetails(draggedObject);

        // check to see if we accept the dropped type and source
        const droppedObjectType = draggedObject[DRAGGABLE_TYPE];
        const droppedObjectFrom = draggedObject[DRAGGABLE_FROM];
        avLogger(`view ${this.getName()}: drop event from ${droppedObjectFrom} with type ${droppedObjectType}`);
        if (this.uiConfig.drop) {
            const acceptType = (this.uiConfig.drop.acceptTypes.findIndex((objectType) => objectType === droppedObjectType) >= 0);
            let acceptFrom = true;
            if (acceptType) {
                if (this.uiConfig.drop.acceptFrom) {
                    acceptFrom = (this.uiConfig.drop.acceptFrom.findIndex((from) => from === droppedObjectFrom) >= 0);
                }
                avLoggerDetails(`view ${this.getName()}: accepted type? ${acceptType} and from? ${acceptFrom}`);
                if (acceptType && acceptFrom) {
                    this.eventForwarder.itemDropped(this, draggedObject);
                }
            }
        }
    }

}
