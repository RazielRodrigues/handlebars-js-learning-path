$(document).ready(function() {
    var info = $('#handlebars-template').html();
    var compiled = Handlebars.compile(info);
    $('#content-inject').html(compiled({doesWhat: 'Handlebars com JQUERY'}));
});

// var info = document.getElementById('handlebars-template').innerHTML;
// var compiled = Handlebars.compile(info);
// var x = document.getElementById('content-inject');
// x.innerHTML = compiled({doesWhat: 'Handlebars com JS'});