$(document).ready(function() {

  Handlebars.registerHelper("makeBold", function(parametro){
    return new Handlebars.SafeString("<strong>"+parametro+"</strong>");
  });

  Handlebars.registerHelper("makeTitle", function(options){
    return new Handlebars.SafeString("<h5>"+options.fn(this)+"</h5>");
  });

  const template = $('#handlebars-template').html();
  
  const compiledTemplate = Handlebars.compile(template);
  
  $.ajax("data/profiles.json").done(function(data) {
    $('#content-inject').html(compiledTemplate(data));
  });

  $(document).on("click", ".btn", function(e){
    e.preventDefault();
    console.log("click");
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