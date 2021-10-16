import {AbstractField} from "./AbstractField";
import {FieldUIConfig} from "../FormUITypeDefs";
import {FieldDefinition} from "../../../model/DataObjectTypeDefs";
import {Form} from "../Form";


export class TextAreaField extends AbstractField {

    constructor(form: Form, config: FieldUIConfig, fieldDef: FieldDefinition, element: HTMLTextAreaElement) {
        super(form, config, fieldDef, element);
    }
}

