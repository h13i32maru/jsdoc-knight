#!/bin/bash

rm -rf out/jsdoc-src
./out/src/cli.js ./src ./out/jsdoc-src

rm -rf out/jsdoc
mkdir -p out/jsdoc
./node_modules/.bin/jsdoc -c jsdoc.json
