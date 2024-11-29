<script setup>
import Inpt from '../base/inpt.vue';

const query = ref();
const router = useRouter();
const emits = defineEmits(['submited']);
const submit = ( event ) => {
    emits('submited', event);
    router.push(`/search?q=${query.value}`); 
}
</script>
<template>
   <div class="header-search">
      <div class="container">
         <form
            action="/search"
            class="header-search__form w-full"
            @submit.prevent="submit" >
            <Inpt
               v-model="query"
               name="q"
               type="search"
               placeholder="Найти" />
         </form>
      </div>
   </div>
    
</template>
<style lang="scss">
@use '/assets/styles/base/shortcuts.scss';
@use '/assets/styles/base/variables/colors.scss' as variable;

.header-search {
    width:100%;
    position: absolute;
    top: 100%;
    padding: 15px 0;
    background-color: variable.$white;
}
</style>