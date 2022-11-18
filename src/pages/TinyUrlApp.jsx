import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from '../customHooks/useForm'
import { utilService } from '../services/utilService.js'
import { loadUrl, setUrl, saveUrl } from '../store/actions/urlActions'
import { LongUrlInput } from '../cmps/LongUrlInput'
import { ResultInput } from '../cmps/ResultInput'

export const TinyUrlApp = () => {
  const { url } = useSelector((state) => state.urlModule)

  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()

  const [localUrl, handleChange, setLocalUrl] = useForm({ longUrl: '' }, () => {})

  useEffect(() => {
    if (params.id) {
      if (url) {
        if (url.pointer === params.id) {
          window.location.replace(url.longUrl)
        } else {
          setLocalUrl({ longUrl: '' })
          dispatch(setUrl(null))
          navigate('/tinyurl')
        }
      } else dispatch(loadUrl(params.id))
    }
  }, [params.id, url, dispatch, navigate, setLocalUrl])

  const onSubmit = (e) => {
    e.preventDefault()
    if (url) {
      setLocalUrl({ longUrl: '' })
      dispatch(setUrl(null))
    } else !utilService.isValidHttpUrl(localUrl.longUrl) ? console.log('Invalid URl') : dispatch(saveUrl(localUrl))
  }

  return (
    <div className="tinyUrl-app">
      <form onSubmit={onSubmit} className="tinyUrl-form">
        {url && url.pointer ? <ResultInput url={url} /> : <LongUrlInput localUrl={localUrl} onChange={handleChange} />}
      </form>
    </div>
  )
}
