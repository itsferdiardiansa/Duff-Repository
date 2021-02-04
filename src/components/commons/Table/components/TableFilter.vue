<template>
  <div class="table-filter">
    <div class="table-filter__category">
      <label class="table-filter__title">Category</label>
      <select class="table-filter__select" v-model="category">
        <option value="">All</option>
        <template v-for="(item, key) in data" :key="key">
          <option :value="item" v-text="snakeToTitle(item)" v-if="item !== 'action'"></option>
        </template>
      </select>
    </div>

    <div class="table-filter__input-form form-group">
      <input class="form-control" type="text" placeholder="Search or filter results" v-model="keyword" @keyup="handleInput" />
    </div>
  </div>
</template>
<script>
import { computed, getCurrentInstance, ref } from 'vue'
import debounce from '@util/debounce'

export default {
  props: {
    data: {
      type: Array
    },
    onCallback: {
      type: Function
    }
  },
  setup(props) {
    const keyword = ref('')
    const category = ref('')
    const { parent } = getCurrentInstance()

    const handleInput = debounce(() => {
      parent.emit('onSearchCallback', {
        q: keyword.value, 
        category: category.value
      })
    }, 100)

    const filteredOptions = computed(() => {
      let items = [].concat(props.data)
      // console.log(props.data
      return Object.keys(items.pop())
    })

    return {
      keyword,
      category,
      handleInput, 
      filteredOptions
    }
  }
}
</script>
<style lang="scss" scoped>
.table-filter {
  @apply mb-2 flex items-center text-base text-gray-500 justify-between;

  &__title {
    @apply text-base mr-6 font-bold;  
  }

  &__select {
    @apply border h-10 px-3 capitalize;

    &:focus {
      @apply outline-none;
    }
  }

  &__input-form {
    @apply w-96;
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