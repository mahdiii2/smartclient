import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, TextItem, VLayout, HTMLFlow, VStack,
        Button } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onShortBtnClick = function() {
    textCanvas.setContents(textCanvas.prefix+this.message);
};

let onLongBtnClick = function() {
    textCanvas.setContents(textCanvas.prefix+this.message);
};

let afterComponentDidMount = function() {
    longMessageButton.click();
};


// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <VLayout width="230" height="300" border="1px solid blue" layoutMargin="5">
            <HTMLFlow ID="textCanvas" prefix="<b>Message from Rob:</b><BR>" padding="5" height="1" />
            
            <DynamicForm numCols="2" height="*" colWidths={[60, "*"]}  >
                <TextItem name="subject" title="Subject" width="*"
                 defaultValue="Re: your message" />
                <TextItem name="message" length="5000" showTitle="false"
                 colSpan="2" height="*" width="*" />
                
            </DynamicForm>
        </VLayout>
        
        <VStack membersMargin="10" left="250" afterComponentDidMount={afterComponentDidMount}>
            <Button width="150" title="Short message" click={onShortBtnClick}
             message="I'll be in town Saturday.  Give me a call on my cell and we'll get a bite to eat." />
            <Button ID="longMessageButton" width="150" title="Long message" click={onLongBtnClick}
             message="I'll be in town Saturday.  Give me a call on my cell and we'll check out the new Thai restaurant on Polk Street.  Jamie said it's great but too spicy for him, shouldn't be a problem for you :)" />
        </VStack>
    </>, 
    document.getElementById(target)
);
