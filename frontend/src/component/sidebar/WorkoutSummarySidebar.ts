import {SidebarLocation, SidebarPrefs} from "../../framework/ui/ConfigurationTypes";
import {SidebarViewContainer} from "../../framework/ui/container/SidebarViewContainer";


export default class WorkoutSummarySidebar extends SidebarViewContainer {
    static SidebarPrefs:SidebarPrefs = {
        id:'workoutSummarySidebar',
        expandedSize:'100%',
        location: SidebarLocation.bottom
    }

    static SidebarContainers = {
        container: 'workoutSummary',
    }


    constructor() {
        super(WorkoutSummarySidebar.SidebarPrefs);
    }
}
