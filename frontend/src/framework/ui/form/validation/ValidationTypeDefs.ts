import {ComparisonType} from "../../../CommonTypes";
import {FormMode} from "../FormUITypeDefs";



export enum ConditionResponse {
    show,
    hide,
    invalid,
    valid
}

export enum MultipleConditionLogic {
    onlyFailIfAllConditionsFail,
    failIfAnyConditionFails,
    failWhenTheNextInSequenceFails,
    whenAllConditionsFailRuleShouldNotBeApplied,
    failOnlyIfFinalConditionIsAFailAndPreviousConditionsAreNotFails
}

export type ValidationCondition = {
    comparison: ComparisonType,
    sourceDataFieldId?: string,
    values?: string
}

export type ValidationRule = {
    formMode:FormMode,
    targetDataFieldId: string,
    response: ConditionResponse,
    multipleConditionLogic?:MultipleConditionLogic,
    conditions: ValidationCondition[]
}
