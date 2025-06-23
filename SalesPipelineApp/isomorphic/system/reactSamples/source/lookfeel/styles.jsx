/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, HTMLFlow, RadioGroupItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onRadioGroupItemChange = function(form,item,value,oldValue) {textBox.setStyleName(value); textBox.markForRedraw()};

var exampleText = 'When in the Course of human events, it becomes necessary for one people to dissolve the political bands which have connected them with another, and to assume among the powers of the earth, the separate and equal station to which the Laws of Nature and of Nature\'s God entitle them, a decent respect to the opinions of mankind requires that they should declare the causes which impel them to the separation.';

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <HTMLFlow contents={exampleText} ID="textBox" width="300" left="100" styleName="exampleStyleOnline"/>

        <DynamicForm>
            <items>
                <RadioGroupItem defaultValue="exampleStyleOnline" showTitle="false" change={onRadioGroupItemChange}>
                    <valueMap exampleStyleOnline="Online" exampleStyleLegal="Legal" exampleStyleCode="Code" exampleStyleInformal="Informal"/>
                </RadioGroupItem>
            </items>
        </DynamicForm>
    </>,
    document.getElementById(target)
);
