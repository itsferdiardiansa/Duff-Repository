import mockCollections from './collections.json';

jest.mock('@service/api/user', () => {
  global.mockLogin = jest.fn().mockResolvedValue({
    data: mockCollections,
  });

  return {
    login: mockLogin,
  };
});
