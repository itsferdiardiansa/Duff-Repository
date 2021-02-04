<template>
  <LayoutHeader />
  <LayoutSideBar />
  <LayoutContent />
</template>
<script>
import LayoutHeader from '@fragment/@Base/Header'
import LayoutSideBar from '@fragment/@Base/Sidebar'
import LayoutContent from '@fragment/@Base/Content'

export default {
  components: {
    LayoutHeader,
    LayoutSideBar,
    LayoutContent
  }
}
</script>
<style lang="scss" scoped>
.slide-leave-active,
.slide-enter-active {
  transition: 0.3s ease-in-out;
}
.slide-enter {
  transform: translate(-100%, 0);
}
.slide-leave-to {
  transform: translate(5%, 0);
  opacity: 0;
}

.content {
  margin-left: 225px;
  margin-top: 55px;
  text-align: left;
}
</style>
