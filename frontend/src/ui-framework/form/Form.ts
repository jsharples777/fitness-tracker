import {FormUIDefinition} from "./FormUITypeDefs";
import {FormListener} from "./FormListener";
import {FieldListener} from "./field/FieldListener";
import {Field} from "./field/Field";

export interface Form {
    getId():string;
    initialise():void;
    setIsVisible(isVisible:boolean):void;
    reset():void;
    startCreateNew():any;
    startUpdate(objectToEdit:any):void;
    displayOnly(objectToView:any):void;

    setReadOnly():void;
    clearReadOnly():void;
    addFormListener(listener:FormListener):void;
    addFieldListener(listener:FieldListener):void;
    getFormattedDataObject():any; // returns the data object with type conversion for numbers and boolean

    getFieldFromDataFieldId(dataFieldId:string):Field|undefined;

    hasChanged():boolean;
}