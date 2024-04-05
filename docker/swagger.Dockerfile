FROM redocly/redoc:latest
COPY ./docs/swagger.json /usr/share/nginx/html/swagger.json
ENV SPEC_URL=swagger.json
