import { Route, Routes } from "react-router";

import DashboardLayout from "./routes/dashboard/components/layout";
import DashboardDetails from "./routes/dashboard/details";
import DashboardHome from "./routes/dashboard/home";
import Home from "./routes/home";

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="dashboard">
        <Route element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path=":vehicleId" element={<DashboardDetails />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
