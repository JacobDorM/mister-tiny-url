import { useForm } from '../customHooks/useForm'
import { utilService } from '../services/utilService.js'
import { useSelector, useDispatch } from 'react-redux'
import { saveUrl } from '../store/actions/urlActions'
import { useEffect } from 'react'
import { loadUrls, setUrl } from '../store/actions/urlActions'

export const TinyUrlApp = () => {
  const { url } = useSelector((state) => state.urlModule)

  const dispatch = useDispatch()

  const [localUrl, handleChange, setLocalUrl] = useForm({ longUrl: '' }, () => {
    console.log(localUrl)
  })

  useEffect(() => {
    dispatch(loadUrls())
  }, [dispatch])

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
        {url && url.pointer ? (
          <div>
            <div>
              <label htmlFor="longtUrl">Your Long URL</label>
              <input defaultValue={url.longUrl} type="text" id="longtUrl" />
            </div>
            <div>
              <label htmlFor="shortUrl">TinyUrl</label>
              <input defaultValue={url.shortUrl} type="text" id="shortUrl" />
            </div>
            <button> Shorten another</button>
          </div>
        ) : (
          <div>
            <label htmlFor="longUrl">Enter a long URL to make a TinyUrl</label>
            <input value={localUrl.longUrl} type="text" onChange={handleChange} name="longUrl" id="longUrl" />
            <button>Make TinyUrl!</button>
          </div>
        )}
      </form>
    </div>
  )
}
