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

axios.get('https://gateway.marvel.com:443/v1/public/comics?apikey=6d0cf4d29f7366f7f15d8f9aa401bfe9')
.then(function(response){
  const x = response.data.data;
  contentInject.innerHTML = compiledTemplate({x});
});
