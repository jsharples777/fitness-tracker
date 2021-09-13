import {DataObjectDefinition} from "./DataObjectTypeDefs";
import {BasicObjectDefinitionFactory, FIELD_ID} from "./BasicObjectDefinitionFactory";

export class ObjectDefinitionRegistry {
    private static _instance: ObjectDefinitionRegistry;

    public static getInstance(): ObjectDefinitionRegistry {
        if (!(ObjectDefinitionRegistry._instance)) {
            ObjectDefinitionRegistry._instance = new ObjectDefinitionRegistry();
        }
        return ObjectDefinitionRegistry._instance;
    }

    protected definitions:DataObjectDefinition[];

    private constructor() {
        this.definitions = [];
    }

    public findDefinition(id:string):DataObjectDefinition|null {
        let result:DataObjectDefinition|null = null;
        const index = this.definitions.findIndex((definition) => definition.id === id);
        if (index >= 0) {
            result = this.definitions[index];
        }
        return result;
    }

    public addDefinition(id:string, displayName:string, hasDataId:boolean, dataIdIsUUID:boolean,createModifierFields:boolean = true,idFieldName:string = FIELD_ID):DataObjectDefinition {
        let result:DataObjectDefinition|null = this.findDefinition(id);
        if (result) {
            return result;
        }
        else {
            let definition = BasicObjectDefinitionFactory.getInstance().createBasicObjectDefinition(id,displayName,hasDataId,dataIdIsUUID,createModifierFields,idFieldName);
            this.definitions.push(definition);
            return definition;
        }
    }
}