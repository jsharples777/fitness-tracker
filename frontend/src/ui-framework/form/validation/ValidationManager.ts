import {ComparisonType, ConditionResponse, ValidationRule} from "./ValidationTypeDefs";
import {Form} from "../Form";
import {Field} from "../field/Field";
import debug from 'debug';
import {FieldDefinition, FieldType} from "../DataObjectTypeDefs";
import {FieldListener} from "../field/FieldListener";

const logger = debug('validation-manager');


type RuleCheck = {
    ruleFailed: boolean,
    message?: string
}

type RuleResponse = {
    field: Field,
    ruleFailed: boolean,
    response: ConditionResponse,
    message?: string
}


type _ValueCondition = {
    values: string,
    comparison: ComparisonType
};

type _FieldCondition = {
    sourceField: Field,
    comparison: ComparisonType,
    values?: string,
};

type _ValidationRule = {
    targetField: Field,
    response: ConditionResponse,
    fieldConditions: _FieldCondition[],
    valueConditions: _ValueCondition[],
}

type FormRuleSet = {
    form: Form,
    rules: _ValidationRule[]
}

export class ValidationManager implements FieldListener {

    private static _instance: ValidationManager;

    public static getInstance(): ValidationManager {
        if (!(ValidationManager._instance)) {
            ValidationManager._instance = new ValidationManager();
        }
        return ValidationManager._instance;
    }

    private formRules: FormRuleSet[];

    private constructor() {
        this.formRules = [];
    }

    public getName(): string {
        return "Validation Manager";
    }

    public addRuleToForm(form: Form, rule: ValidationRule): boolean { // returns whether the rule was added
        /*
         validate the rule
         1. does the rule have a comparison field or static for each condition?
         2. do the fields exist?
         3. are the comparisons valid types to compare?
        */
        let targetField: Field | undefined = form.getFieldFromDataFieldId(rule.targetDataFieldId);
        if (!targetField) {
            logger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - NOT FOUND in form`);
            return false;
        }

        let convertedRule: _ValidationRule = {
            targetField: targetField,
            response: rule.response,
            fieldConditions: [],
            valueConditions: []
        }


        rule.conditions.forEach((condition) => {
            // do we have one of values or source field?
            if (!(condition.values) && !(condition.sourceDataFieldId)) {
                logger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - a condition is missing both values and source field`);
                return false;
            }
            // is this a target field value comparison?
            if ((condition.values) && (condition.sourceDataFieldId)) {
                let sourceField: Field | undefined = form.getFieldFromDataFieldId(condition.sourceDataFieldId);
                if (!sourceField) {
                    logger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - source field ${condition.sourceDataFieldId} NOT FOUND`);
                    return false;
                }
                convertedRule.fieldConditions.push({
                    sourceField: sourceField,
                    comparison: condition.comparison,
                    values: condition.values
                });
                sourceField.addFieldListener(this);
            } else if (condition.values) { // is this a value comparison?
                // add a new value rule to the internal structure
                convertedRule.valueConditions.push({values: condition.values, comparison: condition.comparison});
                // @ts-ignore
                targetField.addFieldListener(this);
            } else if (condition.sourceDataFieldId) { // is this a field vs field comparison
                let sourceField: Field | undefined = form.getFieldFromDataFieldId(condition.sourceDataFieldId);
                if (!sourceField) {
                    logger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - source field ${condition.sourceDataFieldId} NOT FOUND`);
                    return false;
                }
                /*
                   are we comparing two fields that can be compared?
                   allowed combinations are:
                   date|datetime vs date|datetime
                   time|short time vs time|short time
                   boolean vs boolean
                   integer|float vs number|float
                   any other vs any other
                 */
                let sourceType = sourceField.getFieldDefinition().type;
                // @ts-ignore
                let targetType = targetField.getFieldDefinition().type;

