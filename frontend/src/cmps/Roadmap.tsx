import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../customHooks'

export const Roadmap: React.FC<{}> = () => {
  const { loggedinUser } = useAppSelector((state) => state.authModule)

  let authLink
  if (loggedinUser) {
    authLink = (
      <NavLink to="/tinyurl/logout" className="navigation-link rounded">
        Logout
      </NavLink>
    )
  } else {
    authLink = (
      <div>
        <NavLink to="/tinyurl/register" className="navigation-link rounded">
          Sign Up
        </NavLink>
        <NavLink to="/tinyurl/login" className="navigation-link rounded">
          Sign In
        </NavLink>
      </div>
    )
  }
  return (
    <div className="full-grow ">
      <div className="flex d-n d-md-flex align-center justify-flex-end wrap">
        <div className="flex align-center mx-2 z-15">
          <a className="hw-32p flex align-center justify-center text-white mx-1 rounded-circle bg-t-blue">
            <i className="link link-question text-white"></i>
          </a>
          <div className="hw-32p d-n text-white mx-1 rounded-circle bg-t-blue">
            <div className="position-relative">
              <i></i>
              <span>0</span>
            </div>
          </div>
        </div>
        <div className="z-15">
          <div className="flex align-center bg-t-teal rounded position-relative">
            <NavLink to="/chat" className="navigation-link rounded">
              Chat
            </NavLink>
            <NavLink to="/tinyurl/myurls" className="navigation-link rounded">
              My URLs
            </NavLink>
            <NavLink to="/tinyurl/pricing" className="navigation-link rounded">
              Plans
            </NavLink>
            <NavLink to="/tinyurl/features" className="navigation-link rounded">
              Features
            </NavLink>
            {authLink}
          </div>
          <div className="dropdown position-relative"></div>
        </div>
      </div>
      <div className="justify-flex-end wrap text-align-right flex d-md-none">
        <button className="btn">
          <i className="link link-bars link-lg"></i>
        </button>
      </div>
    </div>
  )
}
