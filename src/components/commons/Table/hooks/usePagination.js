// import { unref } from "vue"

import { computed, unref } from "vue";

const paginationSettings = {
  currentPage: 1,
  pageSize: 5,
  pages: [],
  total: 0
}

const createPageNumber = data => {
  let { total, currentPage } = data,
      range       = 5,  // amount of links displayed 
      totalPages  = total, // determined by amount of items, hardcoded for readability 
      start       = 1,// default
      paging      = new Array(),      // output variable
      rangeStart  = 0

  // Don't use negative values, force start at 1
  if (currentPage < range) {
      start = 1;

  // Don't go beyond the last page 
  } else if (currentPage >= (totalPages - (range / 2) )) {
      start = Math.floor(totalPages - range + 1);
  } else {
      start = (currentPage - Math.floor(range / 2));
  }
  if (totalPages < range)
    rangeStart = totalPages
  else
    rangeStart = ((start + range) - 1)
  for (var i = start; i <= rangeStart; i++) {
      if (i === currentPage) {
          paging.push(i); // add brackets to indicate current page 
      } else {
          paging.push(i);
      }
  }
  return paging;
}

const usePagination = props => {
  const getPagination = computed(() => {
    const { pagination } = unref(props)

    return {
      ...paginationSettings,
      ...pagination,
      pages: createPageNumber(unref(pagination)),
      show: Boolean(pagination.total)
    }
  })

  return {
    getPagination
  }
}

export default usePagination