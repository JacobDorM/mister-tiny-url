interface Url {
  pointer?: string
  shortUrl?: string
  longUrl?: string
}

type ResultInputProps = {
  url: Url
}

export const ResultInput: React.FunctionComponent<ResultInputProps> = ({ url }) => {
  return (
    <div>
      <div className="form-group">
        <label htmlFor="longtUrl" className="label-fancy">
          <img data-v-55d0503f="" src="https://tinyurl.com/images/home/url.svg" alt="" className="mr-2" />
          Your Long URL
        </label>
        <input defaultValue={url.longUrl} type="text" id="longtUrl" className="input-url" />
      </div>
      <div className="form-group">
        <label htmlFor="shortUrl" className="label-fancy">
          <img data-v-55d0503f="" src="https://tinyurl.com/images/home/magic-wand.svg" alt="" className="mr-2"></img>
          TinyUrl
        </label>
        <input defaultValue={url.shortUrl} type="text" id="shortUrl" className="input-url" />
        <div className="btn-container flex align-center">
          <button className="btn-tiny"> Shorten another</button>
        </div>
      </div>
    </div>
  )
}
