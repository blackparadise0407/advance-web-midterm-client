rm -rf build
yarn build

cd build
cp index.html 200.html

surge . retro-sprint.surge.sh

