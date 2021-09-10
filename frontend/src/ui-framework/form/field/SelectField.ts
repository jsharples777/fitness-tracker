import {AbstractField} from "./AbstractField";
import {FieldUIConfig} from "../FormUITypeDefs";
import {FieldDefinition} from "../DataObjectTypeDefs";



export class SelectField extends AbstractField {

    constructor(formId: string, config: FieldUIConfig, fieldDef: FieldDefinition, element: HTMLSelectElement) {
        super(formId, config, fieldDef, element);
    }
}