isc.DataSource.create({
    ID: "exampleFormDS",
    fields : [
        {name:"itemId", type:"sequence", primaryKey:true},
        {name:"willAttend", type:"text"},
        {name:"reason", type:"text"}
    ],
    clientOnly: true
});

isc.DynamicForm.create({
    ID: "exampleForm", 
    dataSource: "exampleFormDS",
    width: 250,
    titleOrientation: "top",
    fields: [
        {name: "willAttend",
         type: "radioGroup",
         colSpan: "*",
         required: true,
         vertical: false,
         valueMap: ["Yes", "No"],
         redrawOnChange:true,
         title: "Will you be attending the meeting on April 4th? If no, please provide a reason"
        },
        {name: "reason",
         type: "text",
         title: "Reason",
         validators : [{
            type: "required",
            applyWhen: { fieldName:"willAttend", operator:"equals", value:"No" },
            errorMessage: "Please provide a reason"
         }]
        },
        {name: "validate",
         title: "Validate",
         type: "button",
         click: "form.validate()"
        }
    ]
});