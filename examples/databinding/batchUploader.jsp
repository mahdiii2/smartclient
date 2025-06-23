<!-----------------------------------------------------------------------------------
    SmartClient SDK
    BatchUploader example.  This example shows how to use the BatchUploader component, 
    specifically in the context of a SmartClient "hibernate" DataSource.

    Copyright 2001 and beyond Isomorphic Software, Inc. (www.isomorphic.com)
------------------------------------------------------------------------------------>

<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>
<HEAD><TITLE>
        SmartClient SDK - BatchUploader example
</TITLE></HEAD><isomorphic:loadISC skin="TreeFrog"/>
<BODY><SCRIPT>


// load datasource
<isomorphic:loadDS ID="supplyItemCustomHB" />


// create the BatchUploader component
isc.BatchUploader.create({
    ID:"uploader",
    uploadDataSource: supplyItemCustomHB,
    // BatchUploader supports extra fields, which are uploaded along with the file 
    // data and can be accessed from the HttpSession on the server side; here we
    // define some fields to be used in this way
    uploadFormFields: [
        { name: "stringValue", title: "String Value", type: "text" },
        { name: "numericValue", title: "Numeric Value", type: "number" }
    ],
    // Setting dataURL causes every "add" operation issued by the BatchUploader to
    // use that dataURL.  Here, we are pointing at the exampleTransactionManager JSP,
    // which demonstrates how to use SmartClient server APIs to impose transaction 
    // control on database updates
    dataURL: "exampleTransactionManager.jsp"
});


// create ListGrid, DetailViewer, & DynamicForm components to bind to datasources
// (nested inside a VStack to manage layout)
isc.VStack.create({
    left:20,
    width:"70%",
    membersMargin:20,
    members:[

        Label.create({
            ID:"helpText",
            contents: "<h3><u>BatchUploader Example</u></h3><ul>" +
                "<li>Click the 'Browse' button and use the file picker to select file supplyItemTest.csv, " +
                "which is located in the <code>examples/databinding</code> folder of the SmartClient SDK.</li>" +
                "<li>The BatchUploader will upload and validate the contents of that CSV file against the " +
                "DataSource declared on the BatchUploader, which in this case is supplyItemCustomHB.</li>" +
                "<li>Validated data will then be streamed back down to the client and displayed in an " +
                "editable ListGrid, so you can review and correct errors.</li>" +
                "<li>Click 'Commit' to save the data back to the DataSource's persistent store (in this " +
                "case, a database table accessed via Hibernate).</li>" +
                "<li>This end-to-end functionality is encapsulated by the BatchUploader, and requires " + 
                "no application code.</li></ul>"
        }),
        
        uploader

    ]
});



</SCRIPT>
</BODY></HTML>
