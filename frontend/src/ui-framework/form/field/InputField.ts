import {FieldUIConfig} from "../FormUITypeDefs";
import {FieldDefinition} from "../../../model/DataObjectTypeDefs";
import {AbstractField} from "./AbstractField";


export class InputField extends AbstractField {

    constructor(formId: string, config: FieldUIConfig, fieldDef: FieldDefinition, element: HTMLInputElement) {
        super(formId, config, fieldDef, element);
    }
}


