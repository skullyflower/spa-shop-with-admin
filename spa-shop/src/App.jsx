import SiteRoutes from "./shared/navigation/routes";
import AppContextProvider from "./shared/layout/app-context-wrapper";

import "./AppLayout.css";
import "./AppTheme.css";

function App() {
  return (
    <AppContextProvider>
      <SiteRoutes />
    </AppContextProvider>
  );
}

export default App;
