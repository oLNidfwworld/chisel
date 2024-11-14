
import type { UseFetchOptions } from "#app";
import type { NitroFetchRequest, NitroFetchOptions } from "nitropack";  

export const useApiFetch: typeof useFetch = <T>(
  url: string,
  options?: UseFetchOptions<T>
) => {
  const config = useRuntimeConfig();
  return useFetch(url, {
    method: "get",
    baseURL: config.public.apiUrl as string,
    ...options,
  });
}; ;

export const $fetchApi = <T>(
  request: NitroFetchRequest,
  opts?:
    | NitroFetchOptions<
        NitroFetchRequest,
        | "get"
        | "head"
        | "patch"
        | "post"
        | "put"
        | "delete"
        | "connect"
        | "options"
        | "trace"
      >
    | undefined
) => {
  const config = useRuntimeConfig();
  return $fetch<T>(request, {
    method: "get",
    baseURL: config.public.apiUrl as string,
    // mode : 'no-cors',
    ...opts,
  });
};

// TODO : useFetchCached
