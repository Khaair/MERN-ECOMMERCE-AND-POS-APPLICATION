import "./App.css";
import { Provider } from "react-redux";
import reduxStore from "./store/store";
import MainRoutes from "./routes";

const store = reduxStore.store;

function App() {
  return (
    <>
      <Provider store={store}>
      <MainRoutes/>
      </Provider>
    </>
  );
}

export default App;


