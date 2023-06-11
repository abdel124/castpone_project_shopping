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
after you create your aws account and IAM user you have to have all this infromation to populate these variables
need to create s3 bucket , and cloud front domaine and profile 

export AWS_REGION="" // aws region
export CLOUD_FRONT="" //cloud front domaine
export AWS_PROFILE="" // aws profile of IAM user
export AWS_BUCKET="" // s3 bucket to store your videos and images
export JWT_SECRET="" // use your own jwt secret
```
````

this variables are used in our code stored locally for security purpose as you can see in this block we have config file for each service

````
```
const config = {
  'aws_region': process.env.AWS_REGION,
  'aws_profile': process.env.AWS_PROFILE,
  'aws_media_bucket': process.env.AWS_BUCKET,
  'cloudfront' : process.env.CLOUD_FRONT,
  'url': process.env.URL,
  'jwt': {
    'secret': process.env.JWT_SECRET,
  },
};

module.exports = {
  config,
};
```
````
## client side :
so after clonning the repository locally just go to client folder and run :
to install all dependency 
### `npm i --force`

after the installation is done 
### npm start

Note : in package.json we are using reverse proxy to reroute to different port since our client is going to run on 
### http:localhost:3000

so our backend going to run on 8080 so as you can in this 
block of code in package.json file 
````
```
  "proxy": "http://localhost:8080/",
  "allowedHosts": [
    "localhost",
    "127.0.0.1"
  ]
```
````

## server side :
for server side since we are follwoing microservice architecture we are doploying our services on docker , and our backened is composed on four services
### -authentification
   handle all authentification request
### -user
    user operations login , logout .. 
### -video
    handle video operations request adding video , request video , search for video
### -comment
    handle comments request , add comment , remove comment ....
### -nginx reverse proxy
    for reverse proxy we use it to forward request to the correct service it behaves like load balancer

so to deploy these servers just go to server folder where you can find the docker-compose.yaml file that  contains the difinitions of 
our services each servvice is gonna be a docker image

and run the follwoing commands
````
```
docker compose build  //to build the images
docker compose up // to start the services
```
````


