type NeededParams = { 
    city? : string | 'all-cities',
    offerType? : "buy" | "rent" | 'all-offer-types',
    section? : "vtorichka" | "zagorodnaya" | "commerce" | 'all-sections' ,
    objectType? : string | 'all-object-types'
}

export type { NeededParams }