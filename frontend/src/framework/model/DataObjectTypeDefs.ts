import {KeyType} from "../ui/ConfigurationTypes";
import {FieldValueOptions} from "./CommonTypes";
import {ValidationRule} from "../ui/form/validation/ValidationTypeDefs";


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
    collection = 'Collection',
    duration = 'Duration',
    colour = 'Colour',
    subObject = 'Sub Object'
}

export interface FieldValueGenerator {
    generate(field: FieldDefinition, isCreate: boolean): string;
}

export interface DerivedField {
    getValue(dataObj:any, field: FieldDefinition, isCreate: boolean): string;
}


export type FieldDefinition = {
    id: string,
    isKey: boolean,
    idType: KeyType,
    type: FieldType,
    displayName: string,
    mandatory: boolean,
    displayOnly?: boolean,
    description?: string,
    linkedDataObjectId?: string,
    generator?: {
        onCreation: boolean,
        onModify: boolean,
        generator: FieldValueGenerator
    },
    dataSource?: FieldValueOptions,
    derivedValue?:DerivedField
}

export type DataObjectDefinition = {
    id: string,
    displayName: string,
    fields: FieldDefinition[],
    rules?: ValidationRule
}



