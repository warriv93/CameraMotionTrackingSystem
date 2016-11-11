// When the page (DOM) is ready
$(document).ready(function() {
    // When clicking on submit
    $('#daytimeSubmit').click(function() {
        var daytimeFrom = $('#daytimeFrom').val();
        var daytimeTo = $('#daytimeTo').val();

        $.ajax({
            url: '/api/motion/' + daytimeFrom + '/' + daytimeTo + '/',
        }).success(function(dataResponse, textStatus) {
            console.log(dataResponse);
            if(dataResponse.length > 0) {
                google.charts.setOnLoadCallback(start(dataResponse));
                $('#timelineHeader').text('Timeline');
            }
            else {
                $('#timelineHeader').text('No results');
                $('#timeline').html('');
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
    // Config for timeline
    var config = {
        timeline: {
            groupByRowLabel: true
        },
        backgroundColor: '#ffd',
        avoidOverlappingGridLines: true,
        hAxis: {
            format: 'HH:mm'
        }
    };
    // Pick the HTML element
    var timelineHolder = document.getElementById('timeline');
    // Create an instance of Timeline
    var timeline = new google.visualization.Timeline(timelineHolder);
    // Prepare the data
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
    var rowsToAdd = dataResponse.length;
    for (var i = 0; i < rowsToAdd; i++) {
        var date = new Date(dataResponse[i].Date);
        dataTable.addRow(['Camera 1', date.toLocaleString(),
            new Date(date.getYear(), date.getMonth(), date.getDay(), date.getHours(), date.getMinutes(), 0),
            new Date(date.getYear(), date.getMonth(), date.getDay(), date.getHours(), date.getMinutes(), 1)
        ]);
    }

    return dataTable;
}