import mockCollections from './collections.json';

jest.mock('@service/api/partner', () => {
  global.mockGetListPartner = jest.fn().mockResolvedValue({
    data: mockCollections,
  });

  global.mockCreatePartner = jest.fn().mockResolvedValue({
    data: {
      message: 'cms.section_partner.create.success',
      result: {},
    },
  });

  global.mockUpdatePartner = jest.fn().mockResolvedValue({
    data: {
      message: 'cms.section_partner.update.success',
      result: {},
    },
  });

  global.mockDeletePartner = jest.fn().mockResolvedValue({
    data: {
      message: 'cms.section_partner.delete.success',
      result: {},
    },
  });

  return {
    getList: mockGetListPartner,
    create: mockCreatePartner,
    update: mockUpdatePartner,
    delete: mockDeletePartner,
  };
});
