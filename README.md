# Udagram Image Filtering Microservice

This API makes use of nodejs to read an image from an URL and then passes it to python with a sub process. Python then filters the image, finds the edges with OpenCV and returns an absolute path to the image to Nodejs.

The processed image, will then be sent as response to the user. Once the image is received by the user, all the temporary working files, will be deleted from the server.

## Get started

### Setup Node environment

In order to use this service, it is necessary to have Nodejs v10.16 (or grater) installed on the machine.

Open a new terminal within the project directory and run:

1. Initialize a new project: `npm i`
2. run the development server with `npm run dev`


### Setup Python3 environment
It is recommended to create a virtual environment for the project.

If you don't have the python3 package, run the following command.
```sh
$ sudo apt-get install python3-venv
```

Navigate into your project folder and create a new enviornment.
```sh
$ sudo python3 -m venv env
```

`env` is the name of the environment. You can give any name you like.

Activate the new environment.

```sh
$ source <path-to-enviornment>/bin/activate

# Considering the environment is called env the command will be
$ source env/bin/activate
```

### Install python dependencies
This service needs two dependencies in order to work
1. OpenCV
2. numpy (required by OpenCV)

Type the following command to install the two libraries.
```sh
$ pip3 install -r requirements.txt
```

### Create a new endpoint in the server.ts file

The starter code has a task for you to complete an endpoint in `./src/server.ts` which uses query paramater to download an image from a public URL, filter the image, and return the result.

We've included a few helper functions to handle some of these concepts and we're importing it for you at the top of the `./src/server.ts`  file.

```typescript
import {filterImageFromURL, deleteLocalFiles} from './util/util';
```

### Deploying your system

Follow the process described in the course to `eb init` a new application and `eb create` a new enviornment to deploy your image-filter service! Don't forget you can use `eb deploy` to push changes.

## Stand Out (Optional)

### Refactor the course RESTapi

If you're feeling up to it, refactor the course RESTapi to make a request to your newly provisioned image server.

### Authentication

Prevent requests without valid authentication headers.
> !!NOTE if you choose to submit this, make sure to add the token to the postman collection and export the postman collection file to your submission so we can review!

### Custom Domain Name

Add your own domain name and have it point to the running services (try adding a subdomain name to point to the processing server)
> !NOTE: Domain names are not included in AWS’ free tier and will incur a cost.
