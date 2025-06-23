var orgChart = [
  {
    "id": 84425,
    "name": "Europe",
    "isFolder": true
  },
  {
    "id": 31655,
    "name": "North America",
    "isFolder": true
  },
  {
    "id": 64545,
    "name": "Asia",
    "isFolder": true
  },
  {
    "id": 10936,
    "name": "London Office",
    "parentId": 84425,
    "isFolder": true
  },
  {
    "id": 35586,
    "name": "Berlin Office",
    "parentId": 84425,
    "isFolder": true
  },
  {
    "id": 74957,
    "name": "New York Office",
    "parentId": 31655,
    "isFolder": true
  },
  {
    "id": 34331,
    "name": "San Francisco Office",
    "parentId": 31655,
    "isFolder": true
  },
  {
    "id": 70618,
    "name": "Tokyo Office",
    "parentId": 64545,
    "isFolder": true
  },
  {
    "id": 69651,
    "name": "Singapore Office",
    "parentId": 64545,
    "isFolder": true
  },
  {
    "id": 65782,
    "name": "Edward Price",
    "parentId": 10936,
    "isFolder": false,
    "email": "edward.price@server.com"
  },
  {
    "id": 15636,
    "name": "Alice Carter",
    "parentId": 10936,
    "isFolder": false,
    "email": "alice.carter@server.com"
  },
  {
    "id": 27212,
    "name": "Hannah Wagner",
    "parentId": 35586,
    "isFolder": false,
    "email": "hannah.wagner@server.com"
  },
  {
    "id": 19734,
    "name": "Sophia Schmidt",
    "parentId": 35586,
    "isFolder": false,
    "email": "sophia.schmidt@server.com"
  },
  {
    "id": 77608,
    "name": "John Denault",
    "parentId": 74957,
    "isFolder": false,
    "email": "john.denault@server.com"
  },
  {
    "id": 43802,
    "name": "Emily Davis",
    "parentId": 74957,
    "isFolder": false,
    "email": "emily.davis@server.com"
  },
  {
    "id": 24594,
    "name": "Michael Brown",
    "parentId": 34331,
    "isFolder": false,
    "email": "michael.brown@server.com"
  },
  {
    "id": 63423,
    "name": "Sarah Johnson",
    "parentId": 34331,
    "isFolder": false,
    "email": "sarah.johnson@server.com"
  },
  {
    "id": 80834,
    "name": "Hiroshi Tanaka",
    "parentId": 70618,
    "isFolder": false,
    "email": "hiroshi.tanaka@server.com"
  },
  {
    "id": 67917,
    "name": "Yuki Yamamoto",
    "parentId": 70618,
    "isFolder": false,
    "email": "yuki.yamamoto@server.com"
  },
  {
    "id": 54462,
    "name": "Wei Zhang",
    "parentId": 69651,
    "isFolder": false,
    "email": "wei.zhang@server.com"
  },
  {
    "id": 42164,
    "name": "Amara Patel",
    "parentId": 69651,
    "isFolder": false,
    "email": "amara.patel@server.com"
  }
]

isc.DataSource.create({
    ID:"orgDS",
    clientOnly:true,
    fields:[
        {name:"id", hidden:true, primaryKey:true},
        {name:"name", title:"Name"},
        {name:"email"},
        {name:"parentId", hidden:true, foreignKey:"id"},
        {name:"isFolder", hidden:true, type:"boolean"}
    ],
    cacheData:orgChart
})

isc.VLayout.create({
    ID:"mainLayout",
    width:"100%", height:"100%",
    defaultLayoutAlign:"center",
    members:[
        isc.SearchForm.create({
            dataSource:"orgDS",
            layoutAlign:"center",
            items:[
                {
                    name:"name", 
                    editorType:"MultiPickerItem",
                    showTitle:false,
                    selectionStyle:"pickTree",
                    includeSelectedParents:false,
                    emptyDisplayValue:"Select Team Members"
                },
                {
                  editorType:"ButtonItem",
                  title:"Show Current Team Members",
                  click : function () {
                      var team = this.form.getValue("name")
                      if (team == null || team.length == 0) isc.say("Team is empty");
                      else {
                          var notificationString = "Current team members:<ul>";
                          for (var memberName of team) {
                              notificationString += "<li>" +memberName + "</li>";
                          }
                          notificationString += "</ul>"
                          isc.say(notificationString);
                      }
                  }
              }
            ]
        })
      ]
});
