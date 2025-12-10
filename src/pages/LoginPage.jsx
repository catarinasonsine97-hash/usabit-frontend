import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { login, register } from "../api";

function LoginPage() {
  const { setUser, setToken } = useAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      if (mode === "register") {
        await register(form.name, form.email, form.password);
      }

      const data = await login(form.email, form.password);
      setUser(data.user);
      setToken(data.token);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <div style={{ background: "#fff", padding: 24, borderRadius: 8, width: 320, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ marginBottom: 16 }}>
          {mode === "login" ? "Login" : "Cadastro"}
        </h2>

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <div style={{ marginBottom: 12 }}>
              <label>Nome</label>
              <input
                name="name"
                type="text"
                onChange={handleChange}
                value={form.name}
                required
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              />
            </div>
          )}

          <div style={{ marginBottom: 12 }}>
            <label>E-mail</label>
            <input
              name="email"
              type="email"
              onChange={handleChange}
              value={form.email}
              required
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label>Senha</label>
            <input
              name="password"
              type="password"
              onChange={handleChange}
              value={form.password}
              required
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </div>

          {error && (
            <p style={{ color: "red", marginBottom: 12 }}>{error}</p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: 10,
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 4,
              cursor: "pointer"
            }}
          >
            {mode === "login" ? "Entrar" : "Cadastrar e entrar"}
          </button>
        </form>

        <button
          style={{
            marginTop: 12,
            width: "100%",
            padding: 8,
            border: "none",
            background: "transparent",
            color: "#2563eb",
            cursor: "pointer"
          }}
          type="button"
          onClick={() =>
            setMode((prev) => (prev === "login" ? "register" : "login"))
          }
        >
          {mode === "login"
            ? "Não tem conta? Cadastre-se"
            : "Já tem conta? Fazer login"}
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
