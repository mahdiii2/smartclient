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

if(window.isc&&window.isc.module_Core&&!window.isc.module_AI){isc.module_AI=1;isc._moduleStart=isc._AI_start=(isc.timestamp?isc.timestamp():new Date().getTime());if(isc._moduleEnd&&(!isc.Log||(isc.Log && isc.Log.logIsDebugEnabled('loadTime')))){isc._pTM={ message:'AI load/parse time: ' + (isc._moduleStart-isc._moduleEnd) + 'ms', category:'loadTime'};
if(isc.Log && isc.Log.logDebug)isc.Log.logDebug(isc._pTM.message,'loadTime');
else if(isc._preLog)isc._preLog[isc._preLog.length]=isc._pTM;
else isc._preLog=[isc._pTM]}isc.definingFramework=true;isc.defineClass("InternalAIMessagesBuilder").addProperties({
    init:function(){
        this.Super("init",arguments);
        this.aiMessages=[];
    },
    appendPrompt:function(prompt){
        if(prompt=="${userMessages}"){
            this.aiMessages.addList(this.userMessages.map(function(userMessage){
                return{
                    source:"user",
                    content:userMessage.content,
                    type:userMessage.type
                };
            }));
        }else{
            this.aiMessages.add({
                source:"system",
                content:prompt.evalDynamicString(this.target,this.evalVars)
            });
        }
    },
    appendPrompts:function(prompts){
        if(!isc.isAn.Array(prompts)){
            this.appendPrompt(prompts);
            return;
        }
        for(var i=0;i<prompts.length;++i){
            this.appendPrompt(prompts[i]);
        }
    }
});
isc.defineClass("InternalAIMessagesBuilder2").addProperties({
    messagesSource:"user",
    init:function(){
        this.Super("init",arguments);
        this.aiMessages=[];
    },
    appendPrompt:function(prompt){
        if(prompt=="${ssMessages}"){
            var messagesSource=this.messagesSource;
            this.aiMessages.addList(this.ssMessages.map(function(ssMessage){
                return{
                    source:messagesSource,
                    content:ssMessage.content,
                    type:ssMessage.type
                };
            }));
        }else{
            this.aiMessages.add({
                source:"system",
                content:prompt.evalDynamicString(this.target,this.evalVars)
            });
        }
    },
    appendPrompts:function(prompts){
        if(!isc.isAn.Array(prompts)){
            this.appendPrompt(prompts);
            return;
        }
        for(var i=0;i<prompts.length;++i){
            this.appendPrompt(prompts[i]);
        }
    }
});
isc.defineClass("AIEngine").addClassProperties({
    defaultHistoryIntroduction:"You have previously interacted with the user as follows. "+
        "Each prior message from the user is delineated by ^^^^^^^ both before and after "+
        "their message. Your responses are delineated by ####### both before and after your "+
        "message.",
    defaultHistoryConclusion:"That is the end of your previous interaction with the user. "+
        "You are now to respond to the following.",
    defaultHistoryDelimiters:{
        "system":"\n\n",
        "user":"^^^^^^^\n",
        "AI":"#######\n"
    },
    _isTextContentType:function(type){
        return type==null||type=="text";
    },
    _isImageContentType:function(type){
        return type=="jpegImage"||type=="pngImage";
    },
    isImageMessage:function(aiMessage){
        return this._isImageContentType(aiMessage.type);
    },
    _getMIMEType:function(imageMessage){
        this._assert(this.isImageMessage(imageMessage));
        return imageMessage.type=="jpegImage"?"image/jpeg":"image/png";
    },
    containsImageMessage:function(aiMessages){
        if(aiMessages!=null){
            for(var i=0;i<aiMessages.length;++i){
                if(this.isImageMessage(aiMessages[i])){
                    return true;
                }
            }
        }
        return false;
    },
    isVisionRequest:function(aiRequest){
        if(this.containsImageMessage(aiRequest.messages)){
            return true;
        }
        return false;
    },
    cloneAIRequest:function(aiRequest){
        var clonedRequest=isc.addPropertiesWithAssign({},aiRequest);
        delete clonedRequest._isNormalized;
        if(isc.isAn.Array(clonedRequest.messages)){
            clonedRequest.messages=clonedRequest.messages.duplicate();
        }
        return clonedRequest;
    }
});
isc.A=isc.AIEngine.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A._aiTransactions=[];
isc.A.recordPickingBatchTimeout=20000;
isc.A.fieldPagingPrompts=[
        "A user is interacting with an Isomorphic SmartClient web application.\n"+
        "They wish to take the following action - \"${actionDescription}\" - on "+
        "a data-bound component (such as a ListGrid) based on the following query prompt:",
        "${userMessages}",
        "The dataSource the component is bound to has a large number of fields, many of which "+
        "are unlikely to be relevant to the action being performed.\n"+
        "The objects in the source-array below represent a subset of these available fields."+
        "Using the properties on each field object for the dataSource and your own knowledge, "+
        "determine which fields are relevant to the user-supplied query prompt.\n"+
        "For example, if the query was 'amount is larger than 100', you should look for a field with a name, "+
        "title or description most related to 'amount'. Note that the user may not use the exact field name or "+
        "title in their query. For example if the user refers to 'amount' they may be referring to 'quantity', 'price', 'cost' "+
        "or similar fields. Please return all field objects that could be relevant.\n\n"+
        "Your response should be an object serialized in JSON format with a single property called 'result'. "+
        "This property should be set to an array of integers, where each integer is the index of a matching record in the source-array below.  "+
        "For example, if the first field object in the array below may be relevant to the user's query, your response array "+
        "must include its source-array index (0) as the first entry.  Similarly, the source-array indices of any "+
        "other matching field objects must also be in your response array.\n\n"+
        "If a field object is not relevant to the query prompt, do not include its index in your response array.\n\n"+
        "If no field objects are relevant, the 'result' property in your response object should be set to an empty array.\n\n"+
        "Apart from this object, your response must not include any other preamble or content of any kind."
    ];
isc.A._basicTypes=[null,"text","number","object","array"];
isc.A.requestOperationId="createChatCompletion";
isc.B.push(isc.A.getRecordsPerPrompt=function isc_AIEngine_getRecordsPerPrompt(sampleRecords,fixedPrompt,settings){
        this._assert(isc.isAn.Array(sampleRecords));
        var data=sampleRecords;
        fixedPrompt=fixedPrompt||0;
        settings=settings||{};
        settings.startIndex=settings.startIndex||0;
        var tokenStats={};
        tokenStats.fixedTokens=isc.isA.Number(parseInt(fixedPrompt))?parseInt(fixedPrompt):
                this.estimateTokenCount(fixedPrompt);
        if(settings.responseTokensPerRecord){
            tokenStats.responseTokensPerRecord=settings.responseTokensPerRecord;
        }
        var result={};
        result.totalRecords=data.length;
        result.startIndex=settings.startIndex;
        result.numRecords=0;
        result.exactNumRecords=0;
        result.variance=1;
        var serializedRecords=[];
        result.engineId=this.engineId;
        var availableDataTokens=this.tokenLimit-tokenStats.fixedTokens;
        var dataTokens=0;
        var format=settings.serializationFormat||this.serializationFormat;
        var isJSON=format!="csv";
        var isCompactJSON=format=="compactJSON";
        var recordSeparator=(isCompactJSON?",":(isJSON?",\n":"\n"));
        for(var i=settings.startIndex;i<data.length;i++){
            var record=data[i];
                var processed={};
                processed.record=isc.AI.serializeIndexedRecord(record,i,settings);
                processed.tokenCount=this.estimateTokenCount(processed.record+recordSeparator);
                if(result.numRecords==0||availableDataTokens>=processed.tokenCount){
                    serializedRecords.add(processed);
                    result.numRecords++;
                    result.exactNumRecords=result.numRecords;
                    dataTokens+=processed.tokenCount;
                    availableDataTokens-=processed.tokenCount;
                    if(availableDataTokens<0){
                        result.status="The number of fixed tokens already exceeds the token limit.";
                        result.exactNumRecords=0;
                        break;
                    }
                }else{
                    var delta=processed.tokenCount-availableDataTokens;
                    result.exactNumRecords=result.numRecords+(delta/processed.tokenCount);
                    break;
                }
            if(settings.aiPageSize&&result.numRecords>=settings.aiPageSize){
                break;
            }
        }
        tokenStats.totalTokens=dataTokens;
        tokenStats.minTokens=serializedRecords.getProperty("tokenCount").min();
        tokenStats.maxTokens=serializedRecords.getProperty("tokenCount").max();
        tokenStats.avgTokens=Math.ceil(serializedRecords.getProperty("tokenCount").sum()/result.numRecords);
        tokenStats.remainingTokens=availableDataTokens;
        result.variance=tokenStats.maxTokens/tokenStats.minTokens;
        result.tokenStats=tokenStats;
        result.serializedForm=serializedRecords;
        return result;
    }
,isc.A.getBatches=function isc_AIEngine_getBatches(templateAIRequest,records,settings){
        this._assert(isc.isAn.Array(records));
        settings=settings||{};
        var formatDescription=isc.AI.getFormatDescription(settings);
        templateAIRequest=isc.AIEngine.cloneAIRequest(templateAIRequest);
        if(!templateAIRequest.messages)templateAIRequest.messages=[];
        templateAIRequest.messages.push({source:"system",content:formatDescription});
        var lastMessageIndex=templateAIRequest.messages.length-1;
        var fixedTokens=this.estimateRequestTokenCount(templateAIRequest);
        if(settings.aiPageSize==0)settings.aiPageSize=null;
        var batches=[];
        for(var i=0,len=records.length;i<len;){
            var nextSettings=isc.addPropertiesWithAssign({},settings);
            nextSettings.startIndex=i;
            var batchingInfo=this.getRecordsPerPrompt(records,fixedTokens,nextSettings);
            this._assert(batchingInfo.numRecords>0);
            var serializedRecords=batchingInfo.serializedForm.getProperty("record");
            this._assert(serializedRecords.length==batchingInfo.numRecords);
            var aiRequest=isc.AIEngine.cloneAIRequest(templateAIRequest);
            aiRequest.messages[lastMessageIndex]={
                source:"system",
                content:formatDescription+isc.AI._joinSerializedRecords(serializedRecords,settings)
            };
            batches.push({
                aiRequest:aiRequest,
                startIndex:i,
                length:batchingInfo.numRecords,
                _formatDescription:formatDescription,
                _serializedRecords:serializedRecords,
                _settings:settings
            });
            i+=batchingInfo.numRecords
        }
        return batches;
    }
,isc.A.splitBatch=function isc_AIEngine_splitBatch(batch){
        this._assert(batch.length>=2);
        var newStartIndex1=batch.startIndex,
            newLength1=batch.length>>1,
            newStartIndex2=batch.startIndex+newLength1,
            newLength2=batch.length-newLength1;
        this._assert(newLength1>=1&&newLength2>=1);
        var aiRequest=batch.aiRequest,
            lastMessageIndex=aiRequest.messages.length-1,
            formatDescription=batch._formatDescription,
            settings=batch._settings;
        var newSerializedRecords1=batch._serializedRecords.slice(0,newLength1),
            newAIRequest1=isc.AIEngine.cloneAIRequest(aiRequest);
        this._assert(newSerializedRecords1.length==newLength1);
        newAIRequest1.messages[lastMessageIndex]={
            source:"system",
            content:formatDescription+isc.AI._joinSerializedRecords(newSerializedRecords1,settings)
        };
        var newSerializedRecords2=batch._serializedRecords.slice(newLength1),
            newAIRequest2=isc.AIEngine.cloneAIRequest(aiRequest);
        this._assert(newSerializedRecords2.length==newLength2);
        newAIRequest2.messages[lastMessageIndex]={
            source:"system",
            content:formatDescription+isc.AI._joinSerializedRecords(newSerializedRecords2,settings)
        };
        return[{
            aiRequest:newAIRequest1,
            startIndex:newStartIndex1,
            length:newLength1,
            _formatDescription:formatDescription,
            _serializedRecords:newSerializedRecords1,
            _settings:settings
        },{
            aiRequest:newAIRequest2,
            startIndex:newStartIndex2,
            length:newLength2,
            _formatDescription:formatDescription,
            _serializedRecords:newSerializedRecords2,
            _settings:settings
        }];
    }
,isc.A.doPageRecordsPicking=function isc_AIEngine_doPageRecordsPicking(aiMessages,records,callback,settings){
        settings=settings||{};
        var _self=this;
        var transactions=this._aiTransactions;
        var transaction={
            id:"aiTransaction_"+transactions.length,
            engineId:this.engineId,
            postProcessCallback:callback,
            progressCallback:settings.progressCallback,
            batches:[],
            results:[]
        };
        transactions.add(transaction);
        var cancellationController=settings.cancellationController,
            subCancellationController=isc.CancellationController.create();
        var data=records;
        if(data.localData)data=data.localData;
        var completeTransaction=function(transaction){
            transactions.remove(transaction);
            var matches=[];
            for(var i=0;i<transaction.batches.length;i++){
                var batch=transaction.batches[i];
                if(settings.keepEmptyMatches){
                    _self._assert(batch.result.getLength()==batch.length);
                    matches.addList(batch.result);
                }else{
                    for(var j=0;j<batch.result.length;j++){
                        var recordIndex=batch.result[j];
                        var match=data.get(recordIndex);
                        if(match==null){
                            _self.logWarn("Unable to find match for index in data: "+recordIndex,"AI");
                        }else{
                            matches.add(match);
                        }
                    }
                }
            }
            _self.logDebug("Completing AI Transaction "+transaction.id+", with "+
                transaction.batches.length+" batches covering "+
                data.length+" total records, and "+matches.length+" matches","AI");
            _self.fireCallback(transaction.postProcessCallback,"matches,batches",[matches,transaction.batches]);
        };
        if(!isc.isAn.Array(data)||data.length<=0){
            this.delayCall("fireCallback",[completeTransaction,"transaction",[transaction]]);
            return transaction;
        }
        var finishedRows=0;
        var addTransactionBatch=function(transaction,batch){
            _self.logDebug("Adding batch "+batch.batchId+" to AI-transaction "+transaction.id,"AI");
            transaction.batches.add(batch);
            var aiRequest=batch.aiRequest;
            _self.sendRequest(aiRequest,function(aiResponse){
                finishedRows+=batch.length;
                var arrResult;
                if(aiResponse.type!="success"){
                    arrResult=[];
                    batch.nonSuccessfulResult=aiResponse;
                }else{
                    arrResult=aiResponse.message&&aiResponse.message.content&&aiResponse.message.content.result;
                    if(!isc.isAn.Array(arrResult))arrResult=[arrResult];
                }
                if(settings.keepEmptyMatches){
                    while(arrResult.length<batch.length){
                        arrResult.push(isc.AI.invalidSummaryValue);
                    }
                    if(arrResult.length>batch.length)arrResult.setLength(batch.length);
                }else{
                    arrResult.removeEmpty();
                }
                batch.result.addList(arrResult);
                transaction.results.addList(arrResult);
                batch.executing=0;
                var matches=transaction.results.length;
                if(transaction.progressCallback){
                    var isCanceled=cancellationController&&cancellationController.canceled,
                        progressCallbackResult=transaction.progressCallback(finishedRows,data.length,matches),
                        shouldContinue=!isCanceled&&progressCallbackResult!==false;
                    if(!shouldContinue){
                        var cancellationReason=isCanceled?cancellationController.cancellationReason:"progressCallback() returned `false`.";
                        if(!subCancellationController.canceled){
                            subCancellationController.cancel(cancellationReason,"application");
                        }
                        _self.logDebug("doPageRecordsPicking() transaction "+transaction.id+" was canceled by the progressCallback.","AI");
                        return;
                    }
                }
                if(transaction.batches.getProperty("executing").sum()==0){
                    completeTransaction(transaction);
                }
            },{
                showPrompt:false,
                ignoreTokenLimit:true,
                requestProperties:{timeout:this.recordPickingBatchTimeout},
                maxRetries:settings.maxRetries
            });
        };
        var templateAIRequest={
            messages:aiMessages,
            responseType:"object",
            cancellationController:subCancellationController
        };
        var batches=this.getBatches(templateAIRequest,data,settings);
        for(var batchId=0;batchId<batches.length;++batchId){
            var batch=batches[batchId];
            isc.addPropertiesWithAssign(batch,{
                batchId:batchId,
                range:[batch.startIndex,batch.startIndex+batch.length-1],
                executing:1,
                result:[]
            });
            addTransactionBatch(transaction,batch);
        }
        return transaction;
    }
,isc.A.shouldUseAIFieldPaging=function isc_AIEngine_shouldUseAIFieldPaging(aiRequest,fields,aiConfig){
        if(!isc.AI.useAIFieldPaging)return false;
        var recordPickingSettings={
            engineId:this.engineId,
            fieldNames:aiConfig.salientFieldAttributes||isc.AI.salientFieldAttributes,
            serializationFormat:aiConfig.serializationFormat
        };
        var tokenEstimate=this.estimateRequestTokenCount(aiRequest);
        var batchingInfo=this.getRecordsPerPrompt(fields,tokenEstimate,recordPickingSettings);
        return(batchingInfo.totalRecords>batchingInfo.numRecords);
    }
,isc.A.retrieveFieldsForPrompt=function isc_AIEngine_retrieveFieldsForPrompt(userMessages,actionDescription,fields,callback,context,aiConfig){
        var aiMessagesBuilder=isc.InternalAIMessagesBuilder.create({
            userMessages:userMessages,
            target:this,
            evalVars:{
                actionDescription:actionDescription
            }
        });
        aiMessagesBuilder.appendPrompts(this.fieldPagingPrompts);
        context=context||{};
        var progressCallback=context.progressCallback;
        var aiPageSize=context.aiPageSize;
        if(aiPageSize==0)aiPageSize=null;
        var salientFieldAttributes=aiConfig&&aiConfig.salientFieldAttributes;
        if(salientFieldAttributes==null)salientFieldAttributes=isc.AI.salientFieldAttributes;
        var recordPickingSettings={
            engineId:this.engineId,
            fieldNames:salientFieldAttributes,
            aiPageSize:aiPageSize,
            progressCallback:progressCallback
        };
        this.doPageRecordsPicking(aiMessagesBuilder.aiMessages,fields,function(results){
            isc.AI.fireCallback(callback,"finalFields",[results]);
        },recordPickingSettings);
    }
,isc.A.asyncRetrieveFieldsForPrompt=function isc_AIEngine_asyncRetrieveFieldsForPrompt(userMessages,actionDescription,fields,context,aiConfig){
        var resolversObj=Promise.withResolvers();
        this.retrieveFieldsForPrompt(userMessages,actionDescription,fields,function(finalFields){
            resolversObj.resolve(finalFields);
        },context,aiConfig);
        return resolversObj.promise;
    }
,isc.A.estimateTokenCount=function isc_AIEngine_estimateTokenCount(text){
        text=text||"";
        var words=text.trim().split(/\s/);
        var tokenLength=3;
        var count=0;
        for(var i=0;i<words.length;i++){
            var splitWord=words[i].split(/\W/);
            count+=splitWord.length-1;
            for(var ii=0;ii<splitWord.length;ii++){
                count+=Math.max(1,splitWord[ii].length/tokenLength);
            }
        }
        return Math.ceil(count);
    }
,isc.A.estimateMessageTokenCount=function isc_AIEngine_estimateMessageTokenCount(aiMessage){
        if(aiMessage.type=="jpegImage"||aiMessage.type=="pngImage"){
            return 1000;
        }
        var content=aiMessage.content;
        if((aiMessage.type=="array"||aiMessage.type=="object")&&
            !isc.isA.String(content)&&
            isc.isAn.Object(content))
        {
            content=isc.AI._encodeJSON(content);
        }
        return this.estimateTokenCount(String(content));
    }
,isc.A.estimateRequestTokenCount=function isc_AIEngine_estimateRequestTokenCount(aiRequest){
        aiRequest=this.normalizeRequest(aiRequest);
        this._assert(aiRequest.prompt==null);
        var promptText=this.makePromptText(aiRequest);
        return this.estimateTokenCount(promptText);
    }
,isc.A.getTokenLimit=function isc_AIEngine_getTokenLimit(aiRequest){
        return this.tokenLimit;
    }
,isc.A.couldSupportRequest=function isc_AIEngine_couldSupportRequest(aiRequest){
        aiRequest=this.normalizeRequest(aiRequest);
        if(!this._basicTypes.contains(aiRequest.responseType)){
            return false;
        }
        var messages=aiRequest.messages;
        if(messages!=null){
            for(var i=0;i<messages.length;++i){
                var message=messages[i];
                if(!this._basicTypes.contains(message.type)){
                    return false;
                }
            }
        }
        var tokenEstimate=this.estimateRequestTokenCount(aiRequest);
        if(tokenEstimate>this.getTokenLimit(aiRequest)){
            return false;
        }
        return true;
    }
,isc.A.canSupportVisionRequests=function isc_AIEngine_canSupportVisionRequests(){
        return false;
    }
,isc.A.sendRequest=function isc_AIEngine_sendRequest(aiRequest,callback,config){
        config=isc.addProperties({retryIndex:0},config);
        var rawRequest=this.transformRequest(aiRequest,config);
        this.handleSendRequest(rawRequest,aiRequest,callback,config);
    }
,isc.A.asyncSendRequest=function isc_AIEngine_asyncSendRequest(aiRequest,config){
        if(aiRequest.cancellationController&&aiRequest.cancellationController.canceled){
            return Promise.reject(aiRequest.cancellationController.asCanceledResult());
        }
        var resolversObj=Promise.withResolvers();
        this.sendRequest(aiRequest,function(aiResponse){
            if(aiResponse.type=="success")resolversObj.resolve(aiResponse);
            else resolversObj.reject(aiResponse);
        },config);
        return resolversObj.promise;
    }
,isc.A.normalizeRequest=function isc_AIEngine_normalizeRequest(aiRequest){
        if(aiRequest._isNormalized)return aiRequest;
        var messages=aiRequest.messages;
        var copied=false;
        var doCopy=function(){
            aiRequest=isc.addProperties({},aiRequest);
            messages=aiRequest.messages=(messages==null?null:messages.duplicate());
            copied=true;
        }
        if(messages!=null){
            for(var i=0;i<messages.length;++i){
                var message=messages[i],
                    messageCopied=false;
                if(message.source==null||
                    (message.source!="system"&&message.source!="user"&&message.source!="AI"))
                {
                    if(message.source!=null){
                        this.logWarn("Unrecognized AIMessageSource '"+message.source+"'. Changing to 'user'","AI");
                    }
                    if(!copied)doCopy();
                    if(!messageCopied){
                        message=messages[i]=isc.addProperties({},message);
                        messageCopied=true;
                    }
                    message.source="user";
                }
                if(message.type=="number"&&!isc.isA.String(message.content)){
                    if(!copied)doCopy();
                    if(!messageCopied){
                        message=messages[i]=isc.addProperties({},message);
                        messageCopied=true;
                    }
                    message.content=String(message.content);
                    delete message.type;
                }
                if((message.type=="object"||message.type=="array")&&
                    !isc.isA.String(message.content)&&
                    isc.isAn.Object(message.content))
                {
                    if(!copied)doCopy();
                    if(!messageCopied){
                        message=messages[i]=isc.addProperties({},message);
                        messageCopied=true;
                    }
                    message.content=isc.AI._encodeJSON(message.content);
                    delete message.type;
                }
            }
        }
        if(aiRequest.prompt!=null){
            if(!copied)doCopy();
            aiRequest._origPrompt=aiRequest.prompt;
            if(messages==null){
                messages=aiRequest.messages=[];
            }
            messages.push({source:"user",content:aiRequest.prompt});
            delete aiRequest.prompt;
        }
        if(aiRequest.responseType=="number"){
            if(!copied)doCopy();
            if(messages==null){
                messages=aiRequest.messages=[];
            }
            var content="Your response must only be a number";
            if(aiRequest.responseMinimum!=null){
                if(aiRequest.responseMaximum!=null){
                    content+=(" between "+aiRequest.responseMinimum+" and "+
                                              aiRequest.responseMaximum+" inclusive.");
                }else{
                    content+=" at least "+aiRequest.responseMinimum+".";
                }
            }else if(aiRequest.responseMaximum!=null){
                content+=" no more than "+aiRequest.responseMaximum+".";
            }else{
                content+=".";
            }
            messages.push({source:"system",content:content});
            delete aiRequest.responseType;
        }
        if(aiRequest.responseType=="array"||aiRequest.responseType=="object"){
            var requestsJSON=false;
            if(messages!=null){
                for(var i=0;i<messages.length;++i){
                    var message=messages[i];
                    if(isc.AIEngine._isTextContentType(message.type)&&
                        /JSON/i.test(message.content))
                    {
                        requestsJSON=true;
                        break;
                    }
                }
            }
            if(!requestsJSON){
                if(!copied)doCopy();
                if(messages==null){
                    messages=aiRequest.messages=[];
                }
                messages.push({
                    source:"system",
                    content:"Your response must only be a JSON "+aiRequest.responseType+"."
                });
            }
        }
        aiRequest._isNormalized=true;
        return aiRequest;
    }
,isc.A.getTemperature=function isc_AIEngine_getTemperature(aiRequest){
        return(aiRequest&&aiRequest.temperature!=null?aiRequest.temperature:this.temperature);
    }
,isc.A.makeNonTextPromptPart=function isc_AIEngine_makeNonTextPromptPart(aiMessage){
        return"*non-text content*\n";
    }
,isc.A.makePromptParts=function isc_AIEngine_makePromptParts(aiRequest){
        aiRequest=this.normalizeRequest(aiRequest);
        this._assert(aiRequest.prompt==null);
        var historyDelimiters=isc.addProperties({},isc.AIEngine.defaultHistoryDelimiters,aiRequest.historyDelimiters);
        var parts=[],
            messages=aiRequest.messages;
        var lastPartIsNonStringOrStringEndingWith=(function(suffix){
            this._assert(parts.length>0);
            var lastPart=parts[parts.length-1];
            if(!isc.isA.String(lastPart))return true;
            return lastPart.endsWith(suffix);
        }).bind(this);
        var appendPart=function(part){
            if(isc.isA.String(part)&&
                parts.length>0&&
                isc.isA.String(parts[parts.length-1]))
            {
                parts[parts.length-1]+=part;
            }else{
                parts.push(part);
            }
        };
        if(messages!=null){
            var appendMessageContent=(function(message){
                if(parts.length>0){
                    var historyDelim=String(historyDelimiters["system"]);
                    if(message.source=="system"&&!lastPartIsNonStringOrStringEndingWith(historyDelim)){
                        appendPart(historyDelim);
                    }else if(!lastPartIsNonStringOrStringEndingWith('\n')){
                        appendPart("\n");
                    }
                }
                if(!isc.AIEngine._isTextContentType(message.type)){
                    appendPart(this.makeNonTextPromptPart(message));
                }else{
                    appendPart(String(message.content));
                }
            }).bind(this);
            var firstNonSystemMessageIndex=0;
            for(;firstNonSystemMessageIndex<messages.length;++firstNonSystemMessageIndex){
                var i=firstNonSystemMessageIndex;
                if(messages[i].source!="system"){
                    break;
                }
                appendMessageContent(messages[i]);
            }
            var i=firstNonSystemMessageIndex,
                iEnd=messages.length;
            for(;iEnd>i&&messages[iEnd-1].source=="system";--iEnd){}
            if(i<iEnd){
                var lastSource=messages[iEnd-1].source;
                this._assert(lastSource!="system");
                for(;iEnd-1>i&&(messages[iEnd-1-1].source=="system"||
                                      messages[iEnd-1-1].source==lastSource);--iEnd)
                {
                }
            }
            if(i<=iEnd-2){
                appendMessageContent({
                    source:"system",
                    content:(aiRequest.historyIntroduction!=null
                              ?aiRequest.historyIntroduction
                              :isc.AIEngine.defaultHistoryIntroduction)
                });
                for(;i<iEnd-1;++i){
                    var message=messages[i],
                        historyDelim=String(historyDelimiters[message.source||"user"]);
                    if(message.source!="system"){
                        if(parts.length>0&&!lastPartIsNonStringOrStringEndingWith("\n"))appendPart("\n");
                        appendPart(historyDelim);
                    }
                    appendMessageContent(message);
                    if(message.source!="system"){
                        if(parts.length>0&&!lastPartIsNonStringOrStringEndingWith("\n"))appendPart("\n");
                        appendPart(historyDelim);
                    }
                }
                appendMessageContent({
                    source:"system",
                    content:(aiRequest.historyConclusion!=null
                              ?aiRequest.historyConclusion
                              :isc.AIEngine.defaultHistoryConclusion)
                });
            }
            for(;i<messages.length;++i){
                appendMessageContent(messages[i]);
            }
        }
        return parts;
    }
,isc.A.makePromptText=function isc_AIEngine_makePromptText(aiRequest){
        var parts=this.makePromptParts(aiRequest);
        return parts.join("");
    }
,isc.A.transformRequest=function isc_AIEngine_transformRequest(aiRequest,config){
        aiRequest=this.normalizeRequest(aiRequest);
        var promptText=this.makePromptText(aiRequest);
        if(!config.ignoreTokenLimit&&this.tokenLimit!=null){
            var tokenCount=this.estimateTokenCount(promptText);
            if(tokenCount>this.tokenLimit){
                this.logWarn("Approximate token count for prompt text is: "+tokenCount+
                             ". This exceeds the token limit for the ai engine: "+this.name+
                             ". This request may be rejected by the AI server (proceeding anyway).","AI");
            }else{
                this.logDebug("Estimated token count for prompt is: "+tokenCount,"AI");
            }
        }
        return{
            engineId:this.engineId,
            model:this.model,
            temperature:this.getTemperature(aiRequest),
            text:promptText
        };
    }
,isc.A.getDataSourceName=function isc_AIEngine_getDataSourceName(aiRequest){
        return this.dataSourceName||isc.AI.dataSourceName;
    }
,isc.A._getDataSource=function isc_AIEngine__getDataSource(rawRequest,aiRequest,callback,config){
        var ds=isc.AI._getDataSource(this.engineId,aiRequest),
            dataSourceName=this.getDataSourceName(aiRequest);
        if(ds==null&&dataSourceName){
            if(isc.AI.autoLoadDataSource&&!isc.AI._loadDSFailed[dataSourceName]){
                isc.AI._pendingRequests.add({
                    engine:this,
                    rawRequest:rawRequest,
                    aiRequest:aiRequest,
                    callback:callback,
                    config:config
                });
                isc.AI.loadDataSource(dataSourceName);
            }else{
                this.logWarn("No AI DataSource configured","AI");
            }
        }
        return ds;
    }
,isc.A.handleSendRequest=function isc_AIEngine_handleSendRequest(rawRequest,aiRequest,callback,config){
        if(aiRequest.cancellationController&&aiRequest.cancellationController.canceled){
            var aiResponse=aiRequest.cancellationController.asCanceledResult();
            this.delayCall("fireCallback",[callback,"aiResponse,aiRequest,config",[aiResponse,aiRequest,config]]);
            return;
        }
        var ds=this._getDataSource(rawRequest,aiRequest,callback,config);
        if(!ds)return;
        if(this.logIsEnabledFor(isc.Log.DEBUG,"AI")){
            this.logDebug("Prompt text to send to AI: "+this.makePromptText(aiRequest),"AI");
        }
        var dsRequest={
            operationId:this.requestOperationId,
            willHandleError:true,
            clientContext:config.context,
            showPrompt:!!config.showPrompt
        };
        if(config.requestProperties!=null){
            isc.addProperties(dsRequest,config.requestProperties);
        }
        var spoofingMode=config.responseSpoofingMode||isc.AI.responseSpoofingMode;
        if(spoofingMode!="none"){
            var spoofedResponse=isc.AI.getSpoofedResponse(aiRequest,this);
            if(spoofedResponse!=null||spoofingMode=="full"){
                this.logDebug("* Using a spoofed response for the current interaction. responseSpoofingMode is \""+spoofingMode+"\". *","AI");
                dsRequest.dataProtocol="clientCustom";
                if(dsRequest.clientContext==null){
                    dsRequest.clientContext={};
                }
                dsRequest.clientContext.dataSource=ds;
                dsRequest.clientContext.aiEngine=this;
                dsRequest.clientContext.aiRequest=aiRequest;
                dsRequest.clientContext.spoofingMode=spoofingMode;
                dsRequest.clientContext.spoofedResponse=spoofedResponse;
            }
        }
        var _this=this;
        ds.fetchData(
            rawRequest,
            function(dsResponse,data,dsRequest){
                var aiResponse,
                    errorResponseInfo;
                if(aiRequest.cancellationController&&aiRequest.cancellationController.canceled){
                    aiResponse=aiRequest.cancellationController.asCanceledResult();
                }else{
                    if(dsResponse._isSpoofed&&(data.makeAIResponse||data.aiResponse)){
                        aiResponse=data.makeAIResponse?data.makeAIResponse(aiRequest,_this):data.aiResponse;
                        errorResponseInfo=data.makeErrorResponseInfo?data.makeErrorResponseInfo(aiRequest,_this):data.errorResponseInfo;
                    }else{
                        var rawResponse=(dsResponse._isSpoofed?_this.makeSpoofedRawResponse(aiRequest,data.value):dsResponse.completeData||data);
                        if(dsResponse.status<0||_this.isErrorResponse(rawResponse,aiRequest)){
                            errorResponseInfo=_this.getErrorResponseInfo(rawResponse,rawRequest,aiRequest);
                            aiResponse=isc.createErrorResult(errorResponseInfo&&errorResponseInfo.errorMessage);
                        }else{
                            aiResponse=_this.transformRawResponse(rawResponse,rawRequest,aiRequest,config);
                        }
                    }
                    if(aiResponse.type!="success"){
                        var errorType=errorResponseInfo&&errorResponseInfo.errorType;
                        if(errorType)aiResponse.errorType=errorType;
                        var retryIndex=Math.max(0,+config.retryIndex);
                        if(isNaN(retryIndex))retryIndex=0;
                        var maxRetries=Math.max(0,config.maxRetries!=null?config.maxRetries:isc.AI.defaultMaxRetries);
                        if(isNaN(maxRetries))maxRetries=0;
                        if(retryIndex>=maxRetries){
                            aiResponse=isc.createErrorResult("Exceeded the maximum number of retries ("+maxRetries+").",{
                                lastAIResponse:aiResponse
                            });
                        }else if(errorResponseInfo&&errorResponseInfo.recoverable){
                            var retryDelay=errorResponseInfo.retryDelay||isc.AI.sendPromptRetryDelay;
                            rawRequest=errorResponseInfo.newRawRequest||rawRequest;
                            config.retryIndex=retryIndex+1;
                            _this.delayCall("handleSendRequest",[rawRequest,aiRequest,callback,config],
                                            retryDelay);
                            return;
                        }
                    }
                }
                aiResponse=_this.normalizeResponse(aiResponse,aiRequest,config);
                _this.fireCallback(callback,"aiResponse,aiRequest,config",[aiResponse,aiRequest,config]);
            },
            dsRequest
        );
    }
,isc.A.makeSpoofedRawResponse=function isc_AIEngine_makeSpoofedRawResponse(aiRequest,spoofedResponseValue){
        return[{
            chat_role:"assistant",
            chat_content:spoofedResponseValue
        }];
    }
,isc.A.isErrorResponse=function isc_AIEngine_isErrorResponse(rawResponse,aiRequest){
        return!rawResponse||isc.isA.String(rawResponse)||!!rawResponse.error;
    }
,isc.A.getErrorResponseInfo=function isc_AIEngine_getErrorResponseInfo(rawResponse,rawRequest,aiRequest){
        if(isc.isA.String(rawResponse)){
            var obj=isc.AI._extractJsonResult(rawResponse);
            if(obj&&obj.error)rawResponse=obj;
            else return{errorMessage:"An error occurred. The response from the server was: "+rawResponse};
        }else if(!rawResponse||!rawResponse.error)return null;
        return{errorMessage:rawResponse.error.message};
    }
,isc.A.extractAIMessage=function isc_AIEngine_extractAIMessage(messageContent,rawRequest,aiRequest){
        var messageContentType="text";
        if(aiRequest.responseType=="array"||aiRequest.responseType=="object"){
            var tripleBacktickPos=messageContent.indexOf("```");
            if(tripleBacktickPos>=0){
                if(messageContent.indexOf("```json",tripleBacktickPos)>=0){
                    messageContent=isc.AI._extractJsonResult(messageContent,"```json","```",true);
                }else{
                    messageContent=isc.AI._extractJsonResult(messageContent,"```","```",true);
                }
            }else if(aiRequest.responseType=="array"&&messageContent.indexOf("[")>=0){
                messageContent=isc.AI._extractJsonResult(messageContent,"[","]");
            }else{
                messageContent=isc.AI._extractJsonResult(messageContent);
            }
            messageContentType=isc.isAn.Array(messageContent)?"array":"object";
        }
        return{source:"AI",content:messageContent,type:messageContentType};
    }
,isc.A.transformRawResponse=function isc_AIEngine_transformRawResponse(rawResponse,rawRequest,aiRequest,config){
        var content=isc.isAn.Array(rawResponse)&&rawResponse[0]&&rawResponse[0].chat_content;
        if(!isc.isA.String(content)){
            var errorMessage="Unable to extract the message from the AI response";
            this.logWarn(errorMessage,"AI");
            return isc.createErrorResult(errorMessage);
        }
        this.logDebug("Response text from AI: "+content,"AI");
        return{
            type:"success",
            message:this.extractAIMessage(content,rawRequest,aiRequest)
        };
    }
,isc.A.normalizeResponse=function isc_AIEngine_normalizeResponse(aiResponse,aiRequest,config){
        if(!aiResponse)aiResponse={};
        if(aiResponse.type==null||aiResponse.type=="error"){
            aiResponse.type="error";
        }else{
            var message=aiResponse.message;
            if(message){
                var responseType=aiRequest.responseType||"text";
                if(responseType=="array"){
                    if(!isc.isAn.Array(message.content)){
                        message.content=[message.content];
                        message.type="array";
                    }
                }else if(responseType=="object"){
                    if(!isc.isAn.Object(message.content)||isc.isAn.Array(message.content)){
                        message.content={result:message.content};
                        message.type="object";
                    }
                }else if(responseType=="number"){
                    message.content=Number(message.content);
                    if(aiRequest.responseMinimum!=null){
                        message.content=Math.max(aiRequest.responseMinimum,message.content);
                    }
                    if(aiRequest.responseMaximum!=null){
                        message.content=Math.min(message.content,aiRequest.responseMaximum);
                    }
                    message.type="number";
                }
            }
        }
        return aiResponse;
    }
);
isc.B._maxIndex=isc.C+30;

isc.A=isc.AIEngine.getPrototype();
isc.A.temperature=0.7;
isc.A.tokenLimit=4096
;

isc.defineClass("BaseOpenAIEngine",isc.AIEngine);
isc.A=isc.BaseOpenAIEngine.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.provider="OpenAI";
isc.A.dataSourceName="openAIRestConnector";
isc.A.requestOperationId="fetch";
isc.A.tokenLimit=4096;
isc.A.supportsJSONMode=false;
isc.A.supportsStructuredOutputs=false;
isc.B.push(isc.A.estimateRequestTokenCount=function isc_BaseOpenAIEngine_estimateRequestTokenCount(aiRequest){
        aiRequest=this.normalizeRequest(aiRequest);
        this._assert(aiRequest.prompt==null);
        var tokenEstimate=0,
            messages=aiRequest.messages;
        if(messages!=null){
            for(var i=0;i<messages.length;++i){
                tokenEstimate+=this.estimateMessageTokenCount(messages[i]);
            }
        }
        return tokenEstimate;
    }
,isc.A._mapAIMessageSourceToRole=function isc_BaseOpenAIEngine__mapAIMessageSourceToRole(source){
        if(!source)return"user";
        return source=="AI"?"assistant":source;
    }
,isc.A.transformRequest=function isc_BaseOpenAIEngine_transformRequest(aiRequest){
        aiRequest=this.normalizeRequest(aiRequest);
        var isVisionRequest=this.canSupportVisionRequests()&&isc.AIEngine.isVisionRequest(aiRequest);
        var request={
            model:isVisionRequest&&this.visionModel?this.visionModel:this.model||this.engineId,
            temperature:this.getTemperature(aiRequest),
            messages:null
        };
        var aiMessages=aiRequest.messages;
        if(aiMessages!=null){
            var messages=request.messages=new Array(aiMessages.length);
            for(var i=0;i<messages.length;++i){
                var aiMessage=aiMessages[i];
                messages[i]={
                    role:this._mapAIMessageSourceToRole(aiMessage.source),
                    content:null
                };
                if(isVisionRequest&&isc.AIEngine.isImageMessage(aiMessage)){
                    messages[i].content=[{
                        type:"image_url",
                        image_url:{
                            url:"data:image/"+(aiMessage.type=="jpegImage"?"jpeg":"png")+";base64,"+aiMessage.content
                        }
                    }];
                }else if(!isc.AIEngine._isTextContentType(aiMessage.type)){
                    messages[i].content=this.makeNonTextPromptPart(aiMessage);
                }else{
                    messages[i].content=String(aiMessage.content);
                }
            }
        }
        if(this.supportsJSONMode){
            if(aiRequest.responseType=="object"&&
                aiRequest.responseType!="array")
            {
                request.response_format={type:"json_object"};
            }
        }
        if(this.seed!=null)request.seed=this.seed;
        return request;
    }
,isc.A.makeSpoofedRawResponse=function isc_BaseOpenAIEngine_makeSpoofedRawResponse(aiRequest,spoofedResponseValue){
        return{
            choices:[{
                finish_reason:"stop",
                index:0,
                message:{
                    content:spoofedResponseValue,
                    role:"assistant"
                }
            }]
        };
    }
,isc.A.extractAIMessage=function isc_BaseOpenAIEngine_extractAIMessage(messageContent,rawRequest,aiRequest){
        if((messageContent.contains('{')||messageContent.contains('['))&&
            rawRequest&&rawRequest.response_format&&rawRequest.response_format.type=="json_object")
        {
            try{
                messageContent=isc.JSON.decode(messageContent);
                var messageContentType=isc.isAn.Array(messageContent)?"array":"object";
                return{source:"AI",content:messageContent,type:messageContentType};
            }catch(e){
                this.logWarn("JSON mode was enabled, but the response did not parse as JSON: "+e,"AI");
            }
        }
        return this.Super("extractAIMessage",arguments);
    }
,isc.A.transformRawResponse=function isc_BaseOpenAIEngine_transformRawResponse(rawResponse,rawRequest,aiRequest){
        var aiResponse={type:"error"};
        if(!rawResponse){
            aiResponse.errorMessage="The response was empty.";
        }else if(rawResponse.error){
            aiResponse.errorMessage=rawResponse.error.message;
        }else{
            var choice=isc.isAn.Array(rawResponse.choices)&&rawResponse.choices[0];
            var messageContent=choice&&choice.message&&choice.message.content;
            if(!isc.isA.String(messageContent)){
                this.logWarn(aiResponse.errorMessage="Unable to extract the message from the AI response","AI");
            }else{
                this.logDebug("Response text from AI: "+messageContent,"AI");
                aiResponse.type="success";
                aiResponse.message=this.extractAIMessage(messageContent,rawRequest,aiRequest);
            }
        }
        return aiResponse;
    }
);
isc.B._maxIndex=isc.C+6;

isc.defineClass("OpenAIO1Engine",isc.BaseOpenAIEngine);
isc.A=isc.OpenAIO1Engine.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.tokenLimit=128000-32768-25000;
isc.B.push(isc.A._mapAIMessageSourceToRole=function isc_OpenAIO1Engine__mapAIMessageSourceToRole(source){
        return source=="AI"?"assistant":"user";
    }
,isc.A.transformRequest=function isc_OpenAIO1Engine_transformRequest(aiRequest){
        var rawRequest=this.Super("transformRequest",arguments);
        rawRequest.max_completion_tokens=25000;
        return rawRequest;
    }
);
isc.B._maxIndex=isc.C+2;

isc.defineClass("MultimodalGPTEngine",isc.BaseOpenAIEngine);
isc.A=isc.MultimodalGPTEngine.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.tokenLimit=128000;
isc.B.push(isc.A.canSupportVisionRequests=function isc_MultimodalGPTEngine_canSupportVisionRequests(){
        return true;
    }
,isc.A.estimateMessageTokenCount=function isc_MultimodalGPTEngine_estimateMessageTokenCount(aiMessage){
        if(isc.AIEngine.isImageMessage(aiMessage)){
            return 85;
        }
        return this.Super("estimateMessageTokenCount",arguments);
    }
);
isc.B._maxIndex=isc.C+2;

isc.defineClass("GeminiProAIEngine",isc.AIEngine);
isc.A=isc.GeminiProAIEngine.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.name="Gemini Pro";
isc.A.provider="Google";
isc.A.tokenLimit=30720;
isc.A.visionTokenLimit=12288;
isc.A.requestOperationId="fetch";
isc.A.dataSourceName="geminiProRestConnector";
isc.A.visionDataSourceName="geminiProVisionRestConnector";
isc.B.push(isc.A.canSupportVisionRequests=function isc_GeminiProAIEngine_canSupportVisionRequests(){
        return true;
    }
,isc.A.estimateRequestTokenCount=function isc_GeminiProAIEngine_estimateRequestTokenCount(aiRequest){
        aiRequest=this.normalizeRequest(aiRequest);
        this._assert(aiRequest.prompt==null);
        if(isc.AIEngine.isVisionRequest(aiRequest)){
            var promptParts=this.makePromptParts(aiRequest),
                tokenEstimate=0;
            for(var i=0;i<promptParts.length;++i){
                var promptPart=promptParts[i];
                if(isc.isA.String(promptPart)){
                    tokenEstimate+=this.estimateTokenCount(promptPart);
                }
            }
            return tokenEstimate;
        }
        var tokenEstimate=0,
            messages=aiRequest.messages;
        if(messages!=null){
            for(var i=0;i<messages.length;++i){
                tokenEstimate+=this.estimateMessageTokenCount(messages[i]);
            }
        }
        return tokenEstimate;
    }
,isc.A.getTokenLimit=function isc_GeminiProAIEngine_getTokenLimit(aiRequest){
        return(isc.AIEngine.isVisionRequest(aiRequest)?this.visionTokenLimit:this.tokenLimit);
    }
,isc.A.getDataSourceName=function isc_GeminiProAIEngine_getDataSourceName(aiRequest){
        return(isc.AIEngine.isVisionRequest(aiRequest)?this.visionDataSourceName:this.dataSourceName);
    }
,isc.A.makeNonTextPromptPart=function isc_GeminiProAIEngine_makeNonTextPromptPart(aiMessage){
        if(isc.AIEngine.isImageMessage(aiMessage)){
            return{
                inlineData:{
                    mimeType:isc.AIEngine._getMIMEType(aiMessage),
                    data:aiMessage.content
                }
            };
        }
        return this.Super("makeNonTextPromptPart",arguments);
    }
,isc.A.makePromptParts=function isc_GeminiProAIEngine_makePromptParts(aiRequest){
        aiRequest=this.normalizeRequest(aiRequest);
        var origMessages=aiRequest.messages,
            numTrailingImageMessages=0,
            lastMessage;
        if(origMessages!=null&&
            origMessages.length>0&&
            isc.AIEngine.isImageMessage(lastMessage=origMessages[origMessages.length-1]))
        {
            for(var iEnd=origMessages.length;iEnd>0;--iEnd){
                var message=origMessages[iEnd-1];
                if(!isc.AIEngine.isImageMessage(message)||
                    lastMessage.source!=message.source)
                {
                    break;
                }
                ++numTrailingImageMessages;
            }
        }
        if(numTrailingImageMessages==0||numTrailingImageMessages==origMessages.length){
            return this.Super("makePromptParts",[aiRequest]);
        }
        var messages=origMessages.duplicate();
        messages.setLength(messages.length-numTrailingImageMessages);
        var messageBeforeTrailingImageMessages=messages[messages.length-1];
        if(messageBeforeTrailingImageMessages.source!=lastMessage.source){
            messages.push({source:lastMessage.source,content:""});
        }
        var promptParts;
        try{
            aiRequest.messages=messages;
            promptParts=this.Super("makePromptParts",[aiRequest]);
        }finally{
            aiRequest.messages=origMessages;
        }
        for(var i=0;i<numTrailingImageMessages;++i){
            promptParts.push(this.makeNonTextPromptPart(origMessages[origMessages.length-numTrailingImageMessages+i]));
        }
        return promptParts;
    }
,isc.A.transformRequest=function isc_GeminiProAIEngine_transformRequest(aiRequest){
        aiRequest=this.normalizeRequest(aiRequest);
        var messages=aiRequest.messages;
        var generateContentRequest={
            contents:null,
            generationConfig:{
                temperature:this.getTemperature(aiRequest)
            }
        };
        if(isc.AIEngine.isVisionRequest(aiRequest)){
            var promptParts=this.makePromptParts(aiRequest);
            for(var i=0;i<promptParts.length;++i){
                if(isc.isA.String(promptParts[i])){
                    promptParts[i]={text:String(promptParts[i])};
                }
            }
            generateContentRequest.contents=[{parts:promptParts,role:"user"}];
        }else if(messages!=null){
            var contents=generateContentRequest.contents=[];
            for(var messageIndex=0;messageIndex<messages.length;++messageIndex){
                var message=messages[messageIndex];
                this._assert(!isc.AIEngine.isImageMessage(message));
                var part={text:String(message.content)};
                var role=(message.source=="AI"?"model":"user");
                if(contents.length>0&&contents[contents.length-1].role==role){
                    contents[contents.length-1].parts.push(part);
                }else{
                    contents.push({
                        parts:[part],
                        role:role
                    });
                }
            }
        }
        return generateContentRequest;
    }
,isc.A.isErrorResponse=function isc_GeminiProAIEngine_isErrorResponse(rawResponse,aiRequest){
        if(!rawResponse)return true;
        var promptFeedback=rawResponse.promptFeedback;
        if(promptFeedback&&promptFeedback.blockReason)return true;
        var candidates=rawResponse.candidates;
        if(!isc.isAn.Array(candidates)||candidates.length==0)return true;
        return candidates[0].finishReason!="STOP";
    }
,isc.A.getErrorResponseInfo=function isc_GeminiProAIEngine_getErrorResponseInfo(rawResponse,rawRequest,aiRequest){
        if(isc.isA.String(rawResponse)){
            var obj=isc.AI._extractJsonResult(rawResponse);
            if(obj&&obj.finishReason)rawResponse=obj;
            else return{errorMessage:"An error occurred. The response from the server was: "+rawResponse};
        }else if(!rawResponse)return null;
        var errorMessage,
            errorType;
        var promptFeedback=rawResponse.promptFeedback,
            candidates=rawResponse.candidates;
        if(promptFeedback&&promptFeedback.blockReason){
            if(promptFeedback.blockReason=="SAFETY"){
                errorMessage="The request was deemed unsafe.";
                errorType="requestUnsafe";
            }else{
                var usageMetadata=rawResponse.usageMetadata;
                if(usageMetadata&&
                    isc.isA.Number(usageMetadata.promptTokenCount)&&
                    usageMetadata.promptTokenCount>this.getTokenLimit(aiRequest))
                {
                    errorMessage="The request contained too many tokens.";
                    errorType="requestSizeLimitExceeded";
                }else{
                    errorMessage="The request was blocked for an unspecified reason.";
                }
            }
        }else if(!isc.isAn.Array(candidates)||candidates.length==0){
            errorMessage="No candidates were generated.";
        }else{
            var finishReason=candidates[0].finishReason;
            if(finishReason=="MAX_TOKENS"){
                errorMessage="The response contained too many tokens.";
                errorType="responseSizeLimitExceeded";
            }else if(finishReason=="SAFETY"){
                errorMessage="The response was blocked for safety reasons.";
                errorType="responseUnsafe";
            }else if(finishReason=="RECITATION"){
                errorMessage="The response was blocked for recitation reasons.";
            }else{
                errorMessage="The first candidate's finishReason was: "+finishReason;
            }
        }
        return{
            errorMessage:errorMessage,
            errorType:errorType
        };
    }
,isc.A.makeSpoofedRawResponse=function isc_GeminiProAIEngine_makeSpoofedRawResponse(aiRequest,spoofedResponseValue){
        if(aiRequest.responseType=="array"||aiRequest.responseType=="object"){
            spoofedResponseValue="```json\n"+spoofedResponseValue+"\n```";
        }
        return{
            candidates:[{
                content:{
                    parts:[{
                        text:spoofedResponseValue
                    }],
                    role:"model"
                },
                finishReason:"STOP"
            }]
        };
    }
,isc.A.transformRawResponse=function isc_GeminiProAIEngine_transformRawResponse(rawResponse,rawRequest,aiRequest){
        var aiResponse={type:"error"};
        var candidate=rawResponse&&isc.isAn.Array(rawResponse.candidates)&&rawResponse.candidates[0];
        var parts=candidate&&candidate.content&&candidate.content.parts;
        if(parts==null||parts.length==0){
            this.logWarn(aiResponse.errorMessage="Unable to extract the message from the AI response","AI");
        }else{
            var messageContent="";
            if(parts.length>1)this.logWarn(parts.length+" parts were in the AI response","AI");
            for(var i=0;i<parts.length;++i){
                var part=parts[i];
                if(!("text"in part)){
                    this.logWarn("message part was not text: "+isc.JSON.encode(part),"AI");
                }else{
                    messageContent=(messageContent!=""?"\n":"")+part.text;
                }
            }
            this.logDebug("Response text from AI: "+messageContent,"AI");
            aiResponse.type="success";
            aiResponse.message=this.extractAIMessage(messageContent,rawRequest,aiRequest);
        }
        return aiResponse;
    }
);
isc.B._maxIndex=isc.C+11;

if(!isc.AI)isc.defineClass("AI");
isc.A=isc.AI;
isc.A.aiWasDisabledMessage="AI was disabled.";
isc.A.defaultAIEngineNotRegisteredErrorMessage="The default AI engine '${defaultEngineId}' is not registered.";
isc.A.noAIEngineSupportingVisionRequestsIsRegisteredErrorMessage="No AI engine is registered which supports vision requests.";
isc.A.aiNotAbleToProcessRequestErrorMessage="AI is not able to process your request.";
isc.A.noDataSourcesAvailableOrFoundErrorMessage="There were no data sources available or found.";
isc.A.startingYourRequestDetailMessage="Starting your request\u2026";
isc.A.willSubsetFieldsDetailMessage="Since the data source has a large number of fields, AI will be asked to select which ones are likely to be relevant to your request.";
isc.A.finishedSubsettingFieldsDetailMessage="Finished the request to select the relevant fields.";
isc.A.dataSourceIsRequiredErrorMessage="A globally-installed DataSource with a non-composite primary key is required.";
isc.A.exampleResponseDelineator="$$$$$$$";
isc.A.aiResponseDelineator="#######";
isc.A.scPostDelineator="^^^^^^^";
isc.A._isTextContentType=isc.AIEngine._isTextContentType;
isc.A._isImageContentType=isc.AIEngine._isImageContentType;
isc.A._aiProgressCallbackArgNames="context,numStepsCompleted,estimatedNumTotalSteps,newMessages"
;

isc.A=isc.AI;
isc.A.responseTypes=["Execute JavaScript","Clarify","Inspect","Explain Why Not","Ad Hoc UI","Send A Message"];
isc.A.messageTypes=["Notify","Modal Message"];
isc.A.errorTypes={
        "ContainsAIDelineator":"The Response should not contain "+isc.AI.aiResponseDelineator+" or "+isc.AI.scPostDelineator,
        "NoResponseType":"The Response has no ResponseType, which is invalid.",
        "BadResponseType":"The Response has ResponseType ${responseType}, which is not a valid ResponseType.",
        "NoMessageType":"The Response has a Message but there is no MessageType, which is invalid.",
        "BadMessageType":"The Response has MessageType ${messageType}, which is not a valid MessageType.",
        "NoMessage":"ResponseType is ${responseType} but there is no Message in the Response, which is invalid.",
        "NoJavaScript":"ResponseType is ${responseType} but there is no JavaScript in the Response, which is invalid.",
        "NoCommandComplete":"ResponseType is ${responseType} but the JavaScript code in the Response does not contain a call"+
                            " to isc.AI.commandComplete(). This method should be invoked exactly once when the script's actions are completed",
        "JavaScriptError":
            "Your attempt to execute JavaScript in the user's session resulted in a JavaScript error.\n"+
            "The error message is as follows:\n"+
            "    ${error.message}\n"+
            "End of error message.\n"+
            "${hint}"+
            "The attempted changes have been reverted and no messages have been displayed to the end user.\n"+
            "Please provide a revised response in the same format previously described."
    }
;

isc.A=isc.AI;
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.serializationFormat="compactJSON";
isc.A.csvFormatDescription="Objects are formatted in a character-separated-values format where each line shows "+
        "the attribute-values of an object for the following fields:\n${fieldNames}\n"+
        "Attribute values are separated by ${separator}.\n";
isc.A.separatorCharacter="|";
isc.A.jsonFormatDescription="Objects are serialized as an array of JSON formatted objects.\n";
isc.A.defaultRecordIndexFieldName="data-record index";
isc.A.disabled=true;
isc.A.engineConfigs=[
        {
            engineId:"gpt-3.5-turbo",
            _constructor:"BaseOpenAIEngine",
            name:"GPT-3.5 Turbo",
            model:"gpt-3.5-turbo",
            tokenLimit:4096,
            supportsJSONMode:true
        },
        {
            engineId:"gpt-4",
            _constructor:"BaseOpenAIEngine",
            name:"GPT-4",
            model:"gpt-4",
            tokenLimit:8192,
            supportsJSONMode:true
        },
        {
            engineId:"gpt-4-turbo",
            _constructor:"MultimodalGPTEngine",
            name:"GPT-4 Turbo",
            supportsJSONMode:true
        },
        {
            engineId:"gpt-4o",
            _constructor:"MultimodalGPTEngine",
            name:"GPT-4o",
            supportsJSONMode:true
        },
        {
            engineId:"gpt-4o-mini",
            _constructor:"MultimodalGPTEngine",
            name:"GPT-4o mini",
            supportsJSONMode:true
        },
        {
            engineId:"gpt-4.1",
            _constructor:"BaseOpenAIEngine",
            name:"GPT-4.1"
        },
        {
            engineId:"gemini-pro",
            _constructor:"GeminiProAIEngine"
        },
        {
            engineId:"o1-preview",
            _constructor:"OpenAIO1Engine"
        },
        {
            engineId:"o1-mini",
            _constructor:"OpenAIO1Engine"
        },
        {
            engineId:"o3-mini",
            _constructor:"OpenAIO1Engine"
        }
    ];
isc.A.defaultEngineId="gpt-4o";
isc.A.engines={};
isc.A.assistantKey={altKey:true,keyName:"J"};
isc.A._dataBoundAIOperationResultCallbackArgNames="result,request";
isc.A.defaultMaxRetries=2;
isc.A.sendPromptRetryDelay=5000;
isc.A._pendingRequests=[];
isc.A.useClientSessionHistory=true;
isc.A.adjacentValidationFailureCount=0;
isc.A._aemErrorCount=0;
isc.A.canExport=true;
isc.A.canExportCharts=true;
isc.A.canExportGrids=true;
isc.A.canSaveScreens=true;
isc.A.adHocUIWindowDefaults={
        _constructor:"Window",
        width:"80%",
        height:"80%",
        canDragResize:true,canDragReposition:true,
        keepInParentRect:false,
        autoCenter:true,
        isModal:true,
        title:"AI created User Interface",
        showHeaderIcon:true,
        bodyProperties:{
            padding:10,
            layoutMargin:10,
            membersMargin:9
        },
        toolStripDefaults:{
            _constructor:"ToolStrip",
            autoDraw:false,
            width:"100%",
            height:40
        },
        helpButtonDefaults:{
            _constructor:"ToolStripButton",
            autoDraw:false,
            name:"helpWithUI",
            prompt:"Ask for help with the dynamically created UI",
            click:function(){
                this.creator.getHelpWithThisUI();
            }
        },
        saveButtonDefaults:{
            _constructor:"ToolStripButton",
            autoDraw:false,
            name:"helpWithUI",icon:"[SKINIMG]actions/save.png",
            prompt:"Save this UI for future use",
            click:function(){
                this.creator.saveAdHocUI();
            }
        },
        exportButtonDefaults:{
            _constructor:"ToolStripButton",
            name:"exportUI",icon:"[SKINIMG]actions/export.png",
            click:function(){
                this.creator.exportUI();
            }
        },
        initWidget:function(){
            this.headerIconDefaults.src=isc.AI.getIconURL(true);
            this.addAutoChild("helpButton",{icon:isc.AI.getIconURL(true)});
            this.addAutoChild("saveButton",{showIf:"isc.AI.canSaveScreens"});
            this.addAutoChild("exportButton",{showIf:"isc.AI.canExport"});
            this.addAutoChild("toolStrip",{members:[this.helpButton,this.saveButton,this.exportButton]});
            this.addItem(this.toolStrip);
            return this.Super("initWidget",arguments);
        },
        showCloseButton:true,
        showMinimizeButton:false,showMaximizeButton:true,
        closeClick:function(){
            this.destroy();
        },
        setAdHocUI:function(adHocUI,response){
            this.adHocUI=isc.isAn.Array(adHocUI)?adHocUI[0]:adHocUI;
            this.response=response;
            var dbc=this.adHocUI&&this.adHocUI.getFirstDBC();
            if(!dbc){
                this.exportButton.hide();
            }else{
                this.exportButton.show();
                this.exportButton.prompt=isc.isA.ListGrid(dbc)?"Export Grid Data":
                    "Export Chart";
            }
            this.firstDBC=dbc;
            if(this.adHocUI){
                this.addItem(this.adHocUI,0);
            }
        },
        getAdHocUI:function(){
            return this.adHocUI;
        },
        saveAdHocUI:function(){
            isc.AI.showSaveUIWindow(this.response);
        },
        getAdHocUISummary:function(){
            return this.adHocUI&&this.adHocUI.getUISummary(["data"]);
        },
        exportUI:function(){
            var dbc=this.adHocUI.getFirstDBC();
            if(!dbc){
                isc.logWarn("No exportable UI.");
                return;
            }
            var isLG=isc.isA.ListGrid(dbc),
                isFC=isc.isA.FacetChart(dbc),
                items=[]
            ;
            if(isLG){
                items=[
                    {title:"CSV",val:"csv"},
                    {title:"JSON",val:"json"},
                    {title:"XML",val:"xml"},
                    {title:"XLS (Excel97)",val:"xls"},
                    {title:"OOXML (Excel2007)",val:"ooxml"}
                ];
            }else if(isFC){
                items=[
                    {title:"PNG",val:"png"},
                    {title:"JPEG",val:"jpeg"}
                ];
            }
            var menu=isc.Menu.create({
                autoDraw:false,
                items:items,
                keepInParentRect:true,
                itemClick:function(item){
                    if(isLG){
                        if(item.val=="json"){
                            dbc.exportClientData({operationId:"customJSONExport"
                            });
                        }else{
                            dbc.exportClientData({exportAs:item.val
                            });
                        }
                    }else if(isFC){
                        isc.RPCManager.exportImage(dbc.getSvgString(),{
                            exportDisplay:"download",
                            exportFilename:"export",
                            exportImageFormat:item.val,
                            exportImageQuality:1
                        });
                    }
                }
            })
            menu._moveMenuOffscreen();
            menu.draw();
            var height=menu.getVisibleHeight();
            menu.placeNear(this.exportButton.getPageLeft(),
                this.exportButton.getPageTop()-height);
            menu.show();
        },
        getHelpWithThisUI:function(){
            isc.AI.showAssistant({rootCanvas:this.adHocUI});
        }
    };
isc.A.saveUIWindowDefaults={
        _constructor:"Window",
        width:300,
        autoCenter:true,
        autoSize:true,
        overflow:"visible",
        canDragResize:true,
        isModal:true,
        canDragReposition:true,
        title:"Save AI generated UI",
        bodyProperties:{
            padding:10,
            layoutMargin:10,
            membersMargin:9
        },
        labelDefaults:{
            _constructor:"Label",
            width:"100%",
            height:1,
            overflow:"visible",
            dynamicContents:true,
            contents:"You can save AI-generated screens for later use.  Saved screens are "+
                "available whenever you open the AI assistant.<br><br>"+
                "What would you like to name this UI?<br>"
        },
        formDefaults:{
            _constructor:"DynamicForm",
            height:"*",
            autoFocus:true,
            cellPadding:0,
            fields:[
                {name:"userText",type:"textArea",minHeight:50,width:"*",height:"*",
                    colSpan:"*",showTitle:false,
                    hint:"Type a name for your saved UI",showHintInField:true,
                    keyPress:function(item,form,keyName,characterValue){
                        if(keyName=="Enter"){
                            this.form.creator.saveAdHocUI();
                            return false;
                        }
                    }
                }
            ]
        },
        controlsLayoutDefaults:{
            _constructor:"HLayout",
            width:"100%",
            height:1,
            overflow:"visible",
            align:"right",
            membersMargin:8
        },
        saveButtonDefaults:{
            _constructor:"Button",
            title:"Save",
            autoFit:true,
            autoDraw:false,
            click:function(){
                this.creator.saveAdHocUI();
            },
            layoutAlign:"right"
        },
        cancelButtonDefaults:{
            _constructor:"Button",
            title:"Cancel",
            autoFit:true,
            autoDraw:false,
            click:function(){
                this.creator.hide();;
            },
            layoutAlign:"right"
        },
        initWidget:function(){
            this.Super("initWidget",arguments);
            this.addItem(this.addAutoChild("label"));
            this.addItem(this.addAutoChild("form"));
            this.addAutoChild("saveButton");
            this.addAutoChild("cancelButton");
            this.addItem(this.addAutoChild("controlsLayout",{members:[this.saveButton,this.cancelButton]}));
        },
        saveAdHocUI:function(){
            isc.AI.saveAdHocUI(this.form.getValue("userText"),this.response);
            this.hide();
        },
        closeClick:function(){
            this.hide();
        },
        setResponse:function(response){
            this.response=response;
        },
        show:function(){
            this.form.setValue("userText",(isc.AI.lastUserPrompt||"").substring(0,100));
            return this.Super("show",arguments);
        }
    };
isc.A.savedUIStorageKey="savedUI";
isc.A.screensDataSource=null;
isc.A.logLocalDSRequests=false;
isc.A.assistantBlurb="<b>Ask for AI assistance in using this "+
            "${isc.AI.isShowcase ? \"Showcase Sample\" : \"application\"}.</b><br><br>"+
            "You can:<br><br>"+
            "1. request that the AI configures the existing screen to do something you want "+
                "(such as configuring complex search criteria for a grid)<br><br>"+
            "2. request that the AI builds you a custom interface, to enable you to complete "+
                "tasks more quickly than what the current UI allows. "+
                "Note that AI-created screens may be saved for future use.<br>";
isc.A.assistantHint="Type your question or request here";
isc.A.assistantWindowDefaults={
        _constructor:"Window",
        width:500,
        autoCenter:true,
        autoSize:true,
        overflow:"visible",
        canDragResize:true,
        canDragReposition:true,
        title:"SmartClient AI Assistant",
        showHeaderIcon:true,
        bodyProperties:{
            padding:10,
            layoutMargin:10,
            membersMargin:10
        },
        labelDefaults:{
            _constructor:"Label",
            width:"100%",
            dynamicContents:true
        },
        formDefaults:{
            _constructor:"DynamicForm",
            height:"*",
            autoFocus:true,
            cellPadding:0,
            fields:[
                {name:"userText",type:"textArea",minHeight:50,width:"*",height:"*",
                    colSpan:"*",showTitle:false,
                    hint:isc.AI.assistantHint,showHintInField:true,
                    keyPress:function(item,form,keyName,characterValue){
                        if(keyName=="Enter"){
                            this.form.creator.askTheAI();
                            return false;
                        }
                    }
                }
            ]
        },
        controlsLayoutDefaults:{
            _constructor:"HLayout",
            width:"100%",
            height:1,
            membersMargin:10,
            overflow:"visible"
        },
        savedUIFormDefaults:{
            _constructor:"DynamicForm",
            width:360,
            minWidth:200,
            height:1,
            overflow:"visible",
            autoFocus:false,
            autoDraw:false,
            cellPadding:0,
            layoutAlign:"left"
        },
        askButtonDefaults:{
            _constructor:"Button",
            title:"Ask the AI",
            autoFit:true,
            click:function(){
                this.creator.askTheAI();
            },
            layoutAlign:"right"
        },
        initWidget:function(){
            this.headerIconDefaults.src=isc.AI.getIconURL(true);
            this.Super("initWidget",arguments);
            this.addItem(this.addAutoChild("label",{
                contents:isc.AI.assistantBlurb
            }));
            this.addItem(this.addAutoChild("form"));
            this.addItem(this.addAutoChild("controlsLayout"));
            this.addAutoChild("savedUIForm",{
                fields:[{
                    name:"savedUI",type:"select",width:"*",
                    colSpan:"*",
                    optionDataSource:isc.AI.getScreensDataSource(),
                    valueField:"name",displayField:"name",
                    title:"Saved Screens",
                    wrapTitle:false,
                    pickListProperties:{canRemoveRecords:true},
                    changed:function(){
                        this.form.creator.loadSavedUI(this.getValue());
                        return false;
                    }
                }]
            });
            this.addAutoChild("askButton");
            this.controlsLayout.addMembers([
                this.savedUIForm,
                isc.LayoutSpacer.create({width:"*"}),
                this.askButton
            ]);
        },
        askTheAI:function(){
            var promptText=this.form.getValue("userText")
            isc.AI.command(promptText,"userQuery");
            isc.Notify.addMessage("Asked the AI: \""+promptText+"\"");
        },
        loadSavedUI:function(){
            var uiKey=this.savedUIForm.getValue("savedUI");
            isc.AI.getSavedUI(uiKey,function(data){
                isc.AI.handleAIResponse(data.response.aiResponse);
            })
        },
        close:function(){
            this.Super("close",arguments);
            isc.AI.assistantClosed();
        }
    };
isc.A.clearHistoryOnClose=true;
isc.A.clarifyWindowDefaults={
        _constructor:"Window",
        width:300,
        autoCenter:true,
        autoSize:true,
        canDragResize:true,
        canDragReposition:true,
        height:200,
        title:"The AI needs your input",
        bodyProperties:{
            padding:10,
            layoutMargin:10,
            membersMargin:9
        },
        labelContents:"",
        labelDefaults:{
            _constructor:"Label",
            width:"100%",
            height:1,
            contents:""
        },
        formDefaults:{
            _constructor:"DynamicForm",
            height:"*",
            autoFocus:true,
            cellPadding:0,
            fields:[
                {name:"userText",type:"textArea",minHeight:50,width:"*",height:80,
                    colSpan:"*",showTitle:false,
                    hint:"Type your clarifying information here",showHintInField:true,
                    keyPress:function(item,form,keyName,characterValue){
                        if(keyName=="Enter"){
                            this.form.creator.tellTheAI();
                            return false;
                        }
                    }
                }
            ]
        },
        aiButtonDefaults:{
            _constructor:"Button",
            title:"Tell the AI",
            autoFit:true,
            click:function(){
                this.creator.tellTheAI();
            },
            layoutAlign:"right"
        },
        initWidget:function(){
            this.Super("initWidget",arguments);
            this.addItem(this.addAutoChild("label"));
            this.addItem(this.addAutoChild("form"));
            this.addItem(this.addAutoChild("aiButton"));
        },
        tellTheAI:function(){
            var promptText=this.form.getValue("userText")
            isc.AI.command(promptText,"userClarification");
            isc.AI.hideClarifyWindow();
        }
    };
isc.A._invalidResult={result:"invalid"};
isc.A._responseForBatchCallbackArgNames="aiResponseForBatch,context";
isc.A.useAIFieldPaging=true;
isc.A.salientFieldAttributes=[
        "name",
        "type",
        "required",
        "multiple",
        "title",
        "description",
        "valueMap",
        "validOperators",
        "displayField",
        "foreignKey",
        "joinType",
        "includeFrom",
        "includeVia",
        "hidden"
    ];
isc.A.setFieldsFixedPrompt="This is a request by a user to show and/or hide some ListGrid fields in a web application built with the "+
        "Isomorphic SmartClient Javascript framework. "+
        "The user request is as follows:\n'${userPrompt}'\n"+
        "Your response should be a JSON string containing an object with two attributes.\n"+
        "\"show\": the fields the user wants to show as an array of strings, or an empty array if the user did not ask to show any fields.\n"+
        "\"hide\": the fields the user wants to hide as an array of strings, or an empty array if the user did not ask to hide any fields.\n\n"+
        "Do not include any other text in your response.\n\n";
isc.A.setFieldsHiddenFieldsPromptPrefix="The following fields are not currently visible in the grid but are available to be shown.\n";
isc.A.setFieldsVisibleFieldsPromptPrefix="The grid currently contains the following visible fields which may be hidden.\n";
isc.A._buildViaAIResponseCallbackArgNames="buildResponse,buildRequest";
isc.A._$asyncBuildCriterion="asyncBuildCriterion";
isc.A.buildCriteriaAIAssistPrompts=[
        "This is a request for an AdvancedCriteria object to apply to a data-bound component "+
        "(such as a ListGrid) in a web application built with the Isomorphic SmartClient JavaScript "+
        "Framework. Should you need to know, today's date is "+
        isc.DateUtil.format(new Date(),"MMMM dd, yyyy")+". "+
        "The AdvancedCriteria should fulfill the following filter-query:\n",
        "${userMessages}",
        "\n\n",
        "The data-bound component's DataSource has the following summary:\n"+
        "${dsSummary}\n\n"+
        "If the provided field-information is insufficient to generate a functional "+
        "AdvancedCriteria object for the filter-query, your response should be exactly "+
        "'{ \"result\": \"invalid\" }'.\n\n",
        "If an AdvancedCriteria expression could be written as either "+
        "{ operator: 'not', criteria: [{ fieldName: 'someField', operator: 'equals', value: 'value' }] } "+
        "or as { fieldName: 'someField', operator: 'notEqual', value: 'value' }, prefer the second form.",
        "But if the filter-query *can* be fulfilled, your response should include only the AdvancedCriteria object, which has the following format:\n"+
        "${advancedCriteriaFormatDescription}"
    ];
isc.A.advancedCriteriaFormatDescription="{\"_constructor\":\"AdvancedCriteria\",\n"+
        "\"operator\":Any valid OperatorID, including \"and\" or \"or\" if there are multiple subcriteria, or "+
        "for single field criterion, one of \"iContains\", \"iEquals\", \"iNotContains\", \"iNotEqual\", \"greaterThan\", \"lessThan\", \"greaterOrEqual\", \"lessOrEqual\", \"isBlank\", \"notBlank\"\n"+
        "\"criteria\":If \"operator\" is \"and\" or \"or\", an array of subcriteria to apply. For any other operator, this attribute should be omitted,\n"+
        "\"fieldName\":name of the field to which this criterion should apply if this is a single field criterion. Valid values for this property are the list of fields provided below.  This property should be omitted if the operator is \"and\" or \"or\",\n"+
        "\"value\":If the \"operator\" is neither \"isBlank\" nor \"notBlank\", the value for the criterion, otherwise this attribute should be omitted. If the field is of type 'date', any 'value' attribute should be formatted as a string in the format YYYY-MM-DD.\n"+
        "}\n\n"+
        "AdvancedCriteria does not support top-N (e.g. top 3) or percentile filtering. If the user "+
        "has requested a certain number of top records, or a certain percentile of records, you "+
        "should ignore that part of the request.\n\n"+
        "Note: the operators \"lessThan\" and \"lessOrEqual\" always consider a blank value to "+
        "be less than the criterion \"value\". When using \"lessThan\" or \"lessOrEqual\" on "+
        "a field that is not \"required\":true, you will need to use an \"and\" operator where "+
        "one of the \"criteria\" is \"operator\":\"notBlank\", if blank values should be excluded.\n\n"+
        "For example, an AdvancedCriteria object directly corresponding to a user request of 'Show items where fieldA is greater than zero' is:\n"+
        "{\"_constructor\":\"AdvancedCriteria\",\n"+
        "\"operator\":\"greaterThan\",\n"+
        "\"fieldName\":\"fieldA\",\n"+
        "\"value\":0\n"+
        "}\n\n"+
        "And an AdvancedCriteria object directly corresponding to a user request of 'orderID must be non empty and orderTotal must be more than 0 and less than 20' is:\n"+
        "{\"_constructor\":\"AdvancedCriteria\",\n"+
        "\"operator\":\"and\",\n"+
        "\"criteria:[{\"fieldName\":\"orderID\",\"operator\":\"notBlank\"},\n"+
        "{\"fieldName\":\"orderTotal\",\"operator\":\"greaterThan\",\"value\":0},\n"+
        "{\"fieldName\":\"orderTotal\",\"operator\":\"lessThan\",\"value\":20}]\n"+
        "}\n\n";
isc.A.buildCriteriaHybridPrompts=[
        "The user of a web application built with the Isomorphic SmartClient JavaScript Framework "+
        "has requested to filter the data-records of a data-bound component according to the following filter-query:",
        "${userMessages}",
        "The data-bound component's DataSource has the following summary:\n"+
        "${dsSummary}\n"+
        "\n"+
        "There are two methods of filtering the data-records of the data-bound component:\n"+
        "1. Generate an AdvancedCriteria object that directly corresponds to the user's filter-query.\n"+
        "2. Evaluate each record on a case-by-case basis, using the properties of each data-record, "+
        "all reasonable inferences, and your own knowledge to decide whether a data-record "+
        "matches the filter-query.\n"+
        "\n",
        "An AdvancedCriteria object has the following format:\n"+
        "${advancedCriteriaFormatDescription}",
        "Method 1 is preferred if you can create an AdvancedCriteria object for the filter-query.",
        "Your response must be a JSON object.",
        "If you decide that method 1 is sufficient, your response should be the AdvancedCriteria "+
        "object for the filter-query.",
        "If you decide that only method 2 would satisfy the filter-query, your response should "+
        "be exactly '{ \"result\": \"method2\" }'.",
        "In all other cases, your response should be exactly '{ \"result\": \"invalid\" }'."
    ];
isc.A.fixCriterionPrompts=[
        "The user of a web application built with the Isomorphic SmartClient JavaScript Framework "+
        "has requested to filter the data-records of a data-bound component according to the following filter-query:",
        "${userMessages}",
        "The data-bound component's DataSource has the following summary:\n"+
        "${dsSummary}\n\n"+
        "You generated the following AdvancedCriteria object:\n"+
        "${encodedCriterion}\n"+
        "The reason(s) why this is invalid are:\n"+
        "${validationErrors}\n\n"+
        "${encodedValidatedCriterion "+
        "? 'We have attempted to fix your AdvancedCriteria as follows:\\n' + encodedValidatedCriterion + '\\n\\n' "+
        ": ''}"+
        "An AdvancedCriteria object has the following format:\n"+
        "${this.advancedCriteriaFormatDescription}\n\n"+
        "You are to generate a different AdvancedCriteria object that satisfies the user's "+
        "filter-query *and* avoids the validation errors listed above.\n"+
        "If you are unable to do this, then your response should be exactly "+
        "'{ \"result\": \"invalid\" }'"
    ];
isc.A.allowedCriterionPropertyNames=["fieldName","fieldQuery","operator","value","valuePath","valueQuery","start","end"];
isc.A._allowedOperatorIds=[
        "and",
        "or",
        "not",
        "isBlank","notBlank",
        "isNull","notNull",
        "equals","notEqual","iEquals","iNotEqual",
        "contains","notContains","iContains","iNotContains",
        "startsWith","notStartsWith","iStartsWith","iNotStartsWith",
        "endsWith","notEndsWith","iEndsWith","iNotEndsWith",
        "greaterThan",
        "lessThan",
        "greaterOrEqual",
        "lessOrEqual"
    ];
isc.A._applyAIFilterResponseCallbackArgNames="applyResponse,applyRequest";
isc.A._$asyncApplyAIFilter="asyncApplyAIFilter";
isc.A.applyAIFilterPrompts=[
        "The objects in the source-array below represent data-records from a DataSource. Using "+
        "the properties on each data-record, the summary of the DataSource, and your own knowledge, "+
        "determine which data-records match the user-supplied filter-query:",
        "${userMessages}",
        "The DataSource has the following summary:\n"+
        "${dsSummary}\n\n"+
        "For example, if the query was 'amount is larger than 100', you should look for a field with a name "+
        "most related to 'amount' and compare its value to 100.\n\n"+
        "Your response should be a JSON object with a single property called 'result'.  This property should be set to "+
        "an array of integers, where each integer is the index of a matching record in the source-array below.  "+
        "For example, if the first data-record in the array below matches the user's filter-query, your response array "+
        "must include its source-array index (0) as the first entry.  Similarly, the source-array indices of any "+
        "other matching data-records must also be in your response array.\n\n"+
        "If a data-record does not match the filter-query, do not include its index in your response array.\n\n"+
        "If no data-records match, the 'result' property in your response object should be set to an empty array.\n\n"+
        "Apart from the JSON object, your response must not include any other preamble or content of any kind."
    ];
isc.A._$asyncBuildHilites="asyncBuildHilites";
isc.A.buildHilitesPrompts=[
        "This is a request for one or more Hilite objects to apply to a data-bound component "+
        "(such as a ListGrid) in a web application built with the Isomorphic SmartClient JavaScript "+
        "Framework. Should you need "+
        "to know, today's date is "+isc.DateUtil.format(new Date(),"MMMM dd, yyyy")+".  A "+
        "hilite applies specific styling (such as a text color, background color, "+
        "and/or font-weight) to one or more fields of records that match a filter-query.  The user's "+
        "description of the styling to apply, the fields that should have this styling, and/or the "+
        "filter-query is:",
        "${userMessages}",
        "The data-bound component's DataSource has the following summary:\n"+
        "${dsSummary}\n\n"+
        "Your response should be a JSON object with a single key \"hilites\": an array of the Hilite objects. "+
        "Each Hilite object has the following format:\n"+
        "{\"hiliteDescription\":The user's description for this particular Hilite, as a string,\n"+
        "\"filterDescription\":Just the description of the filter-query, as a string,\n"+
        "\"backgroundColor\":If the user requested a background color, a CSS color or color-name of the requested background color,\n"+
        "\"textColor\":If the user requested a text color, a CSS color or color-name of the requested text color,\n"+
        "\"cssText\":The CSS source code for any other styling requested by the user, if any,\n"+
        "\"fieldName\":If the user requested that the styling is applied to certain fields, an array of the field names.  This property should be omitted if the user did not specify any specific fields to have hilite styling,\n"+
        "\"replacementValue\":If the user requested that certain fields' values be replaced, the replacement value\n"+
        "}\n\n"+
        "Here are examples of CSS properties to use within \"cssText\":\n"+
        "font-weight: bold\n"+
        "font-style: italic\n"+
        "text-decoration-line: one of the following keywords: none, underline, overline, strike-through\n"+
        "text-decoration-color: a CSS color or color-name for the text decoration line\n"+
        "\n"+
        "Valid color-names are: "+
        "white, lightgray, gray, darkgray, black, "+
        "lightred, red, darkred, "+
        "lightpink, pink, darkpink, "+
        "lightpurple, purple, darkpurple, "+
        "lightorange, orange, darkorange, "+
        "lightbrown, brown, darkbrown, "+
        "lightyellow, yellow, darkyellow, "+
        "lightgreen, green, darkgreen, "+
        "lightblue, blue, darkblue, "+
        "turquoise, teal, gold, bronze, beige\n"+
        "\n"+
        "Note: If the user-request did not explicitly specify the hilite styling, assume \"make the text color red\".\n\n"+
        "For example, if the user request was \"Show a light red background on the userName for records where the payment is overdue\", a valid response might be:\n"+
        "{\"hilites\": [{\"fieldName\":\"userName\",\n"+
        "\"backgroundColor\":\"lightred\",\n"+
        "\"filterDescription\":\"payment is overdue\",\n"+
        "\"hiliteDescription\":\"Show a light red background on the userName for records where the payment is overdue\""+
        "}]\n"+
        "}\n\n"+
        "Or, if the user request was \"Hilite every row where assetImprovement is less than 5\", a valid response might be:\n"+
        "{\"hilites\": [{\"textColor\":\"red\",\n"+
        "\"filterDescription\":\"assetImprovement is less than 5\",\n"+
        "\"hiliteDescription\":\"Hilite every row where assetImprovement is less than 5\""+
        "}]\n"+
        "}\n\n"+
        "Or, if the user request was \"highlight population with light green background and red text where population is greater than 3000000 and highlight country with red text where continent is Africa\", a valid response might be:\n"+
        "{\"hilites\": [{\"fieldName\":\"population\",\n"+
        "\"backgroundColor\":\"lightgreen\",\n"+
        "\"textColor\":\"red\",\n"+
        "\"filterDescription\":\"population is greater than 3000000\",\n"+
        "\"hiliteDescription\":\"highlight population with light green background and red text where population is greater than 3000000\"\n"+
        "}, {"+
        "\"fieldName\":\"country\",\n"+
        "\"textColor\":\"red\",\n"+
        "\"filterDescription\":\"continent is Africa\",\n"+
        "\"hiliteDescription\":\"highlight country with red text where continent is Africa\"\n"+
        "}]\n"+
        "}\n\n"
    ];
isc.A._cssColorForColorName={
        "white":"#fff",
        "lightgray":"#ddd",
        "gray":"#aaa",
        "darkgray":"#555",
        "black":"#000",
        "lightred":"#f88",
        "red":"#e00",
        "darkred":"#800",
        "lightpink":"#f9c",
        "pink":"#f69",
        "darkpink":"#f06",
        "lightpurple":"#ccf",
        "purple":"#96f",
        "darkpurple":"#60c",
        "lightorange":"#fc9",
        "orange":"#f71",
        "darkorange":"#f42",
        "lightbrown":"#eb8",
        "brown":"#840",
        "darkbrown":"#320",
        "lightyellow":"#ffa",
        "yellow":"#ff5",
        "darkyellow":"#970",
        "lightgreen":"#cfc",
        "green":"#0f0",
        "darkgreen":"#060",
        "lightblue":"#cff",
        "blue":"#06f",
        "darkblue":"#00c",
        "turquoise":"#3cc",
        "teal":"#088",
        "gold":"#fd0",
        "bronze":"#775",
        "beige":"#db8"
    };
isc.A._cssColorNames=isc.getKeys(isc.ColorUtils.colorNames);
isc.A._buildUIViaAIValidationResultCallbackArgNames="workingResponse,validationContext";
isc.A._buildUIViaAIValidatorArgNames="buildContext,validationContext,callback";
isc.A.uiCodeSuffixPrompts="Your response does not need to contain any explanatory text in addition to the JavaScript to execute. "+
        "Please use a single fenced code block to delineate the JavaScript code. This "+
        "should be a line of three backtick (`) characters followed by the language specifier (javascript) before the "+
        "code block, and three backtick (`) characters after the code block. For example:\n"+
        "```javascript\n"+
        "// JavaScript code to execute here\n"+
        "```";
isc.A.uiCodeValidationPrompts=[
        "This is a request for a fix to a block of JavaScript code to be executed in an Isomorphic SmartClient web application.\n"+
        "The following JavaScript code is intended to generate one or more more UI components to achieve the following goal:\n",
        "${userMessages}",
        "The code is failing validation because some specified property or properties are not valid. "+
        "The code block is as follows\n"+
        "```javascript\n${jsCode}\n```\n"+
        "The validation errors are reported as follows.\n"+
        "```JSON\n${errors}\n```\n"+
        "For each error the \"nodePath\" attribute uses an xpath-like syntax to describe which component and which field has "+
        "a problem. For example a nodePath like\n"+
        "\"root[0||className=ListGrid||ID=grid0]/initialCriteria\"\n"+
        "would indicate a problem with the \"initialCriteria\" attribute specified on the first top-level ListGrid component "+
        "defined in the code, with ID specified as \"grid0\".\n"+
        "Please return a fixed version of the code where any invalid attributes have been replaced with an appropriate "+
        "property based on the Isomorphic SmartClient web framework's documentation."
    ];
isc.A.defaultBuildUIViaAIValidationTypes=["default"];
isc.A.dataBoundUITypeInfos={
        "list":{
            description:"A ListGrid displaying some data from a dataSource. "+
                "This is appropriate for any list of multiple records, including lists "+
                "that are aggregated or grouped by values, sorted, filtered, etc.",
            componentType:"ListGrid",
            codePrompt:
                "Note that for ListGrids, a user may request a simple "+
                "\"grouped\" view. This is different from a true aggregated view and may be achieved via the "+
                "\"groupByField\" property of the grid.\n"+
                "Example listGrids:\n"+
                "Given a dataSource with ID:\"myDS\", and fields "+
                " \"code\" (primary key), \"location\", \"title\", \"description\" and \"price\","+
                "the following code would satisfy a user request to view a list of records where price is less than 100, "+
                "sorted by price in ascending order:\n"+
                "```javascript\n"+
                "isc.ListGrid.create({\n"+
                "        autoFetchData:true,\n"+
                "        dataSource: \"myDS\",\n"+
                "        fields:[\n"+
                "            {name:\"location\"},\n"+
                "            {name:\"title\"},\n"+
                "            {name:\"description\"},\n"+
                "            {name:\"price\"}\n"+
                "        ],\n"+
                "        initialCriteria:{\n"+
                "            fieldName:\"price\",\n"+
                "            operator:\"lessThan\",\n"+
                "            value:100\n"+
                "        },\n"+
                "        initialSort:[\n"+
                "            {\n"+
                "                property:\"price\",\n"+
                "                direction:\"ascending\"\n"+
                "            }\n"+
                "        ]\n"+
                "    });\n"+
                "```\n"+
                "Or, for the same dataSource, the following code would satisfy a user request "+
                "to show the average price for each location. "+
                "Note that because we're inferring the 'price' field to be a currency field, we're applying "+
                "decimalPrecision:2. If the user had requested a specific precision we would respect that instead. :\n"+
                "```javascript\n"+
                "isc.ListGrid.create({\n"+
                "        autoFetchData:true,\n"+
                "        dataSource: \"myDS\",\n"+
                "        fields:[\n"+
                "            {name:\"location\"},\n"+
                "            {name:\"price\", decimalPrecision:2}\n"+
                "        ],\n"+
                "        fetchRequestProperties:{\n"+
                "            groupBy:[\"location\"],\n"+
                "            summaryFunctions:{\n"+
                "                price:\"avg\"\n"+
                "            }\n"+
                "        }\n"+
                "    });\n"+
                "```\n"+
                "\n"+
                "Setting the \"showFilterEditor\" property to true will show an editor that the "+
                "user can use to customize the filter on the data of the ListGrid. If the user requested a "+
                "filterable list, or indicated wanting to change or customize which records are displayed, "+
                "set \"showFilterEditor\" to true."
        },
        "chart":{
            description:"A FacetChart displaying some data from a dataSource. Note that as "+
                "with lists, a chart may display an aggregated or filtered set of values",
            componentType:"FacetChart",
            codePrompt:
                "Note that the FacetChart you generate should have its \"valueProperty\" set to "+
                "the numeric-typed field containing data values for records, "+
                "and facetFields should be used to define facets for the chart.\n"+
                "The \"showDataValuesMode\" property should typically be set to \"auto\", unless this conflicts with the user prompt in some way.\n"+
                "If a clear, simple title for the chart can be derived from the prompt, include the \"title\" attribute.\n"+
                "Examples:\n"+
                "Given a dataSource with ID:\"myDS\", and fields "+
                " \"code\" (primary key), \"location\", \"title\", \"description\" and \"price\","+
                "the following code would satisfy a user request to build a chart showing "+
                "items that cost more than $500 in each location:\n"+
                "```javascript\n"+
                "isc.FacetChart.create({\n"+
                "    ID: \"myChart\",\n"+
                "    dataSource: \"myDS\",\n"+
                "    facets: [\n"+
                "        {\n"+
                "            id: \"location\",\n"+
                "            title: \"Location\"\n"+
                "        },\n"+
                "        {\n"+
                "            id: \"title\",\n"+
                "            title: \"Title\"\n"+
                "        }\n"+
                "    ],\n"+
                "    stacked:false,\n"+
                "    // valueProperty set to numeric field price\n"+
                "    valueProperty: \"price\",\n"+
                "    showDataValuesMode:\"auto\",\n"+
                "    chartType: \"Column\",\n"+
                "    autoFetchData: true,\n"+
                "    initialCriteria:{\n"+
                "        fieldName:\"unitCost\",\n"+
                "        operator:\"greaterThan\",\n"+
                "        value:500\n"+
                "    }\n"+
                "});\n"+
                "```\n"+
                "Or, for the same dataSource, the following code would satisfy a user request "+
                "to chart the total number of items for each location:\n"+
                "```javascript\n"+
                "isc.FacetChart.create({\n"+
                "    title: \"Total Items by Location\",\n"+
                "    dataSource: \"myDS\",\n"+
                "    facets: [\n"+
                "        {\n"+
                "            id: \"location\",\n"+
                "            title: \"Location\"\n"+
                "        }\n"+
                "    ],\n"+
                "    // The fetchRequestProperties block below uses groupBy and summaryFunction\n"+
                "    // to generate a count of \"code\" values per location.\n"+
                "    // Since \"code\" is the primary key for this dataSource it is unique per item,\n"+
                "    // giving us back item count per location.\n"+
                "    valueProperty: \"code\",\n"+
                "    showDataValuesMode:\"auto\",\n"+
                "    autoFetchData: true,\n"+
                "    fetchRequestProperties:{ \n"+
                "        groupBy:[\"location\"],\n"+
                "        summaryFunctions:{\n"+
                "            countryCode:\"count\"\n"+
                "        }\n"+
                "    }\n"+
                "});\n"+
                "```\n"+
                "\n"+
                "Valid values for the \"chartType\" property are:\n"+
                "\"Column\" - (the default if not specified) a bar chart with vertical bars\n"+
                "\"Bar\" - a bar chart with horizontal bars\n"+
                "\"Line\" - a chart where values are displayed side-by-side, connected by lines\n"+
                "\"Radar\" - a chart where values are displayed around a circle, connected by lines\n"+
                "\"Pie\" - a pie chart\n"+
                "\"Doughnut\" - a pie chart with a center hole\n"
        },
        "value":{
            description:"A Label displaying a single value (scalar) derived from the data in a dataSource",
            componentType:"ScalarViewer",
            codePrompt:
                "ScalarViewer is a component based on a SmartClient DynamicForm which uses the attribute \"fieldName\" "+
                "to extract a single field value from a record and the attribute \"title\" as a title for the single field value.\n"+
                "Other standard DynamicForm properties such as \"dataSource\", \"autoFetchData\" and \"initialCriteria\" may be used "+
                "to populate the item with a single record.\n"+
                "Examples:\n"+
                "Given a dataSource with ID:\"myDS\", and fields "+
                " \"code\" (primary key), \"location\", \"title\", \"description\" and \"price\","+
                "the following code would display the \"description\" for the some record where "+
                "\"code\" has the value \"abc123\":\n"+
                "```javascript\n"+
                "isc.ScalarViewer.create({\n"+
                "    autoFetchData:true,\n"+
                "    dataSource: \"myDS\",\n"+
                "    title:\"Description for item abc123\",\n"+
                "    fieldName:\"description\",\n"+
                "    initialCriteria:{\n"+
                "        fieldName:\"code\",\n"+
                "        operator:\"equals\",\n"+
                "        value:\"abc123\"\n"+
                "    }\n"+
                "});\n"+
                "```\n"+
                "Or, for the same dataSource, the following code would satisfy a user request "+
                "to show the average price for items in San Francisco:\n"+
                "```javascript\n"+
                "isc.ScalarViewer.create({\n"+
                "    autoFetchData:true,\n"+
                "    dataSource: \"myDS\",\n"+
                "    title:\"Average price of items in San Francisco\",\n"+
                "    fieldName:\"price\",\n"+
                "    initialCriteria:{\n"+
                "        fieldName:\"location\",\n"+
                "        operator:\"equals\",\n"+
                "        value:\"San Francisco\"\n"+
                "    },\n"+
                "    fetchRequestProperties:{ \n"+
                "        groupBy:[\"location\"], \n"+
                "        summaryFunctions:{\n"+
                "            price:\"avg\"\n"+
                "        }\n"+
                "    }\n"+
                "});\n"+
                "```\n\n"+
                "To control which record is retrieved, it may be necessary to sort by a field, "+
                "by adding a \"sortBy\" property to the ScalarViewer's \"fetchRequestProperties\" "+
                "object. The \"sortBy\" property is the name of the field that the data are sorted "+
                "by, prefixed with a minus sign ('-') if the data should be sorted by the field "+
                "in descending order.\n"+
                "For example, using the same \"myDS\" dataSource, the following code would "+
                "satisfy the request for the \"location with the highest price\":"+
                "```javascript\n"+
                "isc.ScalarViewer.create({\n"+
                "    autoFetchData:true,\n"+
                "    dataSource: \"myDS\",\n"+
                "    title:\"Location with the highest price\",\n"+
                "    fieldName:\"location\",\n"+
                "    fetchRequestProperties:{ \n"+
                "        sortBy: \"-price\"\n"+
                "    }\n"+
                "});\n"+
                "```\n"+
                "In this example, the first row, when sorted by the price in descending order, "+
                "is for the location with the highest price in the dataSource."
        }
    };
isc.A.dataBoundUIInitiatorPrefixPrompts=[
        "A user is interacting with an Isomorphic SmartClient web application. "+
        "They have requested a new user-interface component to display data from a dataSource "+
        "in some way. The user request is as follows:",
        "${userMessages}"
    ];
isc.A.dataBoundUIInitiatorPrompt_UIOptions="The user may request one of the following types of user interface components:\n"+
            "${uiTypeDescriptions}\n";
isc.A.dataBoundUIInitiatorPrompt_DSOptions="The following dataSources are available for this component:\n"+
            "${dsDescriptions}\n";
isc.A.dataBoundUIInitiator_UIResponseFormat="Please respond with a JSON object containing the following attribute(s):\n"+
            "\"component\": The component type name that best matches the user's request, or \"invalid\" if "+
            "you are unable to determine what kind of data view the user is asking for. This should be one of the following values:\n"+
            "${uiTypes}\n";
isc.A.dataBoundUIInitiator_DSResponseFormat="\"dataSource\": The ID of the dataSource that best matches the user's request, or \"invalid\" if "+
            "you are unable to determine which dataSource the user is attempting to view data from. This should be one of the following values:\n"+
            "${dsIDs}\n";
isc.A.dataBoundUIInitiatorSuffix="Your response should contain the JSON block and no other text.\n"+
            "An example of a valid response might be:\n${responseExample}";
isc.A.generalDataBoundUICodeNotes="Notes:\n"+
        "- The \"dataSource\" attribute of the component should be set to the ID of the dataSource.\n"+
        "- In order to fetch data to display, \"autoFetchData\" should be set to true.\n"+
        "- If criteria should be applied to the fetch, the \"initialCriteria\" attribute should be "+
            "specified as a SmartClient AdvancedCriteria object.\n"+
        "- If some form of data aggregation or summarization is required---for example a list of each unique value "+
            "for some field along with a count of records, or sum of some other numeric field value within that "+
            "group---this can be achieved by customizing the DSRequest that is used to fetch data for the component. "+
            "The \"fetchRequestProperties\" attribute for the component can be used to set appropriate "+
            "\"groupBy\" and \"summaryFunctions\" attributes for the data fetch.\n";
isc.A.dataBoundUICodePrefixPrompts=[
        "A user is interacting with an Isomorphic SmartClient web application. "+
        "They have requested a new ${componentType} component to display data from a dataSource "+
        "in some way. The user request is as follows:",
        "${userMessages}",
        "The DataSource has the following summary:\n"+
        "${dsSummary}\n"+
        "Please generate JavaScript code to create a SmartClient ${componentType} bound to this "+
        "dataSource that meets the user's request.\n"+
        "${this.generalDataBoundUICodeNotes}"+
        "${componentCodePrompt}.\n\n"
    ];
isc.A._$asyncBuildDataBoundUI="asyncBuildDataBoundUI";
isc.A.fencedCodeRegex=new RegExp("^```(?:javascript)?\\s*\\n((.|\n)*)\\n```","im");
isc.A.autoLoadDataSource=true;
isc.A.dataSourceName="serverAIDataSource";
isc.A.dataSources={};
isc.A._loadingDS={};
isc.A._loadDSFailed={};
isc.A.spoofedResponseDelay=2000;
isc.A.responseSpoofingMode="hybrid";
isc.A._spoofedResponseRegistry=[];
isc.A.initiatorPromptTemplate="This is an Isomorphic SmartClient AI Assistant Request (version 1.0).\n"+
            "*** Overview ***\n"+
            "For an Isomorphic SmartClient AI Assistant Request, you are to act as an intelligent agent assisting a user in an Isomorphic SmartClient application.\n"+
            "Details of the application and the user request text will be provided at the end after this overview.\n"+
            "You should respond to this request with a response in the following structured format. "+
            "Note that text in square brackets is descriptive. Any other text should be included verbatim:\n\n"+
            "ResponseType: [a response type, as explained below]\n"+
            "Message: [a message to be shown to the user, either explaining what you have done or asking for clarifications]\n"+
            "MessageType: [a message type, as explained below]\n"+
            "======\n"+
            "[JavaScript code to perform a requested action when executed in the context of the SmartClient application. Note that the JavaScript should contained between a delineator of 6 equal signs, as shown here. Certain response types (described below) do not require any JavaScript code - in these cases the response may omit this entire block including both sets of equal signs.]\n"+
            "======\n\n"+
            "** Response Types **\n"+
            "There are six possible response types, described in the following section. \n"+
            "Note that these are not listed in order of preference - you should choose the appropriate response type based on the prompt you received.\n"+
            "Immediately after the numeral is the text value you should use for the \"ResponseType\" when responding. Do not include the numeral.\n\n"+
            "1. Execute JavaScript\n"+
            "Produce JavaScript code to do what the user wants, along with an explanation of what you have done, to be shown to the user.\n"+
            "This ResponseType is appropriate only to perform the same set of actions that a normal user can perform via the running SmartClient application's user interface, and any changes applied to the UI should be reversable by the user, using the UI.\n"+
            "This is typically limited to interacting with existing components on the page.\n"+
            "The JavaScript you generate should be valid JavaScript and may make use of the Isomorphic SmartClient JavaScript framework APIs.\n"+
            "* Important Note *\n"+
            "Details of the currently visible UI of the application are below in the section titled \"SmartClient application and environment information\""+
            "Components listed in this summary may be accessed may be accessed directly by their \"ID\" property, or by passing this property into \"isc.Canvas.getById();\".\n"+
            "Other documented SmartClient APIs may also be used.\n"+
            "If your code either causes a JavaScript error or times out, this will be reported to you.\n"+
            "The Message should be some text to display to the user, explaining what was done.\n"+
            "The MessageType may be set to either \"Notify\" or \"Modal Message\". MessageType \"Notify\" will show the message as a notification that auto-hides. MessageType \"Modal Message\" will show the message in a modal dialog that the user must explicitly dismiss before proceeding.\n"+
            "Some examples of requested actions that would require an \"Execute JavaScript\" type response include:\n"+
            "- Applying sorting to an existing listGrid via \"listGrid.sort();\" or \"listGrid.setSort();\"\n"+
            "- Changing the filter criteria applied to an existing listGrid via \"listGrid.setFilterEditorCriteria();\" or \"listGridID.filterData();\"\n"+
            "- Switching to a different tab in a TabSet via \"tabSet.selectTab();\"\n"+
            "If the user prompt requires a new UI be created, do not use the \"Execute JavaScript\" response type - use \"Ad Hoc UI\" instead.\n\n"+
            "2. Ad Hoc UI\n"+
            "Your generated JavaScript code creates an \"ad hoc\" UI to do whatever the user needs to do.  \n"+
            "In this case, the JavaScript code you specify should create SmartClient user interface components. The code will be captured in the same way that SmartClient captures \"screens\" (as in the RPCManager.loadScreen() API) and SmartClient will automatically display the result in a Window component. \n"+
            "Your code does not need to include this Window component - just create the appropriate UI and it will be displayed to the user as appropriate.\n"+
            "When the Window is closed, the ad-hoc UI created by your code will be destroyed (as in Canvas.destroy()).\n"+
            "As with \"Execute JavaScript\":\n"+
            "The code you generate should be valid JavaScript and may make use of the Isomorphic SmartClient JavaScript framework APIs.\n"+
            "The Message should be some text to display to the user, explaining what was done.\n"+
            "The MessageType may be set to either \"Notify\" or \"Modal Message\".\n"+
            "The \"Ad Hoc UI\" response type is appropriate for situations where the underlying DataSources provide the ability to achieve the end user's goals, but the UI does not provide an easy way to do what the user wants.  \n"+
            "Some examples of requested actions that would require an \"Ad Hoc UI\" type response include:\n"+
            "- Creating an aggregated view of dataSource data when none is available in the default UI. This could be achieved by creating a new ListGrid bound to the appropriate dataSource, and setting \"groupBy\" and  \"summaryFunctions\" on the \"dsRequest\" object passed to listGrid.filterData().\n"+
            "- Displaying data from a dataSource in a chart by creating a new FacetChart bound to the dataSource, using the \"valuePrompt\" and \"facetFields\" to specify which attributes to chart, and calling fetchData() or filterData() to populate it.\n"+
            "In your other kinds of responses, if it's possible to create an ad-hoc UI to do what the user needs, be sure to mention that to the user.  And, if the user specifically requests an ad-hoc UI, take that as a suggestion to use this approach (unless another approach, such as \"Inspect\", is appropriate first).\n\n"+
            "3. Clarify\n"+
            "Ask the user for clarifying information.\n"+
            "For this type of response, the \"Message\" you specify can be used to ask the user a question. "+
            "You should not show this message to the user - the application will show it in a modal dialog where the user may type in a response. The user's response will be sent back to you, allowing you to take further action.\n"+
            "Any \"MessageType\" you specify will be ignored for \"Clarify\" type responses.\n"+
            "\"Clarify\" type responses do not need to include any JavaScript, but if you do include JavaScript it will be executed in the scope of the application. This allows you to programatically gather information about the current application by using the \"isc.AI.commandComplete()\" method.\n"+
            "If you want to make use of this capability, consider the following points when generating your JavaScript code.\n"+
            "- Your code should always include a call to the method \"isc.AI.commandComplete();\". This method takes a single argument, which can be any JavaScript object or primitive, and we will send this back to you (in addition to the user's response to your question). For example you could determine the current set of (visible) field names in a listGrid by calling \"isc.AI.commandComplete(listGrid.getFieldNames())\".\n"+
            "- Your code can make use of asynchronous APIs; when your inspection code is complete, it should call the API isc.AI.commandComplete() method, passing any object that can be serialized to JSON. For an asynchronous action, this would typically be done in a callback function.\n"+
            "For example - if you wanted to find the total number of records in a DataSource, you could invoke\n"+
            "  dataSource.fetchData(\n"+
            "    // criteria - unrestricted fetch\n"+
            "    null,\n"+
            "    // callback function\n"+
            "    function (dsResponse, data, dsRequest) {\n"+
            "        isc.AI.commandComplete(dsResponse.totalRows);\n"+
            "    },\n"+
            "    // dsRequest configuration - use startRow and endRow to avoid returning actual records\n"+
            "    { startRow:0, endRow:0 }\n"+
            "  );\n"+
            "If you want to return information gathered from multiple APIs, you can combine all necessary information into a single JSON object which your code passes to isc.AI.commandComplete().\n\n"+
            "4. Inspect\n"+
            "Generate JavaScript to gather information\n"+
            "Similar to the \"Clarify\" ResponseType explained above, you can generate JavaScript to gather information about the application environment, and have it sent back to you by calling \"isc.AI.commandComplete()\".\n"+
            "Unlike \"Clarify\" responses, \"Inspect\" responses do not prompt the user for information.\n"+
            "If you do include a \"Message\", it will be displayed to the user as either a \"Notification\" or \"Modal Message\" depending on the \"MessageType\" you specified.\n"+
            "If necessary you may generate repeated \"Inspect\" type responses to gather multiple pieces of information about the application before finally deciding upon an interactive response to the user, via one of the other ResponseTypes.\n\n"+
            "5. Send A Message\n"+
            "The \"Send A Message\" response type will cause the specified \"Message\" to be displayed to the user and take no other action.\n"+
            "This response type should not include any JavaScript to execute.\n"+
            "This is useful for cases where you simply want to display a message to the user.\n\n"+
            "6. Explain Why Not\n"+
            "Explain to the user that what they want cannot be done, and why.  \n"+
            "If possible, provide suggestions for how they might achieve their goals instead, including by contacting other people with administrative access to data.\n"+
            "The explanation you provide as the \"Message\" for this response type will appear in a modal SmartClient Window, with a text field below offering the user the ability to provide a revised or clarified command, or the ability to cancel the overall AI interaction.\n"+
            "This response type should not include any JavaScript to execute.\n"+
            "You should not show this message to the user - the application will show it, according to the MessageType you provide.\n\n"+
            "** Example **\n"+
            "An example of a validly formatted response is below.\n"+
            "This response might be appropriate for the following user prompt:\n"+
            "  \"Show the filterEditor on my listGrid and filter it to only show items that are less than $100 and customer's name contains 'Schwabb'\"\n"+
            "In this case we're assuming the application has a listGrid with the ID \"myListGrid\" with fields \"unitCost\" and \"customer\".\n"+
            "Example response:\n\n"+
            "ResponseType: Execute JavaScript\n"+
            "Message: The filter editor for your listGrid has been displayed and the listGrid has been filtered to show only items with unitCost less than $100, where the customer name contains the string \"Schwabb\".\n"+
            "MessageType: Notify\n"+
            "======\n"+
            "myListGrid.setProperties({showFilterEditor:true});\n"+
            "myListGrid.filterData({\n"+
            "    _constructor:\"AdvancedCriteria\",\n"+
            "    operator:\"and\",\n"+
            "    criteria:[\n"+
            "        {fieldName:\"unitCost\", operator:\"lessThan\", value:100},\n"+
            "        {fieldName:\"customer\", operator:\"iContains\", value:\"Schwabb\"},\n"+
            "    ]\n"+
            "});\n"+
            "======\n\n"+
            "Details about the running application, and the user request are below.\n"+
            "*** End of overview ***\n";
isc.A.suggestRecordSummaryTitlePrompts=[
        "This is a request for a suggested title for a new field of a DataSource. This new field "+
        "will contain the following information for each record:",
        "${ssMessages}",
        "The DataSource has the following summary: ${dsSummary}"
    ];
isc.A.suggestRecordSummaryTitlePrompts_visibleFields="The suggested title should be short (at most 40 characters), succinctly describe the "+
        "information that will be contained in the new field, and be similar in style to "+
        "the titles in the following map from existing field names to their titles:\n";
isc.A.suggestRecordSummaryTitlePrompts_noVisibleFields="The suggested title should be short (at most 40 characters) and succinctly describe the "+
        "information that will be contained in the new field. Each word of the suggested title should "+
        "be capitalized.";
isc.A.suggestRecordSummaryTitlePrompts_final="Your response should be a single JSON object with one "+
        "key \"suggestedTitle\" and value being a string containing the suggested title for the "+
        "new field.";
isc.A._$asyncBuildAIFieldRequest="asyncBuildAIFieldRequest";
isc.A.buildAIFieldRequestPrompts=[
        "This is a request to gather information about a request to supplement the data in "+
        "records from a DataSource. The supplemental information requested for each record is:",
        "${ssMessages}",
        "Note: In this request, ignore directions to \"sort by\", \"order by\", or similar "+
        "directions that do not describe the supplemental information to generate.\n\n"+
        "Records are from the DataSource with the following description: ${dsSummary}\n\n"+
        "You must decide what class of supplemental data (\"valueClass\") is requested for each record. "+
        "The options are:\n"+
        "- \"general\" Any kind of data. Usually this is textual, but not necessarily always so. "+
        "An example would be a \"2-4 sentence summary\"."+
        "- \"categorical\" A fixed list of categories or nominal values. An example would be the type "+
        "of customer issue (e.g. \"Technical Issue\", \"Billing Issue\", \"General Inquiry\")\n"+
        "- \"ordinal\" An extension of \"categorical\" where the categories are also strictly ordered from lowest/least to highest/most. "+
        "An example would be customer satisfaction (e.g. \"Dissatisfied\", \"Neutral\", \"Satisfied\", \"Very Satisfied\")\n"+
        "- \"interval\" Strictly numerical data. An example would be temperature in degrees Celsius.\n"+
        "- \"ratio\" An extension of \"interval\" where 0 means the absence of something, and "+
        "ratios between values are meaningful. An example would be weight in pounds, because 0 means no weight and 200 pounds is twice as heavy as 100 pounds.\n\n"+
        "Your response must be a JSON object with the following properties:\n"+
        "{\"valueClass\": The \"valueClass\" for the requested supplemental data, either \"general\", \"categorical\", \"ordinal\", \"interval\", or \"ratio\",\n"+
        "\"dataDependentReason\": Only if the \"valueClass\" is \"categorical\" or \"ordinal\", it is absolutely not possible to make any reasonable choices for the categories without examining all of the records in the DataSource, and the data of the records reasonably appears to contain the categories, a string containing an explanation of why the list of categories absolutely depends on the records in the DataSource.\n"+
        "\"categories\": Only if the \"valueClass\" is \"categorical\" or \"ordinal\" and reasonable choices can be made about the categories (i.e. not data-dependent), a JSON array of the category label strings. "+
        "If the \"valueClass\" is \"ordinal\", this array must be sorted in the order of the categories from lowest/least to highest/most.\n"+
        "\"categoryHints\": Only if the \"valueClass\" is \"categorical\" or \"ordinal\", a JSON object that maps each category label string to a hint for when to use the category rather than the other categories.\n"+
        "\"minValue\": Only if the \"valueClass\" is \"interval\" or \"ratio\" and the request specifies or reasonably implies a minimum value, the minimum value as a number.\n"+
        "\"maxValue\": Only if the \"valueClass\" is \"interval\" or \"ratio\" and the request specifies or reasonably implies a maximum value, the maximum value as a number.\n"+
        "\"relevantFieldNames\": An array of the names of only the fields from DataSource '${dsName}' that appear to be relevant to generating the supplemental information. You must be able to generate the requested supplemental information for each record using only the values in these fields.\n"+
        "}"
    ];
isc.A.invalidSummaryValue="-";
isc.A._summarizeRecordsPartialResultCallbackArgNames="partialResult,context";
isc.A.summarizeRecordsPrompts_general=[
        "This is a request to supplement the data in records from a DataSource, using "+
        "relevant general knowledge and your own reasonable inferences from the data. "+
        "The supplemental information requested for each record is:",
        "${ssMessages}",
        "The records specified below are from the DataSource with the following description: ${dsSummary}\n\n"+
        "Your response should be a single JSON object with one key \"result\" and value being "+
        "an array of just the strings of supplemental information for each corresponding record. "+
        "Here are the records:"
    ];
isc.A.summarizeRecordsPrompts_categorical=[
        "This is a request to select one of the categories for records from a DataSource, using "+
        "relevant general knowledge and your own reasonable inferences from the data. "+
        "The category to select for each record is:",
        "${ssMessages}",
        "The available categories are: ${categories}\n"+
        "Hints for when to use each category are: ${categoryHints}\n"+
        "The records specified below are from the DataSource with the following description: ${dsSummary}\n\n"+
        "Your response should be a single JSON object with one key \"result\" and value being "+
        "an array of just the strings of selected categories for each corresponding record. "+
        "Here are the records:"
    ];
isc.A.summarizeRecordsPrompts_interval=[
        "This is a request to calculate a number for records from a DataSource, using "+
        "relevant general knowledge and your own reasonable inferences from the data. "+
        "The number to be calculated for each record is:",
        "${ssMessages}"
    ];
isc.A.summarizeRecordsPrompts_interval_minValue="The minimum value is ${minValue}. ";
isc.A.summarizeRecordsPrompts_interval_maxValue="The maximum value is ${maxValue}. ";
isc.A.summarizeRecordsPrompts_interval_final="The records specified below are from the DataSource with the following description: ${dsSummary}\n\n"+
        "Your response should be a single JSON object with one key \"result\" and value being "+
        "an array of just the calculated numbers for each corresponding record. "+
        "Here are the records:";
isc.A.canTranslateViaAI=true;
isc.A.componentActions={
        filter:{
            methodName:"buildFilter",
            description:"Apply filter criteria to the component"
        },
        hilite:{
            methodName:"buildHilite",
            description:"Apply hiliting to the component"
        },
        sort:{
            methodName:"buildSort",
            description:"Apply a sort to the component"
        },
        groupBy:{
            methodName:"buildGroupBy",
            description:"Group the components data by some field(s) or ungroup the component"
        },
        setFields:{
            methodName:"buildSetFields",
            description:"Change the visible set of fields for the component"
        }
    };
isc.A.multiActionAIWindowDefaults={
        _constructor:"Window",
        width:500,height:300,
        autoCenter:true,
        showHeaderIcon:true,
        headerIconProperties:{src:"AIAnswerEngine:size:22,22;"},
        showMinimizeButton:false,
        title:"Waiting for AI...",
        gridDefaults:{
            _constructor:"ListGrid",
            width:"100%",height:"100%",
            fixedRecordHeights:false,
            emptyMessage:"Determining tasks...   ",
            wrapCells:true,
            border:"none",
            canEdit:false,
            canShowFilterEditor:false,
            fields:[
                {name:"type",title:"Task",width:100},
                {name:"description",title:"Description",width:"*"},
                {name:"status",width:30,title:"",type:"image",align:"center"}
            ],
            initWidget:function(){
                var src=isc.Canvas.imgHTML(this.creator.workingIconSrc);
                this.emptyMessage+=src;
                this.fields[2].valueMap=[
                    this.creator.workingIconSrc,this.creator.successIconSrc,this.creator.failureIconSrc
                ];
                var result=this.Super("initWidget",arguments);
                return result;
            }
        },
        successIconSrc:"Accept",
        failureIconSrc:"Cancel",
        workingIconSrc:"Configure:cssClass:spinElement;",
        initWidget:function(){
            var result=this.Super("initWidget",arguments);
            this.grid=this.createAutoChild("grid");
            this.addItems([this.grid]);
        },
        setFirstAction:function(actionType,description){
            if(!actionType)this.grid.setData([]);
            else this.grid.setData([{type:actionType,description:description,status:this.workingIconSrc}]);
            this.grid.redraw();
        },
        addActions:function(actions){
            for(var key in actions){
                this.grid.addData({type:key,description:actions[key],status:this.workingIconSrc});
            }
            this.grid.redraw();
        },
        updateAction:function(actionType,status){
            for(var i=0;i<this.grid.data.length;i++){
                var record=this.grid.data[i];
                if(record.type==actionType){
                    record.status=status?this.successIconSrc:this.failureIconSrc;
                    this.grid.redraw();
                    return;
                }
            }
        }
    };
isc.B.push(isc.A.init=function isc_c_AI_init(){
        this.Super("init",arguments);
        this.startAssistant(this.assistantKey);
        this._extendColorMap();
        this._makeLikelyCSSColorRegExp();
    }
);
isc.evalBoundary;isc.B.push(isc.A._encodeJSON=function isc_c_AI__encodeJSON(content){
        return isc.JSON.encode(content,{prettyPrint:false});
    }
,isc.A.doPageRecordsPicking=function isc_c_AI_doPageRecordsPicking(fixedPrompt,records,callback,settings){
        var aiMessages=[{source:"user",content:fixedPrompt}],
            context=this._getContextForAIMessages(aiMessages);
        return context.aiEngine.doPageRecordsPicking(aiMessages,records,callback,settings)
    }
,isc.A._getContextForRequest=function isc_c_AI__getContextForRequest(aiRequest){
        if(this.disabled)return{errorMessage:this.aiWasDisabledMessage};
        var defaultAIEngine=this.getEngine();
        if(!defaultAIEngine)return{errorMessage:this.defaultAIEngineNotRegisteredErrorMessage.evalDynamicString(this,this)};
        this._assert(this.isEnabled());
        var aiEngine,
            couldSupportRequest=defaultAIEngine.couldSupportRequest(aiRequest),
            isVisionRequest=isc.AIEngine.containsImageMessage(aiRequest.messages);
        if(couldSupportRequest){
            aiEngine=defaultAIEngine;
        }else{
            var aiEngines=isc.getValues(this.engines),
                i=aiEngines.findIndex(defaultAIEngine);
            this._assert(i>=0);
            if(i>0){
                aiEngines.removeAt(i);
                aiEngines.addAt(defaultAIEngine,0);
            }
            for(i=0;i<aiEngines.length;++i){
                if(i>0&&aiEngines[i].couldSupportRequest(aiRequest)){
                    aiEngine=aiEngines[i];
                    couldSupportRequest=true;
                    break;
                }
                if(!aiEngine&&isVisionRequest&&aiEngines[i].canSupportVisionRequests()){
                    aiEngine=aiEngines[i];
                }
            }
        }
        if(!aiEngine){
            return{errorMessage:isVisionRequest
                                  ?this.noAIEngineSupportingVisionRequestsIsRegisteredErrorMessage
                                  :"No suitable AIEngine was found."};
        }
        if(!couldSupportRequest){
            this.logWarn("Will use AIEngine "+aiEngine.engineId+", but it claims not to support the request","AI");
        }
        return{
            cancellationController:aiRequest.cancellationController,
            aiEngine:aiEngine,
            couldSupportRequest:couldSupportRequest,
            isVisionRequest:isVisionRequest
        };
    }
,isc.A._getContextForAIMessages=function isc_c_AI__getContextForAIMessages(aiMessages){
        var fakeAIRequest={messages:aiMessages};
        return this._getContextForRequest(fakeAIRequest);
    }
,isc.A.shouldUseAIFieldPaging=function isc_c_AI_shouldUseAIFieldPaging(prompt,fields,aiConfig){
        var fakeAIRequest={
            messages:[{source:"user",content:prompt}]
        };
        var context=this._getContextForRequest(fakeAIRequest);
        return context.aiEngine.shouldUseAIFieldPaging(fakeAIRequest,fields,aiConfig);
    }
,isc.A.retrieveFieldsForPrompt=function isc_c_AI_retrieveFieldsForPrompt(userPrompt,actionDescription,fields,callback,context,aiConfig){
        var aiMessages=[{content:userPrompt}];
        context=this._getContextForAIMessages(aiMessages);
        return context.aiEngine.retrieveFieldsForPrompt(aiMessages,actionDescription,fields,callback,context,aiConfig);
    }
,isc.A.getSerializedFields=function isc_c_AI_getSerializedFields(fields,config){
        if(config==null)config={};
        var recordPickingSettings={
            engineId:config.engineId,
            fieldNames:config.salientFieldAttributes||isc.AI.salientFieldAttributes,
            recordIndexFieldName:"",
            serializationFormat:config.serializationFormat
        };
        return this.serializeRecords(fields,recordPickingSettings);
    }
,isc.A.getShortDSDescription=function isc_c_AI_getShortDSDescription(dataSource){
        var dataSourceProps={
            ID:dataSource.ID
        };
        if(dataSource.title!=null){
            dataSourceProps.title=dataSource.title;
        }
        if(dataSource.pluralTitle!=null){
            dataSourceProps.pluralTitle=dataSource.pluralTitle;
        }
        if(dataSource.description!=null){
            dataSourceProps.description=dataSource.description;
        }
        if(dataSource.titleField!=null){
            dataSourceProps.titleField=dataSource.titleField;
        }
        var primaryKeys=dataSource.getPrimaryKeyFieldNames();
        if(primaryKeys!=null&&primaryKeys.length>0){
            if(primaryKeys.length==1)primaryKeys=primaryKeys[0];
            dataSourceProps.primaryKey=primaryKeys;
        }
        return this.echoFull(dataSourceProps);
    }
,isc.A.summarizeDataSource=function isc_c_AI_summarizeDataSource(ds,extraFields,config,includeSalientFields){
        var dsSummary=this.getShortDSDescription(ds),
            haveExtraFields=isc.isAn.Array(extraFields)&&!extraFields.isEmpty(),
            finalFields=haveExtraFields&&includeSalientFields!=false?ds.getSalientFields():[];
        if(haveExtraFields){
            for(var i=0;i<extraFields.length;++i){
                var extraField=extraFields[i];
                if(isc.isA.String(extraField))extraField=ds.getField(extraField);
                if(extraField==null)continue;
                if(finalFields.find("name",extraField.name)==null){
                    finalFields.add(extraField);
                }
            }
        }
        dsSummary+=("\nThis dataSource has the following fields that are relevant to the query:\n"+
                      this.getSerializedFields(finalFields,config));
        return dsSummary;
    }
,isc.A.serializeRecords=function isc_c_AI_serializeRecords(records,settings){
        if(settings==null)settings={};
        if(records==null)records=[];
        var format=settings.serializationFormat||this.serializationFormat;
        if(format=="csv"&&settings.fieldNames==null&&records.length>0){
            settings.fieldNames=isc.getKeys(records[0]);
        }
        var serializedRecords=[];
        for(var i=0;i<records.length;i++){
            serializedRecords.add(this.serializeIndexedRecord(records[i],i,settings));
        }
        return this.getFormatDescription(settings)+this._joinSerializedRecords(serializedRecords,settings);
    }
,isc.A._joinSerializedRecords=function isc_c_AI__joinSerializedRecords(serializedRecords,settings){
        var format=settings.serializationFormat||this.serializationFormat;
        var isJSON=format!="csv";
        var isCompactJSON=format=="compactJSON";
        var recordSeparator=(isCompactJSON?",":(isJSON?",\n":"\n"));
        var combinedRecords=
            (isCompactJSON?"[":(isJSON?"[\n":""))+
            serializedRecords.join(recordSeparator)+
            (isCompactJSON?"]":(isJSON?"\n]":""));
        return combinedRecords;
    }
);
isc.evalBoundary;isc.B.push(isc.A.getFormatDescription=function isc_c_AI_getFormatDescription(settings){
        if(settings==null)settings={};
        var format=settings.serializationFormat||this.serializationFormat;
        var isJSON=format!="csv";
        var isCompactJSON=format=="compactJSON";
        var fieldNames=(settings.fieldNames&&settings.fieldNames.duplicate())||[];
        fieldNames.unshift(settings.recordIndexFieldName||this.defaultRecordIndexFieldName);
        var fieldsString=fieldNames.join(",");
        var description=!isJSON?this.csvFormatDescription:this.jsonFormatDescription;
        description=description.evalDynamicString(this,{fieldNames:fieldsString,separator:this.separatorCharacter});
        return description;
    }
,isc.A.serializeIndexedRecord=function isc_c_AI_serializeIndexedRecord(record,recordIndex,settings){
        if(record==null)return"";
        if(settings==null)settings={};
        var format=settings.serializationFormat||this.serializationFormat;
        var isJSON=format!="csv";
        var isCompactJSON=format=="compactJSON";
        var fieldNames=settings.fieldNames;
        if(!isJSON&&fieldNames==null){
            fieldNames=isc.getKeys(record);
            this.logWarn(
                "serializeIndexedRecord is serializing in a format where attribute names are not included in the output."+
                "Attributes will be output in the following order:"+fieldNames.join(",")
            );
        }
        var recordIndexFieldName=(settings.recordIndexFieldName!=null?settings.recordIndexFieldName:this.defaultRecordIndexFieldName);
        var includeRecordIndexField=(recordIndexFieldName!="");
        var serializedRecord="";
        if(format=="csv"){
            if(includeRecordIndexField)serializedRecord+=this._csvSerializeAttribute(String(recordIndex),settings);
            for(var ii=0;ii<fieldNames.length;ii++){
                serializedRecord+=((includeRecordIndexField||ii>0?this.separatorCharacter:"")+
                                     this._csvSerializeAttribute(record[fieldNames[ii]],settings));
            }
        }else{
            if(fieldNames!=null){
                record=isc.applyMask(record,fieldNames);
            }
            if(includeRecordIndexField){
                var newRecord={};
                newRecord[recordIndexFieldName]=recordIndex;
                record=isc.addProperties(newRecord,record);
            }
            serializedRecord=isc.JSON.encode(record,{prettyPrint:!isCompactJSON});
        }
        return serializedRecord;
    }
,isc.A._csvSerializeAttribute=function isc_c_AI__csvSerializeAttribute(value,settings){
        if(value==null)return"";
        return isc.isA.String(value)?value.asSource():value+"";
    }
,isc.A.isEnabled=function isc_c_AI_isEnabled(){
        return this.disabled!=true&&
               (this.defaultEngineId in this.engines||
                this.engineConfigs.find("engineId",this.defaultEngineId)!=null);
    }
,isc.A.registerEngine=function isc_c_AI_registerEngine(engine){
        if(engine.engineId in this.engines)return false;
        this.engines[engine.engineId]=engine;
        return true;
    }
,isc.A.unregisterEngine=function isc_c_AI_unregisterEngine(engineId){
        if(!(engineId in this.engines))return false;
        return delete this.engines[engineId];
    }
,isc.A.getEngine=function isc_c_AI_getEngine(engineId,config){
        engineId=engineId||isc.AI.defaultEngineId;
        var engine=this.engines[engineId];
        if(engine==null){
            var engineConfig=this.engineConfigs.find("engineId",engineId);
            if(engineConfig==null)return null;
            var props=isc.addProperties({engineId:engineId,name:engineId},engineConfig,config);
            var ctor=engineConfig._constructor||"AIEngine";
            engine=isc[ctor].create(props);
            this.engines[engineId]=engine;
        }
        return engine;
    }
,isc.A.allowAssistant=function isc_c_AI_allowAssistant(){
        return true;
    }
,isc.A.startAssistant=function isc_c_AI_startAssistant(key){
        if(isc.AI.aiReady)return;
        if(!isc.AI.allowAssistant()){
            isc.logWarn("No AI engine API key found found.  Can't install AI.","AI");
            return;
        }
        if(key)isc.AI.assistantKey=key;
        key=isc.AI.assistantKey;
        var existingReg=isc.Page.getRegisteredKeyActions(key);
        if(existingReg&&existingReg.length>0){
            isc.logWarn("Specified AI shortcut-key ("+JSON.stringify(key)+") is already in use by another "+
                "handler. To enable the AI assistant shortcut, call isc.AI.startAssistant() with an unused key-name.","AI");
            return;
        }
        isc.Page.registerKey(key,function(key,target){
            target.showAssistant();
            return false;
        },isc.AI);
        isc.AI.aiReady=true;
    }
,isc.A.stopAssistant=function isc_c_AI_stopAssistant(){
        if(!isc.AI.aiReady){
            isc.AI.logWarn("Cannot stop the AI Assistant - it isn't running.");
            return;
        }
        isc.Page.unregisterKey(isc.AI.assistantKey,isc.AI);
        isc.AI.aiReady=false;
    }
,isc.A._asyncAIOperation=function isc_c_AI__asyncAIOperation(asyncMethodName,params){
        if(!this.isEnabled()){
            return isc.rejectAsDisabled(this.aiWasDisabledMessage);
        }
        var asyncMethodArgs=Array.prototype.slice.call(arguments,1);
        return isc.AsyncUtil.asyncOperation(params,function(opContext){
            asyncMethodArgs.push(opContext);
            return isc.AI[asyncMethodName].apply(isc.AI,asyncMethodArgs);
        });
    }
,isc.A._asyncDataBoundAIOperation=function isc_c_AI__asyncDataBoundAIOperation(asyncMethodName,request){
        if(!this.isEnabled()){
            return isc.rejectAsDisabled(this.aiWasDisabledMessage);
        }
        var asyncMethodArgs=Array.prototype.slice.call(arguments,1);
        return isc.AsyncUtil.asyncDataBoundOperation(request,function(dabOpContext){
            var allFields;
            if(dabOpContext.component){
                allFields=dabOpContext.component.getAllFields()||[];
            }else if(dabOpContext.dataSource){
                allFields=isc.getValues(dabOpContext.dataSource.getFields());
            }
            var relevantFieldNames=request.relevantFieldNames;
            if(allFields){
                var availableFieldsIndex=allFields.makeIndex("name"),
                    allFieldNames=isc.getKeys(availableFieldsIndex),
                    excludeFieldNames=request.excludeFieldNames;
                if(relevantFieldNames){
                    for(var i=0;i<relevantFieldNames.length;++i){
                        var relevantFieldName=relevantFieldNames[i];
                        if(!relevantFieldName||relevantFieldName.contains('.'))continue;
                        if(!allFieldNames.contains(relevantFieldName)&&
                            !relevantFieldNames.contains(relevantFieldName,i+1))
                        {
                            isc.AI.logWarn("'"+relevantFieldName+"' is listed in `relevantFieldNames`, but there is no such field.","AI");
                        }
                    }
                    availableFieldsIndex=isc.applyMask(availableFieldsIndex,relevantFieldNames);
                }
                if(excludeFieldNames){
                    for(var i=0;i<excludeFieldNames.length;++i){
                        var excludeFieldName=excludeFieldNames[i];
                        if(!excludeFieldName||excludeFieldName.contains('.'))continue;
                        if(!allFieldNames.contains(excludeFieldName)&&
                            !excludeFieldNames.contains(excludeFieldName,i+1))
                        {
                            isc.AI.logWarn("'"+excludeFieldName+"' is listed in `excludeFieldNames`, but there is no such field.","AI");
                        }
                        delete availableFieldsIndex[excludeFieldName];
                    }
                }
                dabOpContext.availableFields=isc.getValues(availableFieldsIndex);
                dabOpContext.availableFieldNames=dabOpContext.availableFields.getProperty("name");
                dabOpContext.availableFieldsIndex=availableFieldsIndex;
            }else if(relevantFieldNames){
                isc.AI.logWarn("Relevant field names were specified, but there are no fields. Ignoring...","AI");
            }
            asyncMethodArgs.push(dabOpContext);
            return isc.AI[asyncMethodName].apply(isc.AI,asyncMethodArgs);
        });
    }
,isc.A._wrapAsyncDataBoundAIOperation=function isc_c_AI__wrapAsyncDataBoundAIOperation(asyncMethodName,request){
        var asyncMethodArgs=Array.prototype.slice.call(arguments,1,-1),
            callback=arguments[arguments.length-1];
        var fireCallback=function(result){
            var argNames=isc.AI._dataBoundAIOperationResultCallbackArgNames;
            isc.AI.fireCallback(callback,argNames,[result,request]);
        };
        this[asyncMethodName].apply(this,asyncMethodArgs)
            ._whenSettled(fireCallback);
    }
,isc.A.summarizeValue=function isc_c_AI_summarizeValue(request,callback){
        this._wrapAsyncDataBoundAIOperation("asyncSummarizeValue",request,callback);
    }
,isc.A.asyncSummarizeValue=function isc_c_AI_asyncSummarizeValue(request){
        return this._asyncDataBoundAIOperation("_asyncSummarizeValue",request);
    }
,isc.A._asyncSummarizeValue=function isc_c_AI__asyncSummarizeValue(request,dabOpContext){
        var ssAIRequest=request.aiRequest;
        if(!ssAIRequest){
            return isc.rejectWithError(isc.AsyncUtil.missingRequiredParameterErrorMessage.evalDynamicString(this,{paramName:"aiRequest"}));
        }
        var value=request.value;
        if(!value){
            return isc.rejectWithError(isc.AsyncUtil.missingRequiredParameterErrorMessage.evalDynamicString(this,{paramName:"value"}));
        }
        var prompts=[
            "This is a request to supplement a value from a DataSource, using "+
            "relevant general knowledge and your own reasonable inferences. "+
            "The supplemental information requested is:",
            "${ssMessages}"
        ];
        var ssMessages=[{content:ssAIRequest.prompt,type:ssAIRequest.promptType}],
            additionalMessages=ssAIRequest.additionalMessages;
        if(additionalMessages){
            ssMessages.addList(additionalMessages);
            ssMessages.removeEmpty();
        }
        var availableFields=dabOpContext.availableFields,
            record=request.record,
            fieldName=request.fieldName,
            recordSerializationSettings;
        if(availableFields){
            var finalFields=availableFields,
                finalFieldNames=dabOpContext.availableFieldNames;
            var field;
            if(fieldName){
                var pos=finalFieldNames.indexOf(fieldName);
                if(pos<0){
                    this.logWarn("A field with name '"+fieldName+"' is not available. Ignoring...","AI");
                    fieldName=null;
                }else{
                    finalFieldNames.removeAt(pos);
                    field=finalFields[pos];
                }
            }
            if(dabOpContext.dataSource){
                var dsSummary=this.summarizeDataSource(dabOpContext.dataSource,finalFields,{format:"compactJSON"},false);
                prompts.push(
                    "The value to be summarized is from "+
                    (fieldName?"the '"+fieldName+"' field of ":"")+
                    "the DataSource with the following description: "+dsSummary+"\n\n"
                );
            }else{
                this._assert(dabOpContext.component);
                if(field){
                    prompts.push(
                        "The value to be summarized comes from the DataBoundComponent field with "+
                        "the following description (in JSON format): "+
                        this.serializeIndexedRecord(field,null,{
                            recordIndexFieldName:"",
                            fieldNames:this.salientFieldAttributes,
                            format:"compactJSON"
                        })+"\n\n"
                    );
                }
            }
            if(record){
                if(finalFieldNames.isEmpty()){
                    this.logWarn("The context record was specified, but no additional fields are relevant to the request.","AI");
                }else{
                    recordSerializationSettings={
                        recordIndexFieldName:"",
                        fieldNames:finalFieldNames,
                        format:"compactJSON"
                    };
                    prompts.push(
                        "The record that the value is part of is (in JSON format): "+
                        this.serializeIndexedRecord(record,null,recordSerializationSettings)+"\n\n"
                    );
                }
            }
        }else{
            if(record){
                this.logWarn("The record was specified, but no fields are available. Ignoring...","AI");
            }
            if(fieldName){
                this.logWarn("fieldName was specified, but no fields are available. Ignoring...","AI");
            }
        }
        var aiMessagesBuilder=isc.InternalAIMessagesBuilder2.create({
            ssMessages:ssMessages,
            messagesSource:request.aiRequestSource||"system",
            target:this,
            evalVars:{
                value:value
            }
        });
        aiMessagesBuilder.appendPrompts(prompts);
        delete prompts;
        var aiMessages=aiMessagesBuilder.aiMessages;
        var examples=request.examples;
        if(examples&&!examples.isEmpty()){
            if(request.valueType!=null&&request.valueType!="text"){
                this.logWarn("The valueType of examples must be 'text'. Omitting the examples...","AI");
            }else{
                var examplePrompt="For example: ";
                for(var exampleIndex=0;exampleIndex<examples.length;++exampleIndex){
                    var example=examples[exampleIndex];
                    examplePrompt+="For the value '"+(example.value||"")+"'";
                    if(recordSerializationSettings&&example.record){
                        examplePrompt+=" and record "+this.serializeIndexedRecord(
                                example.record,null,recordSerializationSettings);
                    }
                    examplePrompt+=", you might generate '"+(example.summary||"")+"'.\n";
                }
                aiMessages.push({
                    source:"system",
                    content:examplePrompt
                });
            }
        }
        aiMessages.push({
            source:"system",
            content:"Your response should be a single JSON object with one key \"result\" "+
                "and value being the string of supplemental information for the value. "+
                "The value is:"
        });
        aiMessages.push({
            content:value,
            type:request.valueType
        });
        var aiRequest={
            messages:aiMessages,
            responseType:"object",
            cancellationController:dabOpContext.cancellationController
        };
        var context=this._getContextForRequest(aiRequest);
        if(context.errorMessage)return isc.rejectWithError(context.errorMessage);
        var aiConfig={
            maxRetries:request.maxRetries
        };
        return context.aiEngine.asyncSendRequest(aiRequest,aiConfig)
            .then(function(aiResponse){
                var responseObject=aiResponse.message.content,
                    responseStr;
                if(!isc.isAn.Object(responseObject)||
                    !isc.isA.String(responseObject.result)||
                    !(responseStr=responseObject.result.trim()))
                {
                    return isc.rejectWithError(isc.AI.aiNotAbleToProcessRequestErrorMessage);
                }
                return{
                    type:"success",
                    summary:responseStr
                };
            });
    }
,isc.A.command=function isc_c_AI_command(promptText,commandType){
        if(promptText==null)return;
        if(commandType=="complete"){
            if(promptText!=null){
            }
            return;
        }
        if(commandType!="userQuery"&&commandType!="resolveError"&&commandType!="userClarification"){
            return;
        }
        if(commandType=="userQuery"){
            isc.AI.lastUserPrompt=promptText;
        }
        var session=isc.AI.getSession(),
            priorConversation=session[0],
            promptContext=session[1],
            priorMessages=session[2];
        if(priorMessages==null&&this.useClientSessionHistory){
            promptContext={};
            priorMessages=this.sessionMessages=[this.getInitiatorMessage(promptContext)];
            promptText="** Initial request **\n"+promptText;
        }
        var callback=function(response,config){
            isc.AI.handleAIResponse(response,config.clientContext);
        };
        var aiMessages=(priorMessages||[]).concat([{source:(commandType=="resolveError"?"system":"user"),content:promptText}]);
        this.sendRequest({
            messages:aiMessages,
            historyIntroduction:"You have previously interacted with this user during this session as follows. Input from the "+
                                 "user, including contextual information automatically provided by SmartClient, is delineated by "+
                                 isc.AI.scPostDelineator+" at the beginning and end of that information. "+
                                 "Your responses are delineated by "+isc.AI.aiResponseDelineator+" at the beginning and end.",
            historyConclusion:"** New request **",
            historyDelimiters:{
                user:isc.AI.scPostDelineator,
                model:isc.AI.aiResponseDelineator
            }
        },callback,{clientContext:promptContext});
        this.addUserRequestToSessionHistory(promptText,promptContext);
    }
,isc.A.sendPrompt=function isc_c_AI_sendPrompt(promptText,callback,config){
        this.sendRequest({messages:[{source:"user",content:promptText}]},callback,config);
    }
,isc.A.sendRequest=function isc_c_AI_sendRequest(aiRequest,callback,config){
        config=isc.addProperties({},config);
        var aiEngine=isc.AI.getEngine(config.engineId);
        aiEngine.sendRequest(aiRequest,function(aiResponse,aiRequest){
            var messageContent=aiResponse.message&&aiResponse.message.content;
            if(messageContent==null){
                aiEngine.logWarn("Unable to extract message from AI response","AI");
                return;
            }
            aiEngine.logDebug("Response text from AI: "+messageContent,"AI");
            isc.AI.fireCallback(callback,"messageContent,config",[messageContent,config]);
        },config);
    }
,isc.A.estimateTokenCount=function isc_c_AI_estimateTokenCount(text,settings){
        var engine=isc.AI.getEngine(settings&&settings.engineId);
        return engine.estimateTokenCount(text);
    }
,isc.A.getVB=function isc_c_AI_getVB(){
        if(this.isReify)return window.VB;
        return null;
    }
,isc.A.commandComplete=function isc_c_AI_commandComplete(jsObj){
        isc.Class.endAEM();
        if(this.isReify&&this._reifyProjectState){
            isc.AI.getVB().destroyProjectState(this._reifyProjectState);
        }
        var response=isc.AI.lastResponse||{};
        var result=jsObj?isc.JSON.encode(jsObj):null;
        isc.logWarn("commandComplete() called - "+
            (result?"JSON serialized to: "+result:"no JSON to serialize"));
        if(response.message&&!isc.isAn.emptyString(response.message)){
            if(response.messageType=="Notify")isc.Notify.addMessage(response.message);
            else isc.say(response.message);
        }
        if(result)isc.AI.command(result,"complete");
    }
,isc.A.getSessionHistory=function isc_c_AI_getSessionHistory(){
        return this.getSession()[0];
    }
,isc.A.getSessionContext=function isc_c_AI_getSessionContext(){
        return this.getSession()[1];
    }
,isc.A.getSessionMessages=function isc_c_AI_getSessionMessages(){
        return this.getSession()[2];
    }
,isc.A.getSession=function isc_c_AI_getSession(){
        var history=this.sessionHistory;
        var context=this.sessionContext;
        var messages=this.sessionMessages;
        return[history,context,messages];
    }
,isc.A.clearSession=function isc_c_AI_clearSession(){
        delete this.sessionHistory;
        delete this.sessionContext;
        delete this.sessionMessages;
    }
,isc.A.addUserRequestToSessionHistory=function isc_c_AI_addUserRequestToSessionHistory(promptText,promptContext){
        if(this.useClientSessionHistory){
            if(!this.sessionHistory)this.sessionHistory="";
            this.sessionHistory+="\n"+this.scPostDelineator+promptText+this.scPostDelineator;
            if(!this.sessionMessages)this.sessionMessages=[];
            this.sessionMessages.push({source:"user",content:promptText});
            if(promptContext!=null){
                if(this.sessionContext==null)this.sessionContext={};
                isc.addProperties(this.sessionContext,promptContext);
            }
        }
    }
,isc.A.addAIResponseToSessionHistory=function isc_c_AI_addAIResponseToSessionHistory(aiResponse){
        if(this.useClientSessionHistory){
            var clean=isc.AI.cleanAIResponse(aiResponse);
            if(!this.sessionHistory)this.sessionHistory="";
            this.sessionHistory+="\n"+this.aiResponseDelineator+clean+this.aiResponseDelineator;
            if(!this.sessionMessages)this.sessionMessages=[];
            this.sessionMessages.push({source:"AI",content:clean});
        }
    }
,isc.A.handleAIResponse=function isc_c_AI_handleAIResponse(aiResponse,context){
        this.addAIResponseToSessionHistory(aiResponse);
        var response=isc.AI.validateAIResponse(aiResponse);
        this.handleValidatedAIResponse(response,context);
    }
,isc.A.handleValidatedAIResponse=function isc_c_AI_handleValidatedAIResponse(response,context){
        isc.AI.lastResponse=isc.addProperties({},response);
        if(response.errors&&response.errors.length>0){
            this.logWarn("The following errors were found during response validation:"+this.echoAll(response.errors));
            if(response.unableToProcess){
                this.adjacentValidationFailureCount++;
                if(this.adjacentValidationFailureCount>4){
                    isc.say("The AI is unable to process this request as written. Please try rephrasing your request.");
                }else{
                    var errorPrompt="The response you shared was not formatted correctly. "+
                                      "Please rewrite the response in the specified format. The specific error(s) encountered are as follows:"+
                                      "\n- "+response.errors.join("\n- ");
                    this.command(errorPrompt,"resolveError");
                }
                return;
            }
        }
        this.adjacentValidationFailureCount=0;
        switch(response.responseType){
            case"Execute JavaScript":
                var result=isc.AI.handleAIJavaScript(response,context);
                break;
            case"Clarify":
                this.showClarifyWindow(response.message);
                break;
            case"Inspect":
                var result=isc.AI.handleAIJavaScript(response,context);
                break;
            case"Explain Why Not":
            case"Send A Message":
                var result=isc.AI.commandComplete();
                break;
            case"Ad Hoc UI":
                var result=isc.AI.handleAIJavaScript(response,context);
                break;
            default:
        }
    }
,isc.A.getErrorText=function isc_c_AI_getErrorText(errorType,response){
        return isc.AI.errorTypes[errorType].evalDynamicString(this,response);
    }
,isc.A.validateAIResponse=function isc_c_AI_validateAIResponse(aiResponse){
        var errors=[];
        var response={};
        if(!aiResponse||isc.isAn.emptyString(aiResponse)){
            errors.add("No Response Content");
            response.errors=errors;
            response.unableToProcess=true;
            return response;
        }else{
            var parseResult=isc.AI.parseAIResponse(aiResponse);
            response=parseResult.response;
            var type=response.responseType;
            if(parseResult.aiResponse!=aiResponse){
                errors.add(this.getErrorText("ContainsAIDelineator",response));
            }
            if(!type||type==""){
                errors.add(this.getErrorText("NoResponseType",response));
                response.unableToProcess=true;
            }else if(!isc.AI.responseTypes.contains(type)){
                errors.add(this.getErrorText("BadResponseType",response));
                response.unableToProcess=true;
            }
            if(response.message){
                if(type!="Clarify"){
                    if(!response.messageType){
                        errors.add(this.getErrorText("NoMessageType",response));
                        response.unableToProcess=true;
                    }else if(!isc.AI.messageTypes.contains(response.messageType)){
                        errors.add(this.getErrorText("BadMessageType",response));
                        response.unableToProcess=true;
                    }
                }
            }
            if(["Send A Message","Explain Why Not","Clarify"].contains(response.messageType)){
                if(!response.message||isc.isAn.emptyString(response.message)){
                    errors.add(this.getErrorText("NoMessage",response));
                    response.unableToProcess=true;
                }else if(type!="Clarify"){
                    if(!isc.AI.messageTypes.contains(response.messageType)){
                        errors.add(this.getErrorText("BadMessageType",response));
                        response.unableToProcess=true;
                    }
                }
            }
            if((type=="Inspect"||type=="Execute JavaScript")&&
                    (!response.javaScript||response.javaScript.length==0)){
                errors.add(this.getErrorText("NoJavaScript",response));
                response.unableToProcess=true;
            }
            if(response.noCommandComplete){
                if(type=="Inspect"){
                    errors.add(this.getErrorText("NoCommandComplete",response));
                    response.unableToProcess=true;
                }else if(type=="Execute JavaScript"||type=="Ad Hoc UI"){
                    response.fireCommandComplete=true;
                }
            }
        }
        if(errors.length>0)response.errors=errors;
        response.aiResponse=aiResponse;
        isc.logInfo(isc.echoFull(response));
        return response;
    }
,isc.A.cleanAIResponse=function isc_c_AI_cleanAIResponse(aiResponse){
        var clean=aiResponse.replaceAll(
                        isc.AI.exampleResponseDelineator,""
                    ).replaceAll(
                        isc.AI.aiResponseDelineator,""
                    ).replaceAll(
                        isc.AI.scPostDelineator,""
                    );
        return clean
    }
,isc.A.parseAIResponse=function isc_c_AI_parseAIResponse(aiResponse){
        var clean=this.cleanAIResponse(aiResponse);
        var response={};
        response.responseType=this.retrieveAttributeValue("ResponseType:",clean);
        response.messageType=this.retrieveAttributeValue("MessageType:",clean);
        response.message=this.retrieveAttributeValue("Message:",clean,["MessageType:","======","ResponseType:"]);
        response.javaScript=this.retrieveAttributeValue("======",clean,["======"]);
        if(response.javaScript){
            var commandCompleteRegex=new RegExp(/(isc\.AI\.commandComplete\()([\s\S]*?)(\))+/)
            if(response.javaScript.match(commandCompleteRegex)==null){
                response.noCommandComplete=true;
            }
        }
        return{response:response,aiResponse:clean};
    }
,isc.A.retrieveAttributeValue=function isc_c_AI_retrieveAttributeValue(attributeName,aiResponse,endMarkers){
        var attrEndRegex="(?:$|\\n)";
        if(endMarkers!=null&&endMarkers.length>0){
            attrEndRegex="(?:$|\\n\\s*"+endMarkers.join("|\\n\\s*")+")";
        }
        var reString="(?:\\n|^)\\s*"+attributeName+"([\\s\\S]*?)"+attrEndRegex;
        var result=aiResponse.match(new RegExp(reString));
        if(result!=null)result=result.last().trim();
        return result;
    }
,isc.A.handleAIJavaScript=function isc_c_AI_handleAIJavaScript(response,context){
        if(this.isReify){
            this._reifyProjectState=isc.AI.getVB().getProjectState();
        }
        var js=response.javaScript,
            adHocUI=response.responseType=="Ad Hoc UI",
            noAutoDraw
        ;
        if(adHocUI)noAutoDraw=isc.noAutoDraw=true;
        var _this=this;
        delete this.aemError;
        var idMapping=context&&context.idMapping;
        var localVars;
        if(idMapping){
            localVars={};
            for(var ID in idMapping){
                var liveWidget=isc.AutoTest.getLocatorCanvas(idMapping[ID][0]);
                if(liveWidget!=null){
                    localVars[ID]=liveWidget;
                }
            }
        }
        var evalResult=isc.Class.evaluateAICode(
            js,
            function(evaluationError){
                this.aemError=evaluationError;
                if(evaluationError.errorType=="Timeout"){
                    _this.handleAEMTimeout();
                }else{
                    _this.handleAEMError(evaluationError.error);
                }
            },
            true,
            adHocUI,
            localVars
        );
        if(this.aemError){
            delete this.aemError;
            return;
        }
        if(response.fireCommandComplete){
            this.commandComplete();
        }
        if(adHocUI){
            isc.AI.uiWindow=this.createAdHocUIWindow();
            var globals=evalResult.globals;
            var canvii=isc.Canvas._getTopLevelWidget(globals,true);
            isc.AI.uiWindow.setAdHocUI(canvii,response);
            isc.AI.uiWindow.show();
        }
    }
,isc.A.handleAEMError=function isc_c_AI_handleAEMError(error){
        this.resetApplicationState();
        this.logWarn("Error executing AI-generated script:"+error);
        var errorTemplate=this.errorTypes["JavaScriptError"];
        var errorMessage=error.message,
            hint=this.getJSErrorHint(errorMessage)||"";
        var errorPrompt=errorTemplate.evalDynamicString(this,{error:error,hint:hint});
        this._aemErrorCount++;
        if(this._aemErrorCount>2){
            this._aemErrorCount=0;
            isc.say("The AI-generated script has caused an execution error. Please rephrase your request and try again.");
        }else{
            this.command(errorPrompt,"resolveError");
        }
    }
,isc.A.resetApplicationState=function isc_c_AI_resetApplicationState(){
        if(this.isReify&&this._reifyProjectState!=null){
            isc.AI.getVB().restoreProjectState(this._reifyProjectState);
            delete this._reifyProjectState;
        }else{
        }
    }
,isc.A.getJSErrorHint=function isc_c_AI_getJSErrorHint(errorMessage){
        var hint="";
        if(new RegExp("^\S+ is undefined").test(errorMessage)){
            hint="\nSmartClient components are available by the ID in global scope. "+
                "SmartClient classes may be accessed via their class name with the prefix \"isc.\" in global scope.\n";
        }
        return hint;
    }
,isc.A.handleAEMTimeout=function isc_c_AI_handleAEMTimeout(){
        this.logWarn("Timeout after executing AI-generated script - either the "+
            "code flow failed to complete, or did not invoke AI.commandComplete() when it completed.");
    }
,isc.A.getDataSourceNames=function isc_c_AI_getDataSourceNames(){
        if(this.applicationDataSources!=null){
            var dsNames=[];
            for(var i=0;i<this.applicationDataSources.length;i++){
                var dsName=this.applicationDataSources[i];
                if(isc.DataSource.get(dsName)!=null){
                    dsNames.add(dsName);
                }
            }
            return dsNames;
        }
        return(isc.AI.isReify?
            isc.AI.getVB().getProjectDataSourceNames():
            isc.DS.getRegisteredDataSourceObjects(true,true,true,true).getProperty("ID"));
    }
,isc.A.getDataSourceDefinitions=function isc_c_AI_getDataSourceDefinitions(format){
        if(format==null)format="pseudocode";
        if(isc.AI.isReify){
            return isc.AI.getVB().getProjectDataSourceDefinitions(format);
        }else{
            var dsArr=this.getDataSourceNames();
            if(dsArr&&dsArr.length>0){
                dsArr=dsArr.map(function(dsName){return isc.DataSource.get(dsName)});
            }
            return isc.DS.getRegisteredDataSourceDefinitions(format,false,dsArr);
        }
    }
,isc.A.getUISummary=function isc_c_AI_getUISummary(captureWidgetIDs){
        var rootCanvas=this.customRootCanvas;
        if(!rootCanvas)rootCanvas=this.applicationRootCanvas;
        if(rootCanvas==null){
            if(isc.AI.isReify){
                var vb=isc.AI.getVB();
                rootCanvas=vb&&vb.getScreenBaseComponent();
            }else if(isc.AI.isShowcase){
                var exampleViewer=window["featureExplorer_exampleViewer"];
                if(exampleViewer){
                    if(exampleViewer.fullScreenExampleWindow&&
                        exampleViewer.fullScreenExampleWindow.isDrawn()&&
                        exampleViewer.fullScreenExampleWindow.isVisible())
                    {
                        rootCanvas=exampleViewer.fullScreenExampleWindow.viewPane.viewContainer;
                    }else if(
                        exampleViewer.viewPane&&
                        exampleViewer.viewPane.isDrawn()&&
                        exampleViewer.viewPane.isVisible()
                    ){
                        rootCanvas=exampleViewer.viewPane.viewContainer
                    }
                }
            }
        }
        if(rootCanvas==null){
            var topCanvii=isc.Canvas._topCanvii||[];
            for(var i=0;i<topCanvii.length;i++){
                var topCanvas=topCanvii[i];
                if(topCanvas==null)continue;
                if(isc.isA.ScreenSpan(topCanvas))continue;
                if(!topCanvas.isVisible()||!topCanvas.isDrawn()){
                    continue;
                }
                if(isc.isA.Menu(topCanvas))continue;
                if(topCanvas==isc.AI.assistantWindow)continue;
                if(topCanvas.children!=null){
                    rootCanvas=topCanvas;
                    break;
                }
            }
        }
        if(rootCanvas==null)return"";
        var summaryConfig=rootCanvas.getUISummary(["data"]);
        var idMapping={},
            summaryText=isc.JSON.encode(this.postProcessUISummary(summaryConfig,idMapping));
        return captureWidgetIDs?[summaryText,idMapping]:summaryText;
    }
,isc.A.postProcessUISummary=function isc_c_AI_postProcessUISummary(object,idMapping){
        if(isc.isA.Array(object)){
            for(var i=0;i<object.length;i++){
                this.postProcessUISummary(object[i],idMapping);
            }
        }else if(isc.isA.Object(object)&&!isc.isA.Date(object)){
            for(var prop in object){
                this.postProcessUISummary(object[prop],idMapping);
            }
        }
        var smartClientComponentType=object&&object.smartClientComponentType;
        if(smartClientComponentType!=null){
            object._serialize=function(prefix,objRefs,objPath){
                var smartClientComponentType=this.smartClientComponentType;
                var config={};
                var ID=this.id;
                var liveWidget=window[ID];
                if(liveWidget&&liveWidget._autoAssignedID){
                    var localID=liveWidget.getLocalId();
                    var i=0;
                    ID=localID;
                    while(idMapping[ID]!=null){
                        ID=localID+"_"+(++i);
                    }
                    idMapping[ID]=[isc.AutoTest.getObjectLocator(liveWidget),localID,liveWidget.getScreenId()];
                }
                config.ID=ID;
                isc.addProperties(config,this);
                delete config._serialize;
                delete config.smartClientComponentType;
                delete config.id;
                return"isc."+smartClientComponentType+".create("+isc.JSON.encode(config,{prettyPrint:true,leadingIndent:prefix})+")";
            }
        }
        return object;
    }
,isc.A.createAdHocUIWindow=function isc_c_AI_createAdHocUIWindow(){
        return isc.Window.create(isc.AI.adHocUIWindowDefaults);
    }
,isc.A.showSaveUIWindow=function isc_c_AI_showSaveUIWindow(response){
        if(!isc.AI.saveUIWindow){
            isc.AI.saveUIWindow=isc.Window.create(isc.AI.saveUIWindowDefaults);
        }
        isc.AI.saveUIWindow.setResponse(response);
        isc.AI.saveUIWindow.show();
        isc.AI.saveUIWindow.bringToFront();
    }
,isc.A.hideSaveUIWindow=function isc_c_AI_hideSaveUIWindow(){
        if(isc.AI.saveUIWindow)isc.AI.saveUIWindow.hide();
    }
,isc.A.getScreensDataSource=function isc_c_AI_getScreensDataSource(){
        if(!this.screensDataSource)this.screensDataSource=this.getLocalDataSource();
        return this.screensDataSource;
    }
,isc.A.getLocalDataSource=function isc_c_AI_getLocalDataSource(){
        return this._getLocalDataSource({
            transformRequest:function(dsRequest){
                if(dsRequest.doNotTrackRPC==null)dsRequest.doNotTrackRPC=!isc.ss.logLocalDSRequests;
                return dsRequest;
            },
            _generated:true,
            storageMode:"allRecords",
            storageKey:this.savedUIStorageKey
        });
    }
,isc.A._getLocalDataSource=function isc_c_AI__getLocalDataSource(props){
        var _this=this;
        return isc.LocalDataSource.create(props,{
            fields:[
                {name:"name",primaryKey:true},
                {name:"response",type:"text",length:1000000}
            ],
            destroy:function(){
                return this.Super("destroy");
            }
        });
    }
,isc.A.saveAdHocUI=function isc_c_AI_saveAdHocUI(name,response){
        isc.AI.getScreensDataSource().addData({name:name,response:response});
        isc.say("Ad Hoc UI saved.");
    }
,isc.A.getSavedUI=function isc_c_AI_getSavedUI(name,callback){
        isc.AI.getScreensDataSource().fetchData({name:name},
            function(dsRequest,data,rsRequest){
                if(isc.isAn.Array(data))data=data[0];
                if(callback)callback(data);
            }
        );
    }
);
isc.evalBoundary;isc.B.push(isc.A.removeSavedUI=function isc_c_AI_removeSavedUI(name){
        isc.AI.getScreensDataSource().removeData({name:name});
    }
,isc.A.showAssistant=function isc_c_AI_showAssistant(aiContext){
        if(!isc.AI.assistantWindow){
            isc.AI.assistantWindow=isc.Window.create(isc.AI.assistantWindowDefaults);
        }
        isc.AI.initAssistantContext(aiContext);
        isc.AI.assistantWindow.show();
    }
,isc.A.hideAssistant=function isc_c_AI_hideAssistant(){
        if(isc.AI.assistantWindow)isc.AI.assistantWindow.close();
    }
,isc.A.assistantClosed=function isc_c_AI_assistantClosed(){
        if(this.clearHistoryOnClose&&this.useClientSessionHistory)this.clearSession();
        delete isc.AI.assistantContext;
        delete isc.AI.customRootCanvas;
    }
,isc.A.initAssistantContext=function isc_c_AI_initAssistantContext(aiContext){
        if(isc.AI.assistantWindow){
            if(isc.AI.assistantWindow.isVisible())isc.AI.hideAssistant();
        }else isc.AI.clearSession();
        isc.AI.assistantContext=aiContext;
        this.customRootCanvas=aiContext&&aiContext.rootCanvas;
    }
,isc.A.useAssistant=function isc_c_AI_useAssistant(userPrompt,context){
        isc.AI.initAssistantContext(context);
        isc.AI.command(userPrompt,"userQuery");
    }
,isc.A.showClarifyWindow=function isc_c_AI_showClarifyWindow(aiText){
        if(!isc.AI.clarifyWindow){
            isc.AI.clarifyWindow=isc.Window.create(isc.AI.clarifyWindowDefaults);
        }
        var win=isc.AI.clarifyWindow;
        win.label.setContents(aiText);
        win.form.clearValues();
        win.show();
    }
,isc.A.hideClarifyWindow=function isc_c_AI_hideClarifyWindow(){
        if(isc.AI.clarifyWindow)isc.AI.clarifyWindow.hide();
    }
,isc.A.getIconURL=function isc_c_AI_getIconURL(darkBackground){
        return isc.Media.getStockIconSrc("AIAssist");
    }
,isc.A._extractJsonResult=function isc_c_AI__extractJsonResult(result,ldelim,rdelim,excludeDelimiters){
        if(ldelim==null){
            ldelim='{';
        }
        if(rdelim==null){
            rdelim='}';
        }
        var lastRdelimPos=result.lastIndexOf(rdelim);
        if(lastRdelimPos<0)return this._invalidResult;
        result=result.substring(0,lastRdelimPos+(excludeDelimiters?0:rdelim.length));
        var ldelimPos;
        while((ldelimPos=result.indexOf(ldelim))>=0){
            result=result.substring(ldelimPos+(excludeDelimiters?ldelim.length:0));
            try{
                return isc.JSON.decode(result);
            }catch(_e){
                if(!excludeDelimiters)result=result.substring(ldelim.length);
            }
        }
        return this._invalidResult;
    }
,isc.A.asyncRepeatRequestOnBatches=function isc_c_AI_asyncRepeatRequestOnBatches(templateAIRequest,records,fieldNames,settings,responseForBatchCallback){
        var aiResponsesForBatches=[];
        if(!this.isEnabled()){
            return isc.rejectAsDisabled(this.aiWasDisabledMessage,{aiResponsesForBatches:aiResponsesForBatches});
        }
        var givenCC=settings.cancellationController,
            subCC;
        if(givenCC){
            if(givenCC.canceled){
                return Promise.reject(givenCC.asCanceledResult({
                    aiResponsesForBatches:aiResponsesForBatches
                }));
            }
            subCC=givenCC.createSubController();
        }else{
            subCC=isc.CancellationController.create();
        }
        var maxPasses=settings.maxPasses==null?2:settings.maxPasses;
        if(maxPasses<1){
            return isc.rejectWithError("Exceeded the maximum number of passes.",{aiResponsesForBatches:aiResponsesForBatches});
        }
        var context=this._getContextForRequest(templateAIRequest);
        if(context.errorMessage)return isc.rejectWithError(context.errorMessage,{aiResponsesForBatches:aiResponsesForBatches});
        context.aiResponsesForBatches=aiResponsesForBatches;
        var secondPassBatches=context.secondPassBatches=[];
        var aiConfig={
            maxRetries:settings.maxRetries==null?2:settings.maxRetries
        };
        var aiSettings={
            serializationFormat:"compactJSON",
            fieldNames:fieldNames,
            maxRetries:aiConfig.maxRetries,
            cancellationController:subCC,
            aiPageSize:settings.maxRecordsPerBatch
        };
        var batches=settings._batches;
        if(!batches){
            templateAIRequest=isc.addPropertiesWithAssign({},templateAIRequest);
            templateAIRequest.cancellationController=subCC;
            batches=context.aiEngine.getBatches(templateAIRequest,records,aiSettings);
        }else{
            batches=batches.duplicate();
            for(var i=0;i<batches.length;++i){
                var batch=batches[i]=isc.addPropertiesWithAssign({},batches[i]);
                batch.aiRequest=isc.addProperties({},batch.aiRequest);
                batch.aiRequest.cancellationController=subCC;
            }
        }
        var stopOnError=settings.stopOnError!=false;
        var processAIResponse=function(batch,aiResponse){
            if(givenCC&&givenCC.canceled)return;
            aiResponse.startIndex=batch.startIndex;
            aiResponse.length=batch.length;
            aiResponsesForBatches.push(aiResponse);
            aiResponse.callbackReturnValue=isc.AI.fireCallback(responseForBatchCallback,isc.AI._responseForBatchCallbackArgNames,[aiResponse,context]);
            return aiResponse;
        };
        var mapper=isc.ResolvedValuesMapper.create({
            values:batches,
            keepSettledStatus:!stopOnError?true:null,
            cancellationController:givenCC,
            maxConcurrent:settings.maxConcurrent,
            asyncMap:function(batch){
                return context.aiEngine.asyncSendRequest(batch.aiRequest,aiConfig)
                    .then(function(aiResponse){
                        return processAIResponse(batch,aiResponse);
                    },function(nonSuccessfulAIResponse){
                        var errorType=nonSuccessfulAIResponse.errorType;
                        if(maxPasses>=2&&batch.length>=2&&
                            (errorType=="requestSizeLimitExceeded"||errorType=="responseSizeLimitExceeded"))
                        {
                            secondPassBatches.addList(context.aiEngine.splitBatch(batch));
                            return null;
                        }
                        if(stopOnError&&!subCC.canceled){
                            subCC.cancel("The request for the batch starting at "+
                                    batch.startIndex+", length "+batch.length+" failed: "+
                                    isc.getAsyncMessage(nonSuccessfulAIResponse),"external");
                        }
                        return Promise.reject(processAIResponse(batch,nonSuccessfulAIResponse));
                    });
            }
        });
        return mapper.getPromise()
            .then(function(){
                if(givenCC&&givenCC.canceled){
                    return Promise.reject(givenCC.asCanceledResult({
                        aiResponsesForBatches:aiResponsesForBatches
                    }));
                }
                if(secondPassBatches.isEmpty()){
                    isc.AI._assert(!stopOnError||!givenCC||!givenCC.canceled);
                    return{
                        type:"success",
                        aiResponsesForBatches:aiResponsesForBatches
                    };
                }
                isc.AI._assert(maxPasses>=2);
                var subSettings=isc.addPropertiesWithAssign({},settings);
                subSettings.cancellationController=subCC;
                subSettings._batches=secondPassBatches;
                subSettings.maxPasses=maxPasses-1;
                var subCallback=function(aiResponseForBatch,subContext){
                    aiResponsesForBatches.push(aiResponseForBatch);
                    return isc.AI.fireCallback(responseForBatchCallback,isc.AI._responseForBatchCallbackArgNames,
                            [aiResponseForBatch,context]);
                };
                return isc.AI.asyncRepeatRequestOnBatches(templateAIRequest,records,fieldNames,subSettings,subCallback)
                    .then(function(){
                        return{
                            type:"success",
                            aiResponsesForBatches:aiResponsesForBatches
                        };
                    });
            });
    }
,isc.A.buildSort=function isc_c_AI_buildSort(userPrompt,callback,context,aiConfig){
        aiConfig=isc.addProperties({},aiConfig,{showPrompt:false,context:context});
        var grid=context.grid||context.rootCanvas;
        var ds=context.dataSource;
        var fields=ds!=null?isc.getValues(ds.getFields()):grid.getFields();
        var prompt="This is a request for an array of SortSpecifiers to apply to a ListGrid in a web application built with the Isomorphic SmartClient Javascript framework. "+
                     "The SortSpecifiers should fulfill the following user request:\n'"+userPrompt+"'\n";
        prompt+="Your response should include only the SortSpecifiers array and no other text.\n\n"+
                  "Each sort specifier consists of two attributes - 'property' (the property to sort by) and 'direction' (either 'ascending' or 'descending'). "+
                  "If the user is requesting the existing sort be cleared, return an empty array.\n";
        prompt+="For example, an appropriate response to a user request of 'Sort by supplierName, then by unitCost in descending order' might be as follows:\n"+
                "[{\"fieldName\":\"supplierName\",\"direction\":\"ascending\"},"+
                "[{\"fieldName\":\"unitCost\",\"direction\":\"descending\"}]\n\n";
        prompt+="For context, what follows is the list of fields available for use in SortSpecifiers - ";
        if(this.shouldUseAIFieldPaging(prompt,fields,aiConfig)){
            var _this=this;
            this.retrieveFieldsForPrompt(
                userPrompt,"Apply sorting by field(s)",fields,
                function(finalFields){
                    _this._buildSortWithFinalFields(userPrompt,prompt,callback,context,aiConfig,finalFields);
                },
                context,aiConfig
            );
        }else{
            this._buildSortWithFinalFields(userPrompt,prompt,callback,context,aiConfig,fields);
        }
    }
,isc.A._buildSortWithFinalFields=function isc_c_AI__buildSortWithFinalFields(userPrompt,prompt,callback,context,aiConfig,fields){
        prompt+=this.getSerializedFields(fields,aiConfig);
        var _this=this;
        isc.AI.sendPrompt(
            prompt,
            function(result){
                var obj=_this._extractJsonResult(result);
                _this.fireCallback(callback,"result,context",[obj,context]);
            },
            aiConfig);
    }
,isc.A.buildSetFields=function isc_c_AI_buildSetFields(userPrompt,callback,context,aiConfig){
        aiConfig=isc.addProperties({},aiConfig,{showPrompt:false,context:context});
        var prompt=this.setFieldsFixedPrompt.evalDynamicString(this,{userPrompt:userPrompt})
        var grid=context.grid||context.rootCanvas;
        var allFields=grid.getAllFields();
        var visibleFields=[];
        var hiddenFields=[];
        for(var i=0;i<allFields.length;i++){
            if(!grid.fieldIsVisible(allFields[i])){
                hiddenFields.add(allFields[i]);
            }else{
                visibleFields.add(allFields[i]);
            }
        }
        prompt+=this.setFieldsVisibleFieldsPromptPrefix;
        prompt+=this.getSerializedFields(visibleFields,aiConfig)+"\n\n";
        if(this.shouldUseAIFieldPaging(prompt,hiddenFields,aiConfig)){
            var _this=this;
            this.retrieveFieldsForPrompt(
                userPrompt,"Showing and hiding fields in a databound component",hiddenFields,
                function(finalFields){
                    _this._buildSetFieldsWithFinalFields(userPrompt,prompt,callback,context,aiConfig,finalFields);
                },
                context,aiConfig
            );
        }else{
            this._buildSetFieldsWithFinalFields(userPrompt,prompt,callback,context,aiConfig,hiddenFields);
        }
    }
,isc.A._buildSetFieldsWithFinalFields=function isc_c_AI__buildSetFieldsWithFinalFields(userPrompt,prompt,callback,context,aiConfig,hiddenFields){
        prompt+=this.setFieldsHiddenFieldsPromptPrefix;
        prompt+=this.getSerializedFields(hiddenFields,aiConfig);
        var _this=this;
        isc.AI.sendPrompt(
            prompt,
            function(result){
                var obj=_this._extractJsonResult(result);
                _this.fireCallback(callback,"result,context",[obj,context]);
            },
            aiConfig);
    }
,isc.A.buildGroupBy=function isc_c_AI_buildGroupBy(userPrompt,callback,context,aiConfig){
        aiConfig=isc.addProperties({},aiConfig,{showPrompt:false,context:context});
        var grid=context.grid||context.rootCanvas;
        var gridFields=grid.getFields();
        var prompt="This is a request to determine which field or fields to pass to ListGrid.groupBy() in a web application built with the Isomorphic SmartClient Javascript framework. "
        prompt+="Your response should be strutured as a JSON string containing an array of objects.\n"+
                  "Each object should have the \"fieldName\" attribute set to the field the user wishes to group by.\n"+
                  "If the user requested any existing grouping be cleared, the response JSON string should contain an array.\n\n";
        prompt+="Examples of appropriate responses to user requests:\n\n"+
                "request:\n"+
                "Group by supplierName\n"+
                "response:\n"+
                "[{\"fieldName\":\"supplierName\"}]\n\n"+
                "request:\n"+
                "Group the grid by availability, then by region\n"+
                "response:\n"+
                "[{\"fieldName\":\"availability\"},{\"fieldName\":\"region\"}]\n\n"+
                "request:\n"+
                "Clear the current grouping\n"+
                "response:\n"+
                "[]\n\n";
        prompt+="For context, what follows is the list of fields in the Grid.\n";
        prompt+=this.getSerializedFields(gridFields,aiConfig);
        prompt+="\n\nrequest:\n'"+userPrompt+"'\nresponse:\n";
        var _this=this;
        isc.AI.sendPrompt(
            prompt,
            function(result){
                var obj=_this._extractJsonResult(result);
                _this.fireCallback(callback,"result,context",[obj,context]);
            },
            aiConfig);
    }
,isc.A.asyncSendRequest=function isc_c_AI_asyncSendRequest(aiRequest,config){
        var context=this._getContextForRequest(aiRequest);
        if(context.errorMessage)return isc.rejectWithError(context.errorMessage);
        return context.aiEngine.asyncSendRequest(aiRequest,config);
    }
,isc.A._supportsAIComponentViews=function isc_c_AI__supportsAIComponentViews(ds,aiServiceMode){
        if(false){
            return false;
        }
        var dsID=ds.getID();
        if(dsID==null||isc.DS.get(dsID)!==ds)return false;
        if(!ds.supportsAdvancedCriteria())return false;
        var pkFieldNames=ds.getPrimaryKeyFieldNames();
        if(pkFieldNames==null||pkFieldNames.length!=1||!pkFieldNames[0])return false;
        return true;
    }
,isc.A._createBuildViaAIContext=function isc_c_AI__createBuildViaAIContext(asyncMethodName,buildRequest,opContext){
        var givenCC=opContext.cancellationController;
        var buildContext={
            _resolversObj:Promise.withResolvers(),
            cancellationController:givenCC,
            _ownCC:givenCC?givenCC.createSubController():isc.CancellationController.create(),
            _asyncMethodName:asyncMethodName,
            buildRequest:buildRequest,
            _numStepsCompleted:0,
            _estimatedNumTotalSteps:0,
            _progressDialog:null,
            _aiConfig:{
                maxRetries:(buildRequest.maxRetries==null?2:buildRequest.maxRetries),
                serializationFormat:"compactJSON"
            }
        };
        if(asyncMethodName=="asyncApplyAIFilter")buildContext.applyRequest=buildRequest;
        var cancelObservationId;
        if(givenCC){
            cancelObservationId=isc.observe(givenCC,"cancel","isc.AI.__handleCancelBuildViaAI(returnVal,observed,observer._buildContext,reason,initiator)");
            isc.addProperties(isc.Page._staticObservers[cancelObservationId].observer,{
                _buildContext:buildContext
            });
        }
        var finish=function(buildResponse){
            buildContext._ownCC.destroy();
            if(cancelObservationId!=null)isc.ignore(cancelObservationId);
            var progressDialog=buildContext._progressDialog;
            if(progressDialog&&!progressDialog.destroyed){
                if(buildResponse.type=="canceled"){
                    progressDialog.hide();
                    progressDialog.destroy();
                }else{
                    if(buildResponse.type=="error"){
                        isc.AI._fireAIProgressCallback(
                                buildContext,
                                [{category:"error",content:isc.getAsyncMessage(buildResponse)}],
                                true);
                    }
                    progressDialog.finish(buildResponse.type=="success");
                }
            }
        };
        buildContext._resolversObj.promise.then(finish,finish);
        return buildContext;
    }
,isc.A._fireAIProgressCallback=function isc_c_AI__fireAIProgressCallback(buildContext,newMessages,showProgressDialog){
        if(buildContext._ownCC.canceled)return;
        var numStepsCompleted=buildContext._numStepsCompleted,
            estimatedNumTotalSteps=buildContext._estimatedNumTotalSteps;
        this._assert(numStepsCompleted<=estimatedNumTotalSteps);
        var progressDialog=buildContext._progressDialog;
        if(progressDialog){
            progressDialog.setProgress(numStepsCompleted,estimatedNumTotalSteps);
            progressDialog.addMessages(newMessages);
            if(showProgressDialog)progressDialog.show();
        }
        isc.AI.fireCallback(
            buildContext.buildRequest.progressCallback,
            isc.AI._aiProgressCallbackArgNames,
            [buildContext,numStepsCompleted,estimatedNumTotalSteps,newMessages]
        );
    }
,isc.A._cancelBuildViaAI=function isc_c_AI__cancelBuildViaAI(buildContext,reason,initiator){
        buildContext._resolversObj.reject({
            type:"canceled",
            cancellationReason:reason,
            cancellationInitiator:initiator
        });
    }
,isc.A.__handleCancelBuildViaAI=function isc_c_AI___handleCancelBuildViaAI(wasFirstCancel,cancellationController,buildContext,reason,initiator){
        if(!wasFirstCancel)return;
        this._assert(cancellationController===buildContext.cancellationController);
        this._cancelBuildViaAI(buildContext,reason,initiator);
    }
,isc.A._wrapAsyncBuildViaAIOperation=function isc_c_AI__wrapAsyncBuildViaAIOperation(asyncMethodName,buildRequest,callback){
        var fireCallback=function(buildResponse){
            var argNames=asyncMethodName=="asyncApplyAIFilter"?isc.AI._applyAIFilterResponseCallbackArgNames:isc.AI._buildViaAIResponseCallbackArgNames;
            isc.AI.fireCallback(callback,argNames,[buildResponse,buildRequest]);
        };
        return this[asyncMethodName](buildRequest)
            ._whenSettled(fireCallback);
    }
,isc.A._asyncSummarizeUserMessages=function isc_c_AI__asyncSummarizeUserMessages(buildContext){
        var buildRequest=buildContext.buildRequest,
            userAIRequest=buildRequest.userAIRequest;
        var userMessages=[{content:userAIRequest.prompt,type:userAIRequest.promptType}];
        if(userAIRequest.additionalMessages){
            userMessages.addList(userAIRequest.additionalMessages);
            userMessages.removeEmpty();
        }
        buildContext._userMessages=userMessages;
        var indices=[],
            promises=[];
        for(var index=0;index<userMessages.length;++index){
            if(isc.AIEngine.isImageMessage(userMessages[index])){
                indices.push(index);
                promises.push(this._asyncSummarizeImage(userMessages[index],buildContext));
            }
        }
        if(indices.isEmpty()){
            buildContext._summarizedUserMessages=userMessages;
            return Promise.resolve(userMessages);
        }
        buildContext._summarizedUserMessages=userMessages.duplicate();
        buildContext._estimatedNumTotalSteps+=indices.length;
        this._fireAIProgressCallback(buildContext,[{category:"detail",content:"AI will be asked to summarize your request."}],true);
        return Promise.all(promises)
            .then(function(actuallySummarizedUserMessages){
                var summarizedUserMessages=buildContext._summarizedUserMessages;
                for(var i=0;i<indices.length;++i){
                    summarizedUserMessages[indices[i]]=actuallySummarizedUserMessages[i];
                }
                isc.AI._fireAIProgressCallback(
                    buildContext,
                    [{
                        category:"success",
                        content:"Finished summarizing your request"
                    }]
                );
                return summarizedUserMessages;
            });
    }
,isc.A._asyncSummarizeImage=function isc_c_AI__asyncSummarizeImage(userMessage,buildContext){
        var aiRequest={
            cancellationController:buildContext._ownCC,
            messages:[
                {content:"Summarize in detail the following image:",source:"system"},
                isc.addProperties({},userMessage,{source:"user"})
            ]
        };
        return this.asyncSendRequest(aiRequest,buildContext._aiConfig)
            .then(function(aiResponse){
                ++buildContext._numStepsCompleted;
                isc.AI._fireAIProgressCallback(buildContext);
                return{content:"An image described as: "+aiResponse.message.content};
            });
    }
,isc.A._canUseAICriterion=function isc_c_AI__canUseAICriterion(aiCriterion,ds){
        if(aiCriterion._dsName!=null&&aiCriterion._dsName!=ds.getID()){
            this.logWarn("'aiFilter' criterion built for DataSource '"+aiCriterion._dsName+"' is being used with DataSource '"+ds.getID()+"'.","AI");
        }
        if(aiCriterion._dsName!=ds.getID()||
            !aiCriterion._summarizedUserMessages||
            !isc.isAn.Array(aiCriterion._pkFieldNames)||
            !isc.isAn.Array(aiCriterion._finalFieldNames)||
            !aiCriterion._dsSummary)
        {
            return false;
        }
        var expectedPkFieldNames=ds.getPrimaryKeyFieldNames();
        if(aiCriterion._pkFieldNames.length!=expectedPkFieldNames.length)return false;
        for(var i=0;i<expectedPkFieldNames.length;++i){
            if(!aiCriterion._pkFieldNames.contains(expectedPkFieldNames[i]))return false;
        }
        var dsFields=ds.getFields();
        for(var i=0;i<aiCriterion._finalFieldNames.length;++i){
            if(!(aiCriterion._finalFieldNames[i]in dsFields))return false;
        }
        if(aiCriterion._notPickedPkValues!=null&&!isc.isA.Class(aiCriterion._notPickedPkValues)){
            return false;
        }
        if(aiCriterion._pickedPkValues!=null&&!isc.isA.Class(aiCriterion._pickedPkValues)){
            return false;
        }
        return true;
    }
,isc.A._getPromptText=function isc_c_AI__getPromptText(aiCriterion,dataSource){
        if(this._canUseAICriterion(aiCriterion,dataSource)){
            var userAIFilterRequest=aiCriterion.userAIRequest;
            if(userAIFilterRequest!=null&&
                isc.AIEngine._isTextContentType(userAIFilterRequest.promptType)&&
                userAIFilterRequest.prompt!=null)
            {
                return String(userAIFilterRequest.prompt);
            }
        }
        return"";
    }
,isc.A._applyUsableAIFilterCaches=function isc_c_AI__applyUsableAIFilterCaches(aiCriterion,records,dataSource){
        var partialResult={
            matchingRecords:null,
            remainingRecords:null
        };
        if(aiCriterion.isTrivial){
            partialResult.matchingRecords=records;
        }else{
            var notPickedPkValues=aiCriterion._notPickedPkValues,
                pickedPkValues=aiCriterion._pickedPkValues;
            if(!isc.isA.Class(notPickedPkValues))notPickedPkValues=null;
            if(!isc.isA.Class(pickedPkValues))pickedPkValues=null;
            var matchingRecords=partialResult.matchingRecords=[];
            if(notPickedPkValues||pickedPkValues){
                var remainingRecords=partialResult.remainingRecords=[];
                var pkFieldNames=aiCriterion._pkFieldNames;
                if(pkFieldNames.length==1){
                    var pkFieldName=pkFieldNames[0];
                    for(var recordIndex=0;recordIndex<records.length;++recordIndex){
                        var pkValue=records[recordIndex][pkFieldName];
                        if(notPickedPkValues&&notPickedPkValues.has(pkValue)){
                        }else if(pickedPkValues&&pickedPkValues.has(pkValue)){
                            matchingRecords.add(records[recordIndex]);
                        }else{
                            remainingRecords.add(records[recordIndex]);
                        }
                    }
                }else{
                    this._assert(false);
                }
            }else partialResult.remainingRecords=records;
        }
        return partialResult;
    }
,isc.A._clearAICriterionState=function isc_c_AI__clearAICriterionState(aiCriterion){
        delete aiCriterion._summarizedUserMessages;
        delete aiCriterion._dsName;
        delete aiCriterion._pkFieldNames;
        delete aiCriterion._finalFieldNames;
        delete aiCriterion._dsSummary;
        delete aiCriterion._criteria;
        if(isc.isA.Class(aiCriterion._notPickedPkValues)){
            aiCriterion._notPickedPkValues.clear();
        }
        delete aiCriterion._notPickedPkValues;
        delete aiCriterion._notPickedCriterion;
        if(isc.isA.Class(aiCriterion._pickedPkValues)){
            aiCriterion._pickedPkValues.clear();
        }
        delete aiCriterion._pickedPkValues;
    }
,isc.A._getCleanAICriterion=function isc_c_AI__getCleanAICriterion(aiCriterion){
        var cleanCriterion=isc.addPropertiesWithAssign({},aiCriterion);
        delete cleanCriterion._notPickedPkValues;
        delete cleanCriterion._notPickedCriterion;
        delete cleanCriterion._pickedPkValues;
        delete cleanCriterion._clonable;
        delete cleanCriterion.clone;
        delete cleanCriterion.criteria;
        return cleanCriterion;
    }
,isc.A._createFromCleanAICriterion=function isc_c_AI__createFromCleanAICriterion(cleanCriterion){
        var notPickedPkValues,
            pickedPkValues;
        if(isc.isAn.Array(cleanCriterion._pkFieldNames)){
            if(cleanCriterion._pkFieldNames.length==1){
                notPickedPkValues=isc.Set.create();
                pickedPkValues=isc.Set.create();
            }else{
                notPickedPkValues=isc.TupleSet.create();
                pickedPkValues=isc.TupleSet.create();
            }
        }
        return isc.addProperties({},cleanCriterion,{
            _constructor:"AdvancedCriteria",
            operator:"aiFilter",
            _notPickedPkValues:notPickedPkValues,
            _notPickedCriterion:null,
            _pickedPkValues:pickedPkValues,
            _clonable:true,
            clone:isc.AI._aiCriterionCloneImpl
        });
    }
,isc.A._aiCriterionCloneImpl=function isc_c_AI__aiCriterionCloneImpl(){
        return this;
    }
,isc.A._createBuildCriterionContext=function isc_c_AI__createBuildCriterionContext(asyncMethodName,buildRequest,dabOpContext){
        var buildContext=this._createBuildViaAIContext(asyncMethodName,buildRequest,dabOpContext);
        buildContext.dataSource=dabOpContext.dataSource;
        var mode=buildRequest.mode;
        if(mode==null)mode="hybrid";
        else if(mode!="aiAssist"&&mode!="AIDE"&&mode!="hybrid"){
            this.logWarn("unsupported AI service mode '"+mode+"'. Switching to 'hybrid'.");
            mode="hybrid";
        }
        buildContext.mode=mode;
        if(buildRequest.showProgressDialog==null||buildRequest.showProgressDialog){
            buildContext._progressDialog=isc.FilterViaAIProgressDialog.create(buildRequest.progressDialogProperties,{
                _buildContext:buildContext,
                canCancel:buildRequest.userCanCancel!=false
            });
        }
        buildContext._estimatedNumTotalSteps=1;
        this._fireAIProgressCallback(buildContext,[{category:"detail",content:isc.AI.startingYourRequestDetailMessage}]);
        return buildContext;
    }
,isc.A.buildCriterion=function isc_c_AI_buildCriterion(buildRequest,callback){
        this._wrapAsyncBuildViaAIOperation(this._$asyncBuildCriterion,buildRequest,callback);
    }
,isc.A.asyncBuildCriterion=function isc_c_AI_asyncBuildCriterion(buildRequest){
        return this._asyncDataBoundAIOperation("_asyncBuildCriterion",buildRequest);
    }
,isc.A._asyncBuildCriterion=function isc_c_AI__asyncBuildCriterion(buildRequest,dabOpContext){
        var buildContext=this._createBuildCriterionContext(this._$asyncBuildCriterion,buildRequest,dabOpContext),
            dataSource=buildRequest.dataSource;
        if(!dataSource||!this._supportsAIComponentViews(dataSource,buildContext.mode)){
            buildContext._resolversObj.reject(isc.createErrorResult(this.dataSourceIsRequiredErrorMessage));
        }else{
            this._asyncSummarizeUserMessages(buildContext)
                .then(function(summarizedUserMessages){
                    return isc.AI._asyncBuildCriterionWithSummarizedUserMessages(
                            summarizedUserMessages,buildContext);
                })
                .then(function(criterion){
                    buildContext._resolversObj.resolve({type:"success",criterion:criterion});
                },function(rejectReason){
                    buildContext._resolversObj.reject(isc.defaultAsyncOperationCatchCallback(rejectReason));
                });
        }
        return buildContext._resolversObj.promise;
    }
,isc.A._asyncBuildCriterionWithSummarizedUserMessages=function isc_c_AI__asyncBuildCriterionWithSummarizedUserMessages(summarizedUserMessages,buildContext){
        if(buildContext._ownCC.canceled){
            return Promise.reject(buildContext._ownCC.asCanceledResult());
        }
        var aiMessagesBuilder=isc.InternalAIMessagesBuilder.create({
            userMessages:summarizedUserMessages,
            target:this,
            evalVars:{
                dsSummary:"${dsSummary}",
                advancedCriteriaFormatDescription:this.advancedCriteriaFormatDescription
            }
        });
        if(buildContext.mode=="aiAssist"){
            aiMessagesBuilder.appendPrompts(this.buildCriteriaAIAssistPrompts);
        }else if(buildContext.mode=="AIDE"){
            aiMessagesBuilder.appendPrompts(this.applyAIFilterPrompts);
        }else{
            aiMessagesBuilder.appendPrompts(this.buildCriteriaHybridPrompts);
        }
        var partiallyProcessedAIRequest={
            messages:aiMessagesBuilder.aiMessages,
            responseType:"object"
        };
        var context=this._getContextForRequest(partiallyProcessedAIRequest);
        if(context.errorMessage)return isc.rejectWithError(context.errorMessage);
        var fields=isc.getValues(buildContext.dataSource.getFields());
        var shouldUseFieldPaging=context.aiEngine.shouldUseAIFieldPaging(partiallyProcessedAIRequest,fields,buildContext._aiConfig);
        if(!shouldUseFieldPaging){
            return this._asyncBuildCriterionWithFinalFields(fields,partiallyProcessedAIRequest,buildContext);
        }
        ++buildContext._estimatedNumTotalSteps;
        this._fireAIProgressCallback(buildContext,[{category:"detail",content:isc.AI.willSubsetFieldsDetailMessage}],true);
        return context.aiEngine.asyncRetrieveFieldsForPrompt(
                partiallyProcessedAIRequest,
                "Filter data-records according to the user's description of the filter criteria",
                fields,
                context,
                buildContext._aiConfig)
            .then(function(finalFields){
                ++buildContext._numStepsCompleted;
                isc.AI._fireAIProgressCallback(buildContext,[{category:"success",content:isc.AI.finishedSubsettingFieldsDetailMessage}]);
                return isc.AI._asyncBuildCriterionWithFinalFields(
                        finalFields,partiallyProcessedAIRequest,buildContext);
            });
    }
,isc.A._asyncBuildCriterionWithFinalFields=function isc_c_AI__asyncBuildCriterionWithFinalFields(finalFields,partiallyProcessedAIRequest,buildContext){
        if(buildContext._ownCC.canceled){
            return Promise.reject(buildContext._ownCC.asCanceledResult());
        }
        if(finalFields==null||(finalFields.removeEmpty(),finalFields).isEmpty()){
            return isc.rejectWithError("No fields were selected for use in building the filter criterion.");
        }
        buildContext._dsFinalFields=finalFields;
        var dsSummary=this.summarizeDataSource(buildContext.dataSource,finalFields,buildContext._aiConfig,false);
        buildContext._dsSummary=dsSummary;
        if(buildContext.mode=="AIDE"){
            return Promise.resolve(this._buildAIFilter(buildContext));
        }
        var evalVars={
            dsSummary:dsSummary
        };
        var aiRequest={
            cancellationController:buildContext._ownCC,
            messages:partiallyProcessedAIRequest.messages.map(function(message){
                if(message.source=="system"&&isc.AIEngine._isTextContentType(message.type)){
                    return{
                        source:message.source,
                        content:String(message.content).evalDynamicString(this,evalVars)
                    };
                }
                return message;
            },this),
            responseType:partiallyProcessedAIRequest.responseType
        };
        if(!buildContext._ownCC.canceled&&buildContext._progressDialog)buildContext._progressDialog.show();
        return this.asyncSendRequest(aiRequest,buildContext._aiConfig)
            .then(function(aiResponse){
                ++buildContext._numStepsCompleted;
                isc.AI._fireAIProgressCallback(buildContext);
                var responseObject=aiResponse.message.content;
                if(buildContext.dataSource.isAdvancedCriteria(responseObject)){
                    var maskedCriterion=isc.AI._maskCriterion(responseObject);
                    return isc.AI._asyncValidateAdvancedCriteria(maskedCriterion,buildContext);
                }else if(responseObject.result=="method2"){
                    return isc.AI._buildAIFilter(buildContext);
                }else{
                    return isc.rejectWithError(isc.AI.aiNotAbleToProcessRequestErrorMessage);
                }
            });
    }
,isc.A._asyncValidateAdvancedCriteria=function isc_c_AI__asyncValidateAdvancedCriteria(criterion,buildContext,alreadyRequestedFix){
        var finalFieldsByName=buildContext._dsFinalFields.makeIndex("name"),
            validationErrors=[],
            validatedCriterion=this._validateCriterion(isc.DS.copyCriteria(criterion),
                                        finalFieldsByName,
                                        buildContext.dataSource,
                                        validationErrors);
        if(validatedCriterion&&validationErrors.isEmpty()){
            return Promise.resolve(validatedCriterion);
        }
        if(alreadyRequestedFix){
            return isc.rejectWithError(isc.AI.aiNotAbleToProcessRequestErrorMessage);
        }
        ++buildContext._estimatedNumTotalSteps;
        this._fireAIProgressCallback(buildContext,[{category:"error",content:"AI generated invalid criteria. Will request a fix..."}]);
        var jsonEncoder=isc.JSONEncoder.create({
            dateFormat:"logicalDateString",
            strictQuoting:true
        });
        var aiMessagesBuilder=isc.InternalAIMessagesBuilder.create({
            userMessages:buildContext._summarizedUserMessages,
            target:this,
            evalVars:{
                dsSummary:buildContext._dsSummary,
                encodedCriterion:jsonEncoder.encode(criterion),
                validationErrors:validationErrors.join("\n"),
                encodedValidatedCriterion:validatedCriterion&&jsonEncoder.encode(validatedCriterion)
            }
        });
        aiMessagesBuilder.appendPrompts(this.fixCriterionPrompts);
        var aiRequest={
            messages:aiMessagesBuilder.aiMessages,
            responseType:"object"
        };
        return this.asyncSendRequest(aiRequest,buildContext._aiConfig)
            .then(function(aiResponse){
                ++buildContext._numStepsCompleted;
                isc.AI._fireAIProgressCallback(buildContext);
                var responseObject=aiResponse.message.content;
                if(buildContext.dataSource.isAdvancedCriteria(responseObject)){
                    var maskedCriterion=isc.AI._maskCriterion(responseObject);
                    return isc.AI._asyncValidateAdvancedCriteria(maskedCriterion,buildContext,true);
                }else{
                    return isc.rejectWithError(isc.AI.aiNotAbleToProcessRequestErrorMessage);
                }
            });
    }
,isc.A._maskCriterion=function isc_c_AI__maskCriterion(criterion,allowedCriterionPropertyNames,nested){
        if(criterion.operator=="and"||
            criterion.operator=="or"||
            criterion.operator=="not")
        {
            var subcriteria=criterion.criteria;
            criterion={
                operator:criterion.operator,
                criteria:subcriteria
            };
            if(!isc.isAn.Array(subcriteria))subcriteria=criterion.criteria=[subcriteria];
            for(var i=0;i<subcriteria.length;){
                var subcriterion=subcriteria[i];
                if(subcriterion==null){
                    subcriteria.removeAt(i);
                    continue;
                }
                if(isc.isAn.Array(subcriterion)){
                    subcriteria.addListAt(subcriterion,i);
                    subcriterion=subcriteria[i];
                }
                if(isc.isAn.Object(subcriterion))subcriteria[i]=this._maskCriterion(subcriterion,allowedCriterionPropertyNames,true);
                ++i;
            }
        }else{
            criterion=isc.applyMask(criterion,allowedCriterionPropertyNames||this.allowedCriterionPropertyNames);
        }
        if(!nested)criterion._constructor="AdvancedCriteria";
        return criterion;
    }
,isc.A._validateCriterion=function isc_c_AI__validateCriterion(criterion,finalFieldsByName,dataSource,validationErrors,nested){
        if(!criterion.operator){
            validationErrors.push("A criterion was missing the 'operator'.");
            return null;
        }
        var operatorId=criterion.operator,
            operator=dataSource.getSearchOperator(operatorId);
        if(!operator||!this._allowedOperatorIds.contains(operatorId)){
            validationErrors.push("Operator '"+operatorId+"' is not allowed.");
            return null;
        }
        if(operator.valueType=="none"){
            delete criterion.value;
        }else if(operator.valueType=="criteria"){
            var subcriteria=criterion.criteria;
            if(!isc.isAn.Array(subcriteria))subcriteria=criterion.criteria=[subcriteria];
            for(var i=0;i<subcriteria.length;){
                var subcriterion=subcriteria[i];
                if(subcriterion==null){
                    subcriteria.removeAt(i);
                    continue;
                }
                if(!isc.isAn.Object(subcriterion)){
                    validationErrors.push("A subcriterion was not an object.");
                    subcriteria.removeAt(i);
                    continue;
                }
                var validatedSubcriterion=subcriteria[i]=this._validateCriterion(
                        subcriterion,finalFieldsByName,dataSource,validationErrors,true);
                if(!validatedSubcriterion){
                    subcriteria.removeAt(i);
                    continue;
                }
                ++i;
            }
        }else if(operator.valueType&&operator.valueType!="fieldType"){
            validationErrors.push("Operator '"+operatorId+"' is not allowed because the operator valueType is '"+operator.valueType+"'.");
            return null;
        }else{
            var fieldName=criterion.fieldName;
            if(!fieldName){
                validationErrors.push("The '"+operatorId+"' criterion was missing the 'fieldName'.");
                return null;
            }
            var field=finalFieldsByName[fieldName];
            if(!field){
                validationErrors.push("The '"+operatorId+"' criterion referenced field '"+fieldName+"', but that field is not allowed.");
                return null;
            }
        }
        if(!nested){
            criterion=dataSource.validateCriteria(criterion);
            criterion=this._validateCriterion2(criterion,finalFieldsByName,dataSource,validationErrors);
            criterion=isc.DS.simplifyAdvancedCriteria(criterion,true);
        }
        return criterion;
    }
);
isc.evalBoundary;isc.B.push(isc.A._validateCriterion2=function isc_c_AI__validateCriterion2(criterion,finalFieldsByName,dataSource,validationErrors,nested){
        var operatorId=criterion.operator,
            operator=dataSource.getSearchOperator(operatorId);
        this._assert(operator!=null);
        if(operator.valueType=="criteria"){
            var subcriteria=criterion.criteria;
            this._assert(isc.isAn.Array(subcriteria));
            for(var ri=subcriteria.length;ri>0;--ri){
                var i=ri-1,
                    subcriterion=subcriteria[i];
                var validatedSubcriterion2=subcriteria[i]=this._validateCriterion2(
                        subcriterion,finalFieldsByName,dataSource,validationErrors,true);
                if(!validatedSubcriterion2){
                    subcriteria.removeAt(i);
                }
            }
        }else if("fieldName"in criterion){
            var fieldName=criterion.fieldName,
                field=finalFieldsByName[fieldName];
            var validOps=dataSource.getFieldOperators(field);
            if(!validOps||!validOps.contains(operatorId)){
                validationErrors.push("Operator '"+operatorId+"' is not allowed for field '"+fieldName+"'.");
                return null;
            }
        }
        return criterion;
    }
,isc.A._buildAIFilter=function isc_c_AI__buildAIFilter(buildContext){
        var pkFieldNames=buildContext.dataSource.getPrimaryKeyFieldNames();
        var notPickedPkValues,
            pickedPkValues;
        if(pkFieldNames.length==1){
            notPickedPkValues=isc.Set.create();
            pickedPkValues=isc.Set.create();
        }else{
            notPickedPkValues=isc.TupleSet.create();
            pickedPkValues=isc.TupleSet.create();
        }
        var aiCriterion=buildContext.buildRequest._existingAICriterion;
        if(aiCriterion)isc.AI._clearAICriterionState(aiCriterion);
        else aiCriterion={};
        isc.addProperties(aiCriterion,{
            _constructor:"AdvancedCriteria",
            operator:"aiFilter",
            userAIRequest:buildContext.buildRequest.userAIRequest,
            isTrivial:false,
            _summarizedUserMessages:buildContext._summarizedUserMessages,
            _dsName:buildContext.dataSource.getID(),
            _pkFieldNames:pkFieldNames,
            _finalFieldNames:buildContext._dsFinalFields.getProperty("name"),
            _dsSummary:buildContext._dsSummary,
            _notPickedPkValues:notPickedPkValues,
            _notPickedCriterion:null,
            _pickedPkValues:pickedPkValues,
            _clonable:true,
            clone:isc.AI._aiCriterionCloneImpl
        });
        return aiCriterion;
    }
,isc.A._createApplyAIFilterContext=function isc_c_AI__createApplyAIFilterContext(asyncMethodName,applyRequest,opContext){
        var applyContext=this._createBuildViaAIContext(asyncMethodName,applyRequest,opContext);
        this._assert(applyRequest.aiCriterion.operator=="aiFilter");
        var dsName=applyRequest.aiCriterion&&applyRequest.aiCriterion._dsName;
        applyContext.dataSource=dsName&&isc.DS.get(dsName);
        if(applyRequest.showProgressDialog==true){
            applyContext._progressDialog=isc.FilterViaAIProgressDialog.create(applyRequest.progressDialogProperties,{
                _buildContext:applyContext,
                canCancel:applyRequest.userCanCancel!=false
            });
        }
        this._fireAIProgressCallback(applyContext,[{category:"detail",content:isc.AI.startingYourRequestDetailMessage}]);
        return applyContext;
    }
,isc.A.applyAIFilter=function isc_c_AI_applyAIFilter(applyRequest,callback){
        this._wrapAsyncBuildViaAIOperation(this._$asyncApplyAIFilter,applyRequest,callback);
    }
,isc.A.asyncApplyAIFilter=function isc_c_AI_asyncApplyAIFilter(applyRequest){
        return this._asyncAIOperation("_asyncApplyAIFilter",applyRequest);
    }
,isc.A._asyncApplyAIFilter=function isc_c_AI__asyncApplyAIFilter(applyRequest,opContext){
        if(!applyRequest.aiCriterion||applyRequest.aiCriterion.operator!="aiFilter"){
            return isc.rejectWithError("The 'aiFilter' AdvancedCriteria to evaluate is required.");
        }
        if(!applyRequest.records){
            return isc.rejectWithError("The records to apply the AI filter to are required.");
        }
        var applyContext=this._createApplyAIFilterContext(this._$asyncApplyAIFilter,applyRequest,opContext),
            dataSource=applyContext.dataSource;
        if(!dataSource||!isc.AI._supportsAIComponentViews(dataSource,"AIDE")){
            applyContext._resolversObj.reject(isc.createErrorResult(isc.AI.dataSourceIsRequiredErrorMessage));
        }else{
            var aiCriterion=applyRequest.aiCriterion;
            this._assert(aiCriterion.operator=="aiFilter");
            if(!isc.AI._canUseAICriterion(aiCriterion,dataSource)){
                applyContext._resolversObj.reject(isc.createErrorResult("The 'aiFilter' criterion is not usable."));
            }else{
                this._asyncApplyUsableAICriterion(aiCriterion,applyContext)
                    .then(function(matchingRecords){
                        applyContext._resolversObj.resolve({type:"success",matchingRecords:matchingRecords});
                    },function(rejectReason){
                        applyContext._resolversObj.reject(isc.defaultAsyncOperationCatchCallback(rejectReason));
                    });
            }
        }
        return applyContext._resolversObj.promise;
    }
,isc.A._asyncApplyUsableAICriterion=function isc_c_AI__asyncApplyUsableAICriterion(aiCriterion,applyContext){
        var records=applyContext.applyRequest.records,
            partialResult=applyContext.applyRequest._partialResult||isc.AI._applyUsableAIFilterCaches(aiCriterion,records,applyContext.dataSource);
        this._assert(partialResult&&
                     isc.isAn.Array(partialResult.matchingRecords)&&
                     partialResult.matchingRecords.length+(partialResult.remainingRecords==null
                                                             ?0
                                                             :partialResult.remainingRecords.length)==records.length);
        if(!partialResult.remainingRecords||partialResult.remainingRecords.length==0){
            return Promise.resolve(partialResult.matchingRecords);
        }
        return this.__asyncApplyAIFilter(partialResult,aiCriterion,applyContext);
    }
,isc.A.__asyncApplyAIFilter=function isc_c_AI___asyncApplyAIFilter(partialResult,aiCriterion,applyContext){
        if(applyContext._ownCC.canceled){
            return Promise.reject(applyContext._ownCC.asCanceledResult());
        }
        var aiMessagesBuilder=isc.InternalAIMessagesBuilder.create({
            userMessages:aiCriterion._summarizedUserMessages,
            target:this,
            evalVars:{dsSummary:aiCriterion._dsSummary}
        });
        aiMessagesBuilder.appendPrompts(this.applyAIFilterPrompts);
        var aiMessages=aiMessagesBuilder.aiMessages;
        var data=partialResult.remainingRecords,
            dataLength=data.getLength(),
            resolversObj=Promise.withResolvers();
        var recordsPickingProgressCallback=function(){
            if(applyContext._ownCC.canceled){
                return false;
            }
            ++applyContext._numStepsCompleted;
            isc.AI._fireAIProgressCallback(applyContext,null,true);
        };
        var recordsPickingSettings={
            fieldNames:aiCriterion._finalFieldNames,
            aiPageSize:applyContext.applyRequest.aiPageSize,
            maxRetries:applyContext._aiConfig.maxRetries,
            serializationFormat:applyContext._aiConfig.serializationFormat,
            progressCallback:recordsPickingProgressCallback
        };
        var context=this._getContextForAIMessages(aiMessages);
        if(context.errorMessage)return isc.rejectWithError(context.errorMessage);
        var transaction=context.aiEngine.doPageRecordsPicking(aiMessages,data,function(pickedData,batches){
            if(applyContext._ownCC.canceled)return;
            var firstBadBatch=batches.find({_constructor:"AdvancedCriteria",fieldName:"nonSuccessfulResult",operator:"notNull"});
            if(firstBadBatch){
                resolversObj.reject(firstBadBatch.nonSuccessfulResult);
                return;
            }
            partialResult.matchingRecords.addAll(pickedData);
            var pkFieldNames=aiCriterion._pkFieldNames;
            var notPickedPkValues=aiCriterion._notPickedPkValues,
                notPickedCriteria=null,
                pickedPkValues=aiCriterion._pickedPkValues;
            if(pkFieldNames.length==1){
                var pkFieldName=pkFieldNames[0];
                for(var i=0;i<pickedData.length;++i){
                    pickedPkValues.add(pickedData[i][pkFieldName]);
                }
                for(var i=0;i<dataLength;++i){
                    var pkValue=data.get(i)[pkFieldName];
                    if(!pickedPkValues.has(pkValue)){
                        notPickedPkValues.add(pkValue);
                    }
                }
                if(!notPickedPkValues.isEmpty()){
                    notPickedCriteria={
                        _constructor:"AdvancedCriteria",
                        fieldName:pkFieldName,
                        operator:"notInSet",
                        value:notPickedPkValues.getContents()
                    };
                }
            }else{
                isc.AI._assert(false);
            }
            aiCriterion._notPickedCriterion=notPickedCriteria;
            isc.AI._fireAIProgressCallback(applyContext,null,true);
            resolversObj.resolve(partialResult.matchingRecords);
        },recordsPickingSettings);
        var numBatches=transaction.batches.length;
        applyContext._estimatedNumTotalSteps+=numBatches;
        this._fireAIProgressCallback(applyContext,[{category:"detail",content:"AI will evaluate the criteria in "+numBatches+" batch(es) of records."}],true);
        return resolversObj.promise;
    }
,isc.A.removeFromAIFilterCaches=function isc_c_AI_removeFromAIFilterCaches(aiCriterion,records){
        if(aiCriterion.operator!="aiFilter"){
            this.logWarn("The AdvancedCriteria passed to removeFromAIFilterCaches() has operator '"+
                    aiCriterion.operator+"'; expecting 'aiFilter'.","AI");
            return;
        }
        var pkFieldNames=aiCriterion._pkFieldNames,
            notPickedPkValues=aiCriterion._notPickedPkValues,
            pickedPkValues=aiCriterion._pickedPkValues;
        if(!isc.isA.Class(notPickedPkValues)){
            notPickedPkValues=aiCriterion._notPickedPkValues=null;
            aiCriterion._notPickedCriterion=null;
        }
        if(!isc.isA.Class(pickedPkValues)){
            pickedPkValues=aiCriterion._pickedPkValues=null;
        }
        if(!isc.isAn.Array(pkFieldNames))return;
        if(pkFieldNames.length==1){
            var pkFieldName=pkFieldNames[0];
            if(isc.isA.Class(notPickedPkValues)){
                var removedAnyNotPicked=false;
                for(var recordIndex=0;recordIndex<records.length;++recordIndex){
                    if(notPickedPkValues.remove(records[recordIndex][pkFieldName]))removedAnyNotPicked=true;
                }
                if(removedAnyNotPicked){
                    aiCriterion._notPickedCriterion={
                        _constructor:"AdvancedCriteria",
                        fieldName:pkFieldName,
                        operator:"notInSet",
                        value:notPickedPkValues.getContents()
                    };
                }
            }
            if(isc.isA.Class(pickedPkValues)){
                for(var recordIndex=0;recordIndex<records.length;++recordIndex){
                    pickedPkValues.remove(records[recordIndex][pkFieldName]);
                }
            }
        }else{
            this._assert(false);
        }
    }
,isc.A.clearAIFilterCaches=function isc_c_AI_clearAIFilterCaches(aiCriterion){
        if(aiCriterion.operator!="aiFilter"){
            this.logWarn("The AdvancedCriteria passed to clearAIFilterCaches() has operator '"+
                    aiCriterion.operator+"'; expecting 'aiFilter'.","AI");
            return;
        }
        if(isc.isA.Class(aiCriterion._notPickedPkValues)){
            aiCriterion._notPickedPkValues.clear();
        }
        aiCriterion._notPickedPkValues=null;
        aiCriterion._notPickedCriterion=null;
        if(isc.isA.Class(aiCriterion._pickedPkValues)){
            aiCriterion._pickedPkValues.clear();
        }
        aiCriterion._pickedPkValues=null;
    }
,isc.A.asyncReapplyAIFilter=function isc_c_AI_asyncReapplyAIFilter(reapplyRequest){
        if(!reapplyRequest.aiCriterion||reapplyRequest.aiCriterion.operator!="aiFilter"){
            return isc.rejectWithError("The 'aiFilter' AdvancedCriteria to re-apply is required.");
        }
        if(!isc.isAn.Array(reapplyRequest.updatedRecords)){
            return isc.rejectWithError("The updated records are required.");
        }
        this.removeFromAIFilterCaches(reapplyRequest.aiCriterion,reapplyRequest.updatedRecords);
        var applyRequest=isc.addProperties({},reapplyRequest,{
            showProgressDialog:reapplyRequest.showProgressDialog!=true,
            records:reapplyRequest.updatedRecords,
            updatedRecords:null
        });
        return this.asyncApplyAIFilter(applyRequest)
            .then(function(response){
                response.matchingUpdatedRecords=response.matchingRecords;
                delete response.matchingRecords;
                return response;
            });
    }
,isc.A._createBuildHilitesContext=function isc_c_AI__createBuildHilitesContext(asyncMethodName,buildRequest,dabOpContext){
        var buildContext=this._createBuildViaAIContext(asyncMethodName,buildRequest,dabOpContext);
        buildContext.dataSource=dabOpContext.dataSource;
        var mode=buildRequest.mode;
        if(mode==null)mode="hybrid";
        else if(mode!="aiAssist"&&mode!="AIDE"&&mode!="hybrid"){
            this.logWarn("unsupported AI service mode '"+mode+"'. Switching to 'hybrid'.");
            mode="hybrid";
        }
        buildContext.mode=mode;
        if(buildRequest.showProgressDialog==null||buildRequest.showProgressDialog){
            buildContext._progressDialog=isc.HiliteViaAIProgressDialog.create(buildRequest.progressDialogProperties,{
                _buildContext:buildContext,
                canCancel:buildRequest.userCanCancel!=false
            });
        }
        buildContext._estimatedNumTotalSteps=2;
        this._fireAIProgressCallback(buildContext,[{category:"detail",content:isc.AI.startingYourRequestDetailMessage}]);
        return buildContext;
    }
,isc.A.buildHilites=function isc_c_AI_buildHilites(buildRequest,callback){
        this._wrapAsyncBuildViaAIOperation(this._$asyncBuildHilites,buildRequest,callback);
    }
,isc.A.asyncBuildHilites=function isc_c_AI_asyncBuildHilites(buildRequest){
        return this._asyncDataBoundAIOperation("_asyncBuildHilites",buildRequest);
    }
,isc.A._asyncBuildHilites=function isc_c_AI__asyncBuildHilites(buildRequest,dabOpContext){
        var buildContext=this._createBuildHilitesContext(this._$asyncBuildHilites,buildRequest,dabOpContext),
            dataSource=buildContext.dataSource;
        if(!dataSource||!isc.AI._supportsAIComponentViews(dataSource,buildContext.mode)){
            buildContext._resolversObj.reject(isc.createErrorResult(isc.AI.dataSourceIsRequiredErrorMessage));
        }else{
            this._asyncSummarizeUserMessages(buildContext)
                .then(function(summarizedUserMessages){
                    return isc.AI._asyncBuildHilitesWithSummarizedUserMessages(
                            summarizedUserMessages,buildContext);
                })
                .then(function(hilites){
                    buildContext._resolversObj.resolve({type:"success",hilites:hilites});
                },function(rejectReason){
                    buildContext._resolversObj.reject(isc.defaultAsyncOperationCatchCallback(rejectReason));
                });
        }
        return buildContext._resolversObj.promise;
    }
,isc.A._extendColorMap=function isc_c_AI__extendColorMap(){
        var colorMap=this._cssColorForColorName;
        colorMap.lightgrey=colorMap.lightgray;
        colorMap.grey=colorMap.gray;
        colorMap.darkgrey=colorMap.darkgray;
        colorMap.silver=colorMap.gray;
        colorMap.platinum=colorMap.lightgray;
    }
,isc.A._asyncBuildHilitesWithSummarizedUserMessages=function isc_c_AI__asyncBuildHilitesWithSummarizedUserMessages(summarizedUserMessages,buildContext){
        if(buildContext._ownCC.canceled){
            return Promise.reject(buildContext._ownCC.asCanceledResult());
        }
        var fields=isc.getValues(buildContext.dataSource.getFields());
        var aiMessagesBuilder=isc.InternalAIMessagesBuilder.create({
            cancellationController:buildContext._ownCC,
            userMessages:summarizedUserMessages,
            target:this,
            evalVars:{
                dsSummary:"${dsSummary}"
            }
        });
        aiMessagesBuilder.appendPrompts(this.buildHilitesPrompts);
        var partiallyProcessedAIRequest={
            messages:aiMessagesBuilder.aiMessages,
            responseType:"object"
        };
        return this._asyncBuildHilitesWithFinalFields(buildContext,partiallyProcessedAIRequest,fields);
    }
,isc.A._asyncBuildHilitesWithFinalFields=function isc_c_AI__asyncBuildHilitesWithFinalFields(buildContext,partiallyProcessedAIRequest,finalFields){
        if(buildContext._ownCC.canceled){
            return Promise.reject(buildContext._ownCC.asCanceledResult());
        }
        if(finalFields==null||(finalFields.removeEmpty(),finalFields).isEmpty()){
            return isc.rejectWithError("No fields were selected for use in building the Hilite.");
        }
        buildContext._dsFinalFields=finalFields;
        var dsSummary=this.summarizeDataSource(buildContext.dataSource,finalFields,buildContext._aiConfig,false);
        buildContext._dsSummary=dsSummary;
        var evalVars={
            dsSummary:dsSummary
        };
        var aiRequest={
            cancellationController:buildContext._ownCC,
            messages:partiallyProcessedAIRequest.messages.map(function(message){
                if(message.source=="system"&&isc.AIEngine._isTextContentType(message.type)){
                    return{
                        source:message.source,
                        content:String(message.content).evalDynamicString(this,evalVars)
                    };
                }
                return message;
            },this),
            responseType:partiallyProcessedAIRequest.responseType
        };
        if(!buildContext._ownCC.canceled&&buildContext._progressDialog)buildContext._progressDialog.show();
        return this.asyncSendRequest(aiRequest,buildContext._aiConfig)
            .then(function(aiResponse){
                var responseArr=aiResponse.message.content&&aiResponse.message.content.hilites;
                if(!isc.isAn.Array(responseArr)){
                    if(isc.isAn.Object(responseArr)){
                        responseArr=[responseArr];
                    }else{
                        return isc.rejectWithError(isc.AI.aiNotAbleToProcessRequestErrorMessage);
                    }
                }
                for(var ri=responseArr.length;ri>0;--ri){
                    var i=ri-1,
                        responseObject=responseArr[i];
                    if(!isc.isAn.Object(responseObject)||
                        !isc.isA.String(responseObject.filterDescription)||
                        !isc.isA.String(responseObject.hiliteDescription)||
                        !responseObject.filterDescription.trim()||
                        !responseObject.hiliteDescription.trim())
                    {
                        responseArr.removeAt(i);
                    }
                }
                if(responseArr.isEmpty()){
                    return isc.rejectWithError(isc.AI.aiNotAbleToProcessRequestErrorMessage);
                }
                var numResponseObjects=responseArr.length;
                ++buildContext._numStepsCompleted;
                isc.AI._fireAIProgressCallback(buildContext,[{category:"success",content:"AI has determined the hilite styling and field(s) that should be hilited, for "+numResponseObjects+" hilite(s)."},
                                                            {category:"detail",content:"Will now validate the hilite and apply the hilite criteria\u2026"}]);
                var mapper=isc.ResolvedValuesMapper.create({
                    values:responseArr,
                    cancellationController:buildContext._ownCC,
                    maxConcurrent:3,
                    asyncMap:function(responseObject){
                        return isc.AI._asyncValidateAndFinishHilite(buildContext,responseObject);
                    }
                });
                return mapper.getPromise();
            });
    }
,isc.A._makeLikelyCSSColorRegExp=function isc_c_AI__makeLikelyCSSColorRegExp(){
        var regExpSrc="\\b(?:"+this._cssColorNames.map(RegExp._escape).join("|")+")\\b";
        regExpSrc+="|#[a-f\\d]{3}(?:[a-f\\d](?:[a-f\\d]{2}(?:[a-f\\d]{2})?)?)?\\b";
        var numberOrPercentageRegExpSrc="(?:[-+]?\\d+(?:\\.\\d*)?(?:[Ee][-+]?\\d+)?%?)";
        regExpSrc+="|rgba?\\(\\s*"+numberOrPercentageRegExpSrc+"\\s*,?"+
                "\\s*"+numberOrPercentageRegExpSrc+"\\s*,?"+
                "\\s*"+numberOrPercentageRegExpSrc+
                "(?:\\s*,\\s*"+numberOrPercentageRegExpSrc+")?\\)";
        this._likelyCSSColorRegExp=new RegExp(regExpSrc);
    }
,isc.A._extractLikelyCSSColor=function isc_c_AI__extractLikelyCSSColor(color){
        this._likelyCSSColorRegExp.lastIndex=0;
        var result=this._likelyCSSColorRegExp.exec(color);
        return result&&result[0];
    }
,isc.A._validateCSSColor=function isc_c_AI__validateCSSColor(responseObject,colorPropertyName){
        var colorText=responseObject[colorPropertyName];
        if(!isc.isA.String(colorText)){
            delete responseObject[colorPropertyName];
            return;
        }
        colorText=colorText.trim().toLowerCase();
        var cssColor;
        for(var namesRegExp=new RegExp("[a-z]+","g"),result=namesRegExp.exec(colorText);result;result=namesRegExp.exec(colorText)){
            cssColor=this._cssColorForColorName[result[0]];
            if(cssColor){
                break;
            }
        }
        if(!cssColor){
            cssColor=this._extractLikelyCSSColor(colorText);
        }
        if(!cssColor)delete responseObject[colorPropertyName];
        else responseObject[colorPropertyName]=cssColor;
    }
,isc.A._removeCSSComments=function isc_c_AI__removeCSSComments(cssText){
        var slashStarPos=0;
        do{
            slashStarPos=cssText.indexOf("/*",slashStarPos);
            if(slashStarPos<0)return cssText;
            var starSlashPos=cssText.indexOf("*/",slashStarPos+1);
            if(starSlashPos<0){
                return cssText.substring(0,slashStarPos);
            }
            cssText=cssText.substring(0,slashStarPos)+cssText.substring(starSlashPos+2);
        }while(slashStarPos<cssText.length);
        return cssText;
    }
,isc.A._removeCSSProperty=function isc_c_AI__removeCSSProperty(cssText,cssPropertyName,responseObject,responseObjectPropertyName){
        var value;
        var regExp=new RegExp("[\\s;]*"+RegExp._escape(cssPropertyName)+"\\s*:([^;]*)[\\s;]*","gim");
        var result;
        while(result=regExp.exec(cssText)){
            value=result[1]+" "+(value||"");
            var firstPart=cssText.substring(0,regExp.lastIndex-result[0].length),
                lastPart=cssText.substring(regExp.lastIndex),
                sep=!firstPart||!lastPart?"":";";
            cssText=firstPart+sep+lastPart;
            regExp.lastIndex-=result[0].length;
        }
        responseObject[responseObjectPropertyName]=(responseObject[responseObjectPropertyName]||"")+" "+value;
        return cssText;
    }
,isc.A._asyncValidateAndFinishHilite=function isc_c_AI__asyncValidateAndFinishHilite(buildContext,responseObject){
        if(responseObject.fieldName!=null){
            if(!isc.isAn.Array(responseObject.fieldName))responseObject.fieldName=[responseObject.fieldName];
            for(var ri=responseObject.fieldName.length;ri>0;--ri){
                var i=ri-1,
                    fieldName=responseObject.fieldName[i];
                if(!buildContext._dsFinalFields.find("name",fieldName)){
                    isc.logWarn("AI selected an invalid field '"+fieldName+"'. Deleting...","AI");
                    responseObject.fieldName.removeAt(i);
                }
            }
            if(responseObject.fieldName.isEmpty())delete responseObject.fieldName;
            else if(responseObject.fieldName.length==1)responseObject.fieldName=responseObject.fieldName[0];
        }
        if(!isc.isA.String(responseObject.cssText)){
            delete responseObject.cssText;
        }else{
            responseObject.cssText=this._removeCSSComments(responseObject.cssText);
            responseObject.cssText=this._removeCSSProperty(responseObject.cssText,"color",responseObject,"textColor");
            responseObject.cssText=this._removeCSSProperty(responseObject.cssText,"background-color",responseObject,"backgroundColor");
            responseObject.cssText=this._removeCSSProperty(responseObject.cssText,"text-decoration-color",responseObject,"_textDecorationColor");
            this._validateCSSColor(responseObject,"_textDecorationColor");
            if(responseObject._textDecorationColor){
                if(responseObject.cssText)responseObject.cssText+="; ";
                responseObject.cssText+="text-decoration-color: "+responseObject._textDecorationColor;
            }
        }
        this._validateCSSColor(responseObject,"textColor");
        this._validateCSSColor(responseObject,"backgroundColor");
        if(!responseObject.textColor){
            if(!responseObject.backgroundColor){
                responseObject.textColor=this._cssColorForColorName["red"];
            }else{
                if(isc.ColorUtils.isDark(responseObject.backgroundColor)){
                    responseObject.textColor="#fff";
                }
            }
        }
        var buildHiliteCriterionRequest={
            cancellationController:buildContext._ownCC,
            userAIRequest:{prompt:responseObject.filterDescription},
            dataSource:buildContext.dataSource,
            mode:buildContext.mode,
            maxRetries:buildContext.buildRequest.maxRetries,
            showProgressDialog:false
        };
        return isc.AI.asyncBuildCriterion(buildHiliteCriterionRequest)
            .then(function(buildHiliteCriterionResponse){
                var hilite=isc.applyMask(responseObject,
                    ["backgroundColor","textColor","cssText","fieldName","replacementValue"]);
                var hiliteCriterion=buildHiliteCriterionResponse.criterion;
                hilite.criteria=hiliteCriterion;
                if(hiliteCriterion.operator!="aiFilter")return hilite;
                var applyRequest={
                    cancellationController:buildContext._ownCC,
                    aiCriterion:hiliteCriterion,
                    dataSource:buildContext.dataSource,
                    mode:buildContext.mode,
                    records:buildContext.buildRequest.records,
                    maxRetries:buildContext.buildRequest.maxRetries,
                    showProgressDialog:false
                };
                return isc.AI.asyncApplyAIFilter(applyRequest)
                    .then(Promise.resolve(hilite));
            });
    }
,isc.A._validateAIBuiltUI=function isc_c_AI__validateAIBuiltUI(buildContext){
        var buildRequest=buildContext.buildRequest;
        var validationTypes=buildContext._validationTypes,
            validationTypeIndex=buildContext._validationTypeIndex,
            currentValidationType;
        var setUpNextValidator=function(){
            buildContext.appliedValidationTypes.add(currentValidationType);
            validationTypeIndex=buildContext._validationTypeIndex=validationTypeIndex+1;
            buildContext._validationRetryIndex=0;
            buildContext._validationContext=null;
            ++buildContext._numStepsCompleted;
            isc.AI._fireAIProgressCallback(buildContext,[{category:"success",content:"Finished applying '"+currentValidationType+"' validation"}]);
        };
        for(
            ;
            validationTypeIndex<validationTypes.length;
            setUpNextValidator()
        ){
            if(buildContext._ownCC.canceled){
                buildContext._validationResolversObj.reject(buildContext._ownCC.asCanceledResult());
                return;
            }
            currentValidationType=validationTypes[validationTypeIndex];
            var validationRetryIndex=Math.max(0,+buildContext._validationRetryIndex);
            if(isNaN(validationRetryIndex))validationRetryIndex=buildContext._validationRetryIndex=0;
            var maxValidationRetries=Math.max(0,buildRequest.maxValidationRetries==null?1:buildRequest.maxValidationRetries);
            if(isNaN(maxValidationRetries))maxValidationRetries=1;
            if(validationRetryIndex>maxValidationRetries){
                buildContext._validationResolversObj.reject(isc.createErrorResult(
                    "Exceeded the maximum number of retries ("+maxValidationRetries+") for '"+currentValidationType+"' validation."
                ));
                return;
            }
            var validator;
            if(currentValidationType=="custom"){
                validator=buildRequest.customValidator;
                this._assert(validator!=null);
            }else if(currentValidationType=="default"){
                validator={target:this,methodName:"buildUIViaAIDefaultValidator"};
            }
            if(validator==null){
                this.logWarn("validateAIBuiltUI(): Unhandled validation type '"+currentValidationType+"'");
                continue;
            }
            this.fireCallback(validator,isc.AI._buildUIViaAIValidatorArgNames,[
                buildContext,
                buildContext._validationContext,
                function(workingResponse,validationContext){
                    var jsCode=String.prototype.trim.call(workingResponse.jsCode||"");
                    buildContext.jsCode=jsCode;
                    buildContext.nodes=workingResponse.nodes;
                    buildContext._validationContext=validationContext;
                    var errorMessage=workingResponse.errorMessage;
                    if(errorMessage!=null){
                        isc.AI.logDebug("validateAIBuiltUI(): validation type '"+currentValidationType+"' failed: "+errorMessage,"AI");
                        errorMessage="Validation type '"+currentValidationType+"' failed: "+errorMessage;
                        if(jsCode==""){
                            buildContext._validationResolversObj.reject(isc.createErrorResult(
                                "Validation type '"+currentValidationType+"' failed: "+errorMessage
                            ));
                            return;
                        }
                        ++buildContext._validationRetryIndex;
                        if(buildContext._validationRetryIndex<=maxValidationRetries){
                            try{
                                if(!new RegExp("\\p{P}$","u").test(errorMessage))errorMessage+=".";
                            }catch(e){}
                            if(!/\s$/.test(errorMessage))errorMessage+=" ";
                            errorMessage+="Will retry\u2026";
                        }
                        isc.AI._fireAIProgressCallback(buildContext,[{category:"recoverableError",content:errorMessage}]);
                    }else{
                        setUpNextValidator();
                    }
                    isc.AI._validateAIBuiltUI(buildContext);
                }
            ]);
            return;
        }
        buildContext._validationResolversObj.resolve({
            type:"success",
            jsCode:buildContext.jsCode,
            nodes:buildContext.nodes
        });
    }
,isc.A._getPaletteNodesAndValidationResult=function isc_c_AI__getPaletteNodesAndValidationResult(jsCode,handleErrorCallback,continueCallback){
        var callback=function(nodes,topLevelNodes){
            var validationResult;
            try{
                validationResult=isc.EditContext.validatePaletteNodeDefaults(topLevelNodes);
            }catch(e){
                handleErrorCallback(e);
                return;
            }
            continueCallback(nodes,validationResult);
        };
        isc.EditContext.createPaletteNodesFromJS2(jsCode,callback);
    }
,isc.A.buildUIViaAIDefaultValidator=function isc_c_AI_buildUIViaAIDefaultValidator(buildContext,validationContext,validationResultCallback){
        var _this=this;
        var fireValidationResultCallback=function(workingResponse){
            _this.fireCallback(validationResultCallback,isc.AI._buildUIViaAIValidationResultCallbackArgNames,[workingResponse,validationContext]);
        };
        if(isc.EditContext==null){
            return fireValidationResultCallback({
                jsCode:buildContext.jsCode,
                nodes:buildContext.nodes
            });
        }
        if(validationContext==null){
            validationContext={
                prevJsCode:[],
                prevValidationResults:[]
            };
        }
        this._getPaletteNodesAndValidationResult(
            buildContext.jsCode,
            function(e){
                _this.logWarn("buildUIViaAIDefaultValidator(): Error attempting to validate AI-built code: "+e);
                fireValidationResultCallback({
                    errorMessage:"Attempting to validate AI-generated JavaScript caused an error: "+e
                });
            },
            function(nodes,validationResult){
                validationContext.prevJsCode.add(buildContext.jsCode);
                validationContext.prevValidationResults.add(validationResult);
                if(validationResult==null||isc.isAn.emptyObject(validationResult)){
                    return fireValidationResultCallback({
                        jsCode:buildContext.jsCode,
                        nodes:nodes
                    });
                }else{
                    _this.requestUICodeValidationFix(
                        buildContext,
                        validationContext,
                        validationResult,
                        validationResultCallback
                    );
                    return;
                }
            }
        );
    }
,isc.A.requestUICodeValidationFix=function isc_c_AI_requestUICodeValidationFix(buildContext,validationContext,validationResult,validationResultCallback){
        var fireValidationResultCallback=function(workingResponse){
            isc.AI.fireCallback(validationResultCallback,isc.AI._buildUIViaAIValidationResultCallbackArgNames,[workingResponse,validationContext]);
        };
        var fireValidationResultCallbackWithError=function(error){
            fireValidationResultCallback({
                type:"error",
                errorMessage:error,
                jsCode:buildContext.jsCode
            });
        };
        var aiMessagesBuilder=isc.InternalAIMessagesBuilder.create({
            userMessages:buildContext._summarizedUserMessages,
            target:this,
            evalVars:{
                jsCode:buildContext.jsCode,
                errors:this._encodeJSON(validationResult)
            }
        });
        aiMessagesBuilder.appendPrompts(this.uiCodeValidationPrompts);
        aiMessagesBuilder.appendPrompts(this.uiCodeSuffixPrompts);
        var aiRequest={
            cancellationController:buildContext._ownCC,
            messages:aiMessagesBuilder.aiMessages
        };
        this.asyncSendRequest(aiRequest,buildContext._aiConfig)
            .then(function(aiResponse){
                var content=aiResponse.message.content||"";
                var newJsCode=String.prototype.trim.call(isc.AI.extractFencedCode(content));
                if(newJsCode==""){
                    return fireValidationResultCallbackWithError("AI returned no UI code in response to the request to generate corrected code.");
                }
                isc.AI._getPaletteNodesAndValidationResult(
                    newJsCode,
                    function(e){
                        isc.AI.logWarn("requestUICodeValidationFix(): Error attempting to validate AI-built code: "+e);
                        return fireValidationResultCallbackWithError("Attempting to validate AI-generated JavaScript caused an error: "+e);
                    },
                    function(newNodes,newValidationResult){
                        if(newValidationResult==null||isc.isAn.emptyObject(newValidationResult)){
                            return fireValidationResultCallback({
                                jsCode:newJsCode,
                                nodes:newNodes
                            });
                        }else{
                            fireValidationResultCallback({jsCode:newJsCode,errorMessage:"AI returned code that failed validation. A request was made to correct the code."});
                        }
                    }
                );
            },function(rejectReason){
                var aiResponse=isc.defaultAsyncOperationCatchCallback(rejectReason);
                if(aiResponse.type=="canceled"){
                    var cancellationReason="An AI request was canceled. ";
                    if(aiResponse.cancellationReason)cancellationReason+=aiResponse.cancellationReason;
                    fireValidationResultCallback({type:aiResponse.type,cancellationReason:cancellationReason});
                    return;
                }
                fireValidationResultCallbackWithError("An AI request failed: "+aiResponse.errorMessage);
            });
    }
);
isc.evalBoundary;isc.B.push(isc.A._createBuildUIViaAIContext=function isc_c_AI__createBuildUIViaAIContext(asyncMethodName,buildRequest,opContext){
        var buildContext=this._createBuildViaAIContext(asyncMethodName,buildRequest,opContext);
        var validationTypes=buildRequest._validationTypes;
        if(validationTypes==null){
            validationTypes=isc.AI.defaultBuildUIViaAIValidationTypes;
        }
        if(buildRequest.customValidator==null){
            if(validationTypes.contains("custom")){
                validationTypes=validationTypes.duplicate();
                validationTypes.remove("custom");
            }
        }else{
            if(!validationTypes.contains("custom")){
                validationTypes=validationTypes.duplicate();
                validationTypes.add("custom");
            }
        }
        buildContext._validationTypes=validationTypes;
        buildContext.appliedValidationTypes=[];
        buildContext._validationTypeIndex=0;
        buildContext._validationRetryIndex=0;
        buildContext._validationContext=null;
        buildContext._validationResolversObj=Promise.withResolvers();
        buildContext._estimatedNumTotalSteps=2+validationTypes.length;
        if(buildRequest.showProgressDialog==null||buildRequest.showProgressDialog){
            buildContext._progressDialog=isc.BuildUIViaAIProgressDialog.create({
                _buildContext:buildContext,
                canCancel:buildRequest.userCanCancel!=false
            });
            buildContext._progressDialog.show();
        }
        this._fireAIProgressCallback(buildContext,[{category:"detail",content:isc.AI.startingYourRequestDetailMessage}]);
        return buildContext;
    }
,isc.A.buildDataBoundUI=function isc_c_AI_buildDataBoundUI(buildRequest,callback){
        this._wrapAsyncBuildViaAIOperation(this._$asyncBuildDataBoundUI,buildRequest,callback);
    }
,isc.A.asyncBuildDataBoundUI=function isc_c_AI_asyncBuildDataBoundUI(buildRequest){
        return this._asyncAIOperation("_asyncBuildDataBoundUI",buildRequest);
    }
,isc.A._asyncBuildDataBoundUI=function isc_c_AI__asyncBuildDataBoundUI(buildRequest,opContext){
        var errorMessage;
        var buildContext=this._createBuildUIViaAIContext(this._$asyncBuildDataBoundUI,buildRequest,opContext);
        var dataSourceNames=buildRequest.availableDataSources||isc.AI.getDataSourceNames();
        if(dataSourceNames==null){
            errorMessage=isc.AI.noDataSourcesAvailableOrFoundErrorMessage;
        }else{
            if(!isc.isAn.Array(dataSourceNames))dataSourceNames=[dataSourceNames];
            var dataSources=dataSourceNames.map(function(dsName){
                return isc.DS.get(dsName);
            });
            dataSources.removeEmpty();
            if(dataSources.isEmpty()){
                errorMessage=isc.AI.noDataSourcesAvailableOrFoundErrorMessage;
            }else{
                buildContext._dataSources=dataSources;
            }
        }
        var uiTypeInfos,
            uiTypes;
        if(errorMessage==null){
            uiTypeInfos=this.dataBoundUITypeInfos;
            if(buildRequest.allowedUITypes!=null){
                uiTypeInfos=isc.applyMask(uiTypeInfos,buildRequest.allowedUITypes);
                uiTypes=isc.getKeys(uiTypeInfos);
                if(uiTypes.length!=buildRequest.allowedUITypes.length){
                    var unknownUITypes=buildRequest.allowedUITypes.duplicate();
                    unknownUITypes.removeList(uiTypes);
                    errorMessage="buildDataBoundUI() was passed unknown data-bound UI type(s): "+unknownUITypes;
                }
            }else{
                uiTypes=isc.getKeys(uiTypeInfos);
            }
            if(uiTypes.isEmpty()){
                errorMessage="At least one UI type must be allowed.";
            }
        }
        buildContext._uiTypes=uiTypes;
        buildContext._uiTypeInfos=uiTypeInfos;
        if(errorMessage!=null){
            buildContext._resolversObj.reject(isc.createErrorResult(errorMessage));
        }else{
            this._asyncSummarizeUserMessages(buildContext)
                .then(function(summarizedUserMessages){
                    return isc.AI._asyncBuildDataBoundUIWithSummarizedUserMessages(
                            summarizedUserMessages,buildContext);
                })
                .then(buildContext._resolversObj.resolve,function(rejectReason){
                    buildContext._resolversObj.reject(isc.defaultAsyncOperationCatchCallback(rejectReason));
                });
        }
        return buildContext._resolversObj.promise;
    }
,isc.A._asyncBuildDataBoundUIWithSummarizedUserMessages=function isc_c_AI__asyncBuildDataBoundUIWithSummarizedUserMessages(summarizedUserMessages,buildContext){
        if(buildContext._ownCC.canceled){
            return Promise.reject(buildContext._ownCC.asCanceledResult());
        }
        var dataSources=buildContext._dataSources,
            uiTypeInfos=buildContext._uiTypeInfos,
            uiTypes=buildContext._uiTypes;
        this._assert(!dataSources.isEmpty());
        this._assert(!uiTypes.isEmpty());
        var responseExample={
            component:uiTypes[0]
        };
        var mustChooseDS=(dataSources.length>1);
        if(mustChooseDS){
            responseExample.dataSource="someDataSourceID";
        }
        var uiTypeDescriptions="";
        for(var i=0;i<uiTypes.length;++i){
            var uiType=uiTypes[i];
            uiTypeDescriptions+="\n\""+uiType+"\": "+uiTypeInfos[uiType].description;
        }
        var evalVars={
            uiTypeDescriptions:uiTypeDescriptions,
            uiTypes:this._encodeJSON(uiTypes),
            responseExample:this._encodeJSON(responseExample)
        };
        if(mustChooseDS){
            var descriptions={};
            for(var i=0;i<dataSources.length;i++){
                var dataSource=dataSources[i];
                descriptions[dataSource.ID]=this.getShortDSDescription(dataSource);
            }
            evalVars.dsDescriptions=this._encodeJSON(descriptions);
            evalVars.dsIDs=this._encodeJSON(dataSources.getProperty("ID"));
        }
        var aiMessagesBuilder=isc.InternalAIMessagesBuilder.create({
            userMessages:summarizedUserMessages,
            target:this,
            evalVars:evalVars
        });
        aiMessagesBuilder.appendPrompts(this.dataBoundUIInitiatorPrefixPrompts);
        aiMessagesBuilder.appendPrompt(this.dataBoundUIInitiatorPrompt_UIOptions);
        if(mustChooseDS){
            aiMessagesBuilder.appendPrompt(this.dataBoundUIInitiatorPrompt_DSOptions);
        }
        aiMessagesBuilder.appendPrompt(this.dataBoundUIInitiator_UIResponseFormat);
        if(mustChooseDS){
            aiMessagesBuilder.appendPrompt(this.dataBoundUIInitiator_DSResponseFormat);
        }
        aiMessagesBuilder.appendPrompt(this.dataBoundUIInitiatorSuffix);
        var aiRequest={
            cancellationController:buildContext._ownCC,
            messages:aiMessagesBuilder.aiMessages,
            responseType:"object"
        };
        return this.asyncSendRequest(aiRequest,buildContext._aiConfig)
            .then(function(aiResponse){
                var initiatorResponseObject=aiResponse.message.content;
                var uiType=initiatorResponseObject.component;
                if(uiType==null||
                    uiType=="invald")
                {
                    return isc.rejectWithError("AI could not determine a data-bound UI type to use to satisfy the request.");
                }
                if(!buildContext._uiTypes.contains(uiType)){
                    return isc.rejectWithError("AI requested to use the unavailable or unknown UI type '"+uiType+"'.");
                }
                buildContext.uiType=uiType;
                if(mustChooseDS){
                    var dataSourceName=initiatorResponseObject.dataSource;
                    if(dataSourceName==null||
                        dataSourceName=="invalid")
                    {
                        return isc.rejectWithError("AI could not determine which available data source to use to satisfy the request.");
                    }
                    var dataSource=buildContext._dataSources.find("ID",dataSourceName);
                    if(dataSource==null){
                        return isc.rejectWithError("AI requested to use the unavailable or unknown data source '"+dataSourceName+"'.");
                    }
                    buildContext.dataSource=dataSource;
                }else{
                    buildContext.dataSource=dataSources[0];
                }
                ++buildContext._numStepsCompleted;
                isc.AI._fireAIProgressCallback(
                    buildContext,
                    [{
                        category:"success",
                        content:"Gathered initial information about your request"
                    },{
                        category:"detail",
                        content:"AI will build a "+uiType+
                                (mustChooseDS?" using data source '"+dataSourceName+"'.":".")
                    }]
                );
                return isc.AI._asyncRequestDataBoundUICode(buildContext);
            });
    }
,isc.A._asyncRequestDataBoundUICode=function isc_c_AI__asyncRequestDataBoundUICode(buildContext){
        var fields=isc.getValues(buildContext.dataSource.getFields());
        var uiTypeInfo=buildContext._uiTypeInfos[buildContext.uiType];
        var aiMessagesBuilder=isc.InternalAIMessagesBuilder.create({
            userMessages:buildContext._summarizedUserMessages,
            target:this,
            evalVars:{
                componentType:uiTypeInfo.componentType,
                dsSummary:"${dsSummary}",
                componentCodePrompt:uiTypeInfo.codePrompt
            }
        });
        aiMessagesBuilder.appendPrompts(this.dataBoundUICodePrefixPrompts);
        aiMessagesBuilder.appendPrompts(this.uiCodeSuffixPrompts);
        var partiallyProcessedAIRequest={
            messages:aiMessagesBuilder.aiMessages
        };
        var context=this._getContextForRequest(partiallyProcessedAIRequest);
        if(context.errorMessage)return isc.rejectWithError(context.errorMessage);
        var shouldUseFieldPaging=context.aiEngine.shouldUseAIFieldPaging(partiallyProcessedAIRequest,fields,buildContext._aiConfig);
        if(!shouldUseFieldPaging){
            return this._asyncBuildDataBoundUIWithFinalFields(fields,partiallyProcessedAIRequest,buildContext);
        }
        ++buildContext._estimatedNumTotalSteps;
        this._fireAIProgressCallback(buildContext,[{category:"detail",content:isc.AI.willSubsetFieldsDetailMessage}],true);
        return context.aiEngine.asyncRetrieveFieldsForPrompt(
                partiallyProcessedAIRequest,
                "Build a component to show data from a dataSource",
                fields,
                context,
                buildContext._aiConfig)
            .then(function(finalFields){
                ++buildContext._numStepsCompleted;
                this._fireAIProgressCallback(buildContext,[{category:"success",content:isc.AI.finishedSubsettingFieldsDetailMessage}]);
                return isc.AI._asyncBuildDataBoundUIWithFinalFields(
                        finalFields,partiallyProcessedAIRequest,buildContext);
            });
    }
,isc.A._asyncBuildDataBoundUIWithFinalFields=function isc_c_AI__asyncBuildDataBoundUIWithFinalFields(finalFields,partiallyProcessedAIRequest,buildContext){
        if(buildContext._ownCC.canceled){
            return Promise.reject(buildContext._ownCC.asCanceledResult());
        }
        if(finalFields==null||(finalFields.removeEmpty(),finalFields).isEmpty()){
            return isc.rejectWithError("No fields were selected for use in building the data-bound UI.");
        }
        buildContext._dsFinalFields=finalFields;
        var dsSummary=this.summarizeDataSource(buildContext.dataSource,finalFields,buildContext._aiConfig,false);
        var evalVars={
            dsSummary:dsSummary
        };
        var aiRequest={
            cancellationController:buildContext._ownCC,
            messages:partiallyProcessedAIRequest.messages.map(function(message){
                if(message.source=="system"&&isc.AIEngine._isTextContentType(message.type)){
                    return{
                        source:message.source,
                        content:String(message.content).evalDynamicString(this,evalVars)
                    };
                }
                return message;
            },this)
        };
        return this.asyncSendRequest(aiRequest,buildContext._aiConfig)
            .then(function(aiResponse){
                if(buildContext._ownCC.canceled){
                    return Promise.reject(buildContext._ownCC.asCanceledResult());
                }
                var content=aiResponse.message.content||"";
                var jsCode=String.prototype.trim.call(isc.AI.extractFencedCode(content));
                if(jsCode==""){
                    return isc.rejectWithError("AI did not generate any UI code.");
                }
                ++buildContext._numStepsCompleted;
                isc.AI._fireAIProgressCallback(buildContext,[{category:"success",content:"AI generated UI code. Will now validate\u2026"}]);
                buildContext.jsCode=jsCode;
                isc.AI._validateAIBuiltUI(buildContext);
                return buildContext._validationResolversObj.promise;
            });
    }
,isc.A.buildDataUI=function isc_c_AI_buildDataUI(userPrompt,callback,context,aiConfig){
        var error;
        var buildRequest={
            userAIRequest:{prompt:userPrompt}
        };
        if(context==null){
            error="context is required to build a dataUI";
        }else{
            buildRequest.availableDataSources=context.dataSources;
        }
        if(error==null){
            buildRequest.allowedUITypes=context.uiTypeNames;
        }
        var callbackArgNames="status,result,context";
        if(error!=null){
            return this.fireCallback(callback,callbackArgNames,[-1,error,context]);
        }
        this.getEngine().buildDataBoundUI(buildRequest,function(buildResponse){
            error=buildResponse.errorMessage;
            if(error!=null){
                isc.AI.fireCallback(callback,callbackArgNames,[-1,error,context]);
            }else{
                isc.AI.fireCallback(callback,callbackArgNames,[0,buildResponse.jsCode,context]);
            }
        });
    }
,isc.A.extractFencedCode=function isc_c_AI_extractFencedCode(string){
        var result=string.match(this.fencedCodeRegex);
        if(result==null||result.length<2)return string;
        return result[1];
    }
,isc.A.getAIModel=function isc_c_AI_getAIModel(engineId){
        var engine=isc.AI.getEngine(engineId);
        return engine.model;
    }
,isc.A.loadDataSource=function isc_c_AI_loadDataSource(dataSourceName){
        if(isc.DS.get(dataSourceName)){
            this.dataSourceLoaded(dataSourceName);
            return;
        }
        if(!dataSourceName||this._loadingDS[dataSourceName])return;
        this._loadingDS[dataSourceName]=true;
        isc.DS.load(dataSourceName,{target:this,methodName:"dataSourceLoaded"},{loadParents:true});
    }
,isc.A.dataSourceLoaded=function isc_c_AI_dataSourceLoaded(dsID){
        delete this._loadingDS[dsID];
        var ds=this.dataSources[dsID]=isc.DataSource.get(dsID);
        if(ds==null){
            this._loadDSFailed[dsID]=true;
        }else{
            var pendingRequests=this._pendingRequests;
            this._pendingRequests=[];
            for(var i=0;i<pendingRequests.length;i++){
                var pendingRequest=pendingRequests[i];
                pendingRequest.engine.handleSendRequest(
                    pendingRequest.rawRequest,
                    pendingRequest.aiRequest,
                    pendingRequest.callback,
                    pendingRequest.config
                );
            }
        }
    }
,isc.A._getDataSource=function isc_c_AI__getDataSource(engineId,aiRequest){
        var engine=isc.AI.getEngine(engineId),
            dataSourceName=engine.getDataSourceName(aiRequest),
            dataSource=this.dataSources[dataSourceName];
        var ds=this.dataSources[dataSourceName];
        if(ds&&!ds._hasSpoofedResponseTransformer){
            ds.addProperties({
                _hasSpoofedResponseTransformer:true,
                _explicitTransformRequest:ds.transformRequest,
                transformRequest:function(dsRequest){
                    if(this._explicitTransformRequest){
                        var data=this._explicitTransformRequest(dsRequest);
                    }
                    if(dsRequest.dataProtocol=="clientCustom"){
                        var context=dsRequest.clientContext;
                        if(context&&
                            (context.spoofingMode=="full"||
                             context.spoofedResponse!=null))
                        {
                            isc.AI.createSpoofedResponse(dsRequest);
                        }
                    }
                    return data;
                }
            });
        }
        return ds;
    }
,isc.A.createSpoofedResponse=function isc_c_AI_createSpoofedResponse(dsRequest){
        var context=dsRequest.clientContext;
        if(context.spoofedResponse==null||context.spoofingMode=="full"){
            this.promptForSpoofedResponse(dsRequest);
        }else{
            if(context.spoofedResponse.deferProcessSpoofedResponse){
                if(context.spoofedResponse.dsRequest){
                    this.processSpoofedResponse(context.spoofedResponse.dsRequest,context.spoofedResponse);
                }
                context.spoofedResponse.dsRequest=dsRequest;
            }else{
                var spoofedResponseSpecifiesDelay=context.spoofedResponse.getDelay||isc.isA.Number(context.spoofedResponse.delay);
                this.delayCall(
                    "processSpoofedResponse",
                    [dsRequest,context.spoofedResponse],
                    spoofedResponseSpecifiesDelay?0:this.spoofedResponseDelay
                );
            }
        }
    }
,isc.A.processSpoofedResponse=function isc_c_AI_processSpoofedResponse(dsRequest,spoofedResponse){
        if(dsRequest===spoofedResponse.dsRequest){
            delete spoofedResponse.dsRequest;
        }
        if(!spoofedResponse.deferProcessSpoofedResponse&&
            (spoofedResponse.getDelay||isc.isA.Number(spoofedResponse.delay)))
        {
            var delay;
            if(spoofedResponse.getDelay){
                var clientContext=dsRequest.clientContext;
                delay=spoofedResponse.getDelay(clientContext.aiRequest,clientContext.aiEngine);
            }else{
                delay=spoofedResponse.delay;
            }
            this.delayCall("_processSpoofedResponse",[dsRequest,spoofedResponse],delay);
        }else{
            this._processSpoofedResponse(dsRequest,spoofedResponse);
        }
    }
,isc.A._processSpoofedResponse=function isc_c_AI__processSpoofedResponse(dsRequest,spoofedResponse){
        dsRequest.clientContext.dataSource.processResponse(
            dsRequest.requestId,
            {
                _isSpoofed:true,
                status:0,
                data:spoofedResponse
            }
        );
    }
,isc.A.promptForSpoofedResponse=function isc_c_AI_promptForSpoofedResponse(dsRequest){
        var context=dsRequest.clientContext;
        var spoofedResponseForm=isc.DynamicForm.create({
            autoDraw:false,
            width:"100%",height:"*",
            numCols:1,
            titleOrientation:top,
            items:[
                {editorType:"HeaderItem",
                    value:context.aiEngine.name+" Request"
                },
                {
                    name:"prompt",
                    titleOrientation:"top",
                    value:context.aiRequest.prompt,
                    width:"*"
                },
                {name:"messages",
                    titleOrientation:"top",
                    editorType:"CanvasItem",
                    width:"*",height:"*",minHeight:400,
                    shouldSaveValue:true,
                    value:context.aiRequest.messages,
                    createCanvas:function(){
                        var messagesGrid=this._messagesGrid=isc.ListGrid.create({
                            _canvasItem:this,
                            autoDraw:false,
                            width:"100%",height:"100%",
                            canEdit:true,
                            canFilter:false,
                            canSort:false,
                            canGroupBy:false,
                            canRemoveRecords:true,
                            canReorderFields:false,
                            wrapCells:true,
                            fixedRecordHeights:false,
                            alternateRecordStyles:true,
                            fields:[{
                                name:"source",
                                title:"Source",
                                width:100,
                                valueMap:["user","system","AI"]
                            },{
                                name:"content",
                                title:"Content",
                                width:"*",
                                editorType:"TextAreaItem",
                                editorProperties:{
                                    minHeight:100,
                                    canHover:false
                                },
                                formatCellValue:function(value,record,rowNum,colNum,grid){
                                    if(!value)return"";
                                    if(record.type=="jpegImage"||
                                        record.type=="pngImage")
                                    {
                                        var mimeType=isc.AIEngine._getMIMEType(record),
                                            contentWidth=grid.getColumnWidth(1);
                                        return"<img src='data:"+mimeType+";base64,"+value.asHTML()+"' "+
                                                    "style='width:"+contentWidth+"px'>";
                                    }else if(isc.isAn.Object(value)){
                                        return isc.JSON.encode(value,{dateFormat:"logicalDateString"});
                                    }
                                    return String(value).asHTML();
                                }
                            }],
                            getEditorType:function(field,values){
                                if(field.name=="content"&&values&&isc.AIEngine.isImageMessage(values)){
                                    return"Base64ImageDataItem";
                                }
                                return this.Super("getEditorType",arguments);
                            },
                            getEditorProperties:function(editField,editedRecord,rowNum){
                                var editorProperties=this.Super("getEditorProperties",arguments);
                                if(editField.name=="content"&&editedRecord&&isc.AIEngine.isImageMessage(editedRecord)){
                                    editorProperties.accept="image/jpeg,image/png";
                                    editorProperties.mimeType=isc.AIEngine._getMIMEType(editedRecord);
                                    editorProperties.changed=function(form,item,value){
                                        var mimeType=this.mimeType,
                                            editSession=this.grid.getEditSession(rowNum);
                                        editSession._editValues.type=mimeType=="image/jpeg"?"jpegImage":"pngImage";
                                    };
                                }
                                return editorProperties;
                            },
                            getCellVAlign:function(record,rowNum,colNum){
                                return(colNum==0?"top":"center");
                            },
                            dataChanged:function(){
                                this._canvasItem.storeValue(this.data);
                            }
                        });
                        var addMessageButton=isc.Button.create({
                            autoDraw:false,
                            title:"+",
                            autoFit:true,
                            click:function(){
                                messagesGrid.startEditingNew();
                            }
                        });
                        return isc.VLayout.create({
                            autoDraw:false,
                            width:"100%",height:"100%",
                            members:[messagesGrid,addMessageButton]
                        });
                    },
                    showValue:function(displayValue,dataValue){
                        if(this._messagesGrid==null)return;
                        this._messagesGrid.setData(dataValue);
                    }
                },
                {editorType:"HeaderItem",
                    value:"Response"
                },
                {editorType:"ButtonItem",
                    title:"Generate AI Response",
                    click:function(form){
                        var messagesItem=form.getItem("messages"),
                            messagesGrid=messagesItem._messagesGrid;
                        if(messagesGrid)messagesGrid.endEditing();
                        var processResponseButton=form.getItem("_processResponseButton");
                        if(processResponseButton)processResponseButton.disable();
                        context.aiEngine.sendRequest(
                            isc.addProperties({},context.aiRequest,{
                                prompt:form.getValue("prompt"),
                                messages:messagesItem.getValue()
                            }),
                            function(aiResponse,aiRequest){
                                if(processResponseButton)processResponseButton.enable();
                                var message=aiResponse.message&&aiResponse.message.content;
                                if(aiResponse.message&&(aiResponse.message.type=="array"||aiResponse.message.type=="object")){
                                    message=isc.JSON.encode(message);
                                }
                                form.setValue("response",message);
                            },
                            {
                                responseSpoofingMode:"none"
                            }
                        );
                    }
                },
                {name:"response",
                    editorType:"TextAreaItem",showTitle:false,
                    width:"*",height:100,
                    value:context.spoofedResponse
                },
                {
                    name:"_processResponseButton",
                    editorType:"ButtonItem",
                    title:"Process Response",
                    click:function(){
                        isc.AI.delayCall("processSpoofedResponse",[dsRequest,{value:this.form.getValue("response")}]);
                        this.form.parentWindow.markForDestroy();
                    }
                }
            ]
        });
        var spoofedResponseWindow=isc.Window.create({
            title:"Create AI Response",
            width:700,height:"90%",
            canDragResize:false,
            autoCenter:true,
            showCloseButton:false,
            items:[spoofedResponseForm]
        });
        spoofedResponseForm.parentWindow=spoofedResponseWindow;
        spoofedResponseWindow.show();
    }
,isc.A.setDefaultSpoofedResponse=function isc_c_AI_setDefaultSpoofedResponse(responseString){
        this._defaultSpoofedResponse=responseString==null?null:{value:responseString};
    }
,isc.A.addSpoofedResponses=function isc_c_AI_addSpoofedResponses(responses){
        this._spoofedResponseRegistry.addList(responses);
    }
,isc.A.addSpoofedResponse=function isc_c_AI_addSpoofedResponse(response){
        this._spoofedResponseRegistry.add(response);
    }
,isc.A.clearSpoofedResponses=function isc_c_AI_clearSpoofedResponses(){
        this._spoofedResponseRegistry=[];
    }
,isc.A.removeSpoofedResponse=function isc_c_AI_removeSpoofedResponse(response){
        var index=this._spoofedResponseRegistry.findIndex(response);
        if(index!=-1){
            this._spoofedResponseRegistry.removeAt(index);
        }
    }
,isc.A.removeSpoofedResponses=function isc_c_AI_removeSpoofedResponses(responses){
        this._spoofedResponseRegistry.removeList(responses);
    }
,isc.A.getSpoofedResponse=function isc_c_AI_getSpoofedResponse(aiRequest,aiEngine){
        var prompt=aiEngine.makePromptText(aiRequest);
        for(var registryIndex=0;registryIndex<this._spoofedResponseRegistry.length;++registryIndex){
            var response=this._spoofedResponseRegistry[registryIndex];
            var match=false;
            if(isc.isA.Number(response.numMatchesRemaining)){
                if(response.numMatchesRemaining<=0)continue;
            }else if(response.singleUse){
                response.numMatchesRemaining=1;
            }
            if(response.matchesPrompt!=null){
                match=response.matchesPrompt(prompt,response);
            }else if(response.prompt!=null){
                var textMatchStyle=response.textMatchStyle||"iContains",
                    comparePrompt=textMatchStyle.startsWith("i")?prompt.toLowerCase():prompt,
                    compareVal=textMatchStyle.startsWith("i")?response.prompt.toLowerCase():response.prompt;
                switch(textMatchStyle){
                    case"contains":
                    case"iContains":
                        match=comparePrompt.contains(compareVal);
                        break;
                    case"startsWith":
                    case"iStartsWith":
                        match=comparePrompt.startsWith(compareVal);
                        break;
                    case"endsWith":
                    case"iEndsWith":
                        match=comparePrompt.endsWith(compareVal);
                        break;
                    case"equals":
                    case"iEquals":
                    default:
                        match=(comparePrompt==compareVal);
                        break;
                }
            }
            if(match){
                if(isc.isA.Number(response.numMatchesRemaining))--response.numMatchesRemaining;
                if(isc.isAn.Object(response.value)){
                    response.value=isc.JSON.encode(response.value,{dateFormat:"logicalDateString"});
                }
                return response;
            }
        }
        if(this._defaultSpoofedResponse!=null)return this._defaultSpoofedResponse;
    }
,isc.A.getInitiatorMessage=function isc_c_AI_getInitiatorMessage(promptContext){
        var dataSourceSummary=this.getDataSourceDefinitions();
        var uiSummaryContext=this.getUISummary(true);
        var uiSummary=uiSummaryContext[0];
        if(promptContext!=null){
            promptContext.idMapping=uiSummaryContext[1];
        }
        var userAgent=navigator.userAgent;
        var systemPrompt=this.initiatorPromptTemplate.evalDynamicString();
        systemPrompt+=this.getApplicationOverviewPrompt(dataSourceSummary,uiSummary,userAgent);
        return{source:"system",content:systemPrompt,type:"text"};
    }
,isc.A.getApplicationOverviewPrompt=function isc_c_AI_getApplicationOverviewPrompt(dataSourceSummary,uiSummary,userAgent){
        var summary="** SmartClient application and environment information **\n";
        if(this.isShowcase){
            summary+="The user is interacting with a sample application user interface with the following description:\n\n";
            summary+=window["featureExplorer_exampleDescription"].getContents()+"\n\n";
        }
        summary+="Partial code for the DataSources present in this application is below, with only important properties shown:\n";
        summary+=dataSourceSummary+"\n\n";
        summary+="Partial code for the currently visible UI of the application is below, with only important properties shown.\n"+
                   "Components listed in this summary may be referenced directly by their \"ID\" property or by passing that ID to \"isc.Canvas.getById()\".\"\n\n"
        summary+=uiSummary+"\n\n";
        summary+="The SmartClient version is \""+isc.version+
                   "\" and the browser's userAgent is \""+userAgent+"\".\n";
        return summary;
    }
,isc.A.handleAITransportError=function isc_c_AI_handleAITransportError(transaction,status,httpResponseCode,httpResponseText){
        var URL=transaction.URL||"";
        if(URL.startsWith("https://api.openai.com/")){
            return true;
        }else{
            return false;
        }
    }
,isc.A.asyncSuggestRecordSummaryTitle=function isc_c_AI_asyncSuggestRecordSummaryTitle(request){
        return this._asyncDataBoundAIOperation("_asyncSuggestRecordSummaryTitle",request);
    }
,isc.A.suggestRecordSummaryTitle=function isc_c_AI_suggestRecordSummaryTitle(request,callback){
        this._wrapAsyncDataBoundAIOperation("asyncSuggestRecordSummaryTitle",request,callback);
    }
,isc.A._asyncSuggestRecordSummaryTitle=function isc_c_AI__asyncSuggestRecordSummaryTitle(request,dabOpContext){
        var ssAIRequest=request.aiRequest;
        if(!ssAIRequest){
            return isc.rejectWithError(isc.AsyncUtil.missingRequiredParameterErrorMessage.evalDynamicString(this,{paramName:"aiRequest"}));
        }
        var dataSource=dabOpContext.dataSource;
        if(!dataSource){
            return isc.rejectWithError(isc.AsyncUtil.missingRequiredParameterErrorMessage.evalDynamicString(this,{paramName:"dataSource"}));
        }
        var ssMessages=[{content:ssAIRequest.prompt,type:ssAIRequest.promptType}],
            additionalMessages=ssAIRequest.additionalMessages;
        if(additionalMessages){
            ssMessages.addList(additionalMessages);
            ssMessages.removeEmpty();
        }
        var summarizedSSMessages=ssMessages;
        var visibleFieldNames=request.visibleFieldNames,
            visibleAvailableFields;
        if(!visibleFieldNames){
            var componentVisibleFields;
            if(dabOpContext.component&&(componentVisibleFields=dabOpContext.component.getVisibleFields())){
                var componentVisibleFieldNames=componentVisibleFields.getProperty("name");
                visibleAvailableFields=isc.getValues(isc.applyMask(dabOpContext.availableFieldsIndex,componentVisibleFieldNames));
            }else{
                visibleAvailableFields=dabOpContext.availableFields.duplicate();
            }
        }else{
            var availableFieldNames=dabOpContext.availableFieldNames;
            for(var i=0;i<visibleFieldNames.length;++i){
                var visibleFieldName=visibleFieldNames[i];
                if(!availableFieldNames.contains(visibleFieldName)&&
                    !visibleFieldNames.contains(visibleFieldName,i+1))
                {
                    this.logWarn("'"+visibleFieldName+"' was specified in `visibleFieldNames`, but there is no such available field.","AI");
                }
            }
            visibleAvailableFields=isc.getValue(isc.applyMask(dabOpContext.availableFieldsIndex,visibleFieldNames));
        }
        if(visibleAvailableFields){
            for(var ri=visibleAvailableFields.length;ri>0;--ri){
                var i=ri-1,
                    visibleField=visibleAvailableFields[i],
                    visibleFieldName=visibleField.name,
                    visibleFieldTitle=visibleField.title;
                if(!isc.isA.nonemptyString(visibleFieldName)||
                    !isc.isA.String(visibleFieldTitle)||isc.isAn.emptyString(visibleFieldTitle.trim())||
                    visibleField.canView==false||
                    visibleField.hidden==true)
                {
                    visibleAvailableFields.removeAt(i);
                }
            }
            if(visibleAvailableFields.isEmpty())visibleAvailableFields=null;
        }
        var aiMessagesBuilder=isc.InternalAIMessagesBuilder2.create({
            ssMessages:summarizedSSMessages,
            messagesSource:request.aiRequestSource,
            target:this,
            evalVars:{
                dsSummary:"${dsSummary}",
                dsName:dataSource.ID
            }
        });
        aiMessagesBuilder.appendPrompts(this.suggestRecordSummaryTitlePrompts);
        if(visibleAvailableFields){
            var titleForName={};
            for(var i=0;i<visibleAvailableFields.length;++i){
                var visibleField=visibleAvailableFields[i];
                titleForName[visibleField.name]=visibleField.title;
            }
            aiMessagesBuilder.appendPrompt(this.suggestRecordSummaryTitlePrompts_visibleFields+this._encodeJSON(titleForName));
        }else{
            aiMessagesBuilder.appendPrompt(this.suggestRecordSummaryTitlePrompts_noVisibleFields);
        }
        aiMessagesBuilder.appendPrompt(this.suggestRecordSummaryTitlePrompts_final);
        var partiallyProcessedAIRequest={
            messages:aiMessagesBuilder.aiMessages,
            responseType:"object"
        };
        var finalFields=dabOpContext.availableFields,
            finalFieldNames=dabOpContext.availableFieldNames;
        var dsSummary=this.summarizeDataSource(dataSource,finalFields,{format:"compactJSON"},false);
        var evalVars={
            dsSummary:dsSummary
        };
        var aiRequest={
            cancellationController:dabOpContext.cancellationController,
            messages:partiallyProcessedAIRequest.messages.map(function(message){
                if(message.source=="system"&&isc.AIEngine._isTextContentType(message.type)){
                    return{
                        source:message.source,
                        content:String(message.content).evalDynamicString(this,evalVars)
                    };
                }
                return message;
            },this),
            responseType:partiallyProcessedAIRequest.responseType
        };
        var context=this._getContextForRequest(partiallyProcessedAIRequest);
        if(context.errorMessage)return isc.rejectWithError(context.errorMessage);
        var aiConfig={
            maxRetries:request.maxRetries
        };
        return context.aiEngine.asyncSendRequest(aiRequest,aiConfig)
            .then(function(aiResponse){
                var responseObject=aiResponse.message.content,
                    suggestedTitle;
                if(!isc.isAn.Object(responseObject)||
                    !isc.isA.String(responseObject.suggestedTitle)||
                    !(suggestedTitle=responseObject.suggestedTitle.trim()))
                {
                    return isc.rejectWithError(isc.AI.aiNotAbleToProcessRequestErrorMessage);
                }
                return{
                    type:"success",
                    suggestedTitle:suggestedTitle,
                    relevantFieldNames:finalFieldNames
                };
            });
    }
);
isc.evalBoundary;isc.B.push(isc.A.isAIFieldRequestNumerical=function isc_c_AI_isAIFieldRequestNumerical(aiFieldRequest){
        var valueClass=aiFieldRequest.valueClass;
        return valueClass=="ordinal"||valueClass=="interval"||valueClass=="ratio";
    }
,isc.A._createBuildAIFieldRequestContext=function isc_c_AI__createBuildAIFieldRequestContext(asyncMethodName,buildRequest,dabOpContext){
        var buildContext=this._createBuildViaAIContext(asyncMethodName,
                                                         buildRequest,
                                                         dabOpContext);
        buildContext.dabOpContext=dabOpContext;
        if(buildRequest.showProgressDialog==true){
            buildContext._progressDialog=isc.BuildViaAIProgressDialog.create(buildRequest.progressDialogProperties,{
                _buildContext:buildContext,
                canCancel:buildRequest.userCanCancel!=false
            });
            buildContext._progressDialog.show();
        }
        buildContext._estimatedNumTotalSteps=1;
        this._fireAIProgressCallback(buildContext,[{category:"detail",content:isc.AI.startingYourRequestDetailMessage}]);
        return buildContext;
    }
,isc.A.buildAIFieldRequest=function isc_c_AI_buildAIFieldRequest(buildRequest,callback){
        this._wrapAsyncBuildViaAIOperation(this._$asyncBuildAIFieldRequest,buildRequest,callback);
    }
,isc.A.asyncBuildAIFieldRequest=function isc_c_AI_asyncBuildAIFieldRequest(buildRequest){
        return this._asyncDataBoundAIOperation("_asyncBuildAIFieldRequest",buildRequest);
    }
,isc.A._asyncBuildAIFieldRequest=function isc_c_AI__asyncBuildAIFieldRequest(buildRequest,dabOpContext){
        if(!buildRequest.userAIRequest){
            return isc.rejectWithError(isc.AsyncUtil.missingRequiredParameterErrorMessage.evalDynamicString(this,{paramName:"userAIRequest"}));
        }
        var dataSource=dabOpContext.dataSource;
        if(!dataSource){
            return isc.rejectWithError(isc.AsyncUtil.missingRequiredParameterErrorMessage.evalDynamicString(this,{paramName:"dataSource"}));
        }
        var buildContext=this._createBuildAIFieldRequestContext(this._$asyncBuildAIFieldRequest,buildRequest,dabOpContext);
        this.__asyncBuildAIFieldRequest(buildRequest,dabOpContext,buildContext)
            .then(function(aiFieldRequest){
                buildContext._resolversObj.resolve({type:"success",aiFieldRequest:aiFieldRequest});
            },function(rejectReason){
                buildContext._resolversObj.reject(isc.defaultAsyncOperationCatchCallback(rejectReason));
            });
        return buildContext._resolversObj.promise;
    }
,isc.A.__asyncBuildAIFieldRequest=function isc_c_AI___asyncBuildAIFieldRequest(buildRequest,dabOpContext,buildContext){
        var userAIRequest=buildRequest.userAIRequest;
        var ssMessages=[{content:userAIRequest.prompt,type:userAIRequest.promptType}],
            additionalMessages=userAIRequest.additionalMessages;
        if(additionalMessages){
            ssMessages.addList(additionalMessages);
            ssMessages.removeEmpty();
        }
        var summarizedSSMessages=ssMessages;
        var component=dabOpContext.component,
            dataSource=dabOpContext.dataSource;
        var aiMessagesBuilder=isc.InternalAIMessagesBuilder2.create({
            ssMessages:summarizedSSMessages,
            target:this,
            evalVars:{
                dsSummary:"${dsSummary}",
                dsName:dataSource.ID
            }
        });
        aiMessagesBuilder.appendPrompts(this.buildAIFieldRequestPrompts);
        var partiallyProcessedAIRequest={
            messages:aiMessagesBuilder.aiMessages,
            responseType:"object"
        };
        var finalFields=dabOpContext.availableFields,
            finalFieldNames=dabOpContext.availableFieldNames;
        var dsSummary=this.summarizeDataSource(dataSource,finalFields,{format:"compactJSON"},false);
        buildContext._dsSummary=dsSummary;
        var evalVars={
            dsSummary:dsSummary
        };
        var aiRequest={
            cancellationController:buildContext._ownCC,
            messages:partiallyProcessedAIRequest.messages.map(function(message){
                if(message.source=="system"&&isc.AIEngine._isTextContentType(message.type)){
                    return{
                        source:message.source,
                        content:String(message.content).evalDynamicString(this,evalVars)
                    };
                }
                return message;
            },this),
            responseType:partiallyProcessedAIRequest.responseType
        };
        var context=this._getContextForRequest(partiallyProcessedAIRequest);
        if(context.errorMessage)return isc.rejectWithError(context.errorMessage);
        if(component){
        }
        return context.aiEngine.asyncSendRequest(aiRequest,buildContext._aiConfig)
            .then(function(aiResponse){
                var responseObject=aiResponse.message.content;
                if(!isc.isAn.Object(responseObject)){
                    return isc.rejectWithError(isc.AI.aiNotAbleToProcessRequestErrorMessage);
                }
                var relevantFieldNames=responseObject.relevantFieldNames,
                    finalRelevantFieldNames;
                if(isc.isA.String(relevantFieldNames))relevantFieldNames=[relevantFieldNames];
                if(!isc.isAn.Array(relevantFieldNames)){
                    finalRelevantFieldNames=finalFieldNames;
                }else{
                    finalRelevantFieldNames=[];
                    for(var i=0;i<relevantFieldNames.length;++i){
                        var fieldName=relevantFieldNames[i];
                        if(fieldName==null||isc.isAn.Object(fieldName))continue;
                        fieldName=String(fieldName).trim();
                        if(finalFieldNames.contains(fieldName)&&
                            !finalRelevantFieldNames.contains(fieldName))
                        {
                            finalRelevantFieldNames.push(fieldName);
                        }
                    }
                    if(finalRelevantFieldNames.isEmpty()){
                        finalRelevantFieldNames=finalFieldNames;
                    }
                }
                relevantFieldNames=finalRelevantFieldNames;
                var valueClass=responseObject.valueClass;
                if(valueClass!="categorical"&&
                    valueClass!="ordinal"&&
                    valueClass!="interval"&&
                    valueClass!="ratio")
                {
                    valueClass="general";
                }
                var categories,
                    categoryHints;
                if(valueClass=="categorical"||valueClass=="ordinal"){
                    categories=responseObject.categories;
                    if(!isc.isAn.Array(categories)){
                        var dataDependentReason=responseObject.dataDependentReason;
                        if(dataDependentReason&&(dataDependentReason=dataDependentReason.trim())){
                            return isc.rejectWithError(isc.AI.aiNotAbleToProcessRequestErrorMessage);
                        }
                    }else{
                        var finalCategories=[];
                        for(var i=0;i<categories.length;++i){
                            var category=categories[i];
                            if(category==null||isc.isAn.Object(category))continue;
                            category=String(category);
                            if(!(category=category.trim())){
                                isc.AI.logWarn("AI generated an empty string as a category.","AI");
                                continue;
                            }
                            if(finalCategories.contains(category)){
                                isc.AI.logWarn("AI generated duplicate category '"+category+"'.","AI");
                                continue;
                            }
                            finalCategories.push(category);
                        }
                        categories=finalCategories;
                        categoryHints={};
                        if(isc.isAn.Object(responseObject.categoryHints)){
                            for(var category in responseObject.categoryHints){
                                if(!Object.hasOwn(responseObject.categoryHints,category))continue;
                                var hint=responseObject.categoryHints[category];
                                if(!(category=category.trim()))continue;
                                if(!categories.contains(category)){
                                    isc.AI.logWarn("AI generated a hint for non-existent category '"+category+"'.","AI");
                                    continue;
                                }
                                if(!isc.isA.String(hint)){
                                    isc.AI.logWarn("AI generated a non-string hint for category '"+category+"'.","AI");
                                    continue;
                                }
                                if(!(hint=hint.trim()))continue;
                                categoryHints[category]=hint;
                            }
                        }
                    }
                    if(!isc.isAn.Array(categories)||categories.isEmpty()){
                        categoryHints=categories=null;
                        valueClass="general";
                    }
                }
                var minValue,
                    maxValue;
                if(valueClass=="interval"||valueClass=="ratio"){
                    minValue=parseFloat(responseObject.minValue);
                    if(!isc.isA.Number(minValue))minValue=null;
                    maxValue=parseFloat(responseObject.maxValue);
                    if(!isc.isA.Number(maxValue))maxValue=null;
                    else if(isc.isA.Number(minValue)&&minValue>maxValue){
                        isc.AI.logWarn("AI selected minValue = "+minValue+" greater than maxValue = "+maxValue+". Ignoring...","AI");
                        maxValue=minValue=null;
                    }
                }
                return isc.addPropertiesWithAssign({},userAIRequest,{
                    relevantFieldNames:relevantFieldNames,
                    valueClass:valueClass,
                    categories:categories,
                    categoryHints:categoryHints,
                    minValue:minValue,
                    maxValue:maxValue
                });
            });
    }
,isc.A.applyAIFieldRequestToFieldDefaults=function isc_c_AI_applyAIFieldRequestToFieldDefaults(aiFieldRequest,field){
        this._assert(field.aiFieldRequest==null||field.aiFieldRequest===aiFieldRequest);
        field.aiFieldRequest=aiFieldRequest;
        var valueClass=aiFieldRequest.valueClass;
        if(valueClass=="categorical"||valueClass=="ordinal"){
            field.type="enum";
            field.valueMap=aiFieldRequest.categories;
            field.editorType="SelectItem";
        }else if(this.isAIFieldRequestNumerical(aiFieldRequest)){
            field.type="float";
            if(aiFieldRequest.minValue!=null||aiFieldRequest.maxValue!=null){
                var validators=field.validators;
                if(!validators)validators=field.validators=[];
                var additionalValidator;
                if(aiFieldRequest.minValue!=null){
                    supplyMinValidator:do{
                        for(var v=0;v<validators.length;++v){
                            var validator=validators[v];
                            if(validator.applyWhen!=null||
                                validator.serverOnly)
                            {
                                continue;
                            }
                            if(validator.type=="integerRange"||
                                validator.type=="floatLimit"||
                                validator.type=="floatRange")
                            {
                                if(isc.isA.Number(validator.min)&&
                                    aiFieldRequest.minValue<=validator.min)
                                {
                                    break supplyMinValidator;
                                }
                            }
                        }
                        additionalValidator={
                            type:"floatRange",
                            min:aiFieldRequest.minValue
                        };
                        validators.push(additionalValidator);
                    }while(false);
                }
                if(aiFieldRequest.maxValue!=null){
                    supplyMaxValidator:do{
                        for(var v=0;v<validators.length;++v){
                            var validator=validators[v];
                            if(validator.applyWhen!=null||
                                validator.serverOnly)
                            {
                                continue;
                            }
                            if(validator.type=="integerRange"||
                                validator.type=="floatLimit"||
                                validator.type=="floatRange")
                            {
                                if(isc.isA.Number(validator.max)&&
                                    aiFieldRequest.maxValue>=validator.max)
                                {
                                    break supplyMaxValidator;
                                }
                            }
                        }
                        if(additionalValidator!=null){
                            additionalValidator.max=aiFieldRequest.maxValue;
                        }else{
                            additionalValidator={
                                type:"floatRange",
                                max:aiFieldRequest.maxValue
                            };
                            validators.push(additionalValidator);
                        }
                    }while(false);
                }
            }
        }else{
            field.type="text";
        }
        return field;
    }
,isc.A.asyncSummarizeRecords=function isc_c_AI_asyncSummarizeRecords(request,partialResultCallback){
        return this._asyncDataBoundAIOperation("_asyncSummarizeRecords",request,partialResultCallback);
    }
,isc.A.summarizeRecords=function isc_c_AI_summarizeRecords(request,partialResultCallback,callback){
        this._wrapAsyncDataBoundAIOperation("asyncSummarizeRecords",request,partialResultCallback,callback);
    }
,isc.A._asyncSummarizeRecords=function isc_c_AI__asyncSummarizeRecords(request,partialResultCallback,dabOpContext){
        var aiFieldRequest=request.aiFieldRequest;
        if(!aiFieldRequest){
            return isc.rejectWithError(isc.AsyncUtil.missingRequiredParameterErrorMessage.evalDynamicString(this,{paramName:"aiFieldRequest"}));
        }
        var dataSource=dabOpContext.dataSource;
        if(!dataSource){
            return isc.rejectWithError(isc.AsyncUtil.missingRequiredParameterErrorMessage.evalDynamicString(this,{paramName:"dataSource"}));
        }
        var records=request.records;
        if(!records){
            return isc.rejectWithError(isc.AsyncUtil.missingRequiredParameterErrorMessage.evalDynamicString(this,{paramName:"records"}));
        }
        var maxRecordsPerBatch;
        if(aiFieldRequest.maxRecordsPerBatch){
            maxRecordsPerBatch=aiFieldRequest.maxRecordsPerBatch;
            if(request.maxRecordsPerBatch){
                maxRecordsPerBatch=Math.min(maxRecordsPerBatch,request.maxRecordsPerBatch);
            }
        }else{
            maxRecordsPerBatch=request.maxRecordsPerBatch;
        }
        var ssMessages=[{content:aiFieldRequest.prompt,type:aiFieldRequest.promptType}],
            additionalMessages=aiFieldRequest.additionalMessages;
        if(additionalMessages){
            ssMessages.addList(additionalMessages);
            ssMessages.removeEmpty();
        }
        var fields;
        if(!isc.isAn.Array(aiFieldRequest.relevantFieldNames)||aiFieldRequest.relevantFieldNames.isEmpty()){
            fields=dabOpContext.availableFields;
        }else{
            fields=isc.getValues(isc.applyMask(dabOpContext.availableFieldsIndex,aiFieldRequest.relevantFieldNames));
            if(fields.isEmpty()){
                return isc.rejectWithError("No available field is relevant.");
            }
        }
        var fieldNames=fields.getProperty("name");
        var evalVars={
            dsSummary:this.summarizeDataSource(dataSource,fields,{format:"compactJSON"},false)
        };
        var aiMessagesBuilder=isc.InternalAIMessagesBuilder2.create({
            ssMessages:ssMessages,
            messagesSource:request.aiFieldRequestSource,
            target:this,
            evalVars:evalVars
        });
        var valueClass=aiFieldRequest.valueClass,
            categories=aiFieldRequest.categories;
        if(valueClass=="interval"||valueClass=="ratio"){
            aiMessagesBuilder.appendPrompts(this.summarizeRecordsPrompts_interval);
            if(isc.isA.Number(aiFieldRequest.minValue)){
                if(isc.isA.Number(aiFieldRequest.maxValue)&&aiFieldRequest.minValue>aiFieldRequest.maxValue){
                    return isc.rejectWithError("`aiFieldRequest.minValue` cannot be greater than `aiFieldRequest.maxValue`.");
                }
                evalVars.minValue=aiFieldRequest.minValue;
                aiMessagesBuilder.appendPrompt(this.summarizeRecordsPrompts_interval_minValue);
            }
            if(isc.isA.Number(aiFieldRequest.maxValue)){
                evalVars.maxValue=aiFieldRequest.maxValue;
                aiMessagesBuilder.appendPrompt(this.summarizeRecordsPrompts_interval_maxValue);
            }
            aiMessagesBuilder.appendPrompt(this.summarizeRecordsPrompts_interval_final);
        }else if(valueClass=="categorical"||valueClass=="ordinal"){
            for(var i=0;i<categories.length;++i){
                var category=categories[i];
                if(!isc.isA.String(category)){
                    return isc.rejectWithError("Non-string category at index "+i+" within `aiFieldRequest.categories`.");
                }
                if(categories.contains(category,i+1)){
                    return isc.rejectWithError("Duplicate category '"+category+"' in `aiFieldRequest.categories`.");
                }
            }
            if(categories.isEmpty()){
                return isc.rejectWithError("No categories are defined.");
            }
            var categoryHints=isc.applyMask(aiFieldRequest.categoryHints,categories);
            evalVars.categories=this._encodeJSON(categories);
            evalVars.categoryHints=this._encodeJSON(categoryHints);
            aiMessagesBuilder.appendPrompts(this.summarizeRecordsPrompts_categorical);
        }else{
            aiMessagesBuilder.appendPrompts(this.summarizeRecordsPrompts_general);
        }
        var nonNumerical=!this.isAIFieldRequestNumerical(aiFieldRequest);
        var templateAIRequest={
            cancellationController:dabOpContext.cancellationController,
            messages:aiMessagesBuilder.aiMessages,
            responseType:"object"
        };
        var repeatRequestSettings={
            cancellationController:dabOpContext.cancellationController,
            maxConcurrent:request.maxConcurrent,
            maxRecordsPerBatch:maxRecordsPerBatch,
            maxRetries:request.maxRetries==null?2:request.maxRetries,
            stopOnError:false
        };
        var partialResults=[];
        var summarizeRecordsContext={
            cancellationController:dabOpContext.cancellationController,
            request:request,
            partialResults:partialResults
        };
        var firstNonSuccess;
        return this.asyncRepeatRequestOnBatches(templateAIRequest,request.records,fieldNames,repeatRequestSettings,function(aiResponseForBatch){
            if(dabOpContext.cancellationController&&dabOpContext.cancellationController.canceled)return;
            var partialResult,
                partialResultCopy;
            if(aiResponseForBatch.type!="success"){
                if(!firstNonSuccess)firstNonSuccess=aiResponseForBatch;
                partialResult=aiResponseForBatch;
                partialResultCopy=isc.addPropertiesWithAssign({},partialResult);
            }else{
                var arr=aiResponseForBatch.message&&
                          aiResponseForBatch.message.content&&
                          aiResponseForBatch.message.content.result;
                if(!isc.isAn.Array(arr))arr=[arr];
                if(nonNumerical){
                    for(var i=0;i<arr.length;++i){
                        if(arr[i]==null)continue;
                        arr[i]=String(arr[i]);
                    }
                }else if(valueClass=="ordinal"){
                    for(var i=0;i<arr.length;++i){
                        if(arr[i]==null)continue;
                        if(isc.isAn.Object(arr[i])){
                            arr[i]=null;
                            continue;
                        }
                        var categoryIndex=categories.indexOf(String(arr[i]));
                        arr[i]=categoryIndex<0?null:categoryIndex;
                    }
                }else{
                    for(var i=0;i<arr.length;++i){
                        if(arr[i]==null)continue;
                        if(isc.isAn.Object(arr[i])){
                            arr[i]=null;
                            continue;
                        }
                        var number=parseFloat(arr[i]);
                        if(!isc.isA.Number(number)){
                            arr[i]=null;
                        }else{
                            if(isc.isA.Number(aiFieldRequest.minValue)){
                                number=Math.max(aiFieldRequest.minValue,number);
                            }
                            if(isc.isA.Number(aiFieldRequest.maxValue)){
                                number=Math.min(number,aiFieldRequest.maxValue);
                            }
                            arr[i]=number;
                        }
                    }
                }
                var batchLength=aiResponseForBatch.length;
                arr.setLength(batchLength);
                partialResult={
                    type:"success",
                    startIndex:aiResponseForBatch.startIndex,
                    length:batchLength
                };
                partialResultCopy=isc.addPropertiesWithAssign({},partialResult);
                if(nonNumerical){
                    partialResult.recordSummaries=arr;
                    partialResultCopy.recordSummaries=arr.duplicate();
                }else{
                    partialResult.recordNumericalSummaries=arr;
                    partialResultCopy.recordNumericalSummaries=arr.duplicate();
                }
            }
            partialResults.push(partialResult);
            isc.AI.fireCallback(partialResultCallback,isc.AI._summarizeRecordsPartialResultCallbackArgNames,
                    [partialResultCopy,summarizeRecordsContext]);
            return partialResult;
        })._whenSettled(function(result){
            if(firstNonSuccess||result.type!="success"){
                return Promise.reject(isc.addPropertiesWithAssign({},firstNonSuccess||result,{partialResults:partialResults}));
            }
            isc.AI._assert(!dabOpContext.cancellationController||
                           !dabOpContext.cancellationController.canceled);
            result.aiResponsesForBatches.sortByProperty("startIndex",true);
            var sortedPartialResults=result.aiResponsesForBatches.getProperty("callbackReturnValue"),
                recordSummaries=[];
            for(var recordIndex=0,i=0;i<sortedPartialResults.length;++i){
                var partialResult=sortedPartialResults[i];
                isc.AI._assert(recordIndex==partialResult.startIndex);
                isc.AI._assert(partialResult.length>0);
                var someRecordSummaries=nonNumerical?partialResult.recordSummaries:partialResult.recordNumericalSummaries;
                isc.AI._assert(someRecordSummaries.length==partialResult.length);
                recordSummaries.addList(someRecordSummaries);
                recordIndex+=partialResult.length;
            }
            var summarizeRecordsResult={
                type:"success",
                partialResults:partialResults
            };
            if(nonNumerical)summarizeRecordsResult.recordSummaries=recordSummaries;
            else summarizeRecordsResult.recordNumericalSummaries=recordSummaries;
            return summarizeRecordsResult;
        });
    }
,isc.A.translateText=function isc_c_AI_translateText(phrase,targetLocales,callback,context){
        if(!phrase||!targetLocales){
            this.logWarn("'phrase' and 'targetLocales' parameters are required");
            return;
        }
        if(!isc.isAn.Array(targetLocales))targetLocales=[targetLocales];
        var origLocales=targetLocales.duplicate();
        if(targetLocales.contains("sr")){
            targetLocales.remove("sr");
            targetLocales.add("sr-Cyrl");
        }
        var prompt="Please translate the source phrase '"+phrase+"' to this list of "+
                "locales: "+targetLocales.join(", ")+".\n\n";
        prompt+="All punctuation, HTML markup and non-alpha characters in the source phrase "+
            "should be included in your translation and any word prefixed with a '$' character, "+
            "such as '$description' or '$titleField', must be included verbatim without "+
            "translation.\n\n ";
        prompt+="Your response should be a simple JSON object where property-names are the "+
            "list of requested locale-codes, and each value is your translation to that locale.  "+
            "Any content outside of this JSON object, such as a prefix like 'Response:' is "+
            "invalid and should not be included.\n\n";
        if(context&&context.attrName){
            prompt+="For context, the source phrase is the default value for an Isomorphic "+
                "SmartClient framework property with the approximate name '"+
                context.attrName.replace("_"," ")+"' and the following description: "+
                context.doc+"\n";
        }
        var _this=this;
        isc.AI.sendPrompt(prompt,function(result){
            result=result.replaceAll("\"sr-Cyrl\"","\"sr\"");
            var obj=_this._extractJsonResult(result);
            _this.fireCallback(callback,"result,context",[obj,context]);
        },{showPrompt:false});
    }
,isc.A.buildFormula=function isc_c_AI_buildFormula(userPrompt,callback,context,aiConfig){
        aiConfig=isc.addProperties({},aiConfig,{showPrompt:false});
        var grid=context.grid||context.rootCanvas;
        var ds=context.dataSource;
        var allFields=ds!=null?isc.getValues(ds.getFields()):grid.getFields();
        var numericTypes=["float","integer","int","long","number","decimal","double"];
        var fields=[];
        for(var i=0;i<allFields.length;i++){
            if(numericTypes.contains(allFields[i].type||"text"))
                fields.add(allFields[i]);
        }
        var prompt="You are to generate an Isomorphic SmartClient UserFormula object based on "+
                "a user-provided description.\n\n";
        prompt+="A SmartClient UserFormula is an object with two properties - 'text', which "+
                "is a mathematical formula that can contain variable-names, and 'formulaVars' "+
                "which is an object mapping those variable-names to the names of fields on an "+
                "associated data-record.  The variable-names range from A-Z, and then onward "+
                "to a maximum of ZZZ.  You should map natural language to the most appropriate "+
                "field-names, which are listed below.  Only fields in this list are allowed.\n\n";
        prompt+="For example, a user might ask for and expect the following:\n\n"+
                "user-prompt: '(field1 plus field2) times 100'\n"+
                "response: {text:'(A+B)*100',formulaVars:{A:'field1',B:'field2'}}\n\n"+
                "or\n\n"+
                "user-prompt: 'Show the average of distance1 and distance2'\n"+
                "response: ({text:'(A+B)/2',formulaVars:{A:'distance1',B:'distance2'}})\n\n";
        prompt+="A trinary operator may be used if a user requests conditional logic. For example:\n\n"+
                  "user-prompt: 'if field1 is greater than zero, field2 * field3, otherwise -(field2 * field3)'\n"+
                  "response: ({text:'(A > 0) ? (B * C) : -(B*C)',formulaVars:{A:'field1',B:'field2',C:'field3'}})\n\n";
        prompt+="In addition to simple operators ('+','-','*','/'), the UserFormula text may make use of any of the following MathFunction(s).\n"+
                    "max(val1,val2): Maximum of two values\n"+
                    "min(val1,val2): Minimum of two values\n"+
                    "round(value,decimalDigits): Round a value up or down, optionally providing decimalDigits as the maximum number of decimal places to round to. For fixed or precision rounding, use toFixed() and toPrecision() respectively.\n"+
                    "ceil(value): Round a value up\n"+
                    "floor(value): Round a value down\n"+
                    "abs(value): Absolute value\n"+
                    "pow(value1,value2): value1 to the power of value2\n"+
                    "sqrt(value): Square root of a value\n"+
                    "dateAdd(value,interval,amount): Excel-compatible dataAdd function: adds quantities of a time interval to a date value. Also supports being passed interval names, like \"hour\" or \"week\".\n"+
                    "year(value): 4-digit integer that represents the year of a date.\n"+
                    "month(value): 1-12 integer that represents the month of a date.\n"+
                    "day(value): 1-31 integer that represents the day of month of a date.\n"+
                    "toPrecision(value,precision): Format a number to a length of precision digits, rounding or adding a decimal point and zero-padding as necessary. Note that the values 123, 12.3 and 1.23 have an equal precision of 3. Returns a formatted string and should be used as the outermost function call in a formula. For rounding, use round().\n"+
                    "toFixed(value,digits): Round or zero-pad a number to digits decimal places. Returns a formatted string and should be used as the outermost function call in a formula. To round values or restrict precision, use round() and toPrecision() respectively.\n"+
                    "sin(value): Sine of a value\n"+
                    "cos(value): Cosine of a value\n"+
                    "tan(value): Tangent of a value\n"+
                    "ln(value): natural logarithm of a value\n"+
                    "log(base,value): logarithm of a value with the specified base\n"+
                    "asin(value): Arcsine of a value\n"+
                    "acos(value): Arccosine of a value\n"+
                    "atan(value): Arctangent of a value (-PI/2 to PI/2 radians)\n"+
                    "atan2(value1,value2): Angle theta of a point (-PI to PI radians)\n"+
                    "exp(value): The value of Evalue\n"+
                    "random(): Random number between 0 and 1\n\n"+
                  "For example:\n\n"+
                  "user-prompt: 'show the maximum of region1Revenue, region2Revenue'\n"+
                  "response: ({text:'max(A,B)',formulaVars:{A:'region1Revenue',B:'region2Revenue'}})\n\n";
        prompt+="The user-prompt may indicate a name or title to use for the formula.  If not, "+
                  "please generate a short (two to four word) title.  Either way, please include it "+
                  "in the UserFormula object you generate, as the 'title' property.\n\n";
        prompt+="Here is the list of fields available for use in UserFormula objects - ";
        if(this.shouldUseAIFieldPaging(prompt,fields,aiConfig)){
            var _this=this;
            this.retrieveFieldsForPrompt(
                userPrompt,"Create a userFormula field for a ListGrid",fields,
                function(finalFields){
                    _this._buildFormulaWithFinalFields(userPrompt,prompt,callback,context,aiConfig,finalFields);
                },
                context,aiConfig
            );
        }else{
            this._buildFormulaWithFinalFields(userPrompt,prompt,callback,context,aiConfig,fields);
        }
    }
,isc.A._buildFormulaWithFinalFields=function isc_c_AI__buildFormulaWithFinalFields(userPrompt,prompt,callback,context,aiConfig,fields){
        prompt+=this.getSerializedFields(fields,aiConfig);
        prompt+="Your task is to generate a UserFormula object to satisfy this user request: '"+userPrompt+"'\n\n";
        prompt+="Please respond only with the UserFormula object - any surrounding content will cause JSON decode issues down-stream.\n"
        var _this=this;
        isc.AI.sendPrompt(
            prompt,
            function(result){
                var obj=_this._extractJsonResult(result);
                _this.fireCallback(callback,"result,context",[obj,context]);
            },
            aiConfig
        );
    }
,isc.A.getMultiActionAIWindow=function isc_c_AI_getMultiActionAIWindow(){
        var w=this.multiActionAIWindow;
        if(!w){
            w=isc.AI.multiActionAIWindow=isc.Window.create(this.multiActionAIWindowDefaults);
        }
        return w;
    }
,isc.A.buildCompositeViewSettings=function isc_c_AI_buildCompositeViewSettings(userPrompt,callback,context,aiConfig){
        var component=context.grid||context.component;
        var className=component&&component.getScClassName();
        if(className==null)className="ListGrid";
        if(!context.grid)context.grid=component;
        var actions=context.actions||isc.getKeys(this.componentActions);
        var prompt="A user is interacting with a(n) "+className+" component in an application built with Isomorphic SmartClient Javascript framework.\n"+
                    "The user has issued the following request:\n\n"+
                    "\""+userPrompt+"\"\n\n"+
                    "This may be requesting one or more actions of the following type(s):\n";
        for(var i=0;i<actions.length;i++){
            var actionName=actions[i];
            if(this.componentActions[actionName]==null)continue;
            prompt+=actionName+": "+this.componentActions[actionName].description+"\n";
        }
        prompt+="\n\nPlease determine which action(s) the user is requesting and return a series of rephrased queries as a JSON string "+
                  "where each attribute name is the requested action type, and the attribute value is a rephrased version of the part of the query "+
                  "that requests that action type.\n\n"
        prompt+="For example if the user prompt was: \n"+
                  "'Show only items where cost is greater than 1 and hilite the cost field for items that are on sale'\n"+
                  "An example response might be:\n"+
                  '{"filter":"Show only items where cost is greater than 1",'+
                  ' "hilite":"hilite the cost field for items that are on sale"}\n\n';
        prompt+="\nIf you can't determine which of actions are being requested, return an empty JSON object";
        var _this=this;
        var categorizeCallback=function(aiResponse){
            _this.processSplitCompositeViewRequests(aiResponse,userPrompt,callback,context,aiConfig);
        }
        var w=isc.AI.getMultiActionAIWindow();
        w.setTitle("Configure via AI - Determining tasks");
        w.setFirstAction(null);
        w.show();
        this.sendPrompt(prompt,categorizeCallback);
    }
,isc.A.processSplitCompositeViewRequests=function isc_c_AI_processSplitCompositeViewRequests(aiResponse,userPrompt,callback,context,aiConfig){
        aiResponse=aiResponse.replaceAll("```json","").replaceAll("```","");
        var actions=JSON.parse(aiResponse);
        var hasAction=false;
        context.actions=actions;
        context.actionResults={};
        context.callback=callback;
        var component=context.component;
        var w=isc.AI.getMultiActionAIWindow();
        w.setTitle("Configure via AI - Executing tasks");
        w.addActions(isc.addProperties({},actions));
        var _this=this;
        for(var actionType in actions){
            var actionPrompt=actions[actionType];
            if(this.componentActions[actionType]!=null){
                hasAction=true;
                var actionContext=isc.addProperties({
                        actionType:actionType,
                        originalContext:context
                    },context);
                var methodName=this.componentActions[actionType].methodName;
                if(methodName=="buildFilter"){
                    var buildRequest=isc.addProperties({showProgressDialog:false},{
                        userAIRequest:{prompt:actionPrompt},
                        dataSource:component.getDataSource(),
                        mode:component.filterViaAIMode=="AIDE"?"AIDE":"aiAssist"
                    });
                    var filterActionContext=isc.addProperties({},actionContext);
                    isc.AI.asyncBuildCriterion(buildRequest)
                        ._whenSettled(this.ns.EH._wrapCallback("PromiseSettled",function(buildResponse){
                            if(buildResponse.type!="canceled"){
                                if(buildResponse.type!="success"){
                                    isc.logWarn("buildCriterion() resulted in type: "+buildResponse.type+
                                                 ", errorMessage: "+buildResponse.errorMessage,"AI");
                                }
                            }
                            _this.buildCompositeViewSettingsReply(buildResponse.criterion,filterActionContext);
                        }));
                }else if(methodName=="buildHilite"){
                    var buildRequest={
                        userAIRequest:{prompt:actionPrompt},
                        records:component._getRecordsForAI(),
                        dataSource:component.getDataSource(),
                        mode:component.hiliteViaAIMode=="AIDE"?"AIDE":"aiAssist",
                        aiPageSize:component.aiPageSize,
                        showProgressDialog:false
                    };
                    var hiliteActionContext=isc.addProperties({},actionContext);
                    isc.AI.buildHilites(buildRequest,function(buildResponse){
                            if(buildResponse.type!="success"){
                                isc.warn("Hilite-via-AI failed: "+buildResponse.errorMessage);
                            }
                            _this.buildCompositeViewSettingsReply(buildResponse.hilites,hiliteActionContext);
                    });
                }else{
                    this[methodName](
                        actionPrompt,
                        function(result,actionContext){
                            _this.buildCompositeViewSettingsReply(result,actionContext);
                        },
                        actionContext,
                        aiConfig
                    );
                }
            }else{
                this.logWarn("Unrecognized action type '"+actionType+"' for AI-generated partial request:"+actions[actionType]);
                delete actions[actionType];
            }
        }
    }
);
isc.evalBoundary;isc.B.push(isc.A.buildCompositeViewSettingsReply=function isc_c_AI_buildCompositeViewSettingsReply(result,actionContext){
        var actionType=actionContext.actionType;
        var origContext=actionContext.originalContext;
        origContext.actionResults[actionContext.actionType]=result;
        var w=isc.AI.getMultiActionAIWindow();
        w.updateAction(actionType,true);
        delete origContext.actions[actionType];
        if(isc.isA.emptyObject(origContext.actions)){
            this.fireCallback(origContext.callback,"data,context",[origContext.actionResults,origContext]);
            w.hide();
        }
    }
);
isc.B._maxIndex=isc.C+181;

isc.A=isc.Operators;
isc.A.aiFilterTitle="matches a natural language description of a filter, as determined by AI";
isc.A.aiFilterDescriptionPrefix="Filter via AI: "
;

isc.DataSource.addSearchOperator({
    ID:"aiFilter",
    titleProperty:"aiFilterTitle",
    symbol:"\uD83E\uDD16",
    hidden:true,
    clientOnly:true,
    valueType:"custom",
    getDescription:function(aiCriterion,dataSource){
        return isc.Operators.aiFilterDescriptionPrefix+isc.AI._getPromptText(aiCriterion,dataSource).asHTML();
    },
    getCleanCriterion:function(aiCriterion,dataSource){
        return isc.AI._getCleanAICriterion(aiCriterion);
    },
    fromCleanCriterion:function(cleanCriterion,dataSource){
        return isc.AI._createFromCleanAICriterion(cleanCriterion);
    },
    condition:function(fieldName,fieldValue,criterionValues,dataSource){
        var aiCriterion=criterionValues.criterion;
        if(!isc.AI._canUseAICriterion(aiCriterion,dataSource)||
            aiCriterion.isTrivial)
        {
            return true;
        }
        var pkFieldNames=aiCriterion._pkFieldNames,
            record=criterionValues.record;
        if(pkFieldNames.length==1){
            var pkValue=record[pkFieldNames[0]];
            if(isc.isA.Class(aiCriterion._notPickedPkValues)&&aiCriterion._notPickedPkValues.has(pkValue)){
                return false;
            }
            if(isc.isA.Class(aiCriterion._pickedPkValues)&&aiCriterion._pickedPkValues.has(pkValue)){
                return true;
            }
        }else{
            this._assert(false);
        }
        if(dataSource._withinLogicalNot){
            if(!aiCriterion._narrowerCriterion)return false;
            return dataSource.evaluateCriterion(record,aiCriterion._narrowerCriterion);
        }else{
            if(!aiCriterion._broaderCriterion)return true;
            return dataSource.evaluateCriterion(record,aiCriterion._broaderCriterion);
        }
    },
    compareCriteria:function(newCriterion,oldCriterion){
        if(newCriterion._dsName!=oldCriterion._dsName){
            return-1;
        }
        var dataSource=isc.DS.getDataSource(newCriterion._dsName);
        if(dataSource==null||
            !isc.AI._canUseAICriterion(newCriterion,dataSource)||
            !isc.AI._canUseAICriterion(oldCriterion,dataSource))
        {
            return-1;
        }
        if(newCriterion.isTrivial){
            if(oldCriterion.isTrivial)return 0;
        }else{
            if(oldCriterion.isTrivial)return 1;
        }
        return-1;
    },
    getServerCriterion:function(aiCriterion,narrower,dataSource){
        var defaultServerCriterion=narrower?isc.DS._nothingCriterion:isc.DS._everythingCriterion;
        if(!isc.AI._canUseAICriterion(aiCriterion,dataSource)){
            return defaultServerCriterion;
        }
        if(aiCriterion.isTrivial){
            return isc.DS._everythingCriterion;
        }
        var combinedCriterion;
        if(narrower){
            var pickedCriterion=null,
                pkFieldNames=aiCriterion._pkFieldNames;
            if(pkFieldNames.length==1){
                var pkFieldName=pkFieldNames[0];
                if(isc.isA.Class(aiCriterion._pickedPkValues)){
                    pickedCriterion={
                        _constructor:"AdvancedCriteria",
                        fieldName:pkFieldName,
                        operator:"inSet",
                        value:aiCriterion._pickedPkValues.getContents()
                    };
                }
            }else{
                this._assert(false);
            }
            combinedCriterion=dataSource.combineCriteria(pickedCriterion,aiCriterion._narrowerCriterion);
        }else{
            combinedCriterion=dataSource.combineCriteria(aiCriterion._notPickedCriterion,aiCriterion._broaderCriterion);
        }
        return combinedCriterion==null?defaultServerCriterion:combinedCriterion;
    },
    asyncFilter:function(aiCriterion,records,asyncFilterContext){
        var dataSource=asyncFilterContext.dataSource;
        if(!isc.AI._canUseAICriterion(aiCriterion,dataSource)){
            return Promise.reject(isc.createErrorResult("The 'aiFilter' is not usable."));
        }
        if(aiCriterion.isTrivial)return null;
        var request={
            aiCriterion:aiCriterion,
            showProgressDialog:false,
            cancellationController:asyncFilterContext.cancellationController
        };
        if(asyncFilterContext.recordsWereUpdated){
            request.updatedRecords=records;
            return isc.AI.asyncReapplyAIFilter(request);
        }
        var partialResult=isc.AI._applyUsableAIFilterCaches(aiCriterion,records,dataSource);
        isc.AI._assert(isc.isAn.Array(partialResult.matchingRecords)&&
                       partialResult.matchingRecords.length+(partialResult.remainingRecords==null
                                                               ?0
                                                               :partialResult.remainingRecords.length)==records.length);
        if(!partialResult.remainingRecords||partialResult.remainingRecords.length==0){
            return null;
        }
        request.records=records;
        request._partialResult=partialResult;
        return isc.AI.asyncApplyAIFilter(request);
    },
    removeFromFilterCaches:function(aiCriterion,records){
        isc.AI.removeFromAIFilterCaches(aiCriterion,records);
    },
    clearFilterCaches:function(aiCriterion){
        isc.AI.clearAIFilterCaches(aiCriterion);
    },
    getDependencies:function(aiCriterion){
        if(aiCriterion.isTrivial)return[];
        return aiCriterion._finalFieldNames;
    }
});
isc.AI.init();
isc.FieldGeneratorRegistry.register({
    ID:"AI",
    asyncGenerateValues:function(field,records,context,partialResultCallback){
        var component=context.component,
            nonSuccessfulResultAtOutset=this.getNonSuccessfulResultAtOutset(field,component);
        if(nonSuccessfulResultAtOutset){
            isc.Class._assert(nonSuccessfulResultAtOutset.type!="success");
            return Promise.reject(nonSuccessfulResultAtOutset);
        }else if(records.getLength()>component.aiMaxRecords){
            return isc.rejectAsDisabled(component._getAIMaxRecordsMessage());
        }
        var request={
            cancellationController:context.cancellationController,
            component:component,
            dataSource:context.dataSource,
            excludeFieldNames:context.excludeFieldNames,
            aiFieldRequest:field.aiFieldRequest,
            records:records
        };
        return isc.AI.asyncSummarizeRecords(request,function(partialResult){
            var startIndex=partialResult.startIndex,
                endIndex=startIndex+partialResult.length;
            partialResult.records=records.slice(startIndex,endIndex);
            if(partialResult.type=="success"){
                partialResult.generatedValues=partialResult.recordSummaries||partialResult.recordNumericalSummaries;
            }
            isc.AI.fireCallback(partialResultCallback,"partialResult",[partialResult]);
        }).then(function(result){
                return{
                    type:result.type,
                    generatedValues:result.recordSummaries||result.recordNumericalSummaries
                };
            });
    },
    getNonSuccessfulResultAtOutset:function(field,component){
        if(!isc.AI.isEnabled()){
            return isc.createDisabledResult(isc.AI.aiWasDisabledMessage);
        }
    },
    getNonSuccessfulRecordSortResultAtOutset:function(sortSpecifier,component){
        var data=component.getDataAsList();
        if(!data)return;
        if(data.lengthIsKnown&&!data.lengthIsKnown()){
            return isc.createDisabledResult(isc.AsyncUtil.dataBeingFetchedMessage);
        }else if(data.getLength()>component._getAISortFieldMaxRecords()){
            return isc.createDisabledResult(component._getAISortFieldMaxRecordsMessage());
        }
    },
    getDependencies:function(field,component){
        if(!field.aiFieldRequest)return[];
        return field.aiFieldRequest.relevantFieldNames;
    },
    settingFieldPropertyInvalidatesCache:function(field,component,propertyName,newValue){
        if(propertyName=="aiFieldRequest"){
            if(field.aiFieldRequest==null)return newValue!=null;
            else if(newValue==null)return true;
            else{
                isc.Class._assert(field.aiFieldRequest!=null&&newValue!=null);
                return field.aiFieldRequest!==newValue;
            }
        }
    },
    controllingFieldProperties:["aiFieldRequest"]
});
isc.PseudoFieldGeneratorRegistry.register({
    type:"hover",
    ID:"AI",
    asyncGenerateValue:function(hoverPseudoFieldInfo,record,context){
        var masterFieldName=hoverPseudoFieldInfo.masterFieldName;
        if(!isc.isA.nonemptyString(masterFieldName)){
            return isc.rejectWithError("Expecting `masterFieldName` to be a single field name.");
        }
        var masterField=context.component.getSpecifiedField(masterFieldName);
        if(!masterField){
            return isc.rejectWithError("No such field named '"+masterFieldName+"'");
        }
        var aiHoverRequest=masterField.aiHoverRequest;
        if(!aiHoverRequest){
            return isc.rejectWithError("The master field is missing an `aiHoverRequest`.");
        }
        var request={
            cancellationController:context.cancellationController,
            value:record[masterFieldName],
            aiRequest:aiHoverRequest,
            examples:aiHoverRequest.examples
        };
        if(aiHoverRequest.includeRecord!=false){
            request.component=context.component;
            request.record=record;
            request.relevantFieldNames=aiHoverRequest.relevantFieldNames;
            request.fieldName=masterFieldName;
        }
        return isc.AI.asyncSummarizeValue(request)
            .then(function(result){
                return{
                    type:result.type,
                    generatedValue:result.summary.trim().asHTML()
                };
            });
    },
    getDependencies:function(hoverPseudoFieldInfo,component){
        var masterFieldName=hoverPseudoFieldInfo.masterFieldName;
        if(!isc.isA.nonemptyString(masterFieldName))return[];
        var masterField=component.getSpecifiedField(masterFieldName);
        if(!masterField)return[];
        var aiHoverRequest=masterField.aiHoverRequest;
        if(!aiHoverRequest)return[];
        if(aiHoverRequest.includeRecord!=false)return[masterFieldName];
        var relevantFieldNames=aiHoverRequest.relevantFieldNames;
        if(!relevantFieldNames)return null;
        if(!relevantFieldNames.contains(masterFieldName)){
            relevantFieldNames=relevantFieldNames.duplicate();
            relevantFieldNames.push(masterFieldName);
        }
        return relevantFieldNames;
    },
    getRetryDelay:function(hoverPseudoFieldInfo,component){
        return component.aiHoverRetryDelay;
    },
    getPlaceholderHoverContents:function(hoverPseudoFieldInfo,record,component){
        return component.placeholderAIHoverContents;
    },
    formatHoverContents:function(hoverPseudoFieldInfo,record,component,generatedContents){
        var masterFieldName=hoverPseudoFieldInfo.masterFieldName,
            field=!isc.isA.nonemptyString(masterFieldName)?null:component.getSpecifiedField(masterFieldName),
            hoverContents=(field&&field.aiHoverContentsPrefix!=null
                             ?field.aiHoverContentsPrefix
                             :component.aiHoverContentsPrefix)||"";
        if(!generatedContents||!(generatedContents=String(generatedContents))){
            hoverContents+=component.emptyAIHoverContents;
        }else{
            hoverContents+=generatedContents;
        }
        return hoverContents;
    }
});
isc.defineClass("AnswerEngineOperation","PausableAsyncOperation");
isc.A=isc.AnswerEngineOperation;
isc.A.allDashboardComponentTypes=["label","list","chart","value"]
;

isc.A=isc.AnswerEngineOperation.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.jsonEncoderDefaults={
        prettyPrint:false,
        dateFormat:"logicalDateString",
        strictQuoting:true
    };
isc.A.maxRecordsPerQuery=15;
isc.B.push(isc.A.init=function isc_AnswerEngineOperation_init(){
        this.Super("init",arguments);
        if(!this.jsonEncoder){
            this.jsonEncoder=isc.JSONEncoder.create(this.jsonEncoderDefaults,this.jsonEncoderProperties);
        }
        var maxRecordsPerQuery=this.maxRecordsPerQuery;
        if(maxRecordsPerQuery==null||
            !isc.isA.Number(maxRecordsPerQuery)||
            maxRecordsPerQuery!=Math.trunc(maxRecordsPerQuery)||
            maxRecordsPerQuery<0)
        {
            maxRecordsPerQuery=this.maxRecordsPerQuery=this.getClass().getInstanceProperty("maxRecordsPerQuery");
            this.logWarn("Invalid 'maxRecordsPerQuery'. Resetting to "+maxRecordsPerQuery,"AnswerEngine");
        }
        if(!this.isCanceled()){
            isc.AI._touchAnswerEngineOperation(this);
            this.__doContinue();
        }
    }
,isc.A.getID=function isc_AnswerEngineOperation_getID(){
        if(this.ID==null)this.ns.ClassFactory.addGlobalID(this);
        return this.ID;
    }
,isc.A._getLogIdString=function isc_AnswerEngineOperation__getLogIdString(){
        return this.getID()+"[questionId: '"+this.dataQuestion.ID+"']";
    }
,isc.A.handleCancel=function isc_AnswerEngineOperation_handleCancel(wasFirstCancel,ownCC){
        this.Super("handleCancel",arguments);
        if(wasFirstCancel){
            isc.AI._removeAnswerEngineOperation(this);
        }
    }
,isc.A.unpause=function isc_AnswerEngineOperation_unpause(_initiator){
        var returnVal=this.Super("unpause",arguments);
        if(returnVal){
            isc.AI._touchAnswerEngineOperation(this,_initiator);
        }
        return returnVal;
    }
,isc.A.__doContinue=function isc_AnswerEngineOperation___doContinue(){
        if(this.dataQuestion.result){
            this.logDebug("__doContinue() called, but already have a result, so returning","AnswerEngine");
            return;
        }
        this.continueWith(function(answerEngineOperation){
            var currentStep=answerEngineOperation.currentStep;
            if(!currentStep){
                if(!answerEngineOperation.dataQuestion.summarizedUserMessages){
                    currentStep={
                        type:"summarizeUserAIRequest"
                    };
                }else{
                    currentStep={
                        type:"determineNextStep"
                    };
                }
            }
            return answerEngineOperation._asyncPerformAndGetNextStep(currentStep);
        })._then(
                function(nextStep){
                    this.currentStep=nextStep;
                    this.__doContinue();
                },
                function(e){
                    var nonSuccessfulResult=isc.defaultAsyncOperationCatchCallback(e);
                    if(this.logIsDebugEnabled("AnswerEngine")){
                        this.logDebug("Received a non-successful result: "+isc.echoFull(nonSuccessfulResult)+
                                " Have a DQ result: "+!!this.dataQuestion.result,"AnswerEngine");
                    }
                    if(!this.dataQuestion.result){
                        this.dataQuestion.result=nonSuccessfulResult;
                    }
                    this.postResult(nonSuccessfulResult);
                },
                this
            );
    }
,isc.A._asyncPerformAndGetNextStep=function isc_AnswerEngineOperation__asyncPerformAndGetNextStep(step){
        var stepType=step.type;
        this.logDebug("Performing a step of type '"+stepType+"'","AnswerEngine");
        if(stepType=="summarizeUserAIRequest"){
            var userAIRequest=this.dataQuestion.userAIRequest,
                userMessages=[{content:userAIRequest.prompt,type:userAIRequest.promptType}];
            if(userAIRequest.additionalMessages){
                userMessages.addList(userAIRequest.additionalMessages);
                userMessages.removeEmpty();
            }
            this.dataQuestion.summarizedUserMessages=userMessages;
            return Promise.resolve({type:"determineNextStep"});
        }else if(stepType=="determineNextStep"){
            return isc.AI._asyncAnswerEngineDetermineNextStep(this);
        }else if(stepType=="makeQuery"){
            return isc.AI._asyncAnswerEngineMakeQuery(this,step)
                ._then(function(dsRequestProperties){
                    var makeQueryStepResult={
                        step:step,
                        dsRequestProperties:dsRequestProperties
                    };
                    return{
                        type:"validateQuery",
                        makeQueryStepResult:makeQueryStepResult
                    };
                },
                null,
                this);
        }else if(stepType=="validateQuery"){
            return this._asyncAnswerEngineValidateQuery(step)
                ._then(function(queryValidationResult){
                    if(queryValidationResult!=null){
                        return isc.rejectWithError("not yet implemented");
                    }
                    return{
                        type:"executeQuery",
                        validatedMakeQueryStepResult:step.makeQueryStepResult
                    };
                },
                null,
                this);
        }else if(stepType=="executeQuery"){
            return this._asyncAnswerEngineExecuteQuery(step)
                ._then(function(dsResponse){
                    var data=dsResponse.data;
                    if(!isc.isAn.Array(data)){
                        if(isc.isAn.Object(data))data=[data];
                        else data=[];
                    }
                    var executeQueryStepResult={
                        step:step,
                        data:dsResponse.data
                    };
                    if(dsResponse.progressiveLoading!=true){
                        var totalRows=dsResponse.totalRows;
                        if(totalRows!=null){
                            executeQueryStepResult.totalRows=totalRows;
                            executeQueryStepResult.estimatedTotalRows=String(totalRows);
                        }
                    }else{
                        executeQueryStepResult.estimatedTotalRows=dsResponse.estimatedTotalRows;
                    }
                    if(!this.dataQuestion.prevStepResults)this.dataQuestion.prevStepResults=[];
                    this.dataQuestion.prevStepResults.push(executeQueryStepResult);
                    return null;
                },
                null,
                this);
        }else if(stepType=="createDashboardComponent"){
            return isc.AI._asyncAnswerEngineCreateDashboardComponent(this,step)
                ._then(function(jsCode){
                    var createDashboardComponentStepResult={
                        step:step,
                        jsCode:jsCode
                    };
                    return{
                        type:"validateDashboardComponent",
                        createDashboardComponentStepResult:createDashboardComponentStepResult
                    };
                },
                null,
                this);
        }else if(stepType=="validateDashboardComponent"){
            return this._asyncAnswerEngineValidateDashboardComponent(step)
                ._then(function(validateDashboardComponentStepResult){
                    if(validateDashboardComponentStepResult.validationErrors){
                        var createDashboardComponentStep=step.createDashboardComponentStepResult.step;
                        delete step.createDashboardComponentStepResult.step;
                        return{
                            type:"fixDashboardComponent",
                            createDashboardComponentStep:createDashboardComponentStep,
                            prevValidateDashboardComponentStepResults:[validateDashboardComponentStepResult]
                        };
                    }
                    return{
                        type:"_acceptDashboardComponent",
                        nodes:validateDashboardComponentStepResult.nodes,
                        jsCode:step.createDashboardComponentStepResult.jsCode
                    };
                },
                null,
                this);
        }else if(stepType=="fixDashboardComponent"){
            return isc.AI._asyncAnswerEngineFixDashboardComponent(this,step)
                ._then(function(newJSCode){
                    var newValidateDashboardComponentStep={
                        type:"validateDashboardComponent",
                        createDashboardComponentStepResult:{
                            step:step.createDashboardComponentStep,
                            jsCode:newJSCode
                        }
                    };
                    return this.continueWith({
                        target:this,
                        methodName:"_asyncAnswerEngineValidateDashboardComponent",
                        args:[newValidateDashboardComponentStep]
                    })._then(function(newValidateDashboardComponentStepResult){
                            delete newValidateDashboardComponentStep.createDashboardComponentStepResult.step;
                            if(newValidateDashboardComponentStepResult.validationErrors){
                                var nextStep=isc.addPropertiesWithAssign({},step);
                                nextStep.prevValidateDashboardComponentStepResults.push(newValidateDashboardComponentStepResult);
                                return nextStep;
                            }
                            return{
                                type:"_acceptDashboardComponent",
                                nodes:newValidateDashboardComponentStepResult.nodes,
                                jsCode:newJSCode
                            };
                        },
                        null,
                        this);
                },
                null,
                this);
        }else if(stepType=="createDashboard"){
            return this._asyncAnswerEngineCreateDashboard(step)
                ._then(function(promiseOutcomes){
                    var successfulResult={
                        type:"success",
                        promiseOutcomes:promiseOutcomes
                    };
                    if(this.logIsDebugEnabled("AnswerEngine")){
                        this.logDebug("Received a successful result: "+isc.echoFull(successfulResult)+
                                " Have a DQ result: "+!!this.dataQuestion.result,"AnswerEngine");
                    }
                    if(!this.dataQuestion.result){
                        this.dataQuestion.result=successfulResult;
                    }
                    this.postResult(successfulResult);
                    return null;
                },
                null,
                this);
        }
        return isc.rejectWithError("The code to perform step type '"+stepType+"' is not implemented.");
    }
,isc.A._asyncAnswerEngineValidateQuery=function isc_AnswerEngineOperation__asyncAnswerEngineValidateQuery(validateQueryStep){
        var answerEngineOperation=this;
        return Promise.resolve();
    }
,isc.A._asyncAnswerEngineExecuteQuery=function isc_AnswerEngineOperation__asyncAnswerEngineExecuteQuery(executeQueryStep){
        var validatedMakeQueryStepResult=executeQueryStep.validatedMakeQueryStepResult,
            dataSourceName=validatedMakeQueryStepResult.step.dataSourceName,
            validatedDSRequestProperties=validatedMakeQueryStepResult.dsRequestProperties;
        var dataSource=isc.DS.get(dataSourceName);
        var dsRequest=isc.addPropertiesWithAssign({},validatedDSRequestProperties,{
            showPrompt:false
        });
        return dataSource.asyncExecute(dsRequest);
    }
,isc.A._asyncAnswerEngineValidateDashboardComponent=function isc_AnswerEngineOperation__asyncAnswerEngineValidateDashboardComponent(validateDashboardComponentStep){
        var answerEngineOperation=this,
            createDashboardComponentStepResult=validateDashboardComponentStep.createDashboardComponentStepResult;
        return new Promise(function(resolve,reject){
            var handleError=function handleError(e){
                resolve({
                    step:validateDashboardComponentStep,
                    nodes:null,
                    validationErrors:[{
                        jsError:e
                    }]
                });
            };
            try{
                isc.AI._getPaletteNodesAndValidationResult(createDashboardComponentStepResult.jsCode,handleError,function(nodes,validationErrors){
                    resolve({
                        step:validateDashboardComponentStep,
                        nodes:nodes,
                        validationErrors:validationErrors
                    });
                });
            }catch(e){
                handleError(e);
            }
        });
    }
,isc.A._asyncAnswerEngineCreateDashboard=function isc_AnswerEngineOperation__asyncAnswerEngineCreateDashboard(createDashboardStep){
        var mapper=isc.CreateDashboardComponentsMapper.create({
            cancellationController:this.cancellationController,
            values:createDashboardStep.createDashboardComponentSteps,
            answerEngineOperation:this
        });
        return mapper.getPromise();
    }
);
isc.B._maxIndex=isc.C+11;

isc.defineClass("CreateDashboardComponentsMapper","ResolvedValuesMapper");
isc.A=isc.CreateDashboardComponentsMapper.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.keepSettledStatus=true;
isc.A.maxConcurrent=3;
isc.B.push(isc.A.asyncMap=function isc_CreateDashboardComponentsMapper_asyncMap(createDashboardComponentStep,index){
        return this.answerEngineOperation.continueWith({
            target:this,
            methodName:"__asyncMap",
            args:[createDashboardComponentStep,createDashboardComponentStep]
        });
    }
,isc.A.__asyncMap=function isc_CreateDashboardComponentsMapper___asyncMap(createDashboardComponentStep,step){
        return this.answerEngineOperation._asyncPerformAndGetNextStep(step)
            ._then(function(nextStep){
                if(!nextStep)return isc.rejectWithError("No next step");
                if(nextStep.type=="_acceptDashboardComponent"){
                    return Promise.resolve({
                        step:createDashboardComponentStep,
                        jsCode:nextStep.jsCode,
                        nodes:nextStep.nodes
                    });
                }
                return this.answerEngineOperation.continueWith({
                    target:this,
                    methodName:"__asyncMap",
                    args:[createDashboardComponentStep,nextStep]
                });
            },
            null,
            this);
    }
);
isc.B._maxIndex=isc.C+2;

isc.A=isc.AI;
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.maxActiveAnswerEngineOperations=10;
isc.A.__currentAnswerEngineOperations=[];
isc.A.__answerEngineOperationByQuestionId={};
isc.A._askDataQuestionResultCallbackArgNames="result,dataQuestion";
isc.A.defaultMaxFixAttempts=2;
isc.A.answerEnginePrompts_initial="You are an intelligent Answer Engine embedded in an "+
        "Isomorphic SmartClient app, which is able to answer natural language questions about "+
        "a data model via making a series of queries against different DataSources in the app, "+
        "and then assembling an Answer Dashboard using SmartClient UI components to convey the answer.";
isc.A.answerEnginePrompts_applicationPurpose="The described purpose of the application is: \"${applicationPurpose}\"";
isc.A.answerEnginePrompts_dataQuestion=[
        "The end user's question for you is:",
        "${userMessages}"
    ];
isc.A.answerEnginePrompts_dataSourcesIntro="The DataSources in the application are:";
isc.A.answerEnginePrompts_perDataSourceDump="DataSource '${dsName}', which is summarized as "+
        "\"${dsSummary}\" and has the following fields:\n"+
        "${dsFields}";
isc.A.answerEnginePrompts_prevStepsDumpIntro="The previous steps you have taken, and "+
        "their results, are as follows:";
isc.A.answerEnginePrompts_perPrevStepDump="A '${prevStepType}' step (${prevStep}) with the result: ${prevStepResult}";
isc.A.determineNextStepPrompts_nextStepPrompts="You are to determine the next step to take in order to answer the end user's question. "+
        "Your response should be a single JSON object with key \"nextStepType\" set to one of the "+
        "following choices, along with the additional step-specific data:\n"+
        "\n"+
        "1. \"makeQuery\" - Describe a query on one of the DataSources which is likely to result in "+
        "useful information for answering the end user's question. If you select this step type, your "+
        "response JSON object must have the following format:\n"+
        "{\n"+
        "\"nextStepType\":\"makeQuery\",\n"+
        "\"dataSourceName\":The ID of the DataSource to query,\n"+
        "\"queryPurpose\":A string containing a detailed explanation of the purpose for making a query,\n"+
        "\"queryDescription\":A string containing a detailed description of the query to make against the selected "+
        "DataSource. This should include the relevant names of fields to select, how to group records, the "+
        "summary functions (such as count(), sum(), max(), and min()) to use and on which fields for each group.\n"+
        "}\n"+
        "\n"+
        "2. \"createDashboard\" - Describe a dashboard to visually explain an answer to the "+
        "end user's question. If you select this step type, your response JSON object must have the following format:\n"+
        "{\n"+
        "\"nextStepType\":\"createDashboard\",\n"+
        "\"components\":An array of objects, where each object has the following format:\n"+
        "    {\n"+
        "        \"componentType\":One of the component types listed below,\n"+
        "        \"description\":A string that describes in detail a single component of the specified type to add to the dashboard.\n"+
        "    }\n"+
        "}\n"+
        "The choice of component types are:\n"+
        "- \"label\" - A component that displays a static string of text."+
        "- \"list\" - A ListGrid which displays data from a single DataSource, and which may: "+
        "    * apply a filter to select a subset of the records from the DataSource according to criteria\n"+
        "    * sort the displayed records by one or more fields, with the sort by each field either in ascending or descending order\n"+
        "    * hilite a subset of the records according to criteria\n"+
        "    * group the records by one or more fields\n"+
        "    * apply summary functions to each group of records\n"+
        "    * show the data from a subset of the fields of the DataSource\n"+
        "    * have additional 'formula' fields which contain the result of an arithmetical formula involving values of each record"+
        "- \"chart\" - A chart, such as a line graph, bar chart, or pie chart to display data from a single DataSource, and which may:"+
        "    * apply a filter to select a subset of the records from the DataSource according to criteria\n"+
        "    * plot one or more fields of records from the DataSource\n"+
        "    * have a title and labels for axes of the chart\n"+
        "- \"value\" - A Label displaying a single value (scalar) derived from the data in a dataSource"+
        "\n"+
        "You are free to incorporate the results of previous steps.\n"+
        "\n"+
        "If you do not have enough information to answer the end user's question, default to describing "+
        "a \"makeQuery\" next step, in order to obtain more information from the data.";
isc.A.allowedDSRequestPropertyNames=["data","groupBy","summaryFunctions","sortBy","startRow","endRow"];
isc.A.makeQueryStepPrompts="You have previously decided to make a query on the '${dsName}' DataSource.\n"+
        "\n"+
        "You stated that the purpose of the query is \"${queryPurpose}\"\n"+
        "\n"+
        "A detailed description of the query that you want to make is: \"${queryDescription}\"\n"+
        "\n"+
        "You are now to convert your description of the query into a JSON object, a DSRequest object.\n"+
        "\n"+
        "The following properties are available for a DSRequest object:\n"+
        "\n"+
        "\n\"data\": An AdvancedCriteria object that can be used to filter records in the DataSource to only those matching the specified criteria.\n"+
        "The format of AdvancedCriteria is:\n"+
        "${advancedCriteriaFormatDescription}"+
        "\n\"groupBy\": An array of field name strings to group records by. Note that records are filtered by the AdvancedCriteria before they are grouped.\n"+
        "\n\"summaryFunctions\": An object that maps a field name to the summary function to use on that field. The available summary functions are:\n"+
        "    * \"sum\"\n"+
        "    * \"avg\"\n"+
        "    * \"max\"\n"+
        "    * \"min\"\n"+
        "    * \"count\"\n"+
        "\n\"sortBy\": Field name to sort by, prefixed with optional \"-\" indicating descending sort. For example, to sort by the field \"userName\" in ascending order, set \"sortBy\" to just \"userName\". For descending sort on \"userName\", set \"sortBy\" to \"-userName\".\n"+
        "To sort by multiple fields, an array of field names is also supported. For example, to sort by the field \"department\" in ascending order, followed by the field \"userName\" in descending order, set \"sortBy\" to: [\"department\", \"-userName\"]\n"+
        "\n\"startRow\": Zero-based index of the starting row to fetch from the query results. If not specified, the default is 0.\n"+
        "\n\"endRow\": Zero-based index of the ending row to fetch from the query results. The record at index \"endRow\" is not included. If not specified, the default is ${maxRecordsPerQuery}.\n";
isc.A.createDashboardComponentPrompts_intro="You have previously decided to build a ${componentType} dashboard component.\n"+
        "\n"+
        "A detailed description of the component to be created is: \"${description}\"\n"+
        "\n"+
        "Please generate JavaScript code to create a SmartClient ${componentType} according to this description.\n"+
        "\n"+
        "Further instructions for creating the code for a SmartClient ${componentType} are as follows:\n"+
        "${codePrompt}";
isc.A.createDashboardComponentPrompts_labelCodePrompt="A Label displays a single, static string of HTML.\n"+
        "The \"contents\" property of the Label is the HTML string to display.\n"+
        "The \"align\" property may be set to \"center\", \"left\", or \"right\" to align the "+
        "contents to the center, left, or right of the container, respectively.";
isc.A.fixDashboardComponentPrompts="You generated the following JavaScript:\n"+
        "\n"+
        "```javascript\n"+
        "${prevJSCode}\n"+
        "```\n"+
        "\n"+
        "This JavaScript code is not correct for the following reasons:\n"+
        "${validationErrors}\n"+
        "\n"+
        "Please try again to generate JavaScript code to create the component, correcting these errors.";
isc.B.push(isc.A._touchAnswerEngineOperation=function isc_c_AI__touchAnswerEngineOperation(answerEngineOperation,initiator){
        if(answerEngineOperation.isCanceled())return;
        var dataQuestion=answerEngineOperation.dataQuestion,
            questionId=dataQuestion.ID,
            existingAnswerEngineOperation=this.__answerEngineOperationByQuestionId[questionId];
        if(existingAnswerEngineOperation&&
            existingAnswerEngineOperation!==answerEngineOperation&&
            !existingAnswerEngineOperation.isCanceled())
        {
            existingAnswerEngineOperation.cancel("A different <code>AnswerEngineOperation</code> instance ("+
                    existingAnswerEngineOperation.getID()+") was working on data question ID '"+
                    String(questionId).asHTML()+"'. Replacing...",initiator);
        }
        this.__answerEngineOperationByQuestionId[questionId]=answerEngineOperation;
        while(this.__currentAnswerEngineOperations.remove(answerEngineOperation)){
        }
        this.__currentAnswerEngineOperations.addAt(answerEngineOperation,0);
        var maxActiveAnswerEngineOperations=this.maxActiveAnswerEngineOperations;
        if(maxActiveAnswerEngineOperations<0||maxActiveAnswerEngineOperations==Infinity)return;
        var numActiveAnswerEngineOperations=0;
        for(var o=0;o<this.__currentAnswerEngineOperations.length;++o){
            answerEngineOperation=this.__currentAnswerEngineOperations[o];
            if(answerEngineOperation.isCanceled()||answerEngineOperation.paused)continue;
            if(++numActiveAnswerEngineOperations>maxActiveAnswerEngineOperations){
                answerEngineOperation.cancel("Canceling all but "+Math.trunc(maxActiveAnswerEngineOperations)+" active <b><em>Answer Engine</em></b> operations.",initiator);
            }
        }
    }
,isc.A._removeAnswerEngineOperation=function isc_c_AI__removeAnswerEngineOperation(answerEngineOperation){
        var dataQuestion=answerEngineOperation.dataQuestion,
            questionId=dataQuestion.ID,
            existingAnswerEngineOperation=this.__answerEngineOperationByQuestionId[questionId];
        if(existingAnswerEngineOperation&&
            existingAnswerEngineOperation===answerEngineOperation)
        {
            delete this.__answerEngineOperationByQuestionId[questionId];
        }
        while(this.__currentAnswerEngineOperations.remove(answerEngineOperation)){
        }
    }
,isc.A._createAnswerEngineOperation=function isc_c_AI__createAnswerEngineOperation(question,dataSources,settings){
        var userAIRequest=isc.isA.String(question)?{prompt:question}:question;
        if(!dataSources&&settings.dataSourceNames){
            dataSources=settings.dataSourceNames.map(function(dsName){
                return isc.DS.get(dsName);
            });
        }
        var dataSourceNames;
        if(!dataSources){
            dataSourceNames=this.getDataSourceNames();
            dataSources=dataSourceNames.map(function(dsName){
                return isc.DS.get(dsName);
            });
        }else{
            for(var rd=dataSources.length;rd>0;--rd){
                var d=rd-1,
                    dataSource=dataSources[d];
                if(isc.isA.nonemptyString(dataSource))dataSource=isc.DS.get(dataSource);
                if(!dataSource){
                    dataSources.removeAt(d);
                    this.logWarn("`dataSources["+d+"]` either is not a global data source "+
                            "name, or the data source does not have a global ID. Removing...","AnswerEngine");
                }
            }
            dataSourceNames=dataSources.getProperty("ID");
        }
        if(!settings)settings={};
        settings.dataSourceNames=dataSourceNames;
        var allowedDashboardComponentTypes=settings.allowedDashboardComponentTypes;
        if(allowedDashboardComponentTypes){
            for(var rt=allowedDashboardComponentTypes.length;rt>0;--rt){
                var t=rt-1,
                    dashboardComponentType=allowedDashboardComponentTypes[t];
                if(!isc.AnswerEngineOperation.allDashboardComponentTypes.contains(dashboardComponentType)){
                    this.logWarn("Unknown dashboard component type '"+dashboardComponentType+"' specified in the list of allowed types. Removing...","AnswerEngine");
                    allowedDashboardComponentTypes.removeAt(t);
                }
            }
        }
        return isc.AnswerEngineOperation.create({
            dataQuestion:{
                ID:isc.Math.randomUUID(),
                userAIRequest:userAIRequest,
                settings:settings
            },
            dataSources:dataSources,
            _aiConfig:{
                maxRetries:0,
                serializationFormat:"compactJSON"
            }
        });
    }
,isc.A.askDataQuestion=function isc_c_AI_askDataQuestion(question,dataSources,settings,callback){
        var answerEngineOperation=this._createAnswerEngineOperation(question,dataSources,settings);
        return answerEngineOperation.asyncGetResult()
            ._whenSettled(function(result){
                this.fireCallback(callback,this._askDataQuestionResultCallbackArgNames,
                        [result,answerEngineOperation.dataQuestion]);
            },this);
    }
,isc.A.cancelDataQuestion=function isc_c_AI_cancelDataQuestion(questionId,_initiator){
        var answerEngineOperation=this.__answerEngineOperationByQuestionId[questionId];
        if(!answerEngineOperation){
            this.logError("Unknown questionId '"+questionId+"'","AnswerEngine");
        }else if(answerEngineOperation.isCanceled()){
            this.logWarn("The Answer Engine operation for questionId '"+questionId+"' is already canceled.","AnswerEngine");
        }else{
            answerEngineOperation.cancel("AI.cancelDataQuestion() was called to cancel the <b><em>Answer Engine</em></b> operation.",_initiator);
        }
    }
,isc.A.pauseDataQuestion=function isc_c_AI_pauseDataQuestion(questionId,_initiator){
        var answerEngineOperation=this.__answerEngineOperationByQuestionId[questionId];
        if(!answerEngineOperation){
            this.logError("Unknown questionId '"+questionId+"'","AnswerEngine");
        }else{
            var promise=answerEngineOperation.pause(_initiator);
            if(promise)promise["catch"](isc.noOp);
        }
    }
,isc.A.resumeDataQuestion=function isc_c_AI_resumeDataQuestion(questionId,_initiator){
        var answerEngineOperation=this.__answerEngineOperationByQuestionId[questionId];
        if(!answerEngineOperation){
            this.logError("Unknown questionId '"+questionId+"'","AnswerEngine");
        }else{
            answerEngineOperation.unpause(_initiator);
        }
    }
,isc.A._getAnswerEngineMessagesBuilder=function isc_c_AI__getAnswerEngineMessagesBuilder(answerEngineOperation){
        var dataQuestion=answerEngineOperation.dataQuestion;
        var settings=dataQuestion.settings;
        var evalVars={
            applicationPurpose:settings.applicationPurpose,
            dsName:"${dsName}",
            dsSummary:"${dsSummary}",
            dsFields:"${dsFields}",
            prevStepType:"${prevStepType}",
            prevStep:"${prevStep}",
            prevStepResult:"${prevStepResult}"
        };
        var aiMessagesBuilder=isc.InternalAIMessagesBuilder.create({
            userMessages:dataQuestion.summarizedUserMessages,
            target:this,
            evalVars:evalVars
        });
        aiMessagesBuilder.appendPrompts(this.answerEnginePrompts_initial);
        if(isc.isA.nonemptyString(settings.applicationPurpose)){
            aiMessagesBuilder.appendPrompts(this.answerEnginePrompts_applicationPurpose);
        }
        aiMessagesBuilder.appendPrompts(this.answerEnginePrompts_dataQuestion);
        var dataSources=answerEngineOperation.dataSources;
        if(dataSources){
            aiMessagesBuilder.appendPrompts(this.answerEnginePrompts_dataSourcesIntro);
            for(var d=0;d<dataSources.length;++d){
                var dataSource=dataSources[d],
                    dsFields=dataSource.getAllFields();
                evalVars.dsName=dataSource.getID();
                evalVars.dsSummary=isc.AI.getShortDSDescription(dataSource);
                evalVars.dsFields=isc.AI.getSerializedFields(dsFields,{format:"compactJSON"});
                aiMessagesBuilder.appendPrompts(this.answerEnginePrompts_perDataSourceDump);
            }
        }
        var prevStepResults=dataQuestion.prevStepResults;
        if(prevStepResults){
            aiMessagesBuilder.appendPrompts(this.answerEnginePrompts_prevStepsDumpIntro);
            for(var psr=0;psr<prevStepResults.length;++psr){
                var prevStepResult=isc.addPropertiesWithAssign({},prevStepResults[psr]),
                    prevStep=isc.addPropertiesWithAssign({},prevStepResult.step),
                    prevStepType=prevStep.type;
                delete prevStepResult.step;
                delete prevStep.type;
                if(prevStepType=="executeQuery"){
                    prevStepType="makeQuery";
                    var validatedMakeQueryStepResult=prevStep.validatedMakeQueryStepResult,
                        makeQueryStep=validatedMakeQueryStepResult.step;
                    prevStep={
                        dataSourceName:makeQueryStep.dataSourceName,
                        queryPurpose:makeQueryStep.queryPurpose,
                        queryDescription:makeQueryStep.queryDescription,
                        dsRequest:validatedMakeQueryStepResult.dsRequestProperties
                    };
                }
                evalVars.prevStepType=prevStepType;
                evalVars.prevStep=answerEngineOperation.jsonEncoder.encode(prevStep);
                evalVars.prevStepResult=answerEngineOperation.jsonEncoder.encode(prevStepResult);
                aiMessagesBuilder.appendPrompts(this.answerEnginePrompts_perPrevStepDump);
            }
        }
        return aiMessagesBuilder;
    }
,isc.A._asyncAnswerEngineDetermineNextStep=function isc_c_AI__asyncAnswerEngineDetermineNextStep(answerEngineOperation){
        var aiMessagesBuilder=this._getAnswerEngineMessagesBuilder(answerEngineOperation);
        aiMessagesBuilder.appendPrompts(this.determineNextStepPrompts_nextStepPrompts);
        var aiRequest={
            cancellationController:answerEngineOperation.cancellationController,
            messages:aiMessagesBuilder.aiMessages,
            responseType:"object"
        };
        return this.asyncSendRequest(aiRequest,answerEngineOperation._aiConfig)
            ._then(function(aiResponse){
                var responseObject=aiResponse.message.content;
                if(!isc.isAn.Object(responseObject))return isc.rejectWithError(isc.AI.aiNotAbleToProcessRequestErrorMessage);
                var nextStepType=responseObject.nextStepType;
                if(!isc.isA.nonemptyString(nextStepType))return isc.rejectWithError("AI did not provide a next step type.");
                if(nextStepType=="makeQuery"){
                    var dataSourceName=responseObject.dataSourceName;
                    if(!isc.isA.nonemptyString(dataSourceName))return isc.rejectWithError("AI did not specify a data source.");
                    var dataSource=isc.DS.get(dataSourceName);
                    if(!dataSource)return isc.rejectWithError("AI specified a non-existent data source name '"+String(dataSource).asHTML()+"'.");
                    var dataSources=answerEngineOperation.dataSources;
                    if(!dataSources||!dataSources.contains(dataSource)){
                        return isc.rejectWithError("AI did not select an available data source; data source name '"+String(dataSource).asHTML()+"' is not available.");
                    }
                    if(!isc.isA.nonemptyString(responseObject.queryPurpose)){
                        return isc.rejectWithError("AI did not specify a purpose for making the query.");
                    }
                    if(!isc.isA.nonemptyString(responseObject.queryDescription)){
                        return isc.rejectWithError("AI did not describe the query to make.");
                    }
                    return{
                        type:"makeQuery",
                        dataSourceName:dataSourceName,
                        queryPurpose:responseObject.queryPurpose,
                        queryDescription:responseObject.queryDescription
                    };
                }else if(nextStepType=="createDashboard"){
                    var componentSpecs=responseObject.components;
                    if(!isc.isAn.Array(componentSpecs)||componentSpecs.isEmpty()){
                        return isc.rejectWithError("AI determined to create a dashboard; however, it did not specify any dashboard components.");
                    }
                    var createDashboardComponentSteps=[],
                        allowedDashboardComponentTypes=this.dataQuestion.settings.allowedDashboardComponentTypes||isc.AnswerEngineOperation.allDashboardComponentTypes;
                    for(var c=0;c<componentSpecs.length;++c){
                        var componentSpec=componentSpecs[c],
                            componentType,
                            description;
                        if(!isc.isAn.Object(componentSpec)||
                            isc.isAn.Array(componentSpec)||
                            !isc.isA.String(componentType=componentSpec.componentType)||
                            isc.isAn.emptyString(componentType=componentType.trim())||
                            !isc.isA.String(description=componentSpec.description)||
                            isc.isAn.emptyString(description=description.trim()))
                        {
                            this.logDebug("`componentSpecs["+c+"]` does not look like a valid component spec. Skipping...","AnswerEngine");
                            continue;
                        }
                        if(!allowedDashboardComponentTypes.contains(componentType)){
                            this.logDebug("componentType '"+componentType+"' is "+
                                    (!isc.AnswerEngineOperation.allDashboardComponentTypes.contains(componentType)
                                     ?"unknown":"not allowed")+". Skipping...","AnswerEngine");
                            continue;
                        }
                        createDashboardComponentSteps.push({
                            type:"createDashboardComponent",
                            componentType:componentType,
                            description:description
                        });
                    }
                    if(createDashboardComponentSteps.isEmpty()){
                        return isc.rejectWithError("AI determined to create a dashboard; however, it did not validly specify any dashboard components.");
                    }
                    return{
                        type:"createDashboard",
                        createDashboardComponentSteps:createDashboardComponentSteps
                    };
                }
                return isc.rejectWithError("Unhandled next step type '"+String(nextStepType).asHTML()+"'");
            },
            null,
            this);
    }
,isc.A._maskFetchDSRequestProperties=function isc_c_AI__maskFetchDSRequestProperties(dsRequestProperties,dsName,maxRecordsPerQuery,allowedDSRequestPropertyNames,allowedCriterionPropertyNames){
        allowedDSRequestPropertyNames=allowedDSRequestPropertyNames||this.allowedDSRequestPropertyNames;
        dsRequestProperties=isc.applyMask(dsRequestProperties,allowedDSRequestPropertyNames);
        dsRequestProperties.dataSource=dsName;
        var startRow=dsRequestProperties.startRow;
        if(startRow!=null)startRow=dsRequestProperties.startRow=Math.trunc(startRow);
        if(!isc.isA.Number(startRow)){
            startRow=dsRequestProperties.startRow=0;
        }
        var endRow=dsRequestProperties.endRow;
        if(endRow!=null)endRow=dsRequestProperties.endRow=Math.trunc(endRow);
        if(dsRequestProperties.endRow==null){
            endRow=dsRequestProperties.endRow=maxRecordsPerQuery;
        }
        if(endRow<startRow){
            var tmp=startRow;
            startRow=endRow;
            endRow=tmp;
            dsRequestProperties.startRow=startRow;
            dsRequestProperties.endRow=endRow;
        }else if(startRow==endRow){
            dsRequestProperties.endRow=endRow=startRow+1;
        }
        if((endRow-startRow)>maxRecordsPerQuery){
            dsRequestProperties.endRow=endRow=startRow+maxRecordsPerQuery;
        }
        var data=dsRequestProperties.data;
        if(isc.isAn.Object(data)&&!isc.isAn.Array(data)){
            var dataSource=dsName&&isc.DS.get(dsName);
            if(dataSource){
                if(dataSource.isAdvancedCriteria(data)){
                    dsRequestProperties.data=this._maskCriterion(data,allowedCriterionPropertyNames);
                }else{
                }
            }
        }else{
            delete dsRequestProperties.data;
        }
        return dsRequestProperties;
    }
,isc.A._asyncAnswerEngineMakeQuery=function isc_c_AI__asyncAnswerEngineMakeQuery(answerEngineOperation,makeQueryStep){
        var aiMessagesBuilder=this._getAnswerEngineMessagesBuilder(answerEngineOperation),
            evalVars=aiMessagesBuilder.evalVars,
            dsName=makeQueryStep.dataSourceName,
            maxRecordsPerQuery=answerEngineOperation.maxRecordsPerQuery;
        evalVars.dsName=dsName;
        evalVars.queryPurpose=makeQueryStep.queryPurpose;
        evalVars.queryDescription=makeQueryStep.queryDescription;
        evalVars.advancedCriteriaFormatDescription=this.advancedCriteriaFormatDescription;
        evalVars.maxRecordsPerQuery=maxRecordsPerQuery;
        aiMessagesBuilder.appendPrompts(this.makeQueryStepPrompts);
        var aiRequest={
            cancellationController:answerEngineOperation.cancellationController,
            messages:aiMessagesBuilder.aiMessages,
            responseType:"object"
        };
        return this.asyncSendRequest(aiRequest,answerEngineOperation._aiConfig)
            ._then(function(aiResponse){
                var responseObject=aiResponse.message.content;
                if(!isc.isAn.Object(responseObject))return isc.rejectWithError(this.aiNotAbleToProcessRequestErrorMessage);
                return this._maskFetchDSRequestProperties(responseObject,dsName,maxRecordsPerQuery);
            },
            null,
            this);
    }
,isc.A._asyncAnswerEngineCreateDashboard=function isc_c_AI__asyncAnswerEngineCreateDashboard(answerEngineOperation,createDashboardStep){
        return isc.rejectWithError("not yet implemented");
    }
,isc.A._getAnswerEngineCreateComponentMessagesBuilder=function isc_c_AI__getAnswerEngineCreateComponentMessagesBuilder(answerEngineOperation,createDashboardComponentStep){
        var aiMessagesBuilder=this._getAnswerEngineMessagesBuilder(answerEngineOperation),
            evalVars=aiMessagesBuilder.evalVars,
            componentType=createDashboardComponentStep.componentType;
        var codePrompt;
        if(componentType=="label"){
            componentType="Label";
            codePrompt=this.createDashboardComponentPrompts_labelCodePrompt;
        }else{
            var typeInfo=this.dataBoundUITypeInfos[componentType];
            if(typeInfo){
                componentType=typeInfo.componentType;
                codePrompt=this.generalDataBoundUICodeNotes+"\n"+typeInfo.codePrompt;
            }
        }
        evalVars.componentType=componentType;
        evalVars.description=createDashboardComponentStep.description;
        evalVars.codePrompt=codePrompt;
        aiMessagesBuilder.appendPrompts(this.createDashboardComponentPrompts_intro);
        return aiMessagesBuilder;
    }
,isc.A._asyncAnswerEngineCreateDashboardComponent=function isc_c_AI__asyncAnswerEngineCreateDashboardComponent(answerEngineOperation,createDashboardComponentStep){
        var aiMessagesBuilder=this._getAnswerEngineCreateComponentMessagesBuilder(answerEngineOperation,createDashboardComponentStep);
        aiMessagesBuilder.appendPrompts(this.uiCodeSuffixPrompts);
        var aiRequest={
            cancellationController:answerEngineOperation.cancellationController,
            messages:aiMessagesBuilder.aiMessages
        };
        return this.asyncSendRequest(aiRequest,answerEngineOperation._aiConfig)
            ._then(function(aiResponse){
                var content=aiResponse.message.content||"",
                    jsCode=String.prototype.trim.call(this.extractFencedCode(content));
                if(jsCode==""){
                    return isc.rejectWithError("AI did not generate any UI code.");
                }
                return jsCode;
            },
            null,
            this);
    }
,isc.A._asyncAnswerEngineFixDashboardComponent=function isc_c_AI__asyncAnswerEngineFixDashboardComponent(answerEngineOperation,fixDashboardComponentStep){
        var prevValidateDashboardComponentStepResults=fixDashboardComponentStep.prevValidateDashboardComponentStepResults,
            numAttempts=prevValidateDashboardComponentStepResults.length,
            maxFixAttempts=answerEngineOperation.dataQuestion.settings.maxFixAttempts!=null
                             ?answerEngineOperation.dataQuestion.settings.maxFixAttempts
                             :this.defaultMaxFixAttempts;
        if(numAttempts>maxFixAttempts){
            return isc.rejectWithError("AI did not generate valid UI code in "+maxFixAttempts+" attempts.");
        }
        var lastValidateDashboardComponentStepResult=prevValidateDashboardComponentStepResults[numAttempts-1],
            aiMessagesBuilder=this._getAnswerEngineCreateComponentMessagesBuilder(answerEngineOperation,fixDashboardComponentStep.createDashboardComponentStep),
            evalVars=aiMessagesBuilder.evalVars;
        evalVars.prevJSCode=lastValidateDashboardComponentStepResult.step.createDashboardComponentStepResult.jsCode;
        evalVars.validationErrors=answerEngineOperation.jsonEncoder.encode(lastValidateDashboardComponentStepResult.validationErrors);
        aiMessagesBuilder.appendPrompts(this.fixDashboardComponentPrompts);
        aiMessagesBuilder.appendPrompts(this.uiCodeSuffixPrompts);
        var aiRequest={
            cancellationController:answerEngineOperation.cancellationController,
            messages:aiMessagesBuilder.aiMessages
        };
        return this.asyncSendRequest(aiRequest,answerEngineOperation._aiConfig)
            ._then(function(aiResponse){
                var content=aiResponse.message.content||"",
                    jsCode=String.prototype.trim.call(this.extractFencedCode(content));
                if(jsCode==""){
                    return isc.rejectWithError("AI did not generate any UI code.");
                }
                return jsCode;
            },
            null,
            this);
    }
);
isc.B._maxIndex=isc.C+15;

isc.defineClass("AIFieldBuilder","SummaryBuilder");
isc.A=isc.AIFieldBuilder.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.autoTest=false;
isc.A.showFieldKey=false;
isc.A.showHelpIcon=false;
isc.A.showMessageLabel=false;
isc.A.showAutoHideCheckBox=false;
isc.A.builderTypeText="Description";
isc.A.canEditAttributeName="canEditAISummary";
isc.A.instructionsTextStart="Enter a description of what information you want to see in the field.  AI will receive "+
        "the complete record and be asked to generate a value for the record in the field."+
        "<p>AI can do things like:<ul>"+
        "<li>text summarization (<q>give a two line summary of the abstract</q> or "+
            "<q>list the applicant's top 3 skills</q> or <q>extract any urgent request within the message</q>)"+
        "<li>sentiment analysis (<q>rate the customer's satisfaction on a scale of 1 (least satisfied) to 10 (most satisfied) "+
            "based on their review</q>)"+
        "<li>use common knowledge (<q>guess the contact's time zone</q>)</ul>";
isc.A.initialAutoSuggestTitleHint="[use AI-generated title]";
isc.A.pendingSuggestTitleHint="[generating a title…]";
isc.A.nonSuccessfulSuggestTitleHint="[failed to generate a title: ${message}]";
isc.A.suggestedTitleHint="[AI-generated: ${suggestedTitle}]";
isc.A.testButtonTitle="Try It";
isc.A.testButtonHoverContents="Click to have AI generate a value from your description";
isc.A.testButtonHoverContents_cantTest="You cannot try having AI generate a value at this time.";
isc.A.testButtonHoverContents_cantTestWithoutData="Without data, you cannot try having AI generate a value.";
isc.A.undeterminedResponsePrompt="<i>Could not determine an answer</i>";
isc.A.autoSuggestTitle=true;
isc.A.autoSuggestTitleDelay=500;
isc.A.suggestTitleThreshold=20;
isc.A.anotherSuggestedTitleRequestedCancellationReason="Another suggested title was requested.";
isc.A.loadingIconSize=24;
isc.A.loadingIconSrc="[SKINIMG]loadingSmall.gif";
isc.A.loadingDivStyle="display:flex;align-items:center;justify-content:center;height:100%";
isc.A.loadingMessage="<div style='${loadingStyle}'>${loadingImage}</div>";
isc.B.push(isc.A._evalNonSuccessfulSuggestTitleHint=function isc_AIFieldBuilder__evalNonSuccessfulSuggestTitleHint(message){
        return this.nonSuccessfulSuggestTitleHint.evalDynamicString(this,{
            message:message&&message.asHTML()
        });
    }
,isc.A._evalSuggestedTitleHint=function isc_AIFieldBuilder__evalSuggestedTitleHint(suggestedTitle){
        return this.suggestedTitleHint.evalDynamicString(this,{
            suggestedTitle:suggestedTitle&&suggestedTitle.asHTML()
        });
    }
,isc.A._getInitialTitleFieldHint=function isc_AIFieldBuilder__getInitialTitleFieldHint(){
        var prompt=this.getValue();
        if(prompt==this._lastValue&&this._suggestedTitle){
            return this._evalSuggestedTitleHint(this._suggestedTitle);
        }
        return!this._shouldAutoSuggestTitle()?null:this.initialAutoSuggestTitleHint;
    }
,isc.A._getTestButtonHoverHTML=function isc_AIFieldBuilder__getTestButtonHoverHTML(){
        if(this._canTest())return this.testButtonHoverContents;
        if(!this.getTestRecord())return this.testButtonHoverContents_cantTestWithoutData;
        return this.testButtonHoverContents_cantTest;
    }
,isc.A.testButtonClick=function isc_AIFieldBuilder_testButtonClick(){
        this.requestTestSummary("user");
    }
,isc.A._shouldAutoSuggestTitle=function isc_AIFieldBuilder__shouldAutoSuggestTitle(){
        return this.autoSuggestTitle!=false;
    }
,isc.A.setAutoSuggestTitle=function isc_AIFieldBuilder_setAutoSuggestTitle(autoSuggestTitle){
        var prevShouldAutoSuggestTitle=this._shouldAutoSuggestTitle();
        this.autoSuggestTitle=autoSuggestTitle;
        var shouldAutoSuggestTitle=this._shouldAutoSuggestTitle();
        if(prevShouldAutoSuggestTitle==shouldAutoSuggestTitle)return;
        this.setTitleFieldHint(this._getInitialTitleFieldHint());
        if(!shouldAutoSuggestTitle){
            this.cancelActionOnPause("suggestTitle");
        }else{
            this._suggestTitle("application");
        }
    }
,isc.A.itemChanged=function isc_AIFieldBuilder_itemChanged(item,newValue){
        if(item===this.formulaField){
            if(this._shouldAutoSuggestTitle()){
                this.fireOnPause("suggestTitle",{methodName:"_suggestTitle",args:["user"]},this.autoSuggestTitleDelay);
            }
        }else if(item===this.titleField){
            if(!this._shouldSuggestTitle()){
                this.setTitleFieldHint(this._getInitialTitleFieldHint());
                var suggestTitleCC=this._suggestTitleCC;
                if(suggestTitleCC&&!suggestTitleCC.canceled){
                    suggestTitleCC.cancel(null,"user");
                }
            }
        }
    }
,isc.A._setLastValue=function isc_AIFieldBuilder__setLastValue(prompt){
        if(prompt!=this._lastValue){
            this._lastValue=prompt;
            delete this._suggestedTitle;
            delete this._lastAIFieldRequest;
        }
    }
,isc.A._shouldSuggestTitle=function isc_AIFieldBuilder__shouldSuggestTitle(prompt){
        return prompt&&prompt.length>=this.suggestTitleThreshold&&
            (!this.titleField||!this.titleField.getValue())&&
            isc.AI.isEnabled();
    }
,isc.A._suggestTitle=function isc_AIFieldBuilder__suggestTitle(initiator){
        var prompt=this.getValue();
        if(!this._shouldSuggestTitle(prompt)){
            this.setTitleFieldHint(this._getInitialTitleFieldHint());
            return;
        }
        var suggestTitleCC=this._suggestTitleCC;
        if(suggestTitleCC&&!suggestTitleCC.canceled){
            suggestTitleCC.cancel(this.anotherSuggestedTitleRequestedCancellationReason,initiator);
        }
        suggestTitleCC=this._suggestTitleCC=this._getOrCreateBuilderCC().createSubController();
        if(prompt==this._lastValue&&
            this._suggestedTitle)
        {
            this.setTitleFieldHint(this._evalSuggestedTitleHint(this._suggestedTitle));
            return;
        }
        this.setTitleFieldHint(this.pendingSuggestTitleHint);
        var _this=this;
        this._asyncGetSuggestedTitle(prompt,suggestTitleCC)
            .then(function(suggestedTitle){
                var currentPrompt=_this.getValue();
                if(prompt!=currentPrompt)return;
                _this._setLastValue(prompt);
                _this._suggestedTitle=suggestedTitle;
                _this.setTitleFieldHint(_this._getInitialTitleFieldHint());
            },function(rejectReason){
                var nonSuccessfulResult=isc.defaultAsyncOperationCatchCallback(rejectReason);
                if(nonSuccessfulResult.type!="canceled"){
                    var message=isc.getAsyncMessage(nonSuccessfulResult);
                    _this.logWarn("Failed to get a suggested title for the prompt '"+prompt+"': "+message,"AI");
                    _this.setTitleFieldHint(_this._evalNonSuccessfulSuggestTitleHint(message));
                }
            });
    }
,isc.A._asyncGetSuggestedTitle=function isc_AIFieldBuilder__asyncGetSuggestedTitle(prompt,cancellationController){
        if(prompt==this._lastValue&&
            this._suggestedTitle)
        {
            return Promise.resolve(this._suggestedTitle);
        }
        var component=this.component,
            fieldName=this.field.name,
            excludeFieldNames;
        if(fieldName&&component.getField(fieldName)){
            excludeFieldNames=[fieldName];
        }
        var request={
            cancellationController:cancellationController,
            aiRequest:{prompt:prompt},
            component:component,
            excludeFieldNames:excludeFieldNames
        };
        return isc.AI.asyncSuggestRecordSummaryTitle(request)
            .then(function(result){
                return result.suggestedTitle;
            });
    }
,isc.A.getUniqueFieldName=function isc_AIFieldBuilder_getUniqueFieldName(){
        return this.getNewUniqueFieldName("aiField");
    }
,isc.A.getCompleteValueObject=function isc_AIFieldBuilder_getCompleteValueObject(){
        var prompt=this.getValue();
        var title=this.titleField&&this.titleField.getValue(),
            hasDefaultTitle=false,
            hasSuggestedTitle=false;
        if(!this._isTitleChanged()){
            hasDefaultTitle=this.field._hasDefaultTitle;
            hasSuggestedTitle=this.field._hasSuggestedTitle;
            title=this.field.title;
        }
        if((!title||hasDefaultTitle||(hasSuggestedTitle&&this._isValueChanged()))&&
            prompt==this._lastValue&&this._suggestedTitle)
        {
            title=this._suggestedTitle;
            hasDefaultTitle=false;
            hasSuggestedTitle=true;
        }
        var fieldProps={title:title,_hasDefaultTitle:hasDefaultTitle,_hasSuggestedTitle:hasSuggestedTitle},
            aiFieldRequest=this._lastAIFieldRequest||{prompt:prompt};
        return isc.AI.applyAIFieldRequestToFieldDefaults(aiFieldRequest,fieldProps);
    }
,isc.A._asyncGetAIFieldRequest=function isc_AIFieldBuilder__asyncGetAIFieldRequest(prompt,showProgressDialog,cancellationController){
        if(prompt==this._lastValue&&
            this._lastAIFieldRequest)
        {
            return Promise.resolve(this._lastAIFieldRequest);
        }
        var buildRequest={
            cancellationController:cancellationController,
            userAIRequest:{prompt:prompt},
            component:this.component,
            showProgressDialog:showProgressDialog
        };
        return isc.AI.asyncBuildAIFieldRequest(buildRequest)
            .then(function(buildResponse){
                return buildResponse.aiFieldRequest;
            });
    }
,isc.A._canTest=function isc_AIFieldBuilder__canTest(){
        return isc.AI.isEnabled()&&!!this.getTestRecord();
    }
,isc.A.requestTestSummary=function isc_AIFieldBuilder_requestTestSummary(initiator){
        var record=this.getTestRecord(),
            prompt=this.getValue();
        if(!prompt||!record)return;
        var requestTestSummaryCC=this._requestTestSummaryCC;
        if(requestTestSummaryCC&&!requestTestSummaryCC.canceled){
            requestTestSummaryCC.cancel(this.anotherTestRequestedCancellationReason,initiator);
        }
        requestTestSummaryCC=this._requestTestSummaryCC=this._getOrCreateBuilderCC().createSubController();
        this.showLoadingPrompt();
        if(this.testButton)this.testButton.disable();
        var _this=this;
        this._asyncGetAIFieldRequest(prompt,
                                     false,
                                     requestTestSummaryCC)
            .then(function(aiFieldRequest){
                var request={
                    cancellationController:requestTestSummaryCC,
                    aiFieldRequest:aiFieldRequest,
                    component:_this.component,
                    records:[record]
                };
                return isc.AI.asyncSummarizeRecords(request)
                    .then(function(result){
                        result._aiFieldRequest=aiFieldRequest;
                        return result;
                    });
            })
            ._whenSettled(function(result){
                if(result.type!="success"){
                    if(result.type!="canceled"){
                        isc.warn("Failed to summarize the test record.<br>"+isc.getAsyncMessage(result).asHTML());
                    }
                    return;
                }else _this._assert(!requestTestSummaryCC.canceled);
                var aiFieldRequest=result._aiFieldRequest;
                var recordSummaries=!isc.AI.isAIFieldRequestNumerical(aiFieldRequest)
                                      ?result.recordSummaries:result.recordNumericalSummaries;
                var lastResponse=recordSummaries[0];
                if(lastResponse==null){
                    isc.warn(isc.AI.aiNotAbleToProcessRequestErrorMessage);
                    return;
                }
                if(aiFieldRequest.valueClass=="ordinal"){
                    lastResponse=aiFieldRequest.categories[lastResponse];
                }
                _this._setLastValue(prompt);
                _this._lastAIFieldRequest=aiFieldRequest;
                _this._lastRecord=record;
                _this._lastResponse=lastResponse;
            })
            ._finally(function(){
                if(_this.destroyed)return;
                _this.testFunction();
                if(_this.testButton)_this.testButton.enable();
            });
    }
,isc.A.getTitle=function isc_AIFieldBuilder_getTitle(){
        var title=this.Super("getTitle",arguments);
        if(title!=null)title=String(title).trim();
        return title;
    }
,isc.A.setInitialTitle=function isc_AIFieldBuilder_setInitialTitle(){
        var title=this.field.title,
            hasDefaultTitle=this.field._hasDefaultTitle,
            hasSuggestedTitle=this.field._hasSuggestedTitle;
        if(!title){
            title=isc.DataSource.getAutoTitle(this.field.name);
            hasDefaultTitle=true;
            hasSuggestedTitle=false;
        }
        if(title)title=String(title).trim();
        if(hasSuggestedTitle)this._suggestedTitle=title;
        if(!(this._shouldAutoSuggestTitle()&&(hasDefaultTitle||hasSuggestedTitle))){
            this.setTitle(title);
        }
        this.setTitleFieldHint(this._getInitialTitleFieldHint());
    }
,isc.A.getValue=function isc_AIFieldBuilder_getValue(){
        var value=this.Super("getValue",arguments);
        if(value!=null)value=String(value).trim();
        return value;
    }
,isc.A.setInitialValue=function isc_AIFieldBuilder_setInitialValue(){
        var initialValue;
        if(this.field.aiFieldRequest&&isc.AIEngine._isTextContentType(this.field.aiFieldRequest.promptType)){
            initialValue=this.field.aiFieldRequest.prompt;
            if(initialValue!=null)initialValue=String(initialValue).trim();
            this._lastValue=initialValue;
            this._aiFieldRequest=this.field.aiFieldRequest;
        }
        this.setValue(initialValue);
    }
,isc.A.save=function isc_AIFieldBuilder_save(){
        var builderCC=this._builderCC;
        if(builderCC&&!builderCC.canceled){
            builderCC.cancel(this.userSavedCancellationReason,"user");
        }
        var prompt=this.getValue();
        if(!prompt||!this._isValueChanged()){
            return this.Super("save",arguments);
        }
        if(this.editMode){
            isc.FieldGeneratorUtil._cancelFieldGenerationAndInvalidateCaches(this.component,this.field,
                    "user");
        }
        var _this=this;
        this._asyncGetAIFieldRequest(prompt,true,null)
            .then(function(aiFieldRequest){
                _this._setLastValue(prompt);
                _this._lastAIFieldRequest=aiFieldRequest;
                _this.Super("save",arguments);
            },
            function(nonSuccessfulResult){
                if(nonSuccessfulResult.type!="canceled"){
                    _this.completeEditing(true);
                }else{
                    _this.logWarn("Failed to build the AIFieldRequest: "+isc.getAsyncMessage(nonSuccessfulResult),"AI");
                }
            });
    }
,isc.A.showLoadingPrompt=function isc_AIFieldBuilder_showLoadingPrompt(){
        var iconSize=this.loadingIconSize;
        this.sampleLabel.setContents(this.loadingMessage.evalDynamicString(this,{
            loadingStyle:this.loadingDivStyle,
            loadingImage:this.imgHTML(this.loadingIconSrc,iconSize,iconSize)
        }));
    }
);
isc.B._maxIndex=isc.C+23;

isc.AIFieldBuilder.changeDefaults("titleFieldDefaults",{
    showHintInField:true,
    autoFocus:false
});
isc.AIFieldBuilder.changeDefaults("formulaFormDefaults",{
    numCols:1,
    titleOrientation:"top",
    autoFocus:true
});
isc.A=isc.AIFieldBuilder;
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.buildDummyTestRecords=false;
isc.B.push(isc.A.testFunction=function isc_c_AIFieldBuilder_testFunction(field,userSummary,component,usedFields,testRecord,target,reason){
        var result={};
        result.component=component;
        if(userSummary.text==""){
            result.emptyTestValue=true;
            return result;
        }
        result.record=target._lastRecord;
        result.result=target._lastResponse;
        return result;
    }
);
isc.B._maxIndex=isc.C+1;

isc.defineClass("AISortFieldBuilder","AIFieldBuilder");
isc.A=isc.AISortFieldBuilder.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.titleFieldTitle="Title for sort field";
isc.A.instructionsTextStart="Enter a description of what information you want to sort by.  AI will receive "+
        "the complete record and be asked to generate a value for the record."+
        "<p>Some examples:<ul>"+
        "<li><q>guess how heavy the item is in pounds: 'Less than 1', '1-4', '5-10', 'More than 10'&#8201;</q>"+
        "<li><q>rate the customer's satisfaction on a scale of 1 (least satisfied) to 10 (most satisfied) "+
            "based on their review</q>"+
        "<li><q>rate the item's usefulness in running a small bakery</q></ul>";
isc.A.showSaveAddAnotherButton=false;
isc.A.titleFormDefaults={
        _constructor:"DynamicForm",autoFocus:true,
        extraSpace:5,colWidths:[40,"*"]
    };
isc.A.formulaFormDefaults={
        _constructor:"DynamicForm",numCols:1,
        titleOrientation:"top",extraSpace:5
    };
isc.A.undeterminedResponsePrompt="<i>Could not determine a score</i>";
isc.B.push(isc.A.save=function isc_AISortFieldBuilder_save(){
        this.Super("save",arguments);
        var data=this.component.data;
        if(isc.isAn.Array(data)||isc.isA.ResultSet(data)&&data.allMatchingRowsCached()){
            this.component.delayCall("_sortByUserAISortField",[this.field.name],0);
        }else{
            isc.warn("Some records are not loaded.  Sort values will be computed as they "+
                     "are loaded, but you'll need to wait for that and sort on your own");
        }
    }
);
isc.B._maxIndex=isc.C+1;

isc.defineClass("BuildViaAIProgressDialog",isc.Dialog);
isc.A=isc.BuildViaAIProgressDialog.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A._zLayerName="_notify";
isc.A.autoDraw=false;
isc.A.minWidth=150;
isc.A.height=230;
isc.A.minHeight=230;
isc.A.autoSize=true;
isc.A.isModal=true;
isc.A.canDragResize=true;
isc.A.canDragReposition=true;
isc.A.showCloseButton=false;
isc.A.title="Building via AI\u2026";
isc.A.canCancel=false;
isc.A.headerLabelDefaults=isc.addProperties({},isc.BuildViaAIProgressDialog.getSuperClass().getInstanceProperty("headerLabelDefaults"),{
        icon:"AIAssist"
    });
isc.A.progressbarDefaults={
        _constructor:"Progressbar",
        length:50,
        breadth:10,
        layoutAlign:"center"
    };
isc.A.message="";
isc.A.messageLabelDefaults=isc.addProperties({},isc.BuildViaAIProgressDialog.getSuperClass().getInstanceProperty("messageLabelDefaults"),{
        height:25,
        align:"center"
    });
isc.A.messagesGridDefaults={
        _constructor:"ListGrid",
        width:"100%",
        height:"100%",
        wrapCells:true,
        fixedRecordHeights:false,
        showHeader:false,
        showRollOver:false,
        selectionType:"none",
        cellPadding:0,
        defaultFields:[{
            name:"category",
            width:30,
            valueIcons:{
                "success":"ok",
                "detail":"configure",
                "recoverableError":"exclamation",
                "error":"cancel"
            },
            showValueIconOnly:true,
            valueIconSize:16,
            valueIconLeftPadding:0,
            valueIconRightPadding:0,
            imageURLPrefix:"[SKINIMG]/actions/",
            imageURLSuffix:".png"
        },{
            name:"content",
            width:"*"
        }],
        drawn:function(){
            isc.Class.delayCall("scrollToBottom",[],1,this.body);
        }
    };
isc.B.push(isc.A.initWidget=function isc_BuildViaAIProgressDialog_initWidget(){
        this.Super("initWidget",arguments);
        this.progressbar=this.createAutoChild("progressbar");
        this.messagesGrid=this.createAutoChild("messagesGrid");
        if(this.canCancel){
            this.setButtons([isc.Dialog.CANCEL]);
        }
    }
,isc.A.createChildren=function isc_BuildViaAIProgressDialog_createChildren(){
        this.Super("createChildren",arguments);
        this.body.addMember(this.progressbar,0);
        this.body.addMember(this.messagesGrid,2);
    }
,isc.A.resized=function isc_BuildViaAIProgressDialog_resized(){
        if(this.destroyed)return;
        this.progressbar.setLength(this.messageLabel.getWidth()-4);
        isc.Class.delayCall("scrollToBottom",[],1,this.messagesGrid.body);
    }
,isc.A.setProgress=function isc_BuildViaAIProgressDialog_setProgress(numStepsCompleted,estimatedNumTotalSteps){
        if(this.destroyed)return;
        var percentCompleted=Math.max(0,Math.min(Math.floor(numStepsCompleted/estimatedNumTotalSteps*100),100));
        if(isNaN(percentCompleted))percentCompleted=0;
        this.progressbar.setPercentDone(percentCompleted);
        this.progressbar.setTitle("Completed "+numStepsCompleted+" out of an estimated "+estimatedNumTotalSteps+" step(s)");
        this.setMessage(numStepsCompleted+"\u2009/\u2009"+estimatedNumTotalSteps);
    }
,isc.A.addMessages=function isc_BuildViaAIProgressDialog_addMessages(progressMessages){
        if(this.destroyed)return;
        if(progressMessages!=null){
            for(var i=0;i<progressMessages.length;++i){
                this.messagesGrid.addData(progressMessages[i]);
            }
            if(this.messagesGrid.body!=null)isc.Class.delayCall("scrollToBottom",[],1,this.messagesGrid.body);
        }
    }
,isc.A.finish=function isc_BuildViaAIProgressDialog_finish(wasSuccessful){
        if(this.destroyed)return;
        this.progressbar.disable();
        if(this.messageStack==null){
            this.messageStackProperties=isc.addProperties({},this.messageStackProperties,{disabled:true});
        }else{
            this.messageStack.disable();
        }
        this.messagesGrid.setOpacity(60);
        if(!wasSuccessful){
            this.show();
            this.setButtons([isc.Dialog.OK]);
        }else{
            this.hide();
            this.destroy();
        }
    }
,isc.A.okClick=function isc_BuildViaAIProgressDialog_okClick(){
        if(this.destroyed)return;
        this.hide();
        this.destroy();
    }
,isc.A.cancelClick=function isc_BuildViaAIProgressDialog_cancelClick(){
        isc.AI._cancelBuildViaAI(this._buildContext,null,"user");
        if(this.destroyed)return;
        this.hide();
        this.destroy();
    }
);
isc.B._maxIndex=isc.C+8;

isc.defineClass("BuildUIViaAIProgressDialog",isc.BuildViaAIProgressDialog);
isc.A=isc.BuildUIViaAIProgressDialog.getPrototype();
isc.A.title="Building UI via AI&hellip;"
;

isc.defineClass("FilterViaAIProgressDialog",isc.BuildViaAIProgressDialog);
isc.A=isc.FilterViaAIProgressDialog.getPrototype();
isc.A.title="Filtering via AI&hellip;"
;

isc.defineClass("HiliteViaAIProgressDialog",isc.BuildViaAIProgressDialog);
isc.A=isc.HiliteViaAIProgressDialog.getPrototype();
isc.A.title="Hiliting via AI&hellip;"
;

isc.defineClass("FilterViaAIPanel",isc.DynamicForm);
isc.A=isc.FilterViaAIPanel.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.minWidth=400;
isc.A.numCols=3;
isc.A.colWidths=[130,"*","20%"];
isc.A.fields=[{
        name:"prompt",
        title:"Filter via AI",
        width:"*",
        endRow:true
    },
    {type:"SpacerItem"},{
        name:"_realTimeFeedback",
        type:"StaticText",
        showTitle:false,
        canEdit:false,
        colSpan:2
    }];
isc.B.push(isc.A.getPrompt=function isc_FilterViaAIPanel_getPrompt(returnOldValue){
        var prompt=(returnOldValue?this.getOldValues().prompt:this.getValue("prompt"));
        if(prompt)return prompt.trim();
        else return"";
    }
,isc.A.promptDidChange=function isc_FilterViaAIPanel_promptDidChange(){
        var oldPrompt=this.getPrompt(true),
            newPrompt=this.getPrompt();
        return oldPrompt!=newPrompt;
    }
,isc.A.getUserAIRequest=function isc_FilterViaAIPanel_getUserAIRequest(){
        var prompt=this.getPrompt();
        if(!prompt)return null;
        return{prompt:prompt};
    }
);
isc.B._maxIndex=isc.C+3;

isc.defineClass("AIWindow","Window");
isc.A=isc.AIWindow.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A._zLayerName="_notify";
isc.A.width=400;
isc.A.autoCenter=true;
isc.A.autoSize=true;
isc.A.isModal=true;
isc.A.canDragResize=true;
isc.A.canDragReposition=true;
isc.A.showMinimizeButton=false;
isc.A.height=100;
isc.A.showHeaderIcon=true;
isc.A.bodyProperties={
        padding:10,
        layoutMargin:10,
        membersMargin:10
    };
isc.A.title="AI Window";
isc.A.description="Enter your question and click the button below to contact the AI.";
isc.A.hint="Describe what you need here.";
isc.A.grid=null;
isc.A.labelDefaults={
        _constructor:"Label",
        width:"100%",
        height:1,
        contents:"",
        extraSpace:10
    };
isc.A.formDefaults={
        _constructor:"DynamicForm",
        height:"*",
        autoFocus:true,
        cellPadding:0
    };
isc.A.footerLayoutDefaults={
        _constructor:"HLayout",
        height:1,
        width:"100%",
        align:"bottom",
        defaultLayoutAlign:"center",
        membersMargin:10
    };
isc.A.progressBarDefaults={
        _constructor:"Progressbar",
        width:"*",
        height:30,
        length:"*",
        showTitle:true,
        visibility:"hidden"
    };
isc.A.cancelButtonTitle="Cancel";
isc.A.cancelButtonDefaults={
        _constructor:"Button",
        autoFit:true,
        disabled:true,
        click:function(){
            this.creator.cancelWindow();
        },
        layoutAlign:"right"
    };
isc.A.aiButtonTitle="Ask the AI";
isc.A.aiButtonDefaults={
        _constructor:"Button",
        autoFit:true,
        click:function(){
            this.creator.tellTheAI();
        },
        layoutAlign:"right"
    };
isc.B.push(isc.A.setMode=function isc_AIWindow_setMode(mode,windowTitle,description,hint,buttonTitle){
        this.mode=mode;
        if(windowTitle)this.setTitle(windowTitle);
        if(description)this.label.setContents(description);
        if(hint)this.form.getItem(0).setHint(hint);
        if(buttonTitle)this.aiButton.setTitle(buttonTitle);
    }
,isc.A.initWidget=function isc_AIWindow_initWidget(){
        this.headerIconDefaults.src="AIAnswerEngine:size:22,22;";
        this.Super("initWidget",arguments);
        this.addItem(this.addAutoChild("label",{contents:this.labelContents}));
        this.addItem(this.addAutoChild("form",{
            items:[
                {name:"userText",type:"textArea",minHeight:50,width:"*",height:"*",
                    colSpan:"*",showTitle:false,
                    hint:this.hint,showHintInField:true,
                    keyPress:function(item,form,keyName,characterValue){
                        if(keyName=="Enter"){
                            this.form.creator.tellTheAI();
                            return false;
                        }
                    }
                }
            ]
        }));
        this.addAutoChild("progressBar");
        this.addAutoChild("cancelButton",{title:this.cancelButtonTitle});
        this.addAutoChild("aiButton",{title:this.aiButtonTitle});
        this.addAutoChild("footerLayout",{
            members:[
                this.progressBar,isc.LayoutSpacer.create({width:1}),
                this.cancelButton,this.aiButton
            ]
        });
        this.addItem(this.footerLayout,this.items.length);
    }
,isc.A.cancelWindow=function isc_AIWindow_cancelWindow(){
        if(this._cancellationController){
            this._cancellationController.cancel(null,"user");
            delete this._cancellationController;
        }
        this.resetUI();
    }
,isc.A.resetUI=function isc_AIWindow_resetUI(){
        this.aiButton.setDisabled(false);
        this.form.setDisabled(false);
        this.progressBar.setPercentDone(0);
        this.progressBar.hide();
        if(this._cancellationController){
            this._cancellationController.destroy();
            delete this._cancellationController;
        }
    }
,isc.A.getPromptText=function isc_AIWindow_getPromptText(){
        return this.form.getValue("userText");
    }
,isc.A.setPromptText=function isc_AIWindow_setPromptText(prompt){
        if(this.form)this.form.setValue("userText",prompt);
    }
,isc.A.tellTheAI=function isc_AIWindow_tellTheAI(){
        var promptText=this.form.getValue("userText");
        this.form.setDisabled(true);
        this.aiButton.setDisabled(true);
        this.cancelButton.setDisabled(false);
        this.progressBar.setPercentDone(0);
        this.progressBar.setTitle("Preparing&hellip;");
        this.progressBar.show();
        var cancellationController=this._cancellationController=isc.CancellationController.create();
        var _this=this;
        if(this.mode=="filter"){
            if(!promptText){
                _this.resetUI();
                _this.hide();
                this.grid.setAICriterion(null);
            }else{
                var userAIFilterRequest={prompt:promptText};
                this.grid.setUserAIFilterRequest(
                    userAIFilterRequest,
                    {
                        cancellationController:cancellationController,
                        showProgressDialog:false,
                        progressCallback:function(buildContext,numStepsCompleted,estimatedNumTotalSteps,newMessages){
                            _this.progressBar.setPercentDone(100*numStepsCompleted/estimatedNumTotalSteps);
                            if(numStepsCompleted>0){
                                _this.progressBar.setTitle(numStepsCompleted+"\u2009/\u2009"+estimatedNumTotalSteps);
                            }
                        }
                    },
                    function(buildResponse){
                        if(!cancellationController.canceled){
                            _this.resetUI();
                            _this.hide();
                            if(buildResponse.type!="success"){
                                isc.warn("Filter-via-AI failed: "+buildResponse.errorMessage);
                            }
                        }
                    }
                );
            }
        }else if(this.mode=="hilite"){
            if(!promptText){
                _this.resetUI();
                _this.hide();
                var hilites=_this.grid.getHilites();
                if(hilites&&hilites.removeList(this._currentHilites)){
                    this.grid.setHilites(hilites);
                }
            }else{
                var buildRequest={
                    cancellationController:cancellationController,
                    userAIRequest:{prompt:promptText},
                    records:this.grid._getRecordsForAI(),
                    dataSource:this.grid.getDataSource(),
                    mode:this.grid.hiliteViaAIMode,
                    aiPageSize:this.grid.aiPageSize,
                    showProgressDialog:false,
                    progressCallback:function(buildContext,numStepsCompleted,estimatedNumTotalSteps,newMessages){
                        _this.progressBar.setPercentDone(100*numStepsCompleted/estimatedNumTotalSteps);
                        if(numStepsCompleted>0){
                            _this.progressBar.setTitle(numStepsCompleted+"\u2009/\u2009"+estimatedNumTotalSteps);
                        }
                    }
                };
                isc.AI.buildHilites(buildRequest,function(buildResponse){
                    if(!cancellationController.canceled){
                        _this.resetUI();
                        _this.hide();
                        if(buildResponse.type!="success"){
                            isc.warn("Hilite-via-AI failed: "+buildResponse.errorMessage);
                        }else if(buildResponse.hilites){
                            var hilites=_this.grid.getHilites()||[];
                            hilites.removeList(_this._currentHilites);
                            hilites.addList(_this._currentHilites=buildResponse.hilites);
                            _this.grid.setHilites(hilites);
                        }
                    }
                });
            }
        }else if(this.mode=="configure"){
            _this.resetUI();
            _this.hide();
            _this.grid.aiAssist(promptText);
        }
    }
,isc.A.closeClick=function isc_AIWindow_closeClick(){
        this.cancelWindow();
        this.hide();
    }
);
isc.B._maxIndex=isc.C+8;

isc.defineClass("AISortProgressDialog","Window");
isc.A=isc.AISortProgressDialog.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.autoCenter=true;
isc.A.autoSize=true;
isc.A.isModal=true;
isc.A.showModalMask=true;
isc.A.canDragResize=true;
isc.A.canDragReposition=true;
isc.A.autoParent=isc.Canvas.NONE;
isc.A.visibility="hidden";
isc.A.bodyDefaults={
        layoutMargin:10
    };
isc.A.title="Please wait - Computing record sort values";
isc.A.dismissButtonTitle="Dismiss";
isc.A.progressbarDefaults={
        _constructor:"Progressbar",
        autoParent:isc.Canvas.NONE,
        length:"100%"
    };
isc.A.dismissButtonDefaults={
        _constructor:"IButton",
        autoParent:isc.Canvas.NONE,
        layoutAlign:"center",
        click:function(){
            this.creator.hide();
        }
    };
isc.A.bodyProperties={
        membersMargin:20
    };
isc.B.push(isc.A.initWidget=function isc_AISortProgressDialog_initWidget(){
        this.Super("initWidget",arguments);
        this.addItems([
            this.addAutoChild("progressbar"),
            this.addAutoChild("dismissButton",{
                title:this.dismissButtonTitle
            })
        ]);
    }
,isc.A.hide=function isc_AISortProgressDialog_hide(){
        this.Super("hide",arguments);
        this.progressbar.setPercentDone(0);
        delete this.callback;
    }
,isc.A.updateProgress=function isc_AISortProgressDialog_updateProgress(){
        this.progressbar.setPercentDone(100*this.currentRecords/this.totalRecords);
        if(this.currentRecords>=this.totalRecords){
            this.delayCall("_progressComplete",[],0);
        }
    }
,isc.A._progressComplete=function isc_AISortProgressDialog__progressComplete(){
        this.fireCallback(this.callback);
        this.hide();
    }
,isc.A.advanceOneRecord=function isc_AISortProgressDialog_advanceOneRecord(){
        this.currentRecords++;
        this.updateProgress();
    }
,isc.A.setCurrentRecords=function isc_AISortProgressDialog_setCurrentRecords(count){
        this.currentRecords=count;
        this.updateProgress();
    }
,isc.A.setTotalRecords=function isc_AISortProgressDialog_setTotalRecords(count){
        this.totalRecords=count;
        this.updateProgress();
    }
,isc.A.isWaitingOnField=function isc_AISortProgressDialog_isWaitingOnField(fieldName){
        return this.isVisible()&&this.fieldName==fieldName;
    }
,isc.A.deploy=function isc_AISortProgressDialog_deploy(totalRecords,fieldName,callback){
        var component=this.creator;
        if(this.isVisible()||this.callback){
            this.logWarn("The AI sort progress dialog for field "+fieldName+" of "+
                " component "+component.getID()+" is still running; not cannot redeploy");
            return;
        }
        this.currentRecords=0;
        this.totalRecords=totalRecords;
        this.fieldName=fieldName;
        this.callback=callback;
        this.show();
    }
);
isc.B._maxIndex=isc.C+9;

isc.ClassFactory.defineClass("AIAssistItem","TextItem");
isc.A=isc.AIAssistItem.getPrototype();
isc.B=isc._allFuncs;
isc.C=isc.B._maxIndex;
isc.D=isc._funcClasses;
isc.D[isc.C]=isc.A.Class;
isc.A.width="*";
isc.A.colSpan="*";
isc.A.hint=isc.AI.assistantHint;
isc.A.showHint=true;
isc.A.showHintInField=true;
isc.A.prompt=isc.AI.assistantBlurb;
isc.A.hoverAutoFitWidth=true;
isc.A.hoverAutoFitMaxWidth=400;
isc.A.icons=[
        {
            inline:true,
            src:"[SKINIMG]actions/help.png",
            click:function(form,item,icon){
                item.sendPrompt(form,item);
            }
        }
    ];
isc.B.push(isc.A.keyPress=function isc_AIAssistItem_keyPress(item,form,keyName,characterValue){
        if(keyName=="Enter"){
            item.sendPrompt(form,item);
            return false;
        }
    }
,isc.A.sendPrompt=function isc_AIAssistItem_sendPrompt(form,item){
        var userPrompt=item.getValue();
        isc.AI.useAssistant(userPrompt,{rootCanvas:item.rootCanvas});
    }
);
isc.B._maxIndex=isc.C+2;

isc._debugModules = (isc._debugModules != null ? isc._debugModules : []);isc._debugModules.push('AI');isc.checkForDebugAndNonDebugModules();isc._moduleEnd=isc._AI_end=(isc.timestamp?isc.timestamp():new Date().getTime());if(isc.Log&&isc.Log.logIsInfoEnabled('loadTime'))isc.Log.logInfo('AI module init time: ' + (isc._moduleEnd-isc._moduleStart) + 'ms','loadTime');delete isc.definingFramework;if (isc.Page) isc.Page.handleEvent(null, "moduleLoaded", { moduleName: 'AI', loadTime: (isc._moduleEnd-isc._moduleStart)});}else{if(window.isc && isc.Log && isc.Log.logWarn)isc.Log.logWarn("Duplicate load of module 'AI'.");}/** AIModule End **/
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

