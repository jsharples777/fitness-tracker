import {KeyType} from "../ConfigurationTypes";

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
}

export interface FieldValueGenerator {
    generate(field:FieldDefinition,isCreate:boolean):string;
}

export type FieldDefinition = {
    id:string,
    idType: KeyType,
    type: FieldType,
    default?: string,
    displayName:string,
    mandatory:boolean,
    displayOnly?:boolean,
    description?:string,
    generator?:{
        onCreation:boolean,
        onModify:boolean,
        generator:FieldValueGenerator
    }
}

export type DataObjectDefinition = {
    id:string,
    displayName:string,
    fields:FieldDefinition[]
}



export type ValidationResponse = {
    isValid:boolean,
    message?:string,
    resetOnFailure:boolean
}


