<script setup>    
import Menu from './menu.vue';

const menu1 = shallowReactive([
    {
        name: "Вторичную",
        path: "/to"
    },
    {
        name: "Загородную",
        path: "/to"
    },
    {
        name: "Коммерческую",
        path: "/to"
    },
]);
const menu2 = shallowReactive([
    {
        name: "Вторичную",
        path: "/to"
    },
    {
        name: "Загородную",
        path: "/to"
    },
    {
        name: "Коммерческую",
        path: "/to"
    },
]);
const menu3 = shallowReactive([
    {
        name: "Покупателям",
        path: "/to"
    },
    {
        name: "Продавцам",
        path: "/to"
    },
    {
        name: "Арендаторам",
        path: "/to"
    },
    {
        name: "Арендодателям",
        path: "/to"
    },
    {
        name: "Срочный выкуп",
        path: "/to"
    },
    {
        name: "Ипотека",
        path: "/to"
    },
]);
 
const currentYear = new Date().getFullYear();

</script>
<template>
    <div class="page-footer mob">
        © 2005–{{ currentYear }}
    </div>
    <footer class="page-footer pc">
        <div class="page-footer__wrapper container">
            <div class="page-footer__logo-block">
                <img width="230" src="/footerLogo.png" />
                <small class="page-footer__years">© 2005–{{ currentYear }}</small>
            </div>
            <div class="page-footer__menus">
                <Menu :menu="menu1" title="Купить" />
                <Menu :menu="menu2" title="Арендовать" />
                <Menu :menu="menu3" title="Услуги" />
            </div>
            <div class="page-footer__contacts-block">
                <div class="page-footer__col-block">
                    <h4 class="font-bold"> Мы в соц.сетях </h4>
                    <ul class="page-footer__socials"> 
                        <a href="https://vk.com/nedvizhimostpp" target="_blank" class="">
                            <IVKWhite filled/>
                        </a>
                        <a href="https://www.youtube.com/channel/UCMF6FOeygEuzxZ5Mk7rOIgg" target="_blank" class="">
                            <IYTWhite filled/>
                        </a>
                    </ul>
                    <NuxtLink href="/blog/">Блог</NuxtLink>
                </div>
                <div class="page-footer__col-block end-block"> 
                        <a class="font-bold" href="tel:+79015178651">+7 901 517-86-51
                        </a> 
                    <ul class="page-footer__socials">
                        <a href="https://wa.me/79015178651" target="_blank" rel="noopener noreferrer">
                            <IWhatsupWhite/>
                        </a>
                        <a href="mailto:ekspert07@bk.ru" rel="noopener noreferrer"> 
                            <IEmailWhite/>
                        </a>
                        </ul>
                    <p class="text-sm"><a href="https://yandex.ru/maps/-/CDQWu6KJ" target="_blank">МО, г.Павловский Посад,<br> ул. Кирова, д.91</a></p>
                </div>
            </div>
        </div>
    </footer>
</template>
<style lang="scss">
@use "/assets/styles/base/variables/colors.scss" as variable;
@use "/assets/styles/base/shortcuts.scss" as shortucts;
.page-footer {
    font-size: 15px;
    color: variable.$white;
    flex: 0 0;
    padding: 55px 0;
    background-color: variable.$red;

    &.mob{
        display: block;
        background-color: variable.$white;
        color: variable.$black;
        text-align: center;
        @include min-md {
            display: none;
        }
    }
    &.pc{
        display: none;
        @include min-md {
            display: block
        }
    }

    &__wrapper {
        display: grid;
        gap: 50px; 
        grid-template-columns: 1fr auto;
        @include min-lg { 
            grid-template-columns: 3fr 6fr 5fr;
        }
    }

    &__col-block{
        display: flex;
        flex-direction: column;
        gap: 12px;

        &.end-block{
            align-items: end;
            text-align: end;
        }
    }

    &__logo-block {
        display: flex;
        flex-direction: column;
        gap: 21px;
    } 

    &__menus {
        display: flex;
        gap: 56px;
    }

    &__contacts-block{

        display: flex ;
        width: 100%;
        justify-content: space-between;
        grid-column: span 2;
        
        @include min-lg{
            grid-column: span 1;
            display: grid;
            gap: 12px;
            grid-template-columns: repeat(2, 1fr);
        }
    }

    &__socials {
        display: flex;
        gap: 8px;
        & > * {
            display: block;;
        }
    }
}
</style>
