import moment from "moment";
import {v4} from 'uuid';
import {FieldFormatter, FieldRenderer, FieldValidator, ValidationResponse} from "../ui/form/FormUITypeDefs";
import {FieldDefinition, FieldType, FieldValueGenerator} from "./DataObjectTypeDefs";
import debug from 'debug';
import {KeyType} from "../ui/ConfigurationTypes";
import {SecurityManager} from "../security/SecurityManager";
import {Field} from "../ui/form/field/Field";

const flogger = debug('basic-field-operations-formatter');
const vlogger = debug('basic-field-operations-validator');
const glogger = debug('basic-field-operations-generator');
const rlogger = debug('basic-field-operations-renderer');

type FieldNameValue = {
    id: string,
    value: string
}

export class BasicFieldOperations implements FieldFormatter, FieldRenderer, FieldValidator, FieldValueGenerator {
    private static dateRegex: RegExp = /^((0?[1-9]|[12]\d|31)\/(0?[13578]|1[02])\/(\d{2}|\d{4})|(0?[1-9]|[12]\d|30)\/(0?[469]|11])\/(\d{2}|\d{4})|(0?[1-9]|1\d|2[0-8])\/02\/(\d{2}|\d{4})|(29\/02\/(\d{2})?(0[48]|[2468][048]|[13579][26]))|(29\/02\/([02468][048]|[13579][26])00))$/;
    private static emailRegex: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;
    private static shortTimeRegex: RegExp = /^([01]\d|2[0-3]):?([0-5]\d)$/;
    private static timeRegex: RegExp = /^([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/;
    private static dateTimeRegex: RegExp = /^((0?[1-9]|[12]\d|31)\/(0?[13578]|1[02])\/(\d{2}|\d{4})|(0?[1-9]|[12]\d|30)\/(0?[469]|11])\/(\d{2}|\d{4})|(0?[1-9]|1\d|2[0-8])\/02\/(\d{2}|\d{4})|(29\/02\/(\d{2})?(0[48]|[2468][048]|[13579][26]))|(29\/02\/([02468][048]|[13579][26])00))\s([01]\d|2[0-3]):?([0-5]\d):?([0-5]\d)$/;
    private static basicPasswordRegex: RegExp = /^[a-zA-Z0-9]{8,15}$/;
    private static integerRegex: RegExp = /^[+-]?\d+$/;
    private static floatRegexp: RegExp = /^[+-]?\d+(\.\d+)?$/;
    private static booleanRegexp: RegExp = /^true|false$/;
    private static durationRegexp: RegExp = /^(\d+:)?[0-5]?\d:[0-5]\d$/;
    private static colourRegexp: RegExp = /^#[0-9a-f]{6}$/;
    private previousFieldValues: FieldNameValue[];

    public constructor() {
        this.previousFieldValues = [];
    }

    setSubElements(elements: HTMLInputElement[]): void {
    }


    // called when saving, change to final values
    formatValue(field: FieldDefinition, currentValue: string): any {
        flogger(`Handling format value for field ${field.displayName} with value ${currentValue}`);
        let result: any = currentValue;
        switch (field.type) { // only need to change dates
            case (FieldType.date): {
                //convert to underlying number format
                result = moment(currentValue, 'DD/MM/YYYY').format('YYYYMMDD');
                break;
            }
            case (FieldType.datetime): {
                //convert to underlying number format
                result = moment(currentValue, 'DD/MM/YYYY HH:mm:ss').format('YYYYMMDDHHmmss');
                break;
            }
            case (FieldType.boolean): {
                result = (currentValue.toLowerCase() === 'true');
                break;
            }
            case (FieldType.id): {
                if (field.idType === KeyType.number) {
                    result = parseInt(currentValue);
                }
                break;
            }
            case (FieldType.float): {
                let parsed = parseFloat(currentValue);
                if (!isNaN(parsed)) {
                    result = parsed;
                }
                break;
            }
            case (FieldType.integer): {
                let parsed = parseFloat(currentValue);
                if (!isNaN(parsed)) {
                    result = parsed;
                }
                break;
            }

        }
        flogger(`Handling format value for field ${field.displayName} with value ${currentValue} - result is ${result}`);
        return result;
    }

    isValidValue(field: FieldDefinition, currentValue: string | null): ValidationResponse {
        vlogger(`Handling is valid value for field ${field.displayName} with value ${currentValue}`);
        let response: ValidationResponse = {
            isValid: true,
            resetOnFailure: false
        }

        // basics first, is the field mandatory?
        if (field.mandatory) {
            // do we have any content?
            if ((!currentValue) || (currentValue.trim().length === 0)) {
                response.isValid = false;
                response.message = `${field.displayName} is required. Please enter a valid value.`;
                vlogger(`Handling is valid value for field ${field.displayName} with value ${currentValue} - is valid is ${response.isValid} with message ${response.message}`);
                return response;
            }
            // boolean is a special case, and must be true
            if (field.type === FieldType.boolean) {
                if (currentValue.trim().toLowerCase() !== 'true') {
                    response.isValid = false;
                    response.message = `${field.displayName} is required and must be selected.`;
                    vlogger(`Handling is valid value for field ${field.displayName} with value ${currentValue} - is valid is ${response.isValid} with message ${response.message}`);
                    return response;
                }
            }
        }

        // ok, so we have some content, we need to check if the value is a valid format with regular expressions
        if (currentValue) {
            switch (field.type) {
                case (FieldType.datetime): {
                    response.isValid = BasicFieldOperations.dateTimeRegex.test(currentValue);
                    if (!response.isValid) {
                        response.message = `${field.displayName} must be DD/MM/YYYY hh:mm`;

                    }
                    break;
                }
                case (FieldType.date): {
                    response.isValid = BasicFieldOperations.dateRegex.test(currentValue);
                    if (!response.isValid) {
                        response.message = `${field.displayName} must be DD/MM/YYYY`;

                    }
                    break;
                }
                case (FieldType.float): {
                    response.isValid = BasicFieldOperations.floatRegexp.test(currentValue);
                    if (!response.isValid) {
                        response.message = `${field.displayName} must be 00.00`;
                    }
                    break;
                }
                case (FieldType.id): {
                    response.isValid = BasicFieldOperations.integerRegex.test(currentValue);
                    if (!response.isValid) {
                        response.message = `${field.displayName} must be an integer`;
                    }
                    break;
                }
                case (FieldType.email): {
                    response.isValid = BasicFieldOperations.emailRegex.test(currentValue);
                    if (!response.isValid) {
                        response.message = `${field.displayName} must be an email address`;
                    }
                    break;
                }
                case (FieldType.integer): {
                    response.isValid = BasicFieldOperations.integerRegex.test(currentValue);
                    if (!response.isValid) {
                        response.message = `${field.displayName} must be an integer`;
                    }
                    break;
                }
                case (FieldType.text): {
                    break;
                }
                case (FieldType.password): {
                    response.isValid = BasicFieldOperations.basicPasswordRegex.test(currentValue);
                    if (!response.isValid) {
                        response.message = `${field.displayName} must be 8 to 15 letters and digits only`;
                    }
                    break;
                }
                case (FieldType.time): {
                    response.isValid = BasicFieldOperations.timeRegex.test(currentValue);
                    if (!response.isValid) {
                        response.message = `${field.displayName} must be 24 hour time format HH:MM:SS`;
                    }
                    break;
                }
                case (FieldType.shortTime): {
                    response.isValid = BasicFieldOperations.shortTimeRegex.test(currentValue);
                    if (!response.isValid) {
                        response.message = `${field.displayName} must be 24 hour time format HH:MM`;
                    }
                    break;
                }
                case (FieldType.duration): {
                    response.isValid = BasicFieldOperations.durationRegexp.test(currentValue);
                    if (!response.isValid) {
                        response.message = `${field.displayName} must be in the format MM:SS or 999:MM:SS`;
                    }
                    break;
                }
                case (FieldType.boolean): {
                    response.isValid = BasicFieldOperations.booleanRegexp.test(currentValue);
                    if (!response.isValid) {
                        response.message = `${field.displayName} must be true or false`;
                    }
                    break;
                }
                case (FieldType.colour): {
                    response.isValid = BasicFieldOperations.colourRegexp.test(currentValue);
                    if (!response.isValid) {
                        response.message = `${field.displayName} must be a hex colour value #ffffff`;
                    }
                    break;
                }
            }
        }

        vlogger(`Handling is valid value for field ${field.displayName} with value ${currentValue} - is valid is ${response.isValid} with message ${response.message}`);
        return response;
    }

    renderValue(field:Field|null,fieldDef: FieldDefinition, currentValue: string): string | null {
        rlogger(`Rendering value for field ${fieldDef.displayName} with new value ${currentValue}`);
        // ensure we don't end up in an endless loop
        // if the value hasn't changed return null
        // let index = this.previousFieldValues.findIndex((fieldValue) => fieldValue.id === field.id);
        // if (index >= 0) {
        //     //we have a previous value
        //     let fieldValue: FieldNameValue = this.previousFieldValues[index];
        //     rlogger(`Rendering value for field ${field.displayName} with new value ${currentValue} - previous value ${fieldValue.value}`);
        //     if (fieldValue.value === currentValue) return null;
        // }
        // either not yet seen or value has changed from previous
        if (currentValue) { // only attempt to render non-empty dates
            let newValue: string = currentValue;

            switch (fieldDef.type) {
                case (FieldType.date): {
                    newValue = moment(currentValue, 'YYYYMMDD').format('DD/MM/YYYY');
                    break;
                }
                case (FieldType.datetime): {
                    newValue = moment(currentValue, 'YYYYMMDDHHmmss').format('DD/MM/YYYY HH:mm:ss');
                    break;
                }
            }

            // store the previous value
            this.setPreviousValue(fieldDef, newValue);
            rlogger(`Rendering value for field ${fieldDef.displayName} with new value ${currentValue} - rendered to ${newValue}`);
            return newValue;
        } else {
            // empty value, no rendering required
            rlogger(`Rendering value for field ${fieldDef.displayName} with new value is empty - no rendering required`);

            return null;
        }
    }

    generate(field: FieldDefinition, isCreate: boolean): string {
        let result = '';
        // are we generating the field?
        if (field.generator) {
            // are we only generating on create
            if (field.generator.onCreation && isCreate) {
                result = this.generateValue(field);
                glogger(`Generating value for field ${field.displayName} with on creation ${result}`);
            }
            // or if we are modifying and should also be modifying the value
            if (field.generator.onModify && !isCreate) {
                result = this.generateValue(field);
                glogger(`Generating value for field ${field.displayName} with on modify ${result}`);
            }
        }
        return result;
    }

    private setPreviousValue(field: FieldDefinition, newValue: string) {
        rlogger(`Storing previous value for field ${field.displayName} with  new value ${newValue}`);
        let fieldValue: FieldNameValue;

        let index = this.previousFieldValues.findIndex((fieldValue) => fieldValue.id === field.id);
        if (index >= 0) {
            //we have a previous value
            fieldValue = this.previousFieldValues[index];
            rlogger(`Storing previous value for field ${field.displayName} with new value ${newValue} - old value was ${fieldValue}`);
            fieldValue.value = newValue;
        } else {
            // create a new record of the value
            fieldValue = {
                id: field.id,
                value: newValue
            }
            rlogger(`Storing previous value for field ${field.displayName} with new value ${newValue} - NO previous`);
            this.previousFieldValues.push(fieldValue);
        }
    }

    private generateValue(field: FieldDefinition): string {
        let result = '';
        switch (field.type) {
            case (FieldType.datetime): {
                result = moment().format('YYYYMMDDHHmmss');
                break;
            }
            case (FieldType.date): {
                result = moment().format('YYYYMMDD');
                break;
            }
            case (FieldType.float): {
                result = '0.0';
                break;
            }
            case (FieldType.id): {
                result = '-1';
                break;
            }
            case (FieldType.email): {
                result = 'me@me.com';
                break;
            }
            case (FieldType.integer): {
                result = '0';
                break;
            }
            case (FieldType.text): {
                result = '';
                break;
            }
            case (FieldType.password): {
                result = '';
                break;
            }
            case (FieldType.time): {
                result = '00:00:00';
                break;
            }
            case (FieldType.shortTime): {
                result = '00:00';
                break;
            }
            case (FieldType.duration): {
                result = '00:00';
                break;
            }
            case (FieldType.boolean): {
                result = 'false';
                break;
            }
            case (FieldType.uuid): {
                result = v4();
                break;
            }
            case (FieldType.userId): {
                result = `${SecurityManager.getInstance().getLoggedInUsername()}`;
                break;
            }
            case (FieldType.colour): {
                result = `#ffffff`;
                break;
            }
        }
        return result;
    }

}