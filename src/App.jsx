import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import NavBar from './NavBar'
import ChatPage from './ChatPage'
import LearnPage from './LearnPage'
import ComparePage from './ComparePage'
import EvaluatePage from './EvaluatePage'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen overflow-hidden">
        <NavBar />
        <div className="flex-1 min-h-0 overflow-y-auto">
          <Routes>
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/evaluate" element={<EvaluatePage />} />
            <Route path="*" element={<Navigate to="/chat" replace />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
