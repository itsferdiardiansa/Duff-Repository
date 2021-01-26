<template>
  <transition name="slide-fade" appear>
    <div class="card">
      <slot></slot>
    </div>
  </transition>
</template>
<style lang="scss" scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  // transform: translateX(20px);
  opacity: 0;
}

.card {
  @apply bg-gray-50 rounded-lg overflow-hidden flex flex-col;
  flex: 0 1 24%;

  .organizer {
    &::before {
      content: '';
      padding-top: 15px;
      display: flex;
      align-items: center;
      border-top: 1px dashed #e5e5e5;
    }
  }
}
</style>
