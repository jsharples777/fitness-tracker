import {DRAGGABLE, STATE_NAMES, VIEW_NAME} from "../../AppTypes";

import Controller from "../../Controller";


import debug from 'debug';
import {
    AbstractStatefulCollectionView,
    CollectionViewDOMConfig,
    CollectionViewEventHandlerDelegateUsingContext,
    CollectionViewListener,
    CollectionViewListenerForwarder,
    ContextDefinition,
    ContextualInformationHelper,
    FIELD_CreatedBy,
    isSameMongo,
    KeyType,
    ListViewRendererUsingContext,
    StateManager,
    View
} from "ui-framework-jps";


const logger = debug('exercise-types-view');

export class ExerciseTypesViewUsingContext extends AbstractStatefulCollectionView implements CollectionViewListener {

    private static DOMConfig: CollectionViewDOMConfig = {
        viewConfig: {
            resultsContainerId: 'exerciseTypes',
            dataSourceId: VIEW_NAME.exerciseTypes,
        },
        resultsElement: {
            type: 'a',
            attributes: [{name: 'href', value: '#'}],
            classes: 'list-group-item my-list-item truncate-notification list-group-item-action',
        },
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
            textElement: {
                type: 'span',
                classes: 'mb-1',
            },
            select: true,
            delete: {
                classes: 'btn bg-danger text-white btn-circle btn-md',
                iconClasses: 'text-black fas fa-trash-alt',
                attributes: [{name: 'data-toggle', value: "tooltip"}, {
                    name: 'data-placement',
                    value: "right"
                }, {name: 'title', value: "Delete this exercise type."}]
            },
            drag: {
                type: DRAGGABLE.typeExerciseType,
                from: DRAGGABLE.fromExerciseTypes
            }
        },
        extraActions: [{
            name: 'addToWorkout',
            button: {
                classes: 'btn bg-primary text-white btn-circle btn-md mr-1',
                iconClasses: 'fas fa-arrow-alt-circle-right',
                attributes: [{name: 'data-toggle', value: "tooltip"}, {
                    name: 'data-placement',
                    value: "right"
                }, {name: 'data-html', value: 'true'}, {
                    name: 'title',
                    value: "Add this <strong>exercise</strong> to the current workout."
                }]
            },
            confirm:false
        }]
    };


    constructor(stateManager: StateManager) {
        super(ExerciseTypesViewUsingContext.DOMConfig, stateManager, STATE_NAMES.exerciseTypes);
        this.renderer = new ListViewRendererUsingContext(this, this);
        this.eventHandlerDelegate = new CollectionViewEventHandlerDelegateUsingContext(this, <CollectionViewListenerForwarder>this.eventForwarder);
        this.getIdForItemInNamedCollection = this.getIdForItemInNamedCollection.bind(this);
        this.getItemId = this.getItemId.bind(this);

        let context: ContextDefinition = ContextualInformationHelper.getInstance().addContextFromView(this, STATE_NAMES.exerciseTypes, 'Exercise Types');
        ContextualInformationHelper.getInstance().addActionToContext(context, 'addToWorkout', 'Add To Workout', this.eventHandlerDelegate.eventActionClicked, 'fas fa-arrow-alt-circle-right');
    }

    applyDefaultSort(item1: any, item2: any): number {
        let result = 1;
        if (item1.name < item2.name) result = -1;
        return result;
    }

    getItemIcons(name: string, item: any): string[] {

            if (item.type) {
                if (item.type === 'cardio') {
                    return ['fas fa-running ml-2'];
                } else {
                    return ['fas fa-dumbbell ml-2'];
                }
            }
            return [];

    }


    getItemDescription(from: string, item: any): string {
        let buffer = '';
        buffer += '<strong>' + item.name + '</strong>: ';
        if (item.type === 'cardio') {
            buffer += item.distance + ' km in ' + item.duration;
        } else {
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

    compareItemsForEquality(item1: any, item2: any): boolean {
        return isSameMongo(item1, item2);
    }

    getIdForItemInNamedCollection(name: string, item: any) {
        return item._id;
    }

    renderDisplayForItemInNamedCollection(containerEl: HTMLElement, name: string, item: any): void {
        containerEl.innerHTML = item.name;
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

