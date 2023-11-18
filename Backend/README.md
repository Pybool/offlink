# docker run --name bih-redis -p 6379:6379 -d redis
# docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' bih-redis
# docker volume create bih_hackathon_data
# docker run -d --name MongoDB -p 27017:27017 -v bih_hackathon_data:/data/db mongo:latest
# docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' MongoDB
# #Edit Env And Redis files with Redis and Mongodb IP addressess
# docker build -t blockchaininnovate .
# docker run -d -p 8080:8080 blockchaininnovate
