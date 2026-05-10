# Pokédex React + TypeScript

Aplicação web desenvolvida com React, TypeScript e PokéAPI, permitindo autenticação de usuários, visualização de Pokémons, gerenciamento de time personalizado e favoritos.

---

# 🚀 Tecnologias utilizadas

* React
* TypeScript
* Vite
* React Router DOM
* Context API
* Axios
* LocalStorage
* PokéAPI

---

# 📦 Funcionalidades

## 🔐 Autenticação

* Cadastro de usuário
* Login
* Logout
* Persistência de sessão
* Rotas privadas

---

## 📖 Pokédex

* Listagem de Pokémons
* Busca por nome
* Paginação
* Ordenação:

  * A-Z
  * Z-A
  * Número crescente
  * Número decrescente
* Visualização de detalhes em modal
* Sistema de favoritos
* Responsividade

---

## ⚔️ Meu Time Pokémon

* Adicionar Pokémons ao time
* Limite de 6 Pokémons
* Remover Pokémons
* Editar apelido
* Adicionar anotações
* Persistência com LocalStorage

---

## ⚠️ Tratamento de erros

* Tratamento de falha da API
* Mensagens amigáveis para o usuário
* Loading durante requisições

---

# 🖥️ Como rodar o projeto

## Instalar dependências

```bash
npm install
```

## Rodar o projeto

```bash
npm run dev
```

---

# 🌐 API utilizada

PokéAPI:

[https://pokeapi.co/](https://pokeapi.co/)

---

# 📁 Estrutura do projeto

```txt
src/
├── app/
│   ├── components/
│   ├── contexts/
│   ├── router/
│   └── services/
│
├── pages/
│   ├── Login/
│   ├── Register/
│   ├── Pokedex/
│   └── Team/
```

---

# 💾 Persistência de dados

O projeto utiliza LocalStorage para:

* Sessão do usuário
* Time Pokémon
* Favoritos

---

# 🎨 Diferenciais implementados

* Modal detalhado dos Pokémons
* Sistema de favoritos
* Cards responsivos
* Barra de loading animada
* Ordenação dinâmica
* Interface moderna
* Feedback visual

---

# 🔮 Melhorias futuras

* Dark mode
* Infinite scroll
* Toast notifications
* Página exclusiva de favoritos
* Comparação entre Pokémons
* Evoluções
* Integração com backend real

---

# 👨‍💻 Desenvolvedor

Desenvolvido por Leandro.
