#!/usr/bin/env sh
# abort on errors
set -e
# build
npm run build
# navigate into the build output directory
cd dist
# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME
git init
git add -A
git config user.email "you@example.com"
 git config user.name "Ваше Имя"
git commit -m 'deploy'
git push -f git@github.com:SlepovEltech/semantic-qa.git master:gh-pages

cd -