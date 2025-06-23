// ***********************************************
// This sample commands.js contains custom commands for integration
// with Isomorphic SmartClient applications
// 
// For details on using Cypress with SmartClient, see the documentation here:
// https://smartclient.com/smartclient-latest/isomorphic/system/reference/?id=group..smartClientCypress
// ***********************************************

// getSC(): Retrieve an element in the DOM based on a SmartClient locator
// This command uses isc.AutoTest.waitForElement to ensure any asynchronous operations
// have completed before the target element is returned.
Cypress.Commands.add('getSC', (locator, options) => {
    let logCommand = options && options.log;
    if (logCommand == null) logCommand = Cypress.config('scLogCommands');
    if (logCommand) cy.log("getSC() invoked with locator:" + locator);
    cy.getSCTimeout(options).then((scTimeout) => {

        if (options == null) options = {};
        options.timeout = scTimeout;

        // Apply the specified timeout to the cypress then() command
        // Ensure that the timeout applied to waitForElement is greater than
        // this so the test fails consistently if the timeout is exceeded
        let thenTimeout = scTimeout;
        scTimeout += 1000;
        
        cy.window({log:false}).then({timeout:thenTimeout}, (win) => {
            return new Cypress.Promise((resolve) => {

                const waitForElementCallback = (element, done) => {
                    if (!done) {
                        cy.log("AutoTest.waitForElementCallback() timed out for locator:\n" + locator);
                    }
                    // If the locator could not be resolved, element will be null
                    resolve(cy.wrap(element));
                }
                win.isc.AutoTest.waitForElement(locator, waitForElementCallback, options);
            
            });
        });
    });
});

// Timeout for SmartClient commands().
// - May be specified explicitly in the Options object or specified globally via scCommandTimeout in Cypress config
// - if not explicitly specified, will be derived from AutoTest.waitForTimeOutSeconds on the target.
Cypress.Commands.add('getSCTimeout', (options) => {
    cy.window({log:false}).then(win => {
        return new Cypress.Promise((resolve) => {
            const scTimeout = ( (options != null && options.timeout != null) ? 
                                options.timeout : 
                                (Cypress.config('scCommandTimeout') != null ? 
                                    Cypress.config('scCommandTimeout') :
                                    (win.isc.AutoTest.waitForTimeOutSeconds * 1000)
                                )
                              );
            resolve(scTimeout);
        });
    });
});


// waitForSystemDone(): Use isc.AutoTest.waitForSystemDone() to wait for any pending
// SmartClient actions including RPC transactions and delayed actions to complete
Cypress.Commands.add('waitForSCDone', (options) => {
    let logCommand = options && options.log;
    if (logCommand == null) logCommand = Cypress.config('scLogCommands');
    if (logCommand) cy.log("waitForSCDone()");    
    cy.getSCTimeout(options).then((scTimeout) => {
        let thenTimeout = scTimeout;
        scTimeout += 1000;
        cy.window({log:false}).then({timeout:thenTimeout}, (win) => {
            return new Cypress.Promise((resolve) => {
                const myCallback = (done) => {
                    resolve();
                };
                win.isc.AutoTest.waitForSystemDone(myCallback, options)
            });
        });
    });
});


// scrollSC(): Scroll the SmartClient component
Cypress.Commands.add('scrollSC', (locator, left, top, options) => {
    let logCommand = options && options.log;
    if (logCommand == null) logCommand = Cypress.config('scLogCommands');
    if (logCommand) cy.log("scrollSC()");
    cy.getSCTimeout(options).then((scTimeout) => {

        if (options == null) options = {};
        options.timeout = scTimeout;
        let thenTimeout = scTimeout;
        scTimeout += 1000;
        
        cy.window({log:false}).then({timeout:thenTimeout}, (win) => {
            return new Cypress.Promise((resolve) => {

                const waitForElementCallback = (element, done) => {
                    if (!done) {
                        cy.log("AutoTest.waitForElementCallback() timed out for locator:\n" + locator);
                    }
                    // If the locator could not be resolved, element will be null
                    if (element != null) {
                        let canvas = win.isc.AutoTest.locateCanvasFromDOMElement(element);
                        if (canvas != null) {
                            // Handle being passed percentage strings ("50%"), or pixel numbers
                            // or a mix of both
                            let isPercentLeft = win.isc.isA.String(left);
                            let isPercentTop = win.isc.isA.String(top);
                            if ((left == null || isPercentLeft) && (top == null || isPercentTop)) {                        
                                canvas.scrollToPercent(left,top);
                            } else {
                                if (isPercentLeft) {
                                    canvas.scrollToPercent(left);
                                    canvas.scrollTo(null, top);
                                } else if (isPercentTop) {
                                    canvas.scrollToPercent(null, top);
                                    canvas.scrollTo(left);
                                } else {
                                    canvas.scrollTo(left, top);
                                }
                            }
                        }
                    }
                    resolve();
                }
                win.isc.AutoTest.waitForElement(locator, waitForElementCallback, options);
            
            });
        });
    });
});


// enableSC_RPCTimeout(): Invoked once per page load to log details of slow SmartClient RPC transactions
// If a timeoutThreshold is specified, any transactions which exceed that threshold will cause the test to fail
// The command does the following:
// - It first enables tracking of RPC timing data and then adds a processingCompleteCallback to 
//   fire for every SmartClient RPC transaction.</li>
// - The processingCompleteCallback we define will compare the elapsed time for the transaction with
//   the specified thresholds for logging or failure.</li>
// - If either is exceeded it uses a cypress EventEmitter to emit a new cypress event - either "logData" or "failTest"
// - Then the logic to handle those events will do the appropriate thing - log the transaction 
//   timing tree to the console or run an assertion comparing the elapsed time to the failure threshold,
//   causing the test to fail.
Cypress.Commands.add('enableSC_RPCTimeout', (logThreshold, timeoutThreshold, options = {}) => {

    if (logThreshold == null) logThreshold = 1000;

    var events = require('events');
    var myEmitter = new events.EventEmitter();

    var undef;

    let action = options.rpcAction || "Complete client-server roundtrip";
    let logDetail = options.logDetail || "detailed";
    let logSuccess = options.logSuccess == undef ? false : options.logSuccess;
    let failOnInvalidTimings = options.failOnInvalidTimings == undef ? true : options.failOnInvalidTimings
    let includeClientTimings = options.includeClientTimings == undef ? true : options.includeClientTimings;
    let includeServerTimings = options.includeServerTimings != undef ? true : options.includeServerTimings;
    return cy.window().then((win) => {
        
        // If run against a version of SmartClient that doesn't support the necessary APIs warn and return
        if (win.isc.RPCManager.getTransactionDescription == null) {
            cy.log("Unable to track timing data on this version of SmartClient: " + win.isc.version);
            return;
        }

        win.isc.RPCManager.setTimingDataEnabled(true);
        win.isc.RPCManager.addProcessingCompleteCallback(function(transactionNum) {

            // Summary of the transaction (for logging purposes)
            let transactionName = win.isc.RPCManager.getTransactionDescription(transactionNum);

            win.isc.RPCManager.getTimingData(transactionNum, function(timingTree) {

                const transactionNode = timingTree.find(action);
                const elapsed = transactionNode == null ? 0 : transactionNode.elapsed;

                let failTest = false;

                if (failOnInvalidTimings && elapsed <= 0) {
                    myEmitter.emit("logData", {
                        transaction: transactionName,
                        elapsed: elapsed,
                        message: "ERROR: Elapsed time was 0 or negative - indicates a problem with " +
                                "the test or with gathering timing data"
                    });
                    failTest = true;

                } else if (elapsed >= logThreshold) {
                    var maxDepth = 1;  // logDetail = "none" - top-level only
                    if (logDetail == "summary") {
                        maxDepth = 2;
                    } else if (logDetail == "detailed") {
                        maxDepth = 5;
                    } else if (logDetail == "all") {
                        maxDepth = undef;
                    }
                    const formattedTree = win.isc.RPCManager.getFormattedTimingData(transactionNum, null, null,
                                                                includeClientTimings, includeServerTimings, maxDepth);

                    myEmitter.emit("logData", {
                        transaction: transactionName,
                        elapsed: elapsed,
                        message: "RPC Request exceeded " + logThreshold + "ms:\n" + formattedTree
                    });
                } else if (logSuccess) {
                    myEmitter.emit("logData", {
                        transaction: transactionName,
                        message: "Processing complete callback fired; transaction time was " +
                                    "below the error threshold (" + elapsed + "ms)"
                    });
                }

                if (timeoutThreshold != null && elapsed > timeoutThreshold) {
                    // We are logging separately from the function that fails the test by
                    // throwing an error, because the log step never happens if the containing
                    // function fails
                    var msg = "ERROR: Elapsed time (" + elapsed + "ms) was " +
                                                    "greater than the allowed timeout (" + timeoutThreshold +
                                                    "ms). Failing this test - see the previously " +
                                                    "logged timing metrics for more information";
                    myEmitter.emit("logData", {
                        transaction: transactionName,
                        message: msg
                    });
                    failTest = true;
                }
                if (failTest) {
                    myEmitter.emit("failTest", {
                        elapsed: elapsed
                    });
                }

            })
        });
    }).then(() => {
        // Listen to the event and handle Cypress commands outside of the callback
        myEmitter.on("logData", data => {
            let msg = data.transaction + "\n" + data.message;
            cy.log(msg);
            if(!Cypress.config('isInteractive')) {
                cy.task("log", msg);
            }
        });

        myEmitter.on("failTest", data => {
            // Run the wrap() on a timeout of 0 to prevent it from retrying - there's
            // no point because neither "elapsed" not "timeoutThreshold" is going
            // to change
            // no need to log the wrap
            if (failOnInvalidTimings) cy.wrap(data.elapsed, {timeout: 0, log:false}).should("be.greaterThan", 0);
            if (timeoutThreshold != null) cy.wrap(data.elapsed, {timeout: 0, log:false}).should("be.lessThan", timeoutThreshold);
        });

    });
});
