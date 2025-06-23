import { CanvasItem } from './CanvasItem';

export class ShuttleItem extends CanvasItem {
    static ISC_CLASS_NAME = 'ShuttleItem';
    
    static IS_CLASS = true;
static PROPERTY_TYPES = {"width":["int","String"],"height":["int","String"],"optionDataSource":{"className":"DataSource"},"shuttleFields":{"className":"ListGridField","isArray":true}};

}
