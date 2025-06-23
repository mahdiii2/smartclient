var employeeData =[
    {
        "OrgUnit":"Management", 
        "Email":"cmadigan@server.com", 
        "EmployeeId":4, 
        "Name":"Charles Madigen"
    }, 
    {
        "OrgUnit":"Management", 
        "Email":"tkane@server.com", 
        "teams":[
            3, 
            2
        ], 
        "EmployeeId":182, 
        "Name":"Tamara Kane"
    }, 
    {
        "OrgUnit":"Management", 
        "Email":"jlittle@server.com", 
        "EmployeeId":183, 
        "Name":"Joan Little"
    }, 
    {
        "OrgUnit":"Management", 
        "Email":"kamirov@server.com", 
        "teams":[
            5
        ], 
        "EmployeeId":184, 
        "Name":"Kirill Amirov"
    }, 
    {
        "OrgUnit":"Management", 
        "Email":"rshu@server.com", 
        "teams":[
            1, 
            4
        ], 
        "EmployeeId":185, 
        "Name":"Rui Shu"
    }, 
    {
        "OrgUnit":"Management", 
        "Email":"jgarrison@server.com", 
        "EmployeeId":186, 
        "Name":"John Garrison"
    }, 
    {
        "OrgUnit":"Management", 
        "Email":"alippman@server.com", 
        "teams":[
            1
        ], 
        "EmployeeId":187, 
        "Name":"Abigail Lippman"
    }, 
    {
        "OrgUnit":"Management", 
        "Email":"rleger@server.com", 
        "EmployeeId":188, 
        "Name":"Rogine Leger"
    }, 
    {
        "OrgUnit":"Management", 
        "Email":"gporter@server.com", 
        "EmployeeId":189, 
        "Name":"Gene Porter"
    }, 
    {
        "OrgUnit":"Management", 
        "Email":"cfinley@server.com", 
        "EmployeeId":190, 
        "Name":"Carol Finley"
    }
];

isc.VLayout.create({
    width:"100%", height:"100%",
    membersMargin:5,
    members:[
        isc.Shuttle.create({
            ID:"teamShuttle",
            data:employeeData,
            valueField:"EmployeeId",
            sourceGridTitle:"Staff",
            targetGridTitle:"Team Members",
            fields:[
                {name:"Name"},
                {name:"Email"}
            ]
        }),
        isc.Button.create({
            title:"Show Current Team Members",
            layoutAlign:"center",
            width:200,
            click : function () {
                var team = teamShuttle.getSelectedRecords();
                if (team.length == 0) isc.say("Team is empty");
                else {
                    var notificationString = "Current team members:<ul>";
                    for (var member of team) {
                        notificationString += "<li>" + member.Name + " (" + member.Email + ")</li>";
                    }
                    notificationString += "</ul>"
                    isc.say(notificationString);
                }
            }
        })
    ]
});
