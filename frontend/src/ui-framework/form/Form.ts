import {FormUIDefinition} from "./FormUITypeDefs";
import {FormListener} from "./FormListener";
import {FieldListener} from "./FieldListener";
import {Field} from "./Field";

export interface Form {
    getId():string;
    initialise():void;
    setIsVisible(isVisible:boolean):void;
    reset():void;
    startCreateNew():void;
    startUpdate(objectToEdit:any):void;
    addFormListener(listener:FormListener):void;
    addFieldListener(listener:FieldListener):void;
    getFormattedDataObject():any; // returns the data object with type conversion for numbers and boolean

    getFieldFromDataFieldId(dataFieldId:string):Field|undefined;
}