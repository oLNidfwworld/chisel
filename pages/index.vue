<script setup lang="ts">
import type { ObjectShorted } from "~/assets/types/entity/object-detail";
import ObjectSlider from "~/components/ui/ObjectViews/object-slider.vue";
import ServiceSlider from "~/components/ui/Services/service-slider.vue";
import Submenu from "~/components/ui/submenu.vue";
const { data: recommended } = await useApiFetch<{ items: ObjectShorted[] }>(`/Catalog`); 
const { data : usefullLinks } = await useFetch('/api/usefull-links');   
</script>
<template>
  <div class="container">
    <section>
      <h2 class="title-md-bottom-margin title-md">Полезные ссылки</h2>
      <div class="submenus-wrapper">
        <Submenu v-for="(linksTab, index) in usefullLinks" :key="index" title="Купить квартиру">
          <ul class="menu-col">
            <li v-for="(link, linkIndex) in linksTab.links" :key="linkIndex" >
              <NuxtLink :href="link.link">{{ link.name }}</NuxtLink>
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
