/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, AdvancedCriteria, Criterion, HLayout, LGField, Label, LayoutSpacer, ListGrid } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HLayout width="100%" height="100%">
        <members>
            <ListGrid ID="countryList" dataSource="worldDS" showFilterEditor="true" autoFetchData="true" width="525" height="300" allowFilterExpressions="true">
                <initialCriteria operator="and">
                    <criteria>
                        <Criterion fieldName="countryName" operator="iNotContains" value="i"/>
                        <Criterion fieldName="capital" operator="iBetweenInclusive" start="A" end="FZZZZZZZZZZ"/>
                        <AdvancedCriteria operator="or">
                            <criteria>
                                <Criterion fieldName="population" operator="lessThan" value="1000000"/>
                                <Criterion fieldName="population" operator="greaterThan" value="100000000"/>
                            </criteria>
                        </AdvancedCriteria>
                    </criteria>
                </initialCriteria>
                <fields>
                    <LGField name="countryCode" width="60"/>
                    <LGField name="countryName"/>
                    <LGField name="capital"/>
                    <LGField name="continent"/>
                    <LGField name="area"/>
                    <LGField name="population"/>
                </fields>
            </ListGrid>
            <LayoutSpacer width="20"/>
            <Label contents={'' + '<table style=\'font-size:14;\'>' + '<tr><td><b>Prefix</b></td><td><b>Operator</b></td></tr>' + '<tr><td>&lt;</td><td>lessThan</td></tr>' + '<tr><td>&gt;</td><td>greaterThan</td></tr>' + '<tr><td>&lt;=</td><td>lessThanOrEqual</td></tr>' + '<tr><td>&gt;=</td><td>greaterThanOrEqual</td></tr>' + '<tr><td>someValue...someValue</td><td>betweenInclusive</td></tr>' + '<tr><td>!</td><td>notEqual</td></tr>' + '<tr><td>^</td><td>startsWith</td></tr>' + '<tr><td>|</td><td>endsWith</td></tr>' + '<tr><td>!^</td><td>notStartsWith</td></tr>' + '<tr><td>!@</td><td>notEndsWith</td></tr>' + '<tr><td>~</td><td>contains</td></tr>' + '<tr><td>!~</td><td>notContains</td></tr>' + '<tr><td>=(value1|value2)</td><td>inSet</td></tr>' + '<tr><td>!=(value1|value2)</td><td>notInSet</td></tr>' + '<tr><td>#</td><td>isNull</td></tr>' + '<tr><td>!#</td><td>isNotNull</td></tr>' + '<tr><td>==</td><td>exact match (for fields where \'contains\' is the default)</td></tr>' + '<tr><td>=.</td><td>matches other field-name or title</td></tr>' + '</table>'} valign="top" title="symbolLabel" ID="symbolLabel" width="*" height="100%" autoDraw="false"/>
        </members>
    </HLayout>,
    document.getElementById(target)
);
