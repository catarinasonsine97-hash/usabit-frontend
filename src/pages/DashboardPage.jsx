import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTaskApi
} from "../api";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function DashboardPage() {
  const { user, token, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      setLoading(true);
      const data = await getTasks(token);
      setTasks(data);
    } catch (err) {
      setError("Erro ao carregar tarefas");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleCreate(task) {
    try {
      const newTask = await createTask(token, task);
      setTasks((prev) => [newTask, ...prev]);
    } catch {
      setError("Erro ao criar tarefa");
    }
  }

  async function handleUpdateStatus(id, status) {
    try {
      const existing = tasks.find((t) => t.id === id);
      if (!existing) return;
      const updated = await updateTask(token, id, {
        ...existing,
        status
      });
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updated : t))
      );
    } catch {
      setError("Erro ao atualizar tarefa");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTaskApi(token, id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch {
      setError("Erro ao remover tarefa");
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24
        }}
      >
        <div>
          <h1>Dashboard de Tarefas</h1>
          <p>Olá, {user?.name || user?.email}</p>
        </div>
        <button
          onClick={logout}
          style={{
            padding: "6px 12px",
            border: "none",
            borderRadius: 4,
            background: "#6b7280",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Sair
        </button>
      </header>

      {error && (
        <p style={{ color: "red", marginBottom: 12 }}>{error}</p>
      )}

      <TaskForm onSubmit={handleCreate} />

      {loading ? <p>Carregando...</p> : (
        <TaskList
          tasks={tasks}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default DashboardPage;
