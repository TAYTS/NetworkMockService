#!/usr/bin/env bash

mongoimport --db=$DATABASE --collection=$COLLECTION --file=/home/init_data.json --drop --jsonArray
mongo --eval "db.getSiblingDB('$DATABASE').$COLLECTION.createIndex({'email': 'text'})"