# Projeto ClockIn - Backend com Express Node.JS

## Sobre
API para registro de ponto, sem utilização de banco de dados, desenvolvida por [Brenno Fernandes](https://github.com/tecbrenno) para a disciplina Backend com Express Node.JS. 

## Como funciona
O colaborador se cadastrará na aplicação (Employee) informando cpf, nome e email, cadastrará a empresa (comapny) informando cnpj e nome_da_empresa. Será necessário registrar sua jornada de trabalho (workday) vínculando um cpf e cnpj previamente cadastrados, além do horário de entrada e horário de saída. Após a realização dos cadastros, será possível registrar o ponto (clock), onde será infomado o ID do registro do workday e setado o horário/data de registro.

## Utilização
Utilize o arquivo de [rotas do postman](https://github.com/brenno-infnet/projeto_clockin/blob/master/postman/ClockIn.postman_collection.json)

## Descrição das Rotas

1. Employee

* **[Get]** employee/ Lista todos os colaboradores cadastrados
* **[Get]** employee/:cpf -> Exibe detalhes de um único colaborador
* **[Post]** employee/add -> Cria um novo colaborador através de um payload json
* **[Put]** employee/:cpf -> Atualiza os dados de um colaborador através de um payload json e uma chave CPF
* **[Delete]** employee/:cpf -> Remove um colaborador através de uma chave CPF

2. Company

* **[Get]** company/ Lista todos as empresas cadastrados
* **[Get]** company/:cnpj -> Exibe detalhes de uma única empresa colaborador
* **[Post]** company/add -> Cria uma nova empresa através de um payload json
* **[Put]** company/:cnpj -> Atualiza os dados de uma empresa através de um payload json e uma chave CNPJ
* **[Delete]** company/:cnpj -> Remove uma empresa através de uma chave CNPJ

3. Workday

* **[Get]** workday/ Lista todas jornadas de trabalho cadastradas
* **[Get]** workday/:id -> Exibe detalhes de uma única jornada
* **[Post]** workday/add -> Cria uma nova joranda de trabalho através de um payload json
* **[Put]** workday/:id -> Atualiza uma jornada de trabalho através de um payload json e um ID
* **[Delete]** workday/:id -> Remove uma joranada de trabalho através de um ID

3. Workday

* **[Get]** workday/ Lista todas jornadas de trabalho cadastradas
* **[Get]** workday/:id -> Exibe detalhes de uma única jornada
* **[Post]** workday/add -> Cria uma nova joranda de trabalho através de um payload json
* **[Put]** workday/:id -> Atualiza uma jornada de trabalho através de um payload json e um ID
* **[Delete]** workday/:id -> Remove uma joranada de trabalho através de um ID

4. Workday

* **[Get]** clock/ Lista todas os registros de ponto cadastrados
* **[Get]** clock/:id -> Exibe detalhes de registro de ponto através de um ID
* **[Post]** clock/add -> Cadastra um novo registro de ponto através de um payload json
* **[Put]** clock/:id -> Atualiza um registro de ponto através de um payload json e um ID
* **[Delete]** clock/:id -> Remove um registro de ponto através de um ID


## Mais...
Projeto em desenvolvimento. Futuramente será desenvolvido o frontend para integração a API.
