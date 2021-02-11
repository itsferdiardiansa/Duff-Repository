<template>
  <div :class="`${prefixClass}-control--input`">
    <div :class="`${prefixClass}-select`">
      <div @click="toggleDropdown" @blur="toggleDropdown" :class="`${prefixClass}-select--button`">
        <span class="button-label">
          {{ selectedItem?.text }}
        </span>
        <span class="button-icon">
          <font-awesome-icon :icon="icon" class="h-4" />
        </span>
      </div>

      <transition name="slide" appear>
        <div :class="`${prefixClass}-select--dropdown`" v-if="isCollapsed">
          <ul class="dropdown-list">
            <template v-for="(item, key) in items" :key="key">
              <li class="dropdown-item" v-text="item.text" @click="selectItem(item)"></li>
            </template>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { computed, reactive, ref, unref } from 'vue'

export default {
  emits: [
    'update:modelValue'
  ],
  props: {
    items: {
      type: Array,
      default: () => []
    },
    modelValue: {
      type: [String, Number]
    }
  },
  setup(props, { emit }) {
    const { items, modelValue } = props
    const isCollapsed = ref(false)

    const toggleDropdown = () => {
      isCollapsed.value = !isCollapsed.value
    }

    const icon = computed(() => {
      return (unref(isCollapsed)) ? ['fa', 'chevron-circle-up'] : ['fa', 'chevron-circle-down']  
    })

    const selectedItem = computed(() => {
      const { items, modelValue } = props

      isCollapsed.value = false

      return (unref(items).find(item => {
        return item.value == modelValue
      }))
    })

    const selectItem = item => {
      emit('update:modelValue', item.value)
    }

    return {
      icon,
      isCollapsed,
      toggleDropdown,
      selectItem,
      selectedItem
    }
  }
}
</script>
<style lang="scss" scoped>
.#{$prefixClass}-select {
  @apply mt-1 relative;

  &--button {
    @apply relative w-full bg-white border border-gray-300 rounded-md;
    @apply cursor-pointer shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm;

    .button-label {
      @apply flex items-center;
    }

    .button-icon {
      @apply ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none;
    }
  }

  &--dropdown {
    @apply absolute mt-1 w-full rounded-md bg-white shadow-lg z-50;

    .dropdown-list {
      @apply max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm;

      .dropdown-item {
        @apply cursor-pointer text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-700 hover:text-gray-100;
      }
    }
  }
}
</style>