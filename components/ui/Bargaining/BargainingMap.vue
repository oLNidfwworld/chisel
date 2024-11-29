<script setup>
import { YandexMap } from "vue-yandex-maps";
import btn from "~/components/base/btn.vue";
import Inpt from "~/components/base/inpt.vue";
// import ETextarea from "../../components/Base/E-textarea.vue";
// import { useBargainingStore } from "~/store/bargaining"
import EPopupForm from "../e-popup-form.vue";
const props = defineProps({
    mapCenter: Array,
    zoom: Number,
    placements: Object
})

const { data: foregroundLayout } = await useFetch('/api/foreground'); 

const mapInit = async (mapHandler) => {

    const objectManager = new ymaps.ObjectManager({});
    mapHandler.geoObjects.add(objectManager);
    objectManager.add(toRaw(foregroundLayout.value));
    toRaw(props.placements).items.map(item => {
        let fillCol = ';'
        if (item.STATUS.CODE === 'SELLABLE') {
            fillCol = '#79cd79';
        } else if (item.STATUS.CODE === 'RESERVED') {
            fillCol = '#5762FF';
        } else if (item.STATUS.CODE === 'SELLED') {
            fillCol = '#e02d1f';
        }
        objectManager.add({
            type: 'Feature',
            id: item.NAME,
            geometry: {
                type: 'Polygon',
                coordinates: [item.PLACE]
            },
            options: {
                fillColor: fillCol,
                strokeColor: '#6f7985',
                strokeWidth: 1,
            },
            properties: {
                hintContent: `Участок №${item.NAME}`, // Подсказка при наведении на полигон
                balloonContent: balloonContentTemplate(item.NAME, item.SQUARE, item.STATUS, item.PRICE)// Содержимое балуна
            }
        });

        const center = [
            (item.PLACE.reduce((a, b) => a + b[0], 0) / (item.PLACE.length)),
            (item.PLACE.reduce((a, b) => a + b[1], 0) / (item.PLACE.length))
        ];
        const textPlacemark = new ymaps.Placemark(center, {
            iconContent: `<span class="polygon-text">${item.NAME}</span>` // Текст маркера
        }, {
            iconLayout: 'default#imageWithContent',
            iconImageHref: '/nil.png',
            iconOffset: [-10, -5],
            iconImageSize: [1, 1] // Размеры иконки (ширина, высота)
        });
        mapHandler.geoObjects.add(textPlacemark);
    })

    objectManager.objects.events.add('click', function (e) {
        const objectId = e.get('objectId');
        objectManager.objects.balloon.open(objectId);
    });
    objectManager.objects.events.add('balloonopen', () => {
        const btnOrder = document.querySelector('.ballon .makeOrder')
        //   let btnLookout = document.querySelector('.ballon .lookout')
        if (btnOrder) {
            btnOrder.addEventListener('click', () => {
                makeOrder(btnOrder.dataset.id);
            })
        }
        //   if(btnLookout){
        //     btnLookout.addEventListener('click',()=>{
        //         lookOut(btnLookout.dataset.id);
        //     })
        //   }
    })
    objectManager.add(toRaw(foregroundLayout.value));

    mapHandler.events.add('boundschange', function (event) {
        const newZoom = event.get('newZoom');
        const allGeoObjects = mapHandler.geoObjects;
        if (newZoom < 18) {
            allGeoObjects.each(function (geoObject) {
                if (geoObject instanceof ymaps.Placemark) {
                    geoObject.options.set('visible', false);
                }
            });
        } else {
            allGeoObjects.each(function (geoObject) {
                if (geoObject instanceof ymaps.Placemark) {
                    geoObject.options.set('visible', true);
                }
            });
        }
    });
}
const balloonContentTemplate = (name, square, stat, price) => {
    if (stat.CODE === 'SELLED' || stat.CODE === 'RESERVED') {
        return `

  <div class="ballon" >

      <div class="ballon__wrapper">

          <div class="ballon__title">Участок номер ${name}</div>
          <ul class="ballon__list">
              <li><span>Стоимость :</span><span>${price} ₽</span></li>
              <li><span>Площадь :</span><span>${square} м<sup>2</sup></span></li>
              <li><span>Статус :</span><span class="stat_${stat.CODE}">${stat.NAME}</span></li>
          </ul> 
      </div>

  </div>

  `
    } else {
        return `

  <div class="ballon" >

      <div class="ballon__wrapper">

          <div class="ballon__title">Участок номер ${name}</div>
          <ul class="ballon__list">
              <li><span>Стоимость :</span><span>${price} ₽</span></li>
              <li><span>Площадь :</span><span>${square} м<sup>2</sup></span></li>
              <li><span>Статус :</span><span class="stat_${stat.CODE}">${stat.NAME}</span></li>
          </ul>
          <div class="flex flex-row">
            
            
            <button   data-id="${name}" class=" btn red  makeOrder">Заказать</button> 
        
          </div>
      </div>

  </div>

  `
    }

}  
const whatsObject = ref(undefined);

const userName = ref(''), userPhone = ref(''), userComment = ref(''), userEmail = ref('')

const fallback = ref(false), responseMsg = ref('');
const isPopupVisible = ref(false);
const validation = ref(false);
const validationMessage = ref('');

const makeOrder = (id) => {
    const { NAME: placementName } = props.placements.items.find(x => x.NAME == id);
    whatsObject.value = placementName;
    isPopupVisible.value = true;
}

// const router = useRouter(), route = useRoute();
// const useBarg = useBargainingStore()
// const lookOut = (id) => { 
//     const myObj = props.placements.items.find(x => x.NAME == id);
//     router.push({ path: route.path, query: { ...route.query, objectId: myObj.NAME } });
//     useBarg.setLookOutObject(myObj) 
// }

const sendData = async () => { 
    if (userPhone.value.length < 16) {
        validationMessage.value = 'Неверный формат номера телефона'
        validation.value = false;
    } else {
        validation.value = true;
        validationMessage.value = ''
    }

    if (validation.value) {
        await $fetchApi('/Mail/', {
            method: 'POST',
            params: {
                action: 'NEW_BARG',
                placement: whatsObject.value,
                phone: userPhone.value,
                name: userName.value,
                comment: userComment.value,
                email: userEmail.value
            }
        }).then((e) => {
            if (e.status) {
                responseMsg.value = e.msg
                fallback.value = true;
            }
        })
    }
}

</script>
<template>
   <ClientOnly>
      <div class="mupp">
         <YandexMap
            :controls="[]"
            :coordinates="mapCenter"
            :zoom="zoom"
            @created="mapInit" />
         <div class="history">
            <h2 class="history__title">Условные обозначения</h2>
            <ul class="history__wrapper">
               <li><span
                  class="history__col"
                  style="background:var(--reserved);" /> Зарезервированно</li>
               <li><span
                  class="history__col"
                  style="background:var(--selled);" /> Продано</li>
               <li><span
                  class="history__col"
                  style="background:var(--sellable);" /> В продаже</li>
            </ul>
         </div>
      </div>
   </ClientOnly>
   <EPopupForm 
      :fallback-income="fallback"
      :is-visible="isPopupVisible"
      @fallback-return="fallback = false"
      @close="isPopupVisible = !isPopupVisible">
      <template #header>
         <h3 class="">Заказать участок {{ whatsObject }}</h3>
      </template>
      <template #content>
         <form @submit.prevent="sendData($event)">
            <div class="popup__fields">
               <Inpt
                  v-model="userName"
                  required
                  placeholder="Имя*" />
               <Inpt
                  v-model="userPhone"
                  v-maska="'+7 ### ### ##-##'"
                  type="phone"
                  required
                  placeholder="Телефон*" />
               <Inpt
                  v-model="userEmail"
                  type="email"
                  placeholder="Email" />
               <!-- <ETextarea v-model="userComment" style="resize: none;" rows="5" placeholder="Комментарий" /> -->
            </div>
            <div class="popup__err">
               {{ validationMessage }}
            </div>
            <btn
               type="submit"
               class="m-auto ">Отправить</btn>
         </form>
      </template>
      <template #response>
         <h4 class="text-[24px] font-semibold">
            {{ responseMsg }}
         </h4>
      </template>
   </EPopupForm>

</template>
<style lang="scss">
@use '/assets/styles/mixins/media.scss' as media;
@use '/assets/styles/base/variables/colors.scss' as variable;
@use '/assets/styles/base/shortcuts.scss';

.mupp {
    position: relative;
}

.polygon-text {
    font-size: 14px;
    color: variable.$white;
}

.yandex-container {
    height: 80vh;
}

.history {
    position: absolute;
    z-index: 3;
    bottom: 40px;
    background-color: variable.$white;
    padding: 1.25rem;
    left: 0;
    right: 0;
    border: 1px solid #6f7985;

    @include media.min-sm {
        left: 40px;
        right: unset;
    }

    &__title {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 15px;
    }

    &__wrapper {
        & li {
            display: flex;
            gap: 1rem;
            margin-bottom: 0.5rem;
        }

    }

    &__col {
        display: block;
        width: 70px;
        height: 20px;
        border: 1px solid #6f7985;
    }
}

.ballon {
    width: 200px;

    @include media.min-md {
        width: 300px;
    }

    &__wrapper {
        padding: 1.25rem 0;
    }

    &__title {
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 1.25rem;

        @include media.min-md {
            font-size: 22px;
        }
    }

    &__desc {
        font-size: 13px;
        font-weight: 700;
        margin-bottom: 1.25rem;
    }

    &__list {
        display: grid;
        width: 75%;

        & li {
            display: flex;
            justify-content: space-between;

            & span:first-child {
                font-weight: 700;
            }
        }

        & .stat_SELLABLE {
            font-weight: 700;
            padding: 5px 10px;
            background-color: var(--sellable);
            color: variable.$white;
        }

        & .stat_RESERVED {
            font-weight: 700;
            padding: 5px 10px;
            background-color: var(--reserved);
            color: variable.$white;
        }

        & .stat_SELLED {
            font-weight: 700;
            padding: 5px 10px;
            background-color: var(--selled);
            color: variable.$white;
        }
    }
}
</style>
