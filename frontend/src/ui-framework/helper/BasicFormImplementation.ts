import {
    DataObjectDefinition,
    FieldDefinition,
    FieldListener,
    Form,
    FormEvent,
    FormListener,
    FormUIDefinition
} from "../form/FormTypes";
import {AbstractForm} from "../form/AbstractForm";

export class BasicFormImplementation extends AbstractForm implements Form{
    public constructor(containerId: string, dataObjDef: DataObjectDefinition) {
        super(containerId,dataObjDef);


    }


    protected _hidden(): void {
    }

    protected _initialise(config: FormUIDefinition): void {
    }

    protected _reset(): void {
    }

    protected _startCreate(): void {
    }

    protected _startUpdate(objectToEdit: any): void {
    }

    protected _visible(): void {
    }

}