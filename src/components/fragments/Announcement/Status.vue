<template>
  <div class="pl-2">
    <div class="status flex flex-col">
      <div class="flex items-center">
        <Badge
          :textBold="true"
          :variant="data.tier ? 'success' : 'danger'"
          :dot="true"
          size="sm"
          shape="circle"
        />
        <span class="ml-2">{{ data.tier ? 'active' : 'inactive' }}</span>
      </div>

      <div class="flex items-center">
        <Badge
          :textBold="true"
          :variant="data.tier ? 'success' : 'danger'"
          :dot="true"
          size="sm"
          shape="circle"
        />
        <span class="ml-2">{{ data.role }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import Badge from '@common/Badge'

export default {
  components: {
    Badge,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
}
</script>
