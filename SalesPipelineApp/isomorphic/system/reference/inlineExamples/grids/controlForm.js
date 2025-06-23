
var topAdminControlForm = isc.FormLayout.create({
    autoDraw: false,
    items:[{
        name:"topAlignmentRadio", type:"radioGroup", showTitle:false, vertical:false, wrap:false,
        valueMap:["Normal User","Admin"], defaultValue:"Normal User",
        change:function (form, item, value, oldValue) {
            if (value == "Normal User") isc.Auth.setRoles(null);
            else isc.Auth.setRoles(["admin"]);

            // Rebuild the main UI: 
            // Typically Admin role would not be updated at runtime. This ensures the components show the appropriate
            // UI for the user role.
            topContainer.destroy();
            bottomContainer.destroy();

            createMainUI();
            testLayout.addMember(topContainer);
            testLayout.addMember(bottomContainer);
        }
    }]
});

isc.VLayout.create({
    ID: "testLayout",
    height: "100%", width:500,
    membersMargin:10,
    minBreadthMember: topContainer,
    members: [topAdminControlForm, topContainer, bottomContainer]
});