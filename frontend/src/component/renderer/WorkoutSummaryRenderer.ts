import debug from 'debug';
import moment from "moment";
import Chart from "chart.js/auto";
import {CollectionView, CollectionViewEventHandler, CollectionViewRenderer} from "ui-framework-jps";


const avLogger = debug('workout-summary-renderer');

export class WorkoutSummaryRenderer implements CollectionViewRenderer {

    protected view: CollectionView;
    protected eventHandler: CollectionViewEventHandler;
    private currentChart: Chart | null = null;

    constructor(view: CollectionView, eventHandler: CollectionViewEventHandler) {
        this.view = view;
        this.eventHandler = eventHandler;
    }

    private generateRandomExerciseColourAndBorder(isStrength: boolean = true): string[] {
        let red = 0;
        let blue = 0;
        let green = 50;

        const newColour = Math.floor(Math.random() * 100) + 155;
        if (isStrength) red = newColour;
        if (!isStrength) blue = newColour;
        const transparency = 0.4;

        const background = `rgba(${red},${green},${blue},${transparency})`;
        const border = `rgb(${red},${green},${blue})`;

        return [background, border];
    }

    public createDisplayElementForCollectionItem(collectionName: string, item: any): HTMLElement {
        return document.createElement('a');
    }

    public setDisplayElementsForCollectionInContainer(containerEl: HTMLElement, collectionName: string, newState: any): void {
        avLogger(`view ${this.view.getName()}: creating workout summary`);
        avLogger(newState);

        if (this.currentChart) this.currentChart.destroy();

        // okay we need to go through the last 7 workouts
        let sevenWorkouts = newState;
        if (newState.length > 7) {
            sevenWorkouts = newState.slice(newState.length - 7);
        }


        // go through the workouts and find all the unique exercise names as data series names
        let exerciseNames: string[] = [];
        let exerciseBG: string[] = [];
        let exerciseBR: string[] = [];
        let exerciseTypes: string[] = [];
        let labels: string[] = [];
        sevenWorkouts.forEach((workout: any) => {
            const label = moment(workout.createdOn, 'YYYYMMDDHHmmss').format('ddd DD/MM/YYYY HH:mm');
            labels.push(label);
            avLogger(`Added label ${label}`);

            if (workout.exercises) {
                workout.exercises.forEach((exercise: any) => {
                    const exerciseName = exercise.name;
                    // do we have this exercise already?
                    let foundIndex = exerciseNames.findIndex((name) => name == exerciseName);
                    if (foundIndex < 0) {
                        avLogger(`Adding exercise ${exerciseName} of type ${exercise.type} to datasets`);
                        exerciseNames.push(exerciseName);
                        exerciseTypes.push(exercise.type);
                        const colours = this.generateRandomExerciseColourAndBorder((exercise.type === 'strength'));
                        exerciseBG.push(colours[0]);
                        exerciseBR.push(colours[1]);
                    }
                })
            }
        });

        // construct the data series, for each series (exercise), go through the workouts and create a data entry for that item

        let datasets: any[] = [];

        exerciseNames.forEach((name, index) => {
            const exerciseType = exerciseTypes[index];
            const itemBG = exerciseBG[index];
            const itemBR = exerciseBR[index];

            avLogger(`Constructing dataset ${name} of type ${exerciseType} to datasets`);

            let data: number[] = [];
            let bg: string[] = [];
            let br: string[] = [];


            sevenWorkouts.forEach((workout: any) => {
                bg.push(itemBG);
                br.push(itemBR);

                // find the exercise name
                if (workout.exercises) {

                    const didntFindExercise = workout.exercises.every((exercise: any) => {
                        if (exercise.name == name) {
                            if (exerciseType === 'strength') {
                                avLogger(`Found exercise ${name} with value ${exercise.weight}`);
                                data.push(exercise.weight);
                            } else {
                                avLogger(`Found exercise ${name} with value ${exercise.distance}`);
                                data.push(exercise.distance);
                            }
                            return false;
                        }
                        return true;
                    });
                    // not found - zero value
                    if (didntFindExercise) {
                        data.push(0);
                    }

                } else {
                    data.push(0);
                }
            });
            let dataset = {label: name, data: data, backgroundColor: bg, borderColor: br, borderWidth: 1, order: 1};
            let lineDataSet = {label: name, data: data, backgroundColor: bg, borderColor: br, order: 0, type: 'line'};
            avLogger(dataset);
            datasets.push(dataset);
            //datasets.push(lineDataSet);
        });


        let chartData = {
            labels: labels,
            datasets: datasets,
        };

        let config = {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                animation: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            },

        }
        avLogger(chartData);

        // @ts-ignore
        this.currentChart = new Chart(<HTMLCanvasElement>containerEl, config);
    }

    onDocumentLoaded(): void {
    }

}
