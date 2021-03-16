import menuList from '@data/menu.json';

export default {
  menu: menuList,
  chunks: {
    modules: new Map(),
    isFetching: false,
    onError: false,
  },
};
