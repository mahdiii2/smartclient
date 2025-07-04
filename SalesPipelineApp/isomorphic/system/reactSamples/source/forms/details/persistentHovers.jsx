/* Auto-Generated React */
import React from 'react';
import 'smartclient-eval/release';
import 'smartclient-eval/skins/Tahoe';

import { SC, CheckboxItem, DynamicForm, HeaderItem, SectionItem, SelectItem, TextItem } from 'smartclient-eval/react';

// a "render target" can be defined to allow JSX to be loaded dynamically into an existing application.  This Showcase sets a
// render target of "showcaseSample" so each JSX file can be loaded and later removed when the user is done with the sample.
let target = SC.getRenderTarget() || "showcaseSample";

let onHoverPersistChanged = function(form,item,value) {return propertiesForm.setHoverPersist(value != '[Unset]' ? value : null);};
let onShowFocusLabelChanged = function(form,item,value) {return propertiesForm.setHoverFocusKey(value ? 'f2' : null);};
let onPropertiesFormTitleHoverHTML = function (item) {
    return propertyDocs[item.name];
};
let onPropertiesFormRefLinkClick = function (attribute) {
    window.open('../isomorphic/system/reference/?id=' + attribute, 'externalReference');
    var colonIndex = attribute.indexOf(':'), prettyAttribute = colonIndex == -1 ? attribute : attribute.substring(colonIndex + 1, attribute.length);
    isc.notify('Documentation for <i>' + prettyAttribute + '</i> opened in a separate window');
};

