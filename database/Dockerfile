FROM mongo:4.2

ARG INIT_DATA_PATH=./persons.json
ENV DATABASE=PersonData
ENV COLLECTION=contacts

COPY ${INIT_DATA_PATH} /home/init_data.json
COPY init_script.sh ./docker-entrypoint-initdb.d/
