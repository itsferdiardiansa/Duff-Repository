<template>
  <div class="create-form">
    <Card class="p-4">
      <form class="px-8 pt-6 pb-8 mb-4 flex flex-col my-2" @submit.prevent="submitData">
        <FormInput 
          label="Title"
          placeholder="Title" 
          v-model="state.title"
        />

        <FormInput 
          label="URL"
          placeholder="URL"
          v-model="state.button_url" 
        />

        <FormInput 
          label="Banner (1080x240)"
          type="file"
          name="banner"
          @change="handleFileInput"
        />

         <FormInput 
          label="Mobile Banner (360x160)"
          type="file"
          name="banner_mobile"
          @change="handleFileInput"
        />

        <!-- <FormInput 
          label="Status"
          labelCheckbox="Active"
          type="checkbox"
        /> -->

        <div style="margin-left: 20%">
          <Button 
            label="Save" 
            variant="dark"
            :icon="['fa', 'save']" 
          />
        </div>
      </form>
    </Card>
  </div>
</template>
<script>
import { reactive } from 'vue'
import Card from '@common/Card'
import Button from '@common/Button'
import FormInput from '@common/Form/Input'
import { useStore } from 'vuex'

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = error => reject(error)
})

export default {
  components: {
    Card,
    Button,
    FormInput
  },
  setup() {
    const store = useStore()

    const state = reactive({
      title: '',
      button_url: '',
      banner: '',
      banner_mobile: ''
    })

    const submitData = () => {
      store.dispatch('hero/postData', state)
    }

    const handleFileInput = async e => {
      const name = e.target.name
      const file = e.target.files[0]

      state[name] = await btoa(toBase64(file))
      // console.log(await toBase64(file))
    }
 
    return {
      state,
      submitData,
      handleFileInput
    }
  }
}
</script>
<style lang="scss" scoped>
.create-form {
  @apply w-full;

  .form-group {
    @apply flex items-center mb-6;

    .form-control-label {
      @apply w-1/4 block uppercase tracking-wide text-xs font-bold mb-2;
    }

    .form-control {
      @apply w-full border rounded py-3 px-4;
    }
  }
}
</style>
