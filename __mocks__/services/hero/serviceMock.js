import mockCollections from './collections.json';

jest.mock('@service/api/hero', () => {
  global.mockGetListHero = jest.fn().mockResolvedValue({
    data: mockCollections,
  });

  global.mockCreateHero = jest.fn().mockResolvedValue({
    data: {
      message: 'cms.hero.create.success',
      result: {},
    },
  });

  global.mockUpdateHero = jest.fn().mockResolvedValue({
    data: {
      message: 'cms.hero.update.success',
      result: {},
    },
  });

  global.mockDeleteHero = jest.fn().mockResolvedValue({
    data: {
      message: 'cms.hero.delete.success',
      result: {},
    },
  });

  return {
    getList: mockGetListHero,
    create: mockCreateHero,
    update: mockUpdateHero,
    delete: mockDeleteHero,
  };
});
