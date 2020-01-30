const alphabet = ' abcdefghijklmnopqrstuvwxyz'.split('');

const appRouter = function (app) {
  app.get('/favicon.ico', (req, res) => res.sendStatus(204));

  app.get("/", function(req, res) {
    res.status(200).send("Welcome to our restful API");
  });
  app.get("/:computation", function(req, res) {
    const computation = req.params.computation;
  
    const json = JSON.parse(computation);
    const columnLength = Object.keys(json).length;
    const rowLength = Object.keys(json[1]).length;

    for (let x = 1; x < columnLength + 1; x++) {
      for (let y = 1; y < rowLength + 1; y++) {
        const inputValue = json[x][y].inputValue;
        if(inputValue.includes('=') === true) {
          const isAddition = inputValue.includes('+');
          const isSoustraction = inputValue.includes('-');
          const isMultiplication = inputValue.includes('*');
          const isDivision = inputValue.includes('!');
          const isAlone = !isAddition && !isSoustraction && !isMultiplication && !isDivision;

          const firstCell = inputValue.slice(1,3);
          const firstColumn = alphabet.findIndex(value => value === firstCell[0]);   
          const firstCellCompute = json[firstColumn][firstCell[1]].value;
          if(firstCellCompute === "") {
            json[x][y].value = "";
            break;
          }
          if(isAlone) {
            json[x][y].value = firstCellCompute;
          }
          else {
            const secondCell = inputValue.slice(4,6);
            const secondColumn = alphabet.findIndex(value => value === secondCell[0]); 
            const secondCellCompute = json[secondColumn][secondCell[1]].value;  
            if(secondCellCompute === "") {
              json[x][y].value = "";
              break;
            }
            json[x][y].value = 
              (isAddition && Number(firstCellCompute) + Number(secondCellCompute)) ||
              (isSoustraction && Number(firstCellCompute) - Number(secondCellCompute)) ||
              (isMultiplication && Number(firstCellCompute) * Number(secondCellCompute)) ||
              (isDivision && Number(firstCellCompute) / Number(secondCellCompute));
          }
        }
      }
    }
    
    res.status(200).send({result: json});
  });
}

module.exports = appRouter;