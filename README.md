# HANDLEBARS JS: LEARNING PATH

O handlebars é uma biblioteca Javascript que compila templates HTML,
com base em dados JSON, fazendo então um "espelhamento" dos dados JSON no HTML,
tudo isso com base na chamada das chaves dos dados JSON.

https://handlebarsjs.com/

## Começando com o Handlebars

1. Instalar Handlebars
    - CDN: https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.6/handlebars.min.js

2. Primeiro devemos definir a tag de template no HTML
    - essa tag deve ter um type="" diferente como: x-template-handlebars
    - essa tag tem que ter um ID

            <script id="handlebars-template" type="text/x-handlebars-template">
                //Aqui dentro vai o código do template
                {{HelloWorld}}
            </script>

3. Depois devemos definir a tag que ira ser injetado o conteudo
        
            <main id="content-inject"></main>

4. Em seguida, devemos criar a função de renderização do template

            //1. Pegamos o conteúdo do template que se encontra na tag script do handlebars
            const template = document.getElementById('handlebars-template').innerHTML;

            //2. Em seguida, chamamos a função compiladora do HB
            //que vai interpretar as tags que escrevemos como a {{HelloWorld}}
            const compiledTemplate = Handlebars.compile(template);

            //3. Após isso, pegamos a variavel que vamos injetar o template compilado
            const contentInject = document.getElementById('content-inject');

            /*
            4. Por fim, injetamos nela os dados para aparecerem no template
               perceba que chamamos novamente a variavel 'compiledTemplate'
               pois agora ela é a função que contém o conteudo do template
               o que acontece agora é basicamente um espelho dos dados JSON
               ou seja o campo que tiver aqui ou o array que tiver aqui
               vao ser "chamados" dentro do template, e assim irá refletir
               os valores desses campos JSON no nosso HTML.
            */
            contentInject.innerHTML = compiledTemplate({
                HelloWorld: 'Hello World!'
            });

Por fim o nosso HTML ficará algo como:

            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>HANDLEBARS LEARNING PATH</title>
            </head>
            <body>
                <main id="content-inject"></main>
                


                <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.6/handlebars.min.js"></script>
                <script id="handlebars-template" type="text/x-handlebars-template">
                <h1>{{HelloWorld}}</h1>
                </script>

                <script>
                    const template = document.getElementById('handlebars-template').innerHTML;
                    const compiledTemplate = Handlebars.compile(template);
                    const contentInject = document.getElementById('content-inject');
                    contentInject.innerHTML = compiledTemplate({
                        HelloWorld: 'Hello World!'
                    });
                </script>
            </body>
            </html>

## Criando templates com dados JSON e EACH helper

Dentro da função de compilação passar os dados em JSON que podem ser também a resposta de uma API JSON,
por enquanto vamos ver com os dados de um array:

        contentInject.innerHTML = compiledTemplate({
        Users: [
            {
            "id": 1,
            "name": "Leanne Graham",
            "username": "Bret",
            "email": "Sincere@april.biz",
            "address": {
                "street": "Kulas Light",
                "suite": "Apt. 556",
                "city": "Gwenborough",
                "zipcode": "92998-3874",
                "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
                }
            },
            "phone": "1-770-736-8031 x56442",
            "website": "hildegard.org",
            "company": {
                "name": "Romaguera-Crona",
                "catchPhrase": "Multi-layered client-server neural-net",
                "bs": "harness real-time e-markets"
            }
            }
        ]
        });

