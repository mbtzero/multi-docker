docker build -t mywebfront/angular:latest -t mywebfront/angular:$SHA -f ./angular/Dockerfile ./angular
docker build -t mywebfront/backend:latest -t mywebfront/backend:$SHA -f ./backend/Dockerfile ./backend

docker push mywebfront/angular:latest
docker push mywebfront/backend:latest

docker push mywebfront/angular:$SHA
docker push mywebfront/backend:$SHA

kubectl apply -f angk8s
kubectl set image deployments/server-deployment server=mywebfront/backend:$SHA
kubectl set image deployments/angular-deployment client=mywebfront/angular:$SHA

