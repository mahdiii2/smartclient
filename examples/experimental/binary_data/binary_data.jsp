<!--------------------------------------------------------------------
	SmartClient SDK
	Binary Data interfaces

	Copyright 2001 and beyond Isomorphic Software, Inc. (www.isomorphic.com)
---------------------------------------------------------------------->

<%@ taglib uri="http://www.smartclient.com/taglib" prefix="isomorphic" %>
<HTML><HEAD><TITLE>Binary Data Interfaces</TITLE>
<isomorphic:loadISC skin="SmartClient"/>
</HEAD><BODY BGCOLOR=#8080FF>
<SCRIPT>

<isomorphic:loadDS name="uploadTest"/>
<isomorphic:loadDS name="uploadedFiles"/>


ListGrid.create({
    ID: "uploadLG",
    autoDraw: false,
    dataSource: uploadTest,
    recordClick: function (viewer, record) {
        uploadForm.editSelectedData('uploadLG');
        downloadLG.filterData({uploadTestId: record.id});
        downloadViewer.filterData({uploadTestId: record.id});
    }
});
uploadLG.filterData({});

DynamicForm.create({
    ID: "uploadForm",
    autoDraw: false,
    dataSource: uploadTest,
    items: [
        {name: "textField"},
        {name: "file", title: "Files", height: 60, type: "multiupload", dataSource: "uploadedFiles"},
        {name: "numField"}
    ]
});

HLayout.create({
    ID: "uploadButtons",
    autoDraw: false,
    members : [
        IButton.create({
            title: "Save",
            click: "uploadForm.save()"
        }),
        IButton.create({
            title : "Delete",
            click: "uploadLG.removeSelectedData()"
        }),
        IButton.create({
            title: "Edit New",
            click: "uploadForm.editNewRecord()"
        })
    ]
});

VStack.create({
    ID: "topLayout",
    autoDraw: false,
    members: [
        VLayout.create({
            members: [
                uploadForm,
                uploadButtons
            ]
        }),
        uploadLG
    ]
});



DetailViewer.create({
    ID: "downloadViewer",
    autoDraw: false,
    dataSource: uploadedFiles,
    border: "1px solid black",
    blockSeparator: "",
    showBorder: false,
    overflow: "auto",
    fields : [
        {name: "file" },
        {name: "file_date_created", title: "Uploaded"}
    ]
});


ListGrid.create({
    ID: "downloadLG",
    autoDraw: false,
    dataSource: uploadedFiles,
    showRollOver: false,
    fields : [
        {name: "file" },
        {name: "file_date_created", title: "Uploaded"}
    ],
    recordClick: function (viewer, record) {
        if(record.file_filename.match(/\.(jpg|gif|tiff|png)$/)) {
             imgCanvas.setContents(isc.Canvas.imgHTML(uploadedFiles.streamFile(record),
                                                      imgCanvas.getWidth(), imgCanvas.getHeight()));
        }                                 
    }
});

Canvas.create({
    ID: "imgCanvas",
    autoDraw: false,
    overflow: "visible"
});



HLayout.create({
    autoDraw: false,
    ID: "downloadLGButtons",
    members: [
        IButton.create({
            autoDraw: false,
            title: "Add File",
            click: function () {
                if(!this.multiUploadPicker) {
                    this.multiUploadPicker = MultiFilePicker.create({ 
                        canDragReposition: true,
                        left: 300,
                        top: 400,
                        dataSource: downloadLG.dataSource
                    });
                }          
                var ds = isc.DS.getDataSource(downloadLG.dataSource);
                var record = uploadLG.getSelectedRecord();
                this.multiUploadPicker.setForeignKeyValues(ds.getForeignKeysByRelation(record, uploadLG.dataSource));
                this.multiUploadPicker.show();
            }
        }),
        IButton.create({
            autoDraw: false,
            title: "Remove Selected File",
            width: 150,
            click : "downloadLG.removeSelectedData()"
        })
    ]
});

HLayout.create({
    ID: "pageLayout",
    width: "100%",
    height: "100%",
    members: [
        topLayout,
        VLayout.create({
            members: [
                downloadViewer,
                downloadLG,
                downloadLGButtons,
                imgCanvas
            ]
        })
    ]
});


</SCRIPT>
</BODY>
</HTML>