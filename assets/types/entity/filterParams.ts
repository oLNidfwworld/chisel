type NeededParams = { 
    city? : string,
    offerType? : "buy" | "rent",
    section? : "vtorichka" | "zagorodnaya" | "commerce",
    objectType? : string
}

export type { NeededParams }