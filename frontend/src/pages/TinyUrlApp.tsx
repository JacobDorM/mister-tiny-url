import { useEffect } from 'react'
import { useParams, useNavigate, Outlet } from 'react-router-dom'
import { useAppSelector, useAppDispatch, useFormInput, useNestedForm } from '../hooks'
// import { utilService } from '../services/utilService'
import { loadUrl, saveUrl, setUrl } from '../store/actions/urlActions'
import { LongUrlInput } from '../components/LongUrlInput'
import { ResultInput } from '../components/ResultInput'
import { utilService } from '../services/utilService'
import { captureException } from '@sentry/react'
// import { utilService } from '../services/utilService'
// import { LogLevel, LoggerService } from '../services/loggerServiceClass'
// import { LogLevel, log } from '../services/loggerService'

export const TinyUrlApp: React.FC<{}> = () => {
  const { url } = useAppSelector((state) => state.urlModule)
  // const logger = LoggerService.getInstance(LogLevel.DEBUG);
  // console.log("🚀 ~ file: TinyUrlApp.tsx:14 ~ logger:", logger)
  // Example usage:
  // logger.info('This is an information log.');
  // logger.warn('This is a warning log.', { additionalData: 'Some data' });
  // logger.error('This is an error log.', { error: 'Some error' });
  // logger.debug('This is a debug log.');
  const dispatch = useAppDispatch()
  const params = useParams()
  const navigate = useNavigate()

  const [localUrl, handleChange, setLocalUrl] = useNestedForm({ aaa: { longUrl: '' } }, () => { })

  const [authInputAtr, userCred, setUserCred] = useFormInput({ _id: '', name: '', email: '', password: '', msgs: [] }, () => { })

  const outletProps = {
    authInputAtr,
    userCred,
    setUserCred,
  }

  useEffect(() => {
    // log(LogLevel.INFO, "TinyUrl")
    if (params.id) {
      if (url) {
        if (url.pointer === params.id && url.longUrl) {
          window.location.replace(url.longUrl)
        } else {
          setLocalUrl({ aaa: { longUrl: '' } })
          dispatch(setUrl(null))
          navigate('/tinyurl')
        }
      } else dispatch(loadUrl(params.id))
    }
  }, [params.id, url, dispatch, navigate, setLocalUrl])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (url) {
      console.log("🚀 ~ file: TinyUrlApp.tsx:52 ~ onSubmit ~ url:", url)
      setLocalUrl({ aaa: { longUrl: '' } })
      dispatch(setUrl(null))
    } else !utilService.isValidHttpUrl(localUrl.aaa.longUrl) ? console.log('Invalid URl') : dispatch(saveUrl({ longUrl: localUrl.aaa.longUrl }))
  }

  function methodDoesNotExist(): void {
    try {
      throw new Error('Function not implemented.')
    } catch (error) {
      captureException(error)
    }

  }

  return (
    <div className="tinyUrl-app">
      <button onClick={() => methodDoesNotExist()}>Break the world</button>;
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
      <Outlet context={outletProps} />
    </div>
  )
}
