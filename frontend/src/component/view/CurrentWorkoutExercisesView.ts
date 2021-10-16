import {DRAGGABLE, STATE_NAMES, VIEW_NAME} from "../../AppTypes";

import Controller from "../../Controller";


import debug from 'debug';
import {
    AbstractStatefulCollectionView,
    CollectionViewDOMConfig,
    CollectionViewEventHandlerDelegateUsingContext,
    CollectionViewListener,
    CollectionViewListenerForwarder,
    ContextualInformationHelper,
    isSameMongo,
    KeyType,
    ListViewRendererUsingContext,
    StateManager,
    View
} from "ui-framework-jps";


const logger = debug('current-workout-exercises-view');

export class CurrentWorkoutExercisesView extends AbstractStatefulCollectionView implements CollectionViewListener {

    private static DOMConfig: CollectionViewDOMConfig = {
        viewConfig: {
            resultsContainerId: 'exercises',
            dataSourceId: VIEW_NAME.exercises,
            drop: {
                acceptFrom: [DRAGGABLE.fromExerciseTypes],
                acceptTypes: [DRAGGABLE.typeExerciseType]
            }
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
            icons: (name: string, item: any) => {
                if (item.type) {
                    if (item.type === 'cardio') {
                        return ['fas fa-running ml-2'];
                    } else {
                        return ['fas fa-dumbbell ml-2'];
                    }
                }
                return [];
            },
            delete: {
                classes: 'btn bg-danger text-white btn-circle btn-md',
                iconClasses: 'fas fa-trash-alt',
                attributes: [{name: 'data-toggle', value: "tooltip"}, {
                    name: 'data-placement',
                    value: "right"
                }, {name: 'title', value: "Delete this exercise from the workout."}]
            }
        }
    };

    constructor(stateManager: StateManager) {
        super(CurrentWorkoutExercisesView.DOMConfig, stateManager, STATE_NAMES.exercises);
        this.renderer = new ListViewRendererUsingContext(this, this);
        this.eventHandlerDelegate = new CollectionViewEventHandlerDelegateUsingContext(this, <CollectionViewListenerForwarder>this.eventForwarder);
        this.getIdForItemInNamedCollection = this.getIdForItemInNamedCollection.bind(this);
        this.getItemId = this.getItemId.bind(this);
        ContextualInformationHelper.getInstance().addContextFromView(this, STATE_NAMES.exercises, 'Exercises');
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
        return true;
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
        return true;
    }

    itemDropped(view: View, droppedItem: any) {
        Controller.getInstance().addExerciseToCurrentWorkout(droppedItem);
    }


}

