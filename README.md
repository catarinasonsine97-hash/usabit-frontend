# Usabit Frontend – Dashboard de Tarefas

Aplicação Frontend desenvolvida em **React (Vite)** para consumo da API do projeto **Usabit API**, permitindo que usuários se registrem, façam login e gerenciem suas próprias tarefas.  
O sistema implementa autenticação via **JWT**, persistência de sessão, componentes reutilizáveis e integração completa com o backend.

---

## Tecnologias Utilizadas

- **React** (com Vite)
- **JavaScript (ES6+)**
- **Context API** (gerenciamento global de autenticação)
- **Fetch API** (requisições HTTP)
- **LocalStorage** (persistência de sessão)
- **Hooks (useState, useEffect, useContext)**

---

## Estrutura do Projeto

```bash
usabit-frontend/
  src/
    main.jsx
    App.jsx
    api.js
    context/
      AuthContext.jsx
    pages/
      LoginPage.jsx
      DashboardPage.jsx
    components/
      TaskForm.jsx
      TaskList.jsx
  index.html
  package.json
  vite.config.js
