import {FieldValueOptions, FieldValueOptionsListener, ValueOption} from "../../model/CommonTypes";

export class SimpleValueDataSource implements FieldValueOptions { // static value list
    private options: ValueOption[];
    private listeners: FieldValueOptionsListener[];

    constructor(options: ValueOption[]) {
        this.options = options;
        this.listeners = [];
    }

    public addValueOption(name: string, value: string) {
        this.options.push({name, value});
        this.listeners.forEach((listener) => listener.optionsChanged(this.options));
    }

    addListener(listener: FieldValueOptionsListener): void {
        this.listeners.push(listener);
    }

    getOptions(): ValueOption[] {
        return this.options;
    }

}