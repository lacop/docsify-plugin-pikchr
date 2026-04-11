#!/usr/bin/env bash

#wget -O pikchr.c https://pikchr.org/home/raw/157276b22395ca1423bce1532e07d56fc3597cc813bf5cd46294c32181bbe1dc?at=pikchr.c

EXPECTED_HASH="250edc0961f118a470fc04513b79de30b20e102b4a9394ec30994ce043f4c34f"
ACTUAL_HASH=$(sha256sum pikchr.c | awk '{print $1}')
if [ "$EXPECTED_HASH" != "$ACTUAL_HASH" ]; then
    echo -e "Hash mismatch for pikchr.c.\nExpected: $EXPECTED_HASH\nActual:   $ACTUAL_HASH"
    exit 1
fi

emcc \
    -Os \
    -s SINGLE_FILE=1 \
    -s EXPORTED_FUNCTIONS=_pikchr,_free,_malloc \
    -s EXPORTED_RUNTIME_METHODS=ccall,getValue \
    -s EXPORT_NAME=PikchrModule \
    -s MALLOC=emmalloc \
    -s MODULARIZE=1 \
    -s ENVIRONMENT=web \
    -s STRICT=1 \
    -o dist/pikchr.js \
    pikchr.c
