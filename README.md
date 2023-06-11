# castpone_project_video_sharring_app
this is project about video sharing app developped using react js in frontend and nodejs in backend . I am following micro service architecture
in this app
# Local Deployment 
so to deploy both frontend and backened you have to make sure that you have aws account and create aan IAM user and get credentials to store locally (ID , Secret key) and depending on your operation system , so you need to add the credentials to aws folder in credentials file
(~/.aws/credentials)
````
```
aws_access_key_id = ""
aws_secret_access_key = ""
```
````
and for add the all variable to ~/bash_proilfe depending on your operations system this example for mac user
you can see them example 
````
```
export AWS_REGION="us-east-1"
export CLOUD_FRONT="d1nfrm13yl8x0h.cloudfront.net"
export AWS_PROFILE="default"
export AWS_BUCKET="s3-video-abdel"
export JWT_SECRET="" // use your own jwt secret
```
````
## client deployement :
so after clonning the repository locally just go server folder and run :
to install all dependency 
### `npm i --force`

after the installation is done 
### npm start

Note : in package.json we are using reverse proxy to reroute to different port since our client is going to run on 
### http:localhost:3000

so our backend going to run on 8080 so as you can in this 
block of code in packae.json file 
````
```
  "proxy": "http://localhost:8080/",
  "allowedHosts": [
    "localhost",
    "127.0.0.1"
  ]
```
````


