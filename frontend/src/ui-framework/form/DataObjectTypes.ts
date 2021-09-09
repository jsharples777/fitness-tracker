import {KeyType} from "../ConfigurationTypes";
import {FieldValueOptions} from "./CommonTypes";

export enum FieldType {
    id = 'Id',
    uuid = 'UUID',
    text = 'Text',
    integer = 'Integer',
    float = 'Number',
    date = 'Date',
    time = 'Time',
    datetime = 'Datetime',
    email = 'Email',
    password = 'Password',
    boolean = 'True/False',
    userId = 'User',
    choice = 'Choice',
    limitedChoice = 'Limited Choice',
    largeText = 'TextArea'
}

export interface FieldValueGenerator {
    generate(field:FieldDefinition,isCreate:boolean):string;
}




export type FieldDefinition = {
    id:string,
    idType: KeyType,
    type: FieldType,
    displayName:string,
    mandatory:boolean,
    displayOnly?:boolean,
    description?:string,
    generator?:{
        onCreation:boolean,
        onModify:boolean,
        generator:FieldValueGenerator
    },
    dataSource?:FieldValueOptions
}

export type DataObjectDefinition = {
    id:string,
    displayName:string,
    fields:FieldDefinition[],
    rules?:ValidationRule
}

export type ValidationResponse = {
    isValid:boolean,
    message?:string,
    resetOnFailure:boolean
}

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
    fieldId:string,
    type: ConditionType,
    comparedWith: {
        fieldId?:string,
        static?:string
    }
}

export type ValidationRule = {
    fieldId:string,
    response: ConditionResponse,
    conditions: ValidationCondition[]
}


