import mockCollections from './collections.json';

jest.mock('@service/api/feedback', () => {
  global.mockGetListFeedback = jest.fn().mockResolvedValue({
    data: mockCollections,
  });

  global.mockMarkAsResponded = jest.fn().mockResolvedValue({
    data: {
      message: 'cms.feedback.mark_as_responded.success',
      result: {},
    },
  });

  global.mockMarkAsRead = jest.fn().mockResolvedValue({
    data: {
      message: 'cms.feedback.mark_as_read.success',
      result: {},
    },
  });

  return {
    getList: mockGetListFeedback,
    markAsResponded: mockMarkAsResponded,
    markAsRead: mockMarkAsRead,
  };
});
