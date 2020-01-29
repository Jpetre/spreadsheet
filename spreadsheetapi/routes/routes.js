const appRouter = function (app) {
  app.get("/", function(req, res) {
    res.status(200).send("Welcome to our restful API");
  });
  app.get("/:computation", function(req, res) {
    const computation = req.params.computation;
    res.status(200).send({result: eval(computation)});
  });
}

module.exports = appRouter;