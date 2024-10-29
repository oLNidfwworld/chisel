<script setup>
import FormCallback from '../ui/Forms/FormCallback.vue';

const formVisible = ref(false);
</script>
<template>
    <div class="call-row">
        <button class="call-row__btn" @click="formVisible = true">
            <IPen filled />
            <span>Написать</span>
        </button>
        <a class="call-row__btn" href="tel:+7(901)517-86-51">
            <IPhoneRinging filled />
            <span>Позвонить</span>
        </a>
    </div>
    <FormCallback v-model="formVisible" />
</template>
<style lang="scss">
@use '/assets/styles/base/variables/colors.scss' as variable;
@use '/assets/styles/base/variables/media.scss' as variable-media;
@use "/assets/styles/mixins/media.scss" as media;
@use "/assets/styles/layouts/default.scss";

.call-row {
    position: fixed;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    z-index: 50;
    gap: 12px;
    bottom: 0;

    * {
        fill: variable.$red !important;
    }

    @media (max-width: variable-media.$md) {
        .call-row__btn {
            display: flex;
            gap: 12px;
            align-items: center;
            justify-content: center;
            padding: 6px 5px;
            background-color: variable.$red;
            color: variable.$white;
            border-radius: variable.$border-md variable.$border-md 0 0;
            text-align: center;
            ;

            svg {
                width: 16px !important;
                height: 16px !important;

                * {
                    fill: variable.$white !important;
                }
            }
        }
    }

    @include media.min-md {
        background-color: variable.$gray;
        padding: 12px 8px;
        display: flex;
        width: fit-content;
        height: fit-content;
        flex-direction: column;
        right: 0;
        top: 25%;
        border-radius: variable.$border-md 0 0 variable.$border-md;
        span {
            display: none;
        }
    }
}
</style>
