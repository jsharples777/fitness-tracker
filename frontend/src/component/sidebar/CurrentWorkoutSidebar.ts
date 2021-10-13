import {SidebarLocation, SidebarPrefs, SidebarViewContainer} from "ui-framework-jps";


export default class CurrentWorkoutSidebar extends SidebarViewContainer {
    static SidebarPrefs:SidebarPrefs = {
        id:'currentWorkoutSidebar',
        expandedSize:'50%',
        location: SidebarLocation.right
    }

    static SidebarContainers = {
        list: 'exercises',
        detail: 'workoutDetail'
    }


    constructor() {
        super(CurrentWorkoutSidebar.SidebarPrefs);
    }
}
