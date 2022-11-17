export const LongUrlInput = ({ localUrl, onChange }) => {
  return (
    <div>
      <label htmlFor="longUrl">Enter a long URL to make a TinyUrl</label>
      <input value={localUrl.longUrl} type="text" onChange={onChange} name="longUrl" id="longUrl" />
      <button>Make TinyUrl!</button>
    </div>
  )
}
