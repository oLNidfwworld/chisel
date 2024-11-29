<script setup lang="ts">
import type IAgent from "~/assets/types/entity/agent";

interface IProps {
  visibleNumber?: boolean;
  agent: IAgent;
}
const props = withDefaults(defineProps<IProps>(), {
  visibleNumber: true,
});
const agentPhoneHidden = computed(() =>
  props.visibleNumber
    ? props.agent.phone
    : props.agent.phone.slice(0, props.agent.phone.length - 5) + "XX-XX"
);
</script>
<template>
   <div class="agent">
      <span class="agent__name">{{ agent.name }}</span>
      <span class="agent__phone">{{ agentPhoneHidden }}</span>
   </div>
</template>
<style lang="scss"> 
@use "/assets/styles/base/variables/colors.scss" as variable;
@use "/assets/styles/mixins/media.scss" as media;
.agent {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  &__name {
    font-weight: 700;
  }
  &__phone {
    font-weight: 600;
  }
}
</style>
