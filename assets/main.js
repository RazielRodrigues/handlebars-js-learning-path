$(document).ready(function() {
    const template = $('#handlebars-template').html();
    const compiledTemplate = Handlebars.compile(template);
    $('#content-inject').html(compiledTemplate({
        doesWhat: 'Handlebars com JQUERY'
    }));
});

const template = document.getElementById('handlebars-template').innerHTML;
const compiledTemplate = Handlebars.compile(template);
const contentInject = document.getElementById('content-inject');
contentInject.innerHTML = compiledTemplate({
    doesWhat: 'Handlebars com JS'
});