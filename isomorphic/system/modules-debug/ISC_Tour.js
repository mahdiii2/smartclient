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

if(window.isc&&window.isc.module_Core&&!window.isc.module_Tour){isc.module_Tour=1;isc._moduleStart=isc._Tour_start=(isc.timestamp?isc.timestamp():new Date().getTime());if(isc._moduleEnd&&(!isc.Log||(isc.Log && isc.Log.logIsDebugEnabled('loadTime')))){isc._pTM={ message:'Tour load/parse time: ' + (isc._moduleStart-isc._moduleEnd) + 'ms', category:'loadTime'};
if(isc.Log && isc.Log.logDebug)isc.Log.logDebug(isc._pTM.message,'loadTime');
else if(isc._preLog)isc._preLog[isc._preLog.length]=isc._pTM;
else isc._preLog=[isc._pTM]}isc.definingFramework=true;isc.ClassFactory.defineClass("TourWindow","Window");
isc.A=isc.TourWindow.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.cancelButtonTitle="Skip the tour";
isc.A.showActionButton=true;
isc.A.actionButtonTitle="Next";
isc.A.showHeader=false;
isc.A.showFooter=false;
isc.A.styleName="tourWindowBackground";
isc.A.canDragResize=false;
isc.A.isModal=false;
isc.A.dismissOnOutsideClick=false;
isc.A.showBody=true;
isc.A.bodyStyle="tourWindowBody";
isc.A.bodyDefaults={
        getCurrentCursor:function(){
            return this.creator.getCurrentCursor();
        },
        layoutMargin:0
    };
isc.A.width=400;
isc.A.autoSize=true;
isc.A.autoCenter=true;
isc.A.showCloseButton=true;
isc.A.closeButtonConstructor="ImgButton";
isc.A.closeButtonDefaults={
        width:16,
        height:16,
        snapTo:"TR",
        snapOffsetLeft:-10,
        snapOffsetTop:10,
        layoutAlign:"center",
        src:"[SKINIMG]Tour/close.png",
        showDown:false,
        showFocussed:false,
        showRollOver:false,
        click:function(){return this.creator._closeButtonClick();}
    };
isc.A.frameConstructor="VLayout";
isc.A.frameDefaults={
        getCurrentCursor:function(){
            return this.creator.getCurrentCursor();
        },
        width:"100%",
        height:"100%",
        margin:20
    };
isc.A.contentLayoutConstructor="VStack";
isc.A.contentLayoutDefaults={
        height:"*",
        getCurrentCursor:function(){
            return this.creator.getCurrentCursor();
        },
        membersMargin:10,
        layoutTopMargin:20,
        layoutRightMargin:20,
        layoutBottomMargin:25
    };
isc.A.titleLabelConstructor="Label";
isc.A.titleLabelDefaults={
        height:30,
        getCurrentCursor:function(){
            return this.creator.getCurrentCursor();
        },
        styleName:"tourWindowTitle"
    };
isc.A.contentsConstructor="Canvas";
isc.A.contentsDefaults={
        height:1,
        getCurrentCursor:function(){
            if(this.canSelectText){
                return"text"
            }
            return this.creator.getCurrentCursor();
        },
        canSelectText:true,
        overflow:"visible",
        styleName:"tourWindowContents"
    };
isc.A.buttonBarConstructor="HLayout";
isc.A.buttonBarDefaults={
        height:30,
        membersMargin:5,
        overflow:"visible"
    };
isc.A.spacerConstructor="LayoutSpacer";
isc.A.cancelButtonConstructor="IButton";
isc.A.cancelButtonDefaults={
        autoFit:true,
        wrap:false,
        height:30,
        baseStyle:"tourLinkButton",
        layoutAlign:"center",
        click:function(){return this.creator._cancelButtonClick();}
    };
isc.A.actionButtonConstructor="Button";
isc.A.actionButtonDefaults={
        minWidth:100,
        autoFit:true,
        wrap:false,
        height:30,
        baseStyle:"tourButton",
        click:function(){return this.creator._actionButtonClick();}
    };
isc.A.progressSpacerConstructor="LayoutSpacer";
isc.A.progressSpacerDefaults={
        height:10
    };
isc.A.progressLayoutConstructor="HLayout";
isc.A.progressLayoutDefaults={
        membersMargin:5
    };
isc.A.progressPercentConstructor="Label";
isc.A.progressPercentDefaults={
        height:16,
        autoFit:true,
        wrap:false,
        styleName:"tourPercent"
    };
isc.A.progressConstructor="Progressbar";
isc.A.progressDefaults={
        length:"100%",
        breadth:10,
        layoutAlign:"center",
        border:"1px solid #d5d5d5",
        titleStyle:"tourPercent",
        baseStyle:null,
        progressStyle:"tourProgress",
        autoApplyOverState:false
    };
isc.A.shakeOffset=15;
isc.A.shakeDuration=300;
isc.A.shakeCount=6;
isc.A._zLayerName="_notify";
isc.A.dragRepositionAppearance="target"
;
isc.B.push(isc.A.shake=function isc_TourWindow_shake(){
        var _this=this,
            initialLeft=this.getLeft(),
            steps=this.shakeCount,
            stepDuration=this.shakeDuration/steps;
        this._shakeMask=isc.EH.showClickMask(null,"hard");
        this.shakeStep(0,steps,stepDuration,this.getLeft(),{target:this,methodName:"shakeComplete"});
    }
,isc.A.shakeStep=function isc_TourWindow_shakeStep(step,totalSteps,duration,originalLeft,finalCallback){
        var lastStep=(++step==totalSteps),
            left=originalLeft+(lastStep?0:(step%2==0?+this.shakeOffset:-this.shakeOffset)),
            _this=this;
        var callback=lastStep?finalCallback:function(){
            _this.shakeStep(step,totalSteps,duration,originalLeft,finalCallback);
        }
        this.animateMove(left,null,callback,duration);
    }
,isc.A.shakeComplete=function isc_TourWindow_shakeComplete(){
        isc.EH.hideClickMask(this._shakeMask);
        delete this._shakeMask;
    }
);
isc.B._maxIndex=isc.C+3;

isc.A=isc.TourWindow.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.autoChildParentMap={
    frame:"body",
    contentLayout:"frame",
    titleLabel:"contentLayout",
    contents:"contentLayout",
    buttonBar:"frame",
    spacer:"buttonBar",
    cancelButton:"buttonBar",
    actionButton:"buttonBar",
    closeButton:"body",
    progressSpacer:"frame",
    progressLayout:"frame",
    progressPercent:"progressLayout",
    progress:"progressLayout"
};
isc.B.push(isc.A.init=function isc_TourWindow_init(){
    if(!this.pointerSettings)this.pointerSettings={};
    if(this.pointerSettings.cornerOffset==null)this.pointerSettings.cornerOffset=2;
    return this.Super("init",arguments);
}
,isc.A.createChildren=function isc_TourWindow_createChildren(){
    this.Super("createChildren",arguments);
    this.addAutoChild("closeButton");
    this.addAutoChild("frame");
    this.addAutoChild("contentLayout");
    if(this.showTitle){
        this.addAutoChild("titleLabel",{contents:this.title});
    }
    this.addAutoChild("contents",{contents:this.contents});
    if(this.contentComponents){
        this.contentLayout.addMembers(this.contentComponents);
    }
    this.addAutoChild("buttonBar");
    this.addAutoChild("spacer");
    if(this.showCancelButton){
        this.addAutoChild("cancelButton",{title:this.cancelButtonTitle,
                                            prompt:this.cancelButtonPrompt,
                                            disabled:this.cancelButtonDisabled});
    }
    if(this.showActionButton){
        this.addAutoChild("actionButton",{title:this.actionButtonTitle});
    }
    if(this.showProgress){
        this.addAutoChild("progressSpacer");
        this.addAutoChild("progressLayout");
        var progressProperties={percentDone:this.percentDone};
        if(this.showProgressPercent){
            var percentText=(this.percentDone||0)+"%";
            if(this.showProgressPercentInline){
                progressProperties.showTitle=true;
                progressProperties.title=percentText;
            }else{
                this.addAutoChild("progressPercent",{contents:percentText});
            }
        }
        this.addAutoChild("progress",progressProperties);
    }
}
,isc.A.setShowCloseButton=function isc_TourWindow_setShowCloseButton(show){}
,isc.A.setShowActionButton=function isc_TourWindow_setShowActionButton(show){
    if(this.showActionButton==show)return;
    this.showActionButton=show;
    if(show&&!this.actionButton){
        this.addAutoChild("actionButton",{title:this.actionButtonTitle});
    }else if(!show&&this.actionButton){
        this.actionButton.hide();
    }
}
,isc.A._cancelButtonClick=function isc_TourWindow__cancelButtonClick(){return this.handleCancelClick();}
,isc.A.handleCancelClick=function isc_TourWindow_handleCancelClick(){
    if(this.onCancelClick&&this.onCancelClick()==false)return;
    return this.cancelClick();
}
,isc.A.cancelClick=function isc_TourWindow_cancelClick(){
    this.close();
    return false;
}
,isc.A._actionButtonClick=function isc_TourWindow__actionButtonClick(){return this.handleActionClick();}
,isc.A.handleActionClick=function isc_TourWindow_handleActionClick(){
    if(this.actionButtonURL)window.open(this.actionButtonURL);
    if(this.onActionClick&&this.onActionClick()==false)return;
    return this.actionClick();
}
,isc.A.actionClick=function isc_TourWindow_actionClick(){
    return false;
}
);
isc.B._maxIndex=isc.C+10;

if(isc.Process&&isc.DrawPane){
isc.defineClass("Tour","Process");
isc.A=isc.Tour;
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.B.push(isc.A.loadTour=function isc_c_Tour_loadTour(tourId,callback){
        return this.loadProcess(tourId,callback);
    }
,isc.A.getTour=function isc_c_Tour_getTour(tourId){
        return this.getProcess(tourId);
    }
,isc.A.getLocatorObject=function isc_c_Tour_getLocatorObject(locator){
        return isc.AutoTest.getElement(locator)&&isc.AutoTest.getObject(locator);
    }
);
isc.B._maxIndex=isc.C+3;

isc.A=isc.Tour.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.autoReset=true;
isc.A.mode="tour";
isc.A.allowDropOnDescendants=false;
isc.A.stepActionButtonTitle="Next";
isc.A.firstStepActionButtonTitle="Let's go!";
isc.A.lastStepActionButtonTitle="Done";
isc.A.stepCancelButtonTitle="Skip this tour";
isc.A.firstStepCancelButtonTitle="Skip this tour";
isc.A.outlineBorder="1px solid red";
isc.A.dropOutlineBorder="1px solid #44ff44";
isc.A.wizard=true;
isc.A.notifyType="tourExpectedValue";
isc.A.notifyMessageDefaults={
        multiMessageMode:"replace"
    };
isc.B.push(isc.A.instantiateElements=function isc_Tour_instantiateElements(){
        if(!isc.DrawPane){
            this.logWarn("Tour requires the Drawing optional module that is not loaded. Tour cannot be started.");
            return this.Super("instantiateElements",arguments);
        }
        var steps=this.steps;
        this.stepCount=this._preprocessSteps(steps);
        if(steps){
            this.sequences=[{
                elements:steps
            }];
        }
        var steps=this.cancelSteps;
        if(steps){
            if(steps[0])steps[0].firstStep=true;
            if(steps[steps.length-1])steps[steps.length-1].lastStep=true;
            if(this.sequences){
                this.sequences.add({ID:"_cancelSequence",elements:steps});
            }else{
                this.sequences=[{
                    ID:"_cancelSequence",
                    elements:steps
                }];
            }
            this.cancelElement="_cancelSequence";
        }
        return this.Super("instantiateElements",arguments);
    }
,isc.A.traceElement=function isc_Tour_traceElement(currentStep,context){
        if(!currentStep)return;
        if(currentStep.stepNum!=null){
            this.currentStepNum=currentStep.stepNum;
            this.setStateVariable("currentStepNum",this.currentStepNum);
        }
    }
,isc.A.evalTargetAgainstState=function isc_Tour_evalTargetAgainstState(target){
        return target.evalDynamicString(this,this.state);
    }
,isc.A._preprocessSteps=function isc_Tour__preprocessSteps(steps){
        if(!steps)return 0;
        var count=0,
            foundFirstStep,
            lastStep
        ;
        for(var i=0;i<steps.length;i++){
            if(isc.isAn.Object(steps[i])&&!isc.isAn.Instance(steps[i])){
                steps[i]=isc.TourStep.create(steps[i]);
            }
            if(isc.isA.TourStep(steps[i])||isc.isA.TourConfirmStep(steps[i])){
                var step=steps[i];
                step.stepNum=++count;
                if(!foundFirstStep){
                    step.firstStep=foundFirstStep=true;
                }
                lastStep=step;
            }
        }
        if(lastStep)lastStep.lastStep=true;
        return count;
    }
,isc.A.handleFinished=function isc_Tour_handleFinished(){
        this.Super("handleFinished",arguments);
        if(this.autoReset){
            this.reset();
        }
        if(this._outlines){
            for(var i=0;i<this._outlines.length;i++){
                var outline=this._outlines[i];
                outline.top.destroy();
                outline.left.destroy();
                outline.bottom.destroy();
                outline.right.destroy();
            }
            this._outlines=null;
        }
    }
,isc.A.notifyValidationMessage=function isc_Tour_notifyValidationMessage(message){
        var notifyType=this.notifyType;
        if(!this._configuredNotify){
            if(!isc.Tour._addedNotifyTypes)isc.Tour._addedNotifyTypes={};
            if(isc.Tour._addedNotifyTypes[notifyType]||!isc.Notify.typeState[notifyType]){
                var settings=isc.addProperties({},this.notifyMessageDefaults,
                                                     this.notifyMessageSettings);
                isc.Notify.configureMessages(notifyType,settings);
                isc.Tour._addedNotifyTypes[notifyType]=true;
            }
            this._configuredNotify=true;
        }
        var currentState=isc.Notify.typeState[notifyType],
            liveMessages=currentState&&currentState.liveMessages,
            lastMessage=liveMessages&&liveMessages.length>0?liveMessages.last():null;
        if(lastMessage&&lastMessage.contents==message)return;
        isc.Notify.addMessage(message,null,notifyType);
    }
,isc.A.outline=function isc_Tour_outline(locators,applyDropOutline){
        if(!isc.isAn.Array(locators))locators=[locators];
        var objects=[];
        for(var i=0;i<locators.length;i++){
            var locator=locators[i];
            var object=isc.Tour.getLocatorObject(locator);
            if(!isc.isA.Canvas(object)&&!isc.isA.FormItem(object)){
                this.logInfo("Cannot hilite "+object+" - it is neither a Canvas nor a FormItem","tour");
                return;
            }
            objects.add(object);
        }
        isc.ComboBoxItem._suppressHidePickListOnBlur=true;
        this._createOutlines(objects,applyDropOutline);
        this._objects=[];
        this._objectCanvases=[];
        for(var i=0;i<objects.length;i++){
            var object=objects[i],
                objectCanvas=object
            ;
            if(isc.isA.FormItem(object)){
                var icon=isc.AutoTest.getFormItemIcon(locator);
                objectCanvas=isc.FormItemOutlineProxyCanvas.create();
                objectCanvas.delayCall("setFormItem",[object,icon]);
                if(icon){
                    this.logDebug("outline FormItemIcon "+object.form.ID+"."+object.ID+" "+icon,"tour");
                }else{
                    this.logDebug("outline FormItem "+object.form.ID+"."+object.ID,"tour");
                }
            }else if(isc.isA.ListGrid(object)||isc.isA.GridRenderer(object)){
                if(isc.isA.GridRenderer(object))object=object.grid;
                var isNewRecordRow=isc.AutoTest.isNewRecordRowLocator(locators[i]);
                if(isNewRecordRow){
                    objectCanvas=isc.GridRecordOutlineProxyCanvas.create();
                    objectCanvas.setRecord(object,null,null,locators[i]);
                }else{
                    var gridRecord=isc.AutoTest.getRecord(locators[i]),
                        gridField=isc.AutoTest.getField(locators[i]);
                    if(gridRecord){
                        objectCanvas=isc.GridRecordOutlineProxyCanvas.create();
                        objectCanvas.setRecord(object,gridRecord,gridField,locators[i]);
                        if(gridField){
                            this.logDebug("outline ListGridField "+object.ID+"."+gridField.name+
                                        " @ record "+object.getRecordIndex(gridRecord),"tour");
                        }else{
                            this.logDebug("outline ListGrid "+object.ID+" @ record "+
                                        object.getRecordIndex(gridRecord),"tour");
                        }
                    }else{
                        this.logDebug("outline ListGrid "+object.ID,"tour");
                    }
                }
            }else{
                this.logDebug("outline Canvas "+object.ID,"tour");
            }
            this._objects[i]=object;
            this._objectCanvases[i]=objectCanvas;
        }
        this.delayCall("_moveOutline",[],0);
        this.delayCall("showOutline",[],0);
        var tour=this;
        for(var i=0;i<objects.length;i++){
            var object=objects[i],
                objectCanvas=this._objectCanvases[i]
            ;
            var containerCanvas=object;
            if(isc.isA.FormItem(containerCanvas))containerCanvas=containerCanvas.containerWidget;
            if(containerCanvas.scrolled){
                this._observer.observe(containerCanvas,"scrolled",function(){
                    tour.delayCall("_moveOutline");
                });
                this._observer.observe(containerCanvas,"parentScrolled",function(){
                    tour.delayCall("_moveOutline");
                });
            }
            if(objectCanvas.moved){
                this._observer.observe(objectCanvas,"moved",function(){
                    tour.delayCall("_moveOutline");
                });
            }
            if(objectCanvas._visibilityChanged){
                this._observer.observe(objectCanvas,"_visibilityChanged",function(){
                    tour.delayCall("visibilityChanged");
                });
            }
            var topCanvas=object.getTopLevelCanvas&&object.getTopLevelCanvas();
            if(topCanvas&&!this._observer._topCanvii.contains(topCanvas)){
                this._observer._topCanvii.add(topCanvas);
                this._observer.observe(topCanvas,"zIndexChanged",function(){
                    tour.delayCall("_updateOutlineZIndex");
                });
            }
        }
    }
,isc.A.clearOutline=function isc_Tour_clearOutline(){
        delete isc.ComboBoxItem._suppressHidePickListOnBlur;
        this.hideOutline();
        if(this._observer&&this._objects){
            var tcs=this._observer._topCanvii;
            for(var i=0;i<tcs.length;i++){
                var tc=tcs[i];
                this._observer.ignore(tc,"zIndexChanged");
            }
            this._observer._topCanvii=[];
            for(var i=0;i<this._objects.length;i++){
                var object=this._objects[i],
                    objectCanvas=this._objectCanvases[i]
                ;
                this._observer.ignore(object,"moved");
                var containerCanvas=object;
                if(isc.isA.FormItem(containerCanvas))containerCanvas=containerCanvas.containerWidget;
                if(containerCanvas.scrolled){
                    this._observer.ignore(containerCanvas,"scrolled");
                    this._observer.ignore(containerCanvas,"parentScrolled");
                }
                this._observer.ignore(objectCanvas,"_visibilityChanged");
                if(objectCanvas.isOutlineProxyCanvas){
                    objectCanvas.hide();
                    objectCanvas.destroy();
                }
            }
        }
        this._objects=null;
        this._objectCanvases=null;
    }
,isc.A.getOutlineCanvas=function isc_Tour_getOutlineCanvas(locator){
        if(!this._objects)return null;
        var requestedObject=isc.Tour.getLocatorObject(locator);
        if(isc.isA.GridRenderer(requestedObject)){
            requestedObject=requestedObject.grid;
        }
        var gridRecord=isc.isA.ListGrid(requestedObject)&&isc.AutoTest.getRecord(locator),
            newRecordRow=isc.isA.ListGrid(requestedObject)&&isc.AutoTest.isNewRecordRowLocator(locator)
        ;
        for(var i=0;i<this._objects.length;i++){
            var object=this._objects[i],
                objectCanvas=this._objectCanvases[i]
            ;
            if(object==requestedObject){
                if(!gridRecord||
                    (objectCanvas.getRecord&&objectCanvas.getRecord()==(newRecordRow?null:gridRecord)))
                {
                    return objectCanvas;
                }
            }
        }
    }
,isc.A._createOutlines=function isc_Tour__createOutlines(objects,applyDropOutline){
        if(this._outlines&&this._outlines.length>=objects.length){
            for(var i=this._outlines.length-1;i>=objects.length;i--){
                var outline=this._outlines[i];
                if(i>=objects.length){
                    outline.top.destroy();
                    outline.left.destroy();
                    outline.bottom.destroy();
                    outline.right.destroy();
                }else if(i>0){
                    var border=(applyDropOutline?this.dropOutlineBorder:this.outlineBorder);
                    outline.top.setBorder(border);
                    outline.left.setBorder(border);
                    outline.bottom.setBorder(border);
                    outline.right.setBorder(border);
                }
            }
            this._outlines.length=objects.length;
            return;
        }
        if(!this._outlines)this._outlines=[];
        var baseProperties={
            autoDraw:false,
            overflow:"hidden",
            border:this.outlineBorder,
            padding:0
        };
        for(var i=0;i<objects.length;i++){
            if(this._outlines[i])continue;
            if(applyDropOutline&&i>0){
                baseProperties.border=this.dropOutlineBorder;
            }
            this._outlines[i]={
                top:isc.Canvas.create(isc.addProperties(baseProperties,{
                            snapTo:"T",
                            snapEdge:"B",
                            width:"100%",
                            height:2,
                            canDragResize:false,
                            resizeFrom:["T"]
                    })),
                left:isc.Canvas.create(isc.addProperties(baseProperties,{
                            snapTo:"L",
                            snapEdge:"R",
                            width:2,
                            height:"100%",
                            canDragResize:false,
                            resizeFrom:["L"]
                    })),
                bottom:isc.Canvas.create(isc.addProperties(baseProperties,{
                            snapTo:"B",
                            snapEdge:"T",
                            width:"100%",
                            height:2,
                            canDragResize:false,
                            resizeFrom:["B"]
                        })),
                right:isc.Canvas.create(isc.addProperties(baseProperties,{
                            snapTo:"R",
                            snapEdge:"L",
                            width:2,
                            height:"100%",
                            canDragResize:false,
                            resizeFrom:["R"]
                    }))
            };
        }
        if(!this._observer)this._observer=isc.Class.create({
            _topCanvii:[]
        });
    }
,isc.A._resizeOutline=function isc_Tour__resizeOutline(){
        this._refreshOutline();
        this.resizeStop();
    }
,isc.A._moveOutline=function isc_Tour__moveOutline(){
        this._refreshOutline();
    }
,isc.A._updateOutlineZIndex=function isc_Tour__updateOutlineZIndex(){
        this._refreshOutline();
        var step=this.steps.find("stepNum",this.currentStepNum);
        if(step&&step.arrow)step.arrow.bringToFront()
        if(step&&step.targetView)step.targetView.bringToFront();
    }
,isc.A._refreshOutline=function isc_Tour__refreshOutline(){
        if(!this._objects)return;
        for(var i=0;i<this._outlines.length;i++){
            var outline=this._outlines[i],
                object=this._objects[i]
            ;
            if(!object||object.destroyed||object.destroying)continue;
            var targetObject=object;
            object=this._objectCanvases[i];
            var outlinePageRect=this._getObjectOutlineRect(object);
            if(outlinePageRect){
                var width=outlinePageRect[2],
                    height=outlinePageRect[3]
                ;
                outline.top.resizeTo(width,outline.top.height);
                outline.bottom.resizeTo(width,outline.bottom.height);
                outline.left.resizeTo(outline.left.width,height);
                outline.right.resizeTo(outline.right.width,height);
                var isACanvas=isc.isA.Canvas(object);
                var topCanvas=targetObject.getTopLevelCanvas&&targetObject.getTopLevelCanvas();
                for(var key in outline){
                    var piece=outline[key];
                    if(key=="_offscreen"||piece==null)continue;
                    if(isACanvas){
                        piece.show();
                        isc.Canvas.snapToEdge(outlinePageRect,piece.snapTo,piece,piece.snapEdge);
                    }else{
                        isc.Canvas.snapToEdge(object.getPageRect(),piece.snapTo,piece,
                                            piece.snapEdge);
                    }
                    if(topCanvas){
                        piece.moveAbove(topCanvas);
                    }
                }
                delete outline._offscreen;
            }else{
                outline._offscreen=true;
                this.hideOutline();
            }
        }
    }
,isc.A._getObjectOutlineRect=function isc_Tour__getObjectOutlineRect(object){
        var clipCanvas=this.clipCanvas,
            outlinePageRect
        ;
        if(object&&clipCanvas){
            var clipPageRect=clipCanvas.getPageRect(),
                objectPageRect=object.getPageRect(),
                left=Math.max(clipPageRect[0],objectPageRect[0]),
                top=Math.max(clipPageRect[1],objectPageRect[1])
            ;
            if(objectPageRect[0]+objectPageRect[2]>=0&&
                objectPageRect[1]+objectPageRect[3]>=0&&
                top<clipPageRect[1]+clipPageRect[3]&&
                left<clipPageRect[0]+clipPageRect[2])
            {
                outlinePageRect=[
                    left,
                    top,
                    Math.min(clipPageRect[0]+clipPageRect[2],objectPageRect[0]+objectPageRect[2])-left,
                    Math.min(clipPageRect[1]+clipPageRect[3],objectPageRect[1]+objectPageRect[3])-top
                ];
            }
            if(outlinePageRect&&(outlinePageRect[2]<1||outlinePageRect[3]<1)){
                outlinePageRect=null;
            }
        }else{
            outlinePageRect=object.getPageRect();
        }
        return outlinePageRect;
    }
,isc.A.hideOutline=function isc_Tour_hideOutline(){
        if(!this._outlines)return;
        for(var i=0;i<this._outlines.length;i++){
            var outline=this._outlines[i];
            for(var key in outline){
                if(key!="_offscreen"&&outline[key])outline[key].hide();
            }
        }
        this._visible=false;
    }
,isc.A.showOutline=function isc_Tour_showOutline(){
        if(!this._outlines)return;
        var visible=false;
        for(var i=0;i<this._outlines.length;i++){
            var outline=this._outlines[i];
            for(var key in outline){
                if(key!="_offscreen"&&outline[key]){
                    if(outline._offscreen){
                        outline[key].hide();
                    }else{
                        outline[key].show();
                        visible=true;
                    }
                }
            }
        }
        this._visible=visible;
    }
,isc.A.visibilityChanged=function isc_Tour_visibilityChanged(){
        if(!this._objects)return;
        for(var i=0;i<this._objectCanvases.length;i++){
            var canvas=this._objectCanvases[i];
            if(canvas.isVisible()){
                delete this._outlines[i]._offscreen;
            }else{
                this._outlines[i]._offscreen=true;
            }
        }
        this.showOutline();
    }
);
isc.B._maxIndex=isc.C+18;

isc.defineClass("Tutorial","Tour");
isc.A=isc.Tutorial.getPrototype();
isc.A.mode="tutorial"
;

isc.ClassFactory.defineClass("FormItemOutlineProxyCanvas","Canvas");
isc.A=isc.FormItemOutlineProxyCanvas.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.autoDraw=false;
isc.A.isOutlineProxyCanvas=true;
isc.B.push(isc.A.setFormItem=function isc_FormItemOutlineProxyCanvas_setFormItem(formItem,icon){
        var oldFormItem=this.formItem;
        this.formItem=formItem;
        this.formItemIcon=icon;
        this.syncWithFormItemPosition();
        this.sendToBack();
        this.show();
        if(formItem!=oldFormItem){
            if(oldFormItem&&this.isObserving(oldFormItem,"visibilityChanged")){
                this.ignore(oldFormItem,"visibilityChanged");
            }
            if(oldFormItem&&this.isObserving(oldFormItem,"moved")){
                this.ignore(oldFormItem,"moved");
            }
            if(oldFormItem&&oldFormItem.containerWidget&&
                    this.isObserving(oldFormItem.containerWidget,"scrolled"))
            {
                this.ignore(oldFormItem.containerWidget,"scrolled");
            }
            if(oldFormItem&&oldFormItem.containerWidget&&
                    this.isObserving(oldFormItem.containerWidget,"parentScrolled"))
            {
                this.ignore(oldFormItem.containerWidget,"parentScrolled");
            }
            if(!this.isObserving(this.formItem,"visibilityChanged")){
                this.observe(this.formItem,"visibilityChanged",
                    "observer.formItemVisibilityChanged()");
            }
            if(!this.isObserving(this.formItem,"moved")){
                this.observe(this.formItem,"moved",
                    "observer.formItemMoved()");
            }
            if(this.formItem.containerWidget&&
                !this.isObserving(this.formItem.containerWidget,"scrolled"))
            {
                this.observe(this.formItem.containerWidget,"scrolled",
                    "observer.formItemMoved()");
            }
            if(this.formItem.containerWidget&&
                !this.isObserving(this.formItem.containerWidget,"parentScrolled"))
            {
                this.observe(this.formItem.containerWidget,"parentScrolled",
                    "observer.formItemMoved()");
            }
        }
    }
,isc.A.destroy=function isc_FormItemOutlineProxyCanvas_destroy(){
        if(this.formItem&&this.isObserving(this.formItem,"visibilityChanged")){
            this.ignore(this.formItem,"visibilityChanged");
        }
        if(this.formItem&&this.isObserving(this.formItem,"moved")){
            this.ignore(this.formItem,"moved");
        }
        if(this.formItem&&this.formItem.containerWidget&&
            this.isObserving(this.formItem.containerWidget,"scrolled"))
        {
            this.ignore(this.formItem,"scrolled");
        }
        if(this.formItem&&this.formItem.containerWidget&&
            this.isObserving(this.formItem.containerWidget,"parentScrolled"))
        {
            this.ignore(this.formItem.containerWidget,"parentScrolled");
        }
        this.Super("destroy",arguments);
    }
,isc.A.syncWithFormItemPosition=function isc_FormItemOutlineProxyCanvas_syncWithFormItemPosition(){
        if(!this.formItem||!this.formItem.form)return;
        this.setPageLeft(this._getPageLeft());
        this.setPageTop(this._getPageTop());
        this.setWidth(this._getVisibleWidth()||10);
        this.setHeight(this._getVisibleHeight()||10);
    }
,isc.A.formItemVisibilityChanged=function isc_FormItemOutlineProxyCanvas_formItemVisibilityChanged(){
        if(this.formItem.isVisible())this.show();
        else this.hide();
    }
,isc.A.formItemMoved=function isc_FormItemOutlineProxyCanvas_formItemMoved(){
        this.syncWithFormItemPosition();
    }
,isc.A._getPageLeft=function isc_FormItemOutlineProxyCanvas__getPageLeft(){
        var formItem=this.formItem,
            iconPageLeft=this._getIconPageLeft();
        return(iconPageLeft!=null?iconPageLeft:formItem.getPageLeft());
    }
,isc.A._getPageTop=function isc_FormItemOutlineProxyCanvas__getPageTop(){
        var formItem=this.formItem,
            iconPageTop=this._getIconPageTop();
        return(iconPageTop!=null?iconPageTop:formItem.getPageTop());
    }
,isc.A._getIconPageLeft=function isc_FormItemOutlineProxyCanvas__getIconPageLeft(){
        var iconPageRect=this._getIconPageRect();
        return(iconPageRect?iconPageRect[0]:null);
    }
,isc.A._getIconPageTop=function isc_FormItemOutlineProxyCanvas__getIconPageTop(){
        var iconPageRect=this._getIconPageRect();
        return(iconPageRect?iconPageRect[1]:null);
    }
,isc.A._getIconWidth=function isc_FormItemOutlineProxyCanvas__getIconWidth(){
        var iconPageRect=this._getIconPageRect();
        return(iconPageRect?iconPageRect[2]:null);
    }
,isc.A._getIconHeight=function isc_FormItemOutlineProxyCanvas__getIconHeight(){
        var iconPageRect=this._getIconPageRect();
        return(iconPageRect?iconPageRect[3]:null);
    }
,isc.A._getIconPageRect=function isc_FormItemOutlineProxyCanvas__getIconPageRect(){
        var formItem=this.formItem,
            icon=this.formItemIcon,
            pageRect
        ;
        if(!icon)return null;
        if(formItem.getIcon(icon)){
            pageRect=formItem.getIconPageRect(icon);
        }else{
            var iconElement=isc.Element.get(formItem.getErrorIconId());
            pageRect=isc.Element.getElementRect(iconElement);
        }
        return pageRect;
    }
,isc.A._getVisibleWidth=function isc_FormItemOutlineProxyCanvas__getVisibleWidth(){
        var formItem=this.formItem,
            iconWidth=this._getIconWidth();
        return(iconWidth!=null?iconWidth:formItem.getVisibleWidth());
    }
,isc.A._getVisibleHeight=function isc_FormItemOutlineProxyCanvas__getVisibleHeight(){
        var formItem=this.formItem,
            iconWidth=this._getIconHeight();
        return(iconWidth!=null?iconWidth:formItem.getVisibleHeight());
    }
);
isc.B._maxIndex=isc.C+14;

isc.ClassFactory.defineClass("GridRecordOutlineProxyCanvas","Canvas");
isc.A=isc.GridRecordOutlineProxyCanvas.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.autoDraw=false;
isc.A.isOutlineProxyCanvas=true;
isc.B.push(isc.A.setRecord=function isc_GridRecordOutlineProxyCanvas_setRecord(grid,record,field,locator){
        this.grid=grid;
        this.record=record;
        this.field=field;
        this.locator=locator;
        this.syncPosition();
        this.sendToBack();
        this.show();
        this.observe(this.grid,"moved","observer.gridMoved()");
        this.observe(this.grid,"scrolled","observer.gridScrolled()");
        this.observe(this.grid,"dataChanged","observer.gridDataChanged()");
    }
,isc.A.getRecord=function isc_GridRecordOutlineProxyCanvas_getRecord(){
        return this.record;
    }
,isc.A.getField=function isc_GridRecordOutlineProxyCanvas_getField(){
        return this.field;
    }
,isc.A.getLocator=function isc_GridRecordOutlineProxyCanvas_getLocator(){
        return this.locator;
    }
,isc.A.destroy=function isc_GridRecordOutlineProxyCanvas_destroy(){
        if(this.grid&&this.isObserving(this.grid,"scrolled")){
            this.ignore(this.grid,"scrolled");
        }
        if(this.grid&&this.isObserving(this.grid,"dataChanged")){
            this.ignore(this.grid,"dataChanged");
        }
        this.Super("destroy",arguments);
    }
,isc.A.syncPosition=function isc_GridRecordOutlineProxyCanvas_syncPosition(){
        if(!this.grid)return;
        var grid=this.grid,
            rowNum=(this.record?grid.getRowNum(this.record):grid.getTotalRows()-1),
            visibleRows=grid.getVisibleRows(),
            visible=false
        ;
        if(rowNum<0&&this.locator){
            var gridRecord=isc.AutoTest.getRecord(this.locator),
                isNewRecordRow=isc.AutoTest.isNewRecordRowLocator(this.locator)
            ;
            if(gridRecord&&!isNewRecordRow){
                var newRowNum=grid.getRowNum(gridRecord);
                if(newRowNum>=0){
                    this.record=gridRecord;
                    rowNum=newRowNum;
                }
            }
        }
        if(isc.isA.Menu(grid)||(rowNum>=0&&visibleRows[0]<=rowNum&&rowNum<=visibleRows[1])){
            var rect=this.locator!=null?isc.AutoTest.getPageRect(this.locator):null;
            if(rect!=null){
                this.setPageRect(rect);
                this.recordWidth=rect[2];
            }else{
                var left=grid.getPageLeft();
                var colNum=this.field?grid.getFieldNum(this.field):-1;
                if(colNum!=-1){
                    left+=this._getColumnLeft(colNum);
                }
                this.setPageLeft(left);
                this.setPageTop(grid.getRowPageTop(rowNum));
                var width=this.field==null?grid.getInnerWidth():this._getColumnWidth(colNum);
                this.setWidth(width||10);
                this.setHeight(grid.getDrawnRowHeight(rowNum)||10);
                this.recordWidth=this.field?width:this._getPopulatedRecordWidth(grid,rowNum);
            }
            visible=true;
        }
        return visible;
    }
,isc.A.gridMoved=function isc_GridRecordOutlineProxyCanvas_gridMoved(){
        if(this.destroyed||this.destroying)return;
        var visible=this.syncPosition();
        if(visible){
            this.sendToBack();
            this.show();
        }else{
            this.hide();
        }
    }
,isc.A.gridScrolled=function isc_GridRecordOutlineProxyCanvas_gridScrolled(){
        if(this.destroyed||this.destroying)return;
        var visible=this.syncPosition();
        if(visible){
            this.sendToBack();
            this.show();
        }else{
            this.hide();
            var rowNum=(this.record?this.grid.getRowNum(this.record):this.grid.getTotalRows()-1);
            if(rowNum>=0){
                this.grid.scrollToRow(rowNum);
            }
        }
    }
,isc.A.gridDataChanged=function isc_GridRecordOutlineProxyCanvas_gridDataChanged(){
        if(this.destroyed||this.destroying)return;
        var visible=this.syncPosition();
        if(visible){
            this.sendToBack();
            this.show();
        }else{
            this.hide();
            var rowNum=(this.record?this.grid.getRowNum(this.record):this.grid.getTotalRows()-1);
            if(rowNum>=0){
                this.grid.scrollToRow(rowNum);
            }
        }
    }
,isc.A._getColumnLeft=function isc_GridRecordOutlineProxyCanvas__getColumnLeft(colNum){
        var grid=this.grid,
            fieldBody=grid.getFieldBody(colNum),
            fieldColNum=grid.getLocalFieldNum(colNum),
            fieldWidths=fieldBody.getColumnSizes()
        ;
        if(fieldBody.isRTL()){
            return fieldBody.getViewportWidth()-fieldWidths.sum(0,fieldColNum+1);
        }else{
            return fieldWidths.sum(0,fieldColNum);
        }
    }
,isc.A._getColumnWidth=function isc_GridRecordOutlineProxyCanvas__getColumnWidth(colNum){
        var grid=this.grid,
            fieldBody=grid.getFieldBody(colNum),
            fieldColNum=grid.getLocalFieldNum(colNum),
            fieldWidths=fieldBody.getColumnSizes()
        ;
        return fieldWidths[fieldColNum];
    }
,isc.A._getPopulatedRecordWidth=function isc_GridRecordOutlineProxyCanvas__getPopulatedRecordWidth(grid,rowNum){
        if(rowNum<0)return grid.body.getInnerWidth();
        var widths=grid.getCurrentFieldWidths(),
            record=grid.getRecord(rowNum),
            totalWidth=0,
            widthToLastValue=0,
            lastValueField
        ;
        for(var i=0;i<widths.length;i++){
            var width=widths[i]||0,
                field=grid.getField(i),
                value=grid.getCellValue(record,rowNum,i)
            ;
            if(!field.isRemoveField&&value!=null&&value!=""){
                widthToLastValue=totalWidth;
                lastValueField=i;
            }
            totalWidth+=width;
        }
        if(lastValueField!=null){
            widthToLastValue+=grid.body.getColumnAutoSize(lastValueField,rowNum,rowNum+1);
        }
        return widthToLastValue;
    }
);
isc.B._maxIndex=isc.C+12;

isc.defineClass("TourStep","UserTask");
isc.A=isc.TourStep;
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.stepPropertiesForTourWindow=[
        "showPointer",
        "showCancelButton",
        "cancelButtonTitle",
        "showActionButton",
        "actionButtonTitle"
    ];
isc.A.stepPropertiesForTourWindowPointerSettings={
        "pointerSnapTo":"snapTo",
        "targetOffsetInto":"targetOffsetInto"
    }
;
isc.B.push(isc.A.applyTourStepProperties=function isc_c_TourStep_applyTourStepProperties(defaults,step){
        var propertyNames=this.stepPropertiesForTourWindow;
        if(!defaults)defaults={};
        for(var i=0;i<propertyNames.length;i++){
            var propertyName=propertyNames[i];
            if(step[propertyName]!=null){
                defaults[propertyName]=step[propertyName];
            }
        }
        if(this.stepPropertiesForTourWindowPointerSettings){
            if(!defaults.pointerSettings)defaults.pointerSettings={};
            var map=this.stepPropertiesForTourWindowPointerSettings,
                settings=defaults.pointerSettings
            ;
            for(var key in map){
                if(step[key]!=null){
                    settings[map[key]]=step[key];
                }
            }
        }
        return defaults;
    }
);
isc.B._maxIndex=isc.C+1;

isc.A=isc.TourStep.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.targetOffsetInto=6;
isc.A.targetViewConstructor="TourWindow";
isc.A.targetViewDefaults={
        actionClick:function(){
            this.nextStep();
        },
        nextStep:function(){
            var task=this.userTask,
                tour=task._process
            ;
            if(tour==null){
                return;
            }
            var _this=this;
            this.tourStep.waitForTargetsDone(function(){
                var targets=task.targets,
                    typedValue=_this._restoreTargetHandlers()
                ;
                if(typedValue!=null){
                    tour.setStateVariable("lastEnteredText",typedValue);
                    if(task.bindEnteredText){
                        var varPath=task.bindEnteredText;
                        if(varPath.startsWith("$"))varPath=varPath.substring(1);
                        this.setStateVariable(varPath,typedValue);
                    }
                }
                var output=typedValue;
                if(tour.state&&tour.state.VB){
                    output=tour.state.VB.lastAdded;
                }else if(targets&&!typedValue){
                    var target=targets[0],
                        locator=target.locator
                    ;
                    if(isc.AutoTest.isRecordLocator(locator)){
                        output=isc.AutoTest.getRecord(locator);
                    }else{
                        output=_this.tourStep.getLocatorObject(locator);
                    }
                }
                tour.setTaskOutput(task,output);
                task.completeEditing();
            });
        },
        cancelStep:function(stateVariable){
            var task=this.userTask,
                tour=task._process,
                _this=this
            ;
            if(tour==null){
                return;
            }
            this.tourStep.waitForTargetsDone(function(){
                _this._restoreTargetHandlers();
                tour.setStateVariable(stateVariable,true);
                if(tour.cancelElement){
                    task.cancelElement=tour.cancelElement;
                    delete tour.showProgress;
                }
                task.cancelEditing();
            });
        },
        cancelClick:function(){
            this.cancelStep("canceled");
        },
        closeClick:function(){
            this.cancelStep("closed");
        },
        _restoreTargetHandlers:function(){
            var task=this.userTask,
                targets=task.targets,
                typedValue
            ;
            task.hideMasks();
            if(targets){
                for(var i=0;i<targets.length;i++){
                    var target=targets[i],
                        type=target.type;
                    if(type=="change"){
                        typedValue=task._restoreTextField(target);
                    }else if(type=="menuItemSelect"||type=="menuItemOpen"){
                        task._restoreMenu(target);
                    }
                }
            }
            return typedValue;
        }
    };
isc.A.inputValidationNotifyMessage="Please enter '${expectedValue}'";
isc.A.waitForDoneTimeout=3000;
isc.A.waitForDoneRetryTime=200;
isc.A._rotationOffsets={
        0:{arrow:[0,"centerY"],window:["width","centerY"],extraLeft:-20},
        45:{arrow:[0,0],window:["width","height"]},
        90:{arrow:["centerX",0],window:["centerX","height"],extraTop:-20},
        135:{arrow:["width",0],window:[0,"height"]},
        180:{arrow:["width","centerY"],window:[0,"centerY"],extraLeft:20},
        225:{arrow:["width","height"],window:[0,0]},
        270:{arrow:["centerX","height"],window:["centerX",0],extraTop:20},
        315:{arrow:[0,"height"],window:["width",0]}
    };
isc.A.waitForReadyTimeout=5000;
isc.A.autoComplete=true;
isc.A._actionToEventMap={
        drag:["mouseOver","mouseOut","mouseMove","mouseDown","mouseUp",
            "dragStart","dragMove","dragStop","setDragTracker",
            "touchStart","touchMove","touchEnd"],
        drop:["mouseOver","mouseOut","mouseMove","mouseUp",
            "dragStop","dropOver","dropOut","dropMove","drop",
            "touchMove","touchEnd"
        ],
        click:["mouseOver","mouseOut","mouseMove","mouseDown","mouseUp","click",
               "touchStart","touchMove","touchEnd"
        ],
        mouseDown:["mouseOver","mouseOut","mouseMove","mouseDown","mouseUp",
                    "click",
                    "touchStart","touchMove","touchEnd"
                ],
        doubleClick:["mouseOver","mouseOut","mouseMove","mouseDown","mouseUp","click","doubleClick",
                     "touchStart","touchMove","touchEnd"],
        rightClick:["mouseOver","mouseOut","mouseMove","mouseDown","mouseUp","showContextMenu","rightMouseDown",
                    "touchStart","touchMove","touchEnd"],
        mouseOver:["mouseOver","mouseOut","mouseMove"],
        menuItemOpen:["mouseOver","mouseOut","mouseMove","mouseDown","mouseUp","click",
                      "touchStart","touchMove","touchEnd"],
        menuItemSelect:["mouseOver","mouseOut","mouseMove","mouseDown","mouseUp","click",
                        "touchStart","touchMove","touchEnd"]
    };
isc.A._limitOutsideLocCERs={};
isc.A._defaultNotifyDelay=500;
isc.A.arrowDefaults={
        _constructor:isc.DrawPane,
        autoDraw:false,
        shadowPadding:10,
        leftOffset:10,
        topOffset:10,
        width:140+(10*2),
        height:70+(10*2),
        length:142,
        breadth:72,
        rotate:function(degrees){
            this.Super("rotate",arguments);
            var arrowItem=this.drawItems[0],
                box=arrowItem.getResizeBoundingBox(),
                width=Math.round(box[2]-box[0]),
                height=Math.round(box[3]-box[1]),
                padding=this.shadowPadding*2
            ;
            arrowItem.moveTo(this.leftOffset,this.topOffset);
            this.resizeTo(width+padding,height+padding);
        },
        _zLayerName:"_notify"
    };
isc.A.arrowItemDefaults={
        _constructor:isc.DrawPolygon,
        autoDraw:false,
        points:[[0,17],[80,17],[80,0],[140,35],
                 [80,70],[80,53],[0,53],[0,17]],
        fillColor:"red",
        lineWidth:2,
        lineColor:"white",
        shadow:{
            blur:20,
            color:"#7f7f7f",
            offset:[5,5]
        }
    };
isc.B.push(isc.A.executeElement=function isc_TourStep_executeElement(tour,readyForResolve){
        this._tour=tour;
        if(!this.ID)this.ID="tourStep"+this.stepNum;
        var task=this;
        if(this.target&&!readyForResolve&&this._tour.waitForTargetResolvable){
            var callback=function(){
                task.delayCall("executeElement",[task._tour,true]);
            };
            if(this._tour.waitForTargetResolvable(this.target,callback)){
                return false;
            }
        }
        var targets=this.targets=this.resolveTargets(),
            tourMode=tour.mode||"tour"
        ;
        if(tourMode=="tour"){
            if(this.showPointer==null&&this.showArrow==null&&targets&&targets.length>0){
                this.showPointer=true;
            }
        }else{
            if(this.showOutline==null){
                this.showOutline=true;
            }
        }
        this.waitForTargetsReady(targets,function(targets,failed){
            if(failed){
                tour.start();
                return;
            }
            if(targets){
                if(!task.validateTargets(targets)){
                    task.logWarn("Tour canceled because no valid targets found for step");
                    tour.setNextElement(null);
                    tour.start();
                    return;
                }
                task.createTargetView(targets);
                if(task.autoComplete!=false&&
                    (targets[0].type=="click"||
                     targets[0].type=="doubleClick"||
                     targets[0].type=="rightClick"||
                     targets[0].type=="menuItemSelect"||
                     targets[0].type=="mouseDown"||
                     targets[0].type=="menuItemOpen"||
                    (targets[0].type=="change"&&task.expectedValue)||
                     targets.containsProperty("type","drop"))&&
                    task.showActionButton==null)
                {
                    task.targetView.setShowActionButton(false);
                }
                if(task.showOutline){
                    task.outlineTargets(targets);
                }
                if(!task.showPointer){
                    var positionArrowAndWindow=function(task,targets,initial){
                        task.placeArrow(targets);
                        task.positionWindow(targets);
                    };
                    positionArrowAndWindow(task,targets,true);
                    task.whenTargetsMoveCall(task,targets,positionArrowAndWindow);
                }
                var dropTarget=targets.find("type","drop");
                if(dropTarget){
                    var locator=dropTarget.locator,
                        component=this.getLocatorObject(locator)
                    ;
                    if(component&&component.editingOn&&
                        isc.isA.Layout(component)&&component.getMembersLength()>0)
                    {
                        component.editContext._origAllowDropThrough=component.editContext.allowDropThrough;
                        component.editContext.allowDropThrough=true;
                    }
                }
                task.setupStepCompleteNotification(targets);
            }else{
                task.createTargetView(targets);
            }
            task.maskTargets(targets);
            task.Super("executeElement",[tour]);
        });
        return false;
    }
,isc.A.completeElement=function isc_TourStep_completeElement(tour){
        this.cancelTargetsMoveCall(this.targets);
        if(this.targetView){
            this.targetView.hide();
            this.targetView.markForDestroy();
            delete this.targetView;
        }
        this.removeOutlines();
        this.destroyArrow();
        var targets=this.targets;
        if(targets){
            var dropTarget=targets.find("type","drop");
            if(dropTarget){
                var locator=dropTarget.locator,
                    component=this.getLocatorObject(locator)
                ;
                if(component&&component.editingOn&&component.editContext._origAllowDropThrough!=null){
                    component.editContext.allowDropThrough=component.editContext._origAllowDropThrough;
                    delete component.editContext._origAllowDropThrough;
                }
            }
        }
        if(targets){
            for(var i=0;i<targets.length;i++){
                var target=targets[i];
                if(target._pageEventID!=null){
                    isc.Page.ignoreTargetEvent(target._eventComponent,target._eventType,target._pageEventID);
                }
            }
        }
    }
,isc.A.getLocatorObject=function isc_TourStep_getLocatorObject(locator){
        return isc.Tour.getLocatorObject(locator);
    }
,isc.A.waitForTargetsDone=function isc_TourStep_waitForTargetsDone(callback){
        if(!this._waitForDoneStart)this._waitForDoneStart=isc.timeStamp();
        var targets=this.targets;
        if(targets){
            for(var i=0;i<targets.length;i++){
                var target=targets[i],
                    locator=target.locator,
                    component=this.getLocatorObject(locator)
                ;
                if(component){
                    if(this._hasPendingActionsOnPause(component)||
                        (isc.isA.FormItem(component)&&!isc.AutoTest.isItemDone(component))||
                        (component._isProcessingDone&&!component._isProcessingDone()))
                    {
                        var current=isc.timeStamp();
                        if(current-this._waitForDoneStart>this.waitForDoneTimeout){
                            var lastBusy=[],
                                failureReport=null
                            ;
                            if(this._hasPendingActionsOnPause(component))lastBusy.add("pending actions");
                            isc.AutoTest._isItemDoneLog=null;
                            isc.AutoTest.clearAllLogSlots();
                            if(isc.isA.FormItem(component)&&!isc.AutoTest.isItemDone(component)){
                                lastBusy.add("item not done");
                                failureReport=isc.AutoTest.getLogFailureText();
                                if(isc.AutoTest._isItemDoneLog!=null){
                                    failureReport=(failureReport?failureReport+" - ":"")+isc.AutoTest._isItemDoneLog;
                                }
                            }
                            if(component._isProcessingDone&&!component._isProcessingDone())lastBusy.add("processing");
                            var reason=" ["+lastBusy.join(",")+"]";
                            this.logWarn("Timed out waiting for target component to be done: "+component+reason+" continuing"+(failureReport?" -> "+failureReport:""));
                        }else{
                            this.delayCall("waitForTargetsDone",arguments,this.waitForDoneRetryTime);
                            return;
                        }
                    }
                }
            }
        }
        if(!isc.AutoTest.isSystemDone()){
            var current=isc.timeStamp();
            if(current-this._waitForDoneStart>this.waitForDoneTimeout){
                var priority=isc.Log.getPriority("quiescence");
                isc.Log.setPriority("quiescence",isc.Log.DEBUG);
                try{
                    isc.AutoTest.clearAllLogSlots();
                    if(!isc.AutoTest.isSystemDone()){
                        var failureReport=isc.AutoTest.getLogFailureText();
                        this.logWarn("Timed out waiting for page to quiet: "+failureReport);
                    }
                }finally{
                    if(priority!=null)isc.Log.setPriority("quiescence",priority);
                    else isc.Log.clearPriority("quiescence",priority);
                }
            }else{
                this.delayCall("waitForTargetsDone",arguments,this.waitForDoneRetryTime);
                return;
            }
        }
        delete this._waitForDoneStart;
        if(callback)this.fireCallback(callback);
    }
,isc.A._hasPendingActionsOnPause=function isc_TourStep__hasPendingActionsOnPause(target){
        var actionsOnPause=target.getClass()._actionsOnPause,
            targetInstanceID=target.getClassName(),
            hasActions=false
        ;
        if(actionsOnPause&&!isc.isAn.emptyObject(actionsOnPause)){
            for(var id in actionsOnPause){
                var actions=actionsOnPause[id];
                if(actions[target.ID]){
                    hasActions=true;
                    break;
                }
            }
        }
        return hasActions;
    }
,isc.A.createTargetView=function isc_TourStep_createTargetView(targets){
        var tour=this._tour,
            state=tour.state,
            title=this.title,
            contents=this.instructions||this.contents,
            actionButtonTitle=tour.stepActionButtonTitle||"Next",
            cancelButtonTitle=tour.stepCancelButtonTitle||"Skip this tour",
            cancelButtonPrompt=tour.stepCancelButtonPrompt,
            canCancel=(tour.canCancel!=false),
            showCancelButton=tour.showCancelButton!==false;
        ;
        if(this.lastStep){
            actionButtonTitle=tour.lastStepActionButtonTitle||"Done";
        }else if(this.firstStep){
            actionButtonTitle=tour.firstStepActionButtonTitle||"Let's go!";
            cancelButtonTitle=tour.firstStepCancelButtonTitle||cancelButtonTitle;
        }
        var defaults={
            tourStep:this,
            title:(title?title.evalDynamicString(this,state):null),
            contents:(contents?contents.evalDynamicString(this,state):null),
            actionButtonTitle:actionButtonTitle,
            showCancelButton:showCancelButton&&!this.lastStep,
            cancelButtonTitle:cancelButtonTitle,
            cancelButtonPrompt:cancelButtonPrompt,
            cancelButtonDisabled:!canCancel,
            showCloseButton:canCancel
        };
        if(tour.showProgress){
            var percentDone=Math.round((this.stepNum-1)/tour.stepCount*100.0);
            isc.addProperties(defaults,{
                showProgress:true,
                percentDone:percentDone,
                showProgressPercent:tour.showProgressPercent,
                showProgressPercentInline:tour.showProgressPercentInline
            });
        }
        if(tour.windowDefaults){
            isc.addProperties(defaults,tour.windowDefaults);
        }
        if(this.windowDefaults){
            isc.addProperties(defaults,this.windowDefaults);
        }
        isc.TourStep.applyTourStepProperties(defaults,this);
        if(this.showPointer&&!defaults.pointerTarget){
            defaults.pointerTarget=targets[0].locator;
            if(defaults.pointerTarget&&this.actionType!=null&&this.actionType!="none"){
                if(!defaults.pointerSettings)defaults.pointerSettings={};
                isc.addProperties(defaults.pointerSettings,{
                    hideApexShadow:true,
                    targetOffsetInto:0
                });
            }
        }
        this.targetView=this.createAutoChild("targetView",defaults);
        this.targetView.bringToFront();
    }
,isc.A.positionWindow=function isc_TourStep_positionWindow(targets){
        if(!targets||targets.length==0||this.showPointer)return;
        if(!this.targetView.isDrawn()){
            this.targetView.autoCenter=false;
            this.targetView.setTop(-9999);
            this.targetView.draw();
            this.targetView.hide();
        }
        var _this=this;
        var components=targets.map(function(target){
            return _this.getLocatorObject(target.locator);
        });
        if(components.length>1&&!targets.find("type","textClick")){
            this._positionWindowBetweenTargets(targets,components);
        }else if(targets[0].type=="drag"){
            this.targetView.centerInPage();
        }else{
            var source=components[0],
                sourceLocator=targets[0].locator
            ;
            this._positionWindowAtSource(source,sourceLocator);
        }
    }
,isc.A._positionWindowBetweenTargets=function isc_TourStep__positionWindowBetweenTargets(targets,components){
        var pageWidth=isc.Page.getWidth(),
            pageHeight=isc.Page.getHeight(),
            arrow=this.getArrow(),
            arrowLeft=arrow.left+arrow.leftOffset,
            arrowTop=arrow.top+arrow.topOffset,
            arrowWidth=arrow.getVisibleWidth()-arrow.shadowPadding*2,
            arrowHeight=arrow.getVisibleHeight()-arrow.shadowPadding*2,
            arrowRight=arrowLeft+arrowWidth,
            arrowBottom=arrowTop+arrowHeight,
            arrowCenter=arrow.getCenter(),
            arrowRotation=arrow.rotation,
            arrowIsDiagonal=(arrowRotation%90)!=0,
            window=this.targetView,
            width=window.getVisibleWidth(),
            height=window.getVisibleHeight(),
            newLeft,
            newTop
        ;
        var horizontalSpace=0,
            verticalSpace=0,
            rotationAdder=0
        ;
        if((135<=arrowRotation&&arrowRotation<=225)||45>=arrowRotation||arrowRotation>=315){
            verticalSpace=(arrowTop>(pageHeight-arrowBottom)?-1:1);
            if((verticalSpace<0&&(135<=arrowRotation&&arrowRotation<=225))||
                (verticalSpace>0&&(315<=arrowRotation||arrowRotation<=45)))
            {
                rotationAdder=180;
            }
        }else{
            horizontalSpace=(arrowLeft>(pageWidth-arrowRight)?-1:1);
            if((horizontalSpace<0&&(45<=arrowRotation&&arrowRotation<=135))||
                (horizontalSpace>0&&(225<=arrowRotation&&arrowRotation<=315)))
            {
                rotationAdder=180;
            }
        }
        var distanceFromCenter=40,
            adjustedArrowRotation=(arrowRotation+rotationAdder)%360,
            offsetRotation=(adjustedArrowRotation>=90?adjustedArrowRotation-90:360+adjustedArrowRotation-90),
            radians=offsetRotation*Math.PI/180,
            cornerX=Math.round(arrowCenter[0]+(distanceFromCenter*Math.cos(radians))),
            cornerY=Math.round(arrowCenter[1]+(distanceFromCenter*Math.sin(radians))),
            centerMostX=cornerX,
            pageCenterX=pageWidth/2,
            pageCenterY=pageHeight/2
        ;
        if(arrowIsDiagonal){
            for(var i=0;i<3;i++){
                if(0<offsetRotation&&offsetRotation<90){
                    newLeft=cornerX;
                    newTop=cornerY;
                    if(newLeft+width>pageWidth-20){
                        newLeft-=(newLeft+width-pageWidth+20);
                        if(newTop<arrowBottom)newTop=arrowBottom+10;
                    }
                }else if(90<offsetRotation&&offsetRotation<180){
                    newLeft=cornerX-width;
                    newTop=cornerY;
                    if(newLeft<20){
                        newLeft=20;
                        if(newTop<arrowBottom)newTop=arrowBottom+10;
                    }
                }else if(180<offsetRotation&&offsetRotation<270){
                    newLeft=cornerX-width;
                    newTop=cornerY-height;
                    if(newTop<20){
                        newTop=20;
                        if(newLeft+width>arrowLeft)newLeft=arrowLeft-10-width;
                    }
                }else{
                    newLeft=cornerX;
                    newTop=cornerY-height;
                    if(newTop<20){
                        newTop=20;
                        if(newLeft<arrowRight)newLeft=arrowRight+10;
                    }
                }
                var onScreen=((newLeft>=0&&newLeft+width<=pageWidth)&&
                                (newTop>=0&&newTop+height<=pageHeight));
                if(onScreen)break;
                var flipSide;
                if(i==1){
                    if(cornerX!=centerMostX){
                        flipSide=true;
                    }
                }
                if(i==0||flipSide){
                    rotationAdder=(rotationAdder+180)%360;
                    adjustedArrowRotation=(arrowRotation+rotationAdder)%360;
                    offsetRotation=(adjustedArrowRotation>=90?adjustedArrowRotation-90:360+adjustedArrowRotation-90);
                    radians=offsetRotation*Math.PI/180;
                    cornerX=Math.round(arrowCenter[0]+(distanceFromCenter*Math.cos(radians)));
                    cornerY=Math.round(arrowCenter[1]+(distanceFromCenter*Math.sin(radians)));
                    if(Math.abs(cornerX-pageCenterX)<Math.abs(centerMostX-pageCenterX)){
                        centerMostX=cornerX;
                    }
                    flipSide=false;
                }
                if(i==2){
                    var deltaY;
                    if(cornerY>=pageCenterY){
                        deltaY=pageHeight-newTop-height-10;
                    }else{
                        deltaY=Math.abs(newTop)+10;
                    }
                    var interiorAngle=(adjustedArrowRotation>270?adjustedArrowRotation-270:
                                         adjustedArrowRotation>180?adjustedArrowRotation-180:
                                         adjustedArrowRotation>90?180-adjustedArrowRotation:
                                         adjustedArrowRotation),
                        interiorAngleRadians=(90-interiorAngle)*Math.PI/180,
                        c=deltaY/Math.cos(interiorAngleRadians),
                        deltaX=Math.round(c*Math.sin(interiorAngleRadians))*
                                    (adjustedArrowRotation>270||
                                        (adjustedArrowRotation>90&&adjustedArrowRotation<180)?
                                     -1:1)
                    ;
                    newTop+=deltaY;
                    newLeft+=deltaX;
                }
            }
        }else{
            newLeft=(offsetRotation==0?cornerX:
                       offsetRotation==90?cornerX-width/2:
                       offsetRotation==180?cornerX-width:cornerX-width/2);
            newTop=(offsetRotation==0?cornerY-height/2:
                        offsetRotation==90?cornerY:
                        offsetRotation==180?cornerY-height/2:cornerY-height);
            if(newLeft<20)newLeft=20;
            else if(newLeft+width>pageWidth-20)newLeft=pageWidth-20-width;
            if(newTop<20)newTop=20;
            else if(newTop>pageHeight-20)newTop=pageHeight-20-height;
            var target=components[1],
                targetLocator=targets[1].locator,
                targetRect=this._getTargetPageRect(targetLocator,target,this.dropQuadrant)
            ;
            if(isc.Canvas.rectsIntersect(targetRect,[newLeft,newTop,width,height])){
                if(offsetRotation==0||offsetRotation==180){
                    if(arrowRotation==90)newTop=targetRect[1]-height-5;
                    else newTop=targetRect[1]+targetRect[3]+5;
                }else if(offsetRotation==90||offsetRotation==270){
                    if(arrowRotation==0)newLeft=targetRect[0]-width-5;
                    else newLeft=targetRect[0]+targetRect[2]+5;
                }
            }
        }
        window.moveTo(newLeft,newTop);
    }
,isc.A._getTargetModalWindow=function isc_TourStep__getTargetModalWindow(target){
        if(!target||(!target.getParentElements&&!target.form))return null;
        var parents=(target.form||target).getParentElements();
        if(parents&&parents.length>0){
            var window=parents[parents.length-1];
            if(isc.isA.Window(window)&&window.isModal)return window;
        }
    }
,isc.A._positionWindowAtSource=function isc_TourStep__positionWindowAtSource(source,sourceLocator){
        var pageWidth=isc.Page.getWidth(),
            pageHeight=isc.Page.getHeight(),
            arrow=this.getArrow(),
            arrowLeft=arrow.left+arrow.leftOffset,
            arrowTop=arrow.top+arrow.topOffset,
            arrowWidth=arrow.getVisibleWidth()-arrow.shadowPadding*2,
            arrowHeight=arrow.getVisibleHeight()-arrow.shadowPadding*2,
            arrowRight=arrowLeft+arrowWidth,
            arrowBottom=arrowTop+arrowHeight,
            arrowRotation=arrow.rotation,
            window=this.targetView,
            width=window.getVisibleWidth(),
            height=window.getVisibleHeight(),
            newLeft,
            newTop
        ;
        var sourceDialog=this._getTargetModalWindow(source);
        if(sourceDialog&&
            sourceDialog.getVisibleWidth()<(pageWidth/2)&&
            sourceDialog.getVisibleHeight()<(pageHeight/2))
        {
            source=sourceDialog;
        }
        var placed=false;
        if(this._positionWindowOppositeArrow){
            var left=source.getPageLeft(),
                top=source.getPageTop()
            ;
            if(arrowLeft>left){
                newLeft=left-20-width;
            }else{
                newLeft=left+source.getVisibleWidth()+20;
            }
            newTop=top+source.getVisibleHeight()/2-height/2;
            placed=(newLeft>=0&&newLeft+width<=pageWidth);
        }
        if(!placed){
            var rotationOffset=this._rotationOffsets[arrowRotation],
                arrowOffset=rotationOffset.arrow,
                resolveOffset=function(offset,width,height){
                    return(offset=="width"?width:
                            offset=="height"?height:
                            offset=="centerX"?width/2:
                            offset=="centerY"?height/2:offset);
                },
                baseLeftOffset=resolveOffset(arrowOffset[0],arrowWidth,arrowHeight),
                baseTopOffset=resolveOffset(arrowOffset[1],arrowWidth,arrowHeight),
                windowOffset=rotationOffset.window,
                leftOffset=resolveOffset(windowOffset[0],width,height),
                topOffset=resolveOffset(windowOffset[1],width,height),
                sourceRecord=(isc.isA.ListGrid(source)?isc.AutoTest.getRecord(sourceLocator):null),
                sourceRect=this._getTargetPageRect(sourceLocator,source)
            ;
            var isValidPlacement=function(windowRect){
                var onScreen=((windowRect[0]>=0&&windowRect[0]+windowRect[2]<=pageWidth)&&
                                (windowRect[1]>=0&&windowRect[1]+windowRect[3]<=pageHeight));
                var margin=100,
                    inMargin=((windowRect[0]<margin&&
                                        windowRect[0]+windowRect[2]>(pageWidth-margin))&&
                                   (windowRect[1]<margin&&
                                        windowRect[1]+windowRect[3]>(pageHeight-margin)));
                var occludesSource=isc.Canvas.rectsIntersect(sourceRect,windowRect);
                return(onScreen&&!inMargin&&!occludesSource);
            };
            newLeft=arrowLeft+baseLeftOffset-leftOffset+(rotationOffset.extraLeft||0);
            newTop=arrowTop+baseTopOffset-topOffset+(rotationOffset.extraTop||0);
            if(!isValidPlacement([newLeft,newTop,width,height])){
                var oppositeRotationOffset=this._rotationOffsets[(arrowRotation+180)%360],
                    oppositeArrowOffset=oppositeRotationOffset.arrow,
                    headLeftOffset=resolveOffset(oppositeArrowOffset[0],arrowWidth,arrowHeight),
                    headTopOffset=resolveOffset(oppositeArrowOffset[1],arrowWidth,arrowHeight)
                ;
                var marginAroundArrow=20,
                    sideMargin=arrow.breadth/2+marginAroundArrow,
                    baseMargin=(arrowRotation%90==0?marginAroundArrow:0),
                    dx=baseLeftOffset-headLeftOffset,
                    dy=baseTopOffset-headTopOffset,
                    dist=Math.sqrt(dx*dx+dy*dy),
                    ux=dx/dist,
                    uy=dy/dist,
                    hx=[Math.round(headLeftOffset+sideMargin*uy),
                            Math.round(headLeftOffset-sideMargin*uy)],
                    hy=[Math.round(headTopOffset-sideMargin*ux),
                            Math.round(headTopOffset+sideMargin*ux)],
                    x=Math.round(baseLeftOffset+baseMargin*ux),
                    y=Math.round(baseTopOffset+baseMargin*uy),
                    bx=[Math.round(x+sideMargin*uy),Math.round(x-sideMargin*uy)],
                    by=[Math.round(y-sideMargin*ux),Math.round(y+sideMargin*ux)],
                    quadrant=[
                        (arrowLeft>(pageWidth-arrowRight)?0:1),
                        (arrowTop>(pageHeight-arrowBottom)?0:1)
                    ]
                ;
                var path=this._getWindowPositionPath(arrow,bx,by,hx,hy,width,height);
                if(path){
                    var step=(arrowRotation%90==0?10:7);
                    var segments=path.segments,
                        swap
                    ;
                    if(path.swap&&path.swap[0]&&path.swap[0][quadrant[0]]){
                        swap=path.swap[0][quadrant[0]];
                    }else if(path.swap&&path.swap[1]&&path.swap[1][quadrant[1]]){
                        swap=path.swap[1][quadrant[1]];
                    }
                    for(var i=0;i<segments.length&&!placed;i++){
                        var s=(swap==null?i:(i==swap[0]?swap[1]:swap[0])),
                            segment=segments[s]
                        ;
                        var distance=Math.abs(segment[0][0]-segment[1][0]);
                        if(distance==0){
                            distance=Math.abs(segment[0][1]-segment[1][1]);
                        }
                        var stepCount=Math.floor(distance/step);
                        var stepX=(segment[0][0]<segment[1][0]?step:
                                    (segment[0][0]>segment[1][0]?-step:0));
                        var stepY=(segment[0][1]<segment[1][1]?step:
                                    (segment[0][1]>segment[1][1]?-step:0));
                        var position=segment[0],
                            offsetX=0,
                            offsetY=0
                        ;
                        for(var j=0;j<stepCount;j++){
                            var x=arrowLeft+position[0]+offsetX,
                                y=arrowTop+position[1]+offsetY
                            ;
                            if(isValidPlacement([x,y,width,height])){
                                newLeft=x;
                                newTop=y;
                                placed=true;
                                break;
                            }
                            offsetX+=stepX;
                            offsetY+=stepY;
                        }
                        if(!placed){
                            var x=arrowLeft+segment[1][0],
                                y=arrowTop+segment[1][1]
                            ;
                            if(isValidPlacement([x,y,width,height])){
                                newLeft=x;
                                newTop=y;
                                placed=true;
                            }
                        }
                    }
                    if(!placed){
                        var left=source.getPageLeft(),
                            top=source.getPageTop()
                        ;
                        if(arrowLeft>left){
                            newLeft=left-20-width;
                        }else{
                            newLeft=left+source.getVisibleWidth()+20;
                        }
                        newTop=top+source.getVisibleHeight()/2-height/2;
                        placed=(newLeft>=0&&newLeft+width<=pageWidth);
                    }
                    if(!placed){
                        var placements=[
                            [20,20],
                            [pageWidth-20-width,20],
                            [20,pageHeight-20-height],
                            [pageWidth-20-width,pageHeight-20-height]
                        ];
                        for(var i=0;i<placements.length;i++){
                            var placement=placements[i];
                            newLeft=placement[0];
                            newTop=placement[1];
                            if(isValidPlacement([newLeft,newTop,width,height])){
                                placed=true;
                                break;
                            }
                        }
                    }
                    if(!placed){
                        this.logWarn("Unable to place tour window in an acceptable position. Centering on page instead.");
                        window.centerInPage();
                        return;
                    }
                }
            }
        }
        window.moveTo(newLeft,newTop);
    }
,isc.A._getWindowPositionPath=function isc_TourStep__getWindowPositionPath(arrow,bx,by,hx,hy,ww,wh){
        var arrowRotation=arrow.rotation,
            ahl=arrow.length/2,
            path
        ;
        if(arrowRotation==0){
            path={
                swap:[
                    null,
                    {0:[0,2]}
                ],
                segments:[
                    [[hx[0]-ww-ahl,hy[0]],[bx[0]-ww,by[0]]],
                    [[bx[0]-ww,by[0]],[bx[1]-ww,by[1]-wh]],
                    [[hx[1]-ww-ahl,hy[1]-wh],[bx[1]-ww,by[1]-wh]]
                ]
            };
        }else if(arrowRotation==45){
            path={
                segments:[
                    [[bx[0]-ww,by[0]-wh],[bx[1]-ww,by[1]-wh]],
                    [[hx[0]-ww-ahl,hy[0]-ahl],[bx[0]-ww,by[0]]],
                    [[hx[1]-ahl,hy[1]-wh-ahl],[bx[1],by[1]-wh]],
                    [[bx[0]-ww,by[0]-wh],[bx[0]-ww,by[0]]],
                    [[bx[1],by[1]-wh],[bx[1]-ww,by[1]-wh]]
                ]
            };
        }else if(arrowRotation==90){
            path={
                swap:[
                    {0:[0,2]},
                    null
                ],
                segments:[
                    [[hx[1],hy[1]-wh-ahl],[bx[1],by[1]-wh]],
                    [[bx[0]-ww,by[0]-wh],[bx[1],by[1]-wh]],
                    [[hx[0]-ww,hy[0]-wh-ahl],[bx[0]-ww,by[0]-wh]]
                ]
            };
        }else if(arrowRotation==135){
            path={
                segments:[
                    [[bx[1],by[1]-wh],[bx[0],by[0]-wh]],
                    [[hx[0]-ww+ahl,hy[0]-wh-ahl],[bx[0]-ww,by[0]-wh]],
                    [[hx[1]+ahl,hy[1]-ahl],[bx[1],by[1]]],
                    [[bx[1],by[1]-wh],[bx[1],by[1]]],
                    [[bx[0],by[0]-wh],[bx[0]-ww,by[0]-wh]]
                ]
            };
        }else if(arrowRotation==180){
            path={
                swap:[
                    null,
                    {0:[0,2]}
                ],
                segments:[
                    [[hx[1]+ahl,hy[1]],[bx[1],by[1]]],
                    [[bx[1],by[1]],[bx[1],by[0]-wh]],
                    [[hx[0]+ahl,hy[0]-wh],[bx[0],by[0]-wh]]
                ]
            };
        }else if(arrowRotation==225){
            path={
                segments:[
                    [[bx[1],by[1]],[bx[0],by[0]]],
                    [[hx[0]+ahl,hy[0]-wh+ahl],[bx[0],by[0]-wh]],
                    [[hx[1]-ww+ahl,hy[1]+ahl],[bx[1]-ww,by[1]]],
                    [[bx[0],by[0]],[bx[0],by[0]-wh]],
                    [[bx[1],by[1]],[bx[1]-ww,by[1]]]
                ]
            };
        }else if(arrowRotation==270){
            path={
                swap:[
                    {0:[0,2]},
                    null
                ],
                segments:[
                    [[hx[0],hy[0]+ahl],[bx[0],by[0]]],
                    [[bx[1]-ww,by[1]],[bx[0],by[0]]],
                    [[hx[1]-ww,hy[1]+ahl],[bx[1]-ww,by[1]]]
                ]
            };
        }else if(arrowRotation==315){
            path={
                segments:[
                    [[bx[1]-ww,by[1]],[bx[0]-ww,by[0]]],
                    [[hx[1]-ww-ahl,hy[1]-wh+ahl],[bx[1]-ww,by[1]-wh]],
                    [[hx[0]-ahl,hy[0]+ahl],[bx[0],by[0]]],
                    [[bx[0]-ww,by[0]],[bx[0],by[0]]],
                    [[bx[1]-ww,by[1]],[bx[1]-ww,by[1]-wh]]
                ]
            };
        }
        return path;
    }
,isc.A.whenTargetsMoveCall=function isc_TourStep_whenTargetsMoveCall(task,targets,callback){
        if(!targets)return;
        var _this=this;
        targets.map(function(target){
            var component=_this.getLocatorObject(target.locator);
            if(component){
                _this.observe(component,"moved",function(){
                    isc.Timer.setTimeout(function(){
                        if(component.isDrawn()&&
                            (!component.isAnimating||!component.isAnimating())&&
                            _this._tour.getOutlineCanvas(target.locator))
                        {
                            var pageRect=isc.Page.getWindowRect(),
                                compRect=component.getPageRect()
                            ;
                            if(isc.Canvas.rectsIntersect(compRect,pageRect)){
                                callback(task,targets);
                            }
                        }
                    });
                });
            }
        });
    }
);
isc.evalBoundary;isc.B.push(isc.A.cancelTargetsMoveCall=function isc_TourStep_cancelTargetsMoveCall(targets){
        if(!targets)return;
        var _this=this;
        targets.map(function(target){
            var component=_this.getLocatorObject(target.locator);
            if(component){
                if(_this.isObserving(component,"moved")){
                    _this.ignore(component,"moved");
                }
            }
        });
    }
,isc.A.getActionType=function isc_TourStep_getActionType(){
        var tour=this._tour,
            tourMode=tour.mode||"tour",
            actionType=this.actionType;
        if(!actionType){
            if(tourMode=="tour"){
                actionType="none";
            }else{
                if(this.expectedValue||this.afterInputTarget){
                    actionType="change";
                }else if(this.dropTarget){
                    actionType="drag";
                }else{
                    var locator=this._getLocator(this.target),
                        component=this.getLocatorObject(locator);
                    var isLGRecord=component&&isc.isA.ListGrid(component)&&
                                        isc.isAn.Object(isc.AutoTest.getRecord(locator));
                    if(!isLGRecord){
                        if(isc.isA.Menu(component)){
                            actionType="menuItemSelect";
                        }else{
                            actionType="click";
                        }
                    }else{
                        actionType="mouseDown";
                    }
                }
            }
        }
        return actionType;
    }
,isc.A.resolveTargets=function isc_TourStep_resolveTargets(){
        if(!this.target)return null;
        var explicitActionType=this.actionType,
            actionType=this.getActionType(),
            locator=this.target=this._getLocator(this.target),
            targetType=(actionType=="mouseOver"?"over":
                            (actionType=="none"?"outline":
                            actionType));
        var targets=[{locator:locator,type:targetType,explicitActionType:explicitActionType}];
        if(actionType=="drag"&&this.dragOperation!=null){
            targets[0].dragOperation=this.dragOperation;
        }
        this.logDebug("Resolved target: "+locator+", type: "+targetType+
            ", specified actionType: "+explicitActionType+", derived actionType: "+actionType,"tour");
        if(this.dropTarget){
            var locator=this.dropTarget=this._getLocator(this.dropTarget);
            var allowDropOnDescendants=this.allowDropOnDescendants;
            if(allowDropOnDescendants==null){
                allowDropOnDescendants=this._tour.allowDropOnDescendants;
            }
            targets.add({locator:locator,type:"drop",
                allowDescendantEvent:allowDropOnDescendants
            });
            this.logDebug("Resolved drop target: "+locator,"tour");
        }else if(this.afterInputTarget){
            var locator=this.afterInputTarget=this._getLocator(this.afterInputTarget);
            targets.add({locator:locator,type:"textClick"});
            this.logDebug("Resolved after input target: "+locator,"tour");
        }
        return targets;
    }
,isc.A.waitForTargetsReady=function isc_TourStep_waitForTargetsReady(targets,callback){
        if(!this._waitForReadyStart)this._waitForReadyStart=isc.timeStamp();
        var pendingTargets=[];
        if(targets){
            for(var i=0;i<targets.length;i++){
                var locator=targets[i].locator,
                    component=this.getLocatorObject(locator)
                ;
                if(!component||
                    (component._isProcessingDone&&!component._isProcessingDone(component))||
                    !component.isDrawn()||
                    !component.isVisible()||
                    component.getLeft()<0||component.getTop()<0)
                {
                    pendingTargets.add({component:component,locator:locator});
                    break;
                }
                if(isc.isA.ListGrid(component)){
                    if(!isc.AutoTest.isGridDone(component)){
                        pendingTargets.add({component:component,locator:locator});
                        break;
                    }
                    if(isc.AutoTest.isRecordLocator(locator)){
                        var gridRecord=isc.AutoTest.getRecord(locator);
                        if(!gridRecord){
                            pendingTargets.add({component:component,
                                locator:locator,
                                record:gridRecord});
                            break;
                        }
                        var rowNum=component.getRowNum(gridRecord),
                            visibleRows=component.getVisibleRows()
                        ;
                        if(rowNum<=visibleRows[0]||visibleRows[1]<=rowNum){
                            component.scrollToRow(rowNum);
                        }
                        if(targets[i].type=="drag"){
                            component.selectSingleRecord(gridRecord);
                        }
                    }
                }else{
                    var container=component.parentElement||component.form;
                    if(container){
                        var top=component.getTop(),
                            bottom=top+component.getVisibleHeight(),
                            pageTop=component.getPageTop(),
                            pageBottom=pageTop+component.getVisibleHeight(),
                            viewportTop=container&&container.getScrollTop(),
                            viewportBottom=viewportTop+container.getScrollHeight()
                        ;
                        if(top<viewportTop||bottom>viewportBottom||
                            pageTop<0||pageBottom>isc.Page.getHeight())
                        {
                            container.scrollTo(0,top);
                        }
                    }
                }
            }
        }
        if(pendingTargets.length>0){
            var current=isc.timeStamp();
            if((current-this._waitForReadyStart)>this.waitForReadyTimeout){
                var targetsFailed=[];
                for(var i=0;i<pendingTargets.length;i++){
                    var pendingTarget=pendingTargets[i],
                        component=pendingTarget.component,
                        locator=pendingTarget.locator,
                        record=pendingTarget.record
                    ;
                    if(!component){
                        targetsFailed.add(locator+" could not be resolved");
                    }else if(component&&!component.isDrawn()||!component.isVisible()||
                        component.getLeft()<0||component.getTop()<0)
                    {
                        targetsFailed.add(locator+" resolved to component:"+component+" which is not ready");
                    }else if(component&&isc.AutoTest.isRecordLocator(locator)&&!record){
                        targetsFailed.add(locator+" record not found");
                    }else if(this.logIsDebugEnabled("tour")){
                        targetsFailed.add(locator+" -> "+component);
                    }
                }
                this.logWarn("Timed out waiting for target component(s) to be ready - tour canceled: "+targetsFailed.join("\n"));
                this._tour.setNextElement(null);
                delete this._waitForReadyStart;
                if(callback)this.fireCallback(callback,"targets,failed",[null,true]);
                return;
            }
            this.delayCall("waitForTargetsReady",arguments,100);
        }else{
            delete this._waitForReadyStart;
            if(callback)this.fireCallback(callback,"targets",[targets]);
        }
    }
,isc.A.validateTargets=function isc_TourStep_validateTargets(targets){
        var valid=true;
        if(targets){
            for(var i=0;i<targets.length;i++){
                var target=targets[i],
                    type=target.type
                ;
            }
        }
        return valid;
    }
,isc.A.outlineTargets=function isc_TourStep_outlineTargets(targets){
        if(!targets||targets.length==0||this.showOutline==false)return;
        var _this=this;
        var locators=targets.map(function(target){
            if(target.type=="change"){
                return _this.normalizeToItemLocator(target.locator);
            }
            return target.locator;
        });
        this._tour.outline(locators,targets.find("type","drop")!=null);
    }
,isc.A.removeOutlines=function isc_TourStep_removeOutlines(){
        this._tour.clearOutline();
    }
,isc.A.setupStepCompleteNotification=function isc_TourStep_setupStepCompleteNotification(targets){
        if(targets==null||targets.length==0)return;
        var registeredForCompletion;
        for(var i=0;i<targets.length;i++){
            var target=targets[i],
                type=target.type;
            if(type=="change"){
                if(targets[i+1]&&targets[i+1].type=="textClick"){
                    target.afterInputTarget=targets[i+1].locator;
                }
                this._setupTextField(target);
                registeredForCompletion=true;
            }else if(type=="menuItemOpen"||type=="menuItemSelect"){
                this._setupMenu(target,type);
            }else if(type!="outline"&&type!="none"){
                var eventName;
                if(type=="drag"){
                    if(targets[i+1]&&targets[i+1].type=="drop"){
                        continue;
                    }else{
                        if(targets[i].dragOperation!=null)eventName=targets[i].dragOperation+"Stop"
                        else eventName="dragStop";
                    }
                }else if(type=="over"){
                    eventName="mouseOver";
                }else if(type=="textClick"){
                    eventName="click";
                }else if(type=="rightClick"){
                    eventName="showContextMenu";
                }else{
                    eventName=type;
                }
                var callback=this._makeStepActionCompleteFunction(targets,i);
                var locatorElement=isc.AutoTest.getElement(target.locator),
                    component=target._eventComponent=this.getLocatorObject(target.locator),
                    observationTarget;
                if(component.isA(isc.FormItem)){
                    if(isc.isA.CanvasItem(component)&&component.canvas!=null){
                        component=component.canvas;
                    }else{
                        component=component.form;
                    }
                }
                if(isc.AutoTest.isNewRecordRowLocator(target.locator)){
                    component=component.body;
                }
                if(locatorElement&&locatorElement.getAttribute("eventProxy")){
                    observationTarget=component;
                }else{
                    observationTarget={isLocator:true,component:component,locator:target.locator};
                }
                target._pageEventID=isc.Page.observeTargetEvent(
                    observationTarget,
                    eventName,callback,
                    target.allowDescendantEvent
                );
                target._eventType=eventName;
                target._eventComponent=component;
                registeredForCompletion=true;
            }
        }
        if(registeredForCompletion&&this.autoComplete==false){
            if(!this.targetView.actionButton){
                if(!this.targetView.actionButtonProperties){
                    this.targetView.actionButtonProperties={};
                }
                isc.addProperties(this.targetView.actionButtonProperties,{
                    disabled:true
                });
            }else{
                this.targetView.actionButton.disable();
            }
        }
    }
,isc.A._makeStepActionCompleteFunction=function isc_TourStep__makeStepActionCompleteFunction(targets,index){
        var _this=this;
        return function stepActionCompleteCallback(){
            _this.stepActionCompleteNotification(targets,index);
        };
    }
,isc.A.stepActionCompleteNotification=function isc_TourStep_stepActionCompleteNotification(targets,index){
        var target=targets[index];
        if(!this.stepActionComplete(target)){
            return;
        }
        isc.Page.ignoreTargetEvent(target._eventComponent,target._eventType,target._pageEventID);
        var component=target._eventComponent,eventType=target._eventType;
        if(component&&this.isObserving(component,eventType)){
            this.ignore(component,eventType);
            if(component.editProxy){
                this.ignore(component.editProxy,eventType);
            }
        }
        if(this.isStepComplete(targets,index)){
            this.stepComplete();
        }
    }
,isc.A.stepActionComplete=function isc_TourStep_stepActionComplete(target){
        return true;
    }
,isc.A.isStepComplete=function isc_TourStep_isStepComplete(targets,index){
        return(index==targets.length-1);
    }
,isc.A.stepComplete=function isc_TourStep_stepComplete(){
        if(this.targetView){
            if(this.autoComplete!=false){
                this.targetView.nextStep();
                return;
            }
            this.targetView.actionButton.enable();
        }
    }
,isc.A.stepIncomplete=function isc_TourStep_stepIncomplete(){
        if(this.autoComplete==false){
            this.targetView.actionButton.disable();
        }
    }
,isc.A.maskTargets=function isc_TourStep_maskTargets(targets,restoreFromOutsideClick){
        if(!targets)targets=[];
        var unmaskedComponents=[];
        if(this._limitCERegistrations!=null&&!restoreFromOutsideClick){
            isc.logWarn("maskTargets(): this tourStep has already limited events on the target element");
            restoreFromOutsideClick=true;
        }
        if(!restoreFromOutsideClick)this._limitCERegistrations=[];
        for(var i=0;i<targets.length;i++){
            var target=targets[i],
                locator=target.locator,
                type=target.type;
            var limitChildEvents=(type=="drop"&&!target.allowDescendantEvent)
            if(type=="outline"||type=="none"||type=="textClick")continue;
            if(type=="change"){
                locator=this.normalizeToItemLocator(locator);
            }
            var component=this.getLocatorObject(locator);
            if(component&&isc.isA.FormItem(component))component=component.containerWidget;
            if(component&&component._isFieldHeaderButton&&component.grid!=null){
                component.grid.suppressHeaderMenuButton=true;
                this._suppessedHeaderMenuButtonGrid=component.grid;
            }
            unmaskedComponents.add(component);
            if(!restoreFromOutsideClick){
                var componentLocator=isc.AutoTest.getLocator(component);
                if(componentLocator.endsWith("/"))componentLocator=componentLocator.substring(0,componentLocator.length-1);
                if(locator.endsWith("/"))locator=locator.substring(0,locator.length-1);
                if(componentLocator!=locator){
                    this._limitEventsOutsideLocator(component,locator);
                    limitChildEvents=false;
                }
                var actionToEventMap=this._actionToEventMap;
                if(actionToEventMap[type]==null){
                }else{
                    var allowedChildEvents=limitChildEvents?
                                     ["mouseMove","mouseOver","mouseOut"]:null;
                    this._limitCERegistrations.add(
                        [component.ID,
                         isc.EH.limitComponentEvents(
                             component,actionToEventMap[type],
                             {target:this,methodName:"blockedComponentEvent"},
                             locator,null,allowedChildEvents
                         )
                        ]
                    );
                }
            }
        }
        this.showTourStepClickMask(unmaskedComponents);
        for(var i=0;i<targets.length;i++){
            if(targets[i].type!="change")continue;
            var locator=targets[i].locator;
            var formItem=this.getLocatorObject(locator);
            if(formItem&&formItem.focusInItem)formItem.focusInItem();
        }
    }
,isc.A._limitEventsOutsideLocator=function isc_TourStep__limitEventsOutsideLocator(component,locator,removeFromUnmasked){
        if(!isc.isA.String(component))component=component.ID;
        var unmaskedLocators,
            currentRegistration=this._limitOutsideLocCERs[component];
        if(currentRegistration!=null){
            var registration=isc.EH.getLimitedComponentEventRegistration(component,currentRegistration);
            if(registration.unmaskedTargets!=null){
                var unmaskedLocators=registration.unmaskedTargets?registration.unmaskedTargets.duplicate():[];
                if(removeFromUnmasked){
                    if(!unmaskedLocators.contains(locator)){
                        return;
                    }
                    unmaskedLocators.remove(locator);
                }else{
                    if(unmaskedLocators.contains(locator)){
                        return;
                    }
                    unmaskedLocators.add(locator);
                }
            }
            isc.EH.clearLimitedComponentEvents(component,currentRegistration);
        }else{
            if(!removeFromUnmasked){
                unmaskedLocators=[locator];
            }
        }
        this._limitOutsideLocCERs[component]=
            isc.EH.limitComponentEvents(
                component,
                ["mouseOver","mouseOut","mouseMove"],
                {target:this,methodName:"blockedOutsideLocComponentEvent"},
                null,
                unmaskedLocators
            );
    }
,isc.A.blockedOutsideLocComponentEvent=function isc_TourStep_blockedOutsideLocComponentEvent(eventType){
        this.blockedComponentEvent(eventType,true);
    }
,isc.A.blockedComponentEvent=function isc_TourStep_blockedComponentEvent(eventType,outsideLocator){
        if(eventType=="mouseUp"||eventType=="click"){
            this._actionsForOutsideClick();
        }
    }
,isc.A.showTourStepClickMask=function isc_TourStep_showTourStepClickMask(targetLocators){
        var componentLocators=[];
        if(targetLocators){
            for(var i=0;i<targetLocators.length;i++){
                var locator=targetLocators[i];
                if(isc.isA.Canvas(locator)){
                    componentLocators[i]=locator;
                }else{
                    var componentLocator=this.normalizeToComponentLocator(locator);
                    componentLocators[i]=componentLocator;
                }
            }
        }
        componentLocators.add(this.targetView);
        var _this=this;
        this._allEventMask=isc.EH.showClickMask({
            clickAction:function(){
                _this.handleOutsideClick(true);
            },
            mode:"softCancel",
            unmaskedTargets:componentLocators
        });
    }
,isc.A.handleOutsideClick=function isc_TourStep_handleOutsideClick(overAllEventMask){
        this.maskTargets(this.resolveTargets(),true);
        this._actionsForOutsideClick();
    }
,isc.A._actionsForOutsideClick=function isc_TourStep__actionsForOutsideClick(){
        if(this.getActionType()=="change"&&
            (this.inputValidation=="onExit"||this.afterInputTarget))
        {
            var field=this.getLocatorObject(this.target);
            if(field==null){
                this.logWarn("Clicking outside target - unable to find field from locator:"+this.locator);
            }else{
                field.validate(null,{exiting:true});
            }
        }else{
            this.targetView.shake();
        }
    }
,isc.A.hideMasks=function isc_TourStep_hideMasks(){
        if(this._limitCERegistrations!=null){
            for(var i=0;i<this._limitCERegistrations.length;i++){
                var reg=this._limitCERegistrations[i];
                isc.EH.clearLimitedComponentEvents(reg[0],reg[1]);
            }
            delete this._limitCERegistrations;
        }
        for(var componentID in this._limitOutsideLocCERs){
            isc.EH.clearLimitedComponentEvents(componentID,this._limitOutsideLocCERs[componentID]);
            delete this._limitOutsideLocCERs[componentID];
        }
        if(this._afterInputTargetLCER!=null){
            var reg=this._afterInputTargetLCER;
            isc.EH.clearLimitedComponentEvents(reg[0],reg[1]);
            delete this._afterInputTargetLCER;
        }
        if(this._allEventMask){
            isc.EH.hideClickMask(this._allEventMask);
            delete this._allEventMask;
        }
        if(this._suppessedHeaderMenuButtonGrid!=null){
            delete this._suppessedHeaderMenuButtonGrid.suppressHeaderMenuButton;
            delete this._suppessedHeaderMenuButtonGrid;
        }
    }
,isc.A.setAfterInputTargetMask=function isc_TourStep_setAfterInputTargetMask(afterInputTarget,unmask){
        var locator=afterInputTarget,
        element=isc.AutoTest.getElement(locator),
        component=element==null?null:isc.EH.getEventTargetCanvas(null,element);
        if(!component)return;
        var inTargetComponent=false;
        if(this._limitOutsideLocCERs){
            var targetComponentID;
            for(targetComponentID in this._limitOutsideLocCERs){
                break;
            }
            if(isc.Canvas.getById(targetComponentID).contains(component)){
                inTargetComponent=true;
                this._limitEventsOutsideLocator(targetComponentID,locator,!unmask);
            }
        }
        if(!inTargetComponent){
            if(element.getAttribute("eventProxy")==component.getID()){
                locator=component;
            }
            if(this._allEventMask){
                var targetIsMasked=isc.EH._targetIsMasked(component,null,element,this._allEventMask);
                if(targetIsMasked==unmask){
                    if(unmask){
                        isc.EH.addUnmaskedTarget(locator,this._allEventMask);
                    }else{
                        isc.EH.maskTarget(locator,this._allEventMask);
                    }
                }
            }
        }
        if(unmask){
            this._afterInputTargetLCER=[
                component.ID,
                isc.EH.limitComponentEvents(
                    component,this._actionToEventMap.click,null,locator)
            ];
        }else{
            var reg=this._afterInputTargetLCER;
            if(reg==null)return;
                                isc.EH.clearLimitedComponentEvents(reg[0],reg[1]);
                                delete this._afterInputTargetLCER;
        }
    }
,isc.A._setupTextField=function isc_TourStep__setupTextField(target){
        var task=this,
            tour=this._tour,
            field=this.getLocatorObject(target.locator),
            expectedValue=this.expectedValue;
        if(field==null){
            this.logWarn("Unable to resolve locator for change action to formItem: "+target.locator);
            return;
        }
        if(!isc.isA.FormItem(field)&&field.formItem){
            field=field.formItem;
        }
        if(field.parentItem!=null){
            this.logInfo("TourStep Locator:"+target.locator+
                (expectedValue!=null?" with expected value "+expectedValue:"")+
                " resolved to the item:"+field+". This item has a parentItem: "+field.parentItem+
                ". Watching for value change on the parent item.","tour");
            field=field.parentItem;
        }
        if(!field||!isc.isA.FormItem(field)){
            this.logWarn("Unable to resolve locator for change action to a valid formItem: "+target.locator);
            return;
        }
        var afterInputTarget=target.afterInputTarget,
            fieldType=field.type,
            caseSensitive=this.expectedValueCaseSensitive,
            textExpectedRegex
        ;
        if(isc.isA.String(expectedValue)){
            expectedValue=expectedValue.evalDynamicString(this,this._tour.state);
            expectedValue=expectedValue.replace(/^\s+|\s+$/g,'');
            if(fieldType=="boolean"){
                expectedValue=(expectedValue.toLowerCase()=="true");
            }else{
                if(expectedValue.startsWith("/")&&expectedValue.endsWith("/")){
                    expectedValue=expectedValue.substring(1,expectedValue.length-1);
                    var flags=(!caseSensitive?"i":null);
                    try{
                        textExpectedRegex=new RegExp(expectedValue,flags);
                    }catch(e){
                        this.logWarn("expectedValue '"+expectedValue+"' was marked as a RegExp but could not be parsed. Treating it as a literal value.");
                    }
                }
            }
        }
        var specifiedExpectedValue=this.specifiedExpectedValue=expectedValue;
        if(!textExpectedRegex&&!caseSensitive&&isc.isA.String(expectedValue)){
            expectedValue=expectedValue.toLowerCase();
        }
        this._normalizedExpectedValue=expectedValue;
        this._textExpectedRegex=textExpectedRegex;
        var targetView=this.targetView,
            inputValidation=this.inputValidation,
            inputValidationNotifyDelay=this.inputValidationNotifyDelay||this._defaultNotifyDelay
        ;
        if(!inputValidation){
            inputValidation="notify";
        }
        field.addProperties({
            task:this,
            originalDestroy:field.destroy,
            destroy:function(){
                this.task.itemDestroyed(this,target);
                return this.Super("destroy",arguments);
            },
            validateFieldPrecondition:function(validators,value,record,options){
                var task=this.task,
                    expectedValue=task.expectedValue,
                    inputValidation=task.inputValidation;
                if(expectedValue!=null){
                    var isChanging=options.changing,
                        isExiting=options.exiting
                    ;
                    if(isChanging||(isExiting&&inputValidation=="onExit")){
                        this.cancelActionOnPause("tourNotify");
                        var displayValue=this.getDisplayValue&&this.getDisplayValue(value);
                        var isValidValue=task.testExpectedValue(this,value)||
                                             (displayValue!=null&&task.testExpectedValue(this,displayValue));
                        if(isChanging){
                            if(inputValidation=="onExit"){
                                this.alwaysValidateOnExit=true;
                            }
                            if(!isValidValue){
                                var stringValue=value==null?"":value;
                                if(inputValidation=="strict"&&isc.isA.String(stringValue)
                                    &&!this._textExpectedRegex)
                                {
                                    if(!task.matchesExpectedValueStart(stringValue)){
                                        this._revertToPreChangeSelection();
                                        return false;
                                    }
                                }
                            }
                            if(inputValidation!="onExit"&&!task.suppressValidation){
                                this.origForceValidateOnChange=this.forceValidateOnChange;
                                this.forceValidateOnChange=true;
                            }
                        }
                        this._validTourStepValue=isValidValue;
                    }
                }
                return true;
            },
            validateFieldPostcondition:function(validators,value,record,options,result){
                this.forceValidateOnChange=this.origForceValidateOnChange;
                var task=this.task;
                var isValidValue=(this._validTourStepValue!==false)&&
                                   (task.suppressValidation||result==null||result.errors==null),
                    isPending=(isValidValue&&!task.suppressValidation&&
                                 this.form._pendingAsyncValidations&&
                                 this.form._pendingAsyncValidations[this.name]!=null&&
                                 this.form._pendingAsyncValidations[this.name].length>0);
                var changing=options.changing,
                    exiting=options.exiting,
                    inputValidation=task.inputValidation,
                    expectedValue=task.expectedValue,
                    afterInputTarget=task.afterInputTarget,
                    inputValidationNotifyDelay=task.inputValidationNotifyDelay,
                    completeStepOnExit=(inputValidation=="onExit"),
                    success=!isPending&&isValidValue;
                if(changing){
                    this.setDisallowEditorExit(!isValidValue);
                }
                if(changing||(exiting&&(completeStepOnExit||task.afterInputTarget))){
                    if(isPending){
                        this._stepCompletePendingAsyncValidation=true;
                    }
                    if(afterInputTarget!=null){
                        task.setAfterInputTargetMask(afterInputTarget,isValidValue);
                        if(!success&&exiting){
                            this._notifyUser(value,inputValidationNotifyDelay);
                        }
                    }else if(!completeStepOnExit||exiting){
                        if(success){
                            this.logDebug("change value, "+value+
                                        ", matched expected. step complete.","tour");
                            task.delayCall("stepComplete");
                        }else{
                            var shouldNotify=!isPending&&
                                               (!changing||
                                                (result&&result.errors)!=null||
                                               !task.matchesExpectedValueStart(value+""));
                            if(shouldNotify){
                                this._notifyUser(value,inputValidationNotifyDelay);
                            }
                            this.logDebug("change value, "+this.echo(value)+
                                        ", does not match expected: "+this.echo(expectedValue)+
                                        ". step incomplete.","tour");
                            task.stepIncomplete();
                        }
                    }
                }
            },
            handleAsyncValidationReply:function(passedValidation,fieldErrors,context){
                var task=this.task;
                if(task.suppressValidation)return;
                if(context&&context._invalidatedAsyncValidation){
                    return;
                }
                var value=this.getValue(),
                    inputValidation=task.inputValidation,
                    inputValidationNotifyDelay=task.inputValidationNotifyDelay,
                    afterInputTarget=task.afterInputTarget;
                if(this._stepCompletePendingAsyncValidation&&afterInputTarget==null){
                    if(passedValidation){
                        this.logDebug("change value, "+value+
                                    ", matched expected. step complete.","tour");
                        task.delayCall("stepComplete");
                    }else{
                        if(inputValidation!="onExit"){
                            this._notifyUser(value,inputValidationNotifyDelay);
                        }
                        this.logDebug("change value, "+this.echo(value)+
                                    ", does not match expected: "+this.echo(expectedValue)+
                                    ". step incomplete.","tour");
                        task.stepIncomplete();
                    }
                }
                delete this._stepCompletePendingAsyncValidation;
            },
            orig_handleKeyPress:field.handleKeyPress,
            handleKeyPress:function(){
                var keyName=isc.EH.getKey();
                if(this.shouldDisallowEditorExit()&&
                    expectedValue&&
                    this._editorExitKeys.contains(keyName))
                {
                    this._notifyUser(this.getValue());
                }
                return this.Super("handleKeyPress",arguments);
            },
            orig_minimalUpdateValue:field._minimalUpdateValue,
            _minimalUpdateValue:function(elementValue){
                this.Super("_minimalUpdateValue",arguments);
                if(!this.changeOnKeypress&&
                    task.expectedValue!=null&&
                    task.testExpectedValue(this,elementValue))
                {
                    this.updateValue();
                }
            },
            _notifyUser:function(value,delay){
                this.fireOnPause("tourNotify",function(){
                    var specifiedExpectedValue=this.task.specifiedExpectedValue;
                    if(this._validTourStepValue){
                        if(this.getErrors()==null)return;
                        specifiedExpectedValue=null;
                    }
                    task._notifyExpectedValue(value,specifiedExpectedValue,this.getErrors());
                },delay||0);
            }
        });
        var initiallyValid=(this.expectedValue==null)||this.testExpectedValue(field,field.getValue());
        if(initiallyValid&&!this.suppressValidation&&field.hasErrors())initiallyValid=false;
        field.setDisallowEditorExit(!initiallyValid);
    }
,isc.A.itemDestroyed=function isc_TourStep_itemDestroyed(formItem,target){
        var task=this;
        this.delayCall("waitForTargetsDone",[function(){
            task._setupTextField(task.targets[0]);
        }],100);
    }
,isc.A.matchesExpectedValueStart=function isc_TourStep_matchesExpectedValueStart(stringValue){
        var expectedValue=this.expectedValue.substring(0,stringValue.length);
        if(!this.expectedValueCaseSensitive)expectedValue=expectedValue.toLowerCase()
        return this.stringComparison(stringValue,expectedValue);
    }
,isc.A.stringComparison=function isc_TourStep_stringComparison(value,expectedValue){
        if(isc.isA.String(value)&&!this.expectedValueCaseSensitive){
            value=value.toLowerCase();
        }
        return(value==expectedValue);
    }
,isc.A.testExpectedValue=function isc_TourStep_testExpectedValue(item,value){
        var expectedValue=this._normalizedExpectedValue,
            textExpectedRegex=this._textExpectedRegex;
        return!!(textExpectedRegex?textExpectedRegex.test(value):this.stringComparison(value,expectedValue));
    }
,isc.A._restoreTextField=function isc_TourStep__restoreTextField(target){
        var field=this.getLocatorObject(target.locator);
        if(!field||!isc.isA.FormItem(field)){
            return;
        }
        if(field.parentItem!=null){
            field=field.parentItem;
        }
        if(field._notifyUser){
            delete field.validateFieldPrecondition;
            delete field.validateFieldPostcondition;
            delete field.handleAsyncValidationReply;
            delete field.alwaysValidateOnExit;
            field.destroy=field.originalDestroy;
            field.handleKeyPress=field.orig_handleKeyPress;
            field._minimalUpdateValue=field.orig_minimalUpdateValue;
            field.setDisallowEditorExit(null);
        }
        return field.getValue&&field.getValue();
    }
,isc.A._notifyExpectedValue=function isc_TourStep__notifyExpectedValue(value,expectedValue,errors){
        var tour=this._tour,
            showMessage=this.showInputValidationMessage
        ;
        if(showMessage==null)showMessage=tour.showInputValidationMessage;
        if(showMessage==false)return;
        if(tour&&tour.notifyValidationMessage){
            if(expectedValue!=null){
                var vars={value:value,expectedValue:expectedValue},
                    message=this.inputValidationNotifyMessage.evalDynamicString(this,vars)
                ;
            }
            if(errors!=null){
                if(!isc.isAn.Array(errors))errors=[errors];
                if(message==null)message="";
                message+="<P>"+errors.join("<P>");
            }
            tour.notifyValidationMessage(message);
        }
    }
,isc.A._setupMenu=function isc_TourStep__setupMenu(target){
        var mustSelect=target.type=="menuItemSelect",
            targetMenu=this.getLocatorObject(target.locator),
            _this=this;
        if(!isc.isA.Menu(targetMenu)){
            this.logWarn("Unable to derive menu for actionType:"+target.type+" from locator:"+target.locator);
            return;
        }
        if(mustSelect){
            var callback=function callback(item){
                _this.menuObservation(targetMenu,item,target,true);
            }
            this.observe(targetMenu,"selectMenuItem",callback);
        }else{
            var callback=function callback(item){
                _this.menuObservation(targetMenu,item,target,false);
            }
            this.observe(targetMenu,"showSubmenu",callback);
        }
        target.menu=targetMenu;
    }
,isc.A._restoreMenu=function isc_TourStep__restoreMenu(target){
        var type=target.type;
        if(type=="menuItemSelect"){
            if(this.isObserving(target.menu,"selectMenuItem"))this.ignore(target.menu,"selectItemMenu");
        }else{
            if(this.isObserving(target.menu,"showSubmenu"))this.ignore(target.menu,"showSubmenu");
        }
    }
,isc.A.menuObservation=function isc_TourStep_menuObservation(menu,item,target,click){
        if(!click){
            var itemNum=menu.getRowNum(item),
                itemElement=menu.body.getTableElement(itemNum),
                targetElement=isc.AutoTest.getElement(target.locator);
            if((itemElement==null||targetElement==null)||
                (itemElement!=targetElement&&!itemElement.contains(targetElement)))return;
        }
        this.ignore(menu,(click?"selectMenuItem":"showSubmenu"));
        this.stepComplete();
    }
,isc.A.placeArrow=function isc_TourStep_placeArrow(targets){
        if(!targets||targets.length==0)return;
        if(targets.length==1||targets.find("type","textClick")){
            this._pointArrowAtSource(targets[0].locator);
            return;
        }
        var dragSource,
            dropTarget
        ;
        for(var i=0;i<targets.length;i++){
            var target=targets[i];
            if(target.type=="drag"){
                dragSource=target;
            }else if(target.type=="drop"){
                dropTarget=target;
            }
        }
        if(dragSource&&dropTarget){
            this._pointArrowToTarget(dragSource,dropTarget);
        }else if(dragSource){
            this._pointArrowAtSource(dragSource);
        }
    }
,isc.A.hideArrow=function isc_TourStep_hideArrow(){
        if(this.arrow)this.arrow.hide();
    }
);
isc.evalBoundary;isc.B.push(isc.A.destroyArrow=function isc_TourStep_destroyArrow(){
        if(this.arrow){
            this.arrow.hide();
            this.arrow.markForDestroy();
            delete this.arrow;
        }
    }
,isc.A._pointArrowToTarget=function isc_TourStep__pointArrowToTarget(dragSource,dropTarget){
        var sourceLocator=dragSource.locator,
            source=this.getLocatorObject(sourceLocator),
            sourceRect=this._getTargetPageRect(sourceLocator,source),
            sourceCenterX=sourceRect[0]+sourceRect[2]/2,
            sourceCenterY=sourceRect[1]+sourceRect[3]/2,
            targetLocator=dropTarget.locator,
            target=this.getLocatorObject(targetLocator),
            targetRect=this._getTargetPageRect(targetLocator,target,this.dropQuadrant),
            targetCenterX=targetRect[0]+targetRect[2]/2,
            targetCenterY=targetRect[1]+targetRect[3]/2,
            offsetFromComponent=20
        ;
        var distanceX=targetCenterX-sourceCenterX,
            distanceY=targetCenterY-sourceCenterY,
            arrowBaseX,
            arrowBaseY,
            arrowPrimaryDirection,
            basePointCoordXY,
            startPointX,
            startPointY
        ;
        if(Math.abs(distanceX)>Math.abs(distanceY)){
            arrowBaseX=(distanceX<0?sourceRect[0]-offsetFromComponent:
                            sourceRect[0]+sourceRect[2]+offsetFromComponent);
            arrowBaseY=sourceCenterY;
            arrowPrimaryDirection=(distanceX<0?180:0);
            basePointCoordXY=1;
            startPointX=arrowBaseX;
            startPointY=arrowBaseY;
            if(isc.Canvas.rectEnclosesRect(targetRect,[startPointX,startPointY,1,1])){
                startPointX=(distanceX<0?sourceRect[0]+sourceRect[2]
                                             :sourceRect[0]);
            }
        }else{
            arrowBaseX=sourceCenterX;
            arrowBaseY=(distanceY<0?sourceRect[1]-offsetFromComponent:
                            sourceRect[1]+sourceRect[3]+offsetFromComponent);
            arrowPrimaryDirection=(distanceY<0?270:90);
            basePointCoordXY=0;
            startPointX=arrowBaseX;
            startPointY=arrowBaseY;
            if(isc.Canvas.rectEnclosesRect(targetRect,[startPointX,startPointY,1,1])){
                startPointY=(distanceY<0?sourceRect[1]+sourceRect[3]
                                             :sourceRect[1]);
            }
        }
        var arrow=this.getArrow(),
            arrowRotation=this.getArrowRotation([startPointX,startPointY],[targetCenterX,targetCenterY])
        ;
        arrow.rotate(arrowRotation);
        var arrowWidth=arrow.getVisibleWidth()-arrow.shadowPadding*2,
            arrowHeight=arrow.getVisibleHeight()-arrow.shadowPadding*2,
            arrowCenterPoint=[arrowWidth/2,arrowHeight/2],
            basePointCoordRef=arrowCenterPoint[basePointCoordXY],
            adjustDirection=(arrowPrimaryDirection==0&&arrowRotation>270?360:arrowPrimaryDirection),
            adjust=basePointCoordRef+Math.round(basePointCoordRef*((arrowRotation-adjustDirection)/45)),
            arrowLeft,
            arrowTop
        ;
        if(arrowPrimaryDirection==180||arrowPrimaryDirection==0){
            arrowLeft=(distanceX<0?arrowBaseX-arrowWidth:arrowBaseX);
            arrowTop=arrowBaseY-adjust;
        }else{
            arrowLeft=arrowBaseX-adjust;
            arrowTop=(distanceY<0?arrowBaseY-arrowHeight:arrowBaseY);
        }
        if(arrowPrimaryDirection==arrowRotation){
            if(arrowPrimaryDirection==180){
                if(arrowLeft<targetRect[0]+targetRect[2]){
                    arrowLeft=targetCenterX;
                }
            }else if(arrowPrimaryDirection==0){
                if(arrowLeft+arrowWidth>targetRect[0]){
                    arrowLeft=targetCenterX-arrowWidth;
                }
            }else if(arrowPrimaryDirection==90){
                if(arrowTop+arrowHeight>targetRect[1]){
                    arrowTop=targetCenterY-arrowHeight;
                }
            }else{
                if(arrowTop<targetRect[1]){
                    arrowTop=targetCenterY;
                }
            }
            var calcIntersectArea=function(rect){
                var intersectTop=Math.max(rect[1],arrowTop-arrow.topOffset),
                    intersectBottom=Math.min(rect[1]+rect[3],arrowTop+arrow.getVisibleHeight()),
                    intersectLeft=Math.max(rect[0],arrowLeft-arrow.leftOffset),
                    intersectRight=Math.min(rect[0]+targetRect[2],arrowLeft+arrow.getVisibleWidth())
                ;
                return(intersectBottom-intersectTop)*(intersectRight-intersectLeft);
            };
            var sourceArea=sourceRect[2]*sourceRect[3],
                targetArea=targetRect[2]*targetRect[3]
            ;
            if(calcIntersectArea(targetRect)>targetArea*0.30||
                calcIntersectArea(sourceRect)>sourceArea*0.30)
            {
                if(arrowPrimaryDirection==0){
                    arrowLeft=sourceRect[0]-arrowWidth-offsetFromComponent;
                }else if(arrowPrimaryDirection==180){
                    arrowLeft=sourceRect[0]+sourceRect[2]+offsetFromComponent;
                }else if(arrowPrimaryDirection==90){
                    arrowTop=sourceRect[1]-arrowHeight-offsetFromComponent;
                }else if(arrowPrimaryDirection==270){
                    arrowTop=sourceRect[1]+sourceRect[3]+offsetFromComponent;
                }
            }
        }
        arrow.moveTo(Math.round(arrowLeft-arrow.leftOffset),Math.round(arrowTop-arrow.topOffset));
        arrow.bringToFront();
        if(this.showArrow!=false){
            arrow.show();
        }
    }
,isc.A._pointArrowAtSource=function isc_TourStep__pointArrowAtSource(sourceLocator){
        var source=this.getLocatorObject(sourceLocator),
            sourceRect=this._getTargetPageRect(sourceLocator,source),
            left=sourceRect[0],
            top=sourceRect[1],
            width=sourceRect[2],
            height=sourceRect[3],
            bottom=top+height,
            right=left+width,
            pageHeight=isc.Page.getHeight(),
            pageWidth=isc.Page.getWidth(),
            arrow=this.getArrow()
        ;
        var pointDown=(bottom>(pageHeight-(pageWidth*0.08)));
        var pointHorizontal=!pointDown&&((bottom+arrow.getWidth()+10)>(pageHeight-(pageWidth*0.15))),
            pointLeft
        ;
        if(source&&isc.isA.PickList(source)){
            pointHorizontal=true;
        }
        if(source&&isc.isA.ComboBoxItem(source)){
            var icon=isc.AutoTest.getFormItemIcon(sourceLocator);
            if(icon){
                left=source.getPageLeft();
                width=source.getVisibleWidth();
                top=source.getPageTop();
                height=source.getVisibleHeight();
                bottom=top+height;
                right=left+width;
            }
        }
        if(width<100&&this.showArrowAroundSmallTarget!=false){
            var centerX=left+(width/2),
                tolerance=pageWidth*0.15/2,
                pageCenterX=pageWidth/2
            ;
            if((pageCenterX-tolerance)<centerX&&centerX<(pageCenterX+tolerance)){
                pointHorizontal=true;
                if(left>(pageWidth-right)){
                    pointLeft=true;
                }
                this._positionWindowOppositeArrow=true;
            }
        }
        if(pointLeft==null&&pointHorizontal){
            if(right<pageWidth/2||(left-arrow.getWidth()-10)<=0){
                pointLeft=true;
            }
        }
        var placed=false;
        for(var i=0;i<2;i++){
            if(!pointHorizontal){
                arrow.rotate(pointDown?90:270);
                var centerX=left+(width/2),
                    offset=(arrow.shadowPadding>(height/4)?arrow.shadowPadding:0),
                    arrowWidth=arrow.getVisibleWidth()-arrow.shadowPadding*2,
                    arrowHeight=arrow.getVisibleHeight()-arrow.shadowPadding*2,
                    arrowCenterX=arrowWidth/2,
                    arrowLeft=centerX-arrowCenterX,
                    arrowTop=(pointDown?top-arrowHeight-offset:bottom+offset)
                ;
                if(arrowLeft<=5||(arrowLeft+arrowWidth>pageWidth-5)){
                    pointHorizontal=true;
                    continue;
                }
                arrow.moveTo(Math.round(arrowLeft-arrow.leftOffset),
                             Math.round(arrowTop-(pointDown?arrow.topOffset*2:0)));
            }
            else{
                arrow.rotate(pointLeft?180:0);
                var centerY=top+(height/2),
                    offset=(arrow.shadowPadding>(width/4)?arrow.shadowPadding:0),
                    arrowWidth=arrow.getVisibleWidth()-arrow.shadowPadding*2,
                    arrowHeight=arrow.getVisibleHeight()-arrow.shadowPadding*2,
                    arrowCenterY=arrowHeight/2,
                    arrowLeft=(pointLeft?right+offset:left-arrowWidth-offset),
                    arrowTop=centerY-arrowCenterY
                ;
                if(arrowTop<=5||(arrowTop+arrowHeight>pageHeight-5)){
                    pointHorizontal=false;
                    if(this._positionWindowOppositeArrow){
                        var centerY=top+(height/2),
                            tolerance=pageHeight*0.15/2,
                            pageCenterY=pageHeight/2
                        ;
                        if((pageCenterY-tolerance)<centerY&&centerY<(pageCenterY+tolerance)){
                            if(top<(pageHeight-bottom)){
                                pointDown=true;
                            }
                        }else{
                            this._positionWindowOppositeArrow=false;
                        }
                    }
                    continue;
                }
                arrow.moveTo(Math.round(arrowLeft-(pointLeft?0:arrow.leftOffset*2)),
                             Math.round(arrowTop-arrow.topOffset));
            }
            placed=true;
            break;
        }
        if(!placed){
            var arrowLeft,
                arrowTop
            ;
            if(top<pageHeight/2){
                if(right<pageWidth/2){
                    arrow.rotate(225);
                    arrowLeft=right;
                }else{
                    arrow.rotate(315);
                    var arrowWidth=arrow.getVisibleWidth()-arrow.shadowPadding*2;
                    arrowLeft=left-arrowWidth;
                }
                arrowTop=bottom;
            }else{
                if(left<pageWidth/2){
                    arrow.rotate(135);
                    arrowLeft=right;
                }else{
                    arrow.rotate(45);
                    var arrowWidth=arrow.getVisibleWidth()-arrow.shadowPadding*2;
                    arrowLeft=left-arrowWidth;
                }
                var arrowHeight=arrow.getVisibleHeight()-arrow.shadowPadding*2;
                arrowTop=top-arrowHeight;
            }
            arrow.moveTo(Math.round(arrowLeft-arrow.leftOffset),Math.round(arrowTop-arrow.topOffset));
        }
        arrow.bringToFront();
        if(this.showArrow!=false){
            arrow.show();
        }
    }
,isc.A._getLocator=function isc_TourStep__getLocator(target){
        if(!target)return null;
        if(isc.isAn.Array(target)){
            target=target[0];
        }
        target=target.replace(/^\s+|\s+$/gm,'');
        if(target=="")return null;
        var component=window[target];
        if(component){
            target=isc.AutoTest.getLocator(component);
        }else{
            target=this._tour.evalTargetAgainstState(target);
        }
        return target;
    }
,isc.A.normalizeToItemLocator=function isc_TourStep_normalizeToItemLocator(locator){
        var object=this.getLocatorObject(locator);
        var isFormItem=object&&isc.isA.FormItem(object);
        if(!isFormItem)return locator;
        var objectLocator=object&&object.getLocator();
        if(!objectLocator.endsWith("/"))objectLocator+="/";
        objectLocator+="handle";
        return objectLocator;
    }
,isc.A.normalizeToComponentLocator=function isc_TourStep_normalizeToComponentLocator(locator){
        var object=this.getLocatorObject(locator);
        var isFormItem=object&&isc.isA.FormItem(object);
        if(isFormItem)object=object.containerWidget;
        return object&&isc.AutoTest.getLocator(object);
    }
,isc.A._getTargetPageRect=function isc_TourStep__getTargetPageRect(locator,target,quadrant){
        if(!target)target=this.getLocatorObject(locator);
        var left=target.getPageLeft(),
            width=target.getVisibleWidth(),
            top=target.getPageTop(),
            height=target.getVisibleHeight()
        ;
        if(isc.isA.GridRenderer(target)){
            target=target.grid;
        }
        if(isc.isA.ListGrid(target)){
            var record=isc.AutoTest.getRecord(locator),
                isNewRecordRow=isc.AutoTest.isNewRecordRowLocator(locator),
                rowNum=(isNewRecordRow?target.getTotalRows()-1:record&&target.getRowNum(record))
            ;
            if(rowNum>=0){
                top=target.getRowPageTop(rowNum);
                height=target.getRowHeight(record,rowNum);
                var outlineCanvas=this._tour.getOutlineCanvas(locator),
                    field=isc.AutoTest.getField(locator)
                ;
                if(field){
                    left=outlineCanvas.getPageLeft();
                    width=outlineCanvas.getWidth();
                }else{
                    width=(outlineCanvas&&outlineCanvas.recordWidth!=null
                                ?outlineCanvas.recordWidth:target.getInnerWidth());
                }
            }
        }else if(isc.isA.FormItem(target)){
            var icon=isc.AutoTest.getFormItemIcon(locator);
            if(icon){
                if(target.getIcon(icon)!=null){
                    var iconPageRect=target.getIconPageRect(icon);
                    if(iconPageRect){
                        left=iconPageRect[0];
                        top=iconPageRect[1];
                        width=iconPageRect[2];
                        height=iconPageRect[3];
                    }
                }else if(icon.name&&icon.name==target.errorIconName){
                    var iconElement=isc.Element.get(target.getErrorIconId()),
                        iconPageRect=isc.Element.getElementRect(iconElement)
                    ;
                    left=iconPageRect[0];
                    top=iconPageRect[1];
                    width=iconPageRect[2];
                    height=iconPageRect[3];
                }
            }
        }else if(quadrant!=null){
            if(quadrant.contains("T")){
                height=Math.round(height/4);
            }else if(quadrant.contains("B")){
                height=Math.round(height/4);
                top+=height*3
            }
            if(quadrant.contains("L")){
                width=Math.round(width/4);
            }else if(quadrant.contains("R")){
                width=Math.round(width/2);
                left+=width*3;
            }
        }
        return[left,top,width,height];
    }
,isc.A.getArrow=function isc_TourStep_getArrow(){
        if(!this.arrow){
            this.arrow=this.createAutoChild("arrow");
            this.arrowItem=this.createAutoChild("arrowItem",{drawPane:this.arrow});
        }
        return this.arrow;
    }
,isc.A.getArrowRotation=function isc_TourStep_getArrowRotation(startPoint,endPoint){
        var rotation=0.0;
        if(startPoint[1]==endPoint[1]){
            rotation=0+(startPoint[0]<endPoint[0]?180:0);
        }else if(startPoint[0]==endPoint[0]){
            rotation=0+(startPoint[1]<endPoint[1]?90:270);
        }else{
            var a=(endPoint[1]-startPoint[1]),
                b=(endPoint[0]-startPoint[0]),
                d=Math.abs(Math.atan(a/b)*180.0/3.14159)
            ;
            rotation=(a>=0&&b>=0?d:
                        a>=0&&b<0?(90-d)+90:
                        a<0&&b<0?d+180:d+270);
        }
        return rotation;
    }
);
isc.B._maxIndex=isc.C+56;

isc.defineClass("TourConfirmStep","UserTask");
isc.A=isc.TourConfirmStep.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.cancelButtonTitle="Cancel";
isc.A.actionButtonTitle="OK";
isc.A.targetViewConstructor="TourWindow";
isc.A.targetViewDefaults={
        actionClick:function(){
            var task=this.userTask;
            if(task.nextElement)task._tour.setNextElement(task.nextElement);
            task.completeEditing();
        },
        cancelClick:function(){
            var task=this.userTask;
            if(!task.failureElement){
                task.logWarn("TourConfirmStep does not have a failureElement. Process is aborting.");
            }
            task._tour.setNextElement(task.failureElement);
            task.completeEditing();
        },
        closeClick:function(){
            var task=this.userTask,
                tour=task._tour
            ;
            if(!task.failureElement){
                task.logWarn("TourConfirmStep does not have a failureElement. Process is aborting.");
            }
            tour.setNextElement(task.failureElement);
            tour.setStateVariable("closed",true);
            task.completeEditing();
        }
    };
isc.B.push(isc.A.executeElement=function isc_TourConfirmStep_executeElement(tour){
        this._tour=tour;
        if(!this.ID)this.ID="tourStepConfirm"+this.stepNum;
        tour.setTaskOutput(this,tour.getLastTaskOutput());
        this.createTargetView();
        return this.Super("executeElement",[tour]);
    }
,isc.A.completeElement=function isc_TourConfirmStep_completeElement(tour){
        this.targetView.markForDestroy();
        delete this.targetView;
    }
,isc.A.createTargetView=function isc_TourConfirmStep_createTargetView(targets){
        var tour=this._tour,
            state=tour.state,
            title=this.title,
            contents=this.instructions||this.contents,
            defaults={
                tourStep:this,
                title:(title?title.evalDynamicString(this,state):null),
                contents:(contents?contents.evalDynamicString(this,state):null),
                showCancelButton:true,
                showActionButton:true
            }
        ;
        if(tour.showProgress){
            var percentDone=Math.round((this.stepNum-1)/tour.stepCount*100.0);
            isc.addProperties(defaults,{
                showProgress:true,
                percentDone:percentDone,
                showProgressPercent:tour.showProgressPercent,
                showProgressPercentInline:tour.showProgressPercentInline
            });
        }
        if(tour.windowDefaults){
            isc.addProperties(defaults,tour.windowDefaults);
        }
        if(this.windowDefaults){
            isc.addProperties(defaults,this.windowDefaults);
        }
        isc.TourStep.applyTourStepProperties(defaults,this);
        this.targetView=this.createAutoChild("targetView",defaults);
        this.targetView.bringToFront();
    }
);
isc.B._maxIndex=isc.C+3;

}else{
    var errorMessage="Unspecified error instantiating Tour",
        hasWorkflow=(isc.Process!=null),
        hasDrawing=(isc.DrawPane!=null);
    if(!hasWorkflow||!hasDrawing){
        errorMessage="Tour class must be loaded after the"+
            (!hasWorkflow?" DataBinding module"+(hasDrawing?"":" and"):"")+
            (!hasDrawing?" Drawing module":"")+
            ". Please make sure the DataBinding and Drawing modules are included in this page before the Tour module.";
    }
    isc.defineClass("Tour");
    isc.A=isc.Tour;
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.invalidClass=true;
isc.A.invalidErrorMessage=errorMessage;
isc.B.push(isc.A.loadTour=function isc_c_Tour_loadTour(tourId,callback){
            return isc.Tour.create();
        }
,isc.A.getTour=function isc_c_Tour_getTour(tourId){
            return isc.Tour.create();
        }
);
isc.B._maxIndex=isc.C+2;

    isc.A=isc.Tour.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.B.push(isc.A.init=function isc_Tour_init(){
            this.logWarn(isc.Tour.invalidErrorMessage);
            this.Super("init",arguments);
        }
,isc.A.start=function isc_Tour_start(){}
,isc.A.reset=function isc_Tour_reset(){}
,isc.A.setState=function isc_Tour_setState(){}
);
isc.B._maxIndex=isc.C+4;

    isc.defineClass("TourStep");
    isc.defineClass("TourConfirmStep");
}
isc.A=isc.Canvas.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.B.push(isc.A.getDropLocationRect=function isc_Canvas_getDropLocationRect(dropLocation){
        if(!isc.isA.String(dropLocation))return[0,0,this.getVisibleWidth(),this.getVisibleHeight()];
        var left=dropLocation.contains("R")?this.getVisibleWidth()-this.edgeMarginSize:0;
        var top=dropLocation.contains("B")?this.getVisibleHeight()-this.edgeMarginSize:0;
        var width=dropLocation.contains("L")||dropLocation.contains("R")?this.edgeMarginSize:this.getVisibleWidth();
        var height=dropLocation.contains("T")||dropLocation.contains("B")?this.edgeMarginSize:this.getVisibleHeight();
        return[left,top,width,height];
    }
);
isc.B._maxIndex=isc.C+1;

isc.A=isc.Layout.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.B.push(isc.A.getDropLocationRect=function isc_Layout_getDropLocationRect(dropLocation){
        if(dropLocation=="first")dropLocation=0;
        else if(dropLocation=="last")dropLocation=this.members?this.members.length:0;
        var numericDropLocation=isc.isA.Number(dropLocation)?dropLocation:parseInt(dropLocation);
        if(numericDropLocation!=null&&numericDropLocation==dropLocation){
            var left=0,
                top=0,
                width=this.getVisibleWidth(),
                height=this.getVisibleHeight(),
                totalMembers=this.members?this.members.length:0;
            if(totalMembers>0){
                if(numericDropLocation<1){
                    if(this.vertical){
                        height=this.members[0].getTop()+Math.floor(this.members[0].getVisibleHeight()/2);
                    }else{
                        width=this.members[0].getLeft()+Math.floor(this.members[0].getVisibleWidth()/2);
                    }
                }else if(numericDropLocation>=totalMembers){
                    var lastMember=this.members.last();
                    if(this.vertical){
                        top=lastMember.getTop()+Math.ceil(lastMember.getVisibleHeight()/2);
                        height-=top;
                    }else{
                        left=lastMember.getLeft()+Math.ceil(lastMember.getVisibleWidth()/2);
                        width-=left;
                    }
                }else{
                    var prevMember=this.members[numericDropLocation-1],
                        nextMember=this.members[numericDropLocation];
                    if(this.vertical){
                        top=prevMember.getTop()+Math.ceil(prevMember.getVisibleHeight()/2);
                        height=(nextMember.getTop()+Math.floor(nextMember.getVisibleHeight()/2))-top;
                    }else{
                        left=prevMember.getLeft()+Math.ceil(prevMember.getVisibleWidth()/2);
                        width=(nextMember.getLeft()+Math.floor(nextMember.getVisibleWidth()/2))-top;
                    }
                }
            }
            return[left,top,width,height];
        }
        return this.Super("getDropLocationRect",arguments);
    }
);
isc.B._maxIndex=isc.C+1;

isc.A=isc.FormItem.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.B.push(isc.A.getDropLocationRect=function isc_FormItem_getDropLocationRect(dropLocation){
        var form=this.form,
            dropContext=form.getItemDropContext(this),
            localLeft=dropContext.left-form.getPageLeft(),
            localTop=dropContext.top-form.getPageTop();
        var left,top,width,height;
        if(dropLocation=="T"){
            left=localLeft+dropContext.sideThreshold;
            width=dropContext.width-(2*dropContext.sideThreshold);
            top=localTop,
            height=Math.floor(dropContext.height/2);
        }else if(dropLocation=="B"){
            left=localLeft+dropContext.sideThreshold;
            width=dropContext.width-(2*dropContext.sideThreshold);
            height=Math.floor(dropContext.height/2);
            top=localTop+(dropContext.height-height);
        }else{
            top=localTop+dropContext.tbSideThreshold;
            height=dropContext.height-(2*dropContext.tbSideThreshold);
            width=dropContext.sideThreshold;
            if(dropLocation=="L"){
                left=localLeft
            }else{
                left=(localLeft+dropContext.width)-dropContext.sideThreshold;
            }
        }
        return[left,top,width,height];
    }
);
isc.B._maxIndex=isc.C+1;

isc.A=isc.DynamicForm.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.B.push(isc.A.getDropLocationRect=function isc_DynamicForm_getDropLocationRect(dropLocation){
        if(dropLocation!=null&&this.getItems().length>0){
            var splitLocation=dropLocation.split(","),
                itemNum=parseInt(splitLocation[0]);
            if(itemNum!=null&&itemNum==splitLocation[0]){
                var item=this.getItem(itemNum);
                if(item){
                    return item.getDropLocationRect(splitLocation[1]||"L");
                }
            }
        }
        return this.Super("getDropLocationRect",arguments);
    }
);
isc.B._maxIndex=isc.C+1;

isc.A=isc.Tour;
isc.A._tourRecorderWidgetDefaults={
        autoDraw:false,
        _zLayerName:"_notify"
    };

isc.A=isc.Tour;
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.tourWizardTitle="New Tour Configuration";
isc.A.tourWizardTourTypeTitle="Tour Type";
isc.A.tourWizardReifyTourTitle="Reify Tutorial";
isc.A.tourWizardUITourTitle="UI Tour (Non Interactive)";
isc.A.tourWizardInteractiveTourTitle="Interactive Tutorial";
isc.A.tourWizardShowProgressTitle="Show Progress";
isc.A.tourWizardNewScreenPickerTitle="Start With New Screen";
isc.A.tourWizardRequiredDataSourcesTitle="Required DataSources";
isc.A.tourWizardRequiredDataSourcesHint="Comma separated list of required DS's";
isc.A.tourWizardRecordButtonTitle="Record Tour";
isc.A.tourStepWizardNoStepsMessage="No Tour Steps Recorded";
isc.A.tourStepWizardTitle="Title";
isc.A.tourStepWizardInstructionsTitle="Instructions";
isc.A.tourStepWizardTargetTitle="Target";
isc.A.tourStepWizardTargePrompt="Click icon, then Shift+Click within the application to add a target";
isc.A.tourStepWizardTargeNotifyText="Shift+Click on the app to record a target locator";
isc.A.tourStepWizardActionTypeTitle="Action Type";
isc.A.tourStepWizardAutoCompleteTitle="Auto Complete";
isc.A.tourStepWizardAutoCompletePrompt="Should the tour move forward when the user completes the chosen action?";
isc.A.tourStepWizardDropTargetTitle="Drop Target";
isc.A.tourStepWizardDropTargetHint="No drop target";
isc.A.tourStepWizardDropTargetPrompt="Click icon, then Shift+Click within the application to add a drop target";
isc.A.tourStepWizardDropTargetNotifyText="Shift+Click on the app to record a drop target locator";
isc.A.tourStepWizardExpectedValueTitle="Expected Value";
isc.A.tourStepWizardExpectedValueHint="Value for the user to enter";
isc.A.tourStepWizardCaseSensitiveTitle="Case Sensitive";
isc.A.tourStepWizardBindOutputTitle="Bind Output";
isc.A.tourStepWizardBindOutputHint="Bind to variable for later use";
isc.A.tourStepWizardRecordStepTitle="Record Tour Step";
isc.A.tourStepWizardRecordStepHeaderPrompt="Drag this window out of the way to get at UI within the application";
isc.A.tourStepWizardNextStepButtonTitle="Next Step";
isc.A.tourStepWizardDoneButtonTitle="Done";
isc.A.tourCompleteTitle="New Tour Recording Complete";
isc.A.tourCompleteTourIdTitle="Tour ID";
isc.A.tourCompleteMakeChangesButtonTitle="Make Changes...";
isc.A.tourCompleteViewXMLButtonTitle="View XML";
isc.A.tourCompleteRunTourButtonTitle="Run Tour";
isc.B.push(isc.A.recordNewTour=function isc_c_Tour_recordNewTour(){
        if((this.tourWizard&&this.tourWizard.isDrawn()&&this.tourWizard.isVisible())||
            (this.tourStepWizard&&this.tourStepWizard.isDrawn()&&this.tourStepWizard.isVisible())||
            (this.tourCompleteDialog&&this.tourCompleteDialog.isDrawn()&&this.tourCompleteDialog.isVisible()))
        {
            return;
        }
        this.recordingTour={};
        this.recordingTour.steps=[];
        if(!this.tourWizard){
            this.createTourWizard();
            this.createTourStepWizard();
            this.createTourCompleteDialog();
        }else{
            this.tourStepGrid.setData(this.recordingTour.steps);
        }
        this.tourWizard.show();
        this.tourWizard.bringToFront();
    }
,isc.A.createTourWizard=function isc_c_Tour_createTourWizard(){
        this.tourWizard=isc.Window.create(isc.Tour._tourRecorderWidgetDefaults,{
            width:400,
            height:200,
            overflow:"visible",
            title:this.tourWizardTitle,
            bringToFrontOnMouseUp:false,
            autoCenter:true,
            bodyProperties:{
                defaultLayoutAlign:"center",
                layoutMargin:10,
                membersMargin:20,
                overflow:"visible"
            },
            items:[
                isc.DynamicForm.create({
                    autoDraw:false,
                    width:"100%",
                    items:[
                        {
                            editorType:"SelectItem",
                            name:"_constructor",title:this.tourWizardTourTypeTitle,defaultToFirstOption:true,
                            pickListProperties:{
                                _zLayerName:"_notify"
                            },
                            redrawOnChange:true,
                            getValueMap:function(){
                                var options={};
                                options["Tour"]=this.tourWizardUITourTitle,
                                options["Tutorial"]=this.tourWizardInteractiveTourTitle
                                return options;
                            }
                        },
                        {
                            name:"showProgress",title:this.tourWizardShowProgressTitle,
                            type:"boolean",allowEmptyValue:true
                        },
                        {
                            name:"startWithNewScreen",
                            title:this.tourWizardNewScreenPickerTitle,
                            defaultToFirstOption:true,
                            pickListProperties:{
                                _zLayerName:"_notify"
                            },
                            valueMap:[
                                "always",
                                "no",
                                "prompt"
                            ],
                            showIf:"values._constructor=='ReifyTour'"
                        },
                        {
                            name:"requiresDataSources",
                            title:this.tourWizardRequiredDataSourcesTitle,
                            hint:this.tourWizardRequiredDataSourcesHint,
                            showHintInField:true,
                            showIf:"values._constructor=='ReifyTour'"
                        }
                    ]
                }),
                isc.Button.create({
                    title:this.tourWizardRecordButtonTitle,
                    autoDraw:false,
                    autoFit:true,
                    click:function(){
                        var form=isc.Tour.tourWizard.items[0];
                        if(!form.validate())return;
                        isc.addProperties(isc.Tour.recordingTour,form.getValues());
                        form.clearValues();
                        isc.Tour.tourWizard.hide();
                        isc.Tour.tourStepWizardForm.clearValues();
                        isc.Tour.tourStepWizard.show();
                        isc.Tour.tourStepWizard.bringToFront();
                    }
                }),
                isc.LayoutSpacer.create({height:"*"})
            ]
        })
    }
,isc.A.createTourStepWizard=function isc_c_Tour_createTourStepWizard(){
        this.tourStepGrid=isc.ListGrid.create({
            autoDraw:false,
            showHeader:false,
            showRowNumbers:true,
            canRemoveRecords:true,
            canReorderRecords:true,
            width:"100%",
            autoFitData:"vertical",
            autoFitMaxHeight:100,
            height:50,
            emptyMessage:this.tourStepWizardNoStepsMessage,
            showResizeBar:true,
            selectionType:"single",
            selectionUpdated:function(){
                var values=this.getSelectedRecord();
                if(values==null){
                    isc.Tour.tourStepWizardForm.editNewRecord();
                }else{
                    values.steps=null;
                    isc.Tour.tourStepWizardForm.editRecord(values);
                }
            },
            fields:[
                {name:"title"},
                {name:"target"},
                {name:"actionType"}
            ],
            data:this.recordingTour.steps
        }),
        this.tourStepWizardForm=isc.DynamicForm.create({
            autoDraw:false,
            width:"100%",
            titleWidth:150,
            items:[
                {name:"title",title:this.tourStepWizardTitle},
                {name:"instructions",title:this.tourStepWizardInstructionsTitle,editorType:"TextAreaItem"},
                {name:"target",title:this.tourStepWizardTargetTitle,
                    icons:[{
                        prompt:this.tourStepWizardTargePrompt,
                        click:function(){
                            isc.notify(this.tourStepWizardTargeNotifyText,null,null,{duration:1000});
                            var _this=this;
                            this.mde=isc.Page.setEvent(
                                "mouseDown",
                                function(){
                                    if(isc.EH.shiftKeyDown()){
                                        isc.Page.clearEvent("mouseDown",_this.mde);
                                        return isc.Tour.recordTourStepTarget();
                                    }
                                }
                            );
                        }
                    }]
                },
                {name:"actionType",title:this.tourStepWizardActionTypeTitle,
                    redrawOnChange:true,
                    defaultDynamicValue:function(){
                        var tour=isc.Tour.recordingTour;
                        if(tour==null||tour._constructor=="Tour")return"none";
                        return"click";
                    },
                    pickListProperties:{
                        _zLayerName:"_notify"
                    },
                    valueMap:[
                        "none",
                        "click",
                        "doubleClick",
                        "rightClick",
                        "drag",
                        "change",
                        "menuItemOver",
                        "menuItemSelect",
                        "mouseOver",
                        "mouseDown",
                        "any"
                    ],
                    redrawOnChange:true
                },
                {name:"autoComplete",
                    title:this.tourStepWizardAutoCompleteTitle,type:"boolean",defaultValue:true,
                    showIf:function(item,value,form,values){
                        var actionType=values.actionType;
                        return actionType!="none"&&actionType!="any"
                    },
                    prompt:this.tourStepWizardAutoCompletePrompt
                },
                {name:"dropTarget",title:this.tourStepWizardDropTargetTitle,
                    showIf:"form.getValue('actionType') == 'drag'",
                    hint:this.tourStepWizardDropTargetHint,showHintInField:true,
                    icons:[{
                        prompt:this.tourStepWizardDropTargetPrompt,
                        click:function(){
                            isc.notify(this.tourStepWizardDropTargetNotifyText,null,null,{duration:1000});
                            var _this=this;
                            this.mde=isc.Page.setEvent(
                                "mouseDown",
                                function(){
                                    if(isc.EH.shiftKeyDown()){
                                        isc.Page.clearEvent("mouseDown",_this.mde);
                                        return isc.Tour.recordTourStepTarget(true);
                                    }
                                }
                            );
                        }
                    }]
                },
                {name:"expectedValue",title:this.tourStepWizardExpectedValueTitle,
                    hint:this.tourStepWizardExpectedValueHint,
                    showHintInField:true,
                    showIf:"form.getValue('actionType') == 'change'"},
                {name:"expectedValueCaseSensitive",title:this.tourStepWizardCaseSensitiveTitle,
                     type:"boolean",defaultValue:true,
                    showIf:"form.getValue('actionType') == 'change'"},
                {name:"bindOutput",title:this.tourStepWizardBindOutputTitle,
                    hint:this.tourStepWizardBindOutputHint,
                    showHintInField:true
                }
            ]
        });
        this.tourStepWizard=isc.Window.create(isc.Tour._tourRecorderWidgetDefaults,{
            keepInParentRect:false,
            bringToFrontOnMouseUp:false,
            width:500,height:450,
            title:this.tourStepWizardRecordStepTitle,
            headerProperties:{
                prompt:this.tourStepWizardRecordStepHeaderPrompt
            },
            bodyProperties:{
                layoutMargin:10,
                membersMargin:5,
                defaultLayoutAlign:"center",
                overflow:"auto"
            },
            items:[
                this.tourStepGrid,
                this.tourStepWizardForm,
                isc.LayoutSpacer.create({
                    height:10
                }),
                isc.HLayout.create({
                    autoDraw:false,
                    align:"right",
                    membersMargin:5,
                    height:40,
                    members:[
                        isc.Button.create({
                            autoDraw:false,
                            title:this.tourStepWizardNextStepButtonTitle,
                            click:function(){
                                var grid=isc.Tour.tourStepGrid,
                                    currentStep=isc.Tour.saveUpdatedTourStep();
                                var nextStep=currentStep?grid.getRecord(grid.getRecordIndex(currentStep)+1):null;
                                if(nextStep==null){
                                    var nextStep={};
                                    grid.data.add(nextStep);
                                    grid.data.dataChanged();
                                }
                                grid.selection.selectSingle(nextStep);
                                grid.scrollToRow(grid.getRecordIndex(nextStep));
                                var form=isc.Tour.tourStepWizardForm;
                                form.editRecord(nextStep);
                                form.focusInItem(0);
                            }
                        }),
                        isc.Button.create({
                            autoDraw:false,
                            title:this.tourStepWizardDoneButtonTitle,
                            click:function(){
                                var form=isc.Tour.tourStepWizardForm;
                                if(form.valuesHaveChanged()){
                                    isc.Tour.saveUpdatedTourStep();
                                }
                                form.clearValues();
                                isc.Tour.tourStepWizard.clear();
                                isc.Tour.tourRecorded();
                            }
                        })
                    ]
                })
            ]
        })
    }
,isc.A.saveUpdatedTourStep=function isc_c_Tour_saveUpdatedTourStep(){
        var form=isc.Tour.tourStepWizardForm;
        var values=form.getValues();
        var grid=isc.Tour.tourStepGrid,
            currentStep=grid.getSelectedRecord();
        if(currentStep!=null){
            isc.addProperties(currentStep,values);
            isc.Tour.recordingTour.steps.dataChanged();
        }else{
            grid.data.add(values);
        }
        return currentStep;
    }
,isc.A.createTourCompleteDialog=function isc_c_Tour_createTourCompleteDialog(){
        this.tourCompleteForm=isc.DynamicForm.create({
            autoDraw:false,
            width:300,
            items:[
                {name:"id",title:this.tourCompleteTourIdTitle,required:true},
                {name:"tourXML",
                    editorType:"TextAreaItem",
                    width:"*",showTitle:false,colSpan:2,
                    height:200,
                    visible:false}
            ]
        })
        this.tourCompleteDialog=isc.Window.create(isc.Tour._tourRecorderWidgetDefaults,{
            autoCenter:true,
            autoSize:true,
            bringToFrontOnMouseUp:false,
            title:this.tourCompleteTitle,
            animateMinimize:false,
            headerProperties:{
                doubleClick:function(){
                    if(this.creator.minimized)this.creator.restore();
                }
            },
            minimize:function(){
                this.Super("minimize",arguments);
                this.animateMove(
                    isc.Page.getWidth()-this.getVisibleWidth(),
                    isc.Page.getHeight()-this.getVisibleHeight(),
                    this.minimizeCallback
                )
            },
            restore:function(){
                this.Super("restore",arguments);
                this.centerInPage();
            },
            bodyProperties:{
                defaultLayoutAlign:"center",
                layoutMargin:10,
                membersMargin:20
            },
            items:[
                this.tourCompleteForm,
                isc.HLayout.create({
                    autoDraw:false,
                    layoutAlign:"center",
                    membersMargin:5,
                    height:40,
                    members:[
                        isc.Button.create({
                            autoDraw:false,
                            title:this.tourCompleteMakeChangesButtonTitle,
                            click:function(){
                                isc.Tour.tourCompleteDialog.clear();
                                isc.Tour.tourStepWizard.show();
                                isc.Tour.tourStepWizard.bringToFront();
                            }
                        }),
                        isc.Button.create({
                            autoDraw:false,
                            title:this.tourCompleteViewXMLButtonTitle,
                            click:function(){
                                var form=isc.Tour.tourCompleteForm;
                                if(!form.validate())return;
                                var tour=isc.Tour.recordingTour;
                                tour.id=form.getValue("id");
                                var serializeTour=function serializeTour(){
                                    var myDS=isc.DataSource.get(tour._constructor);
                                    if(myDS==null){
                                        isc.logWarn("Unable to load schema for:"+tour._constructor);
                                        myDS=isc.DataSource.create({tagName:tour._constructor});
                                    }
                                    var XML=myDS.xmlSerialize(tour);
                                    form.setValue("tourXML",XML);
                                    form.getItem("tourXML").show();
                                }
                                if(!isc.DataSource.get(tour._constructor)){
                                    var dataSources=["Tour","Tutorial"];
                                    if(!dataSources.contains(tour._constructor)){
                                        dataSources.add(tour._constructor);
                                    }
                                    isc.DataSource.load(dataSources,serializeTour);
                                }else{
                                    serializeTour();
                                }
                            }
                        }),
                        isc.Button.create({
                            autoDraw:false,
                            title:this.tourCompleteRunTourButtonTitle,
                            click:function(){
                                isc.Tour.tourCompleteDialog.minimizeCallback=function(){
                                    var tour=isc.clone(isc.Tour.recordingTour);
                                    var cons=isc[tour._constructor]||isc.Tour;
                                    var liveTour=cons.create(tour);
                                    liveTour.start();
                                    isc.Tour.tourCompleteDialog.minimizeCallback=null;
                                }
                                isc.Tour.tourCompleteDialog.minimize();
                            }
                        })
                    ]
                })
            ]
        })
    }
,isc.A.recordTourStepTarget=function isc_c_Tour_recordTourStepTarget(isDropTarget){
        var locator=isc.AutoTest.getLocator();
        var form=this.tourStepWizardForm,
            item=form.getItem(isDropTarget?"dropTarget":"target");
        if(item!=null&&item.isVisible()&&item.isDrawn()){
            item.setValue(locator);
        }
        isc.EH.__cancelNextMouseUp=true;
        return false;
    }
,isc.A.tourRecorded=function isc_c_Tour_tourRecorded(){
        this.tourCompleteDialog.show();
        this.tourCompleteDialog.bringToFront();
    }
);
isc.B._maxIndex=isc.C+7;

isc._debugModules = (isc._debugModules != null ? isc._debugModules : []);isc._debugModules.push('Tour');isc.checkForDebugAndNonDebugModules();isc._moduleEnd=isc._Tour_end=(isc.timestamp?isc.timestamp():new Date().getTime());if(isc.Log&&isc.Log.logIsInfoEnabled('loadTime'))isc.Log.logInfo('Tour module init time: ' + (isc._moduleEnd-isc._moduleStart) + 'ms','loadTime');delete isc.definingFramework;if (isc.Page) isc.Page.handleEvent(null, "moduleLoaded", { moduleName: 'Tour', loadTime: (isc._moduleEnd-isc._moduleStart)});}else{if(window.isc && isc.Log && isc.Log.logWarn)isc.Log.logWarn("Duplicate load of module 'Tour'.");}
