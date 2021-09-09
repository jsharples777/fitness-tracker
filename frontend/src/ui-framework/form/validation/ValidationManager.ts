import {ConditionResponse, ValidationRule} from "./ValidationTypeDefs";
import {Form} from "../Form";
import {Rule} from "eslint";
import {Field} from "../Field";

type FormRuleSet = {
    form:Form,
    rules:ValidationRule[]
}

type RuleResponse = {
    ruleFailed:boolean,
    response:ConditionResponse,
    message?:string
}

export class ValidationManager {

    private static _instance: ValidationManager;

    public static getInstance(): ValidationManager {
        if (!(ValidationManager._instance)) {
            ValidationManager._instance = new ValidationManager();
        }
        return ValidationManager._instance;
    }

    private formRules:FormRuleSet[];

    private constructor() {
        this.formRules = [];
    }

    public addRuleToForm(form:Form,rule:ValidationRule) {
        let index = this.formRules.findIndex((formRule) => formRule.form.getId() === form.getId());
        let formRules:FormRuleSet;
        // store the rules for later execution
        if (index < 0) {
            formRules = {
                form: form,
                rules: [rule]
            }
        }
        else {
            formRules = this.formRules[index];
            formRules.rules.push(rule);
        }
    }

    private executeRule(form:Form,rule:ValidationRule): RuleResponse {
        let response:RuleResponse = {
            ruleFailed: false,
            response: rule.response,
        }
        // get the field for the rule from the form
        const field:Field = form.getFieldFromDataFieldId(rule.dataFieldId);
        // for each part of the rule check the comparison



        return response;
    }
}