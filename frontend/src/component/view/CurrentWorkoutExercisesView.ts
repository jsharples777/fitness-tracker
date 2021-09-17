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
                iconClasses: 'text-black fas fa-sign-out-alt',
                attributes:[{name:'data-toggle',value:"tooltip"},{name:'data-placement',value:"right"},{name:'title',value:"Delete this exercise from the workout."}]
            }
        }
    };

    constructor(stateManager:StateManager) {
        super(CurrentWorkoutExercisesView.DOMConfig, stateManager, STATE_NAMES.exerciseTypes);
        this.renderer = new ListViewRenderer(this, this);
    }


    canDeleteItem(view: View, selectedItem: any): boolean {
        return true;
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
        return true;
    }

    itemDropped(view: View, droppedItem: any) {
        Controller.getInstance().addExerciseToCurrentWorkout(droppedItem);
    }


}

