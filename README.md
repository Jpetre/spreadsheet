## SpreadSheet

### Install project

You can clone or download the project on the Github repository [here](https://github.com/Jpetre/spreadsheet).<br />

### setup API

Go to spreadsheetapi folder, and use `yarn` command in order to install node_modules.<br />
Then, use `npx ts-node app` command to launch api on port 3001.

### setup App

Go to spreadsheetapp folder, and use `yarn` command in order to install node_modules.<br />
then, use `yarn start` command to compile and see the app in your browser [http://localhost:3000](http://localhost:3000).

### What you can do 

You can insert numbers, and formulas with a maximum of two cells, like `=a1+a2`, more cells is not supported yet.
A formula like `=b1` is also supported, it will print b1 value when there is a value, it will be empty otherwise.
Depending on the operator, you can make addition(+), soustaction(-), multiplication(*), or division(/).
**Note: You can't yet mix number and cell like `=b1-10`, it will be implemented in the futur**