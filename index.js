const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express();
const PORT = process.env.PORT || 5000

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/math', handleMath);
app.get('/math_service', math_service);
app.get('/', (req, res) => res.render('pages/index'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))


function handleMath(request, response) {
    let operand1 = Number(request.query.operand1);
    let operator = request.query.operator;
    let operand2 = Number(request.query.operand2);
    let params = calculate(operand1, operator, operand2);
    response.render('pages/result', params);
}

function math_service(request, response) {
    console.log("Math service");
    let operand1 = Number(request.query.operand1);
    let operator = request.query.operator;
    let operand2 = Number(request.query.operand2);
    let params = calculate(operand1, operator, operand2);
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(params));
}

function calculate(operand1, operator, operand2) {
    let answer = 0;
    if (operator == 'add') {
        answer = operand1 + operand2;
    } else if (operator == 'subtract') {
        answer = operand1 - operand2;
    } else if (operator == 'multiply') {
        answer = operand1 * operand2;
    } else {
        answer = operand1 / operand2;
    }
    const params = { operator: operator, operand1: operand1, operand2: operand2, answer: answer };
    return params;
}