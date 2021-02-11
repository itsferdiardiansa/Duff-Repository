<template>
  <div class="content-header flex items-center justify-end">
    <div class="btn-create">
      <Button 
        variant="primary"
        label="Add Notification"
        :icon="['fa', 'plus']"
        :bold="true" 
        @click="addNotification" 
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

    const addNotification = () => {
      router.push('/notification/add')
    }

    return {
      addNotification,
    }
  },
}
</script>
