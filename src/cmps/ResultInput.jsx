export const ResultInput = ({ url }) => {
  return (
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
  )
}
