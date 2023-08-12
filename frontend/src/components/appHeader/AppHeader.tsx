import { Link } from 'react-router-dom'
import { Roadmap } from '../Roadmap'

export const AppHeader: React.FC<{}> = () => {
  return (
    <header className="app-header">
      <nav className="header-nav flex">
        <Link to="/#/tinyutl" className="nav-logo">
          TinyURL
        </Link>
        <Roadmap />
      </nav>
    </header>
  )
}
