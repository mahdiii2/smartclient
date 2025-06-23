/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Facet, FacetChart, VLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

var data = [
    {
        year: 1950,
        index: 17.05
    },
    {
        year: 1951,
        index: 21.66
    },
    {
        year: 1952,
        index: 24.14
    },
    {
        year: 1953,
        index: 26.38
    },
    {
        year: 1954,
        index: 26.08
    },
    {
        year: 1955,
        index: 36.63
    },
    {
        year: 1956,
        index: 43.82
    },
    {
        year: 1957,
        index: 44.72
    },
    {
        year: 1958,
        index: 41.7
    },
    {
        year: 1959,
        index: 55.45
    },
    {
        year: 1960,
        index: 55.61
    },
    {
        year: 1961,
        index: 61.78
    },
    {
        year: 1962,
        index: 68.84
    },
    {
        year: 1963,
        index: 66.2
    },
    {
        year: 1964,
        index: 77.04
    },
    {
        year: 1965,
        index: 87.56
    },
    {
        year: 1966,
        index: 92.88
    },
    {
        year: 1967,
        index: 86.61
    },
    {
        year: 1968,
        index: 92.24
    },
    {
        year: 1969,
        index: 103.01
    },
    {
        year: 1970,
        index: 85.02
    },
    {
        year: 1971,
        index: 95.88
    },
    {
        year: 1972,
        index: 103.94
    },
    {
        year: 1973,
        index: 116.03
    },
    {
        year: 1974,
        index: 96.57
    },
    {
        year: 1975,
        index: 76.98
    },
    {
        year: 1976,
        index: 100.86
    },
    {
        year: 1977,
        index: 102.03
    },
    {
        year: 1978,
        index: 89.25
    },
    {
        year: 1979,
        index: 99.93
    },
    {
        year: 1980,
        index: 114.16
    },
    {
        year: 1981,
        index: 129.55
    },
    {
        year: 1982,
        index: 120.4
    },
    {
        year: 1983,
        index: 145.3
    },
    {
        year: 1984,
        index: 163.41
    },
    {
        year: 1985,
        index: 179.63
    },
    {
        year: 1986,
        index: 211.78
    },
    {
        year: 1987,
        index: 274.08
    },
    {
        year: 1988,
        index: 257.07
    },
    {
        year: 1989,
        index: 297.47
    },
    {
        year: 1990,
        index: 329.08
    },
    {
        year: 1991,
        index: 343.93
    },
    {
        year: 1992,
        index: 408.78
    },
    {
        year: 1993,
        index: 438.78
    },
    {
        year: 1994,
        index: 481.61
    },
    {
        year: 1995,
        index: 470.42
    },
    {
        year: 1996,
        index: 636.02
    },
    {
        year: 1997,
        index: 786.16
    },
    {
        year: 1998,
        index: 980.28
    },
    {
        year: 1999,
        index: 1279.64
    },
    {
        year: 2000,
        index: 1394.46
    },
    {
        year: 2001,
        index: 1366.01
    },
    {
        year: 2002,
        index: 1130.2
    },
    {
        year: 2003,
        index: 855.7
    },
    {
        year: 2004,
        index: 1131.13
    },
    {
        year: 2005,
        index: 1181.27
    },
    {
        year: 2006,
        index: 1280.08
    },
    {
        year: 2007,
        index: 1438.24
    },
    {
        year: 2008,
        index: 1378.55
    },
    {
        year: 2009,
        index: 825.88
    },
    {
        year: 2010,
        index: 1073.87
    },
    {
        year: 2011,
        index: 1286.12
    }
];

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VLayout membersMargin="20" ID="logarithmicChartLayout" width="100%" height="100%">
        <members>
            <FacetChart data={data} chartType="Line" title="S &amp; P 500 Index" useLogGradations="true" logScale="true" logBase="10" valueProperty="index" ID="logScalingChart">
                <facets>
                    <Facet id="year"/>
                </facets>
                <logGradations>
                    <value>1</value>
                    <value>2</value>
                    <value>5</value>
                    <value>7.5</value>
                </logGradations>
            </FacetChart>
        </members>
    </VLayout>,
    document.getElementById(target)
);
