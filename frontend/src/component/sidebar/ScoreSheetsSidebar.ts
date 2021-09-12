import SidebarViewContainer from '../../ui-framework/container/SidebarViewContainer';
import {SidebarLocation, SidebarPrefs} from "../../ui-framework/ConfigurationTypes";

class ScoreSheetsSidebar extends SidebarViewContainer {
    private static SidebarPrefs:SidebarPrefs = {
        id:'scoreSheetSidebar',
        expandedSize:'40%',
        location: SidebarLocation.bottom
    }

    public static scoreSheets = 'scoreSheets';

    constructor() {
        super(ScoreSheetsSidebar.SidebarPrefs);
    }
}

export default ScoreSheetsSidebar;
