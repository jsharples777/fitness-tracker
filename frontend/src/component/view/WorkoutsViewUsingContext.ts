import {DRAGGABLE, STATE_NAMES, VIEW_NAME} from "../../AppTypes";
import Controller from "../../Controller";

import debug from 'debug';
import moment from "moment";
import Chart from 'chart.js/auto';
import App from "../../App";
import {
    AbstractStatefulCollectionView,
    addDurations,
    CarouselDOMConfig,
    CarouselViewRendererUsingContext,
    CollectionViewEventHandlerDelegateUsingContext,
    CollectionViewListener,
    CollectionViewListenerForwarder,
    ContextDefinition,
    ContextualInformationHelper,
    isSameMongo,
    KeyType,
    Modifier,
    RowPosition,
    truncateString,
    View
} from "ui-framework-jps";


const logger = debug('workouts-view');

type ExerciseSummary = {
    weight: number,
    distance: number,
    duration: string
}

type ChartRef = {
    _id: string,
    chart: Chart | null
}


export class WorkoutsViewUsingContext extends AbstractStatefulCollectionView implements CollectionViewListener {

    private static DOMConfig: CarouselDOMConfig = {
        itemsPerRow: {
            small: 1,
            medium: 2,
            large: 3,
            xlarge: 4
        },
        rowContainer: {
            classes: "carousel-item",
            type: 'div',
        },
        activeRow: {
            type: '',
            classes: 'active',
        },
        activeRowPosition: RowPosition.last,
        row: {
            classes: "row",
            type: 'div',
        },
        multipleItemsPerRowContainer: {
            type: 'div',
            classes: 'col-sm-12 col-md-4 col-lg-3 mb-2',
        },
        actionContainer: {
            type: 'div',
            classes: 'card-footer d-flex w-100 justify-content-end'
        },
        collectionConfig: {
            viewConfig: {
                resultsContainerId: 'workouts',
                dataSourceId: VIEW_NAME.workouts,
                drop: {
                    acceptTypes: [DRAGGABLE.typeExerciseType],
                    acceptFrom: [DRAGGABLE.fromExerciseTypes]
                }
            },
            resultsElement: {
                type: 'div',
                classes: 'card',
            },
            keyId: '_id',
            keyType: KeyType.string,
            modifiers: {
                normal: 'bg-light',
                inactive: 'bg-light',
                active: 'bg-light',
                warning: 'bg-light',
            },
            detail: {
                containerClasses: 'card-body',
                textElement: {
                    classes: '',
                    type: 'div'
                },
                select: true,
                delete: {
                    classes: 'btn btn-danger btn-circle btn-md',
                    iconClasses: 'fas fa-trash-alt text-white',
                    attributes: [{name: 'data-toggle', value: "tooltip"}, {
                        name: 'data-placement',
                        value: "top"
                    }, {name: 'title', value: "Delete this workout"}]
                },
                background: {
                    type: 'div',
                    classes: '',
                },
            },
            extraActions: [
                {
                    name: 'template',
                    button: {
                        text: '',
                        classes: 'btn btn-primary btn-circle btn-md mr-2',
                        iconClasses: 'fas fa-copy',
                        attributes: [{name: 'data-toggle', value: "tooltip"}, {
                            name: 'data-placement',
                            value: "top"
                        }, {name: 'title', value: "Add the exercises from this workout to the current workout."}]
                    },
                    confirm:false

                },
                {
                    name: 'continue',
                    button: {
                        text: '',
                        iconClasses: 'text-white fas fa-clipboard-list',
                        classes: 'btn btn-warning btn-circle btn-md mr-2',
                        attributes: [{name: 'data-toggle', value: "tooltip"}, {
                            name: 'data-placement',
                            value: "top"
                        }, {name: 'title', value: "Continue this current workout"}]
                    },
                    confirm:false
                }
            ],

        },
    }
    private static bgStrength = 'rgba(255, 0, 0, 0.2)';
    private static bgCardio = 'rgba(0, 50, 255, 0.2)';
    private static borderStrength = 'rgb(255, 50, 0)';
    private static borderCardio = 'rgb(0, 50 , 255)';
    private chartRefs: ChartRef[];

    constructor() {
        super(WorkoutsViewUsingContext.DOMConfig.collectionConfig, Controller.getInstance().getStateManager(), STATE_NAMES.workouts);
        this.renderer = new CarouselViewRendererUsingContext(this, this, WorkoutsViewUsingContext.DOMConfig);
        this.eventHandlerDelegate = new CollectionViewEventHandlerDelegateUsingContext(this, <CollectionViewListenerForwarder>this.eventForwarder);
        this.chartRefs = [];

        this.getIdForItemInNamedCollection = this.getIdForItemInNamedCollection.bind(this);
        this.getItemId = this.getItemId.bind(this);

        let context: ContextDefinition = ContextualInformationHelper.getInstance().addContextFromView(this, STATE_NAMES.workouts, 'Workouts');
        ContextualInformationHelper.getInstance().addActionToContext(context, 'template', 'Copy exercises to Current Workout', this.eventHandlerDelegate.eventActionClicked, 'fas fa-copy');
        ContextualInformationHelper.getInstance().addActionToContext(context, 'continue', 'Continue Current Workout', this.eventHandlerDelegate.eventActionClicked, 'fas fa-clipboard-list');

    }

    getItemDescription(from: string, item: any): string {
        let buffer = '';
        if (item.exercises) {
            item.exercises.forEach((exercise: any) => {
                buffer += `<strong>${exercise.name}</strong>: `;
                if (exercise.type === 'cardio') {
                    buffer += `${exercise.distance} km in ${exercise.duration}`;
                } else {
                    buffer += `${exercise.sets} sets of ${exercise.reps} reps in ${exercise.duration}`;
                }
                buffer += `<br/>`;
            });
        }
        return buffer;
    }

    canDeleteItem(view: View, selectedItem: any): boolean {
        return (selectedItem.completed);
    }

    compareItemsForEquality(item1: any, item2: any): boolean {
        return isSameMongo(item1, item2);
    }

    getItemId(from: string, item: any): string {
        return this.getIdForItemInNamedCollection(from, item);
    }

    getIdForItemInNamedCollection(name: string, item: any) {
        return item._id;
    }

    renderDisplayForItemInNamedCollection(containerEl: HTMLElement, name: string, item: any): void {
        let summary = this.calculateExerciseSummary(item);
        let buffer = '';
        buffer += `<h5 class="card-title">`;
        if (item.name) {
            buffer += `${item.name}</h5>`;
            buffer += `<h6 class="card-subtitle">${moment(item.createdOn, 'YYYYMMDDHHmmss').format('ddd, DD/MM/YYYY HH:mm')}</h6>`;
        } else {
            if (item.completed) {
                buffer += `${moment(item.createdOn, 'YYYYMMDDHHmmss').format('ddd, DD/MM/YYYY HH:mm')}</h5>`;
            } else {
                buffer += 'Current</h5>';
            }

        }
        buffer += `<ul class="list-group list-group-flush">`;
        buffer += `<li class="list-group-item"><strong>Duration:</strong> ${summary.duration}</li>`;
        if (summary.weight > 0) buffer += `<li class="list-group-item"><strong>Total Weight:</strong> ${summary.weight}</li>`;
        if (summary.distance > 0) buffer += `<li class="list-group-item"><strong>Total Distance: </strong> ${summary.distance}</li>`;
        buffer += `</ul>`;
        containerEl.innerHTML = buffer;
    }

    hasPermissionToDeleteItemInNamedCollection(name: string, item: any): boolean {
        return (item.completed);
    }

    hasPermissionToActionItemInNamedCollection(actionName: string, name: string, item: any): boolean {
        let result = false;
        if (actionName === 'template') {
            if ((item.completed) && (item.completed === true)) {
                result = true;
            }
        }
        if (actionName === 'continue') {
            if (item.completed === false) {
                result = true;
            }
        }
        return result;
    }

    getModifierForItemInNamedCollection(name: string, item: any): Modifier {
        let result = Modifier.inactive;
        if (item.completed) {
            if (item.completed !== true) {
                result = Modifier.active;
            }
        }
        return result;
    }

    renderBackgroundForItemInNamedCollection(containerEl: HTMLElement, name: string, item: any) {
        /*
        Remove a previous chart reference
         */
        let foundIndex = this.chartRefs.findIndex((ref: any) => ref._id === item._id);
        if (foundIndex) {
            //this.chartRefs[foundIndex].chart?.destroy();
            logger(`Removing old chart reference for workout ${item._id}`);
            this.chartRefs.splice(foundIndex, 1);
        }


        logger(`Rendering chart for`);
        logger(item);
        // we are going to render a chart for the workout
        if (item.exercises) {
            const dataSourceKeyId = this.getDataSourceKeyId();
            const resultDataKeyId = this.getIdForItemInNamedCollection(name, item);

            let canvas = document.createElement('canvas');
            //browserUtil.addAttributes(canvas,[{name:'style',value:'height:100%; width:100%'}]);
            canvas.setAttribute(this.collectionUIConfig.keyId, resultDataKeyId);
            canvas.setAttribute(dataSourceKeyId, this.collectionUIConfig.viewConfig.dataSourceId);
            // chart labels are the exercise names (shortened to 10 characters)


            let labels: string[] = [];
            let data: any[] = [];
            let bgColour: string[] = []
            let brColour: string[] = [];

            item.exercises.forEach((exercise: any) => {
                labels.push(truncateString(exercise.name, 10));
                if (exercise.type === 'cardio') {
                    data.push(exercise.distance);
                    bgColour.push(WorkoutsViewUsingContext.bgCardio);
                    brColour.push(WorkoutsViewUsingContext.borderCardio);
                } else {
                    data.push(exercise.weight);
                    bgColour.push(WorkoutsViewUsingContext.bgStrength);
                    brColour.push(WorkoutsViewUsingContext.borderStrength);
                }
            });
            let chartData = {
                labels: labels,
                datasets: [{
                    label: 'Exercises',
                    data: data,
                    backgroundColor: bgColour,
                    borderColor: brColour,
                    borderWidth: 1
                }]
            };


            const config = {
                type: 'bar',
                data: chartData,
                options: {
                    responsive: false,
                    animation: false,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                },
            };

            logger(config);
            try {
                // @ts-ignore
                let ref: ChartRef = {_id: item._id, chart: new Chart(canvas, config)};
                this.chartRefs.push(ref);
                containerEl.appendChild(canvas);
            } catch (err) {
                console.log(err);
            }

        }
    }

    public itemAction(view: View, actionName: string, selectedItem: any) {
        super.itemAction(view, actionName, selectedItem);
        // @ts-ignore
        if (actionName === WorkoutsViewUsingContext.DOMConfig.collectionConfig.extraActions[0].name) {
            // add the current list of exercises to the current workout
            Controller.getInstance().addWorkoutExercisesToCurrentWorkout(selectedItem);

        }
        // @ts-ignore
        if (actionName === WorkoutsViewUsingContext.DOMConfig.collectionConfig.extraActions[1].name) {
            // continue the current workout
            App.getInstance().showCurrentWorkout();


        }
    }

    private calculateExerciseSummary(item: any): ExerciseSummary {
        let result: ExerciseSummary = {
            weight: 0,
            distance: 0,
            duration: '00:00'
        };

        if (item.exercises) {
            for (let index = 0; index < item.exercises.length; index++) {
                const exercise = item.exercises[index];
                result.weight += exercise.weight;
                result.distance += exercise.distance;
                result.duration = addDurations(result.duration, exercise.duration);
            }
        }
        return result;
    }


}

