import {Form} from "../../framework/ui/form/Form";
import {
    ConditionResponse,
    MultipleConditionLogic,
    ValidationRule
} from "../../framework/ui/form/validation/ValidationTypeDefs";
import {FormMode} from "../../framework/ui/form/FormUITypeDefs";
import {ComparisonType} from "../../framework/CommonTypes";
import {ValidationManager} from "../../framework/ui/form/validation/ValidationManager";


export class ValidationHelper {
    private static _instance: ValidationHelper;

    public static getInstance(): ValidationHelper {
        if (!(ValidationHelper._instance)) {
            ValidationHelper._instance = new ValidationHelper();
        }
        return ValidationHelper._instance;

    }

    private constructor() {}

    public setupValidationForExerciseTypeDetailsForm(form: Form) {
        let rule: ValidationRule = {
            formMode: FormMode.any,
            targetDataFieldId: 'sets',
            response: ConditionResponse.show,
            conditions: [
                {
                    sourceDataFieldId: 'type',
                    comparison: ComparisonType.hasValue,
                    values: 'strength'
                }
            ]
        };
        ValidationManager.getInstance().addRuleToForm(form, rule);
        rule = {
            formMode: FormMode.any,
            targetDataFieldId: 'reps',
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
            formMode: FormMode.any,
            targetDataFieldId: 'weight',
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
            formMode: FormMode.any,
            targetDataFieldId: 'reps',
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
        rule = {
            formMode: FormMode.any,
            targetDataFieldId: 'sets',
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
        rule = {
            formMode: FormMode.any,
            targetDataFieldId: 'weight',
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
        rule = {
            formMode: FormMode.any,
            targetDataFieldId: 'distance',
            response: ConditionResponse.show,
            conditions: [
                {
                    sourceDataFieldId: 'type',
                    comparison: ComparisonType.hasValue,
                    values: 'cardio'
                }
            ]
        }
        ValidationManager.getInstance().addRuleToForm(form, rule);
        rule = {
            formMode: FormMode.any,
            targetDataFieldId: 'distance',
            response: ConditionResponse.hide,
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
            formMode: FormMode.any,
            targetDataFieldId: 'sets',
            response: ConditionResponse.invalid,
            multipleConditionLogic: MultipleConditionLogic.failOnlyIfFinalConditionIsAFailAndPreviousConditionsAreNotFails,
            conditions: [
                {
                    sourceDataFieldId: 'type',
                    comparison: ComparisonType.hasValue,
                    values: 'strength'
                },
                {
                    comparison: ComparisonType.greaterThan,
                    values: '0'
                }


            ]
        }
        ValidationManager.getInstance().addRuleToForm(form, rule);
    }

}
