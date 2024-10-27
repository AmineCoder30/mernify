import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Connect, ChatPage } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
function App() {
  return (
    <div className="relative">
      <ToastContainer />
      <BrowserRouter>
        <div>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/auth" element={<Connect />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
