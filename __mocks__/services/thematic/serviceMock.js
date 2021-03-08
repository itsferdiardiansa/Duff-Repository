import mockCollections from './collections.json';

jest.mock('@service/api/thematicPage', () => {
  global.mockGetListThematic = jest.fn().mockResolvedValue({
    data: mockCollections,
  });

  global.mockCreateThematic = jest.fn().mockResolvedValue({
    data: {
      message: 'cms.thematic-page.create.success',
      result: {},
    },
  });

  global.mockUpdateThematic = jest.fn().mockResolvedValue({
    data: {
      message: 'cms.thematic-page.update.success',
      result: {},
    },
  });

  global.mockDeleteThematic = jest.fn().mockResolvedValue({
    data: {
      message: 'cms.thematic-page.delete.success',
      result: {},
    },
  });

  return {
    getList: mockGetListThematic,
    create: mockCreateThematic,
    update: mockUpdateThematic,
    delete: mockDeleteThematic,
  };
});
