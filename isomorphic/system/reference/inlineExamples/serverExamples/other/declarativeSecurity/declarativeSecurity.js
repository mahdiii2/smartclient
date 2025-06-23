// we need to call setCurrentUser(), otherwise the client security code assumes you are not authenticated.
isc.Authentication.setCurrentUser({userId:"jean"});

isc.VLayout.create({
    ID: "mainLayout",
    membersMargin: 15,
    members:[
        isc.DynamicForm.create({
            ID: "formRoles",
            fields : [
                {
                    name: "selectRoles", title: "Roles",
                    editorType: "SelectItem",
                    multiple: true,
                    valueMap : {
                        "HR" : "HR",
                        "CEO" : "CEO"
                    },
                    changed :function (form, item, value) {
                        // setRoles() is meant to be called before application startup, and the roles should be provided by whatever system
                        // you use for authentication.  Note that you are *not* normally allowed to change roles after your application has started;
                        // this sample simulates dynamic role change by completely rebuilding the UI.
                        isc.Authentication.setRoles(value);                    
                        hLayout.destroy();
                        mainLayout.addMember(createUI());
                    }
                }]            
        }),
        createUI()
    ]
});


