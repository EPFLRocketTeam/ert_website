# syntax=docker/dockerfile:1

FROM hugomods/hugo:exts AS builder

WORKDIR /src
COPY . .
RUN hugo --minify --destination /site

FROM nginx:1.27-alpine AS runtime

COPY --from=builder /site /usr/share/nginx/html

EXPOSE 80