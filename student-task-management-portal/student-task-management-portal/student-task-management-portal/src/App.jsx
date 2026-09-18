import "./App.css";
import Navbar from "./components/Navbar";
import Welcome from "./components/welcome";
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