# 第六周总结

本周解析了作为字符串的 html 和里面的 css 规则，将字符串解析成了 html 的带有计算样式的 dom

-   浏览器通过 http 请求获取 html 字符串
-   解析 html 字符串为 html(状态机解析)
-   获取所有的 style 规则后，开始计算 css，将 html 的 dom 结构带上 css 的属性
