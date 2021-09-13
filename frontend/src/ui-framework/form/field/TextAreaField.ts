import {AbstractField} from "./AbstractField";
import {FieldUIConfig} from "../FormUITypeDefs";
import {FieldDefinition} from "../../../model/DataObjectTypeDefs";



export class TextAreaField extends AbstractField {

    constructor(formId: string, config: FieldUIConfig, fieldDef: FieldDefinition, element: HTMLTextAreaElement) {
        super(formId, config, fieldDef, element);
    }
}

