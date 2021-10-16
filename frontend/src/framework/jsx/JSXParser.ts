export function jsxCreateElement(tag: any, props: any, ...children: any) {
    if (typeof tag === "function") return tag(props, ...children);
    const element = document.createElement(tag);

    Object.entries(props || {}).forEach(([name, value]) => {
        if (name.startsWith("on") && name.toLowerCase() in window)
            element.addEventListener(name.toLowerCase().substr(2), value);
        else {
            if (name === 'className') name = 'class';
            // @ts-ignore
            element.setAttribute(name, value.toString());
        }
    });

    children.forEach((child: any) => {
        jsxAppendChild(element, child);
    });

    return element;
}

function jsxAppendChild(parent: any, child: any) {
    if (Array.isArray(child))
        child.forEach(nestedChild => jsxAppendChild(parent, nestedChild));
    else
        parent.appendChild(child.nodeType ? child : document.createTextNode(child));
}

export function jsxCreateFragment(props: any, ...children: any) {
    return children;
}


