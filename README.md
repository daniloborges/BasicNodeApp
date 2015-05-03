# BasicNodeApp

Esqueleto básico para criação de aplicativos no Node.JS.
Não depende do grunt, gulp, mimosa, etc. O gerenciamento é feito usando o ```npm run```, com os scripts definidos no package.json

## Como?
Tem o código do app em src - pode programar em es6 e compilar para dist.
Public está mapeada como pasta estática do Express.
Salve os .styl em src/assets/styl.
Gera logs em logs - Dã.

## Comandos

* ```npm run dev``` : gera css, configura o stylus, nodemon e live-reload; abre o browser em http://localhost:3000
* ```npm run watch```: o mesmo, mas não abre o navegador :( 
* ```npm run build```: limpa as pastas, linta, testa e compila o css
* ```npm run clean```: limpa a pasta public/css e public/js
* ```npm run eslint```, ```npm run test```

##### Possível BUG no Windows (Azure)
O app tem alguns pacotes que dependem do glob, como o stylus, mas o glob encontra um erro com diretórios de rede no Windows. 
Até que esse bug seja resolvido não recomendo usar esse modelo no Azure (versão grátis). 
Linux está ok, e Windows sem diretórios de rede também. 
isaacs/node-globe#74 

> tl;dr  
> A versão do stylus usada (^0.51.1) poderá dar problema, você pode usar a ~0.41.3  
> Outros pacotes usados poderão dar erro pois podem depender do glob e será trabalhoso acha-los e troca-los  

##### Versões
Todos os pacotes foram atualizados e possuem versão ^ (x+1.0.0).
Então assim que você baixar pode rodar o ```npm update``` e verificar se ainda funciona,
 caso o contrário desfaça as alterações pelo git :)

