/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, DateItem, DynamicForm, HStack, IButton, Label, SelectItem, VLayout, Window } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onButtonClick = function () {
    touchButton.setTitle('Can\'t Touch This');
    modalWindow.show();
};
let onModalWindowCloseClick = function () {
    touchButton.setTitle('Touch This');
    this.Super('closeClick', arguments);
};
let onDoneClick = function(form,item) {modalWindow.hide();touchButton.setTitle('Touch This')};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <VLayout defaultLayoutAlign="center">
            <members>
                <HStack membersMargin="10" ID="hStack" height="50" autoDraw="false">
                    <members>
                        <IButton title="Touch This" ID="touchButton" width="120"/>
                        <Label contents="&lt;a href=&apos;http://www.google.com&apos; target=&apos;_blank&apos;&gt;Open Google&lt;/a&gt;" height="20"/>
                    </members>
                </HStack>
                <IButton title="Show Window" ID="button" autoDraw="false" click={onButtonClick}/>
            </members>
        </VLayout>

        <Window autoCenter="true" isModal="true" autoSize="true" title="Modal Window" showModalMask="true" ID="modalWindow" autoDraw="false" closeClick={onModalWindowCloseClick}>
            <items>
                <DynamicForm height="48" padding="4" autoDraw="false">
                    <fields>
                        <SelectItem name="field1">
                            <valueMap>
                                    <value>foo</value>
                                    <value>bar</value>
                            </valueMap>
                        </SelectItem>
                        <DateItem name="field2"/>
                        <ButtonItem title="Done" click={onDoneClick}/>
                    </fields>
                </DynamicForm>
            </items>
        </Window>
    </>,
    document.getElementById(target)
);
