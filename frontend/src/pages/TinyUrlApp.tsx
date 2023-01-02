import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../hooks'
import { useForm } from '../customHooks/useForm'
import { utilService } from '../services/utilService'
import { loadUrl, setUrl, saveUrl } from '../store/actions/urlActions'
import { LongUrlInput } from '../cmps/LongUrlInput'
import { ResultInput } from '../cmps/ResultInput'

export const TinyUrlApp = () => {
  const { url } = useAppSelector((state) => state.urlModule)

  const dispatch = useAppDispatch()
  const params = useParams()
  const navigate = useNavigate()

  const [localUrl, handleChange, setLocalUrl] = useForm({ longUrl: '' }, () => {})

  useEffect(() => {
    if (params.id) {
      if (url) {
        if (url.pointer === params.id && url.longUrl) {
          window.location.replace(url.longUrl)
        } else {
          setLocalUrl({ longUrl: '' })
          dispatch(setUrl(null))
          navigate('/tinyurl')
        }
      } else dispatch(loadUrl(params.id))
    }
  }, [params.id, url, dispatch, navigate, setLocalUrl])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (url) {
      setLocalUrl({ longUrl: '' })
      dispatch(setUrl(null))
    } else !utilService.isValidHttpUrl(localUrl.longUrl) ? console.log('Invalid URl') : dispatch(saveUrl(localUrl))
  }

  return (
    <div className="tinyUrl-app">
      <div className="view">
        <div className="view-top flex space-between">
          <div className="view-left">
            <div className="view-box flex row">
              <div className="view-container">
                <div className="view-card flex column">
                  <div className="card-body">
                    <form onSubmit={onSubmit} className="tinyUrl-form">
                      {url && url.pointer ? <ResultInput url={url} /> : <LongUrlInput localUrl={localUrl} onChange={handleChange} />}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="view-right"></div>
        </div>
      </div>
    </div>
  )
}
