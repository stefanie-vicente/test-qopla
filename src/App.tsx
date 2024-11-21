import { StoreProvider } from "./context/StoreContext";
import Menu from "./pages/Menu";
import "./App.css";

function App() {
  return (
    <StoreProvider>
      <Menu />
    </StoreProvider>
  );
}

export default App;
