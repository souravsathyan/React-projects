import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div className="px-[100px]">
        <Header />
        <Outlet />
      </div>
    </>
  );
}

export default App;
