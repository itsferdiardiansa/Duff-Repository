export default {
  headers: {
    type: [Array],
    default: () => [],
  },
  items: {
    type: [Array],
    default: () => [],
  },
  emptyTableMessage: {
    type: String,
    default: 'Empty data',
  },
  rowNumber: {
    type: Boolean,
    default: true,
  },
  showLoader: {
    type: Boolean,
    default: false,
  },
  rowLoader: {
    type: Number,
    default: 5,
  },
  emptyDataComponent: {
    type: Object,
    default: () => {},
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
    default: true
  },
  filterOptions: {
    type: Array,
    default: () => []
  }
}