export default async function ( e: FocusEvent ) { 
    setTimeout(( ) => ( e.target as HTMLInputElement).setSelectionRange(0,0), 100) 
}