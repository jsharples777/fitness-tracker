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

type FieldNameValue = {
    id:string,
    value:string
}

export class BasicFieldOperations implements FieldFormatter,FieldRenderer,FieldValidator,FieldValueGenerator {
    private previousFieldValues:FieldNameValue[];

    private dateRegex:RegExp = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    private emailRegex:RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;
    private timeRegex:RegExp = /^([01]\d|2[0-3]):?([0-5]\d)$/;
    private dateTimeRegex:RegExp = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}\s([01]\d|2[0-3]):?([0-5]\d)$/;
    private basicPasswordRegex:RegExp = /^[a-zA-Z0-9]{8,15}$/;
    private integerRegex:RegExp = /^[+-]?\d+$/;
    private floatRegexp:RegExp = /^[+-]?\d+(\.\d+)?$/;





    public constructor() {
        this.previousFieldValues = [];
    }


    // called when saving, change to final values
    formatValue(field: FieldDefinition, currentValue: string): string {
        let result = "";
        switch(field.type) { // only need to change dates
            case (FieldType.date): {
                //convert to underlying number format
                result = moment(currentValue,'DD/MM/YYYY').format('YYYYMMDD');
                break;
            }
            case (FieldType.datetime): {
                //convert to underlying number format
                result = moment(currentValue,'DD/MM/YYYY HH:mm:ss').format('YYYYMMDDHHmmss');
            }
        }
        return result;
    }

    isValidValue(field: FieldDefinition, currentValue: string): ValidationResponse {
        let response:ValidationResponse = {
            isValid:true,
            resetOnFailure: true
        }

        // basics first, is the field mandatory?
        if (field.mandatory) {
            // do we have any content?
            if (currentValue.trim().length === 0) {
                // no content, invalid
                response.isValid = false;
                response.message =  `${field.displayName} is required. Please enter a valid value.`;
            }
            else {
                // ok, so we have some content, we need to check if the value is a valid format

            }
        }

        // ok, now we need to validate content for each type


        return response;
    }

    private setPreviousValue(field:FieldDefinition,newValue:string) {
        let fieldValue:FieldNameValue;

        let index = this.previousFieldValues.findIndex((fieldValue) => fieldValue.id === field.id);
        if (index >= 0) {
            //we have a previous value
            fieldValue = this.previousFieldValues[index];
            fieldValue.value = newValue;
        }
        else {
            // create a new record of the value
            fieldValue = {
                id:field.id,
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
            let fieldValue:FieldNameValue = this.previousFieldValues[index];
            if (fieldValue.value === currentValue) return null;
        }
        // either not yet seen or value has changed from previous
        if (currentValue.trim().length > 0) { // only attempt to render non-empty dates
            let newValue:string = currentValue;

            switch (field.type) {
                case (FieldType.date): {
                    newValue = moment(currentValue,'YYYYMMDD').format('DD/MM/YYYY');
                    break;
                }
            }

            // store the previous value
            this.setPreviousValue(field,newValue);
            return newValue;
        }
        else {
            // empty value, no rendering required
            return null;
        }
    }

    private generateValue(field:FieldDefinition):string {
        let result = '';
        switch(field.type) {
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
        }
        return result;
    }

    generate(field:FieldDefinition,isCreate:boolean):string {
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