<script setup>
// import PictureDetailSlider from "../../components/Catalog/PictureDetailSlider.vue";
// import PhoneDetailBtn from "~/components/Base/PhoneDetailBtn.vue"  
// import Pagination from "~/components/Base/Pagination";
import { inject } from "vue";
import Btn from "~/components/base/btn.vue";
import AgentCard from "../Agent/agent-card.vue";
import PropsRow from "../props-row.vue";
import BargainingMap from "./BargainingMap.vue";
import EPopupForm from "../e-popup-form.vue";
import Pagination from "~/components/base/pagination.vue"; 
import ObjectList from "../ObjectViews/object-list.vue";


const props = defineProps({
  similar: {
    type : Object,
    required: true,
  },
  photos: {
    type : Array,
    required: true,
  },
  minPrice: {
    type : [String, Number],
    required: true,
  },
  minSquare: {
    type : [String, Number],
    required: true,
  },
});
const route = useRoute();

const price = computed(() => props.minPrice.toLocaleString('ru-RU'))
const print = () => {
  window.print()
}

const mapElement = ref(null)
const myPhone = ref('')
const validation = ref(false), validationMessage = ref('');
const show = ref(false), title = ref(''), content = ref('');
const callbackMe = async () => {

  if (myPhone.value.length < 17) {
    validationMessage.value = 'Неверный формат номера телефона'
    validation.value = false;
  } else {
    validation.value = true;
    validationMessage.value = ''
  }

  if (validation.value) {
    const { data: res } = await useApiFetchWithRefresh('/Mail/', {
      method: 'POST',
      params: {
        action: 'DETAIL_FORM_CALLBACK',
        phone: myPhone.value,
        TITLE: `Заявка на обратный звонок по участкам МКР Трубицыно`,
      }
    })
    show.value = true;
    if (res.value.status) {
      title.value = 'Заявка успешно отправленна!'
      content.value = 'Мы свяжемся с вами'
    } else {
      title.value = 'Ошибка'
      content.value = 'Произошла непредвиденная ошибка'
    }
  }
}


const transformIntoObjectCard = () => {
  const pageData = props.similar.slice((currentPage.value - 1) * pageSize, currentPage.value * pageSize);
  return pageData.map((pageEl) => {
    return {
      NAME: pageEl.NAME,
      PHOTO: (pageEl.PHOTOS.length > 0) ? pageEl.PHOTOS.map(photo => photo?.resizedPath || '') : pageEl?.PHOTOS[0]?.resizedPath || '',
      PRICE: pageEl.PRICE, 
    }
  });
}
const pageSize = 3, currentPage = ref(1);
const pageContent = ref(transformIntoObjectCard());
watch(() => currentPage.value, ( ) => {
  pageContent.value = transformIntoObjectCard();
});

const injected = inject('fromIBargainingToPreview', null);

const shareLinksShow = ref(false);
const seoData = reactive({
  title: `Участки трубицыно | Эксперт`,
  description: `Участки МКР Трубицыно`
});
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
const thumbsSwiper = ref();
const setThumbsSwiper = (swiperInstance) => {
  thumbsSwiper.value = swiperInstance;
};
const slider = ref();
const setSlider = (swiperInstance) => {
  slider.value = swiperInstance;
};
const slideThumb = (dir) => {
  switch (dir) {
    case "next":
      slider.value.slideNext();
      break;
    case "prev":
      slider.value.slidePrev();
      break;
  }
}; 
</script>
<template>
  <div class="object-detail container">
    <div class="object-detail__top-row">
      <div>
        <Swiper 
          :modules="[SwiperThumbs]" :space-between="30" :thumbs="{ swiper: thumbsSwiper }"
          class="object-detail-slider" @swiper="setSlider">
          <SwiperSlide v-for="(photo, i) in photos" :key="i" class="object-detail-slide">
            <picture>
              <source :srcset="apiServerUrl(photo.resizedPath)" />
              <img class="object-detail-slide__image" alt="" />
            </picture>
          </SwiperSlide>
        </Swiper>
        <div class="object-detail-thumbs-slider__outer">
          <button 
            class="object-detail-thumbs-slider__nav-btn object-detail-thumbs-slider__nav-btn--prev"
            @click="() => slideThumb('prev')">
            <IArrowNav filled />
          </button>
          <button 
            class="object-detail-thumbs-slider__nav-btn object-detail-thumbs-slider__nav-btn--next"
            @click="() => slideThumb('next')">
            <IArrowNav filled />
          </button>
          <Swiper 
            watch-slides-progress :modules="[SwiperThumbs]" slides-per-view="auto" :space-between="30"
            class="object-detail-thumbs-slider" @swiper="setThumbsSwiper">
            <SwiperSlide v-for="(photo, i) in photos" :key="i" class="object-detail-thumbs-slide">
              <div class="object-detail-thumbs-slide__wrapper">
                <picture>
                  <source :srcset="apiServerUrl(photo.resizedPath)" />
                  <img class="object-detail-thumbs-slide__image" alt="" />
                </picture>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div class="object-detail__content">
        <div class="object-detail__block object-detail__block--flex">
          <h1 class="object-detail__title">Продажа земельных участков под ИЖС в мкр. Трубицыно
            Павлово-Посадского района</h1>
          <span class="object-detail__red">от {{ price }} ₽</span>
        </div>
        <!-- <p class="font-semibold">МКР Трубицыно Участок </p> -->
        <div class="object-detail__block">
          <PropsRow
          :items="[
            { 
              name : 'Площадь м<sup>2</sup>',
              value : minSquare
            }
          ]"/> 
        </div>
        <div class="object-detail__block object-detail__block--2cols">
          <div class="object-detail__btns">

            <Btn class="btn gray object-detail__tool-btn" @click="print">
              <IPrint filled /> Версия для печати
            </Btn>
            <div class="share">
              <Btn class="btn gray object-detail__tool-btn" preference="gray" @click="share">
                <IShare filled /> Поделиться
              </Btn>
              <Transition name="share-show">
                <div v-if="shareLinksShow" class="share__links">
                  <a 
                    :href="`https://t.me/share/url?url=${route.fullPath}&text=${seoData.description} `"
                    target="_blank">
                    <ITelegram />
                  </a>
                  <a 
                    :href="`https://api.whatsapp.com/send?text=${seoData.description} ${route.fullPath}`"
                    target="_blank">
                    <IWhatsupWhite />
                  </a>
                  <a :href="`https://connect.ok.ru/offer?url=${route.fullPath}&title=${seoData.title}`" target="_blank">
                    <IOk />
                  </a>
                  <a :href="`http://vk.com/share.php?url=${route.fullPath}&title=${seoData.title}`" target="_blank">
                    <IVKWhite />
                  </a>
                </div>
              </Transition>
            </div>
          </div>
          <div>

            <AgentCard :agent="{ name: 'kek', phone: '8-901-517-86-51' }" />
          </div>
        </div>
      </div>
    </div>
    <div class="object-detail__description">
      <h3 class="mb-2 sm:mb-5 text-[18px] sm:text-[24px] font-semibold text-center">Микрорайон Трубицыно ищет жильцов!
      </h3>
      <p class="text-[14px] sm:text-[18px] mb-3 sm:mb-6">Мечтаете жить в гармонии с природой и подальше от городского
        шума и суеты?
        Но при этом не готовы отказываться от благ цивилизации?
      </p>
      <h3 class="mb-2 sm:mb-5 text-[18px] sm:text-[24px] font-semibold text-center">Тогда микрорайон Трубицыно – это как
        раз то, что вам нужно!</h3>
      <p class="text-[14px] sm:text-[18px]">
        Это уникальное место для жизни, в котором удивительным образом сочетаются удачное расположение, близость к
        природе и развитая инфраструктура. <br />
        Расположенный всего в 500 м. от г. Павловский Посад, на опушке смешанного леса близ реки Ходца, он удивительным
        образом сочетает в себе все прелести загородной жизни и городской инфраструктуры.
        <br />
        В настоящее время в микрорайоне построены внутриквартальные дороги и осуществляется подключение к
        электроснабжению.
        <br />
        Приобрести земельный участок в микрорайоне Трубицыно Павлово-Посадского района можно прямо сейчас!
        <br />
        Мы предлагаем вам участки под ИЖС различной площади – от 8 до 14 соток.
      </p>
    </div>
    <BargainingMap 
      ref="mapElement" :map-center="injected.mapCenter.value" :zoom="injected.zoom"
      :placements="injected.placements.value" />
    <div>
      <h2 class="title-md title-md-bottom-margin">Похожие объявления</h2>
      <div>
        <ClientOnly>
          <ObjectList :items="pageContent"/>
          <div class="flex-baseline-wrap gap-4 mt-4">
            <span class="font-bold">Страницы:</span>
            <Pagination v-model="currentPage" :total-items="similar.length" :items-per-page="pageSize" />
          </div>
        </ClientOnly>
      </div>
    </div>
    <EPopupForm :is-visible="show" @close="show = !show">
      <template #header>
        {{ title }}
      </template>
      <template #content>
        <p class="text-center">
          {{ content }}
        </p>
      </template>
    </EPopupForm>
  </div>
</template>
<style lang="scss" scoped>
@use "/assets/styles/components/object-detail.scss";
@use '/assets/styles/base/shortcuts.scss';
 
.yandex-container {
  height: 400px !important;
  width: 100% !important;
  overflow: hidden;
}  
</style> 