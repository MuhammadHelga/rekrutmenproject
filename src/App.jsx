import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import FormPages from "./pages/FormPages";
import VerifyTokenPage from "./pages/VerifyTokenPage";
import ChatInterview from './pages/ChatInterview'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <FormPages/> } />
        <Route path="/verify-token" element={ <VerifyTokenPage/> } />
        <Route path="/wawancara" element={ <ChatInterview/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
