/**
 * @author liuyuan
 * @des 检测字符串里是都含有ab,传统型写法
 * @param {} 
 * @param {} 
 * @return {} 
 */

function match(string) {
    let foundA = false;
    for (let c of string) {
        if (c === "a") 
            foundA = true;
        else if (foundA && c === "b") 
            return true;
        else 
            foundA = false;
    }
    return false;
}

console.log(match("acb"));

// ababx
