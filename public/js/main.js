/**
 * Created by msi on 04-Nov-16.
 */
$(document).ready(function() {
    $.ajax({
        url: "/",
    }).success(function (dataResponse, textStatus) {
        console.log("WOHO");
        console.log(dataResponse);
        console.log(textStatus);
        // here you have a  complete user object that you can use
    }).fail(function(response) {
        console.log("error: " + response.statusText);
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

    var container = document.getElementById('advancedTimeline');
    var chart = new google.visualization.Timeline(container);

    var dataTable2 = drawChart();
    chart.draw(dataTable2);
}


function prepareDataTable() {
    var dataTable = new google.visualization.DataTable();

    // Add columns
    dataTable.addColumn({ type: 'string', id: 'Label'});
    dataTable.addColumn({ type: 'string', id: 'Place'});
    dataTable.addColumn({ type: 'date', id: 'Arrival Date'});
    dataTable.addColumn({ type: 'date', id: 'Departure Date'});

    //Add Rows
    dataTable.addRow(['Camera 1', 'Berlin',
        new Date(2014, 0, 15), new Date(2014, 1, 26)]);
    dataTable.addRow(['Camera 1', 'Paris',
        new Date(2014, 3, 20), new Date(2014, 6, 1)]);
    dataTable.addRow(['Camera 1', 'Madrid',
        new Date(2014, 6, 21), new Date(2014, 7, 30)]);
    dataTable.addRow(['Camera 1', 'Perth',
        new Date(2014, 10, 2), new Date(2014, 11, 5)]);

    dataTable.addRow(['Alice\'s Travels', 'Berlin', new Date(2014, 0, 15),
        new Date(2014, 1, 26)]);
    dataTable.addRow(['Alice\'s Travels', 'Paris', new Date(2014, 3, 20),
        new Date(2014, 6, 1)]);
    dataTable.addRow(['Alice\'s Travels', 'Madrid', new Date(2014, 6, 21),
        new Date(2014, 7, 30)]);
    dataTable.addRow(['Alice\'s Travels', 'Perth', new Date(2014, 10, 2),
        new Date(2014, 11, 5)]);



    return dataTable;
}

var config = {
    timeline: { groupByRowLabel: true },
    backgroundColor: '#ffd'

};




function drawChart() {
    var dataTable = new google.visualization.DataTable();

    dataTable.addColumn({ type: 'string', id: 'Position' });
    dataTable.addColumn({ type: 'string', id: 'Name' });
    dataTable.addColumn({ type: 'date', id: 'Start' });
    dataTable.addColumn({ type: 'date', id: 'End' });
    dataTable.addRows([
        [ 'President', 'George Washington', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
        [ 'President', 'John Adams', new Date(1797, 2, 4), new Date(1801, 2, 4) ],
        [ 'President', 'Thomas Jefferson', new Date(1801, 2, 4), new Date(1809, 2, 4) ],
        [ 'Vice President', 'John Adams', new Date(1789, 3, 21), new Date(1797, 2, 4)],
        [ 'Vice President', 'Thomas Jefferson', new Date(1797, 2, 4), new Date(1801, 2, 4)],
        [ 'Vice President', 'Aaron Burr', new Date(1801, 2, 4), new Date(1805, 2, 4)],
        [ 'Vice President', 'George Clinton', new Date(1805, 2, 4), new Date(1812, 3, 20)],
        [ 'Secretary of State', 'John Jay', new Date(1789, 8, 25), new Date(1790, 2, 22)],
        [ 'Secretary of State', 'Thomas Jefferson', new Date(1790, 2, 22), new Date(1793, 11, 31)],
        [ 'Secretary of State', 'Edmund Randolph', new Date(1794, 0, 2), new Date(1795, 7, 20)],
        [ 'Secretary of State', 'Timothy Pickering', new Date(1795, 7, 20), new Date(1800, 4, 12)],
        [ 'Secretary of State', 'Charles Lee', new Date(1800, 4, 13), new Date(1800, 5, 5)],
        [ 'Secretary of State', 'John Marshall', new Date(1800, 5, 13), new Date(1801, 2, 4)],
        [ 'Secretary of State', 'Levi Lincoln', new Date(1801, 2, 5), new Date(1801, 4, 1)],
        [ 'Secretary of State', 'James Madison', new Date(1801, 4, 2), new Date(1809, 2, 3)]
    ]);

    return dataTable;
}

