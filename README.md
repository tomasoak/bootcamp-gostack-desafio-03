<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/blob/master/.github/logo.png" width="300px" />
</h1>

<h3 align="center">
  Desafio 2: FastFeet, o início
</h3>

<h3 align="center">
  :warning: Etapa 1/4 do Desafio Final :warning:
</h3>

<blockquote align="center">“Não espere para plantar, apenas tenha paciência para colher”!</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rocketseat/bootcamp-gostack-desafio-02?color=%2304D361">

  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Rocketseat-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/Rocketseat/bootcamp-gostack-desafio-02/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/rocketseat/bootcamp-gostack-desafio-02?style=social">
  </a>
</p>

<p align="center">
  <a href="#rocket-sobre-o-desafio">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-entrega">Entrega</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## :rocket: Sobre o desafio

A aplicação desenvolvida é um app para uma transportadora fictícia, o FastFeet.

Nesse primeiro desafio foram criadas algumas funcionalidades básicas. Esse projeto está sendo desenvolvido aos poucos até o fim da jornada onde será desenvolvida uma aplicação completa envolvendo back-end, front-end e mobile, que será utilizada para a **certificação do bootcamp**.

### ***Pré-requisitos***
O que você precisa ter instalado em sua máquina:

<li>Docker</li>
<li>Node.js</li>
<li>Yarn (Opcional)</li>

### 1. Autenticação

É possível que um usuário se autentique em na aplicação utilizando e-mail e uma senha.

Foi criado um usuário administrador utilizando a funcionalidade de [seeds do sequelize](https://sequelize.org/master/manual/migrations.html#creating-first-seed), essa funcionalidade serve para criar registros na base de dados de forma automatizada.

A autenticação foi feita utilizando JWT.

### 2. Gestão de destinatários

Os destinatários são mantidos (cadastrados/atualizados) na aplicação, e esses têm o campo **nome** do destinatário e campos de endereço: **rua**, **número**, **complemento**, **estado**, **cidade** e **CEP**.

Uma nova tabela no banco de dados chamada `recipients` foi gerada para guardar informações do destinatário.

O cadastro de destinatários só pode ser feito por administradores autenticados na aplicação.

O destinatário não pode se autenticar no sistema, ou seja, não possui senha.

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---

Feito com ♥ by Tomás Carvalho
