/**
 * @author liuyuan
 * @des 检测字符串里是否有abcabx，mely型状态机写法
 * @param {}
 * @param {}
 * @return {}
 */
function match(string) {
    let state = start;
    for (let c of string) {
        state = state(c);
    }
    return state === end;
}

function start(c) {
    if (c === "a") {
        return foundA;
    } else {
        return start;
    }
}

function end() {
    return end;
}

function foundA(c) {
    if (c === "b") {
        return foundB;
    } else {
        return start(c);
    }
}
function foundB(c) {
    if (c === "c") {
        return foundC;
    } else {
        return start(c);
    }
}
function foundC(c) {
    if (c === "a") {
        return foundA2;
    } else {
        return start(c);
    }
}
function foundA2(c) {
    if (c === "b") {
        return foundB2;
    } else {
        return start(c);
    }
}
function foundB2(c) {
    if (c === "x") {
        return end;
    } else {
        return foundB(c); // 找到第二个b时如果还不是x则返回找到b的状态
    }
}

console.log(match("abcabcabx"));

// ababx
