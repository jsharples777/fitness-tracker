import {ComparisonType, ConditionResponse, ValidationRule} from "./ValidationTypeDefs";
import {Form} from "../Form";
import {Field} from "../field/Field";
import debug from 'debug';
import {FieldDefinition, FieldType} from "../../../model/DataObjectTypeDefs";
import {FieldListener} from "../field/FieldListener";

const logger = debug('validation-manager');
const flogger = debug('validation-manager-rule-failure');


export type RuleCheck = {
    ruleFailed: boolean,
    message?: string
}

export type RuleResponse = {
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
        logger(`Adding rule on form ${form.getId()} for target field ${rule.targetDataFieldId}`);
        /*
         validate the rule
         1. does the rule have a comparison field or static for each condition?
         2. do the fields exist?
         3. are the comparisons valid types to compare?
        */
        let targetField: Field | undefined = form.getFieldFromDataFieldId(rule.targetDataFieldId);
        if (!targetField) {
            flogger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - NOT FOUND in form`);
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
                flogger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - a condition is missing both values and source field`);
                return false;
            }
            // is this a target field value comparison?
            if ((condition.values) && (condition.sourceDataFieldId)) {
                logger(`Rule adding for form ${form.getId()} for target field ${rule.targetDataFieldId} - source field ${condition.sourceDataFieldId} with values ${condition.values}`);
                let sourceField: Field | undefined = form.getFieldFromDataFieldId(condition.sourceDataFieldId);
                if (!sourceField) {
                    flogger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - source field ${condition.sourceDataFieldId} NOT FOUND`);
                    return false;
                }
                convertedRule.fieldConditions.push({
                    sourceField: sourceField,
                    comparison: condition.comparison,
                    values: condition.values
                });
                sourceField.addFieldListener(this);
            } else if (condition.values) { // is this a value comparison?
                logger(`Rule adding for form ${form.getId()} for target field ${rule.targetDataFieldId} - values ${condition.values}`);
                // add a new value rule to the internal structure
                convertedRule.valueConditions.push({values: condition.values, comparison: condition.comparison});
                // @ts-ignore
                targetField.addFieldListener(this);
            } else if (condition.sourceDataFieldId) { // is this a field vs field comparison
                logger(`Rule adding for form ${form.getId()} for target field ${rule.targetDataFieldId} - source field ${condition.sourceDataFieldId}`);
                let sourceField: Field | undefined = form.getFieldFromDataFieldId(condition.sourceDataFieldId);
                if (!sourceField) {
                    flogger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - source field ${condition.sourceDataFieldId} NOT FOUND`);
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
                            flogger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - target is date(time), source is NOT`);
                            return false;
                        }
                        break;
                    }
                    case (FieldType.time):
                    case (FieldType.shortTime): {
                        if ((sourceType !== FieldType.time) &&
                            (sourceType !== FieldType.shortTime)) {
                            flogger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - target is time, source is NOT`);
                            return false;
                        }
                        break;
                    }
                    case (FieldType.boolean): {
                        if ((sourceType !== FieldType.boolean)) {
                            flogger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - target is boolean, source is NOT`);
                            return false;
                        }
                        break;
                    }
                    case (FieldType.integer):
                    case (FieldType.float): {
                        if ((sourceType !== FieldType.integer) &&
                            (sourceType !== FieldType.float)) {
                            flogger(`Rule not added for form ${form.getId()} for target field ${rule.targetDataFieldId} - target is number, source is NOT`);
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
        let formRuleSet: FormRuleSet;
        // store the rules for later execution
        if (index < 0) {
            formRuleSet = {
                form: form,
                rules: [convertedRule]
            }
            this.formRules.push(formRuleSet)
        } else {
            formRuleSet = this.formRules[index];
            formRuleSet.rules.push(convertedRule);
        }
        logger(`Current set of rules for form ${form.getId()}`);
        logger(formRuleSet);

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

    private isTargetLessThanSource(targetField: Field, sourceField: Field): RuleCheck {
        let sourceType: FieldType = sourceField.getFieldDefinition().type;
        let targetType: FieldType = targetField.getFieldDefinition().type;
        let sourceValue = sourceField.getValue();
        let targetValue = targetField.getValue();

        if (!this.compareTwoValuesWithTypes(targetType, targetValue, sourceType, sourceValue, ComparisonType.lessThan)) {
            return {
                ruleFailed: true,
                message: `${targetField.getName()} must be less than ${sourceField.getName()}`,
            };
        }
        return {ruleFailed: false};
    }

    private isTargetLessThanEqualSource(targetField: Field, sourceField: Field): RuleCheck {
        let check: RuleCheck = this.areTwoFieldsEqual(targetField, sourceField);
        if (check.ruleFailed) {
            check = this.isTargetLessThanSource(targetField, sourceField);
            if (check.ruleFailed) {
                return {
                    ruleFailed: true,
                    message: `${targetField.getName()} must be less than or equal to ${sourceField.getName()}`,
                };

            }
        }
        return {ruleFailed: false};
    }

    private isTargetGreaterThan(targetField: Field, sourceField: Field): RuleCheck {
        let sourceType: FieldType = sourceField.getFieldDefinition().type;
        let targetType: FieldType = targetField.getFieldDefinition().type;
        let sourceValue = sourceField.getValue();
        let targetValue = targetField.getValue();

        if (!this.compareTwoValuesWithTypes(targetType, targetValue, sourceType, sourceValue, ComparisonType.greaterThan)) {
            return {
                ruleFailed: true,
                message: `${targetField.getName()} must be greater than ${sourceField.getName()}`,
            };
        }
        return {ruleFailed: false};
    }

    private isSourceNull(sourceField: Field): RuleCheck {
        let targetValue = sourceField.getValue();
        // @ts-ignore
        if ((targetValue) && (targetValue.trim().length > 0)) {
            return {
                ruleFailed: true,
                message: `${sourceField.getName()} must be empty`,
            };
        }
        return {ruleFailed: false};

    }

    private isSourceNotNull(sourceField: Field): RuleCheck {
        let targetValue = sourceField.getValue();
        // @ts-ignore
        if ((!targetValue) || (targetValue.trim().length > 0)) {
            return {
                ruleFailed: true,
                message: `${sourceField.getName()} must not be empty`,
            };
        }
        return {ruleFailed: false};

    }

    private doesFieldHaveValue(field: Field, values: string): RuleCheck {
        let targetValue = field.getValue();
        logger(`does field ${field.getId()} have value from ${values} - current value is ${field.getValue()}`);
        if (targetValue) {
            // split the values by commas
            let splits:string[] = values.split(',');
            let foundInValue:boolean = false;
            splits.forEach((split) => {
                if (targetValue === split) {
                    logger(`does field ${field.getId()} have value from ${values} - current value is ${field.getValue()} - found in value(s)`);
                    foundInValue = true;
                }
            });
            if (foundInValue) {
                return {ruleFailed:false};
            }
        }
        return {
            ruleFailed: true,
            message: `${field.getName()} must be have a value in ${values}`,
        };
    }

    private doesTargetFieldHaveValue(field: Field, values: string): RuleCheck {
        return this.doesFieldHaveValue(field,values);
    }

    private doesSourceFieldHaveValue(field: Field, values: string): RuleCheck {
        return this.doesFieldHaveValue(field,values);
    }

    private isTargetGreaterThanEqualSource(targetField: Field, sourceField: Field): RuleCheck {
        let check: RuleCheck = this.areTwoFieldsEqual(targetField, sourceField);
        if (check.ruleFailed) {
            check = this.isTargetGreaterThan(targetField, sourceField);
            if (check.ruleFailed) {
                return {
                    ruleFailed: true,
                    message: `${targetField.getName()} must be greater than or equal to ${sourceField.getName()}`,
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
                return this.isTargetLessThanSource(targetField, sourceField);
                break;
            }
            case ComparisonType.lessThanEqual: {
                return this.isTargetLessThanEqualSource(targetField, sourceField);
                break;
            }
            case ComparisonType.greaterThan: {
                return this.isTargetGreaterThan(targetField, sourceField);
                break;
            }
            case ComparisonType.greaterThanEqual: {
                return this.isTargetGreaterThanEqualSource(targetField, sourceField);
                break;
            }
            case ComparisonType.isNull: {
                return this.isSourceNull(sourceField);
                break;
            }
            case ComparisonType.isNotNull: {
                return this.isSourceNotNull(sourceField);
                break;
            }
            case ComparisonType.hasValue: {
                return this.doesSourceFieldHaveValue(sourceField, value);
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
        logger(`Executing rule for target ${rule.targetField.getId()}`);
        logger(rule);
        rule.fieldConditions.every((condition) => {
            logger('field condition rule');
            logger(condition);
            let values = (condition.values) ? condition.values : '';
            let ruleCheck: RuleCheck = this.compareFields(rule.targetField, condition.sourceField, condition.comparison, values);
            if (ruleCheck.ruleFailed) {
                flogger('field condition rule FAILED');
                response.ruleFailed = true;
                response.message = ruleCheck.message;
                return false;
            }
            logger('field condition rule PASSED');
            return true;
        });
        // run each value comparison if we haven't already failed
        if (!response.ruleFailed) {
            rule.valueConditions.forEach((condition) => {
                logger('value condition rule');
                logger(condition);
                let ruleCheck: RuleCheck = this.compareFields(rule.targetField, rule.targetField, ComparisonType.hasValue, condition.values);
                if (ruleCheck.ruleFailed) {
                    flogger('value condition rule FAILED');
                    response.ruleFailed = true;
                    response.message = ruleCheck.message;
                    return false;
                }
                logger('value condition rule PASSED');
                return true;
            });
        }
        return response;
    }

    private getRulesForFieldChange(formId: string, dataFieldId: string,includeSourceFields:boolean): _ValidationRule[] {
        let rules: _ValidationRule[] = [];
        // lets go through the rules for the form
        logger(`Finding rules for form ${formId} and data field ${dataFieldId}`);
        let index = this.formRules.findIndex((formRule) => formRule.form.getId() === formId);
        if (index >= 0) {
            const ruleSet: FormRuleSet = this.formRules[index];

            // the dataFieldId could be the target or one of the sources
            ruleSet.rules.forEach((rule) => {
                if (rule.targetField.getId() === dataFieldId) {
                    logger(`Found rule where data field ${dataFieldId} is target`);
                    if (rule.targetField.isValid()) {
                        rules.push(rule);
                    }
                    else {
                        flogger(`Found rule where data field ${dataFieldId} is target but value is not currently valid`);
                    }
                } else {
                    if (includeSourceFields) {
                        rule.fieldConditions.every((value: { sourceField: Field, comparison: ComparisonType }) => {
                            if (value.sourceField.getId() === dataFieldId) {
                                logger(`Found rule where data field ${dataFieldId} is source`);
                                if (value.sourceField.isValid()) {
                                    rules.push(rule);
                                } else {
                                    flogger(`Found rule where data field ${dataFieldId} is source but value is not currently valid`);
                                }
                                return false;
                            }
                            return true;
                        });
                    }
                }
            });
        }
        return rules;
    }

    public failedValidation(formId: string, field: FieldDefinition, currentValue: string, message: string): void {
    } // ignored, we might be causing

    public applyRulesToTargetField(formId:string, field:FieldDefinition,onlyRulesOfType:ConditionResponse|null) : RuleCheck {
        logger(`Checking invalidation only rules for form ${formId}, data field ${field.id}`);
        // which rules apply?
        const rules: _ValidationRule[] = this.getRulesForFieldChange(formId, field.id,false);

        let result:RuleCheck = {
            ruleFailed:false
        }

        rules.every((rule) => { // we only want rules that make a field invalid
            if ((onlyRulesOfType && rule.response === onlyRulesOfType) || !onlyRulesOfType) {
                let response: RuleResponse = this.executeRule(rule);
                if (response.ruleFailed) {
                    flogger(`Rule failed with message ${response.message}`);
                    result.ruleFailed = true;
                    result.message = response.message;
                    return false;
                }
            }
            return true;
        });
        return result;
    }

    public valueChanged(formId: string, field: FieldDefinition, newValue: string | null): void {
        logger(`Handling field change - form ${formId}, data field ${field.id}, value ${newValue}`);
        // a field we are listening to has changed
        // which rules apply?
        const rules: _ValidationRule[] = this.getRulesForFieldChange(formId, field.id,true);
        // execute each rule and collect the responses
        let failedResponses: RuleResponse[] = [];

        rules.forEach((rule) => {
            let response: RuleResponse = this.executeRule(rule);
            if (response.ruleFailed) {
                failedResponses.push(response);
            }
        });

        logger(`Have ${failedResponses.length} failed rules - applying each`);
        // for each failed response let the target field know based on the response type
        failedResponses.forEach((response) => {
            switch (response.response) {
                case ConditionResponse.hide: {
                    logger(`Apply hide ${response.field.getId()}`);
                    response.field.hide();
                    break;
                }
                case ConditionResponse.show: {
                    logger(`Apply show ${response.field.getId()}`);
                    response.field.show();
                    break;
                }
                case ConditionResponse.invalid: {
                    logger(`Apply invalid ${response.field.getId()}`);
                    if (response.message) response.field.setInvalid(response.message);
                    break;
                }
                case ConditionResponse.valid: {
                    logger(`Apply valid ${response.field.getId()}`);
                    response.field.setValid();
                    break;
                }
            }
        })
    }


}