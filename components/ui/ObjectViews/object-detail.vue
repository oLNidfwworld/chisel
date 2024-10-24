<script setup lang="ts">
import Btn from "~/components/base/btn.vue";
import AgentCard from "~/components/ui/Agent/agent-card.vue"; 
import type { Swiper } from "swiper";
import type { ObjectDetail } from "~/assets/types/entity/object-detail";
import { useFavoriteStore } from "~/store/fav";
import { useVueToPrint } from "vue-to-print";
interface IProps {
  objectItem: ObjectDetail;
}

const route = useRoute(); 
const props = defineProps<IProps>(); 
const price = computed(() => props.objectItem.price.toLocaleString("ru-RU"));

const thumbsSwiper = ref<Swiper>();
const setThumbsSwiper = (swiperInstance: Swiper) => {
  thumbsSwiper.value = swiperInstance;
};
const slider = ref<Swiper>();
const setSlider = (swiperInstance: Swiper) => {
  slider.value = swiperInstance;
};
const slideThumb = (dir: string) => {
  if (!slider.value) return;
  switch (dir) {
    case "next":
      slider.value.slideNext();
      break;
    case "prev":
      slider.value.slidePrev();
      break;
  }
};

const seoData = reactive({
  title : `${props.objectItem.name} | Эксперт`,
  description : `Купить ${props.objectItem.name} по цене ${price.value}р. в АН "Эксперт"`
});
useSeoMeta({
  title: seoData.title,
  description : seoData.description
}); 
const shareLinksShow = ref(false);
const share = async () => {
  if ("navigator" in window && "share" in navigator) {
    await navigator.share({
      title: seoData.title,
      url: route.fullPath,
      text: seoData.description,
    });
  } else {
    shareLinksShow.value = !shareLinksShow.value;
  }
};

const favStore = useFavoriteStore();
const isFav = favStore.isFavorite(props.objectItem.id);
const mapVisible = ref(false); 

const componentRef = ref();
const { handlePrint } = useVueToPrint({
  content: componentRef,
  documentTitle: props.objectItem.name,
  removeAfterPrint: true
});
</script>
<template>
  <div ref="componentRef" class="object-detail container">
    <div class="object-detail__top-row">
      <ClientOnly>
        <div>
          <Swiper
            :modules="[SwiperThumbs]"
            :space-between="30"
            :thumbs="{ swiper: thumbsSwiper }"
            class="object-detail-slider"
            @swiper="setSlider"
          >
            <SwiperSlide
              v-for="(photo, i) in objectItem.photos"
              :key="i"
              class="object-detail-slide"
            >
              <picture>
                <source :srcset="apiServerUrl(photo.websrc)" />
                <img class="object-detail-slide__image" alt="" />
              </picture>
            </SwiperSlide>
          </Swiper>
          <div class="object-detail-thumbs-slider__outer">
            <button
              class="object-detail-thumbs-slider__nav-btn object-detail-thumbs-slider__nav-btn--prev"
              @click="() => slideThumb('prev')"
            >
              <IArrowNav filled />
            </button>
            <button
              class="object-detail-thumbs-slider__nav-btn object-detail-thumbs-slider__nav-btn--next"
              @click="() => slideThumb('next')"
            >
              <IArrowNav filled />
            </button>
            <Swiper
              watch-slides-progress
              :modules="[SwiperThumbs]"
              slides-per-view="auto"
              :space-between="30"
              class="object-detail-thumbs-slider"
              @swiper="setThumbsSwiper"
            >
              <SwiperSlide
                v-for="(photo, i) in objectItem.photos"
                :key="i"
                class="object-detail-thumbs-slide"
              >
                <div class="object-detail-thumbs-slide__wrapper">
                  <picture>
                    <source :srcset="apiServerUrl(photo.websrc)" />
                    <img class="object-detail-thumbs-slide__image" alt="" />
                  </picture>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </ClientOnly>
      <div class="object-detail__content">
        <div class="object-detail__block object-detail__block--flex">
          <div class="object-detail__mini-info">
            <!-- <span> Просмотров: <span class="font-bold">4</span> </span> -->
            <span> id{{ objectItem.productId }} </span>
          </div>
          <h1 class="object-detail__title" v-html="objectItem.name" />
          <span class="object-detail__red">{{ price }} ₽</span>
          <span class="object-detail__adr font-semibold">{{ objectItem.location }}</span>
        </div>
        <div class="object-detail__block">
          <!-- <PropsRow />
          <PropsRow light /> -->
        </div>
        <div class="object-detail__block object-detail__block--2cols">
          <div class="object-detail__btns">
            <ClientOnly>
              <Btn
                class="object-detail__tool-btn"
                preference="gray"
                :class="{ 'object-detail__tool-btn--active': isFav }"
                @click="favStore.changeFavorite(props.objectItem.id)"
              >
                <IFav filled /> <template v-if="isFav"> В избранном </template>
                <template v-else> В избранное </template>
              </Btn>
            </ClientOnly>
            <Btn 
              v-if="!Array.isArray(objectItem.coordinates)"
              :class="{ 'object-detail__tool-btn--active': mapVisible }" class="object-detail__tool-btn" preference="gray"  @click="mapVisible = !mapVisible" >
              <IPlacemark filled />На карте
            </Btn>
            <Btn class="object-detail__tool-btn" preference="gray" @click="handlePrint" >
              <IPrint filled /> Версия для печати
            </Btn>
            <div class="share">
              <Btn class="object-detail__tool-btn" preference="gray" @click="share">
                <IShare filled /> Поделиться
              </Btn>
              <Transition name="share-show">
                <div v-if="shareLinksShow" class="share__links">
                  <a :href="`https://t.me/share/url?url=${route.fullPath}&text=${seoData.description} `" target="_blank">
                    <ITelegram />
                  </a>
                  <a :href="`https://api.whatsapp.com/send?text=${seoData.description} ${route.fullPath}`" target="_blank">
                    <IWhatsupWhite />
                  </a>
                  <a
                    :href="`https://connect.ok.ru/offer?url=${route.fullPath}&title=${seoData.title}`"
                    target="_blank"
                  >
                    <IOk />
                  </a>
                  <a :href="`http://vk.com/share.php?url=${route.fullPath}&title=${seoData.title}`" target="_blank">
                    <IVKWhite />
                  </a>
                </div>
              </Transition>
            </div>
          </div>
          <AgentCard :agent="objectItem.agent"/>
        </div>
      </div>
    </div>
    <div class="object-detail__description">
      <p>
        {{ objectItem.description }}
      </p>
    </div>
    <div v-if="mapVisible && !Array.isArray(objectItem.coordinates)" class="object-detail__map-wrapper">
      <ClientOnly>
        <YandexMap
          class="object-detail__map"
          :coordinates="[objectItem.coordinates.lat, objectItem.coordinates.lon]"
        >
          <YandexMarker
            :coordinates="[objectItem.coordinates.lat, objectItem.coordinates.lon]"
            :options="{
              iconLayout: 'default#imageWithContent',
              iconImageHref: '/ekspertMarker.svg',
              iconImageSize: [50, 50],
              iconImageOffset: [-25, -55],
            }"
            :marker-id="objectItem.id"
          >
            <template #component>
              {{ objectItem.location }}
            </template>
          </YandexMarker>
        </YandexMap>
      </ClientOnly>
    </div>
  </div>
</template>
<style lang="scss"> 
@use "/assets/styles/base/variables/colors.scss" as variable;
@use "/assets/styles/mixins/media.scss" as media;
@use "/assets/styles/components/object-detail.scss";

</style>
