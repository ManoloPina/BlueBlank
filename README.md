# BlueBlank

Instalação
----------
1. Inicialmente é necessário instalar todas as dependências do projeto através do comando: `npm install`
2. Após todas as dependências terem sido instaladas é necessário inserir as dependências no client-side através do comando: `gulp dependencies`
3. Utilizar o comando: `gulp webpack` para gerar as dependências javascript compiladas
4. Para a geração do banco em mongo e suas collections com seeds, é necessário usar o comando: `node ./seeds/run.js`, Isso irá gerar usuários randomicos na collection de contas
5. Por vim o webservice deve ser acionado através do comando: `node ./app/Server.js`, O teste pode ser visualidado em **http://localhost:3000**
6. Para passar a authentificação as contas devem ser visualizadas diretamente no banco.
