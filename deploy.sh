docker build -t mywebfront/multi-client:latest -t mywebfront/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t mywebfront/multi-server:latest -t mywebfront/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t mywebfront/multi-worker:latest -t mywebfront/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push mywebfront/multi-client:latest
docker push mywebfront/multi-server:latest
docker push mywebfront/multi-worker:latest

docker push mywebfront/multi-client:$SHA
docker push mywebfront/multi-server:$SHA
docker push mywebfront/multi-worker:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=mywebfront/multi-server:$SHA
kubectl set image deployments/client-deployment client=mywebfront/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=mywebfront/multi-worker:$SHA
