import { createStore } from 'vuex';
import feedbackModule from '@store/modules/feedback';
import collections from '__mock__/services/feedback/collections';

describe('module/Feedback', () => {
  let store;

  beforeAll(() => {
    store = createStore({
      ...feedbackModule,
    });
  });

  it('will mutate the state items when successfully fetch data', async () => {
    await store.dispatch('fetchData');

    expect(store.getters['getItems']).toEqual(collections.result.data);
  });

  it('it will mutate the error state when it fails fetch data', async () => {
    const errorResponse = {
      message: 'Invalid Token',
      result: {
        success: false,
      },
    };
    const payload = { page: 1, limit: 10 };

    mockGetListFeedback.mockClear();
    mockGetListFeedback.mockRejectedValueOnce(errorResponse);

    await store.dispatch('fetchData', payload);

    expect(store.getters['getRequestStatus'].error).toEqual({
      status: true,
      body: {
        requestData: payload,
        responseData: errorResponse,
      },
    });
  });

  it('will mutate the state pagination when successfully fetch data', async () => {
    const { data, ...pagination } = collections.result;
    await store.dispatch('fetchData');

    expect(store.getters['getPagination']).toEqual(pagination);
  });

  it('will mutate the state items and have property properly', async () => {
    const { data, ...pagination } = collections.result;
    await store.dispatch('fetchData');

    const items = store.getters['getItems'];

    items.forEach(item => {
      expect(item).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        email: expect.any(String),
        page: expect.any(String),
        section: expect.any(String),
        comment: expect.any(String),
        rate: expect.any(Number),
        responded_by: expect.any(String),
        read_by: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
        responded_at: expect.any(String),
        hash_id: expect.any(String),
        read_by_slice: expect.any(Array),
      });
    });
  });
});
