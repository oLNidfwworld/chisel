<script setup> 

const props = defineProps({
    isVisible: {
        Boolean,
        default: false,
    },
    fallbackIncome: {
        Boolean,
        default: false
    }
})

const emits = defineEmits(['close', 'fallback-return'])

const close = () => emits('close')

watch(
    () => props.isVisible,
    () => {
        emits('fallback-return');
    }
)


</script>
<template>
    <teleport to="body">
        <div v-if="isVisible" class="popup__outer" @click.self="close($event)">
            <transition name="appear">
                <div v-if="isVisible" class="popup">
                    <div class="popup__wrapper">
                        <button class="popup__close" @click="$emit('close')">
                            <ICross filled/>
                        </button>
                        <transition mode="out-in" name="sliding">
                            <div v-if="!fallbackIncome">
                                <div class="popup__header">
                                    <slot name="header"/>
                                </div>
                                <div class="popup__content">
                                    <slot name="content"/>
                                </div>
                            </div>
                            <div v-else>
                                <slot name="response"/>
                            </div>
                        </transition>
                    </div>
                </div>
            </transition>
        </div>
    </teleport>
</template>
<style lang="scss">
@use '/assets/styles/mixins/media.scss' as media;
@use '/assets/styles/base/variables/colors.scss' as variable;
.popup {
    width: fit-content;
    height: fit-content;
    margin: auto;
    position: fixed;
    inset: 0; 

    &__close {
        position: absolute;
        top: 5%;
        right: 5%;
        color: variable.$white;
        width: fit-content; 

        & svg {
            width: 24px !important  ;
        }
    }

    &__ {
        &outer {
            width: 100%;
            height: 100%;
            position: fixed;
            z-index: 91;
            top: 0;
            left: 0; 
            background-color: rgba(0, 0, 0, 0.5);
        }

        &wrapper {
            background-color: variable.$white;
            padding: 2.75rem;
        }

        &header {
            color: variable.$black;
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 1.75rem; 
        }

        &fields{
            display : flex;
            flex-direction: column;
            gap: 1rem; 
            margin-bottom: 1rem;
        }
        &err{
            color: variable.$red;
            font-size: 14px;
            margin-bottom: 0.75rem;
        }
        &content {
            margin-bottom: 1.75rem;
        }
    }
}

.appear-enter-active,
.appear-leave-active {
    transition: 0.3s;
    transition-delay: 0.2s;
}

.appear-enter-from,
.appear-leave-to {
    opacity: 0;
}

.appear-enter-to,
.appear-leave-from {
    opacity: 1;
}

.sliding-enter-active,
.sliding-leave-active {
    transition: 0.3s;
}

.sliding-enter-from {
    opacity: 0;
    transform: translateX(-50px);
}

.sliding-leave-to {
    opacity: 0;
    transform: translateX(50px);
}

.sliding-enter-to,
.sliding--leave-from {
    opacity: 1;
    transform: translateY(0px);
}
</style>