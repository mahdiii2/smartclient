/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, NavigationBar } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onNavBarNavigationClick = function (direction) {
    if (direction == 'back') {
        if (this.leftButtonTitle == 'Inbox') {
            this.setRightButtonTitle('New');
            this.setViewState({
                leftButtonTitle: 'Folders',
                title: 'Inbox'
            }, 'back');
        } else if (this.leftButtonTitle == 'Folders') {
            this.setRightButtonTitle('Inbox');
            this.setViewState({
                leftButtonTitle: 'Exit',
                title: 'Folders'
            }, 'back');
        } else if (this.leftButtonTitle == 'Exit') {
            isc.say('Exiting');
        }
    } else {
        if (this.title == 'Inbox') {
            this.setRightButtonTitle('Done');
            this.setViewState({
                leftButtonTitle: this.title,
                title: 'New Message'
            }, 'forward');
        } else if (this.title == 'Folders') {
            this.setRightButtonTitle('New');
            this.setViewState({
                leftButtonTitle: 'Folders',
                title: 'Inbox'
            }, 'forward');
        } else if (this.title == 'New Message') {
            isc.say('Sending message');
            this.setRightButtonTitle('New');
            if (this.leftButtonTitle == 'Inbox') {
                this.setViewState({
                    leftButtonTitle: 'Folders',
                    title: 'Inbox'
                }, 'back');
            } else if (this.leftButtonTitle == 'Folders') {
                this.setViewState({
                    leftButtonTitle: 'Exit',
                    title: 'Folders'
                }, 'back');
            }
        }
    }
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <NavigationBar ID="navBar" width="296" title="Inbox" leftButtonTitle="Folders" rightButtonTitle="New" showRightButton="true" animateStateChanges="true" navigationClick={onNavBarNavigationClick}/>,
    document.getElementById(target)
);
