docker build -t mywebfront/angular:$SHA -f ./angular/Dockerfile ./angular
docker build -t mywebfront/backend:$SHA -f ./backend/Dockerfile ./backend



docker push mywebfront/angular:$SHA
docker push mywebfront/backend:$SHA

kubectl apply -f angk8s
kubectl set image deployments/backend-deployment backend=mywebfront/backend:$SHA
kubectl set image deployments/angular-deployment angular=mywebfront/angular:$SHA
