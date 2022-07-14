import { useAuth } from "./hooks/useAuth";
import { AuthenticatedApp } from "./components/AuthenticatedApp";
import { UnauthenticatedApp } from "./components/UnauthenticatedApp";
import "./App.css";
const App = () => {
  const { user } = useAuth();

  return (
    <div className="container">
      <h1>💬 My chat</h1>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
};

export default App;
