<template>
  <div class="w-8/12 text-left mt-10">
    <div class="font-black text-lg mb-4">
      Input
    </div>

    <div class="">
      <div class="mb-4">
        <code>
          {{ JSON.stringify(state, null, 2) }}
        </code>
      </div>

      <FormInput 
        placeholder="Username"
        v-model="state.username"
        :icon="['fa', 'user']"
      />

      <FormInput 
        label="Banner (1080x240)"
        type="file"
        v-model="state.file"
      />

      <FormInput 
        label="Status"
        type="checkbox"
        labelCheckbox="Active"
        v-model="state.active"
      />

      <FormInput 
        label="Password"
        type="password"
        placeholder="Type your password"
        v-model="state.password"
        :onChange="handleChange"
        :icon="['fa', 'key']"
      />

      <FormInput 
        placeholder="Search"
        errorMessage="Error search info"
        v-model="state.username"
        :onError="true"
        :icon="['fa', 'search']"
      />
    </div>
  </div>
</template>
<script>
import FormInput from '@common/Form/Input'
import { reactive } from 'vue'

export default {
  components: {
    FormInput
  },
  setup() {
    
    // console.log(self.$alert)
    const state = reactive({ 
      password: 'this is password', 
      username: '',
      file: '',
      active: false 
    })

    const handleChange = () => {
      // console.log(state)
      // console.log(val, el)
    }

    return {
      state, 
      handleChange
    }
  }
}
</script>