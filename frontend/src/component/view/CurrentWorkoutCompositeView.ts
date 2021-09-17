import SidebarViewContainer from "../../ui-framework/container/SidebarViewContainer";
import {ExerciseTypesView} from "./ExerciseTypesView";
import ExerciseTypesSidebar from "../sidebar/ExerciseTypesSidebar";
import {DataObjectDefinition} from "../../model/DataObjectTypeDefs";
import {ObjectDefinitionRegistry} from "../../model/ObjectDefinitionRegistry";
import {BUTTON, STATE_NAMES, VIEW_CONTAINER, VIEW_NAME} from "../../AppTypes";
import {FormDetailViewRenderer} from "../../ui-framework/view/renderer/FormDetailViewRenderer";
import {CreatedByPermissionChecker} from "../../CreatedByPermissionChecker";
import {DetailView} from "../../ui-framework/view/interface/DetailView";
import {DetailViewImplementation} from "../../ui-framework/view/implementation/DetailViewImplementation";
import {LinkedCollectionDetailController} from "../../ui-framework/helper/LinkedCollectionDetailController";
import {BasicObjectDefinitionFactory} from "../../model/BasicObjectDefinitionFactory";
import {Form} from "../../ui-framework/form/Form";
import Controller from "../../Controller";
import debug from "debug";
import {ComparisonType, ConditionResponse, ValidationRule} from "../../ui-framework/form/validation/ValidationTypeDefs";
import {ValidationManager} from "../../ui-framework/form/validation/ValidationManager";
import CurrentWorkoutSidebar from "../sidebar/CurrentWorkoutSidebar";
import {StateManager} from "../../state/StateManager";
import MemoryBufferStateManager from "../../state/MemoryBufferStateManager";
import StateChangeListener from "../../state/StateChangeListener";
import DownloadManager from "../../network/DownloadManager";
import {isSameMongo} from "../../util/EqualityFunctions";

const logger = debug('exercise-types-composite-view');

export class CurrentWorkoutCompositeView implements StateChangeListener{
    private sideBar:SidebarViewContainer;
    private currentWorkout:any = {};
    private workoutDef:DataObjectDefinition|null = null;
    private stateManager:StateManager;

    constructor(sideBar:SidebarViewContainer) {
        this.sideBar = sideBar;
        this.stateManager = new MemoryBufferStateManager();
        this.stateManager.addChangeListenerForName(STATE_NAMES.exercises,this);
    }

    onDocumentLoaded() {
        this.workoutDef = ObjectDefinitionRegistry.getInstance().findDefinition(STATE_NAMES.workouts);
        if (!this.workoutDef) throw new Error ('Workout definition not found');





        const exerciseTypes = new ExerciseTypesView();
        this.sideBar.addView(exerciseTypes,{containerId:CurrentWorkoutSidebar.SidebarContainers.list});

        const exerciseTypeDefinition:DataObjectDefinition|null = ObjectDefinitionRegistry.getInstance().findDefinition(STATE_NAMES.exerciseTypes);

        if (exerciseTypeDefinition) {
            let exerciseTypeDetailRenderer:FormDetailViewRenderer = new FormDetailViewRenderer(VIEW_CONTAINER.exerciseTypeDetail,exerciseTypeDefinition,new CreatedByPermissionChecker());

            let exerciseTypeDetailView:DetailView = new DetailViewImplementation(
                {
                    resultsContainerId: VIEW_CONTAINER.exerciseTypeDetail,
                    dataSourceId: VIEW_NAME.exerciseTypes
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
                this.setupValidationForExerciseTypeDetailsForm(detailForm);
            }

            // setup the event handling for the create new exercise type button
            let createExerciseType = <HTMLButtonElement>document.getElementById(BUTTON.createNewExerciseType);
            logger(`Setting up button for creating exercise types`);
            logger(createExerciseType);
            if (createExerciseType) {
                createExerciseType.addEventListener('click',(event) => {
                    logger(`Asking view linker to start a new object`);
                    viewLinker.startNewObject();
                });

            }

            viewLinker.addListener(Controller.getInstance());
        }
    }

    private setupValidationForExerciseTypeDetailsForm(form:Form) {
        let rule: ValidationRule = {
            targetDataFieldId: 'sets',
            response: ConditionResponse.show,
            conditions: [
                {
                    sourceDataFieldId: 'type',
                    comparison: ComparisonType.hasValue,
                    values:'cardio'
                }
            ]
        }
        ValidationManager.getInstance().addRuleToForm(form, rule);
        rule = {
            targetDataFieldId: 'reps',
            response: ConditionResponse.show,
            conditions: [
                {
                    sourceDataFieldId: 'type',
                    comparison: ComparisonType.hasValue,
                    values:'cardio'
                }
            ]
        }
        ValidationManager.getInstance().addRuleToForm(form, rule);
        rule = {
            targetDataFieldId: 'weight',
            response: ConditionResponse.show,
            conditions: [
                {
                    sourceDataFieldId: 'type',
                    comparison: ComparisonType.hasValue,
                    values:'cardio'
                }
            ]
        }
        ValidationManager.getInstance().addRuleToForm(form, rule);
        rule = {
            targetDataFieldId: 'reps',
            response: ConditionResponse.hide,
            conditions: [
                {
                    sourceDataFieldId: 'type',
                    comparison: ComparisonType.hasValue,
                    values:'strength'
                }
            ]
        }
        ValidationManager.getInstance().addRuleToForm(form, rule);
        rule = {
            targetDataFieldId: 'sets',
            response: ConditionResponse.hide,
            conditions: [
                {
                    sourceDataFieldId: 'type',
                    comparison: ComparisonType.hasValue,
                    values:'strength'
                }
            ]
        }

        ValidationManager.getInstance().addRuleToForm(form, rule);
        rule = {
            targetDataFieldId: 'weight',
            response: ConditionResponse.hide,
            conditions: [
                {
                    sourceDataFieldId: 'type',
                    comparison: ComparisonType.hasValue,
                    values:'strength'
                }
            ]
        }

        ValidationManager.getInstance().addRuleToForm(form, rule);
        rule = {
            targetDataFieldId: 'distance',
            response: ConditionResponse.show,
            conditions: [
                {
                    sourceDataFieldId: 'type',
                    comparison: ComparisonType.hasValue,
                    values: 'strength'
                }
            ]
        }
        ValidationManager.getInstance().addRuleToForm(form, rule);
        rule = {
            targetDataFieldId: 'distance',
            response: ConditionResponse.hide,
            conditions: [
                {
                    sourceDataFieldId: 'type',
                    comparison: ComparisonType.hasValue,
                    values: 'cardio'
                }
            ]
        }
        ValidationManager.getInstance().addRuleToForm(form, rule);
    }

    private createWorkout() {

    }
    private saveWorkout() {
        Controller.getInstance().getStateManager().updateItemInState(STATE_NAMES.workouts,this.currentWorkout,isSameMongo,false);
    }

    stateChanged(managerName: string, name: string, newValue: any): void {}

    stateChangedItemAdded(managerName: string, name: string, itemAdded: any): void {
        this.currentWorkout.exercises.push(itemAdded);
    }

    stateChangedItemRemoved(managerName: string, name: string, itemRemoved: any): void {
    }

    stateChangedItemUpdated(managerName: string, name: string, itemUpdated: any, itemNewValue: any): void {

    }

}