<template>
  <div class="content-header flex items-center justify-end">
    <div class="btn-create">
      <Button 
        variant="primary"
        label="Add Role"
        :icon="['fa', 'plus']"
        :bold="true" 
        @click="addRole" 
      />
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import Button from '@common/Button'

export default {
  components: {
    Button,
  },
  setup() {
    const router = useRouter()

    const addRole = () => {
      router.push('/role/add')
    }

    return {
      addRole,
    }
  },
}
</script>
