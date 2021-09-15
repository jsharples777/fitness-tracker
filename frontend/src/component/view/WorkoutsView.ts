import AbstractStatefulCollectionView from "../../ui-framework/view/implementation/AbstractStatefulCollectionView";
import {
    CarouselDOMConfig,
    KeyType, Modifier,
    RowPosition
} from "../../ui-framework/ConfigurationTypes";
import {DRAGGABLE, STATE_NAMES, VIEW_NAME} from "../../AppTypes";
import Controller from "../../Controller";
import {isSameMongo} from "../../util/EqualityFunctions";
import {CollectionViewListener} from "../../ui-framework/view/interface/CollectionViewListener";
import {View} from "../../ui-framework/view/interface/View";

import debug from 'debug';
import {CarouselViewRenderer} from "../../ui-framework/view/renderer/CarouselViewRenderer";
import moment from "moment";

const logger = debug('workouts-view');



export class WorkoutsView extends AbstractStatefulCollectionView implements CollectionViewListener {

    private static DOMConfig: CarouselDOMConfig = {
        itemsPerRow: 4,
        rowContainer: {
            elementClasses: "carousel-item",
            elementType: 'div',
        },
        activeRow: {
            elementType: '',
            elementClasses: 'active',
        },
        activeRowPosition:RowPosition.last,
        row: {
            elementClasses: "row",
            elementType: 'div',
        },
        multipleItemsPerRowContainer: {
            elementType: 'div',
            elementClasses: 'col-md-3 mb-2',
        },
        actionContainer: {
            elementType:'div',
            elementClasses:'card-footer bg-light'
        },
        collectionConfig: {
            viewConfig: {
                resultsContainerId: 'workouts',
                dataSourceId: VIEW_NAME.workouts,
                drop: {
                    acceptTypes: [DRAGGABLE.typeExerciseType],
                    acceptFrom: [DRAGGABLE.fromExerciseTypes]
                }
            },
            resultsElementType: 'card',
            resultsClasses: '',
            keyId: '_id',
            keyType: KeyType.string,
            modifiers: {
                normal:'',
                inactive:'',
                active:'',
                warning:'',
            },
            detail: {
                containerClasses: 'card-body',
                textElementType: 'div',
                textElementClasses: '',
                select: true,
                background: {
                    elementType:'canvas',
                    elementClasses:'',
                },
            },
            extraActions: [
                {
                    name: 'template',
                    buttonText: '',
                    buttonClasses: 'btn btn-primary',
                    iconClasses: 'fas fa-copy'

                }
            ],

        },


    }


    constructor() {
        super(WorkoutsView.DOMConfig.collectionConfig, Controller.getInstance().getStateManager(), STATE_NAMES.workouts);
        this.renderer = new CarouselViewRenderer(this, this,WorkoutsView.DOMConfig);
    }

    canDeleteItem(view: View, selectedItem: any): boolean {
        return true;
    }

    compareItemsForEquality(item1: any, item2: any): boolean {
        return isSameMongo(item1, item2);
    }

    getIdForItemInNamedCollection(name: string, item: any) {
        return item._id;
    }

    getDisplayValueForItemInNamedCollection(name: string, item: any) {
        let buffer = '';
        buffer += `<h5 class="card-title">${moment(item.createdOn, 'YYYYMMDDHHmmss').format('ddd, DD/MM/YYYY HH:mm')}</h5>`;
        buffer += `<p class="card-text">Calculate total weight and total Distance</p>`;
        return buffer;
    }

    hasPermissionToDeleteItemInNamedCollection(name: string, item: any): boolean {
        return true;
    }

    getModifierForItemInNamedCollection(name: string, item: any): Modifier {
        let result = Modifier.inactive;
        if (item.completed) {
            if (item.completed !== true) {
                result = Modifier.active;
            }
        }
        return result;
    }


}

