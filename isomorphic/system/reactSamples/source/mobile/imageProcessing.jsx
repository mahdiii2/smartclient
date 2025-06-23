/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, ButtonItem, DynamicForm, FileItem, Img, VStack } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onScaleClick = function (form, item) {
    form.saveData(function (dsResponse) {
        imageViewer.updateImage(dsResponse.data);
        form.editNewRecord();
    });
};
let onImageViewerUpdateImage = function (record) {
    this.setWidth(record.width);
    this.setHeight(record.height);
    this.setSrc(imageProcessing.getFileURL({ pk: record.pk }));
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <VStack membersMargin="30">
        <members>
            <DynamicForm ID="uploadForm" dataSource="imageProcessing">
                <fields>
                    <FileItem name="image" title="Picture" showTitle="false" required="true" hint="Maximum file-size is 5mb" multiple="false" accept="image/*"/>
                    <ButtonItem title="Scale" click={onScaleClick}/>
                </fields>
            </DynamicForm>
            <Img title="imageViewer" ID="imageViewer" updateImage={onImageViewerUpdateImage}/>
        </members>
    </VStack>,
    document.getElementById(target)
);
