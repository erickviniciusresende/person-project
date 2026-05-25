# Person CRUD System

## Objetivo

Projeto desenvolvido totalmente por mim, sem seguir tutoriais, com o objetivo de evoluir continuamente um sistema CRUD simples e transformá-lo em uma aplicação cada vez mais completa, utilizando boas práticas de desenvolvimento backend e frontend.

O foco principal do projeto é praticar conceitos reais utilizados no desenvolvimento de aplicações web com Java e Spring Boot, além de entender profundamente a comunicação entre frontend, backend e banco de dados.

---

## Tecnologias Utilizadas

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Hibernate
* Lombok

### Banco de Dados

* MySQL
* DBeaver

### Frontend

* HTML
* CSS
* JavaScript
* Fetch API

---

## Funcionalidades

* Cadastro de pessoas
* Listagem de pessoas
* Busca de pessoa por ID
* Atualização de pessoas
* Remoção de pessoas
* Validação de dados no frontend
* Validação de dados no backend
* Tratamento global de exceções
* Comunicação frontend/backend utilizando requisições HTTP e JSON

---

## Estrutura do Projeto

O sistema foi organizado seguindo separação de responsabilidades:

```text
Controller
↓
Service
↓
Repository
↓
Banco de Dados
```

### Controller

Responsável por:

* receber requisições HTTP
* retornar respostas HTTP adequadas
* encaminhar regras de negócio para a camada Service

### Service

Responsável por:

* centralizar regras de negócio
* manipular lógica da aplicação
* intermediar acesso ao Repository

### Repository

Responsável por:

* acesso ao banco de dados utilizando Spring Data JPA

---

## Implementações Realizadas

### Model Person

Criação da entidade `Person` contendo:

* id
* name
* city

Utilizando:

* `@Entity`
* Spring Data JPA
* Lombok para geração automática de getters e setters

---

### Repository

Criação da interface `PersonRepository` extendendo `CrudRepository` para utilização de métodos prontos de persistência no banco de dados.

---

### Frontend

Criação de uma interface simples utilizando:

* HTML
* CSS
* JavaScript puro

Funcionalidades implementadas:

* listagem dinâmica de pessoas
* seleção de pessoa ao clicar na lista
* cadastro
* atualização
* remoção
* integração com backend utilizando `fetch`

---

### Validações

#### Frontend

Validações implementadas:

* campos obrigatórios
* tamanho mínimo
* tamanho máximo
* remoção de espaços vazios utilizando `trim()`

#### Backend

Validações utilizando:

* `@Valid`
* `@NotBlank`
* `@Size`

Foi mantida dupla validação:

* frontend para melhorar experiência do usuário
* backend para garantir segurança e integridade dos dados

---

### Service Layer

Criação da classe `PersonService` para separar regras de negócio da camada Controller.

---

### Respostas HTTP

Implementação de respostas HTTP adequadas utilizando `ResponseEntity`.

Exemplos:

* `201 CREATED`
* `200 OK`
* `204 NO CONTENT`

---

### Tratamento Global de Exceções

Criação da classe `GlobalExceptionHandler` utilizando:

* `@ControllerAdvice`

Tratamentos implementados:

* `RuntimeException`
* `MethodArgumentNotValidException`
* `Exception` genérica

---

### Customização de Erros de Validação

Criação da classe `ErrorResponse` para retornar mensagens de erro em formato JSON personalizado.

Isso permite retornar ao frontend mensagens específicas definidas diretamente nas validações da entidade.

---

## Aprendizados Praticados

Durante o desenvolvimento do projeto foram praticados conceitos como:

* arquitetura em camadas
* REST API
* requisições HTTP
* status HTTP
* comunicação frontend/backend
* serialização JSON
* validação de dados
* tratamento de exceções
* organização de código
* separação de responsabilidades
* integração com banco de dados

---

## Melhorias Futuras

* Implementação de DTO
* Busca de pessoas por nome
* Paginação
* Login e autenticação
* Spring Security
* Upload de imagem
* Deploy da aplicação
* Melhorias visuais no frontend
* Refatoração para utilização de React no frontend

---