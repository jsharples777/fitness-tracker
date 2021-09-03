class BrowserUtil {
    constructor() {
    }

    scrollSmoothToId(elementId: string): void {
        const element: HTMLElement | null = document.getElementById(elementId);
        if (element !== null) {
            element.scrollIntoView({
                block: 'start',
                behavior: 'smooth',
            });
        }
    }

    scrollToBottomNow(element: HTMLElement): void {
        if (element) {
            element.scrollTop = element.scrollHeight - element.clientHeight + 100;
        }
    }

    scrollToBottomSmooth(element: HTMLElement): void {
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
            });
            element.scrollTop = element.scrollHeight - element.clientHeight + 100;
        }
    }

    scrollSmoothTo(element: HTMLElement): void {
        element.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
        });
    }

    scrollTo(element: HTMLElement): void {
        element.scrollIntoView({
            block: 'start',
        });
    }

    removeAllChildren(element: HTMLElement): void {
        if (element && element.firstChild) {
            while (element.firstChild) {
                const lastChild: ChildNode | null = element.lastChild;
                if (lastChild) element.removeChild(lastChild);
            }
        }
    }

    addRemoveClasses(element: HTMLElement, classesText: string, isAdding: boolean = true): void {
        const classes = classesText.split(' ');
        classes.forEach((classValue) => {
            if (classValue.trim().length > 0) {
                if (isAdding) {
                    element.classList.add(classValue);
                } else {
                    element.classList.remove(classValue);
                }
            }
        });
    }

    addAttributes(element: HTMLElement, attributes: any[] | undefined) {
        if (attributes) {
            attributes.forEach((attribute: any) => {
                element.setAttribute(attribute[0], attribute[1]);
            });
        }
    }

}

const browserUtil = new BrowserUtil();

export default browserUtil;
