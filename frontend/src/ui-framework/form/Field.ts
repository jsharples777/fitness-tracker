export interface Field {
    initialise():void;
    isValid():boolean;
    getValue():string|null;
    getFormattedValue(): any|null;
    getId():string;
    setValue(newValue:string):void;
    clearValue():void;
    reset():void;
    validate():void;
    render(value:string):string;
}