<template>
  <nav aria-label="primary" class="navigation">
    <div class="relative group">
      <button class="profile">
        <div class="relative w-8 h-8">
          <img class="img-avatar" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="Avatar" />
        </div>

        <div class="ml-4 text-base font-normal">
            Hi, qa@loket.com
          </div>
      </button>

      <div class="absolute z-10 right-0 hidden bg-grey-50 group-hover:block">
        <div class="p-2 bg-white bg-gray-50 shadow-lg">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 text-base">
            <a href="javascript:void(0)">
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>  
  </nav>
</template>
<style lang="scss" scoped>
.navigation {
  @apply relative z-20 flex-col flex-grow hidden pb-4 md:pb-0 md:flex md:justify-end md:flex-row;

  .profile {
    @apply flex flex-row items-center w-full px-4 py-4 mt-2 text-base font-bold text-left text-gray-50 bg-transparent rounded-lg;
    @apply md:w-auto md:mt-0 md:ml-4 focus:outline-none;

    .img-avatar {
      @apply rounded-full border border-gray-100 shadow-sm;
    }
  }
}
</style>