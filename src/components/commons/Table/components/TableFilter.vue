<template>
  <div :class="`${prefixClass}-table-filter`">
    <div :class="`${prefixClass}-table-filter--top`">
      <div :class="`${prefixClass}-table-filter--input-form`">
        <Form class="search-form" @submit="handleSubmit">
          <Input
            type="search"
            class="bg-gray-100"
            placeholder="Search"
            :icon="['fa', 'search']"
            v-model="keyword"
          />
        </Form>
      </div>

      <div :class="`${prefixClass}-table-filter--extend`" v-if="$slots.default">
        <slot />
      </div>
    </div>

    <div :class="`${prefixClass}-table-filter--bottom`">
      <div :class="`${prefixClass}-table-filter--category`">
        <label :class="`${prefixClass}-table-filter--title`">Sort By</label>

        <Select
          class="w-40"
          v-model="sortBy"
          @change="handleSubmit"
          :items="[
            { value: 'newest', label: 'Newest' },
            { value: 'oldest', label: 'Oldest' },
          ]"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { computed, getCurrentInstance, ref, unref } from 'vue';
import Form, { Input, Select } from '@common/Form';
import debounce from '@util/debounce';

export default {
  components: {
    Form,
    Input,
    Select,
  },
  props: {
    data: {
      type: Array,
    },
    onCallback: {
      type: Function,
    },
  },
  setup(props) {
    const keyword = ref('');
    const category = ref('');
    const sortBy = ref('newest');
    const { parent } = getCurrentInstance();

    const handleInput = debounce(() => {
      parent.emit('onSearch', {
        q: keyword.value,
        category: category.value,
      });
    }, 100);

    const filteredOptions = computed(() => {
      let items = [].concat(props.data);
      return Object.keys(items.pop());
    });

    const handleSubmit = () => {
      parent.emit('onSearch', {
        q: unref(keyword),
        sortBy: unref(sortBy),
      });
    };

    return {
      keyword,
      category,
      sortBy,
      handleInput,
      filteredOptions,
      handleSubmit,
    };
  },
};
</script>
<style lang="scss" scoped>
.#{$prefixClass}-table-filter {
  @apply block mb-4;

  &--top {
    @apply grid gap-2 mb-4;
    grid-template-columns: 1fr 20%;
  }

  &--bottom {
    @apply w-8/12 inline-block;
  }

  &--extend {
    @apply grid grid-flow-col gap-2;
  }

  &--title {
    @apply text-base mr-6 font-bold;
  }

  &--select {
    @apply border h-10 px-3 capitalize;

    &:focus {
      @apply outline-none;
    }
  }

  &--input-form {
    @apply w-5/12;

    .search-form {
      @apply h-full;
    }
  }

  &--category {
    @apply flex items-center;
  }

  .form-group {
    @apply flex items-center;

    .form-control-label {
      @apply w-10 block uppercase tracking-wide text-xs font-bold mb-2;
    }

    .form-control {
      @apply w-full border rounded py-1.5 px-4 focus:outline-none;
    }
  }
}
</style>
