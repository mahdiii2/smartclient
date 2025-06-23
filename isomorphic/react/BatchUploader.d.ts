import React from 'react';
import { VStack, VStackProps } from './VStack';
import { AsComponentXML } from './core/ReactComponent';


declare interface BatchUploaderProps extends VStackProps {

/**
 * See {@link isc.BatchUploader.uploadDelimiter BatchUploader.uploadDelimiter}.
 */
uploadDelimiter?: string;

/**
 * See {@link isc.BatchUploader.previousButtonProperties BatchUploader.previousButtonProperties}.
 */
previousButtonProperties?: IButton;

/**
 * See {@link isc.BatchUploader.uploadFileItemProperties BatchUploader.uploadFileItemProperties}.
 */
uploadFileItemProperties?: FileItem;

/**
 * See {@link isc.BatchUploader.uploadFileLabel BatchUploader.uploadFileLabel}.
 */
uploadFileLabel?: string;

/**
 * See {@link isc.BatchUploader.commitButtonTitle BatchUploader.commitButtonTitle}.
 */
commitButtonTitle?: string;

/**
 * See {@link isc.BatchUploader.uploadStatusMessagesProperties BatchUploader.uploadStatusMessagesProperties}.
 */
uploadStatusMessagesProperties?: HTMLFlow;

/**
 * See {@link isc.BatchUploader.defaultQuoteString BatchUploader.defaultQuoteString}.
 */
defaultQuoteString?: string;

/**
 * See {@link isc.BatchUploader.uploadOperation BatchUploader.uploadOperation}.
 */
uploadOperation?: string;

/**
 * See {@link isc.BatchUploader.cancelConfirmMessage BatchUploader.cancelConfirmMessage}.
 */
cancelConfirmMessage?: string;

/**
 * See {@link isc.BatchUploader.previousButtonTitle BatchUploader.previousButtonTitle}.
 */
previousButtonTitle?: string;

/**
 * See {@link isc.BatchUploader.uploadFormProperties BatchUploader.uploadFormProperties}.
 */
uploadFormProperties?: DynamicForm;

/**
 * See {@link isc.BatchUploader.uploadEncoding BatchUploader.uploadEncoding}.
 */
uploadEncoding?: string;

/**
 * See {@link isc.BatchUploader.partialCommitError BatchUploader.partialCommitError}.
 */
partialCommitError?: string;

/**
 * See {@link isc.BatchUploader.errorMessageFileIsBlank BatchUploader.errorMessageFileIsBlank}.
 */
errorMessageFileIsBlank?: string;

/**
 * See {@link isc.BatchUploader.errorMessageExcelFileDetected BatchUploader.errorMessageExcelFileDetected}.
 */
errorMessageExcelFileDetected?: string;

/**
 * See {@link isc.BatchUploader.autoInterpretBooleans BatchUploader.autoInterpretBooleans}.
 */
autoInterpretBooleans?: boolean;

/**
 * See {@link isc.BatchUploader.dataURL BatchUploader.dataURL}.
 */
dataURL?: string;

/**
 * See {@link isc.BatchUploader.cancelButtonProperties BatchUploader.cancelButtonProperties}.
 */
cancelButtonProperties?: IButton;

/**
 * See {@link isc.BatchUploader.showUploadForm BatchUploader.showUploadForm}.
 */
showUploadForm?: boolean;

/**
 * See {@link isc.BatchUploader.uploadButtonTitle BatchUploader.uploadButtonTitle}.
 */
uploadButtonTitle?: string;

/**
 * See {@link isc.BatchUploader.uploadFieldPrefix BatchUploader.uploadFieldPrefix}.
 */
uploadFieldPrefix?: string;

/**
 * See {@link isc.BatchUploader.uploadDataSource BatchUploader.uploadDataSource}.
 */
uploadDataSource?: DataSource;

/**
 * See {@link isc.BatchUploader.nextButtonTitle BatchUploader.nextButtonTitle}.
 */
nextButtonTitle?: string;

/**
 * See {@link isc.BatchUploader.uploadFormFields BatchUploader.uploadFormFields}.
 */
uploadFormFields?: FormItem[];

/**
 * See {@link isc.BatchUploader.errorMessageDelimiterOrEndOfLine BatchUploader.errorMessageDelimiterOrEndOfLine}.
 */
errorMessageDelimiterOrEndOfLine?: string;

/**
 * See {@link isc.BatchUploader.dataFormat BatchUploader.dataFormat}.
 */
dataFormat?: string;

/**
 * See {@link isc.BatchUploader.errorMessageInputType BatchUploader.errorMessageInputType}.
 */
errorMessageInputType?: string;

/**
 * See {@link isc.BatchUploader.gridProperties BatchUploader.gridProperties}.
 */
gridProperties?: ListGrid;

/**
 * See {@link isc.BatchUploader.warnOnCancel BatchUploader.warnOnCancel}.
 */
warnOnCancel?: boolean;

/**
 * See {@link isc.BatchUploader.previewShown() BatchUploader.previewShown()}.
 */
previewShown?: Function;

/**
 * See {@link isc.BatchUploader.requestProperties BatchUploader.requestProperties}.
 */
requestProperties?: DSRequest;

/**
 * See {@link isc.BatchUploader.errorMessageUnterminatedQuote BatchUploader.errorMessageUnterminatedQuote}.
 */
errorMessageUnterminatedQuote?: string;

/**
 * See {@link isc.BatchUploader.beforeCommit() BatchUploader.beforeCommit()}.
 */
beforeCommit?: Function;

/**
 * See {@link isc.BatchUploader.defaultDelimiter BatchUploader.defaultDelimiter}.
 */
defaultDelimiter?: string;

/**
 * See {@link isc.BatchUploader.showCommitConfirmation BatchUploader.showCommitConfirmation}.
 */
showCommitConfirmation?: boolean;

/**
 * See {@link isc.BatchUploader.gridFields BatchUploader.gridFields}.
 */
gridFields?: ListGridField[];

/**
 * See {@link isc.BatchUploader.commitConfirmationMessage BatchUploader.commitConfirmationMessage}.
 */
commitConfirmationMessage?: string;

/**
 * See {@link isc.BatchUploader.partialCommitPrompt BatchUploader.partialCommitPrompt}.
 */
partialCommitPrompt?: string;

/**
 * See {@link isc.BatchUploader.allRecordsInErrorMessage BatchUploader.allRecordsInErrorMessage}.
 */
allRecordsInErrorMessage?: string;

/**
 * See {@link isc.BatchUploader.uploadQuoteString BatchUploader.uploadQuoteString}.
 */
uploadQuoteString?: string;

/**
 * See {@link isc.BatchUploader.commitButtonProperties BatchUploader.commitButtonProperties}.
 */
commitButtonProperties?: IButton;

/**
 * See {@link isc.BatchUploader.nextButtonProperties BatchUploader.nextButtonProperties}.
 */
nextButtonProperties?: IButton;

/**
 * See {@link isc.BatchUploader.uploadButtonProperties BatchUploader.uploadButtonProperties}.
 */
uploadButtonProperties?: IButton;

/**
 * See {@link isc.BatchUploader.partialCommit BatchUploader.partialCommit}.
 */
partialCommit?: string;

/**
 * See {@link isc.BatchUploader.discardedColumnsMessage BatchUploader.discardedColumnsMessage}.
 */
discardedColumnsMessage?: string;

/**
 * See {@link isc.BatchUploader.errorMessageUndeterminedDelimiter BatchUploader.errorMessageUndeterminedDelimiter}.
 */
errorMessageUndeterminedDelimiter?: string;

/**
 * See {@link isc.BatchUploader.updatesRolledBackMessage BatchUploader.updatesRolledBackMessage}.
 */
updatesRolledBackMessage?: string;

/**
 * See {@link isc.BatchUploader.uploadData() BatchUploader.uploadData()}.
 */
uploadData?: Function;

/**
 * See {@link isc.BatchUploader.errorMessageRowsNotParsed BatchUploader.errorMessageRowsNotParsed}.
 */
errorMessageRowsNotParsed?: string;

/**
 * See {@link isc.BatchUploader.cancelButtonTitle BatchUploader.cancelButtonTitle}.
 */
cancelButtonTitle?: string;

/**
 * See {@link isc.BatchUploader.displayDiscardedColumns BatchUploader.displayDiscardedColumns}.
 */
displayDiscardedColumns?: boolean;

/**
 * See {@link isc.BatchUploader.partialCommitConfirmationMessage BatchUploader.partialCommitConfirmationMessage}.
 */
partialCommitConfirmationMessage?: string;


children?: React.ReactElement<JSX.IntrinsicElements> |
           React.ReactElement<JSX.IntrinsicElements>[];

}


/**
 * BatchUploader wraps the SmartClient widget class
 * {@link isc.BatchUploader BatchUploader} for React, allowing you to import
 * BatchUploader for use in React JS and JSX.
 * @class
 * @extends VStack
 */
declare class BatchUploader extends VStack {
    props: AsComponentXML<BatchUploaderProps>;
}
