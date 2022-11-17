import { useForm } from '../customHooks/useForm'
import { utilService } from '../services/utilService.js'

export const TinyUrlApp = () => {
  const [url, handleChange] = useForm('', () => {
    console.log(url)
  })

  const onSubmit = (e) => {
    e.preventDefault()
    !utilService.isValidHttpUrl(url.longUrl) ? console.log('Invalid URl') : console.log('Valid URL')
  }

  return (
    <div className="tinyUrl-app">
      <form onSubmit={onSubmit} className="tinyUrl-form">
        <label htmlFor="longUrl">Enter a long URL to make a TinyUrl</label>
        <input type="text" onChange={handleChange} name="longUrl" id="longUrl" />
        <button>Make TinyUrl!</button>
      </form>
    </div>
  )
}
