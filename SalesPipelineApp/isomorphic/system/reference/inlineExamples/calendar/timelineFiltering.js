var developers = [
    { name: "charlesMadigen", title: "Charles Madigen" },
    { name: "tamaraKane", title: "Tamara Kane" },
    { name: "darcyFeeney", title: "Darcy Feeney" },
    { name: "kaiKong", title: "Kai Kong" },
    { name: "shellyFewel", title: "Shelly Fewel" },
    { name: "garretMonroe", title: "Garret Monroe" }
];

var _calStart = isc.DateUtil.getStartOf(new Date(2020, 6, 4), "W");
var _calEnd = _calStart.duplicate();
_calEnd.setDate(_calEnd.getDate() + 21);

isc.ToolStrip.create({
    ID: "toolstrip",
    width: "100%"
});

var eventForm = toolstrip.addFormItem({ name: "eventFilter", title: "Filter by Event Name", titleOrientation: "top", changed: "timeline.rebuild();"});
var laneForm = toolstrip.addFormItem({ name: "laneFilter", title: "Filter by Lane Name", titleOrientation: "top", changed: "timeline.rebuild();" });
var unusedLanesForm = toolstrip.addFormItem({ name: "hideUnusedLanes", wrapTitle:false, title: "Hide Unused Lanes", titleOrientation: "top", type: "boolean", changed: "timeline.setHideUnusedLanes(this.getValue());" });
var dateForm = toolstrip.addFormItem({ name: "hideWednesdays", wrapTitle:false, title: "Hide Wednesdays", titleOrientation: "top", type: "boolean", changed: "timeline.rebuild();" });
var weekendForm = toolstrip.addFormItem({ name: "hideWeekends", wrapTitle:false, title: "Hide Weekends", titleOrientation: "top", type: "boolean", changed: "timeline.setShowWeekends(!this.getValue());" });

// remove the events for lane "darcyFeeney", so the "hideUnusedLane" function has a noticable effect
var taskData = events.duplicate();
taskData.removeList(taskData.findAll("lane", "darcyFeeney"));

isc.Timeline.create({
    ID: "timeline", 
    height: 475,
    startDate: _calStart, 
    endDate: _calEnd,
    data: taskData,
    lanes: developers,
    headerLevels: [ { unit: "week" }, { unit: "day" } ],
    laneFields: [ { name: "title", title: "Developer", minWidth: 120, autoFitWidth: true } ],
    canEditLane: true,
    showEventDescriptions: false,
    columnsPerPage: 5,
    disableWeekends: false,
    laneEventPadding: 2,
    
    // hide all Wednesdays
    shouldShowDate : function (date) {
        var hideWednesdays = dateForm.getValue("hideWednesdays");
        if (hideWednesdays && date && date.getDay() == 3) return false;
        return this.Super("shouldShowDate", arguments);
    },

    // hide events whose name does not contain the "eventFilter"
    shouldShowEvent : function (event, view) {
        var text = eventForm.getValue("eventFilter");
        if (text && text != "") {
            if (event.name && !event.name.toLowerCase().contains(text.toLowerCase())) {
                return false;
            }
        }
        return this.Super("shouldShowEvent", arguments);
    },
    
    // hide Lanes whose name does not contain the "laneFilter"
    shouldShowLane : function (lane, view) {
        var text = laneForm.getValue("laneFilter");
        if (lane && text && text != "") {
            if (lane.name && !lane.name.toLowerCase().contains(text.toLowerCase())) {
                return false;
            }
        }
        return this.Super("shouldShowLane", arguments);
    },
    rebuild : function () {
        // rebuild the timelineView
        this.getSelectedView().rebuild(true);
    }
});

isc.VStack.create({
    width: "100%",
    membersMargin: 8,
    members: [ toolstrip, timeline ]
});