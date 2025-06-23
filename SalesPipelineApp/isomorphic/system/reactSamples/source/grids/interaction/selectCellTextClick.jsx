import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, VLayout, DynamicForm, TextAreaItem, ListGrid, LGField } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <VLayout membersMargin="10" width="100%" height="100%">
            <members>
                <ListGrid width="100%" height="100%" alternateRecordStyles="true" data={countryData} selectionType="none" showRollOver="false"
                            alternateRowStyles="true" wrapCells="true" fixedRecordHeights="false">
                    <fields>
                        <LGField name="countryName" title="Country" width="120"/>
                        <LGField name="background" title="Background" selectCellTextOnClick="true"/>
                        <LGField name="countryCode" title="Flag" align="center" width="60" type="image" imageSize="24" imageURLPrefix="flags/24/"
                                imageURLSuffix=".png"/>
                    </fields>
                </ListGrid>
                <DynamicForm width="100%" height="150">
                    <fields>
                        <TextAreaItem title="Paste selected text here" name="textArea" width="100%" height="100%"/>
                    </fields>
                </DynamicForm>
            </members>
        </VLayout>
    </>, 
    document.getElementById(target)
);
