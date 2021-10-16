import {SidebarLocation, SidebarPrefs, SidebarViewContainer} from "ui-framework-jps";


export default class CurrentWorkoutSidebar extends SidebarViewContainer {
    static sidebarPrefs:SidebarPrefs = {
        id:'currentWorkoutSidebar',
        expandedSize:'50%',
        location: SidebarLocation.right
    }

    static SidebarContainers = {
        list: 'exercises',
        detail: 'workoutDetail'
    }


    constructor() {
        super(CurrentWorkoutSidebar.sidebarPrefs);
    }
}
