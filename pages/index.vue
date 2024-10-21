<script setup lang="ts">
import type { ObjectShorted } from "~/assets/types/entity/object-detail";
import ObjectSlider from "~/components/ui/ObjectViews/object-slider.vue";
import ServiceSlider from "~/components/ui/Services/service-slider.vue";
import Submenu from "~/components/ui/submenu.vue";
const { data: recommended } = await useApiFetch<{ items: ObjectShorted[] }>(`/Catalog`); 
</script>
<template>
  <div class="container">
    <section>
      <h2 class="title-md-bottom-margin title-md">Полезные ссылки</h2>
      <div class="submenus-wrapper">
        <Submenu title="Купить квартиру">
          <ul class="menu-col">
            <li>
              <NuxtLink>1-комнатные 1 933</NuxtLink>
            </li>
            <li>
              <NuxtLink>2-комнатные 1 649</NuxtLink>
            </li>
            <li>
              <NuxtLink>3-комнатные 759</NuxtLink>
            </li>
            <li>
              <NuxtLink>Квартиры-студии 541</NuxtLink>
            </li>
            <li>
              <NuxtLink>Комнаты в квартире 18</NuxtLink>
            </li>
          </ul>
        </Submenu>
        <Submenu title="Купить квартиру">
          <ul class="menu-col">
            <li>
              <NuxtLink>1-комнатные 1 933</NuxtLink>
            </li>
            <li>
              <NuxtLink>2-комнатные 1 649</NuxtLink>
            </li>
            <li>
              <NuxtLink>3-комнатные 759</NuxtLink>
            </li>
            <li>
              <NuxtLink>Квартиры-студии 541</NuxtLink>
            </li>
            <li>
              <NuxtLink>Комнаты в квартире 18</NuxtLink>
            </li>
          </ul>
        </Submenu>
        <Submenu title="Купить квартиру">
          <ul class="menu-col">
            <li>
              <NuxtLink>1-комнатные 1 933</NuxtLink>
            </li>
            <li>
              <NuxtLink>2-комнатные 1 649</NuxtLink>
            </li>
            <li>
              <NuxtLink>3-комнатные 759</NuxtLink>
            </li>
            <li>
              <NuxtLink>Квартиры-студии 541</NuxtLink>
            </li>
            <li>
              <NuxtLink>Комнаты в квартире 18</NuxtLink>
            </li>
          </ul>
        </Submenu>
        <Submenu title="Купить квартиру">
          <ul class="menu-col">
            <li>
              <NuxtLink>1-комнатные 1 933</NuxtLink>
            </li>
            <li>
              <NuxtLink>2-комнатные 1 649</NuxtLink>
            </li>
            <li>
              <NuxtLink>3-комнатные 759</NuxtLink>
            </li>
            <li>
              <NuxtLink>Квартиры-студии 541</NuxtLink>
            </li>
            <li>
              <NuxtLink>Комнаты в квартире 18</NuxtLink>
            </li>
          </ul>
        </Submenu>
      </div>
    </section>
    <section v-if="recommended?.items && recommended.items.length > 0">
      <h2 class="title-md-bottom-margin title-md">Выгодные предложения</h2>
      <ClientOnly>
        <ObjectSlider :items="recommended?.items"/>
      </ClientOnly>
    </section>
    <section>
      <h2 class="title-md-bottom-margin title-md">Услуги</h2>
      <ClientOnly>
        <ServiceSlider />
      </ClientOnly>
    </section>
  </div>
</template>
<style lang="scss" scoped>
@use "/assets/styles/base/variables/colors.scss" as variable;
@use "/assets/styles/mixins/media.scss" as media;
.menu-col {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.submenus-wrapper {
  display: grid;
  gap: 27px;
  @include media.min-llg {
    gap: 20px;
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
