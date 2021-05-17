const repl = require("repl");
const glob = require("glob");
const path = require("path");

require('reflect-metadata');
const { createConnection, BaseEntity } = require('typeorm');

const replServer = repl.start({
  prompt: "Node console > "
});

(async function(){
  await createConnection();
  replServer.context.BaseEntity = BaseEntity;

  glob.sync('./dist/entities/*.js').forEach((file: string) => {
    const [filename] = path.basename(file).split(".");
    replServer.context[filename] = require(path.resolve(file));
  });
  console.log("Connection ready");
})();