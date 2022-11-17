import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader'
import { TinyUrlApp } from './pages/TinyUrlApp'

export const App = () => {
  return (
    <div className="App">
      <AppHeader />
      <main className="container ">
        <Routes>
          <Route path="/tinyurl" element={<TinyUrlApp />} />
          <Route path="/" element={<Navigate to="/tinyurl" />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
