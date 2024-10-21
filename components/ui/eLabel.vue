<script setup lang="ts">
withDefaults(defineProps<{
    hightlighted?: boolean
}>(), {
    hightlighted: false,
});
defineEmits<{ (e: 'remove'): void }>();
</script>
<template>
    <div class="label-item" :class="{ 'red': hightlighted }">
        <slot />
        <button type="button" class="label-item__cross" @click="$emit('remove')">
            <ICross filled />
        </button>
    </div>
</template>
<style lang="scss">
@use "/assets/styles/base/variables/colors.scss" as variable;
@use "/assets/styles/mixins/media.scss" as media;
.label-item {
    display: flex;
    gap: 4px;
    width: fit-content;
    height: fit-content;
    font-size: 14px;
    padding: 2px 8px;
    background-color: variable.$gray;
    border-radius: variable.$border-sm;


    &__cross {
        display: block;

        & svg {
            fill: variable.$green;
            width: 14px !important;
            height: 14px !important;
        }
    }

    &.red {
        color: variable.$red;
        .label-item__cross svg{
            fill: variable.$red !important;
        }
    }
}
</style>