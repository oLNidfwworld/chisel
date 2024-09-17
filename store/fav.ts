import {skipHydrate} from "pinia"; 
import { useStorage } from '@vueuse/core'

export const useFavoriteStore = defineStore('favorite', () =>{
    const favoriteList = useStorage<number[]>("favorite-store", []); 
    const isFavorite = (id : number) => computed(()=> {
        if(favoriteList.value.find(el => el === id)){
            return true
        }
        return false
    })
    const changeFavorite = async (id:number) => {
        console.log('change ' +  id + ' ');
        if(favoriteList.value.find(el => el === id)){
            favoriteList.value = favoriteList.value.filter((e:number) => {
                return e !== id;
            })
        } else {
            favoriteList.value.push(id)
        }
    };
    return {
        favoriteList: skipHydrate(favoriteList),
        changeFavorite,
        isFavorite
    }
});