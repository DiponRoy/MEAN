https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
https://www.geeksforgeeks.org/how-to-create-multiple-routes-in-the-same-express-js-server/
https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1
https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-2


Quick Start:

.env:
https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786


api doc:
https://www.section.io/engineering-education/documenting-node-js-rest-api-using-swagger/
https://www.youtube.com/watch?v=S8kmHtQeflo code sample https://github.com/satansdeer/swagger-api-library

use import:
https://stackoverflow.com/questions/45854169/how-can-i-use-an-es6-import-in-node-js

ts:
https://developer.okta.com/blog/2018/11/15/node-express-typescript

file structure:
https://www.coreycleary.me/project-structure-for-an-express-rest-api-when-there-is-no-standard-way

sample project:
https://github.com/MoathShraim/Nodejs-rest-api-project-structure-Express


Response Time
http://expressjs.com/en/resources/middleware/response-time.html

unique id to header
https://github.com/floatdrop/express-request-id

GUID
https://github.com/uuidjs/uuid

Error:
Central Error Handling
https://codeburst.io/better-error-handling-in-express-js-b118fc29e9c7
https://scoutapm.com/blog/express-error-handling
https://dev.to/nedsoft/central-error-handling-in-express-3aej
https://expressjs.com/en/guide/error-handling.html

logger:
winston
https://www.youtube.com/watch?v=m2q1Cevl_qw&t=569s
https://www.section.io/engineering-education/logging-with-winston/
https://www.npmjs.com/package/winston

audit logger:
https://github.com/PayU/express-request-logger
https://github.com/trentm/node-bunyan

----------
not working

Access request object from any class
https://www.npmjs.com/package/continuation-local-storage
https://stackoverflow.com/a/48063327/2948523

https://stackoverflow.com/questions/59433960/continuation-local-storage-loses-values-after-await-async-call
----------

validation:
express validator: 
https://www.youtube.com/watch?v=WvwMAJU1bd4
express validator middleware
https://express-validator.github.io/docs/running-imperatively.html
another option joi
https://www.youtube.com/watch?v=F-1GD_F8jHg

auth:
https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/

mongo:
https://www.youtube.com/watch?v=hP77Rua1E0c
https://www.youtube.com/watch?v=DzyC8lqbjC8

docker:
node
https://nodejs.org/de/docs/guides/nodejs-docker-webapp/
https://faun.pub/step-by-step-guide-to-dockerize-a-node-js-express-application-cb6be4159cf1
https://www.cloudbees.com/blog/using-docker-compose-for-nodejs-development
mongo
https://hub.docker.com/_/mongo?tab=description


libs:

env
npm install dotenv

request-id
npm i express-request-id

response-time
npm install response-time

logger
npm install winston

----------
not working

Access request object from any class
npm i continuation-local-storage

npm i cls-hooked
----------

GUID
npm install uuid

apidoc:
swagger-jsdoc
swagger-ui-express

validation:
express-validator

cmds
npm install --save-dev basetag
npm uninstall --save-dev basetag