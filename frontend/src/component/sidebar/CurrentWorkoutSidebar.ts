import {SidebarViewContainer} from "../../framework/ui/container/SidebarViewContainer";
import {SidebarLocation, SidebarPrefs} from "../../framework/ui/ConfigurationTypes";


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
