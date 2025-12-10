import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

function App() {
  const { user } = useAuth();

  return (
    <div style={{ fontFamily: "sans-serif", minHeight: "100vh", background: "#f5f5f5" }}>
      {user ? <DashboardPage /> : <LoginPage />}
    </div>
  );
}

export default App;
