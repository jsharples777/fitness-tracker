import {CollectionViewListenerForwarder} from "./CollectionViewListenerForwarder";
import {CollectionView} from "../interface/CollectionView";
import {CollectionViewEventHandlerDelegate, ItemContext} from "./CollectionViewEventHandlerDelegate";
import {ContextDetails, ContextualInformationHelper} from "../../context/ContextualInformationHelper";


export class CollectionViewEventHandlerDelegateUsingContext extends CollectionViewEventHandlerDelegate {

    constructor(view: CollectionView, forwarder: CollectionViewListenerForwarder) {
        super(view, forwarder);
    }

    protected getItemContext(event: Event): ItemContext {

        const contextDetail: ContextDetails | null = ContextualInformationHelper.getInstance().findContextFromEvent(event);

        let context: ItemContext;

        if (contextDetail) {
            context = {
                itemId: contextDetail.identifier,
                dataSource: contextDetail.source
            }
        } else {
            context = {
                itemId: '',
                dataSource: this.view.getName(),
            }
        }


        return context;
    }

}