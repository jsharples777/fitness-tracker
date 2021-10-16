export type ValueOption = {
    name: string,
    value: string
}

export interface FieldValueOptionsListener {
    optionsChanged(newOptions: ValueOption[]): void;
}

export interface FieldValueOptions {
    addListener(listener: FieldValueOptionsListener): void;

    getOptions(): ValueOption[];
}
