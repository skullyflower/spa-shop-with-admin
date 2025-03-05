trap "exit" INT TERM ERR
trap "kill 0" EXIT

node ./apiserver.js &
yarn start &
cd ../skullyflower 
npm run dev &

wait