import {FormUIDefinition} from "./FormUITypes";
import {FormListener} from "./FormListener";
import {FieldListener} from "./FieldListener";

export interface Form {
    initialise():void;
    setIsVisible(isVisible:boolean):void;
    reset():void;
    startCreateNew():void;
    startUpdate(objectToEdit:any):void;
    addFormListener(listener:FormListener):void;
    addFieldListener(listener:FieldListener):void;
    getFormattedDataObject():any; // returns the data object with type conversion for numbers and boolean
}