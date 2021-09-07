import {Form} from "./Form";

export enum FormEventType {
    SHOWN = 'shown',
    HIDDEN = 'hidden',
    CANCELLING = 'cancelling',
    SAVING = 'saving',
    SAVE_CANCELLED = 'save-cancelled',
    DELETING = 'deleting',
    DELETE_CANCELLED = 'delete-cancelled',
    CREATING = 'creating',
    MODIFYING = 'modifying',
    RESETTING = 'reset',
}


export type FormEvent = {
    target:Form,
    formId:string,
    eventType:FormEventType,
}

export interface FormListener {
    formChanged(event:FormEvent,formValues?:any):boolean; // return true to cancel the action
}