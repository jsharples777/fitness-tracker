import {ComparisonType, ConditionResponse, Form, ValidationManager, ValidationRule} from "ui-framework-jps";


export class ValidationHelper {
    private static _instance: ValidationHelper;

    public static getInstance(): ValidationHelper {
        if (!(ValidationHelper._instance)) {
            ValidationHelper._instance = new ValidationHelper();
        }
        return ValidationHelper._instance;
    }

    private constructor() {}

    public setupValidationForExerciseTypeDetailsForm(form:Form) {
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
