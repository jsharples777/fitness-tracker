import {Field} from "./Field";
import {FieldUIConfig, FieldValidator, UIFieldType, ValidationResponse} from "../FormUITypeDefs";
import {FieldDefinition, FieldType} from "../../../model/DataObjectTypeDefs";
import {ValidationEventHandler} from "../event-handlers/ValidationEventHandler";
import {FieldListener} from "./FieldListener";
import {RenderingEventListener} from "../event-handlers/RenderingEventListener";

import debug from 'debug';

const logger = debug('abstract-field');


export class AbstractField implements Field, FieldListener {
    protected formId: string;
    protected config: FieldUIConfig | null = null;
    protected definition: FieldDefinition;
    protected element: HTMLElement;
    protected subElements: HTMLInputElement[] = [];
    protected validationHandler: ValidationEventHandler;
    protected renderingHandler: RenderingEventListener;
    protected listeners: FieldListener[] = [];
    private hidden:boolean = false;

    constructor(formId: string, config: FieldUIConfig, fieldDef: FieldDefinition, element: HTMLElement, subElements: HTMLInputElement[] | null = null) {
        this.formId = formId;
        this.config = config;
        this.definition = fieldDef;
        this.element = element;
        if (subElements) this.subElements = subElements;
        this.validationHandler = new ValidationEventHandler(formId, config, [this], subElements);
        this.renderingHandler = new RenderingEventListener(formId, config, [this], subElements);

        // listen for our own change events
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        if (this.subElements) {
            this.subElements.forEach((subElement) => {
                console.log('add subelement');
                console.log(subElement);
                subElement.addEventListener('change', this.handleChangeEvent);
                subElement.addEventListener('click', this.handleChangeEvent);
            });
        }
        else {
            this.element.addEventListener('change', this.handleChangeEvent);
        }

    }

    isHidden(): boolean {
        return this.hidden;
    }


    protected handleChangeEvent(event: Event) {
        logger(`Handling change event`);
        if (this.config) {
            let value: string | null = this.getValue();
            logger(`Handling change event - informing listeners`);
            this.listeners.forEach((listener) => listener.valueChanged(this.formId,this.definition, value));
        }
    }

    addFieldListener(listener: FieldListener): void {
        logger(`${this.getName()} - adding listener ${listener.getName()}`);
        // don't duplicate listeners
        let index = this.listeners.findIndex((listenerInList) => listenerInList.getName() === listener.getName());
        if (index < 0) {
            this.listeners.push(listener);
        }
        else {
            logger(`${this.getName()} - duplicate listener ${listener.getName()} ignored`);
        }

    }

    getFieldDefinition(): FieldDefinition {
        return this.definition;
    }

    setInvalid(message: string): void {
        this.validationHandler.setValidationStatusAndMessage(this.element,false,'',message,false);
        // @ts-ignore
        this.listeners.forEach((listener) => listener.failedValidation(this.formId,this.definition,this.getValue(),message));
    }

    public initialise(): void {
    }

    getValue(): string | null {
        let result: string | null = null;
        if (this.config && this.element) {
            switch (this.config.elementType) {
                case (UIFieldType.radioGroup): {
                    logger(`${this.definition.id} - getting value - rbg`);

                    if (this.subElements) {
                        this.subElements.forEach((subElement) => {
                            if (subElement.checked) {
                                logger(`${this.definition.id} - getting value - rbg - checked ${subElement.value}`);
                                result = subElement.value;
                                subElement.checked = true;
                            }
                        });
                    }
                    break;
                }
                case (UIFieldType.checkbox): {
                    // @ts-ignore
                    result = '' + this.element.checked;
                    break;
                }
                default: {
                    // @ts-ignore
                    result = this.element.value;
                    break;
                }
            }
        }
        logger(`${this.definition.id} - getting value - ${result}`);
        return result;
    }

    getFormattedValue(): any | null {
        let result: any | null = null;
        if (this.config && this.element) {
            // @ts-ignore
            result = this.element.value;
            if (this.config.elementType === UIFieldType.checkbox) { // @ts-ignore
                result = '' + this.element.checked;
            }
            if (this.config.formatter) {
                result = this.config.formatter.formatValue(this.definition, result);
            }
        }
        return result;
    }

    isValid(): boolean {
        let result = true;
        if (this.config && this.element) {
            if (this.config.validator) {
                if (this.config.validator.validator) {
                    const validator: FieldValidator = this.config.validator.validator;
                    const response: ValidationResponse = validator.isValidValue(this.definition, this.getValue());
                    result = response.isValid;
                }
            }
        }
        return result;
    }

