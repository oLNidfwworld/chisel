import type IAgent from "./agent"

interface ObjectDetail {
    id: number,
    name: string,
    detailText: string,
    section: string,
    price: number,
    photos: Array<Photo>,
    objectType : {
        code : string,
        name: string
    },
    views: number,
    roomsCount: number | string,

    agent : IAgent,
    balcony : string, 
    square: number | string
    squareSec: number | string,
    livingSquare: number | string,
    kitchenSquare: number | string,
    houseFloor: number | string,
    location: string,
    productId: string, 
    houseType: string[],
    description: string,
    bathroom: string,
    coordinates : {
        lat : number,
        lon : number,
    }, 
    elevator: string,
    ipoteka: string,
    floorCount: string | number,
    rootSection: string, 
    typeOffer: string,
    seoProps: Array<unknown>,
    communications : Array<{name : string}>
}
interface ObjectShorted {
    agent : IAgent,
    coordinates : {
        lat : number,
        lon : number,
    },
    detailText : null | string,
    id : number,
    location : string,
    name : string,
    photos : Photo[],
    price : number,
    productId : string | number,
    rootSection : string
}
interface Photo { 
    filename: string,
    url: string,
    src: string,
    websrc: string
} 

export type { ObjectDetail, ObjectShorted, Photo }