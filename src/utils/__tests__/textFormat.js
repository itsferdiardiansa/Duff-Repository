import { camelToTitle, snakeToTitle } from '@util/textFormat'

describe('utils/textFormat', () => {
  it('should output text of the camelCase format', () => {
    let key = 0
    let match = ['camel case', 'long camel case']

    for (let text of ['camelCase', 'longCamelCase']) {
      expect(camelToTitle(text)).toEqual(match[key])

      key++
    }
  })

  it('should output text of the snake_case format', () => {
    let key = 0
    let match = ['snake case', 'long snake case']

    for (let text of ['snake_case', 'long_snake_case']) {
      expect(snakeToTitle(text)).toEqual(match[key])

      key++
    }
  })
})
