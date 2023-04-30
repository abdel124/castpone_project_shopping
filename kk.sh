docker rmi -f udatube-api-comment                       latest    f284a1f91735   6 days ago      1.08GB
docker rmi -f reverseproxy                              latest    15a047063cfb   6 days ago      135MB
docker rmi -f udatube-api-auth
docker rmi -f udatube-api-video

docker system prune
