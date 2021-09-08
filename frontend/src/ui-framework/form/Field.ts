export interface Field {
    initialise():void;
    isValid():boolean;
    getValue():string|null;
    getId():string;
    setValue(newValue:string):void;
    clearValue():void;
    reset():void;
    validate():void;
}