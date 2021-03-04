import mockCollections from './collections.json';

jest.mock('@service/api/notification', () => {
  global.mockGetListNotification = jest.fn().mockResolvedValue({
    data: mockCollections,
  });

  global.mockCreateNotification = jest.fn().mockResolvedValue({
    data: {
      message: 'cms.notification.create.success',
      result: {},
    },
  });

  global.mockUpdateNotification = jest.fn().mockResolvedValue({
    data: {
      message: 'cms.notification.update.success',
      result: {},
    },
  });

  global.mockDeleteNotification = jest.fn().mockResolvedValue({
    data: {
      message: 'cms.notification.delete.success',
      result: {},
    },
  });

  return {
    getList: mockGetListNotification,
    create: mockCreateNotification,
    update: mockUpdateNotification,
    delete: mockDeleteNotification,
  };
});
