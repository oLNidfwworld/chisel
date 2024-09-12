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
  <a class="btn" v-if="href" :href="href" :class="[preference]">
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
  border-radius: $border-sm;
  font-weight: 700;
  transition: 0.3s ease-out color, 0.3s ease-out background-color,
    0.3s ease-out border-color;
  &.red {
    background-color: $red;
    color: $white;
  }
  &.transparent {
    background-color: transparent;
    color: $black;
    border: 1px solid $red;
    @media (hover: hover) {
      &:hover {
        background-color: $red;
        color: $white;
      }
    }
  }
  &.sea {
    background-color: $green;
    color: $white;
  }
  &.gray {
    background-color: #e2e2e2;
    color: $black;
  }
}
</style>
