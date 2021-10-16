import debug from 'debug';
import {API_Config, STATE_NAMES} from "./AppTypes";
import {v4} from "uuid";
import SocketListenerDelegate from "./SocketListenerDelegate";
import {
    AggregateStateManager,
    AsyncStateManagerWrapper,
    BasicObjectDefinitionFactory,
    ChatManager,
    DataObjectController,
    DataObjectDefinition,
    DataObjectListener,
    FieldDefinition,
    FieldType,
    isSameMongo,
    KeyType,
    MemoryBufferStateManager,
    NotificationController,
    ObjectDefinitionRegistry,
    RESTApiStateManager,
    SimpleValueDataSource,
    SocketManager,
    StateChangeListener,
    StateManager
} from "ui-framework-jps";



const cLogger = debug('controller-ts');
const cLoggerDetail = debug('controller-ts-detail');

export default class Controller implements StateChangeListener,DataObjectListener {
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


    private constructor() {}

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
                isActive:true,
                find:false,
                findAll: true,
                create: true,
                update: true,
                destroy: true
            },
            {
                stateName:STATE_NAMES.exerciseTypes,
                serverURL:'',
                api:API_Config.exerciseTypes,
                isActive:true,
                idField: '_id',
                find:false,
                findAll: true,
                create: true,
                update: true,
                destroy: true
            },
            {
                stateName:STATE_NAMES.workouts,
                serverURL:'',
                api:API_Config.workouts,
                isActive:true,
                idField: '_id',
                find:false,
                findAll: true,
                create: true,
                update: true,
                destroy: true
            }
        ]);


        let aggregateSM = new AggregateStateManager(isSameMongo)
        let memorySM = new MemoryBufferStateManager(isSameMongo)

        let asyncSM = new AsyncStateManagerWrapper(aggregateSM, restSM,isSameMongo);


        aggregateSM.addStateManager(memorySM, [], false);
        aggregateSM.addStateManager(asyncSM, [], false);

        this.stateManager = aggregateSM;

        // state listener
        this.stateChanged = this.stateChanged.bind(this);
        this.stateChangedItemAdded = this.stateChangedItemAdded.bind(this);
        this.stateChangedItemRemoved = this.stateChangedItemRemoved.bind(this);
        this.stateChangedItemUpdated = this.stateChangedItemUpdated.bind(this);

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
        BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(workoutDefinition, "name", "Name", FieldType.text, false, "Give the workout a name");
        BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(workoutDefinition, "completed", "Completed", FieldType.boolean, true, "Have completed the workout");
        let exercisesFieldDefinition:FieldDefinition = BasicObjectDefinitionFactory.getInstance().addStringFieldToObjDefinition(workoutDefinition, "exercises", "Exercises", FieldType.collection, true, "Exercises in this workout");
        exercisesFieldDefinition.idType = KeyType.collection;
        exercisesFieldDefinition.linkedDataObjectId = exerciseTypeDefinition.id;

        cLogger(`Workout data object definition`);
        cLogger(workoutDefinition);
        cLoggerDetail(ObjectDefinitionRegistry.getInstance().findDefinition('workout'));


    }

    /*
        Get the base data for the application (users, entries)
    */
    public onDocumentLoaded(): void {
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

    public getListenerName(): string {
        return 'Controller';
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
                this.stateManager.updateItemInState(typeName,dataObj,false);
                break;
            }
        }
    }


    addExerciseToCurrentWorkout(exerciseType:any):void {
        let copyOfExercise = {...exerciseType};
        copyOfExercise._id = v4(); // update the id to be unique for the workout
        this.applicationView.addingExerciseToCurrentWorkout(copyOfExercise);
    }

    addWorkoutExercisesToCurrentWorkout(workout:any):void {
        if (workout.exercises) {
            workout.exercises.forEach((exercise:any) => {
                this.addExerciseToCurrentWorkout(exercise);
            });
        }
    }

    filterResults(managerName: string, name: string, filterResults: any): void {
    }

}


