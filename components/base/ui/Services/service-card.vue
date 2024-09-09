<template>
  <div class="service-card">
    <picture class="service-card__picture">
      <source srcset="/test.png" />
      <img class="service-card__img" alt="Name" />
    </picture>
    <div class="service-card__content">
      <h3 class="service-card__title">Покупка недвижимости</h3>
      <p class="service-card__desc">
        Одно из основных направлений работы агентства недвижимости «Эксперт» – оказание
        квалифицированной помощи клиентам, которые планируют приобрести жилую
        или коммерческую недвижимость
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.service-card {
  border-radius: $border-sm;
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
    @include min-sm {
      padding: 18px 20px;
    }
    @include min-md {
      padding: 18px 23px;
    }
    @include min-llg {
      padding: 19px 31px;
    }
  }
  &__img {
    width: 100%;
    object-fit: cover;
    max-height: 217px;
    @include min-llg {
      max-height: unset;
    }
  }
  &__picture {
    grid-area: A;
  }
  @include min-llg {
    max-height: 240px;
    display: grid;
    grid-template-areas: "A B";
    grid-template-columns: 232px auto;
    max-height: 217px;
  }
}
</style>
