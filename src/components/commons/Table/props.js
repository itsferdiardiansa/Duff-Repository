export default {
  headers: {
    type: [Array],
    default: () => [],
  },
  items: {
    type: [Array],
    default: () => [],
  },
  emptyMessage: {
    type: String,
    default: 'Empty data',
  },
  rowNumber: {
    type: Boolean,
    default: true,
  },
  isFetching: {
    type: Boolean,
    default: false,
  },
  onError: {
    type: Boolean,
    default: false
  },
  rowLoader: {
    type: Number,
    default: 5,
  },
  emptyComponent: {
    type: Object,
    default: () => {},
  },
  errorComponent: {
    type: Object,
    default: () => {}
  },
  onFailedFetchHandler: {
    type: Function,
    default: () => {}
  },
  selectableRows: {
    type: Boolean,
    default: false,
  },
  withPagination: {
    type: Boolean,
    default: true,
  },
  pagination: {
    type: Object,
    default: () => ({
      currentPage: 1,
      pageSize: 5,
      total: 0
    })
  },
  withFilter: {
    type: Boolean,
    default: false
  },
  filterOptions: {
    type: Array,
    default: () => []
  }
}