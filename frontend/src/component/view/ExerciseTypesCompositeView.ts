import {BUTTON, STATE_NAMES, VIEW_CONTAINER, VIEW_NAME} from "../../AppTypes";

import Controller from "../../Controller";
import debug from "debug";

import {ValidationHelper} from "../helper/ValidationHelper";
import {ExerciseTypesViewUsingContext} from "./ExerciseTypesViewUsingContext";
import {CreatedByPermissionChecker} from "../../CreatedByPermissionChecker";

import ExerciseTypesSidebar from "../sidebar/ExerciseTypesSidebar";
import {
    BasicObjectDefinitionFactory,
    BootstrapFormConfigHelper,
    DataObjectDefinition,
    DetailView,
    DetailViewImplementation, DetailViewRuntimeConfig, ElementLocation,
    Form,
    FormDetailViewRenderer,
    LinkedCollectionDetailController,
    ObjectDefinitionRegistry,
    SidebarViewContainer
} from "ui-framework-jps";


const logger = debug('exercise-types-composite-view');

export class ExerciseTypesCompositeView {
    private sideBar: SidebarViewContainer;

    constructor(sideBar: SidebarViewContainer) {
        this.sideBar = sideBar;
    }

    onDocumentLoaded() {
        const exerciseTypes = new ExerciseTypesViewUsingContext(Controller.getInstance().getStateManager());
        this.sideBar.addView(exerciseTypes, {containerId: ExerciseTypesSidebar.SidebarContainers.container});

        const exerciseTypeDefinition: DataObjectDefinition | null = ObjectDefinitionRegistry.getInstance().findDefinition(STATE_NAMES.exerciseTypes);

        if (exerciseTypeDefinition) {
            let exerciseTypeDetailRenderer: FormDetailViewRenderer = new FormDetailViewRenderer(VIEW_CONTAINER.exerciseTypeDetail, exerciseTypeDefinition, new CreatedByPermissionChecker(), BootstrapFormConfigHelper.getInstance());

            let exerciseTypeDetailView: DetailView = new DetailViewImplementation(
                {
                    resultsContainerId: VIEW_CONTAINER.exerciseTypeDetail,
                    dataSourceId: VIEW_NAME.exerciseTypes
                }, exerciseTypeDetailRenderer);
            let viewLinker: LinkedCollectionDetailController = new LinkedCollectionDetailController(STATE_NAMES.exerciseTypes, exerciseTypes);
            viewLinker.addLinkedDetailView(exerciseTypeDetailView);
            this.sideBar.onDocumentLoaded();
            let startingDisplayOrder = BasicObjectDefinitionFactory.getInstance().generateStartingDisplayOrder(exerciseTypeDefinition);

            let runtimeConfig:DetailViewRuntimeConfig = {
                fieldDisplayOrders:startingDisplayOrder,
                hideModifierFields:true,
                hasExternalControl:false,
                autoscrollOnNewContent:true,
                deleteButton: {
                    classes: 'btn-warning rounded p-1 mr-2 mt-2 w-100',
                    iconClasses: 'fas fa-trash-alt'
                },
                cancelButton: {
                    classes: 'btn-info rounded p-1 mr-2 mt-2 w-100',
                    iconClasses: 'fas fa-ban'
                },
                saveButton: {
                    classes: 'btn-primary rounded p-1 mt-2 w-100',
                    iconClasses: 'fas fa-save'
                },
                buttonLocation:ElementLocation.top


            }


            exerciseTypeDetailView.initialise(runtimeConfig);

            const detailForm: Form | null = exerciseTypeDetailRenderer.getForm();

            if (detailForm) {
                logger(`Setting up validation rules for ${detailForm.getId()}`);
                logger(detailForm);
                ValidationHelper.getInstance().setupValidationForExerciseTypeDetailsForm(detailForm);
            }

            // setup the event handling for the create new exercise type button
            let createExerciseType = <HTMLButtonElement>document.getElementById(BUTTON.createNewExerciseType);
            logger(`Setting up button for creating exercise types`);
            logger(createExerciseType);
            if (createExerciseType) {
                createExerciseType.addEventListener('click', (event) => {
                    logger(`Asking view linker to start a new object`);
                    viewLinker.startNewObject({});
                });

            }

            viewLinker.addListener(Controller.getInstance());
        }
    }


}
