export const URL_DESARROLLO =
  import.meta.env.VITE_API_URL_DESARROLLO || import.meta.env.VITE_API_URL;
export const URL_PRODUCCION =
  import.meta.env.VITE_API_URL_PRODUCCION || import.meta.env.VITE_API_URL;

export const URL = import.meta.env.PROD ? URL_PRODUCCION : URL_DESARROLLO;
