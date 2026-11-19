# syntax=docker/dockerfile:1

FROM hugomods/hugo:exts AS builder

WORKDIR /src
COPY . .
RUN hugo --minify --destination /site

FROM nginx:1.27-alpine AS runtime

RUN sed -i 's|application/javascript[[:space:]]*js;|application/javascript js mjs;|' /etc/nginx/mime.types

COPY --from=builder /site /usr/share/nginx/html

EXPOSE 80