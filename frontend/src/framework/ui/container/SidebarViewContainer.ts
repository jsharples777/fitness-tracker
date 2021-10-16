import {SidebarLocation, SidebarPrefs, SidebarViewConfig} from "../ConfigurationTypes";
import {View} from "../view/interface/View";
import {CollectionViewListener} from "../view/interface/CollectionViewListener";
import debug from 'debug';
import {CollectionView} from "../view/interface/CollectionView";

const sbvcLogger = debug('sidebar-container');

export class SidebarViewContainer implements CollectionViewListener {
    protected prefs: SidebarPrefs;
    protected views: View[];

    public constructor(prefs: SidebarPrefs) {
        this.prefs = prefs;
        this.views = [];
        // event handlers
        this.eventHide = this.eventHide.bind(this);
        this.eventShow = this.eventShow.bind(this);
    }

    public addView(view: View, config: SidebarViewConfig) {
        sbvcLogger(`Adding view to container, with containing div of ${config.containerId}`);
        const viewContainer = document.getElementById(config.containerId);
        if (viewContainer) {
            sbvcLogger(`Adding view to container, with containing div of ${config.containerId} - FOUND`);
            view.setContainedBy(viewContainer);
        }
        this.views.push(view);
        view.addEventListener(this);
    }


    public onDocumentLoaded() { // this should be called once at startup
        // hide the side bar panel
        this.eventHide(null);

        // add the event listener for the close button
        const sidePanelEl = document.getElementById(this.prefs.id);
        if (sidePanelEl === null) return;

        const closeButtonEl = sidePanelEl.querySelector('.close');
        if (closeButtonEl) {
            closeButtonEl.addEventListener('click', this.eventHide);
        }

        this.views.forEach((view) => {
            view.onDocumentLoaded();
        })
    }

    public eventHide(event: Event | null) {
        if (event) event.preventDefault();
        this.showHide('0%');
        this.views.forEach((view) => {
            view.hidden();
        })
    }

    public eventShow(event: Event | null) {//414,768,1024
        let size = this.prefs.expandedSize;
        if (window.outerWidth < 769) {
            size = '50%';
        }
        if (window.outerWidth < 415) {
            size = '100%';
        }
        this.showHide(size);
    }

    documentLoaded(view: View): void {
    }

    itemAction(view: View, actionName: string, selectedItem: any): void {
    }

    canDeleteItem(view: View, selectedItem: any): boolean {
        return true;
    }

    itemDeleted(view: View, selectedItem: any): void {
    }

    itemDragStarted(view: View, selectedItem: any): void {
    }

    itemSelected(view: View, selectedItem: any): void {
    }

    itemDeselected(view: View, selectedItem: any): void {
    }

    itemDropped(view: View, droppedItem: any): void {
    }

    showRequested(view: View): void {
        this.eventShow(null);
    }

    /*
      Contained views can request show and hide of the sidebar container
     */

    hideRequested(view: View): void {
        this.eventHide(null);
    }

    canSelectItem(view: CollectionView, selectedItem: any): boolean {
        return true;
    }

    private showHide(newStyleValue: string): void {
        const sidePanelEl = document.getElementById(this.prefs.id);
        if (sidePanelEl === null) return;

        switch (this.prefs.location) {
            case SidebarLocation.left: {
                sidePanelEl.style.width = newStyleValue;
                break;
            }
            case SidebarLocation.right: {
                sidePanelEl.style.width = newStyleValue;
                break;
            }
            case SidebarLocation.bottom: {
                sidePanelEl.style.height = newStyleValue;
                break;
            }
            case SidebarLocation.top: {
                sidePanelEl.style.height = newStyleValue;
                break;
            }
        }
    }


}

