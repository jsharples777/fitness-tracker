import {AbstractField} from "./AbstractField";
import {FieldUIConfig} from "../FormUITypeDefs";
import {FieldDefinition} from "../../../model/DataObjectTypeDefs";
import {Form} from "../Form";

export class RadioButtonGroupField extends AbstractField {
    constructor(form: Form, config: FieldUIConfig, fieldDef: FieldDefinition, element: HTMLElement, subElements: HTMLInputElement[]) {
        super(form, config, fieldDef, element,subElements);
    }

}