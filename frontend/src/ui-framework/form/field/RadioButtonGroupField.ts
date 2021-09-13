import {AbstractField} from "./AbstractField";
import {FieldUIConfig} from "../FormUITypeDefs";
import {FieldDefinition} from "../../../model/DataObjectTypeDefs";

export class RadioButtonGroupField extends AbstractField {
    constructor(formId: string, config: FieldUIConfig, fieldDef: FieldDefinition, element: HTMLElement, subElements: HTMLInputElement[]) {
        super(formId, config, fieldDef, element, subElements);
    }

}