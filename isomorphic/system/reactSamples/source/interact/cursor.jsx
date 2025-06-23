/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, IButton, Label } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onDisableSaveClick = function () {
    if (this.title == 'Disable Save') {
        this.setTitle('Enable Save');
        saveButton.disable();
    } else {
        this.setTitle('Disable Save');
        saveButton.enable();
    }
};

const DragLabel = SC.defineClass('DragLabel', Label);
isc.DragLabel.addProperties({
    align: 'center',
    padding: 4,
    showEdges: true,
    minWidth: 70,
    minHeight: 70,
    maxWidth: 300,
    maxHeight: 200,
    keepInParentRect: true,
    canDragReposition: true,
    dragAppearance: 'target'
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <IButton title="Save" ID="saveButton"/>

        <IButton title="Disable Save" left="150" click={onDisableSaveClick}/>

        <DragLabel contents="Resize from any side" left="80" top="80" canDragResize="true" edgeMarginSize="10"/>

        <DragLabel contents="Resize from bottom or right" left="280" top="80" canDragResize="true" edgeMarginSize="10">
            <resizeFrom>
                <value>B</value>
                <value>R</value>
                <value>BR</value>
            </resizeFrom>
        </DragLabel>
    </>,
    document.getElementById(target)
);