var propertyDocs = {
    showHeader: '<table role="presentation" width="501px" height="290px" cellspacing="0" cellpadding="0"><tbody><tr><td valign="top" align="left"><table class="normal" width="100%" cellspacing="0" border="0"><tbody><tr><td><b>showHeader</b></td><td align="right"><code><i>type:</i><a href="#" onclick="propertiesForm.refLinkClick(&quot;Boolean&quot;);return false;">Boolean</a>, <i>defaultValue</i>: true</code></td></tr></tbody></table><table class="normal" width="100%" cellspacing="0" border="0"><colgroup><col width="15"><col width="*"></colgroup><tbody><tr><td></td><td><br>If true, show a <a href="#" onclick="propertiesForm.refLinkClick(&quot;attr:Window.header&quot;);return false;">header</a> for this Window. \r' + ' <p>\r' + ' Note that in certain Smartclient skins <a href="#" onclick="propertiesForm.refLinkClick(&quot;attr:Window.showHeaderBackground&quot;);return false;">showHeaderBackground</a> may be set to\r' + ' <code>false</code> and the header\'s appearance implemented as part of the\r' + ' window\'s <a href="#" onclick="propertiesForm.refLinkClick(&quot;attr:Canvas.showEdges&quot;);return false;">edge media</a>. In this case suppressing the header can be achieved\r' + ' by overriding the edge media as well as setting this property to false. For example, to\r' + ' create a headerless window with a similar appearance to a <a href="#" onclick="propertiesForm.refLinkClick(&quot;class:Menu&quot;);return false;">Menu</a> in the\r' + ' <code><i>TreeFrog</i></code> skin, the following attributes could be used:\r' + ' </p><pre>      showHeader:false,\r' + '      edgeImage:"[SKIN]/Menu/m.png",\r' + '      edgeSize:10, edgeTop:17, edgeBottom:17,\r' + '      edgeCenterBackgroundColor:"#F7F7F7"\r' + ' </pre><br><br></td></tr></tbody></table></td></tr></tbody></table>',
    title: '<table role="presentation" width="479px" height="104px" cellspacing="0" cellpadding="0"><tbody><tr><td valign="top" align="left"><table class="normal" width="100%" cellspacing="0" border="0"><tbody><tr><td><b>title</b>&nbsp;<a href="#" onclick="propertiesForm.refLinkClick(&quot;group:flags&quot;);return false;">[IRW]</a></td><td align="right"><code><i>type:</i><a href="#" onclick="propertiesForm.refLinkClick(&quot;type:String&quot;);return false;">String</a> [<a href="#" onclick="propertiesForm.refLinkClick(&quot;type:HTMLString&quot;);return false;">HTMLString</a>], <i>defaultValue</i>: "Untitled Window"</code></td></tr></tbody></table><table class="normal" width="100%" cellspacing="0" border="0"><colgroup><col width="15"><col width="*"></colgroup><tbody><tr><td></td><td><br>Title for this Window, shown if <a href="#" onclick="propertiesForm.refLinkClick(&quot;attr:Window.showTitle&quot;);return false;">showTitle</a> is true in the <a href="#" onclick="propertiesForm.refLinkClick(&quot;attr:Window.header&quot;);return false;">header</a>\r' + ' (if drawn).<br><br></td></tr></tbody></table></td></tr></tbody></table>',
    autoCenter: '<table role="presentation" width="501px" height="201px" cellspacing="0" cellpadding="0"><tbody><tr><td valign="top" align="left"><table class="normal" width="100%" cellspacing="0" border="0"><tbody><tr><td><b>autoCenter</b>&nbsp;<a href="#" onclick="propertiesForm.refLinkClick(&quot;group:flags&quot;);return false;">[IRW]</a></td><td align="right"><code><i>type:</i><a href="#" onclick="propertiesForm.refLinkClick(&quot;type:Boolean&quot;);return false;">Boolean</a> [<a href="#" onclick="propertiesForm.refLinkClick(&quot;type:boolean&quot;);return false;">boolean</a>], <i>defaultValue</i>: true</code></td></tr></tbody></table><table class="normal" width="100%" cellspacing="0" border="0"><colgroup><col width="15"><col width="*"></colgroup><tbody><tr><td></td><td><br>If true, this Window widget will automatically be centered on the page when shown.\r' + '      If false, it will show up in the last position it was placed (either programmatically,\r' + '      or by user interaction).\r' + '      <p>\r' + '      <b>Note:</b> If an auto-centering Window is either programmatically moved or dragged \r' + '      by an end user, auto-centering behavior is automatically turned off. To manually center \r' + '      a Window, you can use <a href="#" onclick="propertiesForm.refLinkClick(&quot;method:Window.centerInPage&quot;);return false;">centerInPage()</a>.<br><br></p></td></tr></tbody></table></td></tr></tbody></table>\r',
    autoSize: '<table role="presentation" width="501px" height="119px" cellspacing="0" cellpadding="0"><tbody><tr><td valign="top" align="left"><table class="normal" width="100%" cellspacing="0" border="0"><tbody><tr><td><b>autoSize</b>&nbsp;<a href="#" onclick="propertiesForm.refLinkClick(&quot;group:flags&quot;);return false;">[IRW]</a></td><td align="right"><code><i>type:</i><a href="#" onclick="propertiesForm.refLinkClick(&quot;type:Boolean&quot;);return false;">Boolean</a>, <i>defaultValue</i>: false</code></td></tr></tbody></table><table class="normal" width="100%" cellspacing="0" border="0"><colgroup><col width="15"><col width="*"></colgroup><tbody><tr><td></td><td><br>If true, the window is resized automatically to accommodate the contents\r' + '\t\t\tof the body, if they would otherwise require scrolling.<br><br></td></tr></tbody></table></td></tr></tbody></table>',
    isModal: '<table role="presentation" width="501px" height="254px" cellspacing="0" cellpadding="0"><tbody><tr><td valign="top" align="left"><table class="normal" width="100%" cellspacing="0" border="0"><tbody><tr><td><b>isModal</b>&nbsp;<a href="#" onclick="propertiesForm.refLinkClick(&quot;group:flags&quot;);return false;">[IRW]</a></td><td align="right"><code><i>type:</i><a href="#" onclick="propertiesForm.refLinkClick(&quot;type:Boolean&quot;);return false;">Boolean</a> [<a href="#" onclick="propertiesForm.refLinkClick(&quot;type:boolean&quot;);return false;">boolean</a>], <i>defaultValue</i>: true</code></td></tr></tbody></table><table class="normal" width="100%" cellspacing="0" border="0"><colgroup><col width="15"><col width="*"></colgroup><tbody><tr><td></td><td><br>If true, when shown this Window will intercept and block events to all other existing\r' + ' components on the page.\r' + ' <p>\r' + ' Use <a href="#" onclick="propertiesForm.refLinkClick(&quot;attr:Window.showModalMask&quot;);return false;">showModalMask</a> to darken all other elements on the screen when a modal dialog\r' + ' is showing.\r' + ' </p><p>\r' + ' Chained modal windows - that is, modal windows that launch other modal windows - are\r' + ' allowed.  You can accomplish this by simply creating a second modal Window while a modal\r' + ' Window is showing.\r' + ' </p><p>\r' + ' Note only top-level Windows (Windows without parents) can be modal.<br><br></p></td></tr></tbody></table></td></tr></tbody></table>',
    showModalMask: '<table role="presentation" width="501px" height="162px" cellspacing="0" cellpadding="0"><tbody><tr><td valign="top" align="left"><table class="normal" width="100%" cellspacing="0" border="0"><tbody><tr><td><b>showModalMask</b>&nbsp;<a href="#" onclick="propertiesForm.refLinkClick(&quot;group:flags&quot;);return false;">[IR]</a></td><td align="right"><code><i>type:</i><a href="#" onclick="propertiesForm.refLinkClick(&quot;type:Boolean&quot;);return false;">Boolean</a> [<a href="#" onclick="propertiesForm.refLinkClick(&quot;type:boolean&quot;);return false;">boolean</a>], <i>defaultValue</i>: null</code></td></tr></tbody></table><table class="normal" width="100%" cellspacing="0" border="0"><colgroup><col width="15"><col width="*"></colgroup><tbody><tr><td></td><td><br>If true, displays a translucent mask over the rest of the page when a modal window\r' + ' is displayed.<br><br><b>See Also:</b><br>&nbsp;&nbsp;<a href="#" onclick="propertiesForm.refLinkClick(&quot;attr:Window.modalMask&quot;);return false;">Window.modalMask</a> <br><br></td></tr></tbody></table></td></tr></tbody></table>'
};

// SC.render() calls ReactDOM.render() in React pre-18, and
// ReactDOM.createRoot().render() in React 18+, to avoid deprecation warnings.
SC.render(
    <>
        <DynamicForm ID="pickerForm" numCols="4" wrapItemTitles="false">
            <fields>
                <SelectItem name="hoverPersist" title="Hover Mode" defaultValue="[Unset]" changed={onHoverPersistChanged}>
                    <valueMap>
                            <value>[Unset]</value>
                            <value>none</value>
                            <value>underMouse</value>
                            <value>clickPin</value>
                            <value>autoPin</value>
                    </valueMap>
                </SelectItem>
                <CheckboxItem defaultValue="true" name="showFocusLabel" title="Show &apos;Press f2&apos; Label" changed={onShowFocusLabelChanged}/>
            </fields>
        </DynamicForm>

        <DynamicForm ID="propertiesForm" width="320" top="50" padding="5" border="1px solid black" cellStyle="propSheetValue" titleStyle="propSheetTitle" hoverFocusKey="f2" titleHoverHTML={onPropertiesFormTitleHoverHTML} refLinkClick={onPropertiesFormRefLinkClick}>
            <fields>
                <HeaderItem value="Attributes for Window component"/>
                <SectionItem sectionExpanded="true" value="Header">
                    <itemIds>
                        <value>showHeader</value>
                        <value>title</value>
                    </itemIds>
                </SectionItem>
                <CheckboxItem defaultValue="true" labelAsTitle="true" name="showHeader"/>
                <TextItem name="title" width="180"/>
                <SectionItem sectionExpanded="true" value="Size / Position">
                    <itemIds>
                        <value>autoCenter</value>
                        <value>autoSize</value>
                    </itemIds>
                </SectionItem>
                <CheckboxItem labelAsTitle="true" name="autoCenter"/>
                <CheckboxItem labelAsTitle="true" name="autoSize"/>
                <SectionItem sectionExpanded="true" value="Modality">
                    <itemIds>
                        <value>isModal</value>
                        <value>showModalMask</value>
                    </itemIds>
                </SectionItem>
                <CheckboxItem labelAsTitle="true" name="isModal"/>
                <CheckboxItem labelAsTitle="true" name="showModalMask"/>
            </fields>
        </DynamicForm>
    </>,
    document.getElementById(target)
);
