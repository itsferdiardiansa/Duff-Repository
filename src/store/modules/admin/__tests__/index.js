import { createStore } from 'vuex';
import adminModule from '@store/modules/admin';
import collections from '__mock__/services/admin/collections';

describe('module/Admin', () => {
  let store;

  beforeAll(() => {
    store = createStore({
      ...adminModule,
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

    mockGetListAdmin.mockClear();
    mockGetListAdmin.mockRejectedValueOnce(errorResponse);

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
        email: expect.any(String),
        name: expect.any(String),
        is_super_admin: expect.any(Number),
        created_at: expect.any(String),
        updated_at: expect.any(String),
        hash_id: expect.any(String),
        role_privileges: expect.any(Number),
      });
    });
  });

  it('it will not mutate any state after successful delete data', async () => {
    await store.dispatch('deleteData', {
      hash_id: 12,
      params: { page: 1, limit: 10 },
    });

    expect(store.getters['getItems']).toBeUndefined();
  });

  it('will mutate the state error when failed delete data', async () => {
    const errorResponse = {
      message: 'invalid.validation',
      result: {},
    };
    const payload = { hash_id: 122, params: { page: 1, limit: 10 } };

    mockDeleteAdmin.mockReset();
    mockDeleteAdmin.mockRejectedValueOnce(errorResponse);

    await store.dispatch('deleteData', payload);

    expect(store.getters['getRequestStatus'].error).toBeFalsy();
  });
});
