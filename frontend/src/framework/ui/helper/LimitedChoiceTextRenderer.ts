import {FieldRenderer} from "../form/FormUITypeDefs";
import {FieldDefinition} from "../../model/DataObjectTypeDefs";
import debug from 'debug';
import {Field} from "../form/field/Field";

const rlogger = debug('limited-choice-text-renderer');


export class LimitedChoiceTextRenderer implements FieldRenderer {

    public constructor() {
    }

    renderValue(field:Field|null, fieldDef: FieldDefinition, currentValue: string): string | null {
        rlogger(`Rendering value for field ${fieldDef.displayName} with new value ${currentValue}`);
        // find the current value in the data source and convert to text for display
        let result = currentValue;
        if (fieldDef.dataSource) {
            const valueOptions = fieldDef.dataSource.getOptions();
            const foundIndex = valueOptions.findIndex((option) => option.value === currentValue);
            if (foundIndex >= 0) {
                result = valueOptions[foundIndex].name;
            }
        }
        return result;

    }


    generate(field: FieldDefinition, isCreate: boolean): string {
        return '';
    }

    setSubElements(elements: HTMLInputElement[]): void {
    }
}