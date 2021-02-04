<template>
  <div class="content-header flex items-center justify-between">
    <div class="flex items-center">
      <div class="title">
        <h2 class="font-bold text-2xl">Verified User</h2>
      </div>
    </div>

    <div class="btn-create float-right">
      <Button 
        variant="dark" 
        :rounded="true"
        :bold="true"
        :disabled="true"
        :icon="['fa', ]"
        @click="addVerifiedUser"
      > 
        Add Verified Users
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

    const addVerifiedUser = () => {
      router.push('/verified-user/add')
    }

    return {
      addVerifiedUser,
    }
  },
}
</script>
