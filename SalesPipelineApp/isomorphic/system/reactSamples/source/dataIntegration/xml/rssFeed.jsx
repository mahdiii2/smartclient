/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DSField, DataSource, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DataSource ID="newsFeed" dataURL="http://rss.slashdot.org/Slashdot/slashdot" recordXPath="//item | //default:item" title="newsFeed">
            <fields>
                <DSField name="title"/>
                <DSField name="link" type="link"/>
            </fields>
        </DataSource>

        <ListGrid ID="newsViewer" dataSource="newsFeed" autoFetchData="true" width="100%" height="300"/>
    </>,
    document.getElementById(target)
);
