// Adding AppD instrumentation
// Checking to make sure the appdynamics lib is installed.
try {
  require.resolve("appdynamics");  
  console.log("appdynamics resolved");

  require("appdynamics").profile({
    controllerHostName: 'controller.saas.appdynamics.com',
    controllerPort: 8090,
    accountName: 'account',
    accountAccessKey: 'access-key',
    applicationName: 'application-name',
    tierName: 'tier-name',
    nodeName: 'node-name' // The controller will automatically append the node name with a unique number
   });   
} catch (e) {
  console.error("Could not resolve appdynamics npm");
}

const app = require('koa')();
const router = require('koa-router')();
const db = require('./db.json');

// Log requests
app.use(function *(next){
  const start = new Date;
  yield next;
  const ms = new Date - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

router.get('/api/threads', function *() {
  this.body = db.threads;
});

router.get('/api/threads/:threadId', function *() {
  const id = parseInt(this.params.threadId);
  this.body = db.threads.find((thread) => thread.id == id);
});

router.get('/api/', function *() {
  this.body = "API ready to receive requests";
});

router.get('/', function *() {
  this.body = "Ready to receive requests";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);

console.log('Worker started');
