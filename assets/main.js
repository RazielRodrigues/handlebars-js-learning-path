// $(document).ready(function() {
//     const template = $('#handlebars-template').html();
//     const compiledTemplate = Handlebars.compile(template);
//     $('#content-inject').html(compiledTemplate({
//         HelloWorld: 'Hello World!'
//     }));
// });

const template = document.getElementById('handlebars-template').innerHTML;
const compiledTemplate = Handlebars.compile(template);
const contentInject = document.getElementById('content-inject');

const url = 'https://gateway.marvel.com:443/v1/public/comics?apikey=6d0cf4d29f7366f7f15d8f9aa401bfe9';


contentInject.innerHTML = compiledTemplate({
  Users: [
    {
      "id": 1,
      "name": "Brian Graham",
      "username": "Brian",
      "email": "Brian@april.biz",
      "image": "https://www.w3schools.com/howto/img_avatar.png",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874"
      }
    },
    {
      "id": 2,
      "name": "Ronald Howell",
      "username": "Ronald",
      "email": "Ronald@melissa.tv",
      "image": "https://www.w3schools.com/howto/img_avatar.png",
      "address": {
        "street": "Victor Plains",
        "suite": "Suite 879",
        "city": "Wisokyburgh",
        "zipcode": "90566-7771"
      }
    }
  ]
});