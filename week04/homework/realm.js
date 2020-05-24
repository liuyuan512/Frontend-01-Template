const globalProperties = [
    "eval",
    "isFinite",
    "isNaN",
    "parseFloat",
    "parseInt",
    "decodeURI",
    "decodeURIComponent",
    "encodeURI",
    "encodeURIComponent",
    "Array",
    "Date",
    "RegExp",
    "Promise",
    "Proxy",
    "Map",
    "WeakMap",
    "Set",
    "WeakSet",
    "Function",
    "Boolean",
    "String",
    "Number",
    "Symbol",
    "Object",
    "Error",
    "EvalError",
    "RangeError",
    "ReferenceError",
    "SyntaxError",
    "TypeError",
    "URIError",
    "ArrayBuffer",
    "SharedArrayBuffer",
    "DataView",
    "Float32Array",
    "Float64Array",
    "Int8Array",
    "Int16Array",
    "Int32Array",
    "Uint8Array",
    "Uint16Array",
    "Uint32Array",
    "Uint8ClampedArray",
    "Atomics",
    "JSON",
    "Math",
    "Reflect",
];
const set = new Set();
let quene = [];
for (let p of globalProperties) {
    // console.log(this);
    quene.push({
        path: [p],
        object: this[p],
    });
}
let current;
console.log(current);
while (quene.length) {
    current = quene.shift();
    if (set.has(current.object)) continue;
    set.add(current.object);

    const prop = Object.getPrototypeOf(current.object);
    if (prop) {
        quene.push({
            path: current.path.concat("__proto__"),
            object: prop,
        });
    }
    console.log(current.path.join("."));
    // console.log(current);
    // console.log(Object.getOwnPropertyNames(current.object));
    for (let p of Object.getOwnPropertyNames(current.object)) {
        const property = Object.getOwnPropertyDescriptor(current.object, p); // 当前全局对象的当前属性的属性描述
        // if (
        //     property.hasOwnProperty("value") &&
        //     typeof property.value === "object" &&
        //     !(property.value instanceof Object)
        // ) {
        //     debugger;
        // }
        if (
            property.hasOwnProperty("value") &&
            typeof property.value === "object" &&
            property.value instanceof Object
        ) {
            // console.log("value:", property.value);
            quene.push({
                path: current.path.concat([p]),
                object: property.value,
            });
        }
        if (
            property.hasOwnProperty("get") &&
            typeof property.get === "function"
        ) {
            // console.log("get:", property.get);
            quene.push({
                path: current.path.concat([p]),
                object: property.get,
            });
        }
        if (
            property.hasOwnProperty("set") &&
            typeof property.set === "function"
        ) {
            // console.log("set:", property.set);
            quene.push({
                path: current.path.concat([p]),
                object: property.set,
            });
        }
    }

    // const property = Object.getOwnPropertyDescriptor();
}
