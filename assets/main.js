$(document).ready(function() {
  const template = $('#handlebars-template').html();
  const compiledTemplate = Handlebars.compile(template);
  $.ajax("data/profiles.json").done(function(data) {
    $('#content-inject').html(compiledTemplate(data));
  });
});

//TODO: DISCOVER WHY IS NOT WORKING WITH PURE JS
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