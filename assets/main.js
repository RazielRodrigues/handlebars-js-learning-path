$( document ).ready(function() {
    var info = document.getElementById('teste-template').innerHTML;
    console.log(info);
    var compiled = Handlebars.compile(info);
    // document.getElementById('#content').innerHTML = compiled({doesWhat: 'fodac'});    
    $('#content').html(compiled({doesWhat: 'ok com o jequery funciona ne?'}));
});