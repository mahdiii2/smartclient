/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, FlowLayout, IButton, NavigationBar, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onFaBaiClick = function () {
    navBar.setTitle(this.getTitle());
};
let onAbeJacobsClick = function () {
    navBar.setTitle(this.getTitle());
};
let onIzabellaChernyakF_Click = function () {
    navBar.setTitle(this.getTitle());
};
let onChristineBergeronFewellClick = function () {
    navBar.setTitle(this.getTitle());
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout width="100%">
        <members>
            <NavigationBar ID="navBar" width="296" autoDraw="false" title="Fa Bai" leftButtonTitle="Employees" rightButtonTitle="Action" showRightButton="true"/>
            <FlowLayout tileMargin="5" ID="flowLayout" width="100%" overflow="visible" autoDraw="false">
                <tiles>
                    <IButton title="Fa Bai" width="150" click={onFaBaiClick}/>
                    <IButton title="Abe Jacobs" width="150" click={onAbeJacobsClick}/>
                    <IButton title="Izabella Chernyak F." width="150" click={onIzabellaChernyakF_Click}/>
                    <IButton autoFit="true" title="Christine Bergeron Fewell" click={onChristineBergeronFewellClick}/>
                </tiles>
            </FlowLayout>
        </members>
    </VLayout>,
    document.getElementById(target)
);
