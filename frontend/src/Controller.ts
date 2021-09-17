import debug from 'debug';
import MemoryBufferStateManager from "./state/MemoryBufferStateManager";
import StateChangeListener from "./state/StateChangeListener";
import {StateManager} from "./state/StateManager";
import SocketManager from "./socket/SocketManager";
import AsyncStateManagerWrapper from "./state/AsyncStateManagerWrapper";
import {AggregateStateManager} from "./state/AggregateStateManager";
import SocketListenerDelegate from "./SocketListenerDelegate";
import {ChatManager} from "./socket/ChatManager";
import {NotificationController} from "./socket/NotificationController";
import {API_Config, STATE_NAMES} from "./AppTypes";
import {RESTApiStateManager} from "./state/RESTApiStateManager";
import {DataObjectDefinition, FieldDefinition, FieldType} from "./model/DataObjectTypeDefs";
import {ObjectDefinitionRegistry} from "./model/ObjectDefinitionRegistry";
import {BasicObjectDefinitionFactory} from "./model/BasicObjectDefinitionFactory";
import {SimpleValueDataSource} from "./ui-framework/helper/SimpleValueDataSource";
import {KeyType} from "./ui-framework/ConfigurationTypes";
import {DataObjectListener} from "./model/DataObjectListener";
import {DataObjectController} from "./model/DataObjectController";
import {isSameMongo} from "./util/EqualityFunctions";

const cLogger = debug('controller-ts');
const cLoggerDetail = debug('controller-ts-detail');

class Controller implements StateChangeListener,DataObjectListener {
    private static _instance: Controller;

    public static getInstance(): Controller {
        if (!(Controller._instance)) {
            Controller._instance = new Controller();
        }
        return Controller._instance;
    }

    protected applicationView: any;
    protected clientSideStorage: any;
    protected config: any;
    // @ts-ignore
    protected stateManager: StateManager;


    constructor() {}

    connectToApplication(applicationView: any, clientSideStorage: any) {
        this.applicationView = applicationView;
        this.clientSideStorage = clientSideStorage;
        // setup the API calls
        let restSM = RESTApiStateManager.getInstance();
        restSM.initialise([
            {
                stateName:STATE_NAMES.users,
                serverURL:'',
                api:API_Config.users,
                isActive:true
            },
            {
                stateName:STATE_NAMES.exerciseTypes,
                serverURL:'',
                api:API_Config.exerciseTypes,
                isActive:true,
                idField: '_id'
            },
            {
                stateName:STATE_NAMES.workouts,
                serverURL:'',
                api:API_Config.workouts,
                isActive:true,
                idField: '_id'
            }
        ]);


        let aggregateSM = AggregateStateManager.getInstance();
        let memorySM = MemoryBufferStateManager.getInstance();

        let asyncSM = new AsyncStateManagerWrapper(aggregateSM, restSM);


        aggregateSM.addStateManager(memorySM, [], false);
        aggregateSM.addStateManager(asyncSM, [], false);

        this.stateManager = aggregateSM;

        // state listener
        this.stateChanged = this.stateChanged.bind(this);
        this.stateChangedItemAdded = this.stateChangedItemAdded.bind(this);
        this.stateChangedItemRemoved = this.stateChangedItemRemoved.bind(this);
        this.stateChangedItemUpdated = this.stateChangedItemUpdated.bind(this);

        // call backs
        this.callbackAddToCollection = this.callbackAddToCollection.bind(this);
        this.callbackRemoveFromCollection = this.callbackRemoveFromCollection.bind(this);
        this.callbackGetCollection = this.callbackGetCollection.bind(this);

        //event handlers
        this.addBoardGameToCollection = this.addBoardGameToCollection.bind(this);

        // data objects
        this.setupDataObjectDefinitions();

        return this;
    }

    private setupDataObjectDefinitions() {
        // create the object definitions for the exercise type and workout
        let exerciseTypeDefinition:DataObjectDefinition = ObjectDefinitionRegistry.getInstance().addDefinition(STATE_NAMES.exerciseTypes,'Exercise', true, true, true, '_id');
        BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(exerciseTypeDefinition, "name", "Name", FieldType.text, true, "Exercise name");
        BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(exerciseTypeDefinition, "type", "Type", FieldType.limitedChoice, true, "Choose cardio or strength",
            new SimpleValueDataSource([
                {name: 'Cardio', value: 'cardio'},
                {name: 'Strength', value: 'strength'}
            ]));
        BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(exerciseTypeDefinition, "duration", "Duration", FieldType.duration, true, "Exercise time");
        BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(exerciseTypeDefinition, "sets", "Sets", FieldType.integer, false, "Number of sets");
        BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(exerciseTypeDefinition, "reps", "Repetitions", FieldType.integer, false, "Number of reps");
        BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(exerciseTypeDefinition, "weight", "Weight", FieldType.float, false, "Weight used");
        BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(exerciseTypeDefinition, "distance", "Distance", FieldType.float, false, "Distance travelled");

        cLogger(`Exercise type data object definition`);
        cLogger(exerciseTypeDefinition);
        cLoggerDetail(ObjectDefinitionRegistry.getInstance().findDefinition('exerciseType'));

        let workoutDefinition:DataObjectDefinition = ObjectDefinitionRegistry.getInstance().addDefinition(STATE_NAMES.workouts,'Workout', true, true, true, '_id');
        BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(workoutDefinition, "completed", "Completed", FieldType.boolean, true, "Have completed the workout");
        let exercisesFieldDefinition:FieldDefinition = BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(workoutDefinition, "exercises", "Exercises", FieldType.collection, true, "Exercises in this workout");
        exercisesFieldDefinition.idType = KeyType.collection;
        exercisesFieldDefinition.collectionOfDataObjectId = exerciseTypeDefinition.id;

        cLogger(`Workout data object definition`);
        cLogger(workoutDefinition);
        cLoggerDetail(ObjectDefinitionRegistry.getInstance().findDefinition('workout'));


    }

