isc.VLayout.create({
    membersMargin: 5,
    members: [
        isc.Header.create({ title:"Standalone Toggle" }),
        isc.ToggleSwitch.create({ ID:"toggleSwitch" }),
        isc.LayoutSpacer.create({ height:20 }),
        isc.Header.create({ title:"Toggle in a form" }),
        isc.DynamicForm.create({
            fields: [ 
                { name:"toggle", title:"Enable Noise Cancellation", 
                 wrapTitle:false, editorType:"ToggleItem" }
            ]
        })
    ]
});