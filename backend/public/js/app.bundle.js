(()=>{var e,t={9959:(e,t,n)=>{"use strict";n.d(t,{Z:()=>B});var s=n(1227),a=n.n(s);let i;!function(e){e[e.Incomplete=0]="Incomplete",e[e.Complete=1]="Complete",e[e.Persisted=2]="Persisted",e[e.PersistedLocally=3]="PersistedLocally"}(i||(i={}));const r="user",o="exerciseType",d="workout",c="exercises",l="/login",u="exerciseType",g="exerciseTypes",h="exerciseTypes",m="exercises",p="exerciseTypeDetail",I="workoutDetail";var w=n(4586),f=n(8885);const b=a()("socket-listener");class v{constructor(){}handleDataChangedByAnotherUser(e){b(`Handling data change ${e.type} on object type ${e.stateName} made by user ${e.user}`);const t=S.getInstance().getStateManager().findItemInState(r,{_id:e.user});let n="unknown";t&&(n=t.username),b(`Handling data change ${e.type} on object type ${e.stateName} made by user ${n}`);let s=e.data;b(s);try{switch(e.type){case"create":switch(e.stateName){case r:S.getInstance().getStateManager().addNewItemToState(r,s,!0),f.fn.getInstance().show(s.username,`${s.username} has just registered.`,f.k$.message);break;case o:S.getInstance().getStateManager().addNewItemToState(o,s,!0)}break;case"update":switch(e.stateName){case o:S.getInstance().getStateManager().updateItemInState(o,s,!0)}break;case"delete":switch(e.stateName){case o:S.getInstance().getStateManager().removeItemFromState(o,s,!0)}}}catch(e){b(e)}}handleMessage(e){b(`Received message: ${e}`)}getCurrentUser(){return S.getInstance().getLoggedInUserId()}}const k=a()("controller-ts"),y=a()("controller-ts-detail");class S{constructor(){}static getInstance(){return S._instance||(S._instance=new S),S._instance}connectToApplication(e,t){this.applicationView=e,this.clientSideStorage=t;let n=f.ai.getInstance();n.initialise([{stateName:r,serverURL:"",api:"/api/users",isActive:!0,find:!1,findAll:!0,create:!0,update:!0,destroy:!0},{stateName:o,serverURL:"",api:"/api/exercise-types",isActive:!0,idField:"_id",find:!1,findAll:!0,create:!0,update:!0,destroy:!0},{stateName:d,serverURL:"",api:"/api/workouts",isActive:!0,idField:"_id",find:!1,findAll:!0,create:!0,update:!0,destroy:!0}]);let s=new f.qP(f.PZ),a=new f.WY(f.PZ),i=new f.Sz(s,n,f.PZ);return s.addStateManager(a,[],!1),s.addStateManager(i,[],!1),this.stateManager=s,this.stateChanged=this.stateChanged.bind(this),this.stateChangedItemAdded=this.stateChangedItemAdded.bind(this),this.stateChangedItemRemoved=this.stateChangedItemRemoved.bind(this),this.stateChangedItemUpdated=this.stateChangedItemUpdated.bind(this),this.setupDataObjectDefinitions(),this}onDocumentLoaded(){k("Initialising data state");let e=new v;if(f.Cn.getInstance().setListener(e),k(`Setting up chat system for user ${this.getLoggedInUserId()}: ${this.getLoggedInUsername()}`),this.getLoggedInUserId().trim().length>0){let e=f.dU.getInstance();f.XP.getInstance(),e.setCurrentUser(this.getLoggedInUsername()),e.setUnreadCountListener(this.applicationView),e.login(),this.getStateManager().getStateByName(r),this.getStateManager().getStateByName(o),this.getStateManager().getStateByName(d)}}getStateManager(){return this.stateManager}getListenerName(){return"Controller"}isLoggedIn(){let e=!1;try{loggedInUser&&(e=!0)}catch(e){}return e}getLoggedInUserId(){let e="";try{loggedInUser&&(e=loggedInUser._id)}catch(e){}return y(`Logged in user id is ${e}`),e}getLoggedInUsername(){let e="";try{loggedInUser&&(e=loggedInUser.username)}catch(e){}return y(`Logged in user is ${e}`),e}handleMessage(e){k(e)}getCurrentUser(){return this.getLoggedInUserId()}stateChangedItemAdded(e,t,n){}stateChangedItemRemoved(e,t,n){}stateChangedItemUpdated(e,t,n,s){}stateChanged(e,t,n){}handleShowChat(e){this.applicationView.handleShowChat(e)}create(e,t,n){switch(t){case o:k("Handling create new exercise type"),y(n),this.stateManager.addNewItemToState(t,n,!1)}}delete(e,t,n){switch(t){case o:k("Handling delete exercise type - already managed by stateful collection view"),y(n)}}update(e,t,n){switch(t){case o:k("Handling update exercise type"),y(n),this.stateManager.updateItemInState(t,n,!1)}}addExerciseToCurrentWorkout(e){let t={...e};t._id=(0,w.Z)(),this.applicationView.addingExerciseToCurrentWorkout(t)}addWorkoutExercisesToCurrentWorkout(e){e.exercises&&e.exercises.forEach((e=>{this.addExerciseToCurrentWorkout(e)}))}filterResults(e,t,n){}setupDataObjectDefinitions(){let e=f.XQ.getInstance().addDefinition(o,"Exercise",!0,!0,!0,"_id");f.p9.getInstance().addStringFieldToObjDefinition(e,"name","Name",f.fS.text,!0,"Exercise name"),f.p9.getInstance().addStringFieldToObjDefinition(e,"type","Type",f.fS.limitedChoice,!0,"Choose cardio or strength",new f.qV([{name:"Cardio",value:"cardio"},{name:"Strength",value:"strength"}])),f.p9.getInstance().addStringFieldToObjDefinition(e,"duration","Duration",f.fS.duration,!0,"Exercise time"),f.p9.getInstance().addStringFieldToObjDefinition(e,"sets","Sets",f.fS.integer,!1,"Number of sets"),f.p9.getInstance().addStringFieldToObjDefinition(e,"reps","Repetitions",f.fS.integer,!1,"Number of reps"),f.p9.getInstance().addStringFieldToObjDefinition(e,"weight","Weight",f.fS.float,!1,"Weight used"),f.p9.getInstance().addStringFieldToObjDefinition(e,"distance","Distance",f.fS.float,!1,"Distance travelled"),k("Exercise type data object definition"),k(e);let t=f.XQ.getInstance().addDefinition(c,"Exercise",!0,!0,!0,"_id");f.p9.getInstance().addStringFieldToObjDefinition(t,"completed","Completed",f.fS.boolean,!1,"Completed"),f.p9.getInstance().addStringFieldToObjDefinition(t,"name","Name",f.fS.text,!0,"Exercise name"),f.p9.getInstance().addStringFieldToObjDefinition(t,"type","Type",f.fS.limitedChoice,!0,"Choose cardio or strength",new f.qV([{name:"Cardio",value:"cardio"},{name:"Strength",value:"strength"}])),f.p9.getInstance().addStringFieldToObjDefinition(t,"duration","Duration",f.fS.duration,!0,"Exercise time"),f.p9.getInstance().addStringFieldToObjDefinition(t,"sets","Sets",f.fS.integer,!1,"Number of sets"),f.p9.getInstance().addStringFieldToObjDefinition(t,"reps","Repetitions",f.fS.integer,!1,"Number of reps"),f.p9.getInstance().addStringFieldToObjDefinition(t,"weight","Weight",f.fS.float,!1,"Weight used"),f.p9.getInstance().addStringFieldToObjDefinition(t,"distance","Distance",f.fS.float,!1,"Distance travelled"),k("Exercise data object definition"),k(t);let n=f.XQ.getInstance().addDefinition(d,"Workout",!0,!0,!0,"_id");f.p9.getInstance().addStringFieldToObjDefinition(n,"name","Name",f.fS.text,!1,"Give the workout a name"),f.p9.getInstance().addNumericFieldToObjDefinition(n,"calories","Calories",f.fS.integer,!1,"Calories burned during workout"),f.p9.getInstance().addStringFieldToObjDefinition(n,"completed","Completed",f.fS.boolean,!0,"Have completed the workout");let s=f.p9.getInstance().addStringFieldToObjDefinition(n,"exercises","Exercises",f.fS.collection,!0,"Exercises in this workout");s.idType=f.Jz.collection,s.linkedDataObjectId=t.id,k("Workout data object definition"),k(n)}getServerAPIURL(){let e="";return window.ENV&&window.ENV.serverURL&&(e=window.ENV.serverURL),e}}class C extends f.GN{static SidebarPrefs={id:"exerciseTypesSidebar",expandedSize:"50%",location:f.Zh.left};static SidebarContainers={container:"exerciseTypesContainer"};constructor(){super(C.SidebarPrefs)}}class j{constructor(){}static getInstance(){return j._instance||(j._instance=new j),j._instance}setupValidationForExerciseTypeDetailsForm(e){let t={viewMode:f.wO.any,targetDataFieldId:"sets",response:f.H1.show,conditions:[{sourceDataFieldId:"type",comparison:f.wj.hasValue,values:"strength"}]};f.vY.getInstance().addRuleToView(e,t),t={viewMode:f.wO.any,targetDataFieldId:"reps",response:f.H1.show,conditions:[{sourceDataFieldId:"type",comparison:f.wj.hasValue,values:"strength"}]},f.vY.getInstance().addRuleToView(e,t),t={viewMode:f.wO.any,targetDataFieldId:"weight",response:f.H1.show,conditions:[{sourceDataFieldId:"type",comparison:f.wj.hasValue,values:"strength"}]},f.vY.getInstance().addRuleToView(e,t),t={viewMode:f.wO.any,targetDataFieldId:"reps",response:f.H1.hide,conditions:[{sourceDataFieldId:"type",comparison:f.wj.hasValue,values:"cardio"}]},f.vY.getInstance().addRuleToView(e,t),t={viewMode:f.wO.any,targetDataFieldId:"sets",response:f.H1.hide,conditions:[{sourceDataFieldId:"type",comparison:f.wj.hasValue,values:"cardio"}]},f.vY.getInstance().addRuleToView(e,t),t={viewMode:f.wO.any,targetDataFieldId:"weight",response:f.H1.hide,conditions:[{sourceDataFieldId:"type",comparison:f.wj.hasValue,values:"cardio"}]},f.vY.getInstance().addRuleToView(e,t),t={viewMode:f.wO.any,targetDataFieldId:"distance",response:f.H1.show,conditions:[{sourceDataFieldId:"type",comparison:f.wj.hasValue,values:"cardio"}]},f.vY.getInstance().addRuleToView(e,t),t={viewMode:f.wO.any,targetDataFieldId:"distance",response:f.H1.hide,conditions:[{sourceDataFieldId:"type",comparison:f.wj.hasValue,values:"strength"}]},f.vY.getInstance().addRuleToView(e,t),t={viewMode:f.wO.any,targetDataFieldId:"sets",response:f.H1.invalid,multipleConditionLogic:f.nq.failOnlyIfFinalConditionIsAFailAndPreviousConditionsAreNotFails,conditions:[{sourceDataFieldId:"type",comparison:f.wj.hasValue,values:"strength"},{comparison:f.wj.greaterThan,values:"0"}]},f.vY.getInstance().addRuleToView(e,t)}}const D=a()("exercise-types-view");class x extends f.rk{static DOMConfig={viewConfig:{resultsContainerId:"exerciseTypes",dataSourceId:h},resultsElement:{type:"a",attributes:[{name:"href",value:"#"}],classes:"list-group-item my-list-item truncate-notification list-group-item-action"},keyId:"_id",keyType:f.Jz.string,modifiers:{normal:"",inactive:"list-group-item-light",active:"list-group-item-primary",warning:""},icons:{normal:"",inactive:"",active:"",warning:""},sorter:function(e,t){let n=1;return e.name<t.name&&(n=-1),n},detail:{containerClasses:"d-flex w-100 justify-content-between",textElement:{type:"span",classes:"mb-1"},select:!0,icons:(e,t)=>t.type?"cardio"===t.type?["fas fa-running ml-2"]:["fas fa-dumbbell ml-2"]:[],delete:{classes:"btn bg-danger text-white btn-circle btn-md",iconClasses:"text-black fas fa-trash-alt",attributes:[{name:"data-toggle",value:"tooltip"},{name:"data-placement",value:"right"},{name:"title",value:"Delete this exercise type."}]},drag:{type:u,from:g}},extraActions:[{name:"addToWorkout",button:{classes:"btn bg-primary text-white btn-circle btn-md mr-1",iconClasses:"fas fa-arrow-alt-circle-right",attributes:[{name:"data-toggle",value:"tooltip"},{name:"data-placement",value:"right"},{name:"data-html",value:"true"},{name:"title",value:"Add this <strong>exercise</strong> to the current workout."}]}}]};constructor(e){super(x.DOMConfig,e,o),this.renderer=new f.LS(this,this),this.eventHandlerDelegate=new f.SZ(this,this.eventForwarder),this.getIdForItemInNamedCollection=this.getIdForItemInNamedCollection.bind(this),this.getItemId=this.getItemId.bind(this);let t=f.iZ.getInstance().addContextFromView(this,o,"Exercise Types");f.iZ.getInstance().addActionToContext(t,"addToWorkout","Add To Workout",this.eventHandlerDelegate.eventActionClicked,"fas fa-arrow-alt-circle-right")}getItemDescription(e,t){let n="";return n+="<strong>"+t.name+"</strong>: ","cardio"===t.type?n+=t.distance+" km in "+t.duration:n+=t.sets+" sets of "+t.reps+" reps in "+t.duration,n+="<br/>",n}canDeleteItem(e,t){return D(`Can Delete ${t}`),D(t[f.YJ]),!(!t[f.YJ]||t[f.YJ]!==S.getInstance().getLoggedInUsername())}compareItemsForEquality(e,t){return(0,f.PZ)(e,t)}getIdForItemInNamedCollection(e,t){return t._id}renderDisplayForItemInNamedCollection(e,t,n){e.innerHTML=n.name}hasPermissionToDeleteItemInNamedCollection(e,t){return D(`Has delete permission ${t}`),D(t[f.YJ]),!(!t[f.YJ]||t[f.YJ]!==S.getInstance().getLoggedInUsername())}itemAction(e,t,n){super.itemAction(e,t,n),t===x.DOMConfig.extraActions[0].name&&S.getInstance().addExerciseToCurrentWorkout(n)}}class E{hasPermissionToUpdateItem(e){let t=!1;return e.createdBy&&(t=e.createdBy===S.getInstance().getLoggedInUsername()),t}hasPermissionToDeleteItem(e){let t=!1;return e.createdBy&&(t=e.createdBy===S.getInstance().getLoggedInUsername()),t}hasPermissionToEditField(e,t){return!0}}const T=a()("exercise-types-composite-view");class W{constructor(e){this.sideBar=e}onDocumentLoaded(){const e=new x(S.getInstance().getStateManager());this.sideBar.addView(e,{containerId:C.SidebarContainers.container});const t=f.XQ.getInstance().findDefinition(o);if(t){let n=new f.C3(p,t,new E,f.P1.getInstance()),s=new f.$R({resultsContainerId:p,dataSourceId:h},n),a=new f.X(o,e);a.addLinkedDetailView(s),this.sideBar.onDocumentLoaded();let i=f.p9.getInstance().generateStartingDisplayOrder(t);s.initialise(i,!1,!0);const r=n.getForm();r&&(T(`Setting up validation rules for ${r.getId()}`),T(r),j.getInstance().setupValidationForExerciseTypeDetailsForm(r));let d=document.getElementById("addNewExerciseType");T("Setting up button for creating exercise types"),T(d),d&&d.addEventListener("click",(e=>{T("Asking view linker to start a new object"),a.startNewObject()})),a.addListener(S.getInstance())}}}class F extends f.GN{static SidebarPrefs={id:"workoutSummarySidebar",expandedSize:"100%",location:f.Zh.bottom};static SidebarContainers={container:"workoutSummary"};constructor(){super(F.SidebarPrefs)}}var M=n(381),N=n.n(M),L=n(9403);const O=a()("workout-summary-renderer");class H{currentChart=null;constructor(e,t){this.view=e,this.eventHandler=t}createDisplayElementForCollectionItem(e,t){return document.createElement("a")}setDisplayElementsForCollectionInContainer(e,t,n){O(`view ${this.view.getName()}: creating workout summary`),O(n),this.currentChart&&this.currentChart.destroy();let s=n;n.length>7&&(s=n.slice(n.length-7));let a=[],i=[],r=[],o=[],d=[];s.forEach((e=>{const t=N()(e.createdOn,"YYYYMMDDHHmmss").format("ddd DD/MM/YYYY HH:mm");d.push(t),O(`Added label ${t}`),e.exercises&&e.exercises.forEach((e=>{const t=e.name;if(a.findIndex((e=>e==t))<0){O(`Adding exercise ${t} of type ${e.type} to datasets`),a.push(t),o.push(e.type);const n=this.generateRandomExerciseColourAndBorder("strength"===e.type);i.push(n[0]),r.push(n[1])}}))}));let c=[];a.forEach(((e,t)=>{const n=o[t],a=i[t],d=r[t];O(`Constructing dataset ${e} of type ${n} to datasets`);let l=[],u=[],g=[];s.forEach((t=>{u.push(a),g.push(d),t.exercises?t.exercises.every((t=>t.name!=e||("strength"===n?(O(`Found exercise ${e} with value ${t.weight}`),l.push(t.weight)):(O(`Found exercise ${e} with value ${t.distance}`),l.push(t.distance)),!1)))&&l.push(0):l.push(0)}));let h={label:e,data:l,backgroundColor:u,borderColor:g,borderWidth:1,order:1};O(h),c.push(h)}));let l={labels:d,datasets:c},u={type:"bar",data:l,options:{responsive:!0,animation:!0,maintainAspectRatio:!0,scales:{y:{beginAtZero:!0}}}};O(l),this.currentChart=new L.Z(e,u)}onDocumentLoaded(){}generateRandomExerciseColourAndBorder(e=!0){let t=0,n=0;const s=Math.floor(100*Math.random())+155;return e&&(t=s),e||(n=s),[`rgba(${t},50,${n},0.4)`,`rgb(${t},50,${n})`]}}class A extends f.rk{static DOMConfig={viewConfig:{resultsContainerId:"workoutSummaryChart",dataSourceId:"workoutSummary"},resultsElement:{type:"canvas",classes:""},keyId:"_id",keyType:f.Jz.string,detail:{containerClasses:"",textElement:{type:"",classes:""},select:!1}};constructor(){super(A.DOMConfig,S.getInstance().getStateManager(),d),this.renderer=new H(this,this)}canDeleteItem(e,t){return!1}compareItemsForEquality(e,t){return(0,f.PZ)(e,t)}getIdForItemInNamedCollection(e,t){return t._id}renderDisplayForItemInNamedCollection(e,t,n){}hasPermissionToDeleteItemInNamedCollection(e,t){return!1}hasPermissionToActionItemInNamedCollection(e,t,n){return!1}renderBackgroundForItemInNamedCollection(e,t,n){}}class Y extends f.GN{static sidebarPrefs={id:"currentWorkoutSidebar",expandedSize:"50%",location:f.Zh.right};static SidebarContainers={list:"exercises",detail:"workoutDetail"};constructor(){super(Y.sidebarPrefs)}}a()("current-workout-exercises-view");class U extends f.rk{static DOMConfig={viewConfig:{resultsContainerId:"exercises",dataSourceId:m,drop:{acceptFrom:[g],acceptTypes:[u]}},resultsElement:{type:"a",attributes:[{name:"href",value:"#"}],classes:"list-group-item my-list-item truncate-notification list-group-item-action"},keyId:"_id",keyType:f.Jz.string,modifiers:{normal:"",inactive:"list-group-item-light",active:"list-group-item-primary",warning:""},icons:{normal:"",inactive:"",active:"",warning:""},detail:{containerClasses:"d-flex w-100 justify-content-between",textElement:{type:"span",classes:"mb-1"},select:!0,icons:(e,t)=>t.type?"cardio"===t.type?["fas fa-running ml-2"]:["fas fa-dumbbell ml-2"]:[],delete:{classes:"btn bg-danger text-white btn-circle btn-md",iconClasses:"fas fa-trash-alt",attributes:[{name:"data-toggle",value:"tooltip"},{name:"data-placement",value:"right"},{name:"title",value:"Delete this exercise from the workout."}]}}};constructor(e){super(U.DOMConfig,e,c),this.renderer=new f.LS(this,this),this.eventHandlerDelegate=new f.SZ(this,this.eventForwarder),this.getIdForItemInNamedCollection=this.getIdForItemInNamedCollection.bind(this),this.getItemId=this.getItemId.bind(this),f.iZ.getInstance().addContextFromView(this,c,"Exercises")}getItemDescription(e,t){let n="";return n+="<strong>"+t.name+"</strong>: ","cardio"===t.type?n+=t.distance+" km in "+t.duration:n+=t.sets+" sets of "+t.reps+" reps in "+t.duration,n+="<br/>",n}canDeleteItem(e,t){return!0}compareItemsForEquality(e,t){return(0,f.PZ)(e,t)}getIdForItemInNamedCollection(e,t){return t._id}renderDisplayForItemInNamedCollection(e,t,n){e.innerHTML=n.name}hasPermissionToDeleteItemInNamedCollection(e,t){return!0}itemDropped(e,t){S.getInstance().addExerciseToCurrentWorkout(t)}}const V=a()("current-workout-composite-view");class _{currentWorkout={};workoutDef=null;workoutNameEl=null;workoutCaloriesEl=null;constructor(e){this.sideBar=e,this.stateManager=new f.WY(f.PZ),this.stateManager.addChangeListenerForName(c,this),S.getInstance().getStateManager().addChangeListenerForName(d,this)}getListenerName(){return"Current Workout Composite View"}onDocumentLoaded(){var e,t;if(this.workoutNameEl=document.getElementById("workoutName"),null===(e=this.workoutNameEl)||void 0===e||e.addEventListener("blur",(e=>{e.target&&(this.currentWorkout.name=e.target.value,this.saveWorkout())})),this.workoutCaloriesEl=document.getElementById("calories"),null===(t=this.workoutCaloriesEl)||void 0===t||t.addEventListener("blur",(e=>{e.target&&(this.currentWorkout.calories=parseInt(e.target.value),this.saveWorkout())})),this.workoutDef=f.XQ.getInstance().findDefinition(d),!this.workoutDef)throw new Error("Workout definition not found");const n=new U(this.stateManager);this.sideBar.addView(n,{containerId:"exerciseDropZone"});const s=f.XQ.getInstance().findDefinition(c);if(s){let e=new f.C3(I,s,new f.NE,f.P1.getInstance()),t=new f.$R({resultsContainerId:I,dataSourceId:m},e),a=new f.X(c,n);a.addLinkedDetailView(t),this.sideBar.onDocumentLoaded();let i=f.p9.getInstance().generateStartingDisplayOrder(s);t.initialise(i,!1,!0);const r=e.getForm();r&&(V(`Setting up validation rules for ${r.getId()}`),V(r),j.getInstance().setupValidationForExerciseTypeDetailsForm(r));let o=document.getElementById("completeWorkout");V("Setting up button for completing the workout"),V(o),o&&o.addEventListener("click",(e=>{V("Completing the workout"),this.currentWorkout.completed=!0,this.currentWorkout.createdOn=N()().format("YYYYMMDDHHmmss"),r&&(r.reset(),r.setReadOnly()),this.saveWorkout(),this.createWorkout(),B.getInstance().hideAllSideBars()})),a.addListener(this)}}getStateManager(){return this.stateManager}stateChanged(e,t,n){V(`${e},${t}`),t===d&&(V("Workouts loaded"),this.currentWorkout=null,n.forEach((e=>{e.completed&&"false"!==e.completed||(this.currentWorkout=e)})),this.currentWorkout?(V("Workouts loaded found existing current workout"),this.workoutNameEl&&this.currentWorkout.name&&(this.workoutNameEl.value=this.currentWorkout.name),this.stateManager.setStateByName(c,this.currentWorkout.exercises,!0)):(V("Workouts loaded no existing current workout, creating and saving"),this.createWorkout()))}stateChangedItemAdded(e,t,n){t===c&&(V("Added a new exercise to workout"),V(n),this.currentWorkout.exercises.push(n),this.saveWorkout())}stateChangedItemRemoved(e,t,n){if(t===c){let e=this.currentWorkout.exercises.findIndex((e=>e._id===n._id));V(`Removing exercise to workout at index ${e}`),V(n),e>=0&&this.currentWorkout.exercises.splice(e,1),this.saveWorkout()}}stateChangedItemUpdated(e,t,n,s){if(t===c){let e=this.currentWorkout.exercises.findIndex((e=>e._id===s._id));V(`Updating exercise to workout at index ${e}`),V(s),e>=0&&this.currentWorkout.exercises.splice(e,1,s),this.saveWorkout()}}create(e,t,n){V("Added a new exercise to workout from view"),V(n),this.stateManager.addNewItemToState(c,n,!1)}update(e,t,n){V("Updating exercise in workout from view"),V(n),this.stateManager.updateItemInState(c,n,!1)}delete(e,t,n){V("Deleting exercise from workout from view"),V(n),this.stateManager.removeItemFromState(c,n,!1)}filterResults(e,t,n){}createWorkout(){V("Creating new current workout"),this.currentWorkout=f.XQ.getInstance().createInstance(d),V(this.currentWorkout),this.currentWorkout.name="",this.currentWorkout.calories=0,this.workoutNameEl&&(this.workoutNameEl.value=""),S.getInstance().getStateManager().addNewItemToState(d,this.currentWorkout,!1),this.stateManager.setStateByName(o,this.currentWorkout.exercises,!0)}saveWorkout(){V("Saving current workout"),V(this.currentWorkout),this.currentWorkout.createdOn=N()().format("YYYYMMDDHHmmss"),this.currentWorkout.modifiedOn=N()().format("YYYYMMDDHHmmss"),S.getInstance().getStateManager().updateItemInState(d,this.currentWorkout,!1)}}const R=a()("workouts-view");class P extends f.rk{static DOMConfig={itemsPerRow:{small:1,medium:2,large:3,xlarge:4},rowContainer:{classes:"carousel-item",type:"div"},activeRow:{type:"",classes:"active"},activeRowPosition:f.s_.last,row:{classes:"row",type:"div"},multipleItemsPerRowContainer:{type:"div",classes:"col-sm-12 col-md-4 col-lg-3 mb-2"},actionContainer:{type:"div",classes:"card-footer d-flex w-100 justify-content-end"},collectionConfig:{viewConfig:{resultsContainerId:"workouts",dataSourceId:"workouts",drop:{acceptTypes:[u],acceptFrom:[g]}},resultsElement:{type:"div",classes:"card"},keyId:"_id",keyType:f.Jz.string,modifiers:{normal:"bg-light",inactive:"bg-light",active:"bg-light",warning:"bg-light"},detail:{containerClasses:"card-body",textElement:{classes:"",type:"div"},select:!0,delete:{classes:"btn btn-danger btn-circle btn-md",iconClasses:"fas fa-trash-alt text-white",attributes:[{name:"data-toggle",value:"tooltip"},{name:"data-placement",value:"top"},{name:"title",value:"Delete this workout"}]},background:{type:"div",classes:""}},extraActions:[{name:"template",button:{text:"",classes:"btn btn-primary btn-circle btn-md mr-2",iconClasses:"fas fa-copy",attributes:[{name:"data-toggle",value:"tooltip"},{name:"data-placement",value:"top"},{name:"title",value:"Add the exercises from this workout to the current workout."}]}},{name:"continue",button:{text:"",iconClasses:"text-white fas fa-clipboard-list",classes:"btn btn-warning btn-circle btn-md mr-2",attributes:[{name:"data-toggle",value:"tooltip"},{name:"data-placement",value:"top"},{name:"title",value:"Continue this current workout"}]}}]}};static bgStrength="rgba(255, 0, 0, 0.2)";static bgCardio="rgba(0, 50, 255, 0.2)";static borderStrength="rgb(255, 50, 0)";static borderCardio="rgb(0, 50 , 255)";constructor(){super(P.DOMConfig.collectionConfig,S.getInstance().getStateManager(),d),this.renderer=new f.z6(this,this,P.DOMConfig),this.eventHandlerDelegate=new f.SZ(this,this.eventForwarder),this.chartRefs=[],this.getIdForItemInNamedCollection=this.getIdForItemInNamedCollection.bind(this),this.getItemId=this.getItemId.bind(this);let e=f.iZ.getInstance().addContextFromView(this,d,"Workouts");f.iZ.getInstance().addActionToContext(e,"template","Copy exercises to Current Workout",this.eventHandlerDelegate.eventActionClicked,"fas fa-copy"),f.iZ.getInstance().addActionToContext(e,"continue","Continue Current Workout",this.eventHandlerDelegate.eventActionClicked,"fas fa-clipboard-list")}getItemDescription(e,t){let n="";return t.exercises&&t.exercises.forEach((e=>{n+=`<strong>${e.name}</strong>: `,"cardio"===e.type?n+=`${e.distance} km in ${e.duration}`:n+=`${e.sets} sets of ${e.reps} reps in ${e.duration}`,n+="<br/>"})),n}canDeleteItem(e,t){return t.completed}compareItemsForEquality(e,t){return(0,f.PZ)(e,t)}getItemId(e,t){return this.getIdForItemInNamedCollection(e,t)}getIdForItemInNamedCollection(e,t){return t._id}renderDisplayForItemInNamedCollection(e,t,n){let s=this.calculateExerciseSummary(n),a="";a+='<h5 class="card-title">',n.name?(a+=`${n.name}</h5>`,a+=`<h6 class="card-subtitle">${N()(n.createdOn,"YYYYMMDDHHmmss").format("ddd, DD/MM/YYYY HH:mm")}</h6>`):n.completed?a+=`${N()(n.createdOn,"YYYYMMDDHHmmss").format("ddd, DD/MM/YYYY HH:mm")}</h5>`:a+="Current</h5>",a+='<ul class="list-group list-group-flush">',a+=`<li class="list-group-item"><strong>Duration:</strong> ${s.duration}</li>`,s.weight>0&&(a+=`<li class="list-group-item"><strong>Total Weight:</strong> ${s.weight}</li>`),s.distance>0&&(a+=`<li class="list-group-item"><strong>Total Distance: </strong> ${s.distance}</li>`),a+="</ul>",e.innerHTML=a}hasPermissionToDeleteItemInNamedCollection(e,t){return t.completed}hasPermissionToActionItemInNamedCollection(e,t,n){let s=!1;return"template"===e&&n.completed&&!0===n.completed&&(s=!0),"continue"===e&&!1===n.completed&&(s=!0),s}getModifierForItemInNamedCollection(e,t){let n=f.Dg.inactive;return t.completed&&!0!==t.completed&&(n=f.Dg.active),n}renderBackgroundForItemInNamedCollection(e,t,n){let s=this.chartRefs.findIndex((e=>e._id===n._id));if(s&&(R(`Removing old chart reference for workout ${n._id}`),this.chartRefs.splice(s,1)),R("Rendering chart for"),R(n),n.exercises){const s=this.getDataSourceKeyId(),a=this.getIdForItemInNamedCollection(t,n);let i=document.createElement("canvas");i.setAttribute(this.collectionUIConfig.keyId,a),i.setAttribute(s,this.collectionUIConfig.viewConfig.dataSourceId);let r=[],o=[],d=[],c=[];n.exercises.forEach((e=>{r.push((0,f.aS)(e.name,10)),"cardio"===e.type?(o.push(e.distance),d.push(P.bgCardio),c.push(P.borderCardio)):(o.push(e.weight),d.push(P.bgStrength),c.push(P.borderStrength))}));const l={type:"bar",data:{labels:r,datasets:[{label:"Exercises",data:o,backgroundColor:d,borderColor:c,borderWidth:1}]},options:{responsive:!1,animation:!1,maintainAspectRatio:!1,scales:{y:{beginAtZero:!0}}}};R(l);try{let t={_id:n._id,chart:new L.Z(i,l)};this.chartRefs.push(t),e.appendChild(i)}catch(e){console.log(e)}}}itemAction(e,t,n){super.itemAction(e,t,n),t===P.DOMConfig.collectionConfig.extraActions[0].name&&S.getInstance().addWorkoutExercisesToCurrentWorkout(n),t===P.DOMConfig.collectionConfig.extraActions[1].name&&B.getInstance().showCurrentWorkout()}calculateExerciseSummary(e){let t={weight:0,distance:0,duration:"00:00"};if(e.exercises)for(let n=0;n<e.exercises.length;n++){const s=e.exercises[n];t.weight+=s.weight,t.distance+=s.distance,t.duration=(0,f.nl)(t.duration,s.duration)}return t}}const z=a()("app");class B{constructor(){this.handleShowUserSearch=this.handleShowUserSearch.bind(this),this.handleShowExerciseTypes=this.handleShowExerciseTypes.bind(this),this.handleShowChat=this.handleShowChat.bind(this),this.handleShowWorkoutSummary=this.handleShowWorkoutSummary.bind(this),this.handleShowCurrentWorkout=this.handleShowCurrentWorkout.bind(this),S.getInstance().connectToApplication(this,window.localStorage)}static getInstance(){return B._instance||(B._instance=new B),B._instance}getCurrentUser(){return S.getInstance().getLoggedInUserId()}onDocumentLoad(){z("document loaded"),this.thisEl=document.getElementById("root"),this.setupUserSearchViews(),this.setupChatViews(),this.setupNavigationItemHandling(),this.exerciseTypesSidebar=new C,new W(this.exerciseTypesSidebar).onDocumentLoaded(),(new P).onDocumentLoaded(),this.workoutSummarySidebar=new F,this.workoutSummarySidebar.addView(new A,{containerId:F.SidebarContainers.container}),this.workoutSummarySidebar.onDocumentLoaded(),this.currentWorkoutSidebar=new Y,this.currentWorkoutView=new _(this.currentWorkoutSidebar),this.currentWorkoutView.onDocumentLoaded(),f.iZ.getInstance().onDocumentLoaded(),S.getInstance().onDocumentLoaded()}hideAllSideBars(){this.chatSidebar.eventHide(null),this.userSearchSidebar.eventHide(null),this.exerciseTypesSidebar.eventHide(null),this.currentWorkoutSidebar.eventHide(null)}handleShowUserSearch(e){z("Handling Show User Search"),e.preventDefault(),S.getInstance().isLoggedIn()?this.userSearchSidebar.eventShow(e):window.location.href=l}handleShowWorkoutSummary(e){z("Handling Show Workout Summary"),e.preventDefault(),S.getInstance().isLoggedIn()?(this.hideAllSideBars(),this.workoutSummarySidebar.eventShow(e)):window.location.href=l}handleShowCurrentWorkout(e){z("Handling Show Current Workout"),e.preventDefault(),S.getInstance().isLoggedIn()?this.currentWorkoutSidebar.eventShow(e):window.location.href=l}handleShowExerciseTypes(e){z("Handling Show Exercise Types"),e.preventDefault(),S.getInstance().isLoggedIn()?this.exerciseTypesSidebar.eventShow(e):window.location.href=l}handleShowChat(e){z("Handling Show Chat"),S.getInstance().isLoggedIn()?(this.chatSidebar.eventShow(null),e&&this.chatView.selectChatRoom(e)):window.location.href=l}countChanged(e){let t='Chat <i class="fas fa-inbox"></i>';e>0&&(t+=` <span class="badge badge-pill badge-primary">&nbsp;${e}&nbsp;</span>`),this.chatNavigationItem&&(this.chatNavigationItem.innerHTML=`${t}`)}addingExerciseToCurrentWorkout(e){this.currentWorkoutSidebar.eventShow(null),this.currentWorkoutView.getStateManager().addNewItemToState(c,e,!1)}showCurrentWorkout(){this.currentWorkoutSidebar.eventShow(null)}setupNavigationItemHandling(){document.getElementById("navigationItemUserSearch").addEventListener("click",this.handleShowUserSearch),document.getElementById("navigationItemExerciseTypes").addEventListener("click",this.handleShowExerciseTypes),document.getElementById("navigationItemWorkoutSummary").addEventListener("click",this.handleShowWorkoutSummary),document.getElementById("navigationItemCurrentWorkout").addEventListener("click",this.handleShowCurrentWorkout),this.chatNavigationItem=document.getElementById("navigationItemChat"),this.chatNavigationItem.addEventListener("click",this.handleShowChat)}setupUserSearchViews(){this.userSearchSidebar=f.g1.getInstance(S.getInstance().getStateManager()),this.userSearchSidebar.onDocumentLoaded()}setupChatViews(){this.chatSidebar=f.uE.getInstance(S.getInstance().getStateManager()),this.chatSidebar.onDocumentLoaded()}}$((function(){localStorage.debug="api-ts-results controller-ts",a().log=console.info.bind(console),B.getInstance().onDocumentLoad()}))},6700:(e,t,n)=>{var s={"./af":2786,"./af.js":2786,"./ar":867,"./ar-dz":4130,"./ar-dz.js":4130,"./ar-kw":6135,"./ar-kw.js":6135,"./ar-ly":6440,"./ar-ly.js":6440,"./ar-ma":7702,"./ar-ma.js":7702,"./ar-sa":6040,"./ar-sa.js":6040,"./ar-tn":7100,"./ar-tn.js":7100,"./ar.js":867,"./az":1083,"./az.js":1083,"./be":9808,"./be.js":9808,"./bg":8338,"./bg.js":8338,"./bm":7438,"./bm.js":7438,"./bn":8905,"./bn-bd":6225,"./bn-bd.js":6225,"./bn.js":8905,"./bo":1560,"./bo.js":1560,"./br":1278,"./br.js":1278,"./bs":622,"./bs.js":622,"./ca":2468,"./ca.js":2468,"./cs":5822,"./cs.js":5822,"./cv":877,"./cv.js":877,"./cy":7373,"./cy.js":7373,"./da":4780,"./da.js":4780,"./de":9740,"./de-at":217,"./de-at.js":217,"./de-ch":894,"./de-ch.js":894,"./de.js":9740,"./dv":5300,"./dv.js":5300,"./el":837,"./el.js":837,"./en-au":8348,"./en-au.js":8348,"./en-ca":7925,"./en-ca.js":7925,"./en-gb":2243,"./en-gb.js":2243,"./en-ie":6436,"./en-ie.js":6436,"./en-il":7207,"./en-il.js":7207,"./en-in":4175,"./en-in.js":4175,"./en-nz":6319,"./en-nz.js":6319,"./en-sg":1662,"./en-sg.js":1662,"./eo":2915,"./eo.js":2915,"./es":5655,"./es-do":5251,"./es-do.js":5251,"./es-mx":6112,"./es-mx.js":6112,"./es-us":1146,"./es-us.js":1146,"./es.js":5655,"./et":5603,"./et.js":5603,"./eu":7763,"./eu.js":7763,"./fa":6959,"./fa.js":6959,"./fi":1897,"./fi.js":1897,"./fil":2549,"./fil.js":2549,"./fo":4694,"./fo.js":4694,"./fr":4470,"./fr-ca":3049,"./fr-ca.js":3049,"./fr-ch":2330,"./fr-ch.js":2330,"./fr.js":4470,"./fy":5044,"./fy.js":5044,"./ga":9295,"./ga.js":9295,"./gd":2101,"./gd.js":2101,"./gl":8794,"./gl.js":8794,"./gom-deva":7884,"./gom-deva.js":7884,"./gom-latn":3168,"./gom-latn.js":3168,"./gu":5349,"./gu.js":5349,"./he":4206,"./he.js":4206,"./hi":94,"./hi.js":94,"./hr":316,"./hr.js":316,"./hu":2138,"./hu.js":2138,"./hy-am":1423,"./hy-am.js":1423,"./id":9218,"./id.js":9218,"./is":135,"./is.js":135,"./it":626,"./it-ch":150,"./it-ch.js":150,"./it.js":626,"./ja":9183,"./ja.js":9183,"./jv":4286,"./jv.js":4286,"./ka":2105,"./ka.js":2105,"./kk":7772,"./kk.js":7772,"./km":8758,"./km.js":8758,"./kn":9282,"./kn.js":9282,"./ko":3730,"./ko.js":3730,"./ku":1408,"./ku.js":1408,"./ky":3291,"./ky.js":3291,"./lb":6841,"./lb.js":6841,"./lo":5466,"./lo.js":5466,"./lt":7010,"./lt.js":7010,"./lv":7595,"./lv.js":7595,"./me":9861,"./me.js":9861,"./mi":5493,"./mi.js":5493,"./mk":5966,"./mk.js":5966,"./ml":7341,"./ml.js":7341,"./mn":5115,"./mn.js":5115,"./mr":370,"./mr.js":370,"./ms":9847,"./ms-my":1237,"./ms-my.js":1237,"./ms.js":9847,"./mt":2126,"./mt.js":2126,"./my":6165,"./my.js":6165,"./nb":4924,"./nb.js":4924,"./ne":6744,"./ne.js":6744,"./nl":3901,"./nl-be":9814,"./nl-be.js":9814,"./nl.js":3901,"./nn":3877,"./nn.js":3877,"./oc-lnc":2135,"./oc-lnc.js":2135,"./pa-in":5858,"./pa-in.js":5858,"./pl":4495,"./pl.js":4495,"./pt":9520,"./pt-br":7971,"./pt-br.js":7971,"./pt.js":9520,"./ro":6459,"./ro.js":6459,"./ru":1793,"./ru.js":1793,"./sd":950,"./sd.js":950,"./se":490,"./se.js":490,"./si":124,"./si.js":124,"./sk":4249,"./sk.js":4249,"./sl":4985,"./sl.js":4985,"./sq":1104,"./sq.js":1104,"./sr":9131,"./sr-cyrl":9915,"./sr-cyrl.js":9915,"./sr.js":9131,"./ss":5893,"./ss.js":5893,"./sv":8760,"./sv.js":8760,"./sw":1172,"./sw.js":1172,"./ta":7333,"./ta.js":7333,"./te":3110,"./te.js":3110,"./tet":2095,"./tet.js":2095,"./tg":7321,"./tg.js":7321,"./th":9041,"./th.js":9041,"./tk":9005,"./tk.js":9005,"./tl-ph":5768,"./tl-ph.js":5768,"./tlh":9444,"./tlh.js":9444,"./tr":2397,"./tr.js":2397,"./tzl":8254,"./tzl.js":8254,"./tzm":1106,"./tzm-latn":699,"./tzm-latn.js":699,"./tzm.js":1106,"./ug-cn":9288,"./ug-cn.js":9288,"./uk":7691,"./uk.js":7691,"./ur":3795,"./ur.js":3795,"./uz":6791,"./uz-latn":588,"./uz-latn.js":588,"./uz.js":6791,"./vi":5666,"./vi.js":5666,"./x-pseudo":4378,"./x-pseudo.js":4378,"./yo":5805,"./yo.js":5805,"./zh-cn":3839,"./zh-cn.js":3839,"./zh-hk":5726,"./zh-hk.js":5726,"./zh-mo":9807,"./zh-mo.js":9807,"./zh-tw":4152,"./zh-tw.js":4152};function a(e){var t=i(e);return n(t)}function i(e){if(!n.o(s,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return s[e]}a.keys=function(){return Object.keys(s)},a.resolve=i,e.exports=a,a.id=6700}},n={};function s(e){var a=n[e];if(void 0!==a)return a.exports;var i=n[e]={id:e,loaded:!1,exports:{}};return t[e].call(i.exports,i,i.exports,s),i.loaded=!0,i.exports}s.m=t,e=[],s.O=(t,n,a,i)=>{if(!n){var r=1/0;for(l=0;l<e.length;l++){for(var[n,a,i]=e[l],o=!0,d=0;d<n.length;d++)(!1&i||r>=i)&&Object.keys(s.O).every((e=>s.O[e](n[d])))?n.splice(d--,1):(o=!1,i<r&&(r=i));if(o){e.splice(l--,1);var c=a();void 0!==c&&(t=c)}}return t}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[n,a,i]},s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.nmd=e=>(e.paths=[],e.children||(e.children=[]),e),(()=>{var e={143:0};s.O.j=t=>0===e[t];var t=(t,n)=>{var a,i,[r,o,d]=n,c=0;if(r.some((t=>0!==e[t]))){for(a in o)s.o(o,a)&&(s.m[a]=o[a]);if(d)var l=d(s)}for(t&&t(n);c<r.length;c++)i=r[c],s.o(e,i)&&e[i]&&e[i][0](),e[r[c]]=0;return s.O(l)},n=self.webpackChunktemplate_feo_react_babel=self.webpackChunktemplate_feo_react_babel||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var a=s.O(void 0,[736],(()=>s(9959)));a=s.O(a)})();
//# sourceMappingURL=app.bundle.js.map