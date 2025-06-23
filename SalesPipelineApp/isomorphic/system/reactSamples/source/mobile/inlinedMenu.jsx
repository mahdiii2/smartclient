/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Button, HLayout, Label, Menu, MenuItem, ToolStrip } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onButtonRefreshTitle = function (longName) {
    variableName.refreshTitle(longName);
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
let onVariableNameRefreshTitle = function (longName) {
    var name = longName ? 'Alejandro O\'Reilly' : 'Lucy Lu';
    this.setContents('<b>Candidate: ' + name + '</b>');
};
let onContactClick = function(target,item,menu,colNum) {return isc.say(this.title)};
let onHireNowClick = function(target,item,menu,colNum) {return isc.say(this.title)};
let onViewRésuméClick = function(target,item,menu,colNum) {return isc.say(this.title)};

const InlinedMenu = SC.defineClass('InlinedMenu', HLayout);
isc.InlinedMenu.addProperties({
    overflow: 'hidden',
    canAdaptWidth: true,
    defaultLayoutAlign: 'center',
    height: 30,
    initWidget: function () {
        this.Super('initWidget', arguments);
        var menu = this.menu;
        menu._inlinedData = [];
        this.inlinedCount = 0;
        for (var i = 0; i < menu.getTotalRows(); i++) {
            var item = menu.getRecord(i);
            this.addMember(isc.ToolStripButton.create({
                contents: item.title,
                width: 1,
                wrap: false,
                visibility: 'hidden'
            }, item));
        }
        this.inlinedMax = this.members.length;
        this.menuButton = isc.ToolStripMenuButton.create({
            menu: menu,
            title: null,
            width: 1,
            overflow: 'visible',
            autoDraw: false
        });
        this.addMember(this.menuButton);
    },
    getNextInlinedItemWidth: function () {
        var item = this.members[this.inlinedCount];
        if (!item.isDrawn())
            item.draw();
        var isLast = this.inlinedCount == this.inlinedMax - 1;
        return item.getVisibleWidth() + (isLast ? -this.minimalWidth : 0);
    },
    addInlinedItem: function () {
        var menu = this.menu;
        menu._inlinedData.add(menu.data.removeAt(0));
        if (menu.getTotalRows() == 0)
            this.menuButton.hide();
        this.members[this.inlinedCount++].show();
    },
    removeInlinedItem: function () {
        var menu = this.menu;
        if (menu.getTotalRows() == 0)
            this.menuButton.show();
        menu.data.addAt(menu._inlinedData.pop(), 0);
        this.members[--this.inlinedCount].hide();
    },
    adaptWidthBy: function (pixelDifference, unadaptedWidth) {
        var items = this.inlinedItems;
        if (this.minimalWidth == null) {
            this.minimalWidth = this.menuButton.getVisibleWidth();
        }
        var expectedWidth = 0;
        for (var i = 0; i < this.members.length; i++) {
            var member = this.members[i];
            if (member.visibility == 'hidden')
                continue;
            expectedWidth += member.getVisibleWidth();
        }
        var desiredWidth = unadaptedWidth + pixelDifference;
        if (desiredWidth < expectedWidth) {
            while (this.inlinedCount > 0 && expectedWidth > desiredWidth) {
                this.removeInlinedItem();
                expectedWidth -= this.getNextInlinedItemWidth();
            }
        } else if (desiredWidth > expectedWidth) {
            var deltaX;
            while (this.inlinedCount < this.inlinedMax && expectedWidth + (deltaX = this.getNextInlinedItemWidth()) <= desiredWidth) {
                this.addInlinedItem();
                expectedWidth += deltaX;
            }
        }
        return expectedWidth - unadaptedWidth;
    }
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Button top="50" refreshTitle={onButtonRefreshTitle} click={onButtonClick} initWidget={onButtonInitWidget}/>

        <HLayout hPolicy="none" width="100%" height="40">
            <members>
                <ToolStrip layoutLeftMargin="10" membersMargin="5" ID="toolStrip" width="375" height="40" showResizeBar="true">
                    <members>
                        <Label wrap="false" title="variableName" ID="variableName" width="1" refreshTitle={onVariableNameRefreshTitle}/>
                        <InlinedMenu ID="inlinedMenu">
                            <menu ID="menu">
                                <data>
                                    <MenuItem title="Contact" click={onContactClick}/>
                                    <MenuItem title="Hire Now" click={onHireNowClick}/>
                                    <MenuItem title="View Résumé" click={onViewRésuméClick}/>
                                </data>
                            </menu>
                        </InlinedMenu>
                    </members>
                </ToolStrip>
            </members>
        </HLayout>
    </>,
    document.getElementById(target)
);
