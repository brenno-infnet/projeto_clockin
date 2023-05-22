# Projeto ClockIn - Backend com Express Node.JS [Projeto em desenvolvimento]

## Sobre
Projeto desenvolvido por [Brenno Fernandes](https://github.com/tecbrenno) para a disciplina Backend com Express Node.JS.
A proposta do projeto é uma aplicação para registro de ponto.

O colaborador se cadastrará na aplicação (Employee) informando [cpf, nome, email] , cadastrará a empresa (comapny) informando [cnpj, nome_da_empresa]. Será necessário registrar sua jornada de trabalho (workday) vínculando [cpf, cnpj] como chaves, além do horário de entrada e horário de saída.Após a realização dos cadastros, será possível registrar o ponto (clock), onde será infomado o ID do registro do workday e setado o horário/data de registro.

## Quem pode utiliza
Projeto Público, disponível para contribuição de todos.

## Utilização
Para utilização utilize o arquivo de [rotas do postman](https://github.com/brenno-infnet/projeto_clockin/blob/master/postman/ClockIn.postman_collection.json)

## Descrição das Rotas

### Employee

#### [Get] employee -> Lista todos os colaboradores cadastrados (127.0.0.1:3333/employees)
#### [Get] employee/cpf -> Exibe detalhes de um único colaborador (127.0.0.1:3333/employees/:cpf)
#### [Post] employee/add -> Cria um novo colaborador através de um payload json (127.0.0.1:3333/employees/add)
#### [Put] employee/cpf -> Atualiza os dados de um colaborador através de um payload json e uma chave CPF (127.0.0.1:3333/employees/:cpf)
#### [Delete] employee/cpf -> Remove um colaborador através de uma chave CPF (127.0.0.1:3333/employees/:cpf)