Dessa forma conseguimos acessar os dados do JSON por níveis, usando o helper {{each NomeObjeto}} {{#each}}

    <script id="handlebars-template" type="text/x-handlebars-template">
      <ul>
        {{#each Users}}
          <li>{{id}}</li>
          <li>{{name}}</li>
        {{/each}}
      </ul>
    </script>

A tag de template fica dessa forma assim conseguimos acessar o primeiro nivel do array, para acessar outros niveis do array
podemos usar:

        {{#each Users}}
          {{address.street}}
        {{/each}}

ou

        {{#each Users}}
            {{address / street}}
        {{/each}}

ou

        {{#each Users}}
            {{#with address}}
                {{street}}
            {{/with}}
        {{/each}}

para subir um contexto usamos:

        {{#each Users}}
            {{#with company}}
                //pega o nome da companhia
                <li>{{name}}</li>
                //pega o nome do cliente no contexto acima
                <li>{{../name}}</li>
            {{/with}}
        {{/each}}

## Operadores lógicos

O if no handlebars verifica se propriedade tem algum valor, se retornar false, não exibe aquilo
podendo ser encadeado com else if e tambem com else, ficando algo como:

            {{#if image}}
                <img src="{{image}}" class="card-img-top" alt="{{name}}" title="{{name}}">
            {{else}}
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png" class="card-img-top" alt="{{name}}" title="{{name}}">
            {{/if}}



            {{#if email}}
                <p class="card-text">
                email: {{email}}
                </p>
            {{else if username}}
                <p class="card-text">
                username: {{username}}
                </p>
            {{else}}
                <p class="card-text">
                No information!
                </p>
            {{/if}}

## RENDERIZANDO TEMPLATE COM DADOS JSON EXTERNOS USANDO JQUERY

            $(document).ready(function() {
            const template = $('#handlebars-template').html();
            const compiledTemplate = Handlebars.compile(template);
            $.ajax("data/profiles.json").done(function(data) {
                $('#content-inject').html(compiledTemplate(data));
            });
            });

## HELPERS: FUNÇÕES DE AJUDAS

Com os helpers podemos registrar nossos proprios blocos {{CapitalizarLetra 'parametro'}} que nos ajudam a formatar os textos ou outras coisas.

Para usar um helper primeiro devemos registrar ele:

            //TIPO 1: Esse helper ele pega apenas um dado age como {{#if}}
            Handlebars.registerHelper("makeBold", function(parametro){
                return new Handlebars.SafeString("<strong>"+parametro+"</strong>");
            });

            //NO HTML:
            street: {{makeBold street}}

            //TIPO 2: Esse helper ele age como os bloc {{#each}} {{#with}}
            Handlebars.registerHelper("makeTitle", function(options){
                return new Handlebars.SafeString("<h5>"+options.fn(this)+"</h5>");
            });

            //NO HTML:
            street: {{makeBold street}}
            {{#makeTitle}}
                zipcode: {{zipcode}}
            {{/makeTitle}}

## DELEGAÇÃO DE EVENTOS NOS ELEMENTOS DO TEMPLATE

Como o template é renderizado depois da pagina os objetos nao são identificados pelo dom, para isso precisamos
criar uma função que busque pelos elementos HTML pós renderização e assim poder capturar os eventos:

            //IF CLICK IN BUTTON YOU CAN HANDLE THE EVENT.
            $(document).on("click", ".actions", function(e){
                e.preventDefault();
                console.log("click");
            });


## ESCOLHENDO UM DADO ESPECIFICIO NA ESTRUTURA

Para escolher um dado especidifico na estrutura vamos passar o indice do array clicado via parametro GET
depois vamos procurar na URL o valor do ID que foi enviado e assim renderizar em outra página apenas o dado especifico.

1. passar dado pelo HTML da pagina INDEX para montar o parametro GET:

        //Dessa forma pega o indice do elemento renderizado começando em 0
        <a href="details.html?id={{@index}}" class="btn btn-primary">

2. Varrer URL:

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

3. O HTML da pagina details nao precisa do EACH ja que vamos exibir o individual, como nos queremos apenas um elemento do array
nos tiramos o each assim nos precisamos passar o indice do array que queremos renderizar então para isso vamos fazer uma verificação, 
caso seja sem a classe details no body exibe a lista de todos se tiver o details exibe so um, e quando achado essa classe passa o ID
da URL como indice do array assim exibindo apenas um perfil na pagina details.

         if ($("body").hasClass("profile-details")) {
           var profileID = getUrlParameter("id");
           $('#content-inject').html(compiledTemplate(data.Users[profileID]));
         }else{
           $('#content-inject').html(compiledTemplate(data));
         }

## HANDLEBARS: PARTIALS

O partials no handlebars consiste em voce separar pequenas partes do codigo e usar elas 
apenas fazendo a referencia de uma tag {{> nomePartials}}

Devemos criar uma nova tag de template o ideal é essa tag de template ficar em um arquivo separado,
pois dai consegue chamar ela mais organizadamente, por exemplo com o PHP se usaria o include com JS vamos fazer
uma chamada AJAX.

1. Criar a tag:

        <script id="details-partial" type="text/x-handlebars-template">
        <div class="card-text">
            {{#with address}}
            street: {{makeBold street}}
            <br>
            suite: {{suite}}
            <br>
            city: {{city}}
            <br>
            {{#makeTitle}}
                zipcode: {{zipcode}}
            {{/makeTitle}}
            {{/with}}
        </div>
        </script>

2. Registrar o Partial:

        Handlebars.registerPartial("AddressPartial", $("#details-partial").html());

3. Fazer a chamada do arquivo que contem o partial:

        /*
            Lembrando que a tag script do partial esta em outro arquivo em outro lugar
            o que vamos fazer é incluir esse arquivo onde queremos usar o Partial,
            após registrar ele no arquivo main.js junto com as outras funções,
            vamos resgatar o arquivo que contém o template partial e embedar ele no body.
            após isso nos fazemos a chamada do partials, onde passamos o nome dele é o nome
            da tag que queremos renderizar (tag do AJAX)
        */
        $.ajax("detailpartial.html").done(function(partial) {
            $("body").append(partial);
            Handlebars.registerPartial("AddressPartial", $("#details-partial").html());
        });

4. Após isso basta chamar o partials com uma tag {{> nomePartials}}

            <script id="handlebars-template" type="text/x-handlebars-template">
                {{#each Users}}
                <div class="card text-center m-1 container" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">{{name}}</h5>

                        {{#if email}}
                        <p class="card-text">
                            email: {{email}}
                        </p>
                        {{else if username}}
                        <p class="card-text">
                            username: {{username}}
                        </p>
                        {{else}}
                        <p class="card-text">
                            No information!
                        </p>
                        {{/if}}
                        //Chamando vai renderizar os dados de endereço
                        {{> AddressPartial}}
                    </div>
                </div>
                {{/each}}
            </script>

Perceba que chamo o partials dentro de outra tag de template esse [e o intuito, reutilizar de forma que 
nao fique muito codigo e tudo bem mais limpos, se tiver um partial em dois lugares, basta editar um arquivo
que ja edita em todos os lugares.