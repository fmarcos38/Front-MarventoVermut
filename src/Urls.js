export const URL_DESARROLLO =
    import.meta.env.VITE_API_URL_DESARROLLO ||
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_URL_PRODUCCION;
export const URL_PRODUCCION =
    import.meta.env.VITE_API_URL_PRODUCCION ||
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_URL_DESARROLLO;

const normalizeUrl = (url) => String(url || "").replace(/\/$/, "");

export const URL = normalizeUrl(import.meta.env.PROD ? URL_PRODUCCION : URL_DESARROLLO);
