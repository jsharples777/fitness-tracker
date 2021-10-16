import {FieldEditor} from "../form/FormUITypeDefs";
import {Field} from "../form/field/Field";
import browserUtil, {getElementOffset} from "../../util/BrowserUtil";
import {FieldDefinition} from "../../model/DataObjectTypeDefs";


export class ColourEditor implements FieldEditor {
    protected colourPickerContainerId: string;
    protected field: Field | null = null;
    protected container:HTMLElement|null = null;

    constructor(colourPickerContainerId: string) {
        this.colourPickerContainerId = colourPickerContainerId;
        this.editValue = this.editValue.bind(this);
        this.cbColourChange = this.cbColourChange.bind(this);
        this.container = document.getElementById(this.colourPickerContainerId);
        if (this.container) {
            browserUtil.addRemoveClasses(this.container, 'd-none');
            $(this.container).farbtastic(this.cbColourChange);
        }

    }

    editCompleted(field: Field, fieldDef: FieldDefinition): void {
        if (this.container) browserUtil.addRemoveClasses(this.container, 'd-none');
    }

    editValue(field: Field | null, fieldDef: FieldDefinition, currentValue: string): string {
        this.field = field;
        // do we have a valid value?
        if (/^#[0-9a-f]{6}$/.test(currentValue) && this.container) {
            $.farbtastic(this.container).setColor(currentValue);
        }
        if (field && this.container) {
            let element = field.getElement();
            let offset = getElementOffset(element);
            offset.top += element.offsetHeight;
            browserUtil.removeAttributes(this.container, ['style']);
            browserUtil.addAttributes(this.container, [{
                name: 'style',
                value: `top:${offset.top}px; left: ${offset.left}px;`
            }]);
            browserUtil.addRemoveClasses(this.container, 'd-none', false);
        }

        return currentValue;
    }

    cbColourChange(colour: string) {
        if (/^#[0-9a-f]{6}$/.test(colour)) {
            if (this.field) this.field.setValue(colour);
            if (this.container) browserUtil.addRemoveClasses(this.container, 'd-none', true);
        }
    }


}