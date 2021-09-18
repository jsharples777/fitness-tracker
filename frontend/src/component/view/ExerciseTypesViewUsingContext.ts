import AbstractStatefulCollectionView from "../../ui-framework/view/implementation/AbstractStatefulCollectionView";
import {CollectionViewDOMConfig, KeyType, Modifier} from "../../ui-framework/ConfigurationTypes";
import {DRAGGABLE, STATE_NAMES, VIEW_NAME} from "../../AppTypes";
import {ListViewRenderer} from "../../ui-framework/view/renderer/ListViewRenderer";
import Controller from "../../Controller";
import {isSameMongo} from "../../util/EqualityFunctions";
import {CollectionViewListener} from "../../ui-framework/view/interface/CollectionViewListener";
import { CollectionView } from "../../ui-framework/view/interface/CollectionView";
import { View } from "../../ui-framework/view/interface/View";
import {FIELD_CreatedBy} from "../../model/BasicObjectDefinitionFactory";

import debug from 'debug';
import {StateManager} from "../../state/StateManager";
import {ContextualInformationHelper} from "../../context/ContextualInformationHelper";
import {ListViewRendererUsingContext} from "../../ui-framework/view/renderer/ListViewRendererUsingContext";
import {CollectionViewEventHandlerDelegateUsingContext} from "../../ui-framework/view/delegate/CollectionViewEventHandlerDelegateUsingContext";
import {CollectionViewListenerForwarder} from "../../ui-framework/view/delegate/CollectionViewListenerForwarder";

const logger = debug('exercise-types-view');

export class ExerciseTypesViewUsingContext extends AbstractStatefulCollectionView implements CollectionViewListener {

    private static DOMConfig: CollectionViewDOMConfig = {
        viewConfig: {
            resultsContainerId: 'exerciseTypes',
            dataSourceId: VIEW_NAME.exerciseTypes,
        },
        resultsElementType: 'a',
        resultsElementAttributes: [{name: 'href', value: '#'}],
        resultsClasses: 'list-group-item my-list-item truncate-notification list-group-item-action',
        keyId: '_id',
        keyType: KeyType.string,
        modifiers: {
            normal: '',
            inactive: 'list-group-item-light',
            active: 'list-group-item-primary',
            warning: ''
        },
        icons: {
            normal: '',
            inactive: '',
            active: '',
            warning: ''
        },
        detail: {
            containerClasses: 'd-flex w-100 justify-content-between',
            textElementType: 'span',
            textElementClasses: 'mb-1',
            select: true,
            icons:(name:string,item:any) => {
                if (item.type) {
                    if (item.type === 'cardio') {
                        return ['fas fa-running ml-2'];
                    }
                    else {
                        return ['fas fa-dumbbell ml-2'];
                    }
                }
                return [];
            },
            delete: {
                buttonClasses: 'btn bg-danger text-white btn-circle btn-md',
                iconClasses: 'text-black fas fa-trash-alt',
                attributes:[{name:'data-toggle',value:"tooltip"},{name:'data-placement',value:"right"},{name:'title',value:"Delete this exercise type."}]
            },
            drag: {
                type: DRAGGABLE.typeExerciseType,
                from: DRAGGABLE.fromExerciseTypes
            }
        },
        extraActions: [{
            name: 'addToWorkout',
            buttonClasses:'btn bg-primary text-white btn-circle btn-md mr-1',
            iconClasses:'fas fa-arrow-alt-circle-right',
            attributes:[{name:'data-toggle',value:"tooltip"},{name:'data-placement',value:"right"},{name:'data-html',value:'true'},{name:'title',value:"Add this <strong>exercise</strong> to the current workout."}]
        }]
    };


    constructor(stateManager:StateManager) {
        super(ExerciseTypesViewUsingContext.DOMConfig, stateManager, STATE_NAMES.exerciseTypes);
        this.renderer = new ListViewRendererUsingContext(this, this);
        this.eventHandlerDelegate = new CollectionViewEventHandlerDelegateUsingContext(this,<CollectionViewListenerForwarder>this.eventForwarder);
        this.getIdForItemInNamedCollection = this.getIdForItemInNamedCollection.bind(this);
        this.getItemId = this.getItemId.bind(this);
        ContextualInformationHelper.getInstance().addContextFromView(this,STATE_NAMES.exerciseTypes,'Exercise Types');
    }

    getItemDescription(from: string, item: any): string {
        let buffer = '';
        buffer += '<strong>' + item.name + '</strong>: ';
        if (item.type === 'cardio') {
            buffer += item.distance + ' km in ' + item.duration;
        }
        else {
            buffer += item.sets + ' sets of ' + item.reps + ' reps in ' + item.duration;
        }
        buffer += '<br/>';
        return buffer;
    }


    canDeleteItem(view: View, selectedItem: any): boolean {
        logger(`Can Delete ${selectedItem}`);
        logger(selectedItem[FIELD_CreatedBy]);
        if (selectedItem[FIELD_CreatedBy]) {
            if (selectedItem[FIELD_CreatedBy] === Controller.getInstance().getLoggedInUsername()) {
                return true;
            }
        }
        return false;
    }

    compareItemsForEquality(item1:any, item2:any) :boolean {
        return isSameMongo(item1,item2);
    }

    getIdForItemInNamedCollection(name: string, item: any) {
        return item._id;
    }

    renderDisplayForItemInNamedCollection(containerEl: HTMLElement, name: string, item: any): void {
        containerEl.innerHTML =  item.name;
    }

    hasPermissionToDeleteItemInNamedCollection(name: string, item: any): boolean {
        logger(`Has delete permission ${item}`);
        logger(item[FIELD_CreatedBy]);
        if (item[FIELD_CreatedBy]) {
            if (item[FIELD_CreatedBy] === Controller.getInstance().getLoggedInUsername()) {
                return true;
            }
        }
        return false;
    }

    itemAction(view: View, actionName: string, selectedItem: any) {
        super.itemAction(view, actionName, selectedItem);
        // @ts-ignore
        if (actionName === ExerciseTypesViewUsingContext.DOMConfig.extraActions[0].name) {
            // add the exercise type the current workout
            Controller.getInstance().addExerciseToCurrentWorkout(selectedItem);
        }
    }


}

