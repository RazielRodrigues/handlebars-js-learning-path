// $(document).ready(function() {
//     const template = $('#handlebars-template').html();
//     const compiledTemplate = Handlebars.compile(template);
//     $('#content-inject').html(compiledTemplate({
//         HelloWorld: 'Hello World!'
//     }));
// });
// const url = 'https://gateway.marvel.com:443/v1/public/comics?apikey=6d0cf4d29f7366f7f15d8f9aa401bfe9';

$(document).ready(function() {
    const template = $('#handlebars-template').html();
    const compiledTemplate = Handlebars.compile(template);
    $.ajax("data/profiles.json").done(function(data) {
      $('#content-inject').html(compiledTemplate(data));
    });
});

// const template = document.getElementById('handlebars-template').innerHTML;
// const compiledTemplate = Handlebars.compile(template);

//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       var data = this.responseText;
//       const contentInject = document.getElementById('content-inject');
//       contentInject.innerHTML = compiledTemplate(data);
//     }
//   };
//   xhttp.open("GET", "data/profiles.json", true);
//   xhttp.send();
