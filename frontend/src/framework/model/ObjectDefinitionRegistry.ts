import {DataObjectDefinition, FieldType} from "./DataObjectTypeDefs";
import {BasicObjectDefinitionFactory, FIELD_ID} from "./BasicObjectDefinitionFactory";
import debug from "debug";
import {BasicFieldOperations} from "./BasicFieldOperations";

const logger = debug('object-definition-registry');

export class ObjectDefinitionRegistry {
    private static _instance: ObjectDefinitionRegistry;
    protected definitions: DataObjectDefinition[];

    private constructor() {
        this.definitions = [];
    }

    public static getInstance(): ObjectDefinitionRegistry {
        if (!(ObjectDefinitionRegistry._instance)) {
            ObjectDefinitionRegistry._instance = new ObjectDefinitionRegistry();
        }
        return ObjectDefinitionRegistry._instance;
    }

    public findDefinition(id: string): DataObjectDefinition | null {
        let result: DataObjectDefinition | null = null;
        const index = this.definitions.findIndex((definition) => definition.id === id);
        if (index >= 0) {
            result = this.definitions[index];
        }
        return result;
    }

    public addDefinition(id: string, displayName: string, hasDataId: boolean, dataIdIsUUID: boolean, createModifierFields: boolean = true, idFieldName: string = FIELD_ID): DataObjectDefinition {
        logger(`Adding definition for ${id} with name ${displayName}`);
        let result: DataObjectDefinition | null = this.findDefinition(id);
        if (result) {
            return result;
        } else {
            let definition = BasicObjectDefinitionFactory.getInstance().createBasicObjectDefinition(id, displayName, hasDataId, dataIdIsUUID, createModifierFields, idFieldName);
            this.definitions.push(definition);
            return definition;
        }
    }

    public createInstanceFromDef(definition: DataObjectDefinition): any {
        logger(`Creating instance for definition ${definition.displayName}`);
        let result: any = {};
        const fieldOps = new BasicFieldOperations();

        definition.fields.forEach((fieldDef) => {
            if (fieldDef.generator && fieldDef.generator.onCreation) {
                let fieldValue = fieldDef.generator.generator.generate(fieldDef, true);

                switch (fieldDef.type) {
                    case (FieldType.date):
                    case (FieldType.datetime): {
                        break;
                    }
                    default: {
                        fieldValue = fieldOps.formatValue(fieldDef, fieldValue);
                        break;
                    }
                }

                logger(`Setting default values for ${fieldDef.displayName} to ${fieldValue}`);
                result[fieldDef.id] = fieldValue;
            }
            if (fieldDef.type === FieldType.collection) {
                result[fieldDef.id] = [];
            }
        });
        return result;
    }


    public createInstance(id: string): any {
        logger(`Creating instance for definition ${id}`);
        let result: any = {};

        const definition: DataObjectDefinition | null = this.findDefinition(id);

        if (definition) {
            result = this.createInstanceFromDef(definition);
        }
        return result;
    }
}