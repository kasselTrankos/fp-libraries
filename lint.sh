
#!/bin/bash
npm i eslint
for d in ./packages/*/ ; do (cd "$d" && node ./../../node_modules/.bin/eslint '**/*.js'); done
