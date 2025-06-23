import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, HTMLFlow, ListGrid, LGField, HLayout, VLayout, Button } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let clickButton3 = function () {
    isc.HLayout.create({
        ID: "layout",
        autoDraw: "false",
        layoutTopMargin: 15,
        margin: 5,
        members: [
            isc.Img.create({
                width:32, height:32,
                imageType: "normal",
                src: "[SKIN]/Dialog/say.png"
            }),
            isc.DynamicForm.create({
                width: "100%",
                numCols: 3,
                colWidths:[100,"*",40],
                fields: [
                    {name: "username",
                     title: "Enter your name",
                     type: "text", wrapTitle: false,
                     width:"*"
                    },
                    {type: "SpacerItem"}
                ]
            })
        ]
    });
    isc.Window.create({
        title: "Sample Input Dialog",
        autoDraw:true,
        width:"80%",
        autoCenter:true,
        height:110,
        minWidth:400,
        maxWidth:800,
        items: [ layout ]
    });
}

let clickButton1 = function () {
    htmlFlow.setContents("<h2>Asia</h2> <span style='font-size:12px;'>" +
                         "Asia is the Earth's largest and most populous continent," +
                        "located primarily in the eastern and northern hemispheres. <p>" +
                        "Asia covers an area of "+
                        "44,579,000 square kilometers, about 30% of Earth's total land area and 8.7% of the "+
                        "Earth's total surface area. It has historically been home to the world's first "+
                        "modern civilizations and has always hosted the bulk of the planet's human population." +
                        "<p>"+
                        "Below are some details about various countries in Asia.</span>");
}

let clickButton2 = function () {
    htmlFlow.setContents("<h2>Asia</h2> <span style='font-size:12px;'> "+
                        "Asia is the Earth's largest and most populous continent, "+
                        "located primarily in the eastern and northern hemispheres. <p>"+
                        "Asia covers an area of 44,579,000 square kilometers, about 30% of Earth's total land "+
                        "area and 8.7% of the Earth's total surface area. "+
                        "<p>"+
                        "It has historically been home to the world's first "+
                        "modern civilizations and has always hosted the bulk of the planet's human population. "+
                        "<p>"+
                        " Asia is notable for not only overall large size and population, but unusually dense and "+
                        "large settlements as well as vast barely populated regions within the continent of 4.4 "+
                        "billion people. The boundaries of Asia are traditionally determined as that of Eurasia, "+
                        "as there is no significant geographical separation between Asia and Europe."+
                        "<p>"+
                        "Below are some details about various countries in Asia.</span>");
}

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <HTMLFlow ID="htmlFlow" autoDraw="false" width="500" padding="10" 
            contents="<h2>Asia</h2> <span style='font-size:12px;'>
                Asia is the Earth's largest and most populous continent, located primarily
                in the eastern and northern hemispheres.<p>
                Below are some details about various countries in Asia.</span>"/>
    
        <ListGrid ID="listGrid" autoDraw="false" width="500" minHeight="90" alternateRecordStyles="true" canResizeFields="true">
            <fields>
                <LGField name="countryCode" title="Flag" width="40" type="image" imageURLPrefix="flags/24/" imageURLSuffix=".png"/>
                <LGField name="countryName" title="Country"/>
                <LGField name="capital" title="Capital"/>
                <LGField name="continent" title="Continent"/>
            </fields>
        </ListGrid>
    
        <HLayout width="100%" membersMargin="15">
            <members>
                <VLayout width="530" height="320" border="1px solid blue" overflow="auto" layoutMargin="5">
                    <members>
                        <value>htmlFlow</value>
                        <value>listGrid</value>
                    </members>
                </VLayout>
                <VLayout membersMargin="15">
                    <members>
                        <Button autoDraw="false" width="140" title="Longer text" click={clickButton1}/>
                        <Button autoDraw="false" width="140" title="Longest text" click={clickButton2}/>
                        <Button autoDraw="false" width="140" title="Show Input Dialog" click={clickButton3}>
                        </Button>
                    </members>
                </VLayout>
            </members>
        </HLayout>
    </>,
    document.getElementById(target)
);

listGrid.setData(countryData.findAll('continent','Asia'));


