<template>
  <template v-if="data.onError && !data.isFetching">
    <tr :ref="countDataRows">
      <td :class="`${prefixClass}-table--body-col`" :colspan="totalColumn">
        <component :is="getErrorComponent"></component>
      </td>
    </tr>
  </template>
  <template v-else-if="data.items.length && !data.isFetching">
    <template v-for="(item, key) in data.items" :key="key">
      <tr :class="getRowClass(key)" :ref="countDataRows">
        <td :class="`${prefixClass}-table--body-col`">
          <template v-if="data.selectableRows && data.rowNumber">
            <input
              type="checkbox"
              class="cursor-pointer"
              v-model="selectedRows.ids"
              :name="`select-row-${checkboxHashId}-key`"
              :value="key"
            />
          </template>
          <template v-else>
            <label v-text="key + 1" v-if="data.rowNumber"></label>
          </template>
        </td>

        <template v-for="(hItem, hKey) in data.headers" :key="hKey">
          <slot name="content" :headers="hItem" :item="item"></slot>
        </template>
      </tr>
    </template>
  </template>
  <template v-else-if="!data.items.length && !data.isFetching">
    <tr :ref="countDataRows">
      <td :class="`${prefixClass}-table--body-col`" :colspan="totalColumn">
        <component :is="getEmptyCoponent"></component>
      </td>
    </tr>
  </template>
</template>
<script>
import { computed, defineComponent, getCurrentInstance, ref } from 'vue';
import errorComponentDefault from './TableError';
import emptyComponentDefault from './TableEmpty';

export default defineComponent({
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    selected: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['onFailedFetchHandler'],
  setup(props, { emit }) {
    const dataRows = ref([]);
    const root = getCurrentInstance();

    let selectedRows = computed(() => {
      const { selected } = props;

      return selected;
    });

    const totalColumn = computed(() => {
      const { headers, rowNumber } = props.data;

      return headers.length + (rowNumber ? 1 : 0);
    });

    const checkboxHashId = computed(() => {
      return [
        new Date().getTime(),
        Math.floor(10000 + Math.random() * 90000),
      ].join('-');
    });

    const getKey = (item, key) => {
      return Reflect.has(item, 'id') ? item.id : key;
    };

    const getRowClass = id => [
      `${root.data.prefixClass}-table--body-row`,
      {
        selected: selectedRows.value.ids.includes(id),
      },
    ];

    const handleClick = (item, key) => {
      emit('setSelectedRow', { item, key });
    };

    const countDataRows = el => {
      dataRows.value.push(el);
    };

    const getErrorComponent = computed(() => {
      const {
        data: { errorComponent },
      } = props;

      return errorComponent || errorComponentDefault;
    });

    const getEmptyCoponent = computed(() => {
      const {
        data: { emptyComponent },
      } = props;

      return emptyComponent || emptyComponentDefault;
    });

    return {
      ...props,
      dataRows,
      selectedRows,
      totalColumn,
      checkboxHashId,
      handleClick,
      getKey,
      getRowClass,
      countDataRows,
      getErrorComponent,
      getEmptyCoponent,
    };
  },
});
</script>
