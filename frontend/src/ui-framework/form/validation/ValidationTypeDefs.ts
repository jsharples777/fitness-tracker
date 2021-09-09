export enum ConditionType {
    equals,
    lessThan,
    lessThanEqual,
    greaterThan,
    greaterThanEqual,
    isNull,
    isNotNull
};

export enum ConditionResponse {
    show,
    hide,
    invalid,
    valid
}

export type ValidationCondition = {
    dataFieldId:string,
    type: ConditionType,
    comparedWith: {
        dataFieldId?:string,
        static?:string
    }
}

export type ValidationRule = {
    dataFieldId:string,
    response: ConditionResponse,
    conditions: ValidationCondition[]
}
