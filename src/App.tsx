import { Navigate, Route, Routes as Switch } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import { Routes } from "./config";

function App() {

  return (
    <div className="App">
      <Switch>
        <Route path={Routes.Login} element={<Login />} />
        <Route path="*" element={<Navigate to={Routes.Login} replace />} />
      </Switch>
    </div>
  );
}

export default App;
