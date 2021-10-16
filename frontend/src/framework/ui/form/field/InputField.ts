import {FieldUIConfig} from "../FormUITypeDefs";
import {FieldDefinition} from "../../../model/DataObjectTypeDefs";
import {AbstractField} from "./AbstractField";
import {Form} from "../Form";


export class InputField extends AbstractField {

    constructor(form: Form, config: FieldUIConfig, fieldDef: FieldDefinition, element: HTMLInputElement) {
        super(form, config, fieldDef, element);
    }
}


