type NeededParams = { 
    city? : string | 'all-cities',
    offerType? : "buy" | "rent" | 'all-services-types',
    section? : "vtorichka" | "zagorodnaya" | "commerce" | 'all-immovable-types' ,
    objectType? : string | 'all-object-types'
}

export type { NeededParams }