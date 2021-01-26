<template>
  <div class="content-header flex items-center justify-between">
    <div class="flex items-center">
      <div class="title">
        <h2 class="font-bold text-2xl">Role CMSLOKET</h2>
      </div>
    </div>

    <div class="btn-create float-right">
      <Button :textBold="true" @click="addRole" variant="primary">
        Add Role
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

    const addRole = () => {
      router.push('/role/add')
    }

    return {
      addRole,
    }
  },
}
</script>
