#install docker/docker-compose, node, npm

#database pull
docker-compose up -d

#api build
npm install
npm run build

#fronend build
cd ../client
npm install
npm run build
cp -a dist/. ../api/build/public/
cd ../api
npm run start