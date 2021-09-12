import AbstractStatefulCollectionView from "../../ui-framework/view/implementation/AbstractStatefulCollectionView";
import {CollectionViewDOMConfig, KeyType, Modifier} from "../../ui-framework/ConfigurationTypes";
import {DRAGGABLE, STATE_NAMES, VIEW_NAME} from "../../AppTypes";
import {ListViewRenderer} from "../../ui-framework/view/delegate/ListViewRenderer";
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
            inactive: 'list-group-item-light',
            active: 'list-group-item-primary',
            warning: ''
        },
        icons: {
            normal: 'fas fa-dumbbell',
            inactive: '',
            active: 'fas fa-running',
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
            },
            drag: {
                type: DRAGGABLE.typeExerciseType,
                from: DRAGGABLE.fromExerciseTypes
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

    getSecondaryModifierForItemInNamedCollection(name: string, item: any): Modifier {
        if (item.type) {
            if (item.type === 'cardio') {
                return Modifier.active;
            }
            else {
                return Modifier.normal;
            }
        }
        return super.getSecondaryModifierForItemInNamedCollection(name,item);

    }

}

