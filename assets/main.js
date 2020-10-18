$(document).ready(function() {

  var getUrlParameter = function getUrlParameter(sParam) {
      var sPageURL = window.location.search.substring(1),
          sURLVariables = sPageURL.split('&'),
          sParameterName,
          i;

      for (i = 0; i < sURLVariables.length; i++) {
          sParameterName = sURLVariables[i].split('=');

          if (sParameterName[0] === sParam) {
              return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
          }
      }
  };

  //? HELPERS
  Handlebars.registerHelper("makeBold", function(option){
    return new Handlebars.SafeString("<strong>"+option+"</strong>");
  });
  Handlebars.registerHelper("makeTitle", function(options){
    return new Handlebars.SafeString("<h5>"+options.fn(this)+"</h5>");
  });

  //? MAIN TEMPLATE
  const template = $('#main-template').html();
  const compiledTemplate = Handlebars.compile(template);

  //? PARTIAL REGISTER
  $.ajax("templates/address.html").done(function(partial) {
    $("body").append(partial);
    Handlebars.registerPartial("AddressPartial", $("#address-partial").html());
  });

  //? PICK THE DATA
  $.ajax("data/profiles.json").done(function(data) {

    if ($("body").hasClass("profile-details")) {
      var profileID = getUrlParameter("id");
      console.log(profileID);
      $('#content-inject').html(compiledTemplate(data.Users[profileID]));
    }else{
      $('#content-inject').html(compiledTemplate(data));
    }

  });

  //TODO: CREATE A BIOGRAPHY HIDE/CLOSE
  // $(document).on("click", ".actions", function(e){
  //   e.preventDefault();
  //   console.log("click");
  // });

});