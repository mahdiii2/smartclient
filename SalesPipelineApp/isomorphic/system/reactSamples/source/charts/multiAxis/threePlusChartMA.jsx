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
            <FacetChart chartType="Column" stacked="true" showTitle="false" valueTitle="Percent" showChartRect="true" width="600" height="400" border="1px solid black" autoDraw="false">
                <data>
                    <CellRecord area="1" date="13 Sep 20" percent="0.55" events="8751" throughput="20"/>
                    <CellRecord area="2" date="13 Sep 20" percent="0.32" events="3210" throughput="24"/>
                    <CellRecord area="3" date="13 Sep 20" percent="0.21" events="2071" throughput="28"/>
                    <CellRecord area="1" date="14 Sep 20" percent="0.49" events="6367" throughput="30"/>
                    <CellRecord area="2" date="14 Sep 20" percent="0.41" events="3771" throughput="36"/>
                    <CellRecord area="3" date="14 Sep 20" percent="0.22" events="2166" throughput="39"/>
                    <CellRecord area="1" date="15 Sep 20" percent="0.7" events="6011" throughput="41"/>
                    <CellRecord area="2" date="15 Sep 20" percent="0.19" events="1950" throughput="45"/>
                    <CellRecord area="3" date="15 Sep 20" percent="0.25" events="2375" throughput="48"/>
                    <CellRecord area="1" date="16 Sep 20" percent="0.47" events="9234" throughput="51"/>
                    <CellRecord area="2" date="16 Sep 20" percent="0.25" events="4321" throughput="55"/>
                    <CellRecord area="3" date="16 Sep 20" percent="0.3" events="909" throughput="59"/>
                    <CellRecord area="1" date="17 Sep 20" percent="0.3" events="6144" throughput="54"/>
                    <CellRecord area="2" date="17 Sep 20" percent="0.44" events="4077" throughput="50"/>
                    <CellRecord area="3" date="17 Sep 20" percent="0.06" events="1477" throughput="52"/>
                    <CellRecord area="1" date="18 Sep 20" percent="0.7" events="8502" throughput="48"/>
                    <CellRecord area="2" date="18 Sep 20" percent="0.29" events="3061" throughput="44"/>
                    <CellRecord area="3" date="18 Sep 20" percent="0.22" events="2955" throughput="42"/>
                    <CellRecord area="1" date="19 Sep 20" percent="0.45" events="7020" throughput="53"/>
                    <CellRecord area="2" date="19 Sep 20" percent="0.22" events="3040" throughput="59"/>
                    <CellRecord area="3" date="19 Sep 20" percent="0.31" events="2177" throughput="53"/>
                    <CellRecord area="1" date="20 Sep 20" percent="0.69" events="6712" throughput="48"/>
                    <CellRecord area="2" date="20 Sep 20" percent="0.21" events="4981" throughput="42"/>
                    <CellRecord area="3" date="20 Sep 20" percent="0.12" events="1234" throughput="45"/>
                    <CellRecord area="1" date="21 Sep 20" percent="0.6" events="9321" throughput="48"/>
                    <CellRecord area="2" date="21 Sep 20" percent="0.29" events="6532" throughput="49"/>
                    <CellRecord area="3" date="21 Sep 20" percent="0.35" events="6622" throughput="45"/>
                    <CellRecord area="1" date="22 Sep 20" percent="0.37" events="8389" throughput="48"/>
                    <CellRecord area="2" date="22 Sep 20" percent="0.35" events="5104" throughput="51"/>
                    <CellRecord area="3" date="22 Sep 20" percent="0.3" events="5111" throughput="55"/>
                    <CellRecord area="1" date="23 Sep 20" percent="0.4" events="7555" throughput="49"/>
                    <CellRecord area="2" date="23 Sep 20" percent="0.34" events="2345" throughput="52"/>
                    <CellRecord area="3" date="23 Sep 20" percent="0.16" events="3456" throughput="57"/>
                    <CellRecord area="1" date="24 Sep 20" percent="0.62" events="9567" throughput="60"/>
                    <CellRecord area="2" date="24 Sep 20" percent="0.12" events="5678" throughput="55"/>
                    <CellRecord area="3" date="24 Sep 20" percent="0.37" events="6789" throughput="51"/>
                </data>
                <facets>
                    <Facet id="date"/>
                    <Facet id="area">
                        <values>
                            <FacetValue id="1" title="North America"/>
                        </values>
                    </Facet>
                    <Facet id="metric" inlinedValues="true">
                        <values>
                            <FacetValue id="percent" title="Percent"/>
                            <FacetValue id="events" title="Events"/>
                            <FacetValue id="throughput" title="Throughput"/>
                        </values>
                    </Facet>
                </facets>
                <extraAxisMetrics>
                    <value>events</value>
                    <value>throughput</value>
                </extraAxisMetrics>

                <extraAxisSettings>
                    <MetricSettings chartType="Line" multiFacet="true" valueTitle="Events" showDataPoints="true"/>
                    <MetricSettings chartType="Area" multiFacet="true" valueTitle="Throughput" showDataPoints="true"/>
                </extraAxisSettings>
            </FacetChart>
        </members>
    </HStack>,
    document.getElementById(target)
);
