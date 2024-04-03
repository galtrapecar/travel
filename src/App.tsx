import { Navigate, Route, Routes as Switch } from "react-router-dom";
import { Routes } from "./config";
import Explore from "./pages/Explore/Explore";

function App() {

  return (
    <div className="App">
      <Switch>
        {/* <Route path={Routes.Login} element={<Login />} /> */}
        <Route path={Routes.Explore} element={<Explore />} />
        <Route path="*" element={<Navigate to={Routes.Explore} replace />} />
      </Switch>
    </div>
  );
}

export default App;
