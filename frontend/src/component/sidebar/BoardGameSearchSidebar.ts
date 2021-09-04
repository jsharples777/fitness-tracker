import SidebarViewContainer from '../../ui-framework/SidebarViewContainer';
import {SidebarLocation, SidebarPrefs} from "../../ui-framework/ConfigurationTypes";

class BoardGameSearchSidebar extends SidebarViewContainer {
    private static BGGSEARCH_SidebarPrefs:SidebarPrefs = {
        id:'boardGameSearchSidebar',
        expandedSize:'35%',
        location: SidebarLocation.left
    }

    public static bggSearchResults = 'bggSearchResults';

    constructor() {
        super(BoardGameSearchSidebar.BGGSEARCH_SidebarPrefs);
    }
}

export default BoardGameSearchSidebar;
