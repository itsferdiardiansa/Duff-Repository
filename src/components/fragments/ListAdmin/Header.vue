<template>
  <div class="content-header flex items-center justify-between">
    <div class="flex items-center">
      <div class="title">
        <h2 class="font-bold text-2xl">List Admin CMSLOKET</h2>
      </div>
    </div>

    <div class="btn-create float-right">
      <Button 
        variant="primary"
        :icon="['fa', 'plus']"
        :bold="true" 
        @click="addAdmin" 
      >
        Add Admin
      </Button>
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

    const addAdmin = () => {
      router.push('/list-admin/add')
    }

    return {
      addAdmin,
    }
  },
}
</script>
