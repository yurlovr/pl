# Beautiful-readme #

Nash-travel project about Crimean beaches

## Demo ##
[Here](https://develop.krym-project.cloud) (built from *this* readme) and
[here](http://gehrcke.de/timegaps) (built from a readme for another project).


## Usage example ##
Input:

- Development address [Here](https://develop.krym-project.cloud) https://develop.krym-project.cloud
- Master address [Here](https://master.krym-project.cloud) https://master.krym-project.cloud


## Installation and build ##

For building and development need at least NodeJS 10 or high.

```
Install NodeJS packages: `npm ci`
Create .env.js file from .env.example.js: `cp .env.example.js .env.js` (after this, you can use environment variable URL_API to change backend url)
For local development use command: `npm run dev`
For run in production mode build server and client files by command: `npm run build`
For start production server use command: `npm run start`
```

## Docker image ##

In project present production ready docker file for deployment. 
To build docker image use command: ` docker build . -t krym-vue:latest --build-arg URL_API=https://yourbackendaddress.com 
You can run docker image in daemon mode by command: `docker run -d --name krym-vue --restart=always -p 127.0.0.1:3000:3000 krym-vue:latest

Notice: You can pass environment URL_API only on build stage. 