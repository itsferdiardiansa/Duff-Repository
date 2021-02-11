import debounce from '@util/debounce'

jest.useFakeTimers()

describe('utils/debounce', () => {
  it('will the firing function with the given time', () => {
    let callback = jest.fn()
    let timeout = 1000
    let debounceFn = debounce(callback, timeout)

    for (let i of [0, 1]) {
      debounceFn()
    }

    expect(setTimeout).toHaveBeenCalledTimes(2)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), timeout)
  })
})
