import { AppPage } from "./AppPage";
import { OverlayPage } from "./OverlayPage";

function App() {
  const isOverlay = location.search.includes("overlay");
  return isOverlay ? <OverlayPage /> : <AppPage />;
}

export default App;
