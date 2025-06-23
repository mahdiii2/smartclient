import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, Canvas, Label, LayoutSpacer, HLayout } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// Simple snap to
var commonProps = {
    height: 80, width: 80,
    align: "center",
    border: "1px solid black",
    styleName: "exampleTextBlock"
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <Canvas ID="snapContainer" height="300" width="400" minHeight="280" minWidth="280" border="1px solid #7e7e7e"
            overflow="hidden" canDragResize="true">
            <childComponents>
                <Label {...commonProps} ID="label1" contents="Top Left" backgroundColor="#FFAAAA" snapTo="TL"/>
                <Label {...commonProps} ID="label2" contents="Top Right" backgroundColor="#BEC9FE" snapTo="TR"/>
                <Label {...commonProps} ID="label3" contents="Bottom Left" backgroundColor="#D8D5D6" snapTo="BL"/>
                <Label {...commonProps} ID="label4" contents="Bottom Right" backgroundColor="#F8BFFB" snapTo="BR"/>
                <Label {...commonProps} ID="label5" contents="Left" backgroundColor="#CCFFCC" snapTo="L"/>
                <Label {...commonProps} ID="label6" contents="Right" backgroundColor="#AB5654" snapTo="R"/>
                <Label {...commonProps} ID="label7" contents="Bottom" backgroundColor="#DCEFEF" snapTo="B"/>
                <Label {...commonProps} ID="label8" contents="Top" backgroundColor="#FFCC99" snapTo="T"/>
                <Label {...commonProps} ID="label9" contents="Center" backgroundColor="#FFFF99" snapTo="C"/>
            </childComponents>
        </Canvas>
        {/*
        // --------------------------------
        // Snap to with fixed pixel offsets
        */}
        <Canvas ID="offsetContainer" height="300" width="400" minHeight="280" minWidth="280" border="1px solid #7e7e7e"
            overflow="hidden" showHover="true" prompt="Snap offsets specified" canDragResize="true">
            <childComponents>
                <Label {...commonProps} ID="label1a" contents="Top Left" backgroundColor="#FFAAAA" snapTo="TL" 
                    snapOffsetTop="10" snapOffsetLeft="10"/>
                <Label {...commonProps} ID="label2a" contents="Top Right" backgroundColor="#BEC9FE" snapTo="TR"
                    snapOffsetTop="10" snapOffsetLeft="-10"/>
                <Label {...commonProps} ID="label3a" contents="Bottom Left" backgroundColor="#D8D5D6" snapTo="BL"
                    snapOffsetLeft="10" snapOffsetTop="-10"/>
                <Label {...commonProps} ID="label4a" contents="Left" backgroundColor="#CCFFCC" snapTo="L"
                    snapOffsetLeft="10"/>
                <Label {...commonProps} ID="label5a" contents="Right" backgroundColor="#AB5654" snapTo="R"
                    snapOffsetLeft="-10"/>
                <Label {...commonProps} ID="label6a" contents="Bottom" backgroundColor="#DCEFEF" snapTo="B"
                    snapOffsetTop="-10"/>
                <Label {...commonProps} ID="label7a" contents="Top" showHover="true" prompt="SnapOffsetTop using percentage"
                    backgroundColor="#FFCC99" snapTo="T" snapOffsetTop="10"/>
                <Label {...commonProps} ID="label8a" contents="Bottom Right" backgroundColor="#F8BFFB" snapTo="BR"
                    snapOffsetTop="-10" snapOffsetLeft="-10"/>
            </childComponents>
        </Canvas>
    
        <LayoutSpacer ID="spacer" width="100"/>
    
        <HLayout ID="controlLayout" membersMargin="20" height="800" width="1000">
            <members>
                <value>snapContainer</value>
                <value>spacer</value>
                <value>offsetContainer</value>
            </members>
        </HLayout>
    
    </>,
    document.getElementById(target)
);
