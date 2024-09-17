
const cfg = useRuntimeConfig();

export default function ( path : string ) {
    return cfg.public.siteUrl + path;
}