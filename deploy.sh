docker build -t mywebfront/angular:latest -t mywebfront/angular:$SHA -f ./angular/Dockerfile ./angular
docker build -t mywebfront/backend:latest -t mywebfront/backend:$SHA -f ./backend/Dockerfile ./backend
docker build -t mywebfront/client:latest -t mywebfront/client:$SHA -f ./client/Dockerfile ./client

docker push mywebfront/angular:latest
docker push mywebfront/backend:latest
docker push mywebfront/client:latest

docker push mywebfront/angular:$SHA
docker push mywebfront/backend:$SHA
docker push mywebfront/client:$SHA

kubectl apply -f angk8s
kubectl set image deployments/backend-deployment backend=mywebfront/backend:$SHA
kubectl set image deployments/angular-deployment angular=mywebfront/angular:$SHA
kubectl set image deployments/client-deployment angular=mywebfront/client:$SHA
