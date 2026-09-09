import "./App.css";
import Navbar from "./components/Navbar";
import Statcard from "./components/Statcard";
import Welcome from "./components/welcome";
import Taskcard from "./components/Taskcard";
import Dashboard from "./components/Dashborad";

function App() {
  return (
    <div>
      <Navbar />
      <Welcome/>
      <Dashboard/>
  
    </div>
  );
}
export default App;