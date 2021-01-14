<template>
  <div class="fixed z-50 inset-0 overflow-y-auto" v-if="isShow">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
      
      <div class="modal-body" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                <slot name="header"></slot>
              </h3>
              
              <div class="mt-2">
                <slot name="body"></slot>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse" v-if="withConfirmation">
          <button type="button" class="btn-confirm">
            Yes
          </button>
          <button 
            type="button" 
            class="btn-cancel"
            @click="toggleModal"
          >
            No
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'

export default {
  props: {
    withConfirmation: {
      type: Boolean,
      default: true
    },
    onConfirm: {
      type: Function,
      default: () => { }
    }
  },
  setup(props) {
    let isShow = ref(true)

    const toggleModal = () => {
      isShow.value = !isShow.value
    }

    const handleConfirm = () => {
      props.onConfirm()
    }

    return {
      isShow,
      toggleModal,
      handleConfirm
    }
  }
}
</script>
<style lang="scss" scoped>
.modal-body {
  @apply inline-block align-bottom bg-white rounded-lg text-left; 
  @apply overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full;

  .btn-confirm {
    @apply w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white;
    @apply hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm;
  }

  .btn-cancel {
    @apply mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700;
    @apply hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm;
  }
}
</style>