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
app.get('/getRate', handlePostage);
app.get('/', (req, res) => res.render('pages/index'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

//Team acitivty
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

//Prove activity
function handlePostage(request, response) {
    let mailType = Number(request.query.mailType);
    let weight = Number(request.query.weight);
    let params = calculateRate(mailType, weight);
    response.render('pages/result', params);
}

function calculateRate(mailType, weight) {
    let postage;
    let typeOfMail = "";
    switch (mailType) {
        case 1:
            typeOfMail = "Letters (Stamped)";
            if (weight <= 1) {
                postage = 0.55;
            } else if (weight > 1 && weight <= 2) {
                postage = 0.75;
            } else if (weight > 2 && weight <= 3) {
                postage = 0.95;
            } else if (weight > 3 && weight <= 3.5) {
                postage = 1.15;
            }
            break;
        case 2:
            typeOfMail = "Letters (Metered)";
            if (weight <= 1) {
                postage = 0.51;
            } else if (weight > 1 && weight <= 2) {
                postage = 0.71;
            } else if (weight > 2 && weight <= 3) {
                postage = 0.91;
            } else if (weight > 3 && weight <= 3.5) {
                postage = 1.11;
            }
            break;
        case 3:
            typeOfMail = "Large Envelopes (Flats)";
            if (weight <= 1) {
                postage = 1.00;
            } else if (weight > 1 && weight <= 2) {
                postage = 1.20;
            } else if (weight > 2 && weight <= 3) {
                postage = 1.40;
            } else if (weight > 3 && weight <= 4) {
                postage = 1.60;
            } else if (weight > 4 && weight <= 5) {
                postage = 1.80;
            } else if (weight > 5 && weight <= 6) {
                postage = 2.00;
            } else if (weight > 6 && weight <= 7) {
                postage = 2.20;
            } else if (weight > 7 && weight <= 8) {
                postage = 2.40;
            } else if (weight > 8 && weight <= 9) {
                postage = 2.60;
            } else if (weight > 9 && weight <= 10) {
                postage = 2.80;
            } else if (weight > 10 && weight <= 11) {
                postage = 3.00;
            } else if (weight > 11 && weight <= 12) {
                postage = 3.20;
            } else if (weight > 12 && weight <= 13) {
                postage = 3.40;
            }
            break;
        case 4:
            typeOfMail = "First-Class Package Service—Retail";
            if (weight <= 4) {
                postage = 4.00;
            } else if (weight > 4 && weight <= 8) {
                postage = 4.80;
            } else if (weight > 8 && weight <= 12) {
                postage = 5.50;
            } else if (weight > 12 && weight <= 13) {
                postage = 6.25;
            }
            break;
        default:
            postage = 0;
            break;
    }
    const params = { mailType: typeOfMail, weight: weight, postage: postage };
    return params;
}