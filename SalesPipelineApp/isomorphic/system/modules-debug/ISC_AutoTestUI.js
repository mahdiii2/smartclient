/*

  SmartClient Ajax RIA system
  Version v14.1p_2025-06-14/EVAL Development Only (2025-06-14)

  Copyright 2000 and beyond Isomorphic Software, Inc. All rights reserved.
  "SmartClient" is a trademark of Isomorphic Software, Inc.

  LICENSE NOTICE
     INSTALLATION OR USE OF THIS SOFTWARE INDICATES YOUR ACCEPTANCE OF
     ISOMORPHIC SOFTWARE LICENSE TERMS. If you have received this file
     without an accompanying Isomorphic Software license file, please
     contact licensing@isomorphic.com for details. Unauthorized copying and
     use of this software is a violation of international copyright law.

  DEVELOPMENT ONLY - DO NOT DEPLOY
     This software is provided for evaluation, training, and development
     purposes only. It may include supplementary components that are not
     licensed for deployment. The separate DEPLOY package for this release
     contains SmartClient components that are licensed for deployment.

  PROPRIETARY & PROTECTED MATERIAL
     This software contains proprietary materials that are protected by
     contract and intellectual property law. You are expressly prohibited
     from attempting to reverse engineer this software or modify this
     software for human readability.

  CONTACT ISOMORPHIC
     For more information regarding license rights and restrictions, or to
     report possible license violations, please contact Isomorphic Software
     by email (licensing@isomorphic.com) or web (www.isomorphic.com).

*/

if(window.isc&&window.isc.module_Core&&!window.isc.module_AutoTestUI){isc.module_AutoTestUI=1;isc._moduleStart=isc._AutoTestUI_start=(isc.timestamp?isc.timestamp():new Date().getTime());if(isc._moduleEnd&&(!isc.Log||(isc.Log && isc.Log.logIsDebugEnabled('loadTime')))){isc._pTM={ message:'AutoTestUI load/parse time: ' + (isc._moduleStart-isc._moduleEnd) + 'ms', category:'loadTime'};
if(isc.Log && isc.Log.logDebug)isc.Log.logDebug(isc._pTM.message,'loadTime');
else if(isc._preLog)isc._preLog[isc._preLog.length]=isc._pTM;
else isc._preLog=[isc._pTM]}isc.definingFramework=true;isc.defineClass("EventStreamViewer","VLayout");
isc.A=isc.EventStreamViewer.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.defaultWidth=450;
isc.A.defaultHeight=200;
isc.A.eventGridDefaults={
        _constructor:"ListGrid",
        sortField:"eventTime",
        sortDirection:"descending",
        selectionType:"single",
        hoverAutoFitMaxWidth:"80%",
        showClippedValuesOnHover:true,
        datetimeFormatter:"toSerializeableDate",
        canShowFilterEditor:true,
        defaultFields:[{
            name:"eventType",title:"Event Type",width:100
        },{
            name:"keyName",title:"Key Name(s)",hidden:true,width:100,
            formatCellValue:function(value,record,rowNum,colNum,grid){
                return record.keyNames||record.keyName;
            }
        },{
            name:"count",title:"Count",type:"integer",hidden:true,width:60
        },{
            name:"targetID",title:"Target Canvas",
            formatCellValue:function(value,record,rowNum,colNum,grid){
                return value?"["+record.targetClass+" ID: "+value+"]":"-";
            }
        },{
            name:"locator",title:"SmartClient Locator"
        },{
            name:"fileName",title:"File Name",hidden:true
        },{
            name:"fileVersion",title:"File Version",type:"datetime",width:160,
            hidden:true,align:"left"
        },{
            name:"fileType",title:"File Type",hidden:true,width:100
        },{
            name:"URL",hidden:true
        },{
            name:"eventTime",title:"Event Time",hidden:true,width:160,
            formatCellValue:function(value,record,rowNum,colNum,grid){
                return new Date(value).toNormalDate();
            }
        },{
            name:"timeOffset",title:"Time Offset",width:150,
            formatCellValue:function(value,record,rowNum,colNum,grid){
                return isc.EventStreamViewer.formatTimeOffset(value);
            }
        },{
            name:"errorTrace",title:"Error Trace",
            showValueIconOnly:true,showHover:true,hidden:true,
            hoverHTML:function(record){
                var errorTrace=record.errorTrace;
                return errorTrace?"<span style='white-space: pre'>"+errorTrace+"</span>":
                                    null;
            }
        }],
        _$errorIcon:"[SKIN]../../../../system/reference/skin/images/DocPrefsDialog/cancel.png",
        contentWindowConstructor:"ContentViewerWindow",
        contentWindowDefaults:{
            title:"Error Trace"
        },
        getValueIcon:function(field,value,record){
            return field.name=="errorTrace"&&value?this._$errorIcon:null;
        },
        normalizeStreamData:function(eventStreamData){
            if(eventStreamData==null||eventStreamData._normalized){
                return;
            }
            eventStreamData._normalized=true;
            var startTime=eventStreamData.startTime.getTime(),
                lastErrorOffset=eventStreamData.lastErrorOffset,
                timeOffset,events=eventStreamData.events;
            for(var i=0,lastOffset=lastErrorOffset||0;i<events.length;
                 i++,lastOffset=timeOffset)
            {
                timeOffset=events[i].timeOffset;
                events[i].eventTime=timeOffset+startTime;
                events[i].timeOffset=timeOffset-lastOffset;
            }
        },
        showLoadingDataMessage:function(){
            if(this._emptyMessage)return;
            this._emptyMessage=this.emptyMessage;
            this.emptyMessage=this.loadingDataMessage;
            this.setData([]);
        },
        setDataFromEventStream:function(eventStreamData){
            if(this._emptyMessage){
                this.emptyMessage=this._emptyMessage;
                delete this._emptyMessage;
            }
            this.normalizeStreamData(eventStreamData);
            this.setData(eventStreamData?eventStreamData.events.duplicate():[]);
        },
        selectionChanged:function(record){
            var debugTarget=window.debugTarget;
            if(!this.anySelected()||!this.creator.crossWindow||!debugTarget){
                return;
            }
            if(record&&record.targetID){
                debugTarget.call("isc.Log.hiliteCanvas",[record.targetID,true]);
            }
        },
        recordClick:function(viewer,record,recordNum,field){
            if(field.name!="errorTrace")return;
            if(!this.contentWindow)this.addAutoChild("contentWindow");
            this.contentWindow.showContent(record.errorTrace);
        }
    };
isc.A.streamPickerDefaults={
        _constructor:"DynamicForm",
        colWidths:[125,"*",70,5,110],numCols:5,
        updateStreamData:function(dropOrphanedData){
            var debugTarget=window.debugTarget;
            if(!debugTarget){
                this.logInfo("no cross-window DMI; skipping updating stream summaries",
                             "eventStreamViewer");
                return;
            }
            var form=this,
                viewer=form.creator;
            debugTarget.call("isc.EventStream.getStreamValueMap",[],function(valueMap){
                var startTime=form.getValue("startTime");
                form.setValueMap("startTime",valueMap);
                form.markForRedraw("new stream state");
                if(!startTime&&!dropOrphanedData&&viewer.eventStream!=null){
                    return;
                }
                if(!startTime){
                    var select=form.getItem("startTime");
                    select.setUpPickList();
                    var first=select.pickList.getRecord(0);
                    startTime=first?first.startTime:null;
                    select.setValue(startTime);
                }
                if(!startTime||valueMap[startTime]){
                    viewer.loadEventStream(startTime);
                }
            });
        },
        initWidget:function(){
            this.Super("initWidget",arguments);
            this.updateStreamData();
        },
        items:[{
            name:"startTime",title:"Available EventStreams",
            editorType:"SelectItem",type:"datetime",
            width:"100%",wrapTitle:false,
            sortField:"startTime",
            valueField:"startTime",
            displayField:"summary",
            addUnknownValues:false,
            pickListProperties:{},
            emptyDisplayValue:
                "<span style='text-align:center'>(no active stream selected)</span>",
            dateFormatter:"toLocaleString",
            pickListFields:[{
                name:"summary",type:"text",align:"left",width:"100%"
            }],
            init:function(){
                this.Super("init",arguments);
                this.makePickList();
            },
            changed:function(form){
                var record=this.getSelectedRecord();
                form.creator.loadEventStream(record.startTime);
            }
        },{
            name:"refresh",showTitle:false,
            icon:"[SKINIMG]/headerIcons/refresh.png",
            editorType:"ButtonItem",
            startRow:false,endRow:false,
            click:function(form,item){
                form.updateStreamData(true);
            }
        },{
            _$captureKey:"eventStream_capture",
            _$getCapture:"isc.EventStream.getCommonStreamCapture",
            _$setCapture:"isc.EventStream.setCommonStreamCapture",
            name:"capture",title:"Capture Events",
            editorType:"CheckboxItem",disabled:true,width:110,
            prompt:"Click to toggle capturing by the built-in EventStream",
            init:function(){
                this.Super("init",arguments);
                var debugTarget=window.debugTarget,
                    capturing=isc.LogViewer.getGlobalLogCookieValue(this._$captureKey);
                if(isc.isA.Boolean(capturing)){
                    if(debugTarget)debugTarget.call(this._$setCapture,[capturing]);
                    this.setValue(capturing);
                    this.setDisabled(false);
                    return;
                }
                if(debugTarget){
                    var item=this;
                    debugTarget.call(this._$getCapture,[],function(capturing){
                        item.setValue(capturing);
                        item.setDisabled(false);
                    });
                }
            },
            changed:function(form,item,value){
                var debugTarget=window.debugTarget;
                if(debugTarget)debugTarget.call(this._$setCapture,[value]);
                isc.LogViewer.setGlobalLogCookieValue(this._$captureKey,value);
            }
        }]
    };
isc.A.viewerControlsDefaults={
        _constructor:"DynamicForm",width:1,
        colWidths:[50,150,70,100],numCols:4,
        values:{filename:"events"},
        layoutAlign:"right",
        items:[{
            name:"filename",
            title:"Filename",
            width:"*"
        },{
            name:"export",editorType:"ButtonItem",
            icon:"[SKINIMG]/actions/save.png",
            startRow:false,endRow:false,
            click:function(form,item){
                var grid=form.creator.eventGrid,
                    filename=form.getValue("filename"),
                    exportAs=form.getValue("exportType")
                ;
                grid.exportClientData({
                    exportAs:exportAs,
                    exportFilename:filename,
                    exportPropertyIdentifier:"title"
                });
            }
        },{
            name:"exportType",type:"select",
            showTitle:false,width:"*",
            defaultToFirstOption:true,
            redrawOnChange:true,
            valueMap:{
                "csv":"CSV",
                "xml":"XML",
                "xls":"XLS (Excel97)",
                "ooxml":"OOXML (Excel2007)"
            }
        }]
    };
isc.B.push(isc.A.initWidget=function isc_EventStreamViewer_initWidget(){
        this.Super("initWidget",arguments);
        if(this.showStreamPicker&&!this.crossWindow){
            this.logWarn("stream picker requires cross-window communications",
                         "eventStreamViewer");
            this.showStreamPicker=false;
        }
        if(this.showStreamPicker==null){
            this.showStreamPicker=!this.eventStream&&!!this.crossWindow;
        }
        this.addAutoChild("streamPicker",{
            viewer:this
        });
        this.addAutoChild("eventGrid",{
            viewer:this
        });
        this.addAutoChild("viewerControls",{
            viewer:this
        });
        if(this.eventStream)this.setEventStream(this.eventStream);
    }
,isc.A.updateStreamData=function isc_EventStreamViewer_updateStreamData(){
        if(this.streamPicker)this.streamPicker.updateStreamData();
    }
,isc.A.setEventStream=function isc_EventStreamViewer_setEventStream(eventStreamData){
        if(this.streamPicker)this.streamPicker.setValue("startTime",null);
        this._setEventStream(eventStreamData);
    }
,isc.A._setEventStream=function isc_EventStreamViewer__setEventStream(eventStreamData){
        this.eventStream=eventStreamData;
        this.eventGrid.setDataFromEventStream(eventStreamData);
    }
,isc.A.loadEventStream=function isc_EventStreamViewer_loadEventStream(startTime){
        if(startTime==null)this._setEventStream();
        var debugTarget=window.debugTarget;
        if(!this.crossWindow||!debugTarget){
            this.logWarn("loading eventStreamData by date requires cross-window DMI",
                         "eventStreamViewer");
            return;
        }
        var passedTime=startTime;
        if(!isc.isA.Date(startTime)){
            if(startTime==parseInt(startTime)){
                startTime=new Date(parseInt(startTime));
            }else if(isc.isA.String(startTime)){
                startTime=isc.DateUtil.parseSchemaDate(startTime);
            }
        }
        if(!isc.isA.Date(startTime)||!isFinite(startTime)){
            this.logWarn("can't load eventStreamDate - invalid date '"+passedTime+"'",
                         "eventStreamViewer");
            return;
        }
        this.eventGrid.showLoadingDataMessage();
        var viewer=this;
        debugTarget.call("isc.EventStream.getEventStreamData",[startTime],function(esData){
            if(this.streamPicker&&this.streamPicker.getValue("startTime")==null){
                this.logInfo("setEventStreamData() called; dropping cross-window data");
                return;
            }
            viewer._setEventStream(esData);
        });
    }
);
isc.B._maxIndex=isc.C+5;

isc.A=isc.EventStreamViewer;
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.B.push(isc.A.formatTimeOffset=function isc_c_EventStreamViewer_formatTimeOffset(offset){
        if(offset<60000){
            var seconds=Math.floor(offset/1000),
                millis=offset%1000;
            return seconds+(seconds!=1?" seconds, ":" second, ")+
                millis+" millis";
        }
        var minutes=Math.floor(offset/60000),
            seconds=Math.floor((offset%60000)/1000);
        return minutes+"m, "+seconds+"s";
    }
);
isc.B._maxIndex=isc.C+1;

isc.defineClass("SeleneseCommandDataSource","DataSource");
isc.A=isc.SeleneseCommandDataSource.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.clientOnly=true;
isc.A.fields=[{
        name:"commandName",width:150,required:true
    },{
        name:"argument1",title:"Argument 1"
    },{
        name:"argument2",title:"Argument 2"
    },{
        name:"description"
    },{
        name:"onFailure",type:"enum",width:100,xmlAttribute:true,
        valueMap:["continue","stop","retry"]
    },{
        name:"screenshot",type:"boolean",xmlAttribute:true
    },{
        name:"waitFor",type:"boolean",xmlAttribute:true,
        valueMap:[true,null]
    }];
isc.A.fieldDefaults={
        commandName:"click",
        onFailure:"stop",
        waitFor:true
    };
isc.A.commandDescription={
        open:"load page",
        type:"type in ${target}",
        click:"click on ${target}",
        sendKeys:"send keys to ${target}",
        doubleClick:"double click on ${target}",
        waitForElementClickable:"wait for ${target} to become clickable",
        waitForElementReadyForKeyPresses:"wait for ${target} to accept typing"
    };
isc.B.push(isc.A.canonicalizeRecord=function isc_SeleneseCommandDataSource_canonicalizeRecord(record){
        isc.addDefaults(record,this.fieldDefaults);
        var description=this.commandDescription[record.commandName];
        if(!description)return;
        var target=record._argument1Class||"target";
        record.description=description.evalDynamicString(this,{target:target});
    }
);
isc.B._maxIndex=isc.C+1;

isc.SeleneseCommandDataSource.getPrototype().fields.find("name","commandName").valueMap=[
    "open",
    "click",
    "clickAndHold",
    "clickAndHoldAt",
    "contextClick",
    "doubleClick",
    "release",
    "releaseAt",
    "mouseMove",
    "mouseMoveAt",
    "dragAndDrop",
    "dragAndDropBy",
    "type",
    "sendKeys",
    "sendData",
    "keyPress",
    "keyDown",
    "keyUp",
    "shiftKeyDown",
    "shiftKeyUp",
    "controlKeyDown",
    "controlKeyUp",
    "focus",
    "blur",
    "pause",
    "selectTab",
    "selectNextTab",
    "selectPreviousTab",
    "closeTab",
    "closeCurrentTab",
    "selectListGridItem",
    "storeEval",
    "storeValue",
    "storeVariable",
    "setValueTolerance",
    "setElementTolerance",
    "setCanvasWidthTolerance",
    "setCanvasHeightTolerance",
    "clearTolerances",
    "setCanvasPropertyTrue",
    "setCanvasPropertyFalse",
    "clearCanvasProperty",
    "verifyElementWidth",
    "verifyElementHeight",
    "verifyElementPositionLeft",
    "verifyElementPositionTop",
    "verifyElementPresent",
    "verifyElementVisible",
    "verifyElementSelected",
    "verifyElementClickable",
    "verifyElementReadyForKeyPresses",
    "verifyCanvasWidth",
    "verifyCanvasHeight",
    "verifyElementWidthWithTolerance",
    "verifyElementHeightWithTolerance",
    "verifyValue",
    "verifyValueWithTolerance",
    "verifyValueEmpty",
    "verifyText",
    "verifyTextPresent",
    "verifyTitle",
    "waitForElementClickable",
    "waitForElementNotClickable",
    "waitForElementVisible",
    "waitForElementNotVisible",
    "waitForElementPresent",
    "waitForElementNotPresent",
    "waitForElementReadyForKeyPresses",
    "waitForCanvasDone",
    "waitForGridDone",
    "waitForTileGridDone",
    "waitForTileLayoutDone",
    "waitForFormDone",
    "waitForItemDone",
    "waitForSystemDone",
    "waitForText",
    "waitForHoverTextPresent",
    "waitForValue",
    "waitForCondition",
    "waitForEval",
    "assertEval"
].sort();
isc.defineClass("SeleneseGrid","ListGrid");
isc.A=isc.SeleneseGrid.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.canEdit=true;
isc.A.canGroup=false;
isc.A.saveLocally=true;
isc.A.showRowNumbers=true;
isc.A.canRemoveRecords=true;
isc.A.canReorderRecords=true;
isc.A.showCellContextMenus=true;
isc.A.showClippedValuesOnHover=true;
isc.A.useAllDataSourceFields=true;
isc.A.breakpoints=[];
isc.A.hilites=[{
        id:"commandSuccess",cssText:"color: #009800;"
    },{
        id:"commandFailure",cssText:"color: red;"
    },{
        id:"startPoint",cssText:"font-weight: bold; color: purple;",
        criteria:{_isStartPoint:true},fieldName:"_rowNumberField"
    },{
        id:"breakpoint",cssText:"font-weight: bold; color: purple;",
        criteria:{_isBreakpoint:true},fieldName:"_rowNumberField"
    },{
        id:"insertionPoint",cssText:"font-weight: bold; color: purple;",
        criteria:{_isInsertionPoint:true},fieldName:"_rowNumberField"
    }];
isc.A.defaultFields=[{
        name:"commandName",
        editorType:"ComboBoxItem"
    },{
        name:"screenshot",
        valueMap:[true,false,null],
        editorProperties:{
            allowEmptyValue:true
        }
    },{
        name:"waitFor"
    },{
        name:"output",title:"Output",
        canEdit:false,canHover:true,showHover:true,
        autoFitWidth:true,autoFitWidthApproach:"title",
        showValueIconOnly:true,
        hoverHTML:function(record){
            return record.output;
        },
        recordClick:function(viewer,record){
            if(!record.output)return;
            var title=viewer.creator.commandOutputWindowTitle;
            viewer.showContent(title,record.output);
            return false;
        }
    },{
        name:"shotfile",showTitle:false,canEdit:false,
        icon:"[SKIN]/actions/color_swatch.png",cellIcon:null,
        showValueIconOnly:true,
        recordClick:function(viewer,record,recordNum){
            var shotfile=record.shotfile;
            if(!shotfile)return;
            var player=viewer.creator,
                scriptName=player.getScriptName(),
                rowNumber=recordNum+viewer.rowNumberStart
            ;
            player.downloadScreenshot(
                shotfile,scriptName+".r"+rowNumber+".png"
            );
        }
    },{
        name:"failureCount",title:"Fails",type:"integer",
        autoFitWidth:true,autoFitWidthApproach:"title",hidden:true
    }];
isc.A.outputWindowDefaults={
        _constructor:"ContentViewerWindow"
    };
isc.B.push(isc.A.initWidget=function isc_SeleneseGrid_initWidget(){
        this.Super("initWidget",arguments);
        this.initCacheData(this.observeStream());
    }
,isc.A.initCacheData=function isc_SeleneseGrid_initCacheData(initialCommands){
        for(var i=0;i<initialCommands.length;i++){
            this.creator.canonicalizeCommand(initialCommands[i]);
            initialCommands[i].id=i+1;
        }
        this.setData(initialCommands);
    }
,isc.A.observeStream=function isc_SeleneseGrid_observeStream(skipExisting){
        var grid=this,
            recorder=grid.creator,
            stream=this.eventStream
        ;
        var initialCommands=stream.setSeleneseListener(function(newCommands,url){
            var data=grid.data,
                openURLChanged=recorder.setOpenURL(url);
            if(newCommands.length&&!data.length)newCommands.unshift({
                commandName:"open",argument1:recorder.openURL
            });
            for(var i=0;i<newCommands.length;i++){
                recorder.canonicalizeCommand(newCommands[i]);
            }
            var rowNum=grid.getCommandInsertionPoint();
            if(rowNum==null)data.addList(newCommands);
            else data.addListAt(newCommands,rowNum);
        },this.captureSettings,this.reportingDelay,skipExisting);
        return initialCommands;
    }
,isc.A.clearData=function isc_SeleneseGrid_clearData(){
        this.setData([]);
        this.observeStream(true);
    }
,isc.A.isBreakpoint=function isc_SeleneseGrid_isBreakpoint(record){
        return this.breakpoints.contains(record);
    }
,isc.A.configureForRunning=function isc_SeleneseGrid_configureForRunning(){
        this.setCanReorderRecords(false);
    }
,isc.A.configureForEditing=function isc_SeleneseGrid_configureForEditing(){
        this.setCanReorderRecords(true);
    }
,isc.A.dataChanged=function isc_SeleneseGrid_dataChanged(){
        this.Super("dataChanged",arguments);
        this.creator.updateRunModeFromData(this.data);
    }
,isc.A.dataSetChanged=function isc_SeleneseGrid_dataSetChanged(){
        this.Super("dataSetChanged",arguments);
        this.creator.updateRunModeFromData(this.data);
    }
,isc.A._initTriStateValueIcons=function isc_SeleneseGrid__initTriStateValueIcons(field){
        var tree=isc.TreeGrid.getPrototype();
        field.valueIcons={
            true:tree.booleanTrueImage,
            false:tree.booleanFalseImage,
            null:tree.booleanPartialImage,
            undefined:tree.booleanPartialImage
        };
        field.valueIconWidth=this.booleanImageWidth;
        field.valueIconHeight=this.booleanImageHeight;
    }
,isc.A.getValueIcon=function isc_SeleneseGrid_getValueIcon(field,value,record){
        switch(field.name){
        case"output":
            return value?"[SKIN]/../DynamicForm/text_control.gif":null;
        case"shotfile":
            return value?"[SKIN]/../actions/color_swatch.png":null;
        case"screenshot":
            if(!field.valueIcons)this._initTriStateValueIcons(field);
        }
        return this.invokeSuper(isc.SeleneseGrid,"getValueIcon",field,value,record);
    }
,isc.A.selectionUpdated=function isc_SeleneseGrid_selectionUpdated(record){
        this.provideRuleContext("commandGrid/hasSelection",!!record);
    }
,isc.A.removeRecordClick=function isc_SeleneseGrid_removeRecordClick(rowNum,colNum){
        if(!this.creator.isRunning()){
            this.invokeSuper(isc.SeleniumPlaybackGrid,"removeRecordClick",rowNum,colNum);
        }
    }
,isc.A._setPasteBuffer=function isc_SeleneseGrid__setPasteBuffer(records){
        for(var i=0;i<records.length;i++){
            var record=this.getCleanRecordData(records[i]);
            delete record[this.hiliteProperty];
            records[i]=record;
        }
        this.pasteBuffer=records;
    }
,isc.A.isMetaDataProperty=function isc_SeleneseGrid_isMetaDataProperty(propName){
        if(propName=="_isBreakpoint"||
            propName=="_isStartPoint"||
            propName=="failureCount"||
            propName=="errorCount"||
            propName=="shotfile"||
            propName=="output")
        {
            return true;
        }
        return this.Super("isMetaDataProperty",arguments);
    }
,isc.A._getContextSelectionItems=function isc_SeleneseGrid__getContextSelectionItems(record,rowNum){
        if(!this.getSelectedRecord())return[];
        return[{
            title:"Cut Selected",
            click:function(target){
                var selection=target.getSelection();
                for(var i=selection.length-1;i>=0;i--){
                    target.removeData(selection[i]);
                }
                target._setPasteBuffer(selection);
                isc.notify(selection.length+" record(s) cut to the paste buffer");
            }
        },{
            title:"Copy Selected",
            click:function(target){
                var selection=target.getSelection();
                target._setPasteBuffer(selection);
                isc.notify(selection.length+" record(s) copied to the paste buffer");
            }
        },{
            title:"Delete Selected",
            click:function(target){
                var selection=target.getSelection();
                if(selection.length==1){
                    target.removeData(selection[0]);
                    return;
                }
                target.creator.beginDialogInteraction();
                isc.confirm("OK to delete "+selection.length+" commands?",
                    function(value){
                        target.creator.endDialogInteraction();
                        if(value)for(var i=selection.length-1;i>=0;i--){
                            target.removeData(selection[i]);
                        }
                    }
                );
            }
        },{
            title:"Mass Edit Selected",
            click:function(target){
                target.creator.openMassEditWindow();
            }
        }];
    }
,isc.A._getContextRecordertItems=function isc_SeleneseGrid__getContextRecordertItems(record,rowNum){
        var items=[{isSeparator:true}];
        if(this.insertionPoint!=null)items.add({
            title:"Clear Insertion Point",
            click:function(target){
                target._clearCommandInsertionPoint();
            }
        });
        if(rowNum!=null&&this.insertionPoint!=record){
            items.add({
                title:"Set Insertion point",
                click:function(target,item,menu){
                    target._setCommandInsertionPoint(record,rowNum);
                }
            });
        };
        if(items.last().isSeparator)items.pop();
        return items;
    }
,isc.A._getContextPlayerItems=function isc_SeleneseGrid__getContextPlayerItems(record,rowNum){
        var items=[];
        var startPoint=this.startPoint,
            breakpoints=this.breakpoints
        ;
        if(record&&startPoint!=record)items.add({
            title:"Set Start Point Here",
            click:function(target,item,menu){
                if(breakpoints.contains(record)){
                    target._clearBreakpoint(record,rowNum);
                }
                target._setRunStartPoint(record,rowNum);
            }
        });
        if(startPoint)items.add({
            title:"Clear Start Point",
            click:function(target,item,menu){
                target._clearRunStartPoint();
            }
        });
        if(record&&!breakpoints.contains(record))items.add({
            title:"Set Breakpoint Here",
            click:function(target,item,menu){
                if(startPoint==record){
                    target._clearRunStartPoint();
                }
                target._setBreakpoint(record,rowNum);
            }
        });
        if(record&&breakpoints.contains(record))items.add({
            title:"Clear This Breakpoint",
            click:function(target,item,menu){
                target._clearBreakpoint(record,rowNum);
            }
        });
        if(breakpoints.length)items.add({
            title:"Clear All Breakpoints",
            click:function(target,item,menu){
                target._clearAllBreakpoints();
            }
        });
        return items;
    }
,isc.A.getCellContextMenuItems=function isc_SeleneseGrid_getCellContextMenuItems(record,rowNum){
        var items=[];
        if(this.creator.canEdit()){
            var buffer=this.pasteBuffer;
            if(buffer&&buffer.length)items.add({
                title:"Paste Commands Here",
                click:function(target,item,menu){
                    var data=target.data,
                        records=target.pasteBuffer
                    ;
                    if(rowNum==null)data.addList(records);
                    else data.addListAt(records,rowNum);
                    target.pasteBuffer=isc.shallowClone(records);
                }
            });
            items.add({
                title:"Add New Command Here",
                click:function(target,item,menu){
                    target.startEditingNewAtRow(rowNum);
                }
            });
            items.addList(this._getContextSelectionItems(record,rowNum));
            items.addList(this._getContextRecordertItems(record,rowNum));
        }
        items.addList(this._getContextPlayerItems(record,rowNum));
        return items;
    }
,isc.A.showContextMenu=function isc_SeleneseGrid_showContextMenu(){
        var items=this.getCellContextMenuItems();
        var menu=this.contextMenu;
        if(menu)menu.setItems(items);
        else this.contextMenu={items:items};
        return this.invokeSuper(isc.SeleneseGrid,"showContextMenu");
    }
,isc.A.startEditingNewAtRow=function isc_SeleneseGrid_startEditingNewAtRow(rowNum){
        var commandDefaults=this.creator.getCommandDefaults();
        if(rowNum==null)this.startEditingNew(commandDefaults);
        else{
            var newRecord=isc.addProperties({},commandDefaults);
            this.data.addAt(newRecord,rowNum);
            this.startEditing(rowNum);
        }
    }
,isc.A.removeData=function isc_SeleneseGrid_removeData(record,b,c,d){
        this._removeMetaData(record);
        return this.invokeSuper(isc.SeleniumGrid,"removeData",record,b,c,d);
    }
,isc.A._removeMetaData=function isc_SeleneseGrid__removeMetaData(record){
        if(record==this.insertionPoint){
            this._clearCommandInsertionPoint();
        }
        if(record==this.startPoint){
            this._clearRunStartPoint();
        }
        if(this.breakpoints.contains(record)){
            this._clearBreakpoint(record);
        }
    }
,isc.A._clearCommandInsertionPoint=function isc_SeleneseGrid__clearCommandInsertionPoint(internal){
        var record=this.insertionPoint,
            rowNum=this.getRecordIndex(record);
        if(rowNum>=0){
            delete record._isInsertionPoint;
        }
        delete this.insertionPoint;
        if(!internal){
            this._recordMetaDataChanged(rowNum);
        }
    }
,isc.A._setCommandInsertionPoint=function isc_SeleneseGrid__setCommandInsertionPoint(record,rowNum){
        this._clearCommandInsertionPoint(true);
        record._isInsertionPoint=true;
        this.insertionPoint=record;
        this._recordMetaDataChanged(rowNum);
    }
,isc.A.getCommandInsertionPoint=function isc_SeleneseGrid_getCommandInsertionPoint(){
        var record=this.insertionPoint,
            rowNum=this.getRecordIndex(record);
        if(rowNum>=0)return rowNum;
    }
,isc.A._clearRunStartPoint=function isc_SeleneseGrid__clearRunStartPoint(internal){
        var record=this.startPoint,
            rowNum=this.getRecordIndex(record);
        if(rowNum>=0){
            delete record._isStartPoint;
        }
        delete this.startPoint;
        if(!internal){
            this._recordMetaDataChanged(rowNum);
        }
    }
,isc.A._setRunStartPoint=function isc_SeleneseGrid__setRunStartPoint(record,rowNum){
        this._clearRunStartPoint(true);
        record._isStartPoint=true;
        this.startPoint=record;
        this._recordMetaDataChanged(rowNum);
    }
,isc.A._setBreakpoint=function isc_SeleneseGrid__setBreakpoint(record,rowNum){
        record._isBreakpoint=true;
        this.breakpoints.add(record);
        this._recordMetaDataChanged(rowNum);
    }
,isc.A._clearBreakpoint=function isc_SeleneseGrid__clearBreakpoint(record,rowNum){
        delete record._isBreakpoint;
        this.breakpoints.remove(record);
        this._recordMetaDataChanged(rowNum);
    }
,isc.A._clearAllBreakpoints=function isc_SeleneseGrid__clearAllBreakpoints(){
        var breakpoints=this.breakpoints;
        for(var i=0;i<breakpoints.length;i++){
            var record=breakpoints[i],
                rowNum=this.getRecordIndex(record);
            if(rowNum>=0){
                delete record._isBreakpoint;
                this.refreshRow(rowNum);
            }
        }
        this.breakpoints=[];
        this._recordMetaDataChanged();
    }
,isc.A._recordMetaDataChanged=function isc_SeleneseGrid__recordMetaDataChanged(rowNum){
        this.applyHilites();
        if(rowNum!=null&&rowNum>=0){
            this.refreshRow(rowNum);
        }
    }
,isc.A.initCurrentCommand=function isc_SeleneseGrid_initCurrentCommand(){
        if(this.getRecordIndex(this.startPoint)>=0){
            this.currentCommand=this.startPoint;
        }else{
            this.currentCommand=this.getRecord(0);
        }
    }
,isc.A.findCurrentCommand=function isc_SeleneseGrid_findCurrentCommand(){
        var command=this.currentCommand;
        if(this.getRecordIndex(command)<0){
            command=null;
        }
        if(!command)this.deselectAllRecords();
        else this.selectSingleRecord(command);
        return command;
    }
,isc.A.stepToNextCommand=function isc_SeleneseGrid_stepToNextCommand(){
        var command=this.currentCommand,
            nextIndex=this.getRecordIndex(command);
        if(nextIndex>=0){
            command=this.getRecord(nextIndex+1);
            if(command){
                this.selectSingleRecord(command);
                return this.currentCommand=command;
            }
        }
        delete this.currentCommand;
        this.deselectAllRecords();
    }
,isc.A.showContent=function isc_SeleneseGrid_showContent(title,content){
        var outputWindow=this.outputWindow;
        if(!outputWindow)outputWindow=this.addAutoChild("outputWindow");
        outputWindow.showContent(content);
        outputWindow.setTitle(title);
        outputWindow.show();
    }
,isc.A.getOutput=function isc_SeleneseGrid_getOutput(){
        var data=this.data.filter(function(record){
            return!!record.output;
        });
        var output=data.getProperty("output");
        return output.join("");
    }
,isc.A._formatOutputFromArray=function isc_SeleneseGrid__formatOutputFromArray(data){
        return data.getProperty("output").map(function(text){
            if(!text.endsWith("\n"))text+="\n";
            if(!text.startsWith("\n"))text="\n"+text;
            return text;
        });
    }
,isc.A.getFailures=function isc_SeleneseGrid_getFailures(){
        var data=this.data.filter(function(record){
            if(!record.output)return false;
            return record.failureCount&&!record._recovered;
        });
        return this._formatOutputFromArray(data);
    }
,isc.A.getErrors=function isc_SeleneseGrid_getErrors(){
        var data=this.data.filter(function(record){
            if(!record.output)return false;
            return record.errorCount;
        });
        return this._formatOutputFromArray(data);
    }
,isc.A.incrementCommandFailures=function isc_SeleneseGrid_incrementCommandFailures(command){
        if(!command.failureCount){
            command.failureCount=0;
        }
        return++command.failureCount;
    }
,isc.A.incrementCommandErrors=function isc_SeleneseGrid_incrementCommandErrors(command){
        if(!command.errorCount){
            command.errorCount=0;
        }
        return++command.errorCount;
    }
,isc.A.handleResult=function isc_SeleneseGrid_handleResult(command,data){
        var result=data.result,
            success=result!=false,
            rowNum=this.getRecordIndex(command);
        if(rowNum>=0){
            command.output=data.output;
            command.shotfile=data.shotfile;
            if(success){
                command[this.hiliteProperty]="commandSuccess";
            }else{
                command[this.hiliteProperty]="commandFailure";
                this.incrementCommandFailures(command);
            }
            this.scrollToRow(rowNum);
            this.refreshRow(rowNum);
        }
        return success;
    }
,isc.A.handleError=function isc_SeleneseGrid_handleError(command,data){
        var rowNum=this.getRecordIndex(command);
        if(rowNum>=0){
            if(data)command.output=data;
            command[this.hiliteProperty]="commandFailure";
            this.incrementCommandErrors(command);
            this.refreshRow(rowNum);
            this.creator.errorCount++;
        }
    }
,isc.A.clearTestResults=function isc_SeleneseGrid_clearTestResults(){
        this.data.clearProperty(this.hiliteProperty);
        this.data.clearProperty("failureCount");
        this.data.clearProperty("errorCount");
        this.data.clearProperty("_recovered");
        this.data.clearProperty("shotfile");
        this.data.clearProperty("output");
        this.applyHilites();
    }
);
isc.B._maxIndex=isc.C+45;

isc.SeleneseGrid.changeDefaults("rowNumberFieldDefaults",{
    showHover:true,
    autoFitWidth:true,
    hoverHTML:function(record,value,rowNum,ColNum,grid){
        if(record==grid.insertionPoint){
            return"Captured Selenese will be inserted before this command";
        }
    },
    formatCellValue:function(value,record,rowNum,colNum,grid){
        rowNum+=this.rowNumberStart;
        var insertionPoint=grid.insertionPoint;
        if(insertionPoint&&insertionPoint==record)rowNum+="+";
        var startPoint=grid.startPoint;
        if(startPoint&&startPoint==record)rowNum+="^";
        var breakpoints=grid.breakpoints;
        if(breakpoints.length&&breakpoints.contains(record)){
            rowNum+="*";
        }
        return isc.isA.Number(rowNum)?rowNum+"&numsp;&numsp;":rowNum;
    }
}),
isc.defineClass("SeleneseMassEditForm","DynamicForm");
isc.A=isc.SeleneseMassEditForm.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.width="100%";
isc.A.height="100%";
isc.A.wrapItemTitles=false;
isc.A.numCols=3;
isc.A.colWidths=[120,"*",100];
isc.A.formUsageText="Check \"update\" for each field you want to change and select a value, "+
                   "then click \"apply\" to mass update the selected records. ";
isc.A.items=[{
        name:"usageText",editorType:"StaticTextItem",height:50,
        shouldSaveValue:false,showTitle:false,vAlign:"top",colSpan:3,
        defaultDynamicValue:"form.formUsageText"
    },{
        name:"onFailure",width:150,readOnlyDisplay:"disabled",
        defaultValue:"stop",readOnlyWhen:{
            fieldName:"updateOnFailure",operator:"notEqual",value:true
        }
    },{
        name:"updateOnFailure",title:"update",type:"boolean",showTitle:false,width:85
    },{
        name:"screenshot",allowEmptyValue:true,readOnlyDisplay:"disabled",
        defaultValue:false,readOnlyWhen:{
            fieldName:"updateScreenshot",operator:"notEqual",value:true
        }
    },{
        name:"updateScreenshot",title:"update",type:"boolean",showTitle:false,width:85
    },{
        name:"waitFor",readOnlyDisplay:"disabled",
        defaultValue:false,readOnlyWhen:{
            fieldName:"updateWaitFor",operator:"notEqual",value:true
        }
    },{
        name:"updateWaitFor",title:"update",type:"boolean",showTitle:false,width:85
    },{
        editorType:"SpacerItem",height:10,startRow:true
    },{
        editorType:"SpacerItem",startRow:true
    },{
        editorType:"ButtonItem",title:"Apply",
        startRow:false,endRow:false,align:"right",
        click:function(form,item){
            var values=isc.addProperties({},form.getValues());
            for(var key in values){
                if(form.getItem(key).isDisabled()||key.startsWith("update")){
                    delete values[key];
                }
            }
            var commandGrid=form.creator.commandGrid,
                selection=commandGrid.getSelection();
            for(var i=0;i<selection.length;i++){
                var record=selection[i];
                isc.addProperties(record,values);
            }
            commandGrid.markForRedraw();
            form.close();
        }
    },{
        editorType:"ButtonItem",title:"Cancel",
        startRow:false,endRow:false,
        click:function(form,item){
            form.close();
        }
    }];
isc.B.push(isc.A.close=function isc_SeleneseMassEditForm_close(){
        this.clearValues();
        this.creator.massEditWindow.close();
    }
);
isc.B._maxIndex=isc.C+1;

isc.ClassFactory.defineClass("EventStreamRemoteProxy").addClassProperties({
    proxies:{},
    registerLocal:function(proxy){
        var id=proxy.getID();
        this.proxies[id]=proxy;
    },
    handleRemoteCommands:function(id,newCommands,url){
        this.proxies[id].handleRemoteCommands(newCommands,url);
    }
});
isc.A=isc.EventStreamRemoteProxy.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.B.push(isc.A.init=function isc_EventStreamRemoteProxy_init(){
        this.invokeSuper(isc.EventStreamRemoteProxy,"init");
        isc.EventStreamRemoteProxy.registerLocal(this);
        this.registerRemote();
    }
,isc.A.registerRemote=function isc_EventStreamRemoteProxy_registerRemote(callback){
        window.debugTarget.call("isc.EventStream.createNamedStreamForRemoteProxy",
            [this.getID()],function(success){if(callback)callback(success);});
    }
,isc.A.start=function isc_EventStreamRemoteProxy_start(keepEvents){
        window.debugTarget.call("isc.EventStream.executeStreamAPIForRemoteProxy",
                                [this.getID(),"start",keepEvents]);
    }
,isc.A.end=function isc_EventStreamRemoteProxy_end(){
        window.debugTarget.call("isc.EventStream.executeStreamAPIForRemoteProxy",
                                [this.getID(),"end"]);
    }
,isc.A.setSeleneseListener=function isc_EventStreamRemoteProxy_setSeleneseListener(callback,settings,delay,skipExisting){
        this.callback=callback;
        window.debugTarget.call("isc.EventStream.setRemoteProxySeleneseListener",
            [this.getID(),settings,delay,skipExisting],function(result){
                this.fireCallback(callback,["newCommands","url"],[result[0],result[1]]);
            }
        );
        return[];
    }
,isc.A.handleRemoteCommands=function isc_EventStreamRemoteProxy_handleRemoteCommands(newCommands,url){
        this.fireCallback(this.callback,["newCommands","url"],[newCommands,url]);
    }
,isc.A.getPendingEventsURL=function isc_EventStreamRemoteProxy_getPendingEventsURL(){
        return window.debugTarget&&window.debugTarget.serverProperties.URL;
    }
);
isc.B._maxIndex=isc.C+7;

isc.defineClass("SeleneseRecorder","VLayout");
isc.A=isc.SeleneseRecorder.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.sizeToControlsOverflow=true;
isc.A.commandGridDefaults={
        _constructor:"SeleneseGrid"
    };
isc.A.dataSourceDefaults={
        _constructor:"SeleneseCommandDataSource"
    };
isc.A.massEditWindowDefaults={
        _constructor:"Window",
        title:"Mass Edit Selected Commands",
        showMinimizeButton:false,
        visibility:"hidden",
        showModalMask:true,
        autoCenter:true,
        autoSize:true,
        isModal:true,
        width:425
    };
isc.A.massEditFormDefaults={
        _constructor:"SeleneseMassEditForm"
    };
isc.A.htmlExportHeader="<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en' lang='en'>\n"+
        "<head><title>${testname}.rctest</title></head>\n"+
        "<body><table><tbody>\n";
isc.A.htmlExportFooter="</tbody></table></body>\n</html>";
isc.A.eventStreamDefaults={
        _constructor:"EventStream"
    };
isc.A.commandGridDefaults={
        _constructor:"SeleneseGrid"
    };
isc.A.usageLabelDefaults={
        _constructor:"Label",
        contents:"The Selenese Recorder captures commands from interaction with the main "+
            "window.  You can rearrange, edit, or add commands before exporting as Selenese."+
            "  You can also load a script and then run it interactively with SeleneseRunner.",
        height:1,padding:5
    };
isc.A.recorderControlsDefaults={
        _constructor:"DynamicForm",numCols:11,
        colWidths:[85,120,90,"*",75,75,75,"*",170,80,140],
        dataSource:"scriptLoader",
        items:[{
            name:"testname",title:"Test Name",width:"*",
            wrapTitle:false,defaultValue:"test"
        },{
            name:"export",title:"Export",editorType:"ButtonItem",
            autoSize:true,icon:"[SKIN]/headerIcons/save.png",
            startRow:false,endRow:false,height:24,disabled:true,
            readOnlyWhen:{
                _constructor:"AdvancedCriteria",operator:"or",criteria:[{
                    fieldName:"testname",operator:"isNull"
                },{
                    fieldName:"/isScriptLoaded",operator:"notEqual",value:true
                }]
            },
            click:function(form,item){
                form.creator.exportScript();
            }
        },{
            name:"selenese",showTitle:false,editorType:"FileItem",
            readOnlyDisplay:"static",multiple:false,
            accept:"text/html",
            changed:function(form,item,value){
                if(!value)return;
                form.creator.drop();
                form.saveData(function(response,data){
                    var testname=data.scriptName.replace(/\.rctest$/,"");
                    form.setValue("testname",testname);
                    form.setValue("capture",false);
                    form.creator.eventStream.end();
                    form.creator.load(data);
                });
            },
            click:function(form,item){
                this.clearValue();
            }
        },{
            name:"runButton",title:"Run",editorType:"ButtonItem",height:24,
            startRow:false,endRow:false,width:60,disabled:true,align:"right",
            readOnlyWhen:{
                _constructor:"AdvancedCriteria",operator:"or",criteria:[{
                    fieldName:"/isScriptLoaded",operator:"notEqual",value:true
                },{
                    fieldName:"/scriptRunMode",operator:"equals",value:"stopping"
                },{
                    fieldName:"/scriptRunMode",operator:"equals",value:"starting"
                }]
            },
            click:function(form,item){
                var player=form.creator;
                switch(item.title){
                case"Pause":
                    this.setTitle("Go");
                    player.pause();
                    break;
                case"Go":
                    this.setTitle("Pause");
                    player.go();
                    break;
                default:
                    this.setTitle("Pause");
                    player.start();
                    break;
                }
            }
        },{
            name:"stopButton",title:"Stop",editorType:"ButtonItem",height:24,
            startRow:false,endRow:false,width:60,disabled:true,align:"right",
            readOnlyWhen:{
                _constructor:"AdvancedCriteria",operator:"and",criteria:[{
                    fieldName:"/scriptRunMode",operator:"notEqual",value:"running"
                },{
                    fieldName:"/scriptRunMode",operator:"notEqual",value:"paused"
                },{
                    fieldName:"/scriptRunMode",operator:"notEqual",value:"ready"
                }]
            },
            click:function(form,item){
                form.creator.stop();
            }
        },{
            name:"stepButton",title:"Step",editorType:"ButtonItem",height:24,
            startRow:false,endRow:false,width:60,disabled:true,align:"right",
            readOnlyWhen:{
                fieldName:"/scriptRunMode",operator:"notEqual",value:"paused"
            },
            click:function(form,item){
                form.creator.run();
            }
        },{
            name:"clear",title:"Clear",editorType:"ButtonItem",
            autoSize:true,icon:"[SKIN]/headerIcons/trash.png",
            startRow:false,endRow:false,height:24,align:"right",
            disabled:true,readOnlyWhen:{
                _constructor:"AdvancedCriteria",operator:"or",criteria:[{
                    fieldName:"/scriptRunMode",operator:"notEqual",value:"idle"
                },{
                    fieldName:"/isScriptLoaded",operator:"notEqual",value:true
                }]
            },
            click:function(form,item){
                var recorder=form.creator;
                recorder.beginDialogInteraction();
                isc.confirm(recorder.getDropConfirmPrompt(),function(value){
                    recorder.endDialogInteraction();
                    if(value){
                        recorder.drop();
                        recorder.resetStream();
                    }
                });
            }
        },{
            name:"capture",type:"boolean",title:"Capture Commands",
            showTitle:false,width:150,defaultValue:true,
            changed:function(form,item,value){
                var stream=form.creator.eventStream;
                if(value)stream.start(true);
                else stream.end();
            }
        },{
            name:"settings",title:"Settings",editorType:"ButtonItem",height:24,
            startRow:false,endRow:false,align:"right",
            click:function(form,item){
                form.creator.recorderSettingsWindow.show();
            }
        },{
            name:"report",title:"Get Report",editorType:"ButtonItem",height:24,
            startRow:false,endRow:false,align:"right",disabled:true,
            click:function(form,item){
                form.creator.createReport();
            },
            buttonProperties:{
                showDisabledIcon:false
            },
            icon:"[SKIN]/headerIcons/save.png",
            icons:[{
                src:"[SKIN]/RichTextEditor/bullet_green.png",
                showIf:function(form,item){
                    var player=form.creator;
                    return player.failureCount==0&&player.errorCount==0;
                }
            },{
                src:"[SKIN]/RichTextEditor/bullet_red.png",
                showIf:function(form,item){
                    var player=form.creator;
                    return player.failureCount>0||player.errorCount>0;
                }
            }],
            readOnlyWhen:{
                fieldName:"/hasReport",operator:"notEqual",value:true
            }
        }],
        refreshReportStatus:function(){
            this.getItem("report").redraw();
        }
    };
isc.A.clearRecordedCommandsPrompt="OK to delete all commands?";
isc.A.clearStreamAndCommandsPrompt="OK to delete all commands and reset the event "+
                                  "stream?  All events in the stream will be lost.";
isc.A.testReportWindowTitle="Test Report";
isc.A.commandOutputWindowTitle="Command Output";
isc.A.recorderSettingsWindowDefaults={
        _constructor:"Window",
        title:"Selenese Recorder Settings",
        showMinimizeButton:false,
        visibility:"hidden",
        showModalMask:true,
        autoCenter:true,
        autoSize:true,
        isModal:true,
        width:500
    };
isc.A.recorderSettingsFormDefaults={
        _constructor:"SeleneseRecorderSettings"
    };
isc.A.errorCount=0;
isc.A.failureCount=0;
isc.A.jUnitXMLHeader="<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"+
                    "<testsuites>";
isc.A.jUnitXMLFooter="\n</testsuites>";
isc.B.push(isc.A.getDropConfirmPrompt=function isc_SeleneseRecorder_getDropConfirmPrompt(){
        var resetStream=this.recorderSettingsForm.getValue("resetStream");
        return resetStream?this.clearStreamAndCommandsPrompt:
                             this.clearRecordedCommandsPrompt;
    }
,isc.A.setOpenURL=function isc_SeleneseRecorder_setOpenURL(openURL){
        if(!openURL)openURL=this.eventStream.getPendingEventsURL();
        if(this.openURL==openURL)return;
        this.openURL=openURL;
        if(this.recorderSettingsForm){
            var baseUrl=this.openURL.replace(/[^\/]*(#.*)?(\?.*)?$/,"");
            this.recorderSettingsForm.getItem("baseUrl").setDefaultValue(baseUrl);
        }
        return true;
    }
,isc.A.initWidget=function isc_SeleneseRecorder_initWidget(){
        this.Super("initWidget",arguments);
        this.createScriptLoaderDS();
        var captureSettings={
            includeOpen:false,
            insertWaitFor:false
        };
        this.addAutoChild("dataSource");
        if(this.crossWindow&&this.eventStream){
            this.logWarn("passing in your own click stream in cross-window mode is not "+
                         "supported; the recorder will run locally against your stream");
            this.crossWindow=null;
        }
        this.createRecorderSettingsWindow();
        var widgetsToIgnore=[this];
        if(this.widgetsToIgnore)widgetsToIgnore.addList(this.widgetsToIgnore);
        if(this.eventStream)this.eventStream.addWidgetsToIgnore(widgetsToIgnore);
        else this.addAutoChild("eventStream",this.crossWindow?
            {_constructor:"EventStreamRemoteProxy"}:{widgetsToIgnore:widgetsToIgnore}
        );
        this.setOpenURL();
        this.addAutoChild("usageLabel");
        this.addAutoChild("commandGrid",{
            captureSettings:captureSettings,
            eventStream:this.eventStream,
            dataSource:this.dataSource
        });
        this.addAutoChild("recorderControls");
        if(this.minBreadthMember==null&&this.sizeToControlsOverflow){
            this.minBreadthMember=this.recorderControls;
        }
    }
,isc.A.drawn=function isc_SeleneseRecorder_drawn(){
        this.setRunMode("idle");
    }
,isc.A.beginDialogInteraction=function isc_SeleneseRecorder_beginDialogInteraction(){
        if(!this.crossWindow&&this.recorderControls.getValue("capture")){
            this.eventStream.end();
        }
    }
,isc.A.endDialogInteraction=function isc_SeleneseRecorder_endDialogInteraction(){
        if(!this.crossWindow&&this.recorderControls.getValue("capture")){
            this.eventStream.start(true);
        }
    }
,isc.A.openMassEditWindow=function isc_SeleneseRecorder_openMassEditWindow(){
        var massEditWindow=this.massEditWindow;
        if(massEditWindow==null||massEditWindow.destroyed){
            massEditWindow=this.massEditWindow=this.createAutoChild("massEditWindow",
            {
                bodyProperties:{layoutMargin:5}
            });
        }
        var massEditForm=this.massEditForm;
        if(massEditForm==null||massEditForm.destroyed){
            massEditForm=this.massEditForm=this.createAutoChild("massEditForm",{
                dataSource:this.dataSource
            });
        }
        massEditWindow.addItem(massEditForm);
        massEditWindow.show();
    }
,isc.A.camelToKebabCase=function isc_SeleneseRecorder_camelToKebabCase(id){
        return id.replace(/([a-z])([A-Z])/g,function(match,p1,p2){
            return p1+"-"+p2.toLowerCase();
        }).replace(/[A-Z]/g,function(match){
            return match.toLowerCase();
        });
    }
,isc.A.getFieldToHtmlAttributeMap=function isc_SeleneseRecorder_getFieldToHtmlAttributeMap(){
        var map={},
            fields=this.dataSource.getFields();
        for(var fieldName in fields){
            var field=fields[fieldName];
            if(field.xmlAttribute){
                map[fieldName]="data-isc-"+this.camelToKebabCase(fieldName);
            }
        }
        return map;
    }
,isc.A.openHtmlTableRowTag=function isc_SeleneseRecorder_openHtmlTableRowTag(record,map,output){
        output.append("<tr");
        var attribCount=0;
        for(var key in map){
            if(record[key]==null)continue;
            output.append(attribCount++>0?"\n\t":" ");
            output.append(map[key],"=\"",record[key],"\"");
        }
        if(attribCount>1)output.append("\n");
        output.append(">\n");
    }
,isc.A.exportScript=function isc_SeleneseRecorder_exportScript(){
        var script=isc.StringBuffer.create(),
            testname=this.recorderControls.getValue("testname"),
            header=this.htmlExportHeader.evalDynamicString(this,{testname:testname})
        ;
        script.append(header);
        var htmlMap=this.getFieldToHtmlAttributeMap();
        var data=this.commandGrid.data;
        for(var i=0;i<data.length;i++){
            var record=data[i];
            if(record.description){
                script.append("<!-- ",record.description," -->\n");
            }
            this.openHtmlTableRowTag(record,htmlMap,script);
            script.append("\t<td>",record.commandName,"</td>\n",
                          "\t<td>",record.argument1,"</td>\n",
                          "\t<td>",record.argument2,"</td>\n","</tr>\n");
        }
        script.append(this.htmlExportFooter);
        isc.DataSourceNavigator.downloadClientContent(script.release(),testname+
                                                      ".rctest.html","text/html");
    }
,isc.A.getCommandDefaults=function isc_SeleneseRecorder_getCommandDefaults(){
        return this.dataSource.fieldDefaults;
    }
,isc.A.canonicalizeCommand=function isc_SeleneseRecorder_canonicalizeCommand(record){
        this.dataSource.canonicalizeRecord(record);
    }
,isc.A.createRecorderSettingsWindow=function isc_SeleneseRecorder_createRecorderSettingsWindow(){
        this.recorderSettingsForm=this.createAutoChild("recorderSettingsForm",{
            dataSource:this.dataSource
        });
        this.recorderSettingsWindow=this.createAutoChild("recorderSettingsWindow",{
            items:this.recorderSettingsForm
        });
    }
,isc.A.isLoaded=function isc_SeleneseRecorder_isLoaded(){
        var context=this.getRuleContext();
        return context.isScriptLoaded;
    }
,isc.A.isPaused=function isc_SeleneseRecorder_isPaused(){
        var context=this.getRuleContext();
        return context.scriptRunMode=="paused";
    }
,isc.A.isRunning=function isc_SeleneseRecorder_isRunning(){
        var context=this.getRuleContext();
        return context.scriptRunMode=="running";
    }
,isc.A.getRunMode=function isc_SeleneseRecorder_getRunMode(){
        var context=this.getRuleContext();
        return context.scriptRunMode;
    }
,isc.A.setupReport=function isc_SeleneseRecorder_setupReport(){
        this.provideRuleContext("hasReport",true);
        this.recorderControls.refreshReportStatus();
    }
,isc.A.clearReport=function isc_SeleneseRecorder_clearReport(){
        this.provideRuleContext("hasReport",false);
        this.recorderControls.refreshReportStatus();
    }
,isc.A.hasReport=function isc_SeleneseRecorder_hasReport(){
        var context=this.getRuleContext();
        return context.hasReport;
    }
,isc.A.setRunMode=function isc_SeleneseRecorder_setRunMode(runMode){
        switch(runMode){
        case"idle":
        case"paused":
            this.commandGrid.configureForEditing();
            break;
        default:
            this.commandGrid.configureForRunning();
        }
        var scriptButton=this.recorderControls.getItem("selenese");
        scriptButton.setEnabled(!runMode||runMode=="idle");
        this.provideRuleContext("scriptRunMode",runMode);
    }
,isc.A.canRun=function isc_SeleneseRecorder_canRun(){
        var context=this.getRuleContext();
        return context.scriptRunMode=="ready"||context.scriptRunMode=="paused";
    }
,isc.A.canEdit=function isc_SeleneseRecorder_canEdit(){
        var runMode=this.getRunMode();
        return runMode=="idle"||runMode=="paused";
    }
,isc.A.load=function isc_SeleneseRecorder_load(script){
        this._assert(!this.isLoaded()&&this.getRunMode()=="idle");
        this.commandGrid.setData(script.commands);
    }
,isc.A.drop=function isc_SeleneseRecorder_drop(){
        this._assert(!this.isLoaded()||this.getRunMode()=="idle");
        this.commandGrid.setData([]);
        this.clearReport();
    }
,isc.A.resetStream=function isc_SeleneseRecorder_resetStream(){
        if(!this.recorderSettingsForm.getValue("resetStream"))return;
        var stream=this.eventStream,
            capturingOn=this.recorderControls.getValue("capture");
        if(capturingOn)stream.end(),stream.start();
        else stream.start(),stream.end();
    }
,isc.A.reconnect=function isc_SeleneseRecorder_reconnect(){
        var _this=this;
        this.eventStream.registerRemote(function(success){
            if(success){
                _this.setOpenURL();
                _this.commandGrid.observeStream(true);
            }
        });
    }
,isc.A.updateRunModeFromData=function isc_SeleneseRecorder_updateRunModeFromData(data){
        var hasCommands=data&&data.length>0;
        if(!this.recorderControls){
            return;
        }
        this.provideRuleContext("isScriptLoaded",hasCommands);
        if(this.getRunMode()!="idle"&&!hasCommands)this.stop();
    }
,isc.A.setupRunContext=function isc_SeleneseRecorder_setupRunContext(){
        this.commandGrid.clearTestResults();
        this.startTime=new Date();
        this.failureCount=0;
        this.errorCount=0;
        this.clearReport();
    }
,isc.A.start=function isc_SeleneseRecorder_start(){
        this._assert(this.isLoaded()&&this.getRunMode()=="idle");
        this.setRunMode("starting");
        this.setupRunContext();
        var _this=this;
        this.callPlayerDMI("openSeleneseSession",[
            this.recorderSettingsForm.getValue("browser")
        ],function(response,data,request){
            if(response.status==0){
                if(isc.Browser.isSGWT&&window.SmartGWT.isNativeJavaObject(data)){
                    data=window.SmartGWT.convertToPrimitiveType(data);
                }
                _this.commandGrid.initCurrentCommand();
                _this.setRunMode("ready");
                _this.sessionId=data;
                if(_this.delayedStop)_this.stop();
                else _this.run();
            }else{
                isc.notify("Unable to open a Selenese session on the server.  "+
                           "Check your server or client logs for further details.");
                _this.recorderControls.getItem("runButton").setTitle("Run");
                _this.setRunMode("idle");
                _this.logWarn(data);
            }
            delete _this.delayedStop;
        });
    }
,isc.A.run=function isc_SeleneseRecorder_run(){
        this._assert(this.sessionId!=null&&this.canRun());
        var grid=this.commandGrid;
        var currentCommand=grid.findCurrentCommand();
        if(!currentCommand)return this.stop();
        var commands=this.expandCommandFlags(currentCommand);
        var wasPaused=this.isPaused();
        this.setRunMode("running");
        var _this=this;
        this.callPlayerDMI("executeSelenese",[
            this.sessionId,commands,{
                baseUrl:this.recorderSettingsForm.getValue("baseUrl"),
                maximize:!!this.recorderSettingsForm.getValue("maximize"),
                waitForWait:this.recorderSettingsForm.getValue("waitForWait"),
                implicitWait:this.recorderSettingsForm.getValue("implicitWait")
            }
        ],function(response,data,request){
            if(response.status==0){
                _this.setRunMode(wasPaused?"paused":"ready");
                var status=_this.handleResult(currentCommand,data);
                _this.next(currentCommand,status);
            }else{
                _this._stopped();
                _this.handleError(currentCommand,data);
                isc.notify("Hit an error trying to execute the current Selenese command.  "+
                           "Check your server or client logs for further details.");
                _this.logWarn(data);
            }
        });
    }
,isc.A.runOrWait=function isc_SeleneseRecorder_runOrWait(){
        var delay=this.recorderSettingsForm.getValue("executeWait");
        if(!delay){
            return this.run();
        }
        var _this=this;
        this._runTimer=isc.Timer.setTimeout(function(){
            delete _this._runTimer;
            _this.run();
        },delay);
    }
,isc.A.clearPendingRun=function isc_SeleneseRecorder_clearPendingRun(){
        var timerId=this._runTimer;
        if(timerId)isc.Timer.clear(timerId);
        delete this._runTimer;
    }
,isc.A.handleError=function isc_SeleneseRecorder_handleError(command,data){
        return this.commandGrid.handleError(command,data);
    }
,isc.A.handleResult=function isc_SeleneseRecorder_handleResult(command,data){
        return this.commandGrid.handleResult(command,data);
    }
,isc.A.getScriptName=function isc_SeleneseRecorder_getScriptName(){
        return this.recorderControls.getValues().scriptName;
    }
,isc.A.createReport=function isc_SeleneseRecorder_createReport(){
        var scriptName=this.getScriptName();
        var grid=this.commandGrid,
            allOutput="\n"+grid.getOutput(),
            failures=grid.getFailures(),
            errors=grid.getErrors()
        ;
        var hasErrors=this.errorCount>0,
            hasFailures=this.failureCount>0
        ;
        var reportObj={
            tests:1,
            errors:hasErrors?1:0,
            failures:hasFailures?1:0,
            testcase:{
                name:scriptName,
                time:this.startTime,
                status:hasFailures||hasErrors?"failure":"success",
                "system-out":allOutput,
                failure:failures,
                error:errors
            }
        };
        var reportName=scriptName+".report.xml",
            testSuiteDS=isc.DS.get("_SeleneseReportTestSuite"),
            xmlReport=this.jUnitXMLHeader+testSuiteDS.xmlSerialize(
                            reportObj,null,"    ")+this.jUnitXMLFooter
        ;
        if(this.recorderSettingsForm.getValue("saveReport")){
            isc.DataSourceNavigator.downloadClientContent(xmlReport,reportName,"text/xml");
        }else{
            this.commandGrid.showContent(this.testReportWindowTitle,xmlReport);
        }
    }
,isc.A.next=function isc_SeleneseRecorder_next(currentCommand,status){
        var doStop=this.delayedStop,
            doPause=this.delayedPause;
        delete this.delayedStop,
        delete this.delayedPause;
        var nextCommand;
        if(!status)switch(this.getOnFailureSetting(currentCommand)){
        case"retry":
            var maxRetries=this.recorderSettingsForm.getValue("maxRetries");
            if(currentCommand.failureCount<maxRetries){
                nextCommand=currentCommand;
                break;
            }
        case"stop":
            doStop=true;
            break;
        }else{
            if(currentCommand.failureCount)currentCommand._recovered=true;
        }
        var grid=this.commandGrid;
        if(!nextCommand){
            if(currentCommand.failureCount&&!currentCommand._recovered){
                this.failureCount++;
            }
            nextCommand=grid.stepToNextCommand();
            if(!nextCommand)doStop=true;
        }
        if(grid.isBreakpoint(nextCommand))doPause=true;
        if(doStop)this.stop();
        else if(doPause)this.pause();
        else if(!this.isPaused())this.runOrWait();
    }
,isc.A.pause=function isc_SeleneseRecorder_pause(){
        if(this.isRunning()){
            this.delayedPause=true;
            return;
        }
        this._assert(this.isLoaded()&&this.getRunMode()=="ready");
        this.recorderControls.getItem("runButton").setTitle("Go");
        this.setRunMode("paused");
        this.clearPendingRun();
    }
,isc.A.go=function isc_SeleneseRecorder_go(){
        if(this.isRunning()){
            this.delayedGo=true;
            return;
        }
        this._assert(this.isLoaded()&&this.getRunMode()=="paused");
        this.setRunMode("ready");
        this.run();
    }
,isc.A.stop=function isc_SeleneseRecorder_stop(){
        switch(this.getRunMode()){
        case"running":
        case"starting":
            this.delayedStop=true;
            return;
        case"stopping":
            return;
        }
        this._assert(this.sessionId!=null&&this.canRun());
        this.setRunMode("stopping");
        this.clearPendingRun();
        var _this=this;
        this.callPlayerDMI("closeSeleneseSession",[
            this.sessionId
        ],function(response,data,request){
            if(response.status!=0){
                isc.notify("Hit an error trying to close the Selenese session.  "+
                           "Check your server or client logs for further details.");
                _this.logWarn(data);
            }
            _this._stopped();
        });
    }
,isc.A._stopped=function isc_SeleneseRecorder__stopped(){
        this.recorderControls.getItem("runButton").setTitle("Run");
        this.setRunMode("idle");
        this.setupReport();
        delete this.session;
        delete this.delayedStop;
    }
,isc.A.getOnFailureSetting=function isc_SeleneseRecorder_getOnFailureSetting(command){
        if(command&&command.onFailure)return command.onFailure;
        return this.recorderSettingsForm.getValue("onFailure");
    }
,isc.A.getAddWaitForSetting=function isc_SeleneseRecorder_getAddWaitForSetting(command){
        if(command&&command.waitFor==true)return command.waitFor;
        return this.recorderSettingsForm.getValue("waitFor");
    }
,isc.A.getCleanServerCommand=function isc_SeleneseRecorder_getCleanServerCommand(command){
        var result={},
            commandProps=isc.SeleneseRecorder.serverCommandProps
        ;
        for(var i=0;i<commandProps.length;i++){
            var key=commandProps[i];
            if(command[key]!=null)result[key]=command[key];
        }
        return result;
    }
,isc.A.expandCommandFlags=function isc_SeleneseRecorder_expandCommandFlags(command){
        var newCommands=[],
            commandName=command.commandName,
            waitFor=this.getAddWaitForSetting(command)
        ;
        if(waitFor&&!commandName.startsWith("waitFor")){
            var argument1=command.argument1,
                argument2=command.argument2
            ;
            if(commandName.match(/keys|type/i)){
                if(argument1&&argument1.startsWith("scLocator=")){
                    newCommands.add({commandName:"waitForElementReadyForKeyPresses",
                                     argument1:argument1});
                }
            }else{
                if(argument1&&argument1.startsWith("scLocator=")){
                    newCommands.add({commandName:"waitForElementClickable",
                                     argument1:command.argument1});
                }
                if(argument2&&argument2.startsWith("scLocator=")){
                    newCommands.add({commandName:"waitForElementClickable",
                                     argument1:argument2});
                }
            }
        }
        command=this.getCleanServerCommand(command);
        if(command.screenshot==null){
            command.screenshot=this.recorderSettingsForm.getValue("screenshot");
        }
        newCommands.add(command);
        return newCommands;
    }
,isc.A.createScriptLoaderDS=function isc_SeleneseRecorder_createScriptLoaderDS(){
        var ds=isc.DS.get("scriptLoader");
        if(!ds)isc.DS.create({
            ID:"scriptLoader",serverType:"SQL",
            fields:[{
                name:"id",primaryKey:true
            },{
                name:"selenese",type:"binary"
            }]
        });
    }
,isc.A.callPlayerDMI=function isc_SeleneseRecorder_callPlayerDMI(methodName,methodArgs,callback){
        var actionURL=this.seleneseRunnerActionURL;
        isc.DMI.call({
            appID:"SelenesePlayer",
            className:"com.isomorphic.webdriver.SelenesePlayer",
            methodName:methodName,
            arguments:methodArgs,
            callback:callback,
            requestParams:{
                showPrompt:false,
                actionURL:actionURL,
                willHandleError:true,
                useHttpProxy:!!actionURL,
                clientLogContext:methodName
            }
        });
    }
,isc.A.downloadScreenshot=function isc_SeleneseRecorder_downloadScreenshot(serverFilePath,downloadFilename){
        var saveScreenshot=!!this.recorderSettingsForm.getValue("saveScreenshot"),
            actionURL=this.seleneseRunnerActionURL
        ;
        isc.DMI.call({
            appID:"SelenesePlayer",
            className:"com.isomorphic.tools.SeleneseRPC",
            methodName:"downloadScreenshot",
            arguments:[serverFilePath,downloadFilename,saveScreenshot],
            requestParams:{
                showPrompt:false,
                willHandleError:true,
                downloadResult:true,
                actionURL:actionURL,
                useHttpProxy:!!actionURL,
                download_filename:this.crossWindow?null:downloadFilename,
                downloadToNewWindow:!saveScreenshot,
                clientLogContext:"downloadScreenshot"
            }
        });
    }
);
isc.B._maxIndex=isc.C+50;

isc.A=isc.SeleneseRecorder;
isc.A.serverCommandProps=["commandName","argument1","argument2","screenshot"]
;

isc.defineClass("SeleneseRecorderSettings","DynamicForm");
isc.A=isc.SeleneseRecorderSettings.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.width="100%";
isc.A.height="100%";
isc.A.wrapItemTitles=false;
isc.A.colWidths=[175,"*"];
isc.A.items=[{
        name:"baseUrl",title:"Base URL for Open",width:"100%"
    },{
        name:"browser",title:"Playback Browser",defaultToFirstOption:true,
        valueMap:{
            firefox:"Mozilla Firefox",
            chrome:"Google Chrome",
            edge:"Microsoft Edge",
            ie11:"Internet Explorer"
        }
    },{
        name:"implicitWait",title:"WebDriver Implicit Wait",type:"integer",hint:"(ms)",
        defaultValue:5000
    },{
        name:"waitForWait",title:"WaitFor[...] Timeout",type:"integer",hint:"(sec)",
        defaultValue:30
    },{
        name:"executeWait",title:"Delay After Command",type:"integer",hint:"(ms)",
        defaultValue:0
    },{
        name:"maxRetries",title:"Max Retry Attempts",type:"integer",
        defaultValue:3
    },{
        name:"onFailure",title:"Default Action on Failure",defaultValue:"stop"
    },{
        name:"screenshot",title:"Take Screenshot by Default",allowEmptyValue:true
    },{
        name:"waitFor",title:"Add WaitFor[...] by Default"
    },{
        name:"maximize",title:"Maximize Browser by Default",type:"boolean"
    },{
        name:"saveReport",title:"Save Test Report as Download",type:"boolean",
        defaultValue:true
    },{
        name:"saveScreenshot",title:"Save Screenshot as Download",type:"boolean"
    },{
        name:"resetStream",title:"Clear button resets stream",type:"boolean",
        prompt:"All events from the target window stream will also be dropped when "+
            "the current Selenese command script is dropped via the 'clear' button."
    },{
        editorType:"ButtonItem",
        title:"Reset",endRow:false,
        click:function(form,item){
            form.clearValues();
        }
    },{
        editorType:"ButtonItem",
        title:"Done",startRow:false,
        align:"right",
        click:function(form,item){
            form.close();
        }
    }];
isc.B.push(isc.A.close=function isc_SeleneseRecorderSettings_close(){
        this.creator.recorderSettingsWindow.close();
    }
);
isc.B._maxIndex=isc.C+1;

isc.DataSource.create({
    ID:"_SeleneseReportTestCaseError",
    clientOnly:true,
    fields:[{
        name:"message",xmlAttribute:true
    },{
        name:"type",xmlAttribute:true
    }],
    xmlSerializeFields:function(data,flags,indent){
        return flags.indent==false?data.value:"\n"+indent+data.value;
    }
});
isc.DataSource.create({
    ID:"_SeleneseReportTestCaseFailure",
    clientOnly:true,
    fields:[{
        name:"message",xmlAttribute:true
    },{
        name:"type",xmlAttribute:true
    }],
    xmlSerializeFields:function(data,flags,indent){
        return flags.indent==false?data.value:"\n"+indent+data.value;
    }
});
isc.DataSource.create({
    ID:"_SeleneseReportTestCase",
    clientOnly:true,
    fields:[{
        name:"assertions",xmlAttribute:true
    },{
        name:"classname",xmlAttribute:true
    },{
        name:"name",xmlAttribute:true
    },{
        name:"status",xmlAttribute:true
    },{
        name:"time",type:"datetime",xmlAttribute:true
    },{
        name:"skipped"
    },{
        name:"error",type:"_SeleneseReportTestCaseError"
    },{
        name:"failure",type:"_SeleneseReportTestCaseFailure"
    },{
        name:"system-out"
    },{
        name:"system-err"
    }]
});
isc.DataSource.create({
    ID:"_SeleneseReportTestSuiteProperty",
    tagName:"property",
    clientOnly:true,
    fields:[{
        name:"name",xmlAttribute:true
    },{
        name:"value",xmlAttribute:true
    }]
});
isc.DataSource.create({
    ID:"_SeleneseReportTestSuite",
    tagName:"testsuite",
    clientOnly:true,
    fields:[{
        name:"disabled",type:"boolean",xmlAttribute:true
    },{
        name:"errors",xmlAttribute:true
    },{
        name:"failures",xmlAttribute:true
    },{
        name:"hostname",xmlAttribute:true
    },{
        name:"id",xmlAttribute:true
    },{
        name:"package",xmlAttribute:true
    },{
        name:"skipped",xmlAttribute:true
    },{
        name:"tests",xmlAttribute:true
    },{
        name:"time",type:"datetime",xmlAttribute:true
    },{
        name:"timestamp",xmlAttribute:true
    },{
        name:"properties",multiple:true,type:"_SeleneseReportTestSuiteProperty"
    },{
        name:"testcase",type:"_SeleneseReportTestCase"
    },{
        name:"system-out"
    },{
        name:"system-err"
    }]
});
isc._debugModules = (isc._debugModules != null ? isc._debugModules : []);isc._debugModules.push('AutoTestUI');isc.checkForDebugAndNonDebugModules();isc._moduleEnd=isc._AutoTestUI_end=(isc.timestamp?isc.timestamp():new Date().getTime());if(isc.Log&&isc.Log.logIsInfoEnabled('loadTime'))isc.Log.logInfo('AutoTestUI module init time: ' + (isc._moduleEnd-isc._moduleStart) + 'ms','loadTime');delete isc.definingFramework;if (isc.Page) isc.Page.handleEvent(null, "moduleLoaded", { moduleName: 'AutoTestUI', loadTime: (isc._moduleEnd-isc._moduleStart)});}else{if(window.isc && isc.Log && isc.Log.logWarn)isc.Log.logWarn("Duplicate load of module 'AutoTestUI'.");}
