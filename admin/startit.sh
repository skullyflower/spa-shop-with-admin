trap "exit" INT TERM ERR
trap "kill 0" EXIT

node ./apiserver.js &
yarn start &
cd ../spa-shop 
yarn dev &

wait