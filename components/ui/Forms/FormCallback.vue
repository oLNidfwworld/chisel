<script setup>
import Inpt from '~/components/base/inpt.vue';
import EPopupForm from '../e-popup-form.vue';
import Btn from '~/components/base/btn.vue';


const sendData = async () => {

    if (userInfo.value.phone.length < 16) {
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
                action: 'CALLBACK',
                ...userInfo.value
            }
        }).then((e) => { 
            if (e.status) {
                responseMsg.value = e.msg
                fallback.value = true;
            }
        })
    }

}
const fallback = ref(false), responseMsg = ref('');
const userInfo = ref({
    name: null,
    phone: null,
    email: null,
    comment: null
})
const validation = ref(false), validationMessage = ref('');

const showModal = defineModel({
    type: Boolean
});
</script>
<template>
    <EPopupForm 
        :fallback-income="fallback" :is-visible="showModal" @fallback-return="fallback = false"
        @close="showModal = false">
        <template #header>
            <h3 class="">Оставить заявку</h3>
        </template>
        <template #content>
            <form @submit.prevent="sendData($event)">
                <div class="popup__fields">
                    <Inpt v-model="userInfo.name" required placeholder="Имя*" />
                    <Inpt 
                        v-model="userInfo.phone" v-maska="'+7 ### ### ##-##'" type="phone" required
                        placeholder="Телефон*" />
                    <Inpt v-model="userInfo.email" type="email" placeholder="Email" />
                    <!-- <ETextarea v-model="userInfo.comment" style="resize: none;" rows="5"  placeholder="Комментарий" /> -->
                </div>
                <div class="popup__err">
                    {{ validationMessage }}
                </div>
                <Btn type="submit" class="m-auto ">Отправить</Btn>
            </form>
        </template>
        <template #response>
            <h4 class="text-[24px] font-semibold">
                {{ responseMsg }}
            </h4>
        </template>
    </EPopupForm> 
</template>