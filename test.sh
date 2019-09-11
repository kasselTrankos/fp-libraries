#!/bin/bash
for d in ./packages/*/ ; do (cd "$d" && npm i && npm test); done
