import {Form} from "./Form";

export enum FormEventType {
    SHOWN = 'shown',
    HIDDEN = 'hidden',
    CANCELLING = 'cancelling',
    CANCELLING_ABORTED = 'cancelling-aborted',
    CANCELLED = 'cancelled',
    SAVING = 'saving',
    SAVE_ABORTED = 'save-aborted',
    SAVED = 'saved',
    DELETING = 'deleting',
    DELETE_ABORTED = 'delete-aborted',
    DELETED = 'deleted',
    CREATING = 'creating',
    MODIFYING = 'modifying',
    RESETTING = 'reset',
}


export type FormEvent = {
    target: Form,
    formId: string,
    eventType: FormEventType,
}

export interface FormListener {
    formChanged(event: FormEvent, formValues?: any): boolean; // return true to cancel the action
}