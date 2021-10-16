import {FieldFormatter, FieldRenderer, FieldValidator, ValidationResponse} from "../form/FormUITypeDefs";
import {FieldDefinition, FieldValueGenerator} from "../../model/DataObjectTypeDefs";
import debug from 'debug';
import {KeyType} from "../ConfigurationTypes";
import {Field} from "../form/field/Field";

const flogger = debug('basic-field-operations-formatter');
const vlogger = debug('basic-field-operations-validator');
const glogger = debug('basic-field-operations-generator');
const rlogger = debug('basic-field-operations-renderer');

type FieldNameValue = {
    id: string,
    value: string
}

export class RBGFieldOperations implements FieldFormatter, FieldValidator, FieldValueGenerator,FieldRenderer {
    private radioButtons: HTMLInputElement[] = [];

    public constructor() {
    }


    // called when saving, change to final values
    formatValue(field: FieldDefinition, currentValue: string): any {
        flogger(`Handling format value for RBG ${field.displayName} with value ${currentValue}`);
        let result: any = currentValue;
        // find the current selected radio button
        this.radioButtons.forEach((radioButton) => {
            if (radioButton.checked) {
                result = radioButton.value;
                if (field.idType === KeyType.number) {
                    result = parseInt(result);
                }
            }
        });

        flogger(`Handling format value for field ${field.displayName} with value ${currentValue} - result is ${result}`);
        return result;
    }

    isValidValue(field: FieldDefinition, currentValue: string | null): ValidationResponse {
        vlogger(`Handling is valid value for field ${field.displayName} with value ${currentValue}`);
        let response: ValidationResponse = {
            isValid: false,
            resetOnFailure: false
        }

        // basics first, is the field mandatory?
        if (field.mandatory) {
            this.radioButtons.forEach((radioButton) => {
                if (radioButton.checked) {
                    response.isValid = true;
                }
            });
            if (!response.isValid) {
                response.message = `${field.displayName} is required. Please select one of the values.`;
                vlogger(`Handling is valid value for field ${field.displayName} with value ${currentValue} - is valid is ${response.isValid} with message ${response.message}`);
                return response;
            }
        } else {
            response.isValid = true;
        }
        // ok, so we have some content, we need to check if the value is a valid format with regular expressions
        vlogger(`Handling is valid value for field ${field.displayName} with value ${currentValue} - is valid is ${response.isValid} with message ${response.message}`);
        return response;
    }

    renderValue(field:Field|null,fieldDef: FieldDefinition, currentValue: string): string | null {
        rlogger(`Rendering value for field ${fieldDef.displayName} with new value ${currentValue}`);
        this.radioButtons.forEach((radioButton) => {
            if (radioButton.value === currentValue) radioButton.checked = true;
        });
        return null;
    }


    generate(field: FieldDefinition, isCreate: boolean): string {
        return '';
    }

    setSubElements(elements: HTMLInputElement[]): void {
        this.radioButtons = elements;
    }


}