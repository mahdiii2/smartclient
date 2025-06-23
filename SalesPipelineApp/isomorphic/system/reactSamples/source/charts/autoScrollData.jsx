/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, CheckboxItem, DynamicForm, Facet, FacetChart, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onScrollChanged = function (form, item, value) {
    var sizing = form.getItem('sizing');
    if (!value) {
        scrollChart.setBarSizing(false);
        sizing.setValue(false);
    }
    sizing.setDisabled(!value);
    scrollChart.setAutoScrollData(value);
};
let onSizingChanged = function (form, item, value) {
    scrollChart.setBarSizing(value);
};
let onScrollChartSetBarSizing = function (enabled) {
    var prototype = isc.FittedChart.getPrototype();
    this.getMinClusterSize = enabled ? prototype.getMinClusterSize : null;
    this.setAutoScrollDataApproach(enabled ? 'clusters' : 'labels');
};

var statePopData = [
    {
        state: 'California',
        population: 33872
    },
    {
        state: 'Texas',
        population: 20852
    },
    {
        state: 'New York',
        population: 18976
    },
    {
        state: 'Florida',
        population: 15982
    },
    {
        state: 'Illinois',
        population: 12419
    },
    {
        state: 'Pennsylvania',
        population: 12281
    },
    {
        state: 'Ohio',
        population: 11353
    },
    {
        state: 'Michigan',
        population: 9938
    },
    {
        state: 'New Jersey',
        population: 8414
    },
    {
        state: 'Georgia',
        population: 8186
    },
    {
        state: 'North Carolina',
        population: 8049
    },
    {
        state: 'Virginia',
        population: 7079
    },
    {
        state: 'Massachusetts',
        population: 6349
    },
    {
        state: 'Indiana',
        population: 6080
    },
    {
        state: 'Washington',
        population: 5894
    },
    {
        state: 'Tennessee',
        population: 5689
    },
    {
        state: 'Missouri',
        population: 5595
    },
    {
        state: 'Wisconsin',
        population: 5364
    },
    {
        state: 'Maryland',
        population: 5296
    },
    {
        state: 'Arizona',
        population: 5131
    },
    {
        state: 'Minnesota',
        population: 4919
    },
    {
        state: 'Louisiana',
        population: 4469
    },
    {
        state: 'Alabama',
        population: 4447
    },
    {
        state: 'Colorado',
        population: 4301
    },
    {
        state: 'Kentucky',
        population: 4042
    },
    {
        state: 'South Carolina',
        population: 4012
    },
    {
        state: 'Oklahoma',
        population: 3451
    },
    {
        state: 'Oregon',
        population: 3421
    },
    {
        state: 'Connecticut',
        population: 3406
    },
    {
        state: 'Iowa',
        population: 2926
    },
    {
        state: 'Mississippi',
        population: 2845
    },
    {
        state: 'Kansas',
        population: 2688
    },
    {
        state: 'Arkansas',
        population: 2673
    },
    {
        state: 'Utah',
        population: 2233
    },
    {
        state: 'Nevada',
        population: 1998
    },
    {
        state: 'New Mexico',
        population: 1819
    },
    {
        state: 'West Virginia',
        population: 1808
    },
    {
        state: 'Nebraska',
        population: 1711
    },
    {
        state: 'Idaho',
        population: 1294
    },
    {
        state: 'Maine',
        population: 1275
    },
    {
        state: 'New Hampshire',
        population: 1236
    },
    {
        state: 'Hawaii',
        population: 1212
    },
    {
        state: 'Rhode Island',
        population: 1048
    },
    {
        state: 'Montana',
        population: 902
    },
    {
        state: 'Delaware',
        population: 784
    },
    {
        state: 'South Dakota',
        population: 755
    },
    {
        state: 'North Dakota',
        population: 642
    },
    {
        state: 'Alaska',
        population: 627
    },
    {
        state: 'Vermont',
        population: 609
    },
    {
        state: 'Wyoming',
        population: 494
    }
];
const FittedChart = SC.defineClass('FittedChart', FacetChart);
isc.FittedChart.addProperties({
    autoScrollData: true,
    autoScrollDataApproach: 'clusters',
    initWidget: function () {
        this.Super('initWidget', arguments);
        var drawPane = isc.DrawPane.create({
            visibility: 'hidden',
            width: 200,
            height: 50
        });
        this.barSizingLabel = isc.DrawLabel.create({ drawPane: drawPane }, this.dataLabelProperties);
    },
    getMinClusterSize: function (index, facetValueId) {
        this.barSizingLabel.setContents(facetValueId);
        var box = this.barSizingLabel.getBoundingBox(true);
        return box[2] - box[0];
    }
});

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="20" width="100%" height="100%">
        <members>
            <DynamicForm ID="configForm">
                <items>
                    <CheckboxItem defaultValue="true" showTitle="false" name="scroll" title="Scroll Chart to Fit" width="140" height="30" changed={onScrollChanged}/>
                    <CheckboxItem defaultValue="true" showTitle="false" name="sizing" title="Dynamic Bar Thickness" changed={onSizingChanged}/>
                </items>
            </DynamicForm>
            <FittedChart data={statePopData} title="2000 Census Population by State" valueTitle="Population (Thousands)" minLabelGap="5" valueProperty="population" ID="scrollChart" setBarSizing={onScrollChartSetBarSizing}>
                <facets>
                    <Facet id="state" title="State"/>
                </facets>
                <allowedChartTypes>
                    <value>Bar</value>
                    <value>Column</value>
                    <value>Area</value>
                    <value>Line</value>
                </allowedChartTypes>
            </FittedChart>
        </members>
    </VLayout>,
    document.getElementById(target)
);
