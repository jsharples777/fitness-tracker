import {Form} from "../Form";
import {FormMode} from "../FormUITypeDefs";
import {FieldDefinition} from "../../../model/DataObjectTypeDefs";
import {ConditionResponse} from "./ValidationTypeDefs";
import {RuleCheck} from "./ValidationManager";

export interface FormFieldValidator {
    applyRulesToTargetField(form: Form, formMode: FormMode, field: FieldDefinition, onlyRulesOfType: ConditionResponse | null): RuleCheck;
}