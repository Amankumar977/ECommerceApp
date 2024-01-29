import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, SingupPage } from "./Routes";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sing-up" element={<SingupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
