import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Graph from "./pages/Graph";
import Layout from "./components/Layout";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    setLoading(true);
    const url = "https://erp.seopage1.net/api/leads";
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error! Response status: ${response?.status}`);
      }
      const { data } = await response.json();
      setTasks(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-300 h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home loading={loading} tasks={tasks} />} />{" "}
            {/* Home page */}
            <Route
              path="graph"
              element={<Graph loading={loading} tasks={tasks} />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
