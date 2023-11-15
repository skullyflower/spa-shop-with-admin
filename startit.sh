trap "exit" INT TERM ERR
trap "kill 0" EXIT

cd ./admin
node ./apiserver.js &
yarn start &
cd ../spa-shop 
npm run dev &

wait