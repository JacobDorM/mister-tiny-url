export const utilService = {
  isValidHttpUrl,
  makeId,
  debounce,
}

function debounce(func: Function, wait = 700) {
  let timeout: ReturnType<typeof setTimeout>
  return function (...args: []) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function isValidHttpUrl(str: string) {
  let url
  try {
    url = new URL(str)
  } catch (_) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}

function makeId(length = 5) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}
