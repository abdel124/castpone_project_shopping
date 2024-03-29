# castpone_project_video_sharring_app
this is project about video sharing app developped using react js in frontend and nodejs in backend . I am following micro service architecture
in this app
link to repository : 

````
https://github.com/abdel124/castpone_project_shopping
````

# Local Deployment 
so to deploy both frontend and backened you have to make sure that you have aws account and create aan IAM user and get credentials to store locally (ID , Secret key) and depending on your operation system , so you need to add the credentials to aws folder in credentials file
(~/.aws/credentials)
````
aws_access_key_id = ""
aws_secret_access_key = ""
````

and for add the all variable to ~/.bash_proilfe depending on your operations system this example for mac user.
after you create your aws account and IAM user you have to have all this infromation to populate these variables
need to create s3 bucket , and cloud front domaine and profile  
create dynamo db tables (video , user , comment) we are using these names in our code
after creating the resource populate these varibales

````
export AWS_REGION="" // aws region
export CLOUD_FRONT="" //cloud front domaine
export AWS_PROFILE="" // aws profile of IAM user
export AWS_BUCKET="" // s3 bucket to store your videos and images
export JWT_SECRET="" // use your own jwt secret


for cloud front don't forget to add permission policy to s3 bucket to give access to cloud front.
````

this variables are used in our code stored locally for security purpose as you can see in this block we have config file for each service
you can see them example of config file you can sse : server/auth/src/config/config.js how we are using these variables
````
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
block of code in package.json file also if you are using a load balancer you have to change the loacl host to load balancer ip adress
````
  "proxy": "http://localhost:8080/",
  "allowedHosts": [
    "localhost",
    "127.0.0.1"
  ]
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
docker compose build  //to build the images
docker compose up // to start the services

you can notice we are using different port for each service because they are going to run on the same machine so we make sure they have different port number otherwise you are going to see the error that the port already useb by other service 
````


