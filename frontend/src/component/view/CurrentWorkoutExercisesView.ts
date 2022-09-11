import {DRAGGABLE, STATE_NAMES, VIEW_NAME} from "../../AppTypes";

import Controller from "../../Controller";


import debug from 'debug';
import {
    AbstractStatefulCollectionView, BootstrapTableConfigHelper,
    CollectionViewDOMConfig,
    CollectionViewEventHandlerDelegateUsingContext,
    CollectionViewListener,
    CollectionViewListenerForwarder,
    ContextualInformationHelper, DataObjectDefinition, DisplayOrder,
    isSameMongo,
    KeyType,
    ListViewRendererUsingContext, ObjectDefinitionRegistry,
    StateManager, TableUIConfig, TableViewRuntimeConfig, TabularViewRendererUsingContext,
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
            type: 'tr',
            attributes: [{name: 'href', value: '#'}],
            classes: '',
        },
        // resultsElement: {
        //     type: 'a',
        //     attributes: [{name: 'href', value: '#'}],
        //     classes: 'list-group-item my-list-item truncate-notification list-group-item-action',
        // },
        keyId: '_id',
        keyType: KeyType.string,
        modifiers: {
            normal: '',
            inactive: 'table-secondary',
            active: 'table-success',
            warning: ''
        },
        // modifiers: {
        //     normal: '',
        //     inactive: 'list-group-item-light',
        //     active: 'list-group-item-primary',
        //     warning: ''
        // },
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
        //this.renderer = new ListViewRendererUsingContext(this, this);
        const def: DataObjectDefinition | null = ObjectDefinitionRegistry.getInstance().findDefinition(STATE_NAMES.exercises);
        if (def) {
            const displayOrders: DisplayOrder[] = [];
            displayOrders.push({fieldId: 'completed', displayOrder: 1});
            displayOrders.push({fieldId: 'name', displayOrder: 2});
            displayOrders.push({fieldId: 'type', displayOrder: 3});
            displayOrders.push({fieldId: 'duration', displayOrder: 4});
            displayOrders.push({fieldId: 'sets', displayOrder: 5});
            displayOrders.push({fieldId: 'reps', displayOrder: 6});
            displayOrders.push({fieldId: 'weight', displayOrder: 7});
            displayOrders.push({fieldId: 'distance', displayOrder: 8});

            const runtimeConfig: TableViewRuntimeConfig = {
                fieldDisplayOrders: displayOrders,
                itemDetailColumn: -1,
                hasActions: true,
                hideModifierFields: true,
                editableFields: ['completed','duration','sets','reps','weight','distance']
            }

            const tableUIConfig: TableUIConfig = BootstrapTableConfigHelper.getInstance().generateTableConfig(def, runtimeConfig);

            this.renderer = new TabularViewRendererUsingContext(this, this, tableUIConfig);


            this.eventHandlerDelegate = new CollectionViewEventHandlerDelegateUsingContext(this, <CollectionViewListenerForwarder>this.eventForwarder);
            this.getIdForItemInNamedCollection = this.getIdForItemInNamedCollection.bind(this);
            this.getItemId = this.getItemId.bind(this);
            ContextualInformationHelper.getInstance().addContextFromView(this, STATE_NAMES.exercises, 'Exercises');
        }
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

