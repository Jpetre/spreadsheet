import { Request, Response, Application } from 'express';
import { ColumnDataType } from '../../types/types';

const alphabet = ' abcdefghijklmnopqrstuvwxyz'.split('');

const appRouter = (app: Application) => {
  app.get('/favicon.ico', (req: Request, res: Response) => res.sendStatus(204));

  app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Welcome to our restful API');
  });

  app.get('/:computations', (req: Request, res: Response) => {
    const computations: string = req.params.computations;

    const json: ColumnDataType = JSON.parse(computations);
    const columnLength = Object.keys(json).length;
    const rowLength = Object.keys(json[1]).length;

    for (let x = 1; x < columnLength + 1; x++) {
      for (let y = 1; y < rowLength + 1; y++) {
        const inputValue = json[x][y].inputValue;
        if (inputValue.includes('=') === true) {
          const isAddition = inputValue.includes('+');
          const isSoustraction = inputValue.includes('-');
          const isMultiplication = inputValue.includes('*');
          const isDivision = inputValue.includes('!');
          const isAlone = !isAddition && !isSoustraction && !isMultiplication && !isDivision;
          // First cell computing
          const firstCell = inputValue.slice(1, 3);
          const firstColumn = alphabet.findIndex(value => value === firstCell[0].toLowerCase());
          const firstCellCompute = json[firstColumn][firstCell[1]].value;
          if (firstCellCompute === '') {
            json[x][y].value = '';
            break;
          }
          // if it's just one cell then we are done
          if (isAlone) {
            json[x][y].value = firstCellCompute;
          }
          else {
            // Second cell computing
            const secondCell = inputValue.slice(4, 6);
            const secondColumn = alphabet.findIndex(value => value === secondCell[0].toLowerCase());
            const secondCellCompute = json[secondColumn][secondCell[1]].value;
            // If there is no value on the second cell of the formula, then we are setting this value to empty string
            if (secondCellCompute === '') {
              json[x][y].value = '';
              break;
            }
            json[x][y].value =
              (isAddition && Number(firstCellCompute) + Number(secondCellCompute)) ||
              (isSoustraction && Number(firstCellCompute) - Number(secondCellCompute)) ||
              (isMultiplication && Number(firstCellCompute) * Number(secondCellCompute)) ||
              (isDivision && Number(firstCellCompute) / Number(secondCellCompute)) || 0;
          }
        }
      }
    }

    res.status(200).send({ result: json });
  });
}

module.exports = appRouter;