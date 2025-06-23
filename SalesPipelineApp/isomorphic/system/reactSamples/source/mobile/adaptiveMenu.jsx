/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, AdaptiveMenu, Button, HLayout, HStack, IButton, Label, MenuItem, ToolStrip } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onButtonRefreshTitle = function (longName) {
    nameLabel.refreshTitle(longName);
    this.setTitle(longName ? 'Shorter Name' : 'Longer Name');
};
let onButtonClick = function () {
    this.longTitle = !this.longTitle;
    this.refreshTitle(this.longTitle);
};
let onButtonInitWidget = function () {
    this.Super('initWidget', arguments);
    this.refreshTitle();
};
let onNameLabelRefreshTitle = function (longName) {
    var name = longName ? 'Alejandro O\'Reilly' : 'Lucy Lu';
    this.setContents('<b>Candidate: ' + name + '</b>');
};
let onContactClick = function(target,item,menu,colNum) {return isc.say(this.title)};
let onHireNowClick = function(target,item,menu,colNum) {return isc.say(this.title)};
let onViewRésuméClick = function(target,item,menu,colNum) {return isc.say(this.title)};
let onCutClick = function() {return isc.say(this.title)};
let onCopyClick = function() {return isc.say(this.title)};
let onPasteClick = function() {return isc.say(this.title)};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Button top="50" refreshTitle={onButtonRefreshTitle} click={onButtonClick} initWidget={onButtonInitWidget}/>

        <HLayout hPolicy="none" width="100%" height="40">
            <members>
                <ToolStrip layoutLeftMargin="10" membersMargin="5" ID="toolStrip" width="375" height="40" showResizeBar="true">
                    <members>
                        <Label wrap="false" title="nameLabel" ID="nameLabel" width="1" refreshTitle={onNameLabelRefreshTitle}/>
                        <AdaptiveMenu defaultLayoutAlign="center" ID="adaptiveMenu" height="30">
                            <items>
                                <MenuItem title="Contact" click={onContactClick}/>
                                <MenuItem title="Hire Now" click={onHireNowClick}/>
                                <MenuItem title="View Résumé" click={onViewRésuméClick}/>
                                <MenuItem title="Edit" showRollOver="false">
                                    <embeddedComponent width="190" height="100%" snapTo="TR" membersMargin="3" layoutMarginBottom="5" defaultLayoutAlign="center">
                                        <IButton>
                                        	<_defaultedAutoDraw>true</_defaultedAutoDraw>
                                        	<title>Cut</title>
                                        	<autoFit>true</autoFit>
                                        	
                                        	<_constructor>IButton</_constructor>
                                        </IButton>
                                        <IButton>
                                        	<_defaultedAutoDraw>true</_defaultedAutoDraw>
                                        	<title>Copy</title>
                                        	<autoFit>true</autoFit>
                                        	
                                        	<_constructor>IButton</_constructor>
                                        </IButton>
                                        <IButton>
                                        	<_defaultedAutoDraw>true</_defaultedAutoDraw>
                                        	<title>Paste</title>
                                        	<autoFit>true</autoFit>
                                        	
                                        	<_constructor>IButton</_constructor>
                                        </IButton>
                                    </embeddedComponent>
                                    <embeddedComponentFields>
                                        <value>key</value>
                                    </embeddedComponentFields>
                                </MenuItem>
                            </items>
                            <menuProperties>
                            	<width>350</width>
                            </menuProperties>
                        </AdaptiveMenu>
                    </members>
                </ToolStrip>
            </members>
        </HLayout>
    </>,
    document.getElementById(target)
);
