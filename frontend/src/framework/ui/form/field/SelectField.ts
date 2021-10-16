import {AbstractField} from "./AbstractField";
import {FieldUIConfig} from "../FormUITypeDefs";
import {FieldDefinition} from "../../../model/DataObjectTypeDefs";
import {Form} from "../Form";


export class SelectField extends AbstractField {

    constructor(form: Form, config: FieldUIConfig, fieldDef: FieldDefinition, element: HTMLSelectElement) {
        super(form, config, fieldDef, element);
    }
}