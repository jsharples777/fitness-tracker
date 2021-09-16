import SidebarViewContainer from '../../ui-framework/container/SidebarViewContainer';
import {SidebarLocation, SidebarPrefs} from "../../ui-framework/ConfigurationTypes";

export default class WorkoutSummarySidebar extends SidebarViewContainer {
    static SidebarPrefs:SidebarPrefs = {
        id:'workoutSummarySidebar',
        expandedSize:'50%',
        location: SidebarLocation.bottom
    }

    static SidebarContainers = {
        container: 'workoutSummary',
    }


    constructor() {
        super(WorkoutSummarySidebar.SidebarPrefs);
    }
}
