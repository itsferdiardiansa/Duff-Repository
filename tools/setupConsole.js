global.console = {
  ...console,
  warn: jest.fn(),
  info: jest.fn(),
};
