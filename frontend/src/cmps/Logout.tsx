import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/actions/authActions'
import { useAppDispatch } from '../customHooks'

export const Logout: React.FC<{}> = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const back = () => {
    navigate('/tinyurl')
  }

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    dispatch(logout())
    navigate('/tinyurl')
  }

  return (
    <section className="pop h-100 bg-white shadow-lg">
      <div role="document" className="flex column h-100 w-450">
        <div className="border-bottom pb-1r pl-1r pt-1r pr-md-1">
          <div className="flex justify-flex-end">
            <button onClick={back} className="btn btn-outline-dark closePopOver btn-fs">
              <i className="fa-lg"></i>
            </button>
          </div>
        </div>
        <div className="flex-grow-1 overflow-y-a border-bottom">
          <div className="container-fluid pb-1r pt-1r">
            <div className="text-align-center mb-1r">
              <div className="modal__head-logo nav-logo">TinyURL</div>
              <div className="modal__head-txt">GoodBye to TinyURL</div>
            </div>
            <button onClick={onClick} type="submit" className="text-capitalize btn-login btn-block btn-t-blue">
              <i className="link link-login"></i>
              <span className="pl-1r">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
