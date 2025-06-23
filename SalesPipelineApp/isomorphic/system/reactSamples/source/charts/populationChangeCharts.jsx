
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, FacetChart } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

            
// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <FacetChart ID="cityPopulationChangeChart" width="100%" height="100%" margin="5" canZoom="true"
            zoomStartValue="Abilene, Texas" zoomEndValue="Greensboro, North Carolina" zoomChartHeight="30"
            zoomChartProperties={ { showInlineLabels: false } } zoomShowSelection="false" chartType="Column"
            data={populationData} barMargin="2" minBarThickness="2" labelCollapseMode="sample" minLabelGap="3"
            
            title="Percentage Change in Populations of U.S. Cities from 2000 to 2009" facets={ [{ id: "city", title: "City" }] }
            valueProperty="change" valueTitle="% Change">
        </FacetChart>

    </>,
    document.getElementById(target)
);

