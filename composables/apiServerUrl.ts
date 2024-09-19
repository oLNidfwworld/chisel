

export default function ( path : string ) {
    const cfg = useRuntimeConfig();
    return cfg.public.siteUrl + path;
}