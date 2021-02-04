function HttpRequest() {
  this.controller = new AbortController()
  this.timeout = 30000
  this.stream = null
  this.response = {}
  this.collections = {}
  this.options = {
    method: 'GET',
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: null,
  }
}

HttpRequest.prototype.requestStream = function () {
  const { timeout } = this

  const refresh = () => (this.controller = new AbortController())

  // let _controller = controller

  const start = () =>
    setTimeout(() => {
      // _controller.abort()
      // throw { message: 'Timeout' }
    }, timeout)

  const clear = () => {
    clearTimeout(start)
  }

  const stop = () => {
    clearTimeout(start)

    refresh()
  }

  return {
    start,
    stop,
    refresh,
    clear,
  }
}

HttpRequest.prototype.requestHeader = function () {}

HttpRequest.prototype.setup = async function ({ url, timeout, ...restParams }) {
  this.options = {
    ...this.options,
    ...restParams,
    signal: this.controller.signal,
  }
  this.timeout = timeout !== undefined ? timeout : this.timeout
  this.stream = this.requestStream()

  if (!url) {
    let message = 'Please set the url!'

    console.warn(message)

    throw { message }
  }

  // Delete url key
  delete this.options.url

  this.stream.start()

  let options = { ...this.options }
  // let signal = this.controller.signal

  // console.log(options)
  try {
    this.response = await fetch(url, options)
    this.collections = await this.response.json()

    this.stream.clear()
    return this.collections
  } catch (error) {
    console.error('http', error)
    // this.stream.stop()
    return error
  } finally {
    // this.stream.stop()
  }
}

export default new HttpRequest()
