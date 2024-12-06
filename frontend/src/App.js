import { Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import CreateTask from "./components/CreateTask";
import ViewTasks from "./components/ViewTasks";
import EditTask from "./components/EditTask";

function App() {
  return (
   <>
   <Routes>
    <Route  path="/" element={<Register/>} />
    <Route path="/Login" element={<Login/>} />
    <Route path="/Task" element={<CreateTask/>} />
    <Route path="/ViewTask" element={<ViewTasks/>} /> 
    <Route path="/EditTask/:taskId" element={<EditTask/>} />
   </Routes>
   </>
  );
}

export default App;
