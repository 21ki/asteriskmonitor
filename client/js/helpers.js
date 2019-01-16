Handlebars.registerHelper('amiblock', function (context) {
    var html = '<form class="form-horizontal" role="form">';

    for (var key in context) {

        if (key == "starmon_timestamp") {
            //context[key] = moment(context[key]).format('MMMM Do YYYY, h:mm:ss a');
            //context[key] = moment(context[key]).from(TimeSync.serverTime());
        }

        html = html + '<div class="form-group">';
        html = html + '     <label for="' + key + '"><strong>' + key + '</strong></label>';
        html = html + '     <input type="text" class="form-control" id="' + key + '" disabled value="' + context[key] + '">';
        html = html + '</div>';
    }

    html = html + '</form>';
    return html;
});
Handlebars.registerHelper('amitable', function (context) {
    var html = '<div class="table-responsive"><table class="table table-hover"><thead><tr>';

    for (var key in context) {
        if (key == "_id") continue;

        html = html + '<th>' + key + '</th>';
    }
    html = html + '</tr></thead><tbody><tr>';


    for (var key in context) {
        if (key == "_id") continue;

        if (key == "starmon_timestamp") {
            html = html + '<td>' + moment(context[key]).format('MMMM Do YYYY, h:mm:ss a') + '</td>';
        } else {
            html = html + '<td>' + context[key] + '</td>';
        }
    }

    html = html + '</tr></tbody></table></div>';
    return html;
});
copyToClipboard = str => {
    const el = document.createElement('textarea'); // Create a <textarea> element
    el.value = str; // Set its value to the string that you want copied
    el.setAttribute('readonly', ''); // Make it readonly to be tamper-proof
    el.style.position = 'absolute';
    el.style.left = '-9999px'; // Move outside the screen to make it invisible
    document.body.appendChild(el); // Append the <textarea> element to the HTML document
    const selected =
        document.getSelection().rangeCount > 0 // Check if there is any content selected previously
        ?
        document.getSelection().getRangeAt(0) // Store selection if found
        :
        false; // Mark as false to know no selection existed before
    el.select(); // Select the <textarea> content
    document.execCommand('copy'); // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el); // Remove the <textarea> element
    if (selected) { // If a selection existed before copying
        document.getSelection().removeAllRanges(); // Unselect everything on the HTML document
        document.getSelection().addRange(selected); // Restore the original selection
    }
};

Template.registerHelper('prettyTime', function (time = Date.now()) {
    return moment(time).format('MMMM Do YYYY, h:mm:ss a');
});

Handlebars.registerHelper('currentYear', function () {
    return moment(TimeSync.serverTime()).year();
});