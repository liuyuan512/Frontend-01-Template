/**
 * @author liuyuan
 * @des 检测字符串里是否有abababx，mely型状态机写法
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
    if (c === "a") {
        return foundA3;
    } else {
        return start(c);
    }
}
function foundA3(c) {
    if (c === "b") {
        return foundB3;
    } else {
        return start(c); // 找到第二个b时如果还不是x则返回找到b的状态
    }
}
function foundB3(c) {
    if (c === "x") {
        return end;
    } else {
        return foundB2(c); // 找到第二个b时如果还不是x则返回找到b的状态
    }
}

console.log(match("abcabcababcabx"));

// ababx

/**
 * @author liuyuan
 * @des 可选作业，匹配任何模式
 * @param {}
 * @param {}
 * @return {}
 */
function patternMatch(pattern, string) {}

console.log(patternMatch("ababx", "I am a mogu!"));
