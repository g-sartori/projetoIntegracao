<h1 align="center"> Integração PlugNotas </h1>

<br />

<h2 align="center"> Levantar o Servidor </h2>
  
<p>
    <strong>1 - Configurar variáveis de ambiente:</strong> Renomear o ".env-example" para ".env" e preencher todas as variáveis de ambiente;
</p>
<p>
    <strong>2 - Configurar o git:</strong> Renomear o ".gitignore-example" para ".gitignore";
</p>
<p> 
    <strong>3 - Criar o Banco:</strong> O Makefile irá inicializar o docker já com as variáveis de ambiente carregadas
    <pre><code> make up </code></pre>
</p>
<p> 
    <strong>4 - Iniciar o producer:</strong> Chama o script já requisitando o carregamento das variáveis de ambiente
    <pre><code> yarn dev:producer </code></pre>
    Ao terminar de rodar o script o console deve apresentar:
    <pre>Started server on 0.0.0.0:7070
Database connected as dbuser on 0.0.0.0:27017/projetoIntegracao</pre>
</p>
<p> 
    <strong>5 - Iniciar o consumer: Chama o script já requisitando o carregamento das variáveis de ambiente</strong> 
    <pre><code> yarn dev:consumer</code></pre>
    Ao terminar de rodar o script o console deve apresentar:
    <pre>Database connected as dbuser on 0.0.0.0:27017/projetoIntegracao
DB pronto, iniciando o consumer</pre>
</p>

<br />

<h2 align="center"> Enviar Requisição </h2>

<p> <strong> POST </strong> — http://localhost:7070/cep </p>
<p> <strong> POST </strong> — ${SERVER_HOST}:${SERVER_PORT}/cep </p>
<p>O CEP não pode conter letras ou caracteres especiais, e deve ter exatamente 8 dígitos.</p>
<pre><code>{
    "cep": "xxxxxxxx"
}</code></pre>


<br />

<h2 align="center"> Executar os Testes </h2>

<p><strong> Obs: </strong> Os testes rodam com valor de CEP fixo, portanto sempre que for executá-los novamente é necessário atualizar o data.cep nos testes <strong>"Criar um novo registro de CEP no Banco"(linha 32)</strong> e  <strong>"Encontrar e Retornar um CEP quando já cadastrado"(linha 42)</strong> 
<pre><code> yarn test </code></pre>