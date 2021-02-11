<template>
  <Card class="w-full">
    <Form
      :isFetching="requestStatus.fetch" 
      :onSubmitFn="handleSubmit"
    >
      <FormItem label="Role Name">
        <Input 
          placeholder="Role Name"
          v-model="state.name"
          autofocus 
        />
      </FormItem>

      <FormItem label="Previleges">
        <div>
          <div class="flex items-center">
            <input
              id="checkboxCustom101"
              type="checkbox"
              class="checkbox-template"
              :value="1"
              v-model="state.previleges"
            />
            <label class="ml-2" for="checkboxCustom101">Hero Menu</label>
          </div>

          <div class="flex items-center">
            <input
              id="checkboxCustom102"
              type="checkbox"
              class="checkbox-template"
              :value="2"
              v-model="state.previleges"
            />
            <label class="ml-2" for="checkboxCustom102">Partner Menu</label>
          </div>

          <div class="flex items-center">
            <input
              id="checkboxCustom103"
              type="checkbox"
              class="checkbox-template"
              :value="3"
              v-model="state.previleges"
            />
            <label class="ml-2" for="checkboxCustom103">Section Menu</label>
          </div>
        </div>
      </FormItem>

      <FormItem>
        <Button 
          class="w-28"
          :label="(state.action) === 'create' ? 'Create': 'Update'" 
          :variant="(state.action) === 'create' ? 'dark' : 'warning'"
          :icon="['fa', 'save']"
          :bold="true" 
        />
      </FormItem>
    </Form>
  </Card>
</template>
<script>
import { computed, onMounted, reactive, unref } from 'vue'
import Form, { FormItem, Input } from '@common/Form'
import Card from '@common/Card'
import Button from '@common/Button'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  components: {
    Form, 
    FormItem,
    Input,
    Card,
    Button,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const state = reactive({
      action: 'create',
      name: '',
      previleges: []
    })  
    
    const handleSubmit = () => {
      const { action } = unref(state)

      action === 'create' ? postData() : updateData()
    }

    const postData = () => {
      store.dispatch('role/postData', {
        data: state,
        action: 'form.create',
        redirectUrl: '/role',
        status: 'success',
      })
    }

    const updateData = () => {
      store.dispatch('role/updateData', {
        data: state,
        action: 'form.update',
        redirectUrl: '/role',
        status: 'success',
      })
    }

    const requestStatus = computed(() => {
      return store.getters['role/getRequestStatus']
    })

    onMounted(() => {
      if(route.path === '/role/update') {
        state.name = route.params.name
        state.previleges = JSON.parse(route.params.previleges).map(item => item.id_privilege)
        state.hash_id = route.params.hash_id

        state.action = 'update'
      }
    })

    return {
      state,
      handleSubmit,
      requestStatus
    }
  }
}
</script>
<style lang="scss" scoped>
.#{$prefixClass}-container {
  @apply w-full;

  .form-group {
    @apply flex items-center mb-6;

    .form-control-label {
      @apply w-1/4 block uppercase tracking-wide text-xs font-bold mb-2;
    }

    .form-control {
      @apply w-full border rounded py-2 px-4;
    }
  }
}
</style>
