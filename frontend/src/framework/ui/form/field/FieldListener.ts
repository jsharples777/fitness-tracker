import {FieldDefinition} from "../../../model/DataObjectTypeDefs";
import {Field} from "./Field";
import {Form} from "../Form";

export interface FieldListener {
    getName(): string;

    valueChanged(form: Form, field: Field, fieldDef: FieldDefinition, newValue: string | null): void;

    failedValidation(form: Form, field: FieldDefinition, currentValue: string, message: string): void;
}
