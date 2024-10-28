<script setup>
import { YandexMap } from 'vue-yandex-maps';
import ContentInner from '~/components/ui/content-inner.vue';
definePageMeta({
    layout: 'content'
});

useSeoMeta({
    title: 'Контакты | АН "Эксперт"',
    description : "На электричке: С Курского вокзала доехать до ж/д станции Павловский Посад(приблизительное время в пути 1час 10минут), выйти в город на Привокзальную площадь. Далее 700 метров пешком до ДК «Октябрь»."
})
const mapCenter = ref([55.780826, 38.670362])
const controls = ['fullscreenControl'];
const detailedControls = { zoomControl: { position: { right: 10, top: 50 } } };
</script>
<template>
    <ContentInner h1="Контакты">
        <div class="contacts">
            <div class="contacts-top">
                <img src="/contacts-photo.webp" />
                <div class="contacts-blocks">
                    <div class="contacts-block">
                        <div class="contacts-row">
                            <IPhone filled /> +7 (901) 517-86-51
                        </div>
                        <div class="contacts-row">
                            <IPlacemark filled /> МО, г. Павловский Посад, ул. Кирова 91
                        </div>
                        <div class="contacts-row">
                            <IEmailWhite filled /> ekspert07@bk.ru
                        </div>
                    </div>
                    <div class="contacts-block bordered">
                        <div class="contacts-block__pre">
                            <IClock filled />
                        </div>
                        <div>
                            Пн. – Чт.: с 9:00 до 18:00 <br />
                            Пт.: с 9:00 до 17:00 <br />
                            Сб.: с 10:00 до 16:00 <br />
                            Вс.: Выходной <br />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <ClientOnly>
                    <YandexMap style="height: 300px" :controls="controls" :detailed-controls="detailedControls"
                        :coordinates="mapCenter">
                        <YandexMarker :coordinates="[55.780826, 38.670362]" :options="{
                            iconLayout: 'default#imageWithContent',
                            iconImageHref: '/ekspertMarker.svg',
                            iconImageSize: [50, 50],
                            iconImageOffset: [-25, -55]
                        }" :marker-id="`home`">
                            <template #component>
                                <div class="yandex-balloon">
                                    <p class="mb-3">Мы</p>

                                </div>
                            </template>
                        </YandexMarker>
                    </YandexMap>
                </ClientOnly>
            </div>
            <div class="absaz" >
                <div class="inside" style="position: relative;">
                    <h2 class="spec spec_f"><span class="name">Как
                            добраться:</span></h2>
                </div>
                <p><b>На электричке:</b> С Курского вокзала доехать до ж/д станции
                    Павловский
                    Посад(приблизительное время в пути 1час 10минут), выйти в город на Привокзальную площадь. Далее 700
                    метров
                    пешком до ДК «Октябрь». </p>
                <p><b>На автомобиле: </b> По Горьковскому шоссе проехать 55км от
                    МКАД до
                    дер.Кузнецы, затем после указателя Павловский Посад повернуть направо, далее двигаться 7км по
                    главной дороге до
                    Площади Революции, на площади свернуть налево на ул.Кирова и проехать до дома № 91/20. А если вы
                    используете
                    навигатор, то можно воспользоваться GPS координатами (55.780826, 38.670353). </p>
                <p><b>На автобусе:</b> От станции метро Партизанская на автобусе №
                    386 доехать
                    до города Павловский Посад, остановка ул.Герцена, затем повернуть направо, пройти 150 метров пешком
                    и вы на
                    месте. </p>
                <p> Если у вас возникли вопросы, предложения, или вы хотите отправить заявку, вы
                    можете
                    использовать форму ниже или связаться по любому из указанных выше контактов. </p>
            </div>
        </div>
    </ContentInner>
</template>
<style lang="scss">
@use '/assets/styles/base/variables/colors.scss' as variable;
@use '/assets/styles/mixins/media.scss' as media;

.contacts>*+* {
    margin-top: 20px;
}

.contacts-top {
    display: grid;
    gap: 20px;
    font-weight: 500;

    @include media.min-lg {
        grid-template-columns: 5fr 3fr;
    }

    img {
        widht: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.contacts-blocks {
    display: grid;
    gap: 40px;
}

.contacts-block {
    position: relative;

    justify-content: center;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid variable.$another-gray;

    &__pre {
        position: absolute;

        top: -12px;
        left: 0;
        right: 0;

        margin: auto;
        width: fit-content;
    }
}

.contacts-row {
    display: flex;
    gap: 8px;
    align-items: center;

    & svg {
        width: 16px !important;

        * {
            fill: variable.$red !important;
        }
    }
}
</style>