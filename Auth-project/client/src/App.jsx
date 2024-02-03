import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import {store } from "./redux/store.js"
import {Provider} from "react-redux"

function App() {
  return (
   <Provider store={store}>
      <div className="px-[100px]">
        <Header />
        <Outlet />
      </div>
    </Provider>
  );
}

export default App;
