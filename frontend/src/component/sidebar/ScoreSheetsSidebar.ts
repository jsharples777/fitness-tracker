import SidebarViewContainer from '../../ui-framework/SidebarViewContainer';
import {SidebarLocation, SidebarPrefs} from "../../ui-framework/ConfigurationTypes";

class ScoreSheetsSidebar extends SidebarViewContainer {
    private static SidebarPrefs:SidebarPrefs = {
        id:'chatSideBar',
        expandedSize:'40%',
        location: SidebarLocation.right
    }

    public static scoreSheets = 'scoreSheets';

    constructor() {
        super(ScoreSheetsSidebar.SidebarPrefs);
    }
}

export default ScoreSheetsSidebar;
