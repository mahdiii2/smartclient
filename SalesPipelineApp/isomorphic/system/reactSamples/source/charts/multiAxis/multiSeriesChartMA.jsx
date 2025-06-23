/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, CellRecord, Facet, FacetChart, FacetValue, HStack, MetricSettings } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <HStack width="100%">
        <members>
            <FacetChart chartType="Column" stacked="true" showTitle="false" valueTitle="Percent" showChartRect="true" dataMargin="12" barMargin="27" minBarThickness="25" width="500" height="400" border="1px solid black" autoDraw="false">
                <data>
                    <CellRecord area="1" date="13 Sep 20" percent="0.55" events="8751"/>
                    <CellRecord area="2" date="13 Sep 20" percent="0.32" events="3210"/>
                    <CellRecord area="3" date="13 Sep 20" percent="0.21" events="2071"/>
                    <CellRecord area="1" date="14 Sep 20" percent="0.49" events="6367"/>
                    <CellRecord area="2" date="14 Sep 20" percent="0.41" events="3771"/>
                    <CellRecord area="3" date="14 Sep 20" percent="0.22" events="2166"/>
                    <CellRecord area="1" date="15 Sep 20" percent="0.7" events="6011"/>
                    <CellRecord area="2" date="15 Sep 20" percent="0.19" events="1950"/>
                    <CellRecord area="3" date="15 Sep 20" percent="0.25" events="2375"/>
                    <CellRecord area="1" date="16 Sep 20" percent="0.47" events="9234"/>
                    <CellRecord area="2" date="16 Sep 20" percent="0.25" events="4321"/>
                    <CellRecord area="3" date="16 Sep 20" percent="0.3" events="909"/>
                    <CellRecord area="1" date="17 Sep 20" percent="0.3" events="6144"/>
                    <CellRecord area="2" date="17 Sep 20" percent="0.44" events="4077"/>
                    <CellRecord area="3" date="17 Sep 20" percent="0.06" events="1477"/>
                    <CellRecord area="1" date="18 Sep 20" percent="0.7" events="8502"/>
                    <CellRecord area="2" date="18 Sep 20" percent="0.29" events="3061"/>
                    <CellRecord area="3" date="18 Sep 20" percent="0.22" events="2955"/>
                    <CellRecord area="1" date="19 Sep 20" percent="0.45" events="7020"/>
                    <CellRecord area="2" date="19 Sep 20" percent="0.22" events="3040"/>
                    <CellRecord area="3" date="19 Sep 20" percent="0.31" events="2177"/>
                    <CellRecord area="1" date="20 Sep 20" percent="0.69" events="6712"/>
                    <CellRecord area="2" date="20 Sep 20" percent="0.21" events="4981"/>
                    <CellRecord area="3" date="20 Sep 20" percent="0.12" events="1234"/>
                    <CellRecord area="1" date="21 Sep 20" percent="0.6" events="9321"/>
                    <CellRecord area="2" date="21 Sep 20" percent="0.29" events="6532"/>
                    <CellRecord area="3" date="21 Sep 20" percent="0.35" events="6622"/>
                    <CellRecord area="1" date="22 Sep 20" percent="0.37" events="8389"/>
                    <CellRecord area="2" date="22 Sep 20" percent="0.35" events="5104"/>
                    <CellRecord area="3" date="22 Sep 20" percent="0.3" events="5111"/>
                    <CellRecord area="1" date="23 Sep 20" percent="0.4" events="7555"/>
                    <CellRecord area="2" date="23 Sep 20" percent="0.34" events="2345"/>
                    <CellRecord area="3" date="23 Sep 20" percent="0.16" events="3456"/>
                    <CellRecord area="1" date="24 Sep 20" percent="0.62" events="9567"/>
                    <CellRecord area="2" date="24 Sep 20" percent="0.12" events="5678"/>
                    <CellRecord area="3" date="24 Sep 20" percent="0.37" events="6789"/>
                </data>
                <facets>
                    <Facet id="date"/>
                    <Facet id="area">
                        <values>
                            <FacetValue id="1" title="North America"/>
                            <FacetValue id="2" title="Europe"/>
                            <FacetValue id="3" title="Asia-Pacific"/>
                        </values>
                    </Facet>
                    <Facet id="metric" inlinedValues="true">
                        <values>
                            <FacetValue id="percent" title="Percent"/>
                            <FacetValue id="events" title="Events"/>
                        </values>
                    </Facet>
                </facets>
                <dataColors>
                    <value>#fffd53</value>
                    <value>#f8c14c</value>
                    <value>#60ffff</value>
                    <value>#97E997</value>
                    <value>#F36050</value>
                    <value>#7F62B4</value>
                </dataColors>

                <extraAxisMetrics>
                    <value>events</value>
                </extraAxisMetrics>

                <extraAxisSettings>
                    <MetricSettings chartType="Line" multiFacet="true" valueTitle="Events" showDataPoints="true"/>
                </extraAxisSettings>
            </FacetChart>
        </members>
    </HStack>,
    document.getElementById(target)
);
