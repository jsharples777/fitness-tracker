import {SidebarLocation, SidebarPrefs, SidebarViewContainer} from "ui-framework-jps";


export default class WorkoutSummarySidebar extends SidebarViewContainer {
    static SidebarPrefs: SidebarPrefs = {
        id: 'workoutSummarySidebar',
        expandedSize: '100%',
        location: SidebarLocation.bottom
    }

    static SidebarContainers = {
        container: 'workoutSummary',
    }


    constructor() {
        super(WorkoutSummarySidebar.SidebarPrefs);
    }
}