    getId(): string {
        return this.definition.id;
    }

    setValue(newValue: string): void {
        newValue = ''+newValue;
        if (this.element && this.config) {
            // @ts-ignore
            switch (this.config.elementType) {
                case (UIFieldType.radioGroup): {
                    if (this.subElements) {
                        this.subElements.forEach((subElement) => {
                            if (subElement.value === newValue) {
                                subElement.checked = true;
                            }
                        });
                    }
                    break;
                }
                case (UIFieldType.checkbox): {
                    // @ts-ignore
                    this.element.checked = (newValue.toLowerCase() === 'true');
                    break;
                }
                case (UIFieldType.select): {
                    logger(`${this.definition.id} - setting value - ${newValue}`);
                    const selectEl:HTMLSelectElement = <HTMLSelectElement>this.element;
                    let selectedIndex = -1;
                    for (let index = 0;index < selectEl.options.length;index++) {
                        // @ts-ignore
                        const option:HTMLOptionElement = selectEl.options.item(index);
                        logger(`${this.definition.id} - option value - ${option.value}`);
                        if (option.value === newValue) {
                            logger(`${this.definition.id} - option value - ${option.value} - SELECTED`);
                            option.selected = true;
                            selectedIndex = index;
                        }
                    }
                    logger(`${this.definition.id} - selected index ${selectedIndex}`);
                    selectEl.selectedIndex = selectedIndex;
                    break;
                }
                default: {
                    logger(`${this.definition.id} - setting value - ${newValue}`);
                    // @ts-ignore
                    this.element.value = newValue;
                    break;
                }
            }
        }
    }

    reset(): void {
        if (this.element) {
            switch (this.definition.type) {
                case (FieldType.boolean): {
                    // @ts-ignore
                    this.element.checked = false;
                    break;
                }
                case (FieldType.integer): {
                    // @ts-ignore
                    this.element.value = '0';
                    break;
                }
                case (FieldType.float): {
                    // @ts-ignore
                    this.element.value = '0.0';
                    break;
                }
                case (FieldType.limitedChoice): {
                    if (this.subElements) {
                        this.subElements.forEach((subElement) => {
                            subElement.checked = false;
                        });
                    }
                    break;
                }
                default: {
                    // @ts-ignore
                    this.element.value = '';
                    break;
                }
            }
        }
        this.show();
    }

    clearValue():void {
        this.reset();
    }

    validate(): void {
        if (this.element) {
            this.validationHandler.processValidation(this.element);
        }
    }

    render(currentValue: string): string {
        let result = currentValue;
        if (this.config?.renderer) {
            let value = this.config.renderer.renderValue(this.definition, currentValue);
            if (value) result = value;
        }
        return result;
    }

    failedValidation(formId:string, field: FieldDefinition, currentValue: string, message: string): void {}
    valueChanged(formId:string, field: FieldDefinition, newValue: string | null): void {}

    getName(): string {
        return this.definition.displayName;
    }

    hide(): void {
        /*
          if we have an enclosing container (per the config) then we can hide
          otherwise we become readonly and disabled
         */
        if (this.config) {
            if (this.config.containedBy) {
                const parentEl = this.element.parentElement;
                if (parentEl) {
                    parentEl.setAttribute('style','display:none');
                }

            }
            else {
                this.setReadOnly();
            }
        }
        this.hidden = true;
    }



    setValid(): void {
        this.validationHandler.setValidationStatusAndMessage(this.element,true,'');
    }

    show(): void {
        /*
          if we have an enclosing container (per the config) then we can hide
          otherwise we become readonly and disabled
         */
        if (this.config) {
            if (this.config.containedBy) {
                const parentEl = this.element.parentElement;
                if (parentEl) {
                    parentEl.removeAttribute('style');
                }

            }
            else {
                this.clearReadOnly();
            }
        }
        this.hidden = true;
    }

    clearReadOnly(): void {
        if (this.definition.displayOnly) return;
        this.element.removeAttribute('readonly');
        this.element.removeAttribute('disabled');
        // do the same for subelements
        if (this.subElements) {
            this.subElements.forEach((subElement) => {
                subElement.removeAttribute('readonly');
                subElement.removeAttribute('disabled');
            });
        }

    }

    setReadOnly(): void {
        this.element.setAttribute('readonly','true');
        this.element.setAttribute('disabled','true');
        // do the same for subelements
        if (this.subElements) {
            this.subElements.forEach((subElement) => {
                subElement.setAttribute('readonly','true');
                subElement.setAttribute('disabled','true');
            });
        }
    }
}

