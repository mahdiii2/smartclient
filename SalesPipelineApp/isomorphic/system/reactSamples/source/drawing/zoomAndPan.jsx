/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DrawCurve, DrawLabel, DrawLine, DrawLinePath, DrawOval, DrawPane, DrawPath, DrawRect, DrawSector, DrawTriangle, Point, Slider, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onZoomShapesValueChanged = function (value) {
    mainPane.zoom(value);
};
let onRotatePaneValueChanged = function (value) {
    mainPane.rotate(value);
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DrawLine lineWidth="1" lineColor="#ff0000" endArrow="open" autoDraw="true">
            <endPoint x="100" y="0"/>
            <drawPane zoomLevel="1.5" width="400" height="400" top="70" backgroundColor="#ffefd5" showEdges="true" canDragScroll="true" autoDraw="true" drawingWidth="600" drawingHeight="600">
                <translate>10</translate>
                <translate>10</translate>
            </drawPane>
            <startPont>0</startPont>
            <startPont>0</startPont>
        </DrawLine>

        <DrawLabel contents="X" left="110" top="10" fontFamily="Arial" fontSize="14" fontWeight="normal" lineColor="#ff0000" autoDraw="true">
            <drawPane zoomLevel="1.5" width="400" height="400" top="70" backgroundColor="#ffefd5" showEdges="true" canDragScroll="true" autoDraw="true" drawingWidth="600" drawingHeight="600">
                <translate>10</translate>
                <translate>10</translate>
            </drawPane>
        </DrawLabel>

        <DrawLine lineWidth="1" lineColor="#ff0000" endArrow="open" autoDraw="true">
            <endPoint x="0" y="100"/>
            <drawPane zoomLevel="1.5" width="400" height="400" top="70" backgroundColor="#ffefd5" showEdges="true" canDragScroll="true" autoDraw="true" drawingWidth="600" drawingHeight="600">
                <translate>10</translate>
                <translate>10</translate>
            </drawPane>
            <startPont>0</startPont>
            <startPont>0</startPont>
        </DrawLine>

        <DrawLabel contents="Y" left="10" top="110" fontFamily="Arial" fontSize="14" fontWeight="normal" lineColor="#ff0000" autoDraw="true">
            <drawPane zoomLevel="1.5" width="400" height="400" top="70" backgroundColor="#ffefd5" showEdges="true" canDragScroll="true" autoDraw="true" drawingWidth="600" drawingHeight="600">
                <translate>10</translate>
                <translate>10</translate>
            </drawPane>
        </DrawLabel>

        <DrawOval radius="4" fillColor="#ff0000" autoDraw="true">
            <centerPoint x="0" y="0"/>
            <drawPane zoomLevel="1.5" width="400" height="400" top="70" backgroundColor="#ffefd5" showEdges="true" canDragScroll="true" autoDraw="true" drawingWidth="600" drawingHeight="600">
                <translate>10</translate>
                <translate>10</translate>
            </drawPane>
            <lineColor></lineColor>
        </DrawOval>

        <DrawLabel contents="(0, 0)" left="5" top="5" fontFamily="Arial" fontSize="14" fontWeight="normal" lineColor="#ff0000" autoDraw="true">
            <drawPane zoomLevel="1.5" width="400" height="400" top="70" backgroundColor="#ffefd5" showEdges="true" canDragScroll="true" autoDraw="true" drawingWidth="600" drawingHeight="600">
                <translate>10</translate>
                <translate>10</translate>
            </drawPane>
        </DrawLabel>

        <DrawTriangle rotation="0" autoDraw="true">
            <points>
                <Point x="140" y="80"/>
                <Point x="100" y="210"/>
                <Point x="40" y="40"/>
            </points>
            <drawPane zoomLevel="1.5" width="400" height="400" top="70" backgroundColor="#ffefd5" showEdges="true" canDragScroll="true" autoDraw="true" drawingWidth="600" drawingHeight="600">
                <translate>10</translate>
                <translate>10</translate>
            </drawPane>
        </DrawTriangle>

        <DrawCurve autoDraw="true">
            <startPoint x="155" y="45"/>
            <endPoint x="320" y="140"/>
            <controlPoint1 x="340" y="60"/>
            <controlPoint2 x="160" y="250"/>
            <drawPane zoomLevel="1.5" width="400" height="400" top="70" backgroundColor="#ffefd5" showEdges="true" canDragScroll="true" autoDraw="true" drawingWidth="600" drawingHeight="600">
                <translate>10</translate>
                <translate>10</translate>
            </drawPane>
        </DrawCurve>

        <DrawLinePath autoDraw="true">
            <startPoint x="330" y="200"/>
            <endPoint x="540" y="280"/>
            <drawPane zoomLevel="1.5" width="400" height="400" top="70" backgroundColor="#ffefd5" showEdges="true" canDragScroll="true" autoDraw="true" drawingWidth="600" drawingHeight="600">
                <translate>10</translate>
                <translate>10</translate>
            </drawPane>
        </DrawLinePath>

        <DrawPath autoDraw="true">
            <points>
                <Point x="320" y="90"/>
                <Point x="360" y="30"/>
                <Point x="480" y="70"/>
                <Point x="480" y="20"/>
                <Point x="560" y="100"/>
                <Point x="400" y="120"/>
                <Point x="520" y="160"/>
                <Point x="580" y="230"/>
            </points>
            <drawPane zoomLevel="1.5" width="400" height="400" top="70" backgroundColor="#ffefd5" showEdges="true" canDragScroll="true" autoDraw="true" drawingWidth="600" drawingHeight="600">
                <translate>10</translate>
                <translate>10</translate>
            </drawPane>
        </DrawPath>

        <DrawOval left="30" top="420" width="250" height="140" autoDraw="true">
            <drawPane zoomLevel="1.5" width="400" height="400" top="70" backgroundColor="#ffefd5" showEdges="true" canDragScroll="true" autoDraw="true" drawingWidth="600" drawingHeight="600">
                <translate>10</translate>
                <translate>10</translate>
            </drawPane>
        </DrawOval>

        <DrawRect left="50" top="240" width="200" height="80" rotation="-30" autoDraw="true">
            <drawPane zoomLevel="1.5" width="400" height="400" top="70" backgroundColor="#ffefd5" showEdges="true" canDragScroll="true" autoDraw="true" drawingWidth="600" drawingHeight="600">
                <translate>10</translate>
                <translate>10</translate>
            </drawPane>
        </DrawRect>

        <DrawLine autoDraw="true">
            <startPoint x="280" y="320"/>
            <endPoint x="540" y="360"/>
            <drawPane zoomLevel="1.5" width="400" height="400" top="70" backgroundColor="#ffefd5" showEdges="true" canDragScroll="true" autoDraw="true" drawingWidth="600" drawingHeight="600">
                <translate>10</translate>
                <translate>10</translate>
            </drawPane>
        </DrawLine>

        <DrawSector startAngle="0" endAngle="90" radius="175" rotation="-120" autoDraw="true">
            <centerPoint x="400" y="580"/>
            <drawPane zoomLevel="1.5" width="400" height="400" top="70" backgroundColor="#ffefd5" showEdges="true" canDragScroll="true" autoDraw="true" drawingWidth="600" drawingHeight="600">
                <translate>10</translate>
                <translate>10</translate>
            </drawPane>
        </DrawSector>

        <VStack membersMargin="15" width="100%">
            <members>
                <DrawPane zoomLevel="1.5" width="400" height="400" top="70" backgroundColor="#ffefd5" showEdges="true" canDragScroll="true" autoDraw="true" drawingWidth="600" drawingHeight="600">
                    <translate>10</translate>
                    <translate>10</translate>
                </DrawPane>
                <Slider title="Zoom Shapes" vertical="false" labelWidth="110" value={mainPane.zoomLevel} minValue="0.1" maxValue="3" numValues="300" roundValues="false" roundPrecision="2" width="400" autoDraw="false" valueChanged={onZoomShapesValueChanged}/>
                <Slider title="Rotate Pane" vertical="false" labelWidth="110" value={(mainPane.rotation % 360 + 360) % 360} minValue="0" maxValue="360" numValues="361" width="400" autoDraw="false" valueChanged={onRotatePaneValueChanged}/>
            </members>
        </VStack>
    </>,
    document.getElementById(target)
);
