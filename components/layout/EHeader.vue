<script setup>
import { useUIstore } from "~/store/ui";
import ESearch from "./ESearch.vue";

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
const searchOpened = ref(false);
watch(burgerOpened, (newValue) => {  
  toggleOverlay(newValue)
});
watch(searchOpened, (newValue ) => {
  uiStore.toggleOverlayVisibility(newValue);
  toggleOverlay(newValue); 
});
const toggleOverlay = ( isOverlay ) => { 
  if ( isOverlay ) 
    document.body.style.overflow = "hidden";
   else 
    document.body.style.overflow = "initial";
}
 
</script>
<template>
   <header
      class="page-header"
      :class="{ 'on-top' : searchOpened}">
      <div class="page-header__wrapper container">
         <NuxtLink to="/">
            <ILogoTypeOne filled />
         </NuxtLink>
         <nav
            class="page-header__nav"
            :class="{ opened: burgerOpened }">
            <button
               class="page-header__nav-cross"
               @click="burgerOpened = false">
               <ICross />
            </button>
            <ul class="page-header-nav">
               <li
                  v-for="(link, index) in links"
                  :key="index"
                  class="page-header-nav__item">
                  <NuxtLink
                     :href="link.href"
                     @click="burgerOpened = false">{{ link.name }}</NuxtLink>
               </li>
            </ul>
            <ul class="page-header__soc">
               <a
                  href="https://wa.me/79015178651"
                  rel="noopener noreferrer">
                  <IWhatsupWhite filled />
               </a>
               <a
                  href="mailto:ekspert07@bk.ru"
                  rel="noopener noreferrer">
                  <IEmailWhite filled />
               </a>
               <a
                  href="https://vk.com/nedvizhimostpp"
                  rel="noopener noreferrer">
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
         <button
            class="page-header__burger"
            @click="burgerOpened = !burgerOpened">
            <IBurger />
         </button>
         <a
            class="page-header__num"
            href="tel:89015178651">+7 901 517-86-51</a>
         <ul class="page-header-controls">
            <li class="page-header-controls__item">
               <button
                  class="page-header-controls__button"
                  @click="searchOpened = !searchOpened"> 
                  <ISearch
                     v-if="!searchOpened"
                     filled />
                  <ICross
                     v-else
                     filled/>
               </button>
            </li>
            <li class="page-header-controls__item">
               <NuxtLink
                  href="/favorites"
                  class="page-header-controls__button">
                  <IFav filled />
               </NuxtLink>
            </li>
         </ul>
      </div>
      <Transition name="from-top"> 
         <ESearch
            v-if="searchOpened"
            @submited="searchOpened = false" />
      </Transition>
   </header>
</template>
<style lang="scss">
@use "/assets/styles/base/variables/colors.scss" as variable;
@use "/assets/styles/mixins/media.scss" as media;
.page-header {
  flex: 0 0;
  padding: 26px 0;
  position: relative; 
  transition: 0s 1s ease-out z-index;
  &.on-top { 
    z-index: 10;
    background-color: variable.$white;  
  }

  &__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 2;
    position: relative;
    background-color: variable.$white;
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
    z-index: 100;

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

  &__button svg{
    fill: variable.$red;
    max-width: 20px !important;
    max-height: 20px !important;
  }
}

.from-top-enter-from,
.from-top-leave-to {
  transform: translateY(-60%);
  opacity: 0;
}
.from-top-enter-active,
.from-top-leave-active {
  transition: 0.3s ease-out transform, 0.3s ease-out opacity;
  z-index: 1;
}
</style>
