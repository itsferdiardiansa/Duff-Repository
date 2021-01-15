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
  const { controller, timeout } = this

  const refresh = () => (this.controller = new AbortController())

  const start = () =>
    setTimeout(() => {
      controller.abort()
    }, timeout)

  const stop = () => {
    clearTimeout(start)

    refresh()
  }

  return {
    start,
    stop,
    refresh,
  }
}

HttpRequest.prototype.requestHeader = function () {}

HttpRequest.prototype.setup = async function ({ url, timeout, ...restParams }) {
  this.options = {
    ...this.options,
    ...restParams,
    signal: this.controller.signal,
  }
  this.timeout = timeout
  this.stream = this.requestStream()

  if (!url) {
    let message = 'Please set the url!'

    console.warn(message)

    throw { message }
  }

  // Delete url key
  delete this.options.url

  this.stream.start()

  try {
    this.response = await fetch(url, { ...this.options })
    this.collections = await this.response.json()

    return this.collections
  } catch (error) {
    return error
  } finally {
    this.stream.stop()
  }
}

export default new HttpRequest()
