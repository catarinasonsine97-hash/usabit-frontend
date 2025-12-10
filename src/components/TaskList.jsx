function TaskList({ tasks, onUpdateStatus, onDelete }) {
  if (!tasks.length) {
    return <p>Nenhuma tarefa cadastrada ainda.</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{
            background: "#fff",
            padding: 12,
            borderRadius: 6,
            marginBottom: 8,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8
          }}
        >
          <div>
            <strong>{task.title}</strong>
            {task.description && (
              <p style={{ margin: "4px 0" }}>{task.description}</p>
            )}
            <small>Status: {task.status}</small>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() =>
                onUpdateStatus(
                  task.id,
                  task.status === "PENDING" ? "DONE" : "PENDING"
                )
              }
              style={{
                padding: "4px 8px",
                borderRadius: 4,
                border: "none",
                cursor: "pointer",
                background: "#2563eb",
                color: "#fff"
              }}
            >
              {task.status === "PENDING" ? "Concluir" : "Reabrir"}
            </button>
            <button
              onClick={() => onDelete(task.id)}
              style={{
                padding: "4px 8px",
                borderRadius: 4,
                border: "none",
                cursor: "pointer",
                background: "#dc2626",
                color: "#fff"
              }}
            >
              Remover
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
