import {KeyType} from "../ui-framework/ConfigurationTypes";
import {BasicFieldOperations} from "../ui-framework/helper/BasicFieldOperations";
import {DataObjectDefinition, FieldDefinition, FieldType} from "../ui-framework/form/DataObjectTypes";

export const FIELD_ID:string = 'id';
export const FIELD_CreatedBy:string = 'createdBy';
export const FIELD_ModifiedBy:string = 'modifiedBy';
export const FIELD_CreatedOn:string = 'createdOn';
export const FIELD_ModifiedOn:string = 'modifiedOn';

export const FIELD_CreatedBy_Desc:string = 'Created By';
export const FIELD_ModifiedBy_Desc:string = 'Last Modified By';
export const FIELD_CreatedOn_Desc:string = 'Created On';
export const FIELD_ModifiedOn_Desc:string = 'Last Modified On';

export class BasicObjectDefinitionFactory {

    private static _instance: BasicObjectDefinitionFactory;

    public static getInstance(): BasicObjectDefinitionFactory {
        if (!(BasicObjectDefinitionFactory._instance)) {
            BasicObjectDefinitionFactory._instance = new BasicObjectDefinitionFactory();
        }
        return BasicObjectDefinitionFactory._instance;
    }

    private constructor() {}

    public createBasicObject(id:string, displayName:string, hasDataId:boolean, dataIdIsUUID:boolean):DataObjectDefinition {
        let objDef:DataObjectDefinition = {
            id:id,
            displayName:displayName,
            fields:[]
        }
        let ops = new BasicFieldOperations();

        // do we need an id field?
        if (hasDataId) {
            let fieldType = FieldType.id;
            if (dataIdIsUUID) {
                fieldType = FieldType.uuid;
            }
            let fieldDef:FieldDefinition = {
                id:'id',
                idType: KeyType.number,
                type: fieldType,
                displayName:'Id',
                mandatory:true,
                generator: {
                    generator:ops,
                    onModify:false,
                    onCreation:true
                }
            }
            objDef.fields.push(fieldDef);
        }

        // add fields for created and modified
        this.addCreatedDateToArray(objDef.fields);
        this.addCreatedByToArray(objDef.fields);
        this.addModifiedByToArray(objDef.fields);
        this.addModifiedDateToArray(objDef.fields);

        return objDef;
    }

    private addCreatedDateToArray(fields:FieldDefinition[]) {
        let fieldDef = this.addStringFieldToArray(fields,FIELD_CreatedOn,FIELD_CreatedOn_Desc,FieldType.datetime,true,FIELD_CreatedOn_Desc);
        // add generator
        fieldDef.generator = {
            generator: new BasicFieldOperations(),
            onCreation:true,
            onModify:false
        }
        fieldDef.displayOnly = true;
    }
    private addModifiedDateToArray(fields:FieldDefinition[]) {
        let fieldDef = this.addStringFieldToArray(fields,FIELD_ModifiedOn,FIELD_ModifiedOn_Desc,FieldType.datetime,true,FIELD_ModifiedOn_Desc);
        // add generator
        fieldDef.generator = {
            generator: new BasicFieldOperations(),
            onCreation:true,
            onModify:true
        }
        fieldDef.displayOnly = true;
    }

    private addCreatedByToArray(fields:FieldDefinition[]) {
        let fieldDef = this.addNumericFieldToArray(fields,FIELD_CreatedBy,FIELD_CreatedBy_Desc,FieldType.userId,true,FIELD_CreatedBy_Desc);
        // add generator
        fieldDef.generator = {
            generator: new BasicFieldOperations(),
            onCreation:true,
            onModify:false
        }
        fieldDef.displayOnly = true;
    }
    private addModifiedByToArray(fields:FieldDefinition[]) {
        let fieldDef = this.addStringFieldToArray(fields,FIELD_ModifiedBy,FIELD_ModifiedBy_Desc,FieldType.userId,true,FIELD_ModifiedBy_Desc);
        // add generator
        fieldDef.generator = {
            generator: new BasicFieldOperations(),
            onCreation:true,
            onModify:true
        }
        fieldDef.displayOnly = true;
    }

    private addFieldToArray(fields:FieldDefinition[],keyType:KeyType, id:string, displayName:string, type:FieldType, isMandatory:boolean = false,description:string|null = null):FieldDefinition {
        let fieldDef:FieldDefinition = {
            id:id,
            idType: keyType,
            type: type,
            displayName:displayName,
            mandatory:isMandatory,
            displayOnly:false,
        }

        if (description) fieldDef.description = description;
        fields.push(fieldDef);
        return fieldDef;
    }

    private addStringFieldToArray(fields:FieldDefinition[],id:string, displayName:string, type:FieldType, isMandatory:boolean = false,description:string|null = null):FieldDefinition {
        return this.addFieldToArray(fields,KeyType.string, id,displayName,type,isMandatory,description);
    }

    private addNumericFieldToArray(fields:FieldDefinition[],id:string, displayName:string, type:FieldType, isMandatory:boolean = false,description:string|null = null):FieldDefinition {
        return this.addFieldToArray(fields,KeyType.string, id,displayName,type,isMandatory,description);
    }

    public addStringFieldToObjDefinition(objDef:DataObjectDefinition,id:string, displayName:string, type:FieldType, isMandatory:boolean = false,description:string|null = null):void {
        this.addStringFieldToArray(objDef.fields,id,displayName,type,isMandatory,description);
    }

    public addNumericFieldToObjDefinition(objDef:DataObjectDefinition,id:string, displayName:string, type:FieldType, isMandatory:boolean = false,description:string|null = null):void {
        this.addNumericFieldToArray(objDef.fields,id,displayName,type,isMandatory,description);
    }

}