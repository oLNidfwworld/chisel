<script setup lang="ts">
import type Swiper from "swiper";
import type { KeyedObject } from "~/assets/types/entity/data-object";
import type { ObjectShorted } from "~/assets/types/entity/object-detail";
import NavArrows from "~/components/ui/nav-arrows.vue";
import ObjectSlider from "~/components/ui/ObjectViews/object-slider.vue";
import ServiceSlider from "~/components/ui/Services/service-slider.vue";
import Submenu from "~/components/ui/submenu.vue";
const { data: recommended } = await useApiFetch<{ items: ObjectShorted[] }>(`/Catalog`);
const { data: usefullLinks } = await useFetch('/api/usefull-links', {
  key: 'usefullLinks',
  transform(input) {
    return {
      ...(input as KeyedObject),
      fetchedAt: new Date()
    } 
  },
  getCachedData(key, nuxtApp) {
    const data = nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    if (!data) {
      return;
    }
    const expirationDate = new Date(data.fetchedAt);
    expirationDate.setTime(expirationDate.getTime() + 0.5 * 3600 * 1000); 
    const isExpired = expirationDate.getTime() < Date.now();
    if (isExpired) {
      return;
    } 
    return data;
  },
});  
useSeoMeta({
  title: 'Купить, снять квартиру и другую недвижимость | Эксперт ',
  description: 'Эксперт - аренда и продажа недвижимости в Москве и Московской области. Описание объектов, фото, контакты продавца.'
}); 
const servicesSlider = ref<Swiper>(); 
const bestsSlider = ref<Swiper>(); 
</script> 
<template>
   <div class="container">
      <section>
         <h2 class="title-md-bottom-margin title-md">Полезные ссылки</h2>
         <div
            v-if="usefullLinks?.links"
            class="submenus-wrapper">
            <Submenu
               v-for="(linksTab, index) in usefullLinks.links"
               :key="index"
               :title="linksTab.name">
               <ul class="menu-col">
                  <li
                     v-for="(link, linkIndex) in linksTab.links"
                     :key="linkIndex">
                     <NuxtLink :href="link.link">{{ link.name }} &nbsp; <span>{{ link.count > 0 ? link.count : ''  }}</span></NuxtLink>
                  </li>
               </ul>
            </Submenu>
         </div>
      </section>
      <section v-if="recommended?.items && recommended.items.length > 0">
         <div class="flex-center-between title-md-bottom-margin">
            <h2 class=" title-md">Выгодные предложения</h2>
            <ClientOnly>
               <NavArrows
                  :swiper-instance="bestsSlider"/>
            </ClientOnly>
         </div> 
         <ClientOnly>
            <ObjectSlider
               :items="recommended?.items"    
               @swiper="bestsSlider = $event" />
         </ClientOnly>
      </section>
      <section>
         <div class="flex-center-between title-md-bottom-margin">
            <h2 class=" title-md">Услуги</h2>
            <ClientOnly>
               <NavArrows
                  :swiper-instance="servicesSlider"/>
            </ClientOnly>
         </div> 
         <ClientOnly>
            <ServiceSlider @swiper="servicesSlider = $event" />
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
