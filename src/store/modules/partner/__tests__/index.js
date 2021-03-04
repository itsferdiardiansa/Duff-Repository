import { createStore } from 'vuex';
import partnerModule from '@store/modules/partner';
import collections from '__mock__/services/partner/collections';

describe('module/Partner', () => {
  let store;

  beforeAll(() => {
    store = createStore({
      ...partnerModule,
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

    mockGetListPartner.mockClear();
    mockGetListPartner.mockRejectedValueOnce(errorResponse);

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
        logo: expect.any(String),
        tagline: expect.any(String),
        hero: expect.any(String),
        site: expect.any(String),
        is_active: expect.any(String),
        description: expect.any(String),
        position: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
        hash_id: expect.any(String),
        ldp_id: expect.any(String),
      });
    });
  });

  it('it will not mutate any state after successful post data', async () => {
    await store.dispatch('postData', {
      data: { ldp_id: 123, description: '<p>Description ...</p>' },
    });

    expect(store.getters['getItems']).toBeUndefined();
  });

  it('will mutate the state error when failed post data without data as parameters', async () => {
    await store.dispatch('postData');

    expect(
      store.getters['getRequestStatus'].error.body.responseData.message
    ).toEqual("Cannot read property 'data' of undefined");
  });

  it('will mutate the state error when failed post data', async () => {
    const errorResponse = {
      message: 'invalid.validation',
      result: [
        'Tagline required',
        'Site required',
        'Description required',
        'LdpId required',
      ],
    };
    const payload = { data: { die: true } };

    mockCreatePartner.mockReset();
    mockCreatePartner.mockRejectedValueOnce(errorResponse);

    await store.dispatch('postData', payload);

    expect(store.getters['getRequestStatus'].error).toEqual({
      status: true,
      body: {
        requestData: payload,
        responseData: errorResponse,
      },
    });
  });

  it('it will not mutate any state after successful update data', async () => {
    await store.dispatch('updateData', {
      data: { ldp_id: 123, description: '<p>Description ...</p>' },
    });

    expect(store.getters['getItems']).toBeUndefined();
  });

  it('will mutate the state error when failed update data without data as parameters', async () => {
    await store.dispatch('updateData');

    expect(
      store.getters['getRequestStatus'].error.body.responseData.message
    ).toEqual("Cannot read property 'data' of undefined");
  });

  it('will mutate the state error when failed update data', async () => {
    const errorResponse = {
      message: 'invalid.validation',
      result: [
        'Tagline required',
        'Site required',
        'Description required',
        'LdpId required',
      ],
    };
    const payload = { data: { die: true } };

    mockUpdatePartner.mockReset();
    mockUpdatePartner.mockRejectedValueOnce(errorResponse);

    await store.dispatch('updateData', payload);

    expect(store.getters['getRequestStatus'].error).toEqual({
      status: true,
      body: {
        requestData: payload,
        responseData: errorResponse,
      },
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

    mockDeletePartner.mockReset();
    mockDeletePartner.mockRejectedValueOnce(errorResponse);

    await store.dispatch('deleteData', payload);

    expect(store.getters['getRequestStatus'].error).toBeFalsy();
  });
});
