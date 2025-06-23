/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Label } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onTheLabelKeyPress = function () {
    var left = this.getLeft();
    var top = this.getTop();
    switch (isc.EventHandler.getKey()) {
    case 'Arrow_Left':
        left -= 10;
        break;
    case 'Arrow_Right':
        left += 10;
        break;
    case 'Arrow_Up':
        top -= 10;
        break;
    case 'Arrow_Down':
        top += 10;
        break;
    default:
        return;
    }
    if (left < 0)
        left = 0;
    if (top < 0)
        top = 0;
    this.setLeft(left);
    this.setTop(top);
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <Label contents="Click me, then move me with arrow keys." padding="4" title="theLabel" ID="theLabel" showEdges="true" canFocus="true" keyPress={onTheLabelKeyPress}/>,
    document.getElementById(target)
);