    /*
        Get the base data for the application (users, entries)
    */
    public initialise(): void {
        cLogger('Initialising data state');
        // listen for socket events
        let socketListerDelegate = new SocketListenerDelegate();
        SocketManager.getInstance().setListener(socketListerDelegate);

        // now that we have all the user we can setup the chat system but only if we are logged in
        cLogger(`Setting up chat system for user ${this.getLoggedInUserId()}: ${this.getLoggedInUsername()}`);
        if (this.getLoggedInUserId().trim().length > 0) {
            // setup the chat system
            let chatManager = ChatManager.getInstance(); // this connects the manager to the socket system

            // setup the chat notification system
            NotificationController.getInstance();
            chatManager.setCurrentUser(this.getLoggedInUsername());

            // let the application view know about message counts
            chatManager.setUnreadCountListener(this.applicationView);

            chatManager.login();
            // load the users
            this.getStateManager().getStateByName(STATE_NAMES.users);
            this.getStateManager().getStateByName(STATE_NAMES.exerciseTypes);
            this.getStateManager().getStateByName(STATE_NAMES.workouts);
        }

    }

    public getStateManager(): StateManager {
        return this.stateManager;
    }

    public isLoggedIn(): boolean {
        let isLoggedIn = false;
        try {
            // @ts-ignore
            if (loggedInUser) {
                isLoggedIn = true;
            }
        } catch (error) {
        }
        return isLoggedIn;
    }

    public getLoggedInUserId(): string {
        let result = '';
        try {
            // @ts-ignore
            if (loggedInUser) {
                // @ts-ignore
                result = loggedInUser._id;
            }
        } catch (error) {
        }
        cLoggerDetail(`Logged in user id is ${result}`);
        return result;
    }

    public getLoggedInUsername(): string {
        let result = '';
        try {
            // @ts-ignore
            if (loggedInUser) {
                // @ts-ignore
                result = loggedInUser.username;
            }
        } catch (error) {
        }
        cLoggerDetail(`Logged in user is ${result}`);
        return result;
    }

    public handleMessage(message: string): void {
        cLogger(message);
    }

    public getCurrentUser(): string {
        return this.getLoggedInUserId();
    }

    stateChangedItemAdded(managerName: string, name: string, itemAdded: any): void {}
    stateChangedItemRemoved(managerName: string, name: string, itemRemoved: any): void {}
    stateChangedItemUpdated(managerName: string, name: string, itemUpdated: any, itemNewValue: any): void {}
    stateChanged(managerName: string, name: string, values: any) {}


    public callbackBoardGameDetails(data: any, status: number, associatedStateName: string): void {
        cLogger(`callback for bgg search for single board game ${associatedStateName} with status ${status}`);
        if (status >= 200 && status <= 299) { // do we have any data?
            cLogger(data);
        }

    }

    public callbackAddToCollection(data: any, status: number, associatedStateName: string): void {
        cLogger(`callback for add single board game ${associatedStateName} to my collection with status ${status}`);
        if (status >= 200 && status <= 299) { // do we have any data?
            cLogger(data);
        }
    }

    public callbackRemoveFromCollection(data: any, status: number, associatedStateName: string): void {
        cLogger(`callback for remove single board game ${associatedStateName} from my collection with status ${status}`);
        if (status >= 200 && status <= 299) { // do we have any data?
            cLogger(data);
        }
    }

    public callbackGetCollection(data: any, status: number, associatedStateName: string): void {
        cLogger(`callback for getting my collection of board games ${associatedStateName} to my collection with status ${status}`);
        if (status >= 200 && status <= 299) { // do we have any data?
            cLogger(data);
        }
    }

    addBoardGameToCollection(event: MouseEvent) {
        cLogger(`Handling Add Board Game to collection`);
    }


    /*
    *
    * Simple Application state (URL, logged in user)
    *
     */
    private getServerAPIURL(): string {
        let result = "";
        // @ts-ignore
        if ((window.ENV) && (window.ENV.serverURL)) {
            // @ts-ignore
            result = window.ENV.serverURL;
        }
        return result;
    }


    handleShowChat(roomName:string|null) {
        this.applicationView.handleShowChat(roomName);
    }

    create(controller: DataObjectController, typeName: string, dataObj: any): void {
        switch(typeName) {
            case STATE_NAMES.exerciseTypes: {
                cLogger(`Handling create new exercise type`);
                cLoggerDetail(dataObj);
                this.stateManager.addNewItemToState(typeName,dataObj,false);
                break;
            }
        }
    }

    delete(controller: DataObjectController, typeName: string, dataObj: any): void {
        switch(typeName) {
            case STATE_NAMES.exerciseTypes: {
                cLogger(`Handling delete exercise type - already managed by stateful collection view`);
                cLoggerDetail(dataObj);
                break;
            }
        }
    }

    update(controller: DataObjectController, typeName: string, dataObj: any): void {
        switch(typeName) {
            case STATE_NAMES.exerciseTypes: {
                cLogger(`Handling update exercise type`);
                cLoggerDetail(dataObj);
                this.stateManager.updateItemInState(typeName,dataObj,isSameMongo,false);
                break;
            }
        }
    }
}

export default Controller;
