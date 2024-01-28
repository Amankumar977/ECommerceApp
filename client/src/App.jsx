import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./Routes";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
