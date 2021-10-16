import {SidebarLocation, SidebarPrefs, SidebarViewContainer} from "ui-framework-jps";

export default class ExerciseTypesSidebar extends SidebarViewContainer {
    static SidebarPrefs:SidebarPrefs = {
        id:'exerciseTypesSidebar',
        expandedSize:'50%',
        location: SidebarLocation.left
    }

    static SidebarContainers = {
        container: 'exerciseTypesContainer',
    }


    constructor() {
        super(ExerciseTypesSidebar.SidebarPrefs);
    }
}
