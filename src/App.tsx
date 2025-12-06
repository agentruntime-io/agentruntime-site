import { useEffect } from "react";
import { AppRouter } from "./router/AppRouter";
import "./styles.css";

function App() {
  // Toggle this to "light" when ready; kept internal for now.
  const theme: "dark" | "light" = "dark";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return <AppRouter />;
}

export default App;
