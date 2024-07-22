<script setup>
const links = shallowReactive([
  {
    name: "Услуги",
    href: "/services/",
  },
  {
    name: "Юр. услуги",
    href: "/act-help/",
  },
  {
    name: "Ипотека",
    href: "/mortpage/",
  },
  {
    name: "О Компании",
    href: "/about/",
  },
  {
    name: "Контакты",
    href: "/contacts/",
  },
  {
    name: "Участки Трубицыно",
    href: "/bargaining/",
  },
]);
</script>
<template>
  <header class="page-header">
    <div class="page-header__wrapper container">
      <ILogoTypeOne filled />
      <nav class="page-header__nav">
        <ul class="page-header-nav">
          <li
            v-for="(link, index) in links"
            :key="index"
            class="page-header-nav__item"
          >
            <NuxtLink>{{ link.name }}</NuxtLink>
          </li>
        </ul>
      </nav>
      <button class="page-header__burger">
        <IBurger />
      </button>
      <a class="page-header__num" href="89015178651">+7 901 517-86-51</a>
      <ul class="page-header-controls">
        <li class="page-header-controls__item">
          <button class="page-header-controls__button">
            <ISearch filled />
          </button>
        </li>
        <li class="page-header-controls__item">
          <button class="page-header-controls__button">
            <IFav filled />
          </button>
        </li>
      </ul>
    </div>
  </header>
</template>
<style lang="scss">
.page-header {
  flex: 0 0;
  padding: 26px 0;
  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &__nav {
    display: none;
    width: fit-content;
    height: fit-content;

    @include min-xl {
      display: block;
    }
  }
  &__num {
    display: none;
    font-size: 20px;
    font-weight: 700;

    @include min-md {
      display: block;
    }
  }
  &__burger {
    display: block;
    @include min-xl {
      display: none;
    }
  }
}
.page-header-nav {
  display: flex;
  width: fit-content;
  justify-content: space-between;
  gap: 20px;
  font-size: 18px;
  font-weight: 700;
}
.page-header-controls {
  display: flex;
  gap: 15px;
}
</style>
