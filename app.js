const server = require("./server");

const winston = require("winston");

const port = process.env.PORT;
server.listen(port, () => {
  winston.info(`Listening on port ${port}`);
});
