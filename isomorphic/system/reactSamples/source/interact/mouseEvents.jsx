/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Label } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onMouserMouseWheel = function () {
    var wheelDelta = isc.EventHandler.getWheelDelta();
    var newSize = this.getWidth() + wheelDelta * this.zoomMultiplier;
    if (newSize < this.minSize)
        newSize = this.minSize;
    else if (newSize > this.maxSize)
        newSize = this.maxSize;
    this.setWidth(newSize);
    this.setHeight(newSize);
    eventTracker.setLastEvent('mouseWheel');
};
let onMouserMouseStillDown = function () {
    if (this.contains(isc.EventHandler.getTarget(), true)) {
        var opacity = this.opacity == null ? 100 : this.opacity;
        this.setOpacity(Math.max(0, opacity - 5));
        eventTracker.setLastEvent('mouseStillDown');
    }
};
let onMouserMouseUp = function () {
    this.setOpacity(100);
    eventTracker.setLastEvent('mouseUp');
};
let onMouserMouseMove = function () {
    var xScale = this.getOffsetX() / this.getWidth();
    var yScale = this.getOffsetY() / this.getHeight();
    this.setBackgroundColor('rgb(0,' + Math.round(255 * xScale) + ',' + Math.round(255 * yScale) + ')');
    eventTracker.setLastEvent('mouseMove');
};
let onMouserMouseOut = function () {
    this.setBackgroundColor('lightblue');
    this.setOpacity(100);
    eventTracker.setLastEvent('mouseOut');
};
let onMouserShowContextMenu = function () {
    return false;
};
let onEventTrackerSetLastEvent = function (event) {
    var localX = mouser.getOffsetX(), localY = mouser.getOffsetY();
    this.setContents('<nobr>Last event: <b>' + event + '</b> (' + localX + ', ' + localY + ')</nobr>');
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Label contents="&lt;b&gt;Mouse Me&lt;/b&gt;" align="center" title="mouser" ID="mouser" width="200" height="200" top="40" styleName="blackText" backgroundColor="lightblue" overflow="hidden" showEdges="true" useOpacityFilter="true" minSize="40" maxSize="400" zoomMultiplier="15" mouseWheel={onMouserMouseWheel} mouseStillDown={onMouserMouseStillDown} mouseUp={onMouserMouseUp} mouseMove={onMouserMouseMove} mouseOut={onMouserMouseOut} showContextMenu={onMouserShowContextMenu}/>

        <Label contents="&lt;nobr&gt;Last event: (mouse over the canvas below...)&lt;/nobr&gt;" title="eventTracker" ID="eventTracker" height="20" setLastEvent={onEventTrackerSetLastEvent}/>
    </>,
    document.getElementById(target)
);
