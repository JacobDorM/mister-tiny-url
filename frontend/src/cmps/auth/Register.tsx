import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../store/actions/authActions'
import { useAuth, useAppDispatch } from '../../customHooks'

export const Register: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { authInputAtr, userCred, setUserCred } = useAuth()

  const back = () => {
    navigate('/tinyurl')
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(signup(userCred))
    setUserCred({ _id: '', name: '', email: '', password: '', msgs: [] })
    navigate('/tinyurl/login')
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
              <div className="modal__head-txt">Welcome to TinyURL</div>
            </div>
            <form className="text-muted" onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="label-fancy">
                  Name
                </label>
                <input {...authInputAtr('name')} type="text" className="form-control form-control-bold" autoComplete="username" />
                <div role="alert" className="form-error mb-05r mt-05r"></div>
              </div>
              <div className="form-group">
                <label htmlFor="email" className="label-fancy">
                  E-Mail Adress
                </label>
                <input {...authInputAtr('email')} type="text" className="form-control form-control-bold" autoComplete="email" />
                <div role="alert" className="form-error mb-05r mt-05r"></div>
              </div>
              <div className="form-group">
                <label htmlFor="password" className="label-fancy">
                  Password
                </label>
                <input {...authInputAtr('password')} type="password" className="form-control form-control-bold" autoComplete="new-password" />
                <div role="alert" className="form-error mb-05r mt-05r"></div>
              </div>
              <div className="form-group">
                <button type="submit" className="text-capitalize btn-login btn-block btn-t-blue">
                  <i className="link link-login"></i>
                  <span className="pl-1r">Create an account</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
