import AbstractStatefulCollectionView from "../../ui-framework/view/implementation/AbstractStatefulCollectionView";
import {KeyType, CollectionViewDOMConfig} from "../../ui-framework/ConfigurationTypes";
import {STATE_NAMES, VIEW_NAME} from "../../AppTypes";
import {ListViewRenderer} from "../../ui-framework/view/delegate/ListViewRenderer";
import {CollectionView} from "../../ui-framework/view/interface/CollectionView";
import Controller from "../../Controller";
import {isSameMongo} from "../../util/EqualityFunctions";

export class ExerciseTypesView extends AbstractStatefulCollectionView {

    private static DOMConfig: CollectionViewDOMConfig = {
        resultsContainerId: 'exerciseTypes',
        resultsElementType: 'a',
        resultsElementAttributes: [{name: 'href', value: '#'}],
        resultsClasses: 'list-group-item my-list-item truncate-notification list-group-item-action',
        keyId: '_id',
        keyType: KeyType.string,
        dataSourceId: VIEW_NAME.exerciseTypes,
        modifiers: {
            normal: '',
            inactive: 'list-group-item-dark',
            active: 'list-group-item-primary',
            warning: ''
        },
        detail: {
            containerClasses: 'd-flex w-100 justify-content-between',
            textElementType: 'span',
            textElementClasses: 'mb-1',
            select: true,
            delete: {
                buttonClasses: 'btn bg-danger text-white btn-circle btn-sm',
                iconClasses: 'text-black fas fa-sign-out-alt',
            }
        },
    };

    constructor() {
        super(ExerciseTypesView.DOMConfig,Controller.getInstance().getStateManager(), STATE_NAMES.exerciseTypes);

        this.renderer = new ListViewRenderer(this,this);
    }

    compareItemsForEquality(item1:any, item2:any) :boolean {
        return isSameMongo(item1,item2);
    }

    onDocumentLoaded() {
        super.onDocumentLoaded();
    }

    getIdForItemInNamedCollection(name: string, item: any) {
        return item._id;
    }

    getDisplayValueForItemInNamedCollection(name: string, item: any) {
        return item.name;
    }

}

