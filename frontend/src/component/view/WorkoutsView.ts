import AbstractStatefulCollectionView from "../../ui-framework/view/implementation/AbstractStatefulCollectionView";
import {
    CarouselDOMConfig,
    KeyType, Modifier,
    RowPosition
} from "../../ui-framework/ConfigurationTypes";
import {DRAGGABLE, STATE_NAMES, VIEW_NAME} from "../../AppTypes";
import Controller from "../../Controller";
import {isSameMongo} from "../../util/EqualityFunctions";
import {CollectionViewListener} from "../../ui-framework/view/interface/CollectionViewListener";
import {View} from "../../ui-framework/view/interface/View";

import debug from 'debug';
import {CarouselViewRenderer} from "../../ui-framework/view/renderer/CarouselViewRenderer";
import moment from "moment";
import {addDurations} from "../../util/DurationFunctions";
import {truncateString} from "../../util/MiscFunctions";
import Chart from 'chart.js/auto';
import browserUtil from "../../util/BrowserUtil";

const logger = debug('workouts-view');

type ExerciseSummary = {
    weight:number,
    distance:number,
    duration:string
}

export class WorkoutsView extends AbstractStatefulCollectionView implements CollectionViewListener {

    private static DOMConfig: CarouselDOMConfig = {
        itemsPerRow: {
            small:1,
            medium:2,
            large: 3,
        },
        rowContainer: {
            elementClasses: "carousel-item",
            elementType: 'div',
        },
        activeRow: {
            elementType: '',
            elementClasses: 'active',
        },
        activeRowPosition:RowPosition.last,
        row: {
            elementClasses: "row",
            elementType: 'div',
        },
        multipleItemsPerRowContainer: {
            elementType: 'div',
            elementClasses: 'col-sm-12 col-md-4 col-lg-3 mb-2',
        },
        actionContainer: {
            elementType:'div',
            elementClasses:'card-footer d-flex w-100 justify-content-end'
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
            resultsElementType: 'div',
            resultsClasses: 'card',
            keyId: '_id',
            keyType: KeyType.string,
            modifiers: {
                normal:'',
                inactive:'bg-light',
                active:'bg-primary',
                warning:'',
            },
            detail: {
                containerClasses: 'card-body',
                textElementType: 'div',
                textElementClasses: '',
                select: true,
                delete: {
                    buttonClasses:'btn btn-warning btn-circle btn-md',
                    iconClasses:'fas fa-trash text-white',
                    attributes:[{name:'data-toggle',value:"tooltip"},{name:'data-placement',value:"top"},{name:'title',value:"Delete this workout"}]
                },
                background: {
                    elementType:'div',
                    elementClasses:'',
                },
            },
            extraActions: [
                {
                    name: 'template',
                    buttonText: '',
                    buttonClasses: 'btn btn-primary btn-circle btn-md mr-2',
                    iconClasses: 'fas fa-copy',
                    attributes:[{name:'data-toggle',value:"tooltip"},{name:'data-placement',value:"top"},{name:'title',value:"Create a new workout with this one as a starting point."}]

                },
                {
                    name: 'continue',
                    buttonText: '',
                    iconClasses:'fas fa-running',
                    buttonClasses: 'btn btn-info btn-circle btn-md mr-2',
                    attributes:[{name:'data-toggle',value:"tooltip"},{name:'data-placement',value:"top"},{name:'title',value:"Continue this incomplete workout"}]
                }
            ],

        },


    }


    constructor() {
        super(WorkoutsView.DOMConfig.collectionConfig, Controller.getInstance().getStateManager(), STATE_NAMES.workouts);
        this.renderer = new CarouselViewRenderer(this, this,WorkoutsView.DOMConfig);
    }

    canDeleteItem(view: View, selectedItem: any): boolean {
        return (selectedItem.completed);
    }

    compareItemsForEquality(item1: any, item2: any): boolean {
        return isSameMongo(item1, item2);
    }

    getIdForItemInNamedCollection(name: string, item: any) {
        return item._id;
    }




    private calculateExerciseSummary(item:any) : ExerciseSummary {
        let result:ExerciseSummary = {
            weight:0,
            distance:0,
            duration:'00:00'
        };

        if (item.exercises) {
            for (let index = 0;index < item.exercises.length;index++) {
                const exercise = item.exercises[index];
                result.weight += exercise.weight;
                result.distance += exercise.distance;
                result.duration = addDurations(result.duration,exercise.duration);
            }
        }
        return result;
    }

    renderDisplayForItemInNamedCollection(containerEl: HTMLElement, name: string, item: any): void {
        let summary = this.calculateExerciseSummary(item);
        let buffer = '';
        buffer += `<h5 class="card-title">${moment(item.createdOn, 'YYYYMMDDHHmmss').format('ddd, DD/MM/YYYY HH:mm')}</h5>`;
        buffer += `<ul class="list-group list-group-flush">`;
        buffer += `<li class="list-group-item"><strong>Duration:</strong> ${summary.duration}</li>`;
        if (summary.weight > 0)   buffer += `<li class="list-group-item"><strong>Total Weight:</strong> ${summary.weight}</li>`;
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
            if ((item.completed) && (item.completed === false)) {
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
        // we are going to render a chart for the workout
        if (item.exercises) {
            const dataSourceKeyId = this.getDataSourceKeyId();
            const resultDataKeyId = this.getIdForItemInNamedCollection(name, item);

            let canvas = document.createElement('canvas');
            browserUtil.addAttributes(canvas,[{name:'style',value:'height:100%; width:100%'}]);
            canvas.setAttribute(this.collectionUIConfig.keyId, resultDataKeyId);
            canvas.setAttribute(dataSourceKeyId, this.collectionUIConfig.viewConfig.dataSourceId);
            // chart labels are the exercise names (shortened to 10 characters)


            let labels:string[] = [];
            let data:any[] = [];
            let bgColour:string[] = []
            let brColour:string[] = [];

            item.exercises.forEach((exercise: any) => {
                labels.push(truncateString(exercise.name, 10));
                if (exercise.type === 'cardio') {
                    data.push(exercise.distance);
                    bgColour.push(WorkoutsView.bgCardio);
                    brColour.push(WorkoutsView.borderCardio);
                }
                else {
                    data.push(exercise.weight);
                    bgColour.push(WorkoutsView.bgStrength);
                    brColour.push(WorkoutsView.borderStrength);
                }
            });
            let chartData = {
                labels: labels,
                datasets: [{
                    label:'Exercises',
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
                    animation:false,
                    maintainAspectRatio:false,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                },
            };

            logger(config);

            // @ts-ignore
            const workoutChart = new Chart(canvas,config);
            containerEl.appendChild(canvas);

            //const testChart = new Chart(document.getElementById('test'),config);

        }
    }

    private static bgStrength = 'rgba(255, 99, 132, 0.2)';
    private static bgCardio = 'rgba(54, 162, 235, 0.2)';

    private static borderStrength ='rgb(255, 99, 132)';
    private static borderCardio = 'rgb(54, 162, 235)';


}

