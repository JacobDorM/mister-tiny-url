import { AppHeader } from './cmps/AppHeader'
import { TinyUrlApp } from './pages/TinyUrlApp'

export const App = () => {
  return (
    <div className="App">
      <AppHeader />
      <main className="container ">
        <TinyUrlApp />
      </main>
    </div>
  )
}

export default App
