import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>
      <div className="px-[100px]">
        <Header />
        <Outlet />
        <h1>Footer</h1>
      </div>
    </>
  );
}

export default App;
