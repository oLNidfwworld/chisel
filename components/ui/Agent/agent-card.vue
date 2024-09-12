<script setup lang="ts">
import Btn from '~/components/base/btn.vue';
import Agent from './agent.vue';
import Inpt from '~/components/base/inpt.vue';

const submit = ( event ) => {
    console.log('submited');
}
</script> 
<template>
    <form class="agent-card" @submit.prevent="submit">
        <div class="agent-card__block agent-card__container">
            <h4 class="agent-card__title">Специалист по объекту</h4>
            <Agent :visible-number="false"/>
            <button class="agent-card__show">Показать <IPhone filled/> </button>
        </div>
        <div class="agent-card__block">
            <p class="agent-card__text">Оставьте свой номер,мы вам перезвоним</p>
            <Inpt class="agent-card__inpt" type="text" name="number" />
        </div>
        <Btn type="submit" class="agent-card__submit">Позвоните мне</Btn>
    </form>
</template>
<style lang="scss" >
.agent-card{
    background-color: #F3F3F3;
    border-radius: $border-sm;
    &__block{
        padding: 11px; 
        display: flex;
        flex-direction: column;
        gap: 4px;
    } 
    &__block + &__block {
        border-top: 1px solid #e2e2e2; 
    }
    &__show{
        color:$red;
        font-size: 14px;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 10px;
        width: fit-content;
        margin: 0 auto; 
    }
    &__title{
        font-size: 18px;
        font-weight: 700; 
        text-align: center;
        display: block;
    }
    &__text{
        font-size: 14px;
        font-weight: 600; 
        text-align: center
    }
    &__submit{
        width: 100%;
    }
    &__inpt.inpt{
        text-align: center;
    }
}
</style>