import { createStore } from 'vuex';
import state from '@store/modules/partner/state';
import getters from '@store/modules/partner/getters';
import mutations from '@store/modules/partner/mutations';
import actions from '@store/modules/partner/actions';

jest.mock('@service/api/partner', () => {
  global.mockCreatePartner = jest.fn().mockResolvedValueOnce({
    data: {
      message: 'cms.section_partner.create.success',
      result: {},
    },
  });

  return {
    create: mockCreatePartner,
  };
});

export default createStore({
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
});
