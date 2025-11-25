import { Link, useLocation } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-brand">
          <Link to="/">Series Journal</Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Página Inicial
            </Link>
          </li>
          <li>
            <Link 
              to="/sobre" 
              className={location.pathname === '/sobre' ? 'active' : ''}
            >
              Sobre
            </Link>
          </li>
          <li>
            <Link 
              to="/cadastrar" 
              className={location.pathname === '/cadastrar' ? 'active' : ''}
            >
              Cadastrar Séries
            </Link>
          </li>
          <li>
            <Link 
              to="/listar" 
              className={location.pathname === '/listar' ? 'active' : ''}
            >
              Lista de Séries
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar