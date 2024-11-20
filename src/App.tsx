import { StoreProvider } from "./context/StoreContext";
import Drinks from "./pages/Drinks";
import "./App.css";

function App() {
  return (
    <StoreProvider>
      <Drinks />
    </StoreProvider>
  );
}

export default App;
