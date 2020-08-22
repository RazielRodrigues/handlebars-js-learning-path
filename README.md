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

## Criando templates com dados JSON

Vamos consumir a API da marvel e criar algo com ela usando o HB:
- para usar a API é necessario ter uma conta e uma chave

https://developer.marvel.com/

Vamos usar o AXIOS para fazer as requisições HTTP:

https://github.com/axios/axios

1. Vamos instalar o AXIOS no projeto com a tag

        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

