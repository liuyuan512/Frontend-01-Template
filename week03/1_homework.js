/**
 *  1. 编程题目见下方
 * 	2. 特殊对象的总结见NOTE.md
 */

/**
 * @author liuyuan
 * @des 将strting都转换成number,不使用Number方法
 * @param {String} string 数字字符串
 * @param {Number} x 进制,默认是10
 * @return {Number} 转后的数字
 */
const convertStringToNumber = (string, x = 10) => {
    const stringArray = string.split("");
    let num = 0;
    let i = 0;
    while (i < stringArray.length && stringArray[i] !== ".") {
        num *= x;
        num += stringArray[i].codePointAt(0) - "0".codePointAt(0);
        i++;
    }
    if (stringArray[i] === ".") i++;

    let fraction = 1;
    while (i < stringArray.length) {
        fraction /= x;
        num += fraction * (stringArray[i].codePointAt(0) - "0".codePointAt(0));
        i++;
    }
    return num;
};

// 测试
console.log(convertStringToNumber("10.00234"));



/**
 * @author liuyuan
 * @des 将num转换成string， 忽略了num - Math.floor(num)的精度问题
 * @param {Number} num 需要转成字符串的数字
 * @param {Number} x 转换的进制
 * @return {String} 转换以后的字符串
 */
const convertNumberToString = (num, x = 10) => {
    let fraction = num - Math.floor(num);
    let integer = Math.floor(num);
    let string = "";
    while (integer > 0) {
        string = (integer % x) + string;
        integer = Math.floor(integer / x);
    }

    let fString = ".";
    while (fraction > 0) {
        console.log("fraction:", fraction);
        fString += String(Math.floor(fraction * x));
        fraction = fraction * x - Math.floor(fraction * x);
    }
    if (fString.length > 1) {
        string += fString;
    }
    return string;
};

// 测试
console.log(convertNumberToString(123));
