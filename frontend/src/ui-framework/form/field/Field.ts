import {FieldDefinition} from "../DataObjectTypeDefs";
import {FieldListener} from "./FieldListener";

export interface Field {
    initialise():void;
    isValid():boolean;
    getValue():string|null;
    getFormattedValue(): any|null;
    setValue(newValue:string):void;
    clearValue():void;
    reset():void;
    validate():void;
    render(value:string):string;

    getId():string;
    getFieldDefinition():FieldDefinition;
    getName():string;

    addFieldListener(listener:FieldListener):void;

    show():void;
    hide():void;
    setInvalid(message:string):void;
    setValid():void;

    setReadOnly():void;
    clearReadOnly():void;
}