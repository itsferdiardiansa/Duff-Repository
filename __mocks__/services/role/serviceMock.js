import mockCollections from './collections.json';

jest.mock('@service/api/role', () => {
  global.mockGetListRole = jest.fn().mockResolvedValue({
    data: mockCollections,
  });

  global.mockCreateRole = jest.fn().mockResolvedValue({
    data: {
      message: 'cms.role.create.success',
      result: {},
    },
  });

  global.mockUpdateRole = jest.fn().mockResolvedValue({
    data: {
      message: 'cms.role.update.success',
      result: {},
    },
  });

  global.mockDeleteRole = jest.fn().mockResolvedValue({
    data: {
      message: 'cms.role.delete.success',
      result: {},
    },
  });

  return {
    getList: mockGetListRole,
    create: mockCreateRole,
    update: mockUpdateRole,
    delete: mockDeleteRole,
  };
});
