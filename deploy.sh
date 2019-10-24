docker build -t mywebfront/multi-client -f ./client/Dockerfile ./client
docker build -t mywebfront/multi-server -f ./server/Dockerfile ./server
docker build -t mywebfront/multi-worker -f ./worker/Dockerfile ./worker
docker push mywebfront/multi-client
docker push mywebfront/multi-server
docker push mywebfront/multi-worker

