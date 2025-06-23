/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, DynamicForm, IButton, Img, LGField, ListGrid, ListGridRecord, StaticTextItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <ListGrid leaveScrollbarGap="false" width="80%" height="84" hoverWidth="300">
            <data>
                <ListGridRecord commonName="Platypus" scientificName="Ornithorhynchus Anatinus" diet="Insects and Larvae" lifeSpan="10-15 years" information="Were thought to be a hoax when first discovered. The male has a venemous spur on his hind legs.  Capable of many vocalizations including sounds like a growling puppy and a brooding hen."/>
                <ListGridRecord commonName="Elephant (African)" scientificName="Loxodonta africana" diet="Herbivore" lifeSpan="40-60 years" information="The African Elephant is the largest of all land animals and also has the biggest brain of any land animal. Both males and females have ivory tusks. Elephants are also wonderful swimmers. Man is the only real enemy of the elephant. Man threatens the elephant by killing it for its tusks and by destroying its habitat."/>
                <ListGridRecord commonName="Alligator (American)" scientificName="Allligator mississippiensis" diet="Carnivore" lifeSpan="50 years" information="In the 16th century, Spanish explorers in what is now Florida encountered a large formidable animal which they called &quot;el largo&quot; meaning &quot;the lizard&quot;. The name &quot;el largo&quot; gradually became pronounced &quot;alligator&quot;."/>
            </data>
            <fields>
                <LGField name="commonName" title="Animal" hidden="true"/>
                <LGField name="scientificName" title="Scientific Name"/>
                <LGField name="diet" title="Diet"/>
                <LGField name="information" title="Interesting Facts" showHover="true"/>
            </fields>
        </ListGrid>

        <IButton title="Close Issue" top="150" prompt="You cannot close this issue - see the owner" hoverWidth="150" disabled="true"/>

        <Img src="[SAMPLE]other/eyes.jpg" width="90" height="47" left="180" top="100" prompt="360px by 188px&lt;BR&gt;25k&lt;BR&gt;JPEG high quality" hoverStyle="interactImageHover" hoverOpacity="75" hoverWidth="120"/>

        <DynamicForm itemHoverWidth="200" itemHoverStyle="interactFormHover" width="200" left="220" top="190">
            <fields>
                <StaticTextItem defaultValue="Severity 2" name="severityLevel" title="Severity Level" wrapTitle="false" prompt={'<b>Severity 1</b> - Critical problem<br>System is unavailable in production or ' + 'is corrupting data, and the error severely impacts the user\'s operations.' + '<br><br><b>Severity 2</b> - Major problem<br>An important function of the system ' + 'is not available in production, and the user\'s operations are restricted.' + '<br><br><b>Severity 3</b> - Minor problem<br>Inability to use a function of the ' + 'system occurs, but it does not seriously affect the user\'s operations.'}/>
            </fields>
        </DynamicForm>
    </>,
    document.getElementById(target)
);
