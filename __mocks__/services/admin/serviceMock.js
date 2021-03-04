import mockCollections from './collections.json';

jest.mock('@service/api/admin', () => {
  global.mockGetListAdmin = jest.fn().mockResolvedValue({
    data: mockCollections,
  });

  global.mockCreateAdmin = jest.fn().mockResolvedValue({
    data: {
      message: 'cms.administrator.create.success',
      result: {},
    },
  });

  global.mockUpdateAdmin = jest.fn().mockResolvedValue({
    data: {
      message: 'cms.administrator.update.success',
      result: {},
    },
  });

  global.mockDeleteAdmin = jest.fn().mockResolvedValue({
    data: {
      message: 'cms.administrator.delete.success',
      result: {},
    },
  });

  return {
    getList: mockGetListAdmin,
    create: mockCreateAdmin,
    update: mockUpdateAdmin,
    delete: mockDeleteAdmin,
  };
});
