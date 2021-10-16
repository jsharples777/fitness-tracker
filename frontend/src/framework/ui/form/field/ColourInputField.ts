import {FieldUIConfig} from "../FormUITypeDefs";
import {FieldDefinition, FieldType} from "../../../model/DataObjectTypeDefs";
import {AbstractField} from "./AbstractField";
import browserUtil from "../../../util/BrowserUtil";
import debug from 'debug';
import {isHexValueDark} from "../../../util/MiscFunctions";
import {Form} from "../Form";

const logger = debug('colour-input-field');



export class ColourInputField extends AbstractField {

    constructor(form: Form, config: FieldUIConfig, fieldDef: FieldDefinition, element: HTMLInputElement) {
        super(form, config, fieldDef, element);
        this.setValue = this.setValue.bind(this);
    }


    setValue(newValue: string): void {
        logger(`Setting background style to colour ${newValue}`);
        super.setValue(newValue);
        // special case of colour types
        browserUtil.removeAttributes(this.element,["style"]);
        let styleOptions = [{name:"style",value:`background-color:${newValue};colour:black`}];
        if (isHexValueDark(newValue)) {
            styleOptions = [{name:"style",value:`background-color:${newValue};color:white`}];
        }
        browserUtil.addAttributes(this.element,styleOptions);
    }

}


