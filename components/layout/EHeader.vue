<script setup>
import { useUIstore } from "~/store/ui";

const links = shallowReactive([
  {
    name: "Услуги",
    href: "/services/",
  },
  {
    name: "Юр. услуги",
    href: "/services/act-help/",
  },
  {
    name: "Ипотека",
    href: "/services/mortpage/",
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

const burgerOpened = shallowRef(false);
const uiStore = useUIstore();
watch(burgerOpened, (newValue) => {
  uiStore.toggleOverlayVisibility(newValue);
});
</script>
<template>
  <header class="page-header">
    <div class="page-header__wrapper container">
      <NuxtLink to="/">
        <ILogoTypeOne filled />
      </NuxtLink>
      <nav class="page-header__nav" :class="{ opened: burgerOpened }">
        <button class="page-header__nav-cross" @click="burgerOpened = false">
          <ICross />
        </button>
        <ul class="page-header-nav">
          <li v-for="(link, index) in links" :key="index" class="page-header-nav__item">
            <NuxtLink :href="link.href" @click="burgerOpened = false">{{ link.name }}</NuxtLink>
          </li>
        </ul>
        <ul class="page-header__soc">
          <a href="https://wa.me/79015178651" rel="noopener noreferrer">
            <IWhatsupWhite filled />
          </a>
          <a href="mailto:ekspert07@bk.ru" rel="noopener noreferrer">
            <IEmailWhite filled />
          </a>
          <a href="https://vk.com/nedvizhimostpp" rel="noopener noreferrer">
            <IVKWhite filled />
          </a>
          <a
            href="https://www.youtube.com/channel/UCMF6FOeygEuzxZ5Mk7rOIgg"
            rel="noopener noreferrer"
          >
            <IYTWhite filled />
          </a>
        </ul>
      </nav>
      <button @click="burgerOpened = !burgerOpened" class="page-header__burger">
        <IBurger />
      </button>
      <a class="page-header__num" href="tel:89015178651">+7 901 517-86-51</a>
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
@use "/assets/styles/base/variables/colors.scss" as variable;
@use "/assets/styles/mixins/media.scss" as media;
.page-header {
  flex: 0 0;
  padding: 26px 0;

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__nav {
    width: fit-content;
    height: fit-content;
    position: fixed;
    width: 320px;
    right: -320px;
    top: 0;
    background-color: variable.$white;
    box-shadow: variable.$base-shadow;
    height: 100vh;
    padding: 0 15px;
    gap: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 10;

    transition: transform 0.3s ease-out;
    &.opened {
      transform: translate3d(-320px, 0, 0);
    }

    &-cross {
      display: block;
      width: fit-content;
      height: fit-content;
      position: absolute;
      top: 15px;
      right: 15px;

      @include media.min-xl {
        display: none;
      }
    }

    @include media.min-xl {
      z-index: initial;
      display: block;
      position: static;
      height: fit-content;
      width: auto;
      box-shadow: unset;
    }
  }

  &__num {
    display: none;
    font-size: 20px;
    font-weight: 700;

    @include media.min-md {
      display: block;
    }
  }

  &__burger {
    display: block;

    @include media.min-xl {
      display: none;
    }
  }

  &__soc {
    display: flex;
    gap: 8px;

    & * {
      fill: variable.$red;
    }

    @include media.min-xl {
      display: none;
    }
  }
}

.page-header-nav {
  display: flex;
  width: fit-content;
  justify-content: space-between;
  gap: 14px;
  font-size: 22px;
  font-weight: 700;
  flex-direction: column;
  @include media.min-xl {
    font-size: 18px;
    flex-direction: row;
    gap: 20px;
  }
}

.page-header-controls {
  display: flex;
  gap: 15px;
}
</style>
