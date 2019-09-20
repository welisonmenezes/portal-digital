# Para startar um projeto siga os passos abaixo

## Dependências Gerais

### Para rodar a aplicação e seguir os passos abaixo: 

1. Abra a pasta da aplicação no seu Editor (Preferencialmente o Visual Studio Code). A pasta da aplicação é a seguinte:

`web-development/aplication`

2. Certifique-se de ter o python, o Node.js e o Git instalados no seu computador.

- Site do Python: <https://www.python.org/>
- Site do Node.js: <https://nodejs.org/en/>
- Site do Git: <https://git-scm.com/>

As orientações deste documento está levando em consideração apenas usuários Windows.

### Clone este projeto no diretório corrente:

`git clone https://github.com/welisonmenezes/flask-react.git .`

Não se esqueça do ponto após o endereço do repositório remoto.

### Abra o diretório corrente no Visual Studio e abra um terminal.

### Em seguida crie seu ambiente virtual python:

`python -m  venv [your-env-name-here]`

### Ative seu ambiente virtual:

`[your-env-name-here]\Scripts\activate`

### Entre no diretório do backend:

`cd backend`

### Instale as dependências do backend do projeto:

`pip install -r requirements.txt`

### Starte o servidor do backend:

`python -m flask run --reload`

O projeto já está configurado para rodar em modo de desenvolviemnto, assim o comando acima já é suficiente para rodar a aplicação Flask.


### Em um novo terminal navegue até o diretório frontend:

`cd frontend`

Atenção: O diretório frontend menciondao acima é o que se encontra na raíz do projeto.

### Instale as dependências do frontend do projeto:

`npm install`

Demora um pouco até instalar todas as dependências... aguarde.

### Start o servidor do frontend:

`npm start`

Caso haja conflito de porta o react perguntará se você deseja abrir em outra porta. Responda 'y'.

### Build do frontend para o backend:

`npm run buildtoflask`

Se servidor do frontend estiver levantado talvez seja necessário pará-lo com ctrl+c, ou excutar em um outro terminal, mas lembrando de entrar na pasta frontend.



# Demais orientações

O backend e o frontend são servidos por servidores diferentes. O backend é servido pelo servidor do Flask e o frontend é servido pelo servidor do React usando Node.js.

O servidor Flask só servirá a aplicação frontend após o mesmo ser buildado para o backend.

A API do backend que servirá o frontend responde pelo endpoint /api (ex: http://localhost:5000/api/).
