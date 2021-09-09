import {KeyType} from "../ConfigurationTypes";
import {FieldValueOptions} from "./CommonTypes";
import {ValidationRule} from "./validation/ValidationTypeDefs";

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