                switch (targetType) {
                    case (FieldType.date):
                    case (FieldType.datetime): {
                        if ((sourceType !== FieldType.datetime) &&
                            (sourceType !== FieldType.date)) {
                            logger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - target is date(time), source is NOT`);
                            return false;
                        }
                        break;
                    }
                    case (FieldType.time):
                    case (FieldType.shortTime): {
                        if ((sourceType !== FieldType.time) &&
                            (sourceType !== FieldType.shortTime)) {
                            logger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - target is time, source is NOT`);
                            return false;
                        }
                        break;
                    }
                    case (FieldType.boolean): {
                        if ((sourceType !== FieldType.boolean)) {
                            logger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - target is boolean, source is NOT`);
                            return false;
                        }
                        break;
                    }
                    case (FieldType.integer):
                    case (FieldType.float): {
                        if ((sourceType !== FieldType.integer) &&
                            (sourceType !== FieldType.float)) {
                            logger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - target is number, source is NOT`);
                            return false;
                        }
                        break;
                    }
                }
                convertedRule.fieldConditions.push({sourceField: sourceField, comparison: condition.comparison});
                sourceField.addFieldListener(this);
            }
        });
        logger(`Converted rule to `);
        logger(convertedRule);

        let index = this.formRules.findIndex((formRule) => formRule.form.getId() === form.getId());
        let formRules: FormRuleSet;
        // store the rules for later execution
        if (index < 0) {
            formRules = {
                form: form,
                rules: [convertedRule]
            }
        } else {
            formRules = this.formRules[index];
            formRules.rules.push(convertedRule);
        }

        return true;
    }

    private areTwoFieldsEqual(targetField: Field, sourceField: Field): RuleCheck {
        if (targetField.getValue() !== sourceField.getValue()) {
            return {
                ruleFailed: true,
                message: `${targetField.getName()} must be equal to ${sourceField.getName()}`,
            };
        }
        return {ruleFailed: false};
    }

    private compareTwoValuesWithTypes(targetType: FieldType, targetValue: string | null, sourceType: FieldType, sourceValue: string | null, comparison: ComparisonType): boolean {
        if (!(targetValue) || !(sourceValue)) return false;  // no null comparisons

        switch (targetType) {
            case (FieldType.date): {
                targetValue += ' 00:00:00';
                if (sourceType === FieldType.date) {
                    sourceValue += ' 00:00:00';
                }
                break;
            }
            case (FieldType.datetime): {
                if (sourceType === FieldType.date) {
                    sourceValue += ' 00:00:00';
                }
                break;
            }
            case (FieldType.time): {
                if (sourceType === FieldType.shortTime) {
                    sourceValue += ':00';
                }
                break;
            }
            case (FieldType.shortTime): {
                targetValue += ':00';
                if (sourceType === FieldType.shortTime) {
                    sourceValue += ':00';
                }
                break;
            }
        }

        logger(`Comparing ${targetValue} of type ${targetType} against ${sourceValue} of type ${sourceType}`);

        switch (comparison) {
            case ComparisonType.lessThan: {
                return (targetValue < sourceValue);
            }
            case ComparisonType.lessThanEqual: {
                return (targetValue <= sourceValue);
            }
            case ComparisonType.greaterThanEqual: {
                return (targetValue >= sourceValue);
            }
            case ComparisonType.greaterThan: {
                return (targetValue > sourceValue);
            }
            case ComparisonType.equals: {
                return (targetValue === sourceValue);
            }
        }
        return false;
    }

    private isSourceLessThanTarget(targetField: Field, sourceField: Field): RuleCheck {
        let sourceType: FieldType = sourceField.getFieldDefinition().type;
        let targetType: FieldType = targetField.getFieldDefinition().type;
        let sourceValue = sourceField.getValue();
        let targetValue = targetField.getValue();

        if (!this.compareTwoValuesWithTypes(targetType, targetValue, sourceType, sourceValue, ComparisonType.lessThanEqual)) {
            return {
                ruleFailed: true,
                message: `${targetField.getName()} must be greater than ${sourceField.getName()}`,
            };
        }
        return {ruleFailed: false};
    }

    private isSourceLessThanEqualTarget(targetField: Field, sourceField: Field): RuleCheck {
        let check: RuleCheck = this.areTwoFieldsEqual(targetField, sourceField);
        if (check.ruleFailed) {
            check = this.isSourceLessThanTarget(targetField, sourceField);
            if (check.ruleFailed) {
                return {
                    ruleFailed: true,
                    message: `${targetField.getName()} must be greater than or equal to ${sourceField.getName()}`,
                };

            }
        }
        return {ruleFailed: false};
    }

    private isSourceGreaterThanTarget(targetField: Field, sourceField: Field): RuleCheck {
        let sourceType: FieldType = sourceField.getFieldDefinition().type;
        let targetType: FieldType = targetField.getFieldDefinition().type;
        let sourceValue = sourceField.getValue();
        let targetValue = targetField.getValue();

        if (!this.compareTwoValuesWithTypes(targetType, targetValue, sourceType, sourceValue, ComparisonType.greaterThanEqual)) {
            return {
                ruleFailed: true,
                message: `${targetField.getName()} must be less than ${sourceField.getName()}`,
            };
        }
        return {ruleFailed: false};
    }

    private isTargetNull(targetField: Field): RuleCheck {
        let targetValue = targetField.getValue();
        // @ts-ignore
        if ((targetValue) && (targetValue.trim().length > 0)) {
            return {
                ruleFailed: true,
                message: `${targetField.getName()} must be empty`,
            };
        }
        return {ruleFailed: false};

    }

    private isTargetNotNull(targetField: Field): RuleCheck {
        let targetValue = targetField.getValue();
        // @ts-ignore
        if ((!targetValue) || (targetValue.trim().length > 0)) {
            return {
                ruleFailed: true,
                message: `${targetField.getName()} must not be empty`,
            };
        }
        return {ruleFailed: false};

    }

    private doesTargetHaveValue(targetField: Field, values: string): RuleCheck {
        let targetValue = targetField.getValue();
        if (targetValue) {
            // split the values by commas
            let splits:string[] = values.split(',');
            let foundInValue:boolean = false;
            splits.forEach((split) => {
                if (targetValue === split) {
                    foundInValue = true;
                }
            });
            if (foundInValue) {
                return {ruleFailed:false};
            }
        }
        return {
            ruleFailed: true,
            message: `${targetField.getName()} must be have a value in ${values}`,
        };
    }

    private isSourceGreaterThanEqualTarget(targetField: Field, sourceField: Field): RuleCheck {
        let check: RuleCheck = this.areTwoFieldsEqual(targetField, sourceField);
        if (check.ruleFailed) {
            check = this.isSourceGreaterThanTarget(targetField, sourceField);
            if (check.ruleFailed) {
                return {
                    ruleFailed: true,
                    message: `${targetField.getName()} must be less than or equal to ${sourceField.getName()}`,
                };
            }
        }
        return {ruleFailed: false};
    }


    private compareFields(targetField: Field, sourceField: Field, comparison: ComparisonType, value: string): RuleCheck {
        switch (comparison) {
            case ComparisonType.equals: {
                return this.areTwoFieldsEqual(targetField, sourceField);
                break;
            }
            case ComparisonType.lessThan: {
                return this.isSourceLessThanTarget(targetField, sourceField);
                break;
            }
            case ComparisonType.lessThanEqual: {
                return this.isSourceLessThanEqualTarget(targetField, sourceField);
                break;
            }
            case ComparisonType.greaterThan: {
                return this.isSourceGreaterThanTarget(targetField, sourceField);
                break;
            }
            case ComparisonType.greaterThanEqual: {
                return this.isSourceGreaterThanEqualTarget(targetField, sourceField);
                break;
            }
            case ComparisonType.isNull: {
                return this.isTargetNull(targetField);
                break;
            }
            case ComparisonType.isNotNull: {
                return this.isTargetNotNull(targetField);
                break;
            }
            case ComparisonType.hasValue: {
                return this.doesTargetHaveValue(targetField, value);
                break;
            }
        }
    }

    private executeRule(rule: _ValidationRule): RuleResponse {
        let response: RuleResponse = {
            field: rule.targetField,
            ruleFailed: false,
            response: rule.response,
        }
        // run each field comparison
        rule.fieldConditions.every((condition) => {
            let values = (condition.values) ? condition.values : '';
            let ruleCheck: RuleCheck = this.compareFields(rule.targetField, condition.sourceField, condition.comparison, values);
            if (ruleCheck.ruleFailed) {
                response.ruleFailed = true;
                response.message = ruleCheck.message;
                return false;
            }
            return true;
        });
        // run each value comparison if we haven't already failed
        if (!response.ruleFailed) {
            rule.valueConditions.forEach((condition) => {
                let ruleCheck: RuleCheck = this.compareFields(rule.targetField, rule.targetField, ComparisonType.hasValue, condition.values);
                if (ruleCheck.ruleFailed) {
                    response.ruleFailed = true;
                    response.message = ruleCheck.message;
                    return false;
                }
                return true;
            });
        }
        return response;
    }

    private getRulesForFieldChange(formId: string, dataFieldId: string): _ValidationRule[] {
        let rules: _ValidationRule[] = [];
        // lets go through the rules for the form
        logger(`Finding rules for form ${formId} and data field ${dataFieldId}`);
        let index = this.formRules.findIndex((formRule) => formRule.form.getId() === formId);
        if (index > 0) {
            const ruleSet: FormRuleSet = this.formRules[index];

            // the dataFieldId could be the target or one of the sources
            ruleSet.rules.forEach((rule) => {
                if (rule.targetField.getId() === dataFieldId) {
                    logger(`Found rule where data field ${dataFieldId} is target`);
                    if (rule.targetField.isValid()) {
                        rules.push(rule);
                    }
                    else {
                        logger(`Found rule where data field ${dataFieldId} is target but value is not currently valid`);
                    }
                } else {
                    rule.fieldConditions.every((value: { sourceField: Field, comparison: ComparisonType }) => {
                        if (value.sourceField.getId() === dataFieldId) {
                            logger(`Found rule where data field ${dataFieldId} is source`);
                            if (value.sourceField.isValid()) {
                                rules.push(rule);
                            }
                            else {
                                logger(`Found rule where data field ${dataFieldId} is source but value is not currently valid`);
                            }
                            return false;
                        }
                        return true;
                    });
                }
            });
        }
        return rules;
    }

    public failedValidation(formId: string, field: FieldDefinition, currentValue: string, message: string): void {
    } // ignored, we might be causing

    public valueChanged(formId: string, field: FieldDefinition, newValue: string | null): void {
        logger(`Handling field change - form ${formId}, data field ${field.id}, value ${newValue}`);
        // a field we are listening to has changed
        // which rules apply?
        const rules: _ValidationRule[] = this.getRulesForFieldChange(formId, field.id);
        // execute each rule and collect the responses
        let failedResponses: RuleResponse[] = [];

        rules.forEach((rule) => {
            let response: RuleResponse = this.executeRule(rule);
            if (response.ruleFailed) {
                failedResponses.push(response);
            }
        });

        // for each failed response let the target field know based on the response type
        failedResponses.forEach((response) => {
            switch (response.response) {
                case ConditionResponse.hide: {
                    response.field.hide();
                    break;
                }
                case ConditionResponse.show: {
                    response.field.show();
                    break;
                }
                case ConditionResponse.invalid: {
                    if (response.message) response.field.setInvalid(response.message);
                    break;
                }
                case ConditionResponse.valid: {
                    response.field.setValid();
                    break;
                }
            }
        })
    }


}