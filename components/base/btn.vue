<script setup lang="ts">
interface IProps {
  href?: string;
  to?: string;
  preference?: "red" | "transparent" | "sea" | "gray";
}
withDefaults(defineProps<IProps>(), {
  preference: "red",
});
</script>
<template>
  <a v-if="href" class="btn" :href="href" :class="[preference]">
    <slot />
  </a>
  <NuxtLink v-else-if="to" :to="to" class="btn" :class="[preference]">
    <slot />
  </NuxtLink>
  <button v-else class="btn" :class="[preference]">
    <slot />
  </button>
</template>
<style lang="scss">
@use "/assets/styles/base/variables/colors.scss" as variable;
.btn {
  display: flex;
  gap: 12px;
  font-size: 16px;
  line-height: 1.31;
  padding: 11px 29px; 
  width: fit-content;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: variable.$border-sm;
  font-weight: 700;
  transition: 0.3s ease-out color, 0.3s ease-out background-color,
    0.3s ease-out border-color;
  &.red {
    background-color: variable.$red;
    color: variable.$white;
  }
  &.transparent {
    background-color: transparent;
    color: variable.$black;
    border: 1px solid variable.$red;
    @media (hover: hover) {
      &:hover {
        background-color: variable.$red;
        color: variable.$white;
      }
    }
  }
  &.sea {
    background-color: variable.$green;
    color: variable.$white;
  }
  &.gray {
    background-color: variable.$gray;
    color: variable.$black;
  }
}
</style>
