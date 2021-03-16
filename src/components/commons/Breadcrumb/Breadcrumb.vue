<template>
  <ul :class="`${prefixClass}-breadcrumb`" ref="breadcrumbEl">
    <template v-for="(item, key) in data" :key="key">
      <li
        :class="`${prefixClass}-breadcrumb--item`"
        :ref="collectBreadcrumItemEl"
      >
        <template v-if="data.length - 1 === key">
          <Button
            size="sm"
            variant="orange"
            :label="item.name"
            :inverse="true"
            :rounded="false"
            :disabled="true"
          />
        </template>
        <template v-else>
          <Button
            size="sm"
            variant="orange"
            :rounded="false"
            :label="item.name"
            @click="changePage(item.path)"
          />
        </template>
      </li>
    </template>
  </ul>
</template>
<script>
/* eslint-disable */
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from '@common/Button';

export default {
  name: 'CMBreadcrumb',
  components: {
    Button,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    separator: {
      type: String,
      default: '/',
    },
  },
  setup(props) {
    const router = useRouter();
    const breadcrumbEl = ref();
    const breadcrumbItemEl = ref([]);

    const handleClick = path => {
      router.push(path);
    };

    const shouldShowSeparator = key => {
      const { data } = props;

      return data.length - 1 !== key && data.length > 1;
    };

    const collectBreadcrumItemEl = el => {
      breadcrumbItemEl.value.push(el);
    };

    const changePage = path => {
      router.push(path);
    };

    return {
      breadcrumbEl,
      handleClick,
      shouldShowSeparator,
      collectBreadcrumItemEl,
      changePage,
      breadcrumbItemEl,
    };
  },
};
</script>
<style lang="scss" scoped>
.#{$prefixClass}-breadcrumb {
  @apply flex;

  &--item {
    @apply ml-2;

    &:last-child {
      @apply text-gray-400;
    }

    &:first-child {
      &::before {
        display: none;
      }
    }
  }

  .separator {
    @apply inline-block text-gray-400 px-2;
  }
}
</style>
