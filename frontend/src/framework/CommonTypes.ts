export enum ComparisonType {
    equals,
    lessThan,
    lessThanEqual,
    greaterThan,
    greaterThanEqual,
    isNull,
    isNotNull,
    hasValue
}

export type FilterItem = {
    attributeName: string,
    comparison: ComparisonType,
    value: any,
    evaluator?: evaluatorFunction
}

export type equalityFunction = (item1: any, item2: any) => boolean;
export type evaluatorFunction = (item: any, filter: FilterItem) => boolean;