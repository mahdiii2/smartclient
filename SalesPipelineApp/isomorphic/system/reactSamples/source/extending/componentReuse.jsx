/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, DynamicForm, Label, TextItem, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onSetTitleClick = function(form,item) {return dynamicWindow.setHeaderTitle(setTitleForm.getValue('title'))};

const SimplePortlet = SC.defineClass('SimplePortlet', VLayout);
isc.SimplePortlet.addProperties({
    defaultWidth: 250,
    defaultHeight: 200,
    canDragResize: true,
    minWidth: 150,
    minHeight: 100,
    headerMargin: 2,
    headerHeight: 23,
    showEdges: true,
    styleName: 'portletBackground',
    headerStyleName: 'portletHeader',
    titleStyleName: 'portletTitle',
    initWidget: function () {
        this.Super('initWidget', arguments);
        this.headerLabel = isc.Label.create({
            contents: this.title,
            wrap: false,
            styleName: this.titleStyleName,
            overflow: 'hidden',
            width: '*',
            canDragReposition: true,
            dragTarget: this
        });
        this.header = isc.HLayout.create({
            height: this.headerHeight,
            layoutMargin: this.headerMargin,
            styleName: this.headerStyleName,
            members: [
                this.headerLabel,
                isc.ImgButton.create({
                    src: '[SKIN]actions/close.png',
                    width: 18,
                    height: 18,
                    layoutAlign: 'center',
                    portlet: this,
                    click: 'this.portlet.hide()'
                })
            ]
        });
        this.addMember(this.header);
        this.addMember(isc.HTMLFlow.create({
            contents: this.portletContents,
            padding: 5,
            height: '*'
        }, this.contentProperties));
        if (this.customFooter)
            this.addMembers(this.customFooter);
    },
    setHeaderTitle: function (newTitle) {
        this.headerLabel.setContents(newTitle);
    }
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <SimplePortlet title="Creating new components" portletContents={'This portlet is an instance of the \'SimplePortlet\'' + ' custom component created in this example<P>' + 'To creating new, reusable SmartClient components,' + ' simply construct subcomponents at initialization.'}/>

        <SimplePortlet height="300" left="300" title="Configurable components" portletContents={'This is also an instance of the \'SimplePortlet\'' + ' with customized appearance<P>' + 'To make components configurable, just pass ' + 'properties through to subcomponents.'}>
            <contentProperties>
            	<padding>5</padding>
            	<backgroundColor>lightblue</backgroundColor>
            </contentProperties>
            <customFooter contents="Status: OK" padding="3" height="22" border="1px solid black" backgroundColor="#CCCCCC"/>
        </SimplePortlet>

        <SimplePortlet ID="dynamicWindow" top="350" title="Dynamic components" portletContents={'The form to the right will change the title of this ' + 'portlet by calling the custom method <code>setHeaderTitle()</code><P>' + 'To make components dynamic, create methods ' + 'that change properties on subcomponents.'}/>

        <DynamicForm ID="setTitleForm" left="260" top="350">
            <fields>
                <TextItem defaultValue="[Enter new title]" name="title" showTitle="false"/>
                <ButtonItem title="Set Title" click={onSetTitleClick}/>
            </fields>
        </DynamicForm>
    </>,
    document.getElementById(target)
);
