import SidebarViewContainer from "../../ui-framework/container/SidebarViewContainer";
import {ExerciseTypesView} from "./ExerciseTypesView";
import {DataObjectDefinition} from "../../model/DataObjectTypeDefs";
import {ObjectDefinitionRegistry} from "../../model/ObjectDefinitionRegistry";
import {BUTTON, STATE_NAMES, VIEW_CONTAINER, VIEW_NAME} from "../../AppTypes";
import {FormDetailViewRenderer} from "../../ui-framework/view/renderer/FormDetailViewRenderer";
import {DetailView} from "../../ui-framework/view/interface/DetailView";
import {DetailViewImplementation} from "../../ui-framework/view/implementation/DetailViewImplementation";
import {LinkedCollectionDetailController} from "../../ui-framework/helper/LinkedCollectionDetailController";
import {BasicObjectDefinitionFactory} from "../../model/BasicObjectDefinitionFactory";
import {Form} from "../../ui-framework/form/Form";
import Controller from "../../Controller";
import debug from "debug";
import CurrentWorkoutSidebar from "../sidebar/CurrentWorkoutSidebar";
import {StateManager} from "../../state/StateManager";
import MemoryBufferStateManager from "../../state/MemoryBufferStateManager";
import StateChangeListener from "../../state/StateChangeListener";
import {isSameMongo} from "../../util/EqualityFunctions";
import {ValidationHelper} from "../helper/ValidationHelper";
import {DefaultPermissionChecker} from "../../DefaultPermissionChecker";
import {CurrentWorkoutExercisesView} from "./CurrentWorkoutExercisesView";
import {DataObjectListener} from "../../model/DataObjectListener";
import {DataObjectController} from "../../model/DataObjectController";

const logger = debug('current-workout-composite-view');

export class CurrentWorkoutCompositeView implements StateChangeListener,DataObjectListener{
    private sideBar:SidebarViewContainer;
    private currentWorkout:any = {};
    private workoutDef:DataObjectDefinition|null = null;
    private readonly stateManager:StateManager;

    constructor(sideBar:SidebarViewContainer) {
        this.sideBar = sideBar;
        this.stateManager = new MemoryBufferStateManager();
        this.stateManager.addChangeListenerForName(STATE_NAMES.exerciseTypes,this);
        Controller.getInstance().getStateManager().addChangeListenerForName(STATE_NAMES.workouts,this);
    }

    getListenerName(): string {
        return 'Current Workout Composite View';
    }

    onDocumentLoaded() {
        this.workoutDef = ObjectDefinitionRegistry.getInstance().findDefinition(STATE_NAMES.workouts);
        if (!this.workoutDef) throw new Error ('Workout definition not found');

        const exerciseTypes = new CurrentWorkoutExercisesView(this.stateManager);
        this.sideBar.addView(exerciseTypes,{containerId:VIEW_CONTAINER.exerciseDropZone});

        const exerciseTypeDefinition:DataObjectDefinition|null = ObjectDefinitionRegistry.getInstance().findDefinition(STATE_NAMES.exerciseTypes);

        if (exerciseTypeDefinition) {
            let exerciseTypeDetailRenderer:FormDetailViewRenderer = new FormDetailViewRenderer(VIEW_CONTAINER.currentWorkoutDetail,exerciseTypeDefinition,new DefaultPermissionChecker());

            let exerciseTypeDetailView:DetailView = new DetailViewImplementation(
                {
                    resultsContainerId: VIEW_CONTAINER.currentWorkoutDetail,
                    dataSourceId: VIEW_NAME.exercises
                },exerciseTypeDetailRenderer);
            let viewLinker:LinkedCollectionDetailController = new LinkedCollectionDetailController(STATE_NAMES.exerciseTypes,exerciseTypes);
            viewLinker.addLinkedDetailView(exerciseTypeDetailView);
            this.sideBar.onDocumentLoaded();
            let startingDisplayOrder = BasicObjectDefinitionFactory.getInstance().generateStartingDisplayOrder(exerciseTypeDefinition);
            exerciseTypeDetailView.initialise(startingDisplayOrder,false,true);

            const detailForm:Form|null = exerciseTypeDetailRenderer.getForm();

            if (detailForm) {
                logger(`Setting up validation rules for ${detailForm.getId()}`);
                logger(detailForm);
                ValidationHelper.getInstance().setupValidationForExerciseTypeDetailsForm(detailForm);
            }

            // setup the event handling for the create new exercise type button
            let createExerciseType = <HTMLButtonElement>document.getElementById(BUTTON.completeWorkout);
            logger(`Setting up button for completing the workout`);
            logger(createExerciseType);
            if (createExerciseType) {
                createExerciseType.addEventListener('click',(event) => {
                    logger(`Completing the workout`);
                    this.currentWorkout.completed = true;
                    this.saveWorkout();
                    this.createWorkout();
                });

            }

            viewLinker.addListener(this);
        }

    }

    public getStateManager() {
        return this.stateManager;
    }


    private createWorkout() {
        logger(`Creating new current workout`);
        this.currentWorkout = ObjectDefinitionRegistry.getInstance().createInstance(STATE_NAMES.workouts);
        logger(this.currentWorkout);
        Controller.getInstance().getStateManager().addNewItemToState(STATE_NAMES.workouts,this.currentWorkout,false);
        this.stateManager.setStateByName(STATE_NAMES.exerciseTypes,this.currentWorkout.exercises,true);
    }

    private saveWorkout() {
        logger(`Saving current workout`);
        logger(this.currentWorkout);

        Controller.getInstance().getStateManager().updateItemInState(STATE_NAMES.workouts,this.currentWorkout,isSameMongo,false);
    }

    stateChanged(managerName: string, name: string, newValue: any): void {
        logger(`${managerName},${name}`);
        if (name === STATE_NAMES.workouts) {
            logger(`Workouts loaded`);
            // is there a current workout?
            this.currentWorkout = null;

            newValue.forEach((workout:any) => {
                if (!workout.completed || (workout.completed === 'false')) {
                    this.currentWorkout = workout;
                }
            });

            if (this.currentWorkout) {
                logger(`Workouts loaded found existing current workout`);
                this.stateManager.setStateByName(STATE_NAMES.exerciseTypes,this.currentWorkout.exercises,true);
            }
            else {
                logger(`Workouts loaded no existing current workout, creating and saving`);
                this.createWorkout();
            }
        }
    }

    stateChangedItemAdded(managerName: string, name: string, itemAdded: any): void {
        if (name === STATE_NAMES.exerciseTypes) {
            logger(`Added a new exercise to workout`);
            logger(itemAdded);
            this.currentWorkout.exercises.push(itemAdded);
            this.saveWorkout();
        }
    }

    stateChangedItemRemoved(managerName: string, name: string, itemRemoved: any): void {
        if (name === STATE_NAMES.exerciseTypes) {
            // find the exercise in the current workout
            let foundIndex = this.currentWorkout.exercises.findIndex((exercise:any) => exercise._id === itemRemoved._id);
            logger(`Removing exercise to workout at index ${foundIndex}`);
            logger(itemRemoved);
            if (foundIndex >= 0) {
                this.currentWorkout.exercises.splice(foundIndex,1);
            }
            this.saveWorkout();
        }
    }

    stateChangedItemUpdated(managerName: string, name: string, itemUpdated: any, itemNewValue: any): void {
        if (name === STATE_NAMES.exerciseTypes) {
            // find the exercise in the current workout
            let foundIndex = this.currentWorkout.exercises.findIndex((exercise:any) => exercise._id === itemNewValue._id);
            logger(`Updating exercise to workout at index ${foundIndex}`);
            logger(itemNewValue);
            if (foundIndex >= 0) {
                this.currentWorkout.exercises.splice(foundIndex,1,itemNewValue);
            }
            this.saveWorkout();
        }

    }

    create(controller:DataObjectController,typeName:string,dataObj:any):void {
        logger(`Added a new exercise to workout from view`);
        logger(dataObj);
        this.stateManager.addNewItemToState(STATE_NAMES.exerciseTypes,dataObj,false);
    }
    update(controller:DataObjectController,typeName:string,dataObj:any):void {
        logger(`Updating exercise in workout from view`);
        logger(dataObj);
        this.stateManager.updateItemInState(STATE_NAMES.exerciseTypes,dataObj,isSameMongo,false);
    }
    delete(controller:DataObjectController,typeName:string,dataObj:any):void {
        logger(`Deleting exercise from workout from view`);
        logger(dataObj);
        this.stateManager.removeItemFromState(STATE_NAMES.exerciseTypes,dataObj,isSameMongo,false);
    }



}