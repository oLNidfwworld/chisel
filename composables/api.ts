
import type { UseFetchOptions } from "#app";
import type { NitroFetchRequest, NitroFetchOptions } from 'nitropack';

export const useApiFetch: typeof useFetch = <T>(
  url: string,
  options?: UseFetchOptions<T>
) => {
  const config = useRuntimeConfig();
  return useFetch(url, { 
    baseURL: ( config.public.apiUrl as string),
    mode : 'no-cors',
    ...options,
    // onRequest({ request, options }) {},
    // onRequestError({ request, options, error }) {},
    // onResponse({ request, response, options }) {},
    // onResponseError({ request, response, options }) {},
  });
};

export const $fetchApi = <T>( request : NitroFetchRequest, opts? : NitroFetchOptions<NitroFetchRequest, "get" | "head" | "patch" | "post" | "put" | "delete" | "connect" | "options" | "trace"> | undefined ) => { 
  
  const config = useRuntimeConfig();
  return $fetch<T>( request, {
    baseURL : (config.public.apiUrl as string), 
    mode : 'no-cors',
    ...opts
  });
}