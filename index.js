//Challenge 1: Student Grade Generator
function gradeGenerator(marks) {
    if (marks > 79 && marks <= 100) {
        return 'A'
    }
    else if (marks >= 60 && marks <= 79) {
        return 'B'
    }
    else if (marks >= 50 && marks < 60) {
        return 'C'
    }
    else if (marks >= 40 && marks < 50) {
        return 'D'
    }
    else if (marks < 40 && marks >= 0) {
        return 'E'
    }
    else{
        return 'input marks between 0 and 100'
    }
}
//This code will prompt marks input via the terminal to test the grade generator function
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
readline.question('Enter marks ', myNumber => {

    console.log(gradeGenerator(myNumber));
    readline.close();
});





//Challenge 2: Speed Detector
function speedDetector(speed) {
    let demeritPts;
    let myMessage;

    if (speed < 70) {
        myMessage='OK';
    }else if(speed >= 75){

        demeritPts=Math.floor((speed-70)/5);
        myMessage=' Points: '+demeritPts;
        if (demeritPts>12){
            myMessage=myMessage+' License suspended';
        }
    }else{
        myMessage='Slow dowm speed limit exceeded'; //for speeds between 70 and 74 after which demerit points start accumulating
    }

    return myMessage;
}

console.log(speedDetector(72));







//Challenge 3: Net Salary Calculator

//Step 1: Calculate nhif deduction amount
function nhifCalc(grosspay) {
    let nhifDeduct;
    let maxNhifDeduct;
    let lowerBoundArr=[0, 6000, 8000, 12000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000, 60000, 70000, 80000, 90000, 100000];
    let upperBoundArr=[5999, 7999, 11999, 14999, 19999, 24999, 29999, 34999, 39999, 44999, 49999, 59999, 69999, 79999, 89999, 99999];
    let nhifDeductArr=[150, 300, 400, 500, 600, 750, 850, 900, 950, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700];
    
    
    maxNhifDeduct = nhifDeductArr[nhifDeductArr.length-1]; // for pay above 100,000, max nhif deduction is fixed at 1,700

    for (let i = 0; i < lowerBoundArr.length; i++) {
        if (i===lowerBoundArr.length-1){
            return maxNhifDeduct;           

        }else{
            if (grosspay>=lowerBoundArr[i] & grosspay<=upperBoundArr[i]){
                return nhifDeductArr[i];
            }
        }
    }

}

//Step 2: Calculate paye before personal relief
function payeBeforeReliefCalc(grosspay){
    let taxableIncome;
    const pension=200;
    let paye;

    // sub Step 1: Get taxable income
    taxableIncome = grosspay-pension;

    // sub Step 2: Now calculate paye
    const taxAmount1=24000*10/100;
    const taxAmount2=(32333-24000)*25/100;

    if(taxableIncome  > 32333) {
        paye = taxAmount1 +taxAmount2 + (taxableIncome -32333)*30/100;
    } else if(taxableIncome  > 24000 && taxableIncome <32333) {
        paye = taxAmount1 + (taxableIncome -24000)*25/100;
    } else{
        paye = (taxableIncome )*10/100;
    }

    // sub Step 3: Return
    return paye;
}

//Step 3: Summation of all deductions
function deductionsCalc(grosspay){
    // nssf
    let nssf=200; //adopting old rates as new rates are still being contested in court
    console.log('NSSF: '+ nssf)
    // nhif
    let nhif=nhifCalc(grosspay);
    console.log('NHF: ' +nhif);

    // Personal Relief
    const personalRelief=2400;

    // Paye
    let payeBeforeRelief = payeBeforeReliefCalc(grosspay);
    let paye = payeBeforeRelief-(personalRelief);

    console.log('PAYE: ' + paye);

    // Return
    return nssf+nhif+paye;

}

//Step 4: Calculate Netpay
function netPayCalc(grosspay){

    // sub Step 1: Get deductions
    let deductions;
    deductions = deductionsCalc(grosspay);

    // sub Step 2: Get netpay
    return grosspay - deductions;
}

console.log('NETPAY: '+ netPayCalc(80000));
