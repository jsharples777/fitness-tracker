import {
    FieldDefinition,
    FieldFormatter,
    FieldRenderer,
    FieldType,
    FieldValidator,
    ValidationResponse
} from "../form/FormTypes";
import moment from "moment";

type FieldNameValue = {
    id:string,
    value:string
}

export class BasicFieldOperations implements FieldFormatter,FieldRenderer,FieldValidator {
    private previousFieldValues:FieldNameValue[];

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
            }
        }
        return result;
    }

    isValidValue(field: FieldDefinition, currentValue: string): ValidationResponse {
        let response:ValidationResponse = {
            isValid:true
        }

        // basics first, is the field mandatory?
        if (field.mandatory) {
            // do we have any content?
            if (currentValue.trim().length === 0) {
                // no content, invalid
                response.isValid = false;
                response.message =  `${field.displayName} is required. Please enter a valid value.`;
            }
        }

        // ok, now we need to validate content for each type
        peawfhaghpahdgfhidfpbmn90237450967234(*)^&)^

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
        }
        else {
            // empty value, no rendering required
            return null;
        }
    }

}