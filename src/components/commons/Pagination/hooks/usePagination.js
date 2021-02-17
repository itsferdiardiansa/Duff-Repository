/* eslint-disable */
import { computed, unref } from 'vue';

const paginationSettings = {
  current_page: 1,
  per_page: 5,
  pages: [],
  total_page: 0,
};

const createPageNumber = data => {
  let { total_page, current_page } = data,
    range = 5, // amount of links displayed
    totalPages = total_page, // determined by amount of items, hardcoded for readability
    start = 1, // default
    paging = new Array(), // output variable
    rangeStart = 0;

  // Don't use negative values, force start at 1
  if (current_page < range) {
    start = 1;
    // Don't go beyond the last page
  } else if (current_page >= totalPages - range / 2) {
    start = Math.floor(totalPages - range + 1);
  } else {
    start = current_page - Math.floor(range / 2);
  }
  if (totalPages < range) rangeStart = totalPages;
  else rangeStart = start + range - 1;
  for (let i = start; i <= rangeStart; i++) {
    if (i === current_page) {
      paging.push(i); // add brackets to indicate current page
    } else {
      paging.push(i);
    }
  }

  return {
    pages: paging,
    isApplicable: Boolean(paging.length),
  };
};

const getNavigation = ({ current_page, total_page }) => ({
  prevBtn: current_page > 1,
  nextBtn: current_page < total_page,
});

const getInfo = ({ current_page, per_page, total_page }) => {
  return {
    info: {
      from: current_page * per_page - per_page + 1,
      to: current_page * per_page,
      of: per_page * total_page,
    },
  };
};

const usePagination = props => {
  const getPagination = computed(() => {
    const getProps = unref(props);

    return {
      ...paginationSettings,
      ...getProps,
      ...getNavigation(getProps),
      ...createPageNumber(unref(getProps)),
      ...getInfo(getProps),
    };
  });

  return {
    getPagination,
  };
};

export default usePagination;
