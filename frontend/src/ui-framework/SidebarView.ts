import AbstractView from './AbstractView';
import {StateManager} from "../state/StateManager";

abstract class SidebarView extends AbstractView {
    protected constructor(applicationView: any, htmlDocument: HTMLDocument, uiConfig: any, uiPrefs: any, stateManager: StateManager) {
        super(applicationView, htmlDocument, uiConfig, uiPrefs, stateManager);
        // event handlers
        this.eventHide = this.eventHide.bind(this);
        this.eventShow = this.eventShow.bind(this);
    }

    onDocumentLoaded() { // this should be called once at startup
        // hide the side bar panel
        this.eventHide(null);

        // add the event listener for the close button
        const sidePanelEl = this.document.getElementById(this.uiConfig.dom.sideBarId);
        if (sidePanelEl === null) return;

        const closeButtonEl = sidePanelEl.querySelector('.close');
        if (closeButtonEl) {
            closeButtonEl.addEventListener('click', this.eventHide);
        }
    }

    eventHide(event: Event | null) {
        if (event) event.preventDefault();
        this.showHide('0%');
    }

    eventShow(event: Event | null) {//414,768,1024
        let size = this.uiPrefs.view.expandedSize;
        if (window.innerWidth < 769) {
            size = '50%';
        }
        if (window.innerWidth < 415) {
            size = '100%';
        }
        this.showHide(size);
    }

    private showHide(newStyleValue: string): void {
        const sidePanelEl = this.document.getElementById(this.uiConfig.dom.sideBarId);
        if (sidePanelEl === null) return;

        switch (this.uiPrefs.view.location) {
            case 'left': {
                sidePanelEl.style.width = newStyleValue;
                break;
            }
            case 'right': {
                sidePanelEl.style.width = newStyleValue;
                break;
            }
            case 'bottom': {
                sidePanelEl.style.height = newStyleValue;
                break;
            }
            case 'top': {
                sidePanelEl.style.height = newStyleValue;
                break;
            }
        }
    }
}

export default SidebarView;
