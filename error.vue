<script setup>
import Btn from "./components/base/btn.vue";
import { useRoute } from "nuxt/app";
import { onMounted } from "vue";
import EFooter from "/components/layout/EFooter/index.vue";
import EHeader from "/components/layout/EHeader.vue";

definePageMeta({
  layout: "no-filter",
});

const props = defineProps(["error"]);
console.log(props);
const route = useRoute();

const svg404 = ref(null);
const loaded = ref(false);

const randInt = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

onMounted(() => {
  loaded.value = true;
  const groupOfPaths = svg404.value.querySelectorAll("path");
  let initialDelay = 300;
  groupOfPaths.forEach((svgPath) => {
    svgPath.style.opacity = 0;

    let offsettedInt = 0;
    if (randInt(0, 1) === 1) {
      offsettedInt = -150;
    } else {
      offsettedInt = 150;
    }

    const randStartTranslateX = offsettedInt + randInt(-5, 5);
    const randStartTranslateY = -offsettedInt + randInt(-5, 5);

    const randStartScale = 1;

    const keyframes = [
      {
        transform: `translateX(${randStartTranslateX}px) translateY(${randStartTranslateY}px) scale(${randStartScale})`,
        opacity: 0,
      },
      {
        transform: "translateX(0px) translateY(0px) scale(1)",
        opacity: 1,
      },
    ];

    const timings = {
      duration: 500,
      delay: initialDelay,
      iterations: 1,
    };
    setTimeout(() => {
      svgPath.style.opacity = 1;
    }, initialDelay + 500);
    initialDelay += 15;
    svgPath.animate(keyframes, timings);
  });
});
</script>
<template>
  <div class="page-wrapper">
    <EHeader />
    <main class="page-content error">
      <div class="container">
        <div v-if="error.statusCode == 404" class="error__description">
          <div class="error__wrapper">
            <div id="animate-it" ref="svg404">
              <INotFound filled />
            </div>
            <div class="error__desc-404">
              <p class="error__title-404">
                Страница, которую вы запрашиваете, не существует!
              </p>
              <p class="error__subdesc-404">
                Возможно она устарела, была удалена или был введен неверный адрес в
                адресной строке.
              </p>
              <Btn to="/">На главную</Btn>
            </div>
          </div>
        </div>
        <div v-else class="error__description">
          <div class="error__code">{{ error.statusCode }}</div>
          <p>
            Произошла непредвиденная ошибка! <br />
            Пожалуйста, свяжитесь с разработчиками
          </p>
        </div>
        <div v-if="route.query.admindebug == 1" class="error__debug-trace">
          <pre v-html="error.stack" />
        </div>
      </div>
    </main>
    <EFooter />
  </div>
</template>
<style lang="scss">
@import url("/assets/styles/layouts/default.scss");

.text-wrap-balance {
  text-wrap: balance;
}

#animate-it {
  width: 100%;

  svg {
    overflow: visible;
    width: 100% !important;
  }
}

.error {
  display: flex;
  align-items: center;
  background: linear-gradient(180deg, #dcf0ff, #f0f3f5);
  justify-content: center;
  margin-bottom: 0 !important;
  min-height: 80vh;
  overflow: hidden;
  padding-top: 90px;

  &__desc404 {
    line-height: normal;
    text-align: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-wrap: balance;

    @include min-llg {
      text-align: left;
      align-items: center;
    }
  }
  &__desc-404 {
    display: flex;
    flex-direction: column;
    gap: 12px;
    justify-content: space-around;
  }
  &__title-404 {
    font-size: 24px;
    font-weight: 700;
  }

  &__subdesc-404 {
    font-size: 18px;
    line-height: 1.5;
    font-weight: 600;
  }

  &__wrapper {
    display: grid;
    gap: 93px;
    justify-items: center;

    @include min-lg {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__code {
    @apply text-[100px] md:text-[200px] lg:text-[340px] my-8;
  }

  &__description {
    @apply text-[15px] md:text-[30px];
  }

  &__debug-trace {
    @apply text-left text-[20px];
    padding: 0 20px;
    margin: 30px 0;
    background: black;
    color: #2dff2d;

    pre {
      white-space: break-spaces;
    }
  }
}
</style>
