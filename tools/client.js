import { JSDOM } from 'jsdom'

/**
 * Global DOM
 */
const dom = new JSDOM()

global.document = dom.window.document
global.window = dom.window

document.body.innerHTML = `
  <div id="app"></app>
`