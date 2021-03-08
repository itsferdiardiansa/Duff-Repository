import mockCollections from './collections.json';

jest.mock('@service/api/footer', () => {
  global.mockGetListFooter = jest.fn().mockResolvedValue({
    data: mockCollections,
  });

  global.mockCreateFooter = jest.fn().mockResolvedValue({
    data: {
      message: 'cms.footer.create.success',
      result: {},
    },
  });

  global.mockUpdateFooter = jest.fn().mockResolvedValue({
    data: {
      message: 'cms.footer.update.success',
      result: {},
    },
  });

  global.mockDeleteFooter = jest.fn().mockResolvedValue({
    data: {
      message: 'cms.footer.delete.success',
      result: {},
    },
  });

  return {
    getList: mockGetListFooter,
    create: mockCreateFooter,
    update: mockUpdateFooter,
    delete: mockDeleteFooter,
  };
});
