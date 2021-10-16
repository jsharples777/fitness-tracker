/** @jsx jsxCreateElement */
/*** @jsxFrag jsxCreateFragment */

import {jsxCreateElement,jsxCreateFragment} from "./JSXParser";


// @ts-ignore
export function Alert(props) {
    return (
        <div className="modal d-none" tabIndex={1} role="dialog" id="alert">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="alert-title">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                                id="alert-close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p id="alert-content">Modal body text goes here.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" id="alert-confirm">Confirm</button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal"
                                id="alert-cancel">Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}