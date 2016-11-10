$(document).ready(function() {
    $('#daytimeSubmit').click(function() {
        var daytimeFrom = $('#daytimeFrom').val();
        var daytimeTo = $('#daytimeTo').val();

        $.ajax({
            url: '/motion/' + daytimeFrom + '/' + daytimeTo + '/',
        }).success(function(dataResponse, textStatus) {
            console.log(dataResponse);
            if(dataResponse.length > 0) {
                google.charts.setOnLoadCallback(start(dataResponse));
                $('#timelineHeader').text('Timeline');
            }
        }).fail(function(response) {
            console.log('error: ' + response.statusText);
        });
    });
});

google.charts.load('visualization', '1.0', {
    packages: ['timeline']
});

function start(dataResponse) {
    // Pick the HTML element
    var timelineHolder = document.getElementById('timeline');
    // Create an instance of Timeline
    var timeline = new google.visualization.Timeline(timelineHolder);
    var dataTable = prepareDataTable(dataResponse);
    // Draw the timeline
    timeline.draw(dataTable, config);
}

function prepareDataTable(dataResponse) {
    var dataTable = new google.visualization.DataTable();

    // Add columns
    dataTable.addColumn({
        type: 'string',
        id: 'Camera'
    });
    dataTable.addColumn({
        type: 'string',
        id: 'Location'
    });
    dataTable.addColumn({
        type: 'date',
        id: 'From Date'
    });
    dataTable.addColumn({
        type: 'date',
        id: 'To Date'
    });

    //Add Rows
    for (var i = 0; i < dataResponse.length; i++) {
        var date = new Date(dataResponse[i].Date);
        dataTable.addRow(['Camera 1', 'Jonas home',
            new Date(date.getYear(), date.getMonth(), date.getDay(), date.getHours(), date.getMinutes()),
            new Date(date.getYear(), date.getMonth(), date.getDay(), date.getHours(), date.getMinutes() + 1)
        ]);
    }

    return dataTable;
}

var config = {
    timeline: {
        groupByRowLabel: true
    },
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