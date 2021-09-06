import {
    FieldDefinition,
    FieldFormatter,
    FieldRenderer,
    FieldType,
    FieldValidator,
    FieldValueGenerator,
    ValidationResponse
} from "../form/FormTypes";
import moment from "moment";
import uuid from 'uuid';

type FieldNameValue = {
    id: string,
    value: string
}

export class BasicFieldOperations implements FieldFormatter, FieldRenderer, FieldValidator, FieldValueGenerator {
    private previousFieldValues: FieldNameValue[];

    private static dateRegex: RegExp = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    private static emailRegex: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;
    private static timeRegex: RegExp = /^([01]\d|2[0-3]):?([0-5]\d)$/;
    private static dateTimeRegex: RegExp = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}\s([01]\d|2[0-3]):?([0-5]\d)$/;
    private static basicPasswordRegex: RegExp = /^[a-zA-Z0-9]{8,15}$/;
    private static integerRegex: RegExp = /^[+-]?\d+$/;
    private static floatRegexp: RegExp = /^[+-]?\d+(\.\d+)?$/;
    private static booleanRegexp: RegExp = /^true|false$/;


    public constructor() {
        this.previousFieldValues = [];
    }


    // called when saving, change to final values
    formatValue(field: FieldDefinition, currentValue: string): string {
        let result = "";
        switch (field.type) { // only need to change dates
            case (FieldType.date): {
                //convert to underlying number format
                result = moment(currentValue, 'DD/MM/YYYY').format('YYYYMMDD');
                break;
            }
            case (FieldType.datetime): {
                //convert to underlying number format
                result = moment(currentValue, 'DD/MM/YYYY HH:mm').format('YYYYMMDDHHmm');
            }
        }
        return result;
    }

    isValidValue(field: FieldDefinition, currentValue: string): ValidationResponse {
        let response: ValidationResponse = {
            isValid: true,
            resetOnFailure: true
        }

        // basics first, is the field mandatory?
        if (field.mandatory) {
            // do we have any content?
            if (currentValue.trim().length === 0) {
                // no content, invalid
                response.isValid = false;
                response.message = `${field.displayName} is required. Please enter a valid value.`;
                return response;
            }
        }

        // ok, so we have some content, we need to check if the value is a valid format with regular expressions
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
                response.isValid = BasicFieldOperations.dateRegex.test(currentValue);
                if (!response.isValid) {
                    response.message = `${field.displayName} must be an integer`;
                }
                break;
            }
            case (FieldType.text): {
                response.isValid = true;
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
                    response.message = `${field.displayName} must be 24 hour time format 00:00`;
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
        }


        return response;
    }

    private setPreviousValue(field: FieldDefinition, newValue: string) {
        let fieldValue: FieldNameValue;

        let index = this.previousFieldValues.findIndex((fieldValue) => fieldValue.id === field.id);
        if (index >= 0) {
            //we have a previous value
            fieldValue = this.previousFieldValues[index];
            fieldValue.value = newValue;
        } else {
            // create a new record of the value
            fieldValue = {
                id: field.id,
                value: newValue
            }
            this.previousFieldValues.push(fieldValue);
        }
    }

    renderValue(field: FieldDefinition, currentValue: string): string | null {
        // ensure we don't end up in an endless loop
        // if the value hasn't changed return null
        let index = this.previousFieldValues.findIndex((fieldValue) => fieldValue.id === field.id);
        if (index >= 0) {
            //we have a previous value
            let fieldValue: FieldNameValue = this.previousFieldValues[index];
            if (fieldValue.value === currentValue) return null;
        }
        // either not yet seen or value has changed from previous
        if (currentValue.trim().length > 0) { // only attempt to render non-empty dates
            let newValue: string = currentValue;

            switch (field.type) {
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
            this.setPreviousValue(field, newValue);
            return newValue;
        } else {
            // empty value, no rendering required
            return null;
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
                result = '00:00';
                break;
            }
            case (FieldType.boolean): {
                result = 'false';
                break;
            }
            case (FieldType.uuid): {
                result = uuid.v4();
                break;
            }
        }
        return result;
    }

    generate(field: FieldDefinition, isCreate: boolean): string {
        let result = '';
        // are we generating the field?
        if (field.generator) {
            // are we only generating on create
            if (field.generator.onCreation && isCreate) {
                result = this.generateValue(field);
            }
            // or if we are modifying and should also be modifying the value
            if (field.generator.onModify && !isCreate) {
                result = this.generateValue(field);
            }
        }
        return result;
    }

}