function initMiddleware(req, res, middleware) {
    return new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve();
      });
    });
  }
  
  module.exports = initMiddleware;
  