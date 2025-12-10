const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  if (!res.ok) {
    throw new Error("Credenciais inválidas");
  }

  return res.json();
}

export async function register(name, email, password) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  if (!res.ok) {
    throw new Error("Erro ao registrar usuário");
  }

  return res.json();
}

export async function getTasks(token) {
  const res = await fetch(`${API_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Erro ao listar tarefas");
  return res.json();
}

export async function createTask(token, task) {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(task)
  });
  if (!res.ok) throw new Error("Erro ao criar tarefa");
  return res.json();
}

export async function updateTask(token, id, task) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(task)
  });
  if (!res.ok) throw new Error("Erro ao atualizar tarefa");
  return res.json();
}

export async function deleteTaskApi(token, id) {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error("Erro ao remover tarefa");
}
