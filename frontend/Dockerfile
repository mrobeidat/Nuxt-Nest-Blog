FROM node:21.7.0

RUN mkdir -p /usr/src/blog-nuxt-strapi
WORKDIR /usr/src/blog-nuxt-strapi

COPY . /usr/src/blog-nuxt-strapi
RUN npm install -g pnpm

ARG BLOG_API_DOMAIN=https://delicate-feast-4b1d868b5a.strapiapp.com/admin
ENV BLOG_API_DOMAIN=$BLOG_API_DOMAIN
RUN STRAPI_BASE_URL=$BLOG_API_DOMAIN pnpm build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# CMD [ "node",".output/server/index.mjs" ]
CMD [ "pnpm","dev" ]

