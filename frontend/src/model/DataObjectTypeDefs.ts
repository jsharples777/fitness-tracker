import {KeyType} from "../ui-framework/ConfigurationTypes";
import {FieldValueOptions} from "./CommonTypes";
import {ValidationRule} from "../ui-framework/form/validation/ValidationTypeDefs";

export enum FieldType {
    id = 'Id',
    uuid = 'UUID',
    text = 'Text',
    integer = 'Integer',
    float = 'Number',
    date = 'Date',
    time = 'Time',
    shortTime = 'Short Time',
    datetime = 'Datetime',
    email = 'Email',
    password = 'Password',
    boolean = 'True/False',
    userId = 'User',
    choice = 'Choice',
    limitedChoice = 'Limited Choice',
    largeText = 'TextArea',
    collection = 'Collection'
}

export interface FieldValueGenerator {
    generate(field:FieldDefinition,isCreate:boolean):string;
}




export type FieldDefinition = {
    id:string,
    isKey:boolean,
    idType: KeyType,
    type: FieldType,
    displayName:string,
    mandatory:boolean,
    displayOnly?:boolean,
    description?:string,
    collectionOfDataObjectId?:string,
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



