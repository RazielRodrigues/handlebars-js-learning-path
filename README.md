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
          <li>{{address.street}}</li>
        {{/each}}

ou
        {{#each Users}}
          <li>{{address/street}}</li>
        {{/each}}

ou

        {{#each Users}}
            {{#with address}}
                <li>{{street}}</li>
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


<small>
    {
      "id": 1,
      "name": "Leanne Graham", //1. nivel = {{../name}}
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
        "name": "Romaguera-Crona",  //2. nivel = {{name}}
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    },
</small>

## Operadores lógicos e unless


