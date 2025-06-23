/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, SelectItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onDivisionChanged = function(form,item,value) {return form.getField('department').setValueMap(item.departments[value])};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <DynamicForm numCols="4" width="500" top="25" autoDraw="true">
        <fields>
            <SelectItem name="division" title="Division" changed={onDivisionChanged}>
                <valueMap>
                        <value>Marketing</value>
                        <value>Sales</value>
                        <value>Manufacturing</value>
                        <value>Services</value>
                </valueMap>
                <departments>
                	<Marketing>
                		<elem>Advertising</elem>
                		<elem>Community Relations</elem>
                	</Marketing>
                	<Sales>
                		<elem>Channel Sales</elem>
                		<elem>Direct Sales</elem>
                	</Sales>
                	<Manufacturing>
                		<elem>Design</elem>
                		<elem>Development</elem>
                		<elem>QA</elem>
                	</Manufacturing>
                	<Services>
                		<elem>Support</elem>
                		<elem>Consulting</elem>
                	</Services>
                </departments>
            </SelectItem>
            <SelectItem addUnknownValues="false" name="department" title="Department"/>
        </fields>
    </DynamicForm>,
    document.getElementById(target)
);
