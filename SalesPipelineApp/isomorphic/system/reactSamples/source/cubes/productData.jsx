import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DataSource, DSField, Record } from 'smartclient-eval/react';

// A "render target" can be defined to allow JSX to be loaded dynamically into an existing application.
// This sample sets a different render target starting with "showcaseSample" for each JSX file so they
// can be rendered separately on the same page and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>

    <DataSource ID="productData" clientOnly="true">
        <fields>
            {/* Ensure proper integer type conversion */}
            <DSField name="_value"          type="integer"/>
            <DSField name="percentNational" type="integer"/>
        </fields>
        <cacheData>

            <Record quarter="Q1, 2020" month="January" region="Western U.S."
                    product="Pens" metric="Revenue" _value="10000" percentNational="25"/>
            <Record quarter="Q1, 2020" month="January" region="Western U.S."
                    product="Chairs" metric="Revenue" _value="50000" percentNational="45"/>
            <Record quarter="Q1, 2020" month="January" region="Western U.S."
                    product="Monitors" metric="Revenue" _value="120000" percentNational="49"/>

            <Record quarter="Q1, 2020" month="January" region="Western U.S."
                    product="Pens" metric="Profit" _value="2000" percentNational="25"/>
            <Record quarter="Q1, 2020" month="January" region="Western U.S."
                    product="Chairs" metric="Profit" _value="5000" percentNational="45"/>
            <Record quarter="Q1, 2020" month="January" region="Western U.S."
                    product="Monitors" metric="Profit" _value="44000" percentNational="59" _hilite="over50"/>

            <Record quarter="Q1, 2020" month="January" region="Midwest U.S."
                    product="Pens" metric="Revenue" _value="8000" percentNational="20"/>
            <Record quarter="Q1, 2020" month="January" region="Midwest U.S."
                    product="Chairs" metric="Revenue" _value="22000" percentNational="20"/>
            <Record quarter="Q1, 2020" month="January" region="Midwest U.S."
                    product="Monitors" metric="Revenue" _value="20000" percentNational="8" _hilite="under10"/>

            <Record quarter="Q1, 2020" month="January" region="Midwest U.S."
                    product="Pens" metric="Profit" _value="2000" percentNational="25"/>
            <Record quarter="Q1, 2020" month="January" region="Midwest U.S."
                    product="Chairs" metric="Profit" _value="2000" percentNational="18"/>
            <Record quarter="Q1, 2020" month="January" region="Midwest U.S."
                    product="Monitors" metric="Profit" _value="5000" percentNational="7" _hilite="under10"/>

            <Record quarter="Q1, 2020" month="January" region="Eastern U.S."
                    product="Pens" metric="Revenue" _value="22000" percentNational="55" _hilite="over50"/>
            <Record quarter="Q1, 2020" month="January" region="Eastern U.S."
                    product="Chairs" metric="Revenue" _value="40000" percentNational="36"/>
            <Record quarter="Q1, 2020" month="January" region="Eastern U.S."
                    product="Monitors" metric="Revenue" _value="105000" percentNational="43"/>

            <Record quarter="Q1, 2020" month="January" region="Eastern U.S."
                    product="Pens" metric="Profit" _value="4000" percentNational="50" _hilite="over50"/>
            <Record quarter="Q1, 2020" month="January" region="Eastern U.S."
                    product="Chairs" metric="Profit" _value="4000" percentNational="36"/>
            <Record quarter="Q1, 2020" month="January" region="Eastern U.S."
                    product="Monitors" metric="Profit" _value="25000" percentNational="34"/>

            <Record quarter="Q1, 2020" month="February" region="Western U.S."
                    product="Pens" metric="Revenue" _value="12000" percentNational="23"/>
            <Record quarter="Q1, 2020" month="February" region="Western U.S."
                    product="Chairs" metric="Revenue" _value="42000" percentNational="47"/>
            <Record quarter="Q1, 2020" month="February" region="Western U.S."
                    product="Monitors" metric="Revenue" _value="160000" percentNational="40"/>

            <Record quarter="Q1, 2020" month="February" region="Western U.S."
                    product="Pens" metric="Profit" _value="4000" percentNational="23"/>
            <Record quarter="Q1, 2020" month="February" region="Western U.S."
                    product="Chairs" metric="Profit" _value="4000" percentNational="47"/>
            <Record quarter="Q1, 2020" month="February" region="Western U.S."
                    product="Monitors" metric="Profit" _value="68000" percentNational="40"/>

            <Record quarter="Q1, 2020" month="February" region="Midwest U.S."
                    product="Pens" metric="Revenue" _value="10000" percentNational="19"/>
            <Record quarter="Q1, 2020" month="February" region="Midwest U.S."
                    product="Chairs" metric="Revenue" _value="12000" percentNational="13"/>
            <Record quarter="Q1, 2020" month="February" region="Midwest U.S."
                    product="Monitors" metric="Revenue" _value="75000" percentNational="19"/>

            <Record quarter="Q1, 2020" month="February" region="Midwest U.S."
                    product="Pens" metric="Profit" _value="3000" percentNational="20"/>
            <Record quarter="Q1, 2020" month="February" region="Midwest U.S."
                    product="Chairs" metric="Profit" _value="1000" percentNational="11"/>
            <Record quarter="Q1, 2020" month="February" region="Midwest U.S."
                    product="Monitors" metric="Profit" _value="32000" percentNational="17"/>

            <Record quarter="Q1, 2020" month="February" region="Eastern U.S."
                    product="Pens" metric="Revenue" _value="31000" percentNational="58" _hilite="over50"/>
            <Record quarter="Q1, 2020" month="February" region="Eastern U.S."
                    product="Chairs" metric="Revenue" _value="35000" percentNational="39"/>
            <Record quarter="Q1, 2020" month="February" region="Eastern U.S."
                    product="Monitors" metric="Revenue" _value="164000" percentNational="41"/>

            <Record quarter="Q1, 2020" month="February" region="Eastern U.S."
                    product="Pens" metric="Profit" _value="8000" percentNational="53" _hilite="over50"/>
            <Record quarter="Q1, 2020" month="February" region="Eastern U.S."
                    product="Chairs" metric="Profit" _value="4000" percentNational="44"/>
            <Record quarter="Q1, 2020" month="February" region="Eastern U.S."
                    product="Monitors" metric="Profit" _value="88000" percentNational="47"/>

            <Record quarter="Q1, 2020" month="March" region="Western U.S."
                    product="Pens" metric="Revenue" _value="18000" percentNational="26"/>
            <Record quarter="Q1, 2020" month="March" region="Western U.S."
                    product="Chairs" metric="Revenue" _value="25000" percentNational="54" _hilite="over50"/>
            <Record quarter="Q1, 2020" month="March" region="Western U.S."
                    product="Monitors" metric="Revenue" _value="220000" percentNational="40"/>

            <Record quarter="Q1, 2020" month="March" region="Western U.S."
                    product="Pens" metric="Profit" _value="9000" percentNational="29"/>
            <Record quarter="Q1, 2020" month="March" region="Western U.S."
                    product="Chairs" metric="Profit" _value="2000" percentNational="40"/>
            <Record quarter="Q1, 2020" month="March" region="Western U.S."
                    product="Monitors" metric="Profit" _value="112000" percentNational="38"/>

            <Record quarter="Q1, 2020" month="March" region="Midwest U.S."
                    product="Pens" metric="Revenue" _value="7000" percentNational="10"/>
            <Record quarter="Q1, 2020" month="March" region="Midwest U.S."
                    product="Chairs" metric="Revenue" _value="6000" percentNational="13"/>
            <Record quarter="Q1, 2020" month="March" region="Midwest U.S."
                    product="Monitors" metric="Revenue" _value="135000" percentNational="25"/>

            <Record quarter="Q1, 2020" month="March" region="Midwest U.S."
                    product="Pens" metric="Profit" _value="2000" percentNational="6" _hilite="under10"/>
            <Record quarter="Q1, 2020" month="March" region="Midwest U.S."
                    product="Chairs" metric="Profit" _value="1000" percentNational="20"/>
            <Record quarter="Q1, 2020" month="March" region="Midwest U.S."
                    product="Monitors" metric="Profit" _value="66000" percentNational="23"/>

            <Record quarter="Q1, 2020" month="March" region="Eastern U.S."
                    product="Pens" metric="Revenue" _value="44000" percentNational="64" _hilite="over50"/>
            <Record quarter="Q1, 2020" month="March" region="Eastern U.S."
                    product="Chairs" metric="Revenue" _value="15000" percentNational="33"/>
            <Record quarter="Q1, 2020" month="March" region="Eastern U.S."
                    product="Monitors" metric="Revenue" _value="190000" percentNational="35"/>

            <Record quarter="Q1, 2020" month="March" region="Eastern U.S."
                    product="Pens" metric="Profit" _value="20000" percentNational="65" _hilite="over50"/>
            <Record quarter="Q1, 2020" month="March" region="Eastern U.S."
                    product="Chairs" metric="Profit" _value="2000" percentNational="40"/>
            <Record quarter="Q1, 2020" month="March" region="Eastern U.S."
                    product="Monitors" metric="Profit" _value="115000" percentNational="39"/>
        </cacheData>
    </DataSource>

    </>, 
    document.getElementById(target)
);

