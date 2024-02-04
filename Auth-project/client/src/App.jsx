import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import {store,persistor } from "./redux/store.js"
import {Provider} from "react-redux"
import {PersistGate} from "redux-persist/integration/react"

function App() {
  return (
   <Provider store={store}>
    <PersistGate persistor={persistor} loading={null} >
      <div className="px-[100px]">
        <Header />
        <Outlet />
      </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
