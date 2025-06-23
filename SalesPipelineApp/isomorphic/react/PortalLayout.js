import { Layout } from './Layout';

export class PortalLayout extends Layout {
    static ISC_CLASS_NAME = 'PortalLayout';
    
    static IS_CLASS = true;
static PROPERTY_TYPES = {"numColumns":"int","canAddColumns":"Boolean","canResizePortlets":"Boolean","preventRowUnderflow":"Boolean","portlets":{"className":"Portlet","isArray":true},"canShrinkColumnWidths":"Boolean","canResizeColumns":"Boolean","portletDropTypes":{"className":"String","isArray":true},"rowProperties":{"className":"Layout","isProperties":true},"portletHSpacing":"Integer","preventUnderflow":"Boolean","portletVSpacing":"Integer","stretchColumnWidthsProportionally":"Boolean","showColumnMenus":"Boolean","canResizeRows":"Boolean","preventColumnUnderflow":"Boolean","portletHDropOffset":"Integer","canAcceptDrop":"Boolean","dropTypes":{"className":"String","isArray":true},"removeEmptyColumns":"Boolean","rowLayoutProperties":{"className":"Layout","isProperties":true},"columnSpacing":"Integer","canStretchColumnWidths":"Boolean","portletProperties":{"className":"Portlet","isProperties":true},"columnProperties":{"className":"Layout","isProperties":true}};

}
