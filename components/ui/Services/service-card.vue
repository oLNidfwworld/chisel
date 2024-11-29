<script setup lang="ts">
defineProps<{
  item : {
    cardImage : string,
    cardDescription : string,
    h1 : string
    _path: string
  }
}>();
</script>
<template>
   <NuxtLink
      :href="item._path"
      class="service-card">
      <picture class="service-card__picture">
         <source :srcset="item.cardImage" >
         <img
            class="service-card__img"
            alt="Name" >
      </picture>
      <div class="service-card__content">
         <h3 class="service-card__title">{{ item.h1 }}</h3>
         <p class="service-card__desc">
            {{ item.cardDescription }}
         </p>
      </div>
   </NuxtLink>
</template>
<style lang="scss" scoped>
@use "/assets/styles/base/variables/colors.scss" as variable;
@use "/assets/styles/mixins/media.scss" as media;
.service-card {
  display: block;
  border-radius: variable.$border-sm;
  overflow: hidden;
  &__title {
    font-weight: 700;
    font-size: 15px;
  }
  &__desc {
    line-height: 1.57;
    font-size: 14px;
  }
  &__content {
    grid-area: B;
    display: flex;
    flex-direction: column;
    gap: 14px;
    background-color: #f3f3f3;
    padding: 20px;
    @include media.min-sm {
      padding: 18px 20px;
    }
    @include media.min-md {
      padding: 18px 23px;
    }
    @include media.min-llg {
      padding: 19px 31px;
    }
  }
  &__img { 
    object-fit: cover;
    max-height: 217px;
    aspect-ratio: 4/3;
    width: 100%;
    height: 100%;
    @include media.min-llg {
      max-height: unset;
    }
  }
  &__picture {
    grid-area: A;
  }
  @include media.min-llg {
    max-height: 240px;
    display: grid;
    grid-template-areas: "A B";
    grid-template-columns: 232px auto;
    max-height: 217px;
  }
}
</style>
