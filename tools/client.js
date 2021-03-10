import { JSDOM } from 'jsdom';

/**
 * Global DOM
 */
const dom = new JSDOM();

global.document = dom.window.document;
global.window = dom.window;

global.console = {
  ...console,
  warn: jest.fn(),
  info: jest.fn(),
};

document.body.innerHTML = `
  <div id="app"></app>
  <div id="plugin__12e5"</div>
`;
