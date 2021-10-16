import {Field} from "../field/Field";
import {FieldType} from "../../../model/DataObjectTypeDefs";
import {ComparisonType} from "../../../CommonTypes";
import {RuleCheck} from "./ValidationManager";
import debug from 'debug';

const logger = debug('validation-helper-functions');

export class ValidationHelperFunctions {

    private static _instance: ValidationHelperFunctions;

    public constructor() {}

    public static getInstance(): ValidationHelperFunctions {
        if (!(ValidationHelperFunctions._instance)) {
            ValidationHelperFunctions._instance = new ValidationHelperFunctions();
        }
        return ValidationHelperFunctions._instance;
    }


    public areTwoFieldsEqual(targetField: Field, sourceField: Field): RuleCheck {
        let result:RuleCheck = {ruleFailed: false}
        if (targetField.getValue() !== sourceField.getValue()) {
            result = {
                ruleFailed: true,
                message: `${targetField.getName()} must be equal to ${sourceField.getName()}`,
            };
        }
        return result;
    }

    public isFieldAndValueEqual(field: Field, value:string): RuleCheck {
        let result:RuleCheck = {ruleFailed: false}
        if (field.getValue() !== value) {
            result = {
                ruleFailed: true,
                message: `${field.getName()} must be equal to ${value}`,
            };
        }
        return result;
    }


    public compareTwoValuesWithTypes(targetType: FieldType, targetValue: string | null, sourceType: FieldType, sourceValue: string | null, comparison: ComparisonType): boolean {
        if (!(targetValue) || !(sourceValue)) return false;  // no null comparisons
        logger(`Comparing two values with types and comparison ${comparison} - target value (type:${targetType},value:${targetValue}), source value (type:${sourceType},value:${sourceValue})`)

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

    public isTargetLessThanSource(targetField: Field, sourceField: Field): RuleCheck {
        let result:RuleCheck = {ruleFailed: false}
        let sourceType: FieldType = sourceField.getFieldDefinition().type;
        let targetType: FieldType = targetField.getFieldDefinition().type;
        let sourceValue = sourceField.getValue();
        let targetValue = targetField.getValue();

        if (!this.compareTwoValuesWithTypes(targetType, targetValue, sourceType, sourceValue, ComparisonType.lessThan)) {
            result = {
                ruleFailed: true,
                message: `${targetField.getName()} must be less than ${sourceField.getName()}`,
            };
        }
        return result;
    }

    public isFieldLessThanValue(field: Field, value:string): RuleCheck {
        let result:RuleCheck = {ruleFailed: false}
        let type: FieldType = field.getFieldDefinition().type;
        let sourceValue = field.getValue();

        if (!this.compareTwoValuesWithTypes(type, sourceValue, type, value, ComparisonType.lessThan)) {
            result = {
                ruleFailed: true,
                message: `${field.getName()} must be less than ${value}`,
            };
        }
        return result;
    }

    public isFieldLessThanEqualValue(field: Field, value:string): RuleCheck {
        let result:RuleCheck = {ruleFailed: false}
        let check: RuleCheck = this.isFieldAndValueEqual(field, value);
        if (check.ruleFailed) {
            check = this.isFieldLessThanValue(field, value);
            if (check.ruleFailed) {
                result = {
                    ruleFailed: true,
                    message: `${field.getName()} must be less than or equal to ${value}`,
                };

            }
        }
        return result;
    }

    public isFieldGreaterThanValue(field: Field, value:string): RuleCheck {
        let result:RuleCheck = {ruleFailed: false}
        let type: FieldType = field.getFieldDefinition().type;
        let sourceValue = field.getValue();

        if (!this.compareTwoValuesWithTypes(type, sourceValue, type, value, ComparisonType.greaterThan)) {
            result = {
                ruleFailed: true,
                message: `${field.getName()} must be greater than ${value}`,
            };
        }
        return result;
    }
    public isFieldGreaterThanEqualValue(field: Field, value:string): RuleCheck {
        let result:RuleCheck = {ruleFailed: false}
        let check: RuleCheck = this.isFieldAndValueEqual(field, value);
        if (check.ruleFailed) {
            check = this.isFieldGreaterThanValue(field, value);
            if (check.ruleFailed) {
                result = {
                    ruleFailed: true,
                    message: `${field.getName()} must be greater than or equal to ${value}`,
                };

            }
        }
        return result;
    }

    public isTargetLessThanEqualSource(targetField: Field, sourceField: Field): RuleCheck {
        let result:RuleCheck = {ruleFailed: false}
        let check: RuleCheck = this.areTwoFieldsEqual(targetField, sourceField);
        if (check.ruleFailed) {
            check = this.isTargetLessThanSource(targetField, sourceField);
            if (check.ruleFailed) {
                result = {
                    ruleFailed: true,
                    message: `${targetField.getName()} must be less than or equal to ${sourceField.getName()}`,
                };

            }
        }
        return result;
    }

    public isTargetGreaterThan(targetField: Field, sourceField: Field): RuleCheck {
        let result:RuleCheck = {ruleFailed: false}
        let sourceType: FieldType = sourceField.getFieldDefinition().type;
        let targetType: FieldType = targetField.getFieldDefinition().type;
        let sourceValue = sourceField.getValue();
        let targetValue = targetField.getValue();

        if (!this.compareTwoValuesWithTypes(targetType, targetValue, sourceType, sourceValue, ComparisonType.greaterThan)) {
            result = {
                ruleFailed: true,
                message: `${targetField.getName()} must be greater than ${sourceField.getName()}`,
            };
        }
        return result;
    }

    public isFieldNull(sourceField: Field): RuleCheck {
        let result:RuleCheck = {ruleFailed: false}
        let targetValue = sourceField.getValue();
        // @ts-ignore
        logger(`field ${field.getId()} is null - current value is '${targetValue}'`);
        if ((targetValue) && (targetValue.trim().length > 0)) {
            result = {
                ruleFailed: true,
                message: `${sourceField.getName()} must be empty`,
            };
        }
        return result;

    }

    public isFieldNotNull(field: Field): RuleCheck {
        let result:RuleCheck = {ruleFailed: false}
        let targetValue = field.getValue();
        logger(`field ${field.getId()} is NOT null - current value is '${targetValue}'`);
        // @ts-ignore
        if (targetValue) {
            if (targetValue.trim().length === 0) {
                result = {
                    ruleFailed: true,
                    message: `${field.getName()} must not be empty`,
                };
            }
            
        } 
        else {
            result = {
                ruleFailed: true,
                message: `${field.getName()} must not be empty`,
            };
        }
        return result;

    }

    public doesFieldHaveValue(field: Field, values: string): RuleCheck {
        let result:RuleCheck = {ruleFailed: false}
        let targetValue = field.getValue();
        logger(`does field ${field.getId()} have value from ${values} - current value is ${targetValue}`);
        if (targetValue) {
            // split the values by commas
            let splits: string[] = values.split(',');
            let foundInValue: boolean = false;
            splits.forEach((split) => {
                if (targetValue === split) {
                    logger(`does field ${field.getId()} have value from ${values} - current value is ${targetValue} - found in value(s)`);
                    foundInValue = true;
                }
            });
            if (!foundInValue) {
                result = {
                    ruleFailed: true,
                    message: `${field.getName()} must be have a value in ${values}`,
                };
            }
        }
        return result;
    }

    public doesSourceFieldHaveValue(field: Field, values: string): RuleCheck {
        return this.doesFieldHaveValue(field, values);
    }

    public isTargetGreaterThanEqualSource(targetField: Field, sourceField: Field): RuleCheck {
        let result:RuleCheck = {ruleFailed: false}
        let check: RuleCheck = this.areTwoFieldsEqual(targetField, sourceField);
        if (check.ruleFailed) {
            check = this.isTargetGreaterThan(targetField, sourceField);
            if (check.ruleFailed) {
                result = {
                    ruleFailed: true,
                    message: `${targetField.getName()} must be greater than or equal to ${sourceField.getName()}`,
                };
            }
        }
        return result;
    }

    public compareFields(targetField: Field, sourceField: Field, comparison: ComparisonType, value: string): RuleCheck {
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
                return this.isFieldNull(sourceField);
                break;
            }
            case ComparisonType.isNotNull: {
                return this.isFieldNotNull(sourceField);
                break;
            }
            case ComparisonType.hasValue: {
                return this.doesSourceFieldHaveValue(sourceField, value);
                break;
            }
        }
    }
    
    public compareFieldWithValue(field: Field, comparison: ComparisonType, value: string): RuleCheck {
        switch (comparison) {
            case ComparisonType.equals: {
                return this.isFieldAndValueEqual(field, value);
                break;
            }
            case ComparisonType.lessThan: {
                return this.isFieldLessThanValue(field,value);
                break;
            }
            case ComparisonType.lessThanEqual: {
                return this.isFieldLessThanEqualValue(field,value);
                break;
            }
            case ComparisonType.greaterThan: {
                return this.isFieldGreaterThanValue(field,value);
                break;
            }
            case ComparisonType.greaterThanEqual: {
                return this.isFieldGreaterThanEqualValue(field,value);
                break;
            }
            case ComparisonType.isNull: {
                return this.isFieldNull(field);
                break;
            }
            case ComparisonType.isNotNull: {
                return this.isFieldNotNull(field);
                break;
            }
            case ComparisonType.hasValue: {
                return this.doesSourceFieldHaveValue(field, value);
                break;
            }
        }
    }


}