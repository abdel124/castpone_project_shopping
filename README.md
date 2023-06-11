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
## hello

