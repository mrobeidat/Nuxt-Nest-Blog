export function getStrapiMedia(url:string) {
  const config = useRuntimeConfig()
   if (!url) {
     console.error("URL is undefined or null");
     return null; // or handle this case as needed
   }
  if (url.startsWith("/")) {
    return config.strapiBaseUri ? `${config.strapiBaseUri}${url}` : `http://127.0.0.1:1337${url}`;
  }
  return config.strapiBaseUri ? `${config.strapiBaseUri}/${url}` : `http://127.0.0.1:1337/${url}`;
}