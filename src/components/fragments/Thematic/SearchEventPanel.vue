<template>
  <div class="se-panel">
    <div class="se-panel-title">Search Event</div>

    <div class="se-panel-content">
      <div class="se-search-control">
        <Input
          ref="searchInputRef"
          placeholder="Relaxation at the beach ..."
          :autofocus="true"
          v-model="keyword"
          @input="handleSearchInput"
        />
      </div>

      <div class="se-search-content">
        <template v-if="events.onError && !events.isFetching">
          <div class="se-search-failed">
            <div class="se-search-failed--thumb">
              <img svg-inline src="@icon/empty.svg" />
            </div>

            <div class="se-search-failed--control">
              <Button
                variant="dark"
                :icon="['fa', 'redo-alt']"
                @click="fetchEvents"
                :pill="true"
              />
              <span class="ml-2">We failed to load your events</span>
            </div>
          </div>
        </template>
        <template v-if="events.isFetching">
          <div class="se-search-loader">
            <template v-for="item in range(6)" :key="item">
              <div class="se-loader-item">
                <div class="se-loader-item--thumb">
                  <Rect width="100px" height="100%" />
                </div>

                <div class="se-loader-item--desc">
                  <Rect width="90%" height="10px" />
                  <Rect width="40%" height="10px" />
                </div>
              </div>
            </template>
          </div>
        </template>
        <template v-else-if="!events.isFetching && !events.onError">
          <div class="se-result">
            <template v-if="events.items.length">
              <template v-for="(item, key) in events.items" :key="key">
                <div
                  :class="[
                    `se-result-item`,
                    { selected: selectedId === item.id_event },
                  ]"
                  @click="selectEvent(item)"
                >
                  <div class="se-item-thumb">
                    <img
                      class="overflow-hidden"
                      v-lazy="item.event_banner"
                      :alt="item.event_name"
                    />
                  </div>

                  <div class="se-item-desc">
                    <label
                      class="font-bold"
                      v-html="formatText(item.event_name, 40, 'title')"
                    ></label>
                    <p
                      class="text-xs text-gray-500"
                      v-html="formatText(item.description, 150)"
                    ></p>
                  </div>
                </div>
              </template>
            </template>
            <template v-else>
              <div class="se-search-notfound">
                <div class="se-search-notfound--thumb">
                  <img svg-inline src="@icon/empty.svg" />
                </div>

                <div class="se-search-notfound--desc">
                  <label>Event not found</label>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { onMounted, reactive, ref, unref } from 'vue';
import { Input } from '@common/Form';
import Button from '@common/Button';
import Spinner from '@common/Loader/Spinner';
import { Rect } from '@common/Skeleton';
import EventService from '@service/api/event';
import { debounce, truncateText, range } from '@util';

export default {
  name: 'ThematicActionForm',
  components: {
    Button,
    Input,
    Spinner,
    Rect,
  },
  props: {
    idEvent: {
      type: Number,
      default: -1,
    },
  },
  emits: ['selected'],
  setup(props, { emit }) {
    const searchInputRef = ref();
    const keyword = ref('');
    const selectedId = ref(-1);
    const events = reactive({
      isFetching: 0,
      onError: false,
      items: [],
    });

    const fetchEvents = async () => {
      Object.assign(events, {
        isFetching: ++events.isFetching,
        onError: false,
      });

      try {
        const response = await EventService.getList(unref(keyword));
        const collections = await response.data;

        Object.assign(events, {
          items: collections?.result?.data?.result?.details,
        });
      } catch (error) {
        Object.assign(events, {
          onError: true,
        });
      } finally {
        events.isFetching = --events.isFetching;
      }
    };

    const formatText = (value, limit = 300, type = 'desc') => {
      return value?.length
        ? truncateText(value, limit)
        : type === 'desc'
        ? 'No Desc'
        : 'No Title';
    };

    const selectEvent = item => {
      selectedId.value = item.id_event;

      emit('selected', item);
    };

    const handleSearchInput = debounce(e => {
      fetchEvents();
    }, 800);

    onMounted(() => {
      selectedId.value = props.idEvent;

      fetchEvents();
    });

    return {
      searchInputRef,
      selectedId,
      keyword,
      events,
      range,
      formatText,
      selectEvent,
      fetchEvents,
      handleSearchInput,
    };
  },
};
</script>
<style lang="scss">
// se = search-event
.se {
  &-panel {
    width: 600px;

    &-title {
      @apply text-lg font-bold;
    }

    &-content {
      @apply mt-4;
    }
  }

  &-search {
    &-control {
      @apply mt-4;
    }

    &-content {
      @apply grid grid-rows-1 gap-3 mt-4;
      max-height: 400px;
      min-height: 400px;

      .se-result {
        @apply flex-col overflow-y-scroll;

        &-item {
          @apply grid cursor-pointer hover:bg-blue-100 duration-500 items-center p-4 rounded-lg
          overflow-hidden;
          grid-template-columns: 100px 1fr;
          height: 80px;

          &.selected {
            @apply bg-blue-200 sticky top-0 z-50;
          }

          .se-item {
            &-thumb {
              @apply h-full w-full overflow-hidden;
              background-color: rgb(206, 206, 206);

              img {
                @apply w-full h-full object-cover duration-500 opacity-100;

                &[lazy='loading'] {
                  @apply opacity-0;
                }
              }
            }

            &-desc {
              @apply h-full justify-start ml-4 pointer-events-none break-all overflow-hidden;
            }
          }
        }
      }
    }

    &-loader {
      @apply grid grid-flow-row gap-3 items-center;

      .se-loader {
        &-item {
          @apply grid px-4 py-2;
          grid-template-columns: 100px 1fr;
          height: 80px;

          &--thumb {
          }

          &--desc {
            @apply ml-4 mt-2;

            span {
              @apply block;

              &:first-child {
                @apply mb-2;
              }
            }
          }
        }
      }
    }

    &-failed,
    &-notfound {
      @apply h-full flex flex-col justify-center items-center my-4;

      &--thumb {
        svg {
          @apply h-full w-6/12 mx-auto mb-6;
        }
      }

      &--desc {
        @apply text-center mt-4;

        label {
        }
      }
    }
  }
}
</style>
