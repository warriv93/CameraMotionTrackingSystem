/**
 * Created by msi on 04-Nov-16.
 */
$(document).ready(function() {
    $("#daytimeSubmit").click(function() {
        var daytimeFrom = $("#daytimeFrom").val();
        var daytimeTo = $("#daytimeTo").val();

        $.ajax({
            url: "/motion/" + daytimeFrom + "/" + daytimeTo + "/",
        }).success(function (dataResponse, textStatus) {
            console.log("WOHO");
            console.log(dataResponse);
            console.log(textStatus);
            // here you have a  complete user object that you can use
        }).fail(function(response) {
            console.log("error: " + response.statusText);
        });
    });
});

google.charts.load('visualization', '1.0', { packages:["timeline"] });
google.charts.setOnLoadCallback(start);

function start() {
    // Pick the HTML element
    var timelineHolder = document.getElementById("timeline");
    // Create an instance of Timeline
    var timeline = new google.visualization.Timeline(timelineHolder);
    var dataTable = prepareDataTable();
    // Draw the timeline
    timeline.draw(dataTable, config);
}


function prepareDataTable() {
    var dataTable = new google.visualization.DataTable();

    // Add columns
    dataTable.addColumn({ type: 'string', id: 'Label'});
    dataTable.addColumn({ type: 'string', id: 'Location'});
    dataTable.addColumn({ type: 'date', id: 'Arrival Date'});
    dataTable.addColumn({ type: 'date', id: 'Departure Date'});

    //Add Rows
    dataTable.addRow(['Camera 1', 'Jonas home',
        new Date(2014, 1, 15, 14), new Date(2014, 1, 15, 16)]);

    dataTable.addRow(['Camera 1', 'Jonas home',
        new Date(2014, 1, 15, 17), new Date(2014, 1, 15, 20)]);

    return dataTable;
}

var config = {
    timeline: { groupByRowLabel: true },
    backgroundColor: '#ffd',
    avoidOverlappingGridLines: true,
    hAxis: {
        viewWindow: {
            min: 0,
            max: 100
        },
        ticks: [0, 25, 50, 75, 100] // display labels every 25
    }

};




