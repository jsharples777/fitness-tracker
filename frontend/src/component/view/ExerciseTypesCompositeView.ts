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

const logger = debug('exercise-types-composite-view');

export class ExerciseTypesCompositeView {
    private sideBar:SidebarViewContainer;

    constructor(sideBar:SidebarViewContainer) {
        this.sideBar = sideBar;
    }

    onDocumentLoaded() {
        const exerciseTypes = new ExerciseTypesView();
        this.sideBar.addView(exerciseTypes,{containerId:ExerciseTypesSidebar.SidebarContainers.container});

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

}