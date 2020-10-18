//TODO: NEED TO PRETTIFY THIS CODE
$(document).ready(function() {

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD7aufFH_9g9Yebs3voDl8rBFNtC7tqSzg",
  authDomain: "sandbox-rz.firebaseapp.com",
  databaseURL: "https://sandbox-rz.firebaseio.com",
  projectId: "sandbox-rz",
  storageBucket: "sandbox-rz.appspot.com",
  messagingSenderId: "980484561616",
  appId: "1:980484561616:web:e72ed3f1c5a7927298dcd5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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

  Handlebars.registerHelper("makeBold", function(parametro){
    return new Handlebars.SafeString("<strong>"+parametro+"</strong>");
  });


  Handlebars.registerHelper("makeTitle", function(options){
    return new Handlebars.SafeString("<h5>"+options.fn(this)+"</h5>");
  });

  const template = $('#handlebars-template').html();
  
  const compiledTemplate = Handlebars.compile(template);

  $.ajax("detailpartial.html").done(function(partial) {
    $("body").append(partial);
    Handlebars.registerPartial("AddressPartial", $("#details-partial").html());
  });

  $.ajax("data/profiles.json").done(function(data) {

    //TODO: THINK IN A BEST WAY TO DO THAT
    // if ($("body").hasClass("profile-details")) {
    //   var profileID = getUrlParameter("id");
    //   $('#content-inject').html(compiledTemplate(data.Users[profileID]));
    // }else{
    //   $('#content-inject').html(compiledTemplate(data));
    // }


    var db = firebase.database().ref();
    if ($("body").hasClass("profile-details")) {
      // var profileID = getUrlParameter("id");
      // $('#content-inject').html(compiledTemplate(data.Users[profileID]));
    }else{
      dbRef.on('value', function(snap){
        $('#content-inject').html(compiledTemplate(snap.val()));
      });
    }

  });




  //TODO: CREATE A BIOGRAPHY HIDE/CLOSE
  $(document).on("click", ".actions", function(e){
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