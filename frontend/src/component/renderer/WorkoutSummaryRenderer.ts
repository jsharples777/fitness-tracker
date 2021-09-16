import debug from 'debug';
import {CollectionViewRenderer} from "../../ui-framework/view/interface/CollectionViewRenderer";
import {CollectionView} from "../../ui-framework/view/interface/CollectionView";
import {CollectionViewEventHandler} from "../../ui-framework/view/interface/CollectionViewEventHandler";
import moment from "moment";

const avLogger = debug('workout-summary-renderer');

export class WorkoutSummaryRenderer implements CollectionViewRenderer {
    protected view: CollectionView;
    protected eventHandler: CollectionViewEventHandler;

    constructor(view: CollectionView, eventHandler: CollectionViewEventHandler) {
        this.view = view;
        this.eventHandler = eventHandler;
    }

    public createDisplayElementForCollectionItem(collectionName: string, item: any): HTMLElement {
      return document.createElement('a');
    }

    public setDisplayElementsForCollectionInContainer(containerEl: HTMLElement, collectionName: string, newState: any): void {
        avLogger(`view ${this.view.getName()}: creating workout summary`);
        avLogger(newState);

        // okay we need to go through the last 7 days of workouts
        // we need to go backward through the state array and collect the 7 days worth of results
        let sevenDaysOfWorkouts = [];
        if (newState.length > 0) {
            let index = newState.length - 1;
            const latestWorkout = newState[index];

            sevenDaysOfWorkouts.push(latestWorkout);

            const latestWorkoutDate = moment(latestWorkout.createdOn,'YYYYMMDDHHmmss');
            const sevenDaysPrior = latestWorkoutDate.add(-7, 'days');

            let foundAllWorkoutsForSummary = false;
            while (!foundAllWorkoutsForSummary) {
                index -= 1;
                // have we run out of workouts?
                if (index >= 0) {
                    const previousWorkout = newState[index];
                    const workoutDate = moment(previousWorkout.createdOn, 'YYYYMMDDHHmmss');
                    if (workoutDate.isAfter(sevenDaysPrior)) {
                        sevenDaysOfWorkouts.push(previousWorkout);
                    }
                    else {
                        foundAllWorkoutsForSummary = true;
                    }
                }
                else {
                    foundAllWorkoutsForSummary = true;
                }
            }



        }
    }

}