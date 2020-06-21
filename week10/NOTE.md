# 第十周总结

### 小结

- 本周回顾了 web 的 api,和编程练习。完成了 tictactoe

### 巩固的知识点

- css 字体居中
  - 水平居中: text-aline:center
  - 垂直居中: line-height 设置为容器高度

### webApi 整理

- 见 xmind

### 新学 api

#### Range API

- const range = new Range(); (document.createRage())
- range.setStart(element,1)
- range.setEnd(element,5)
- const range = document.getSelection().getRangeAt(0)
- range.setStartBefore
- range.setEndBefore
- range.setStartAfter
- range.setEndAfter
- range.selectNode
- range.selectNodeContents

#### CSSOM

- Rules
  - **document.styleSheets[0].cssRules**
  - document.styleSheets[0].insertRule()
    - document.styleSheets[0].insertRule("p{color: pink;}", 0)
  - **document.styleSheets[0].removeRule(0)**
  - **CSSStyleRule** (普通 Rule)
  - CSSCharsetRule
  - CSSImportRule
  - CSSMediaRule
  - CSSFontFaceRule
  - CSSPageRule
  - CSSNamespaceRule
  - CSSKeyframesRule
  - CSSKeyframeRule
  - CSSSupportsRule
  - ...
- getComputedStyle
  - window.getComputedStyle(elt, pseudoElt);
    - elt 想要获取的元素
    - pseudoElt 伪元素，可选
- window
  - window.open();
    - eg: let childWindow = window.open('about:blank', '\_blank', 'width=100,height=100,left=100,right=100');
  - moveBy() 不可作用于本身，可作用于子窗口
  - resizeBy() 不可作用于本身，可作用于子窗口
  - 滚动
    - scrollX()
    - scrollY()
    - scrollBy()
    - scrollTo()
    - scrollTop
    - scrollLeft
    - scrollHeight
  - getClientRects()
  - document.documentElement.getBoundingClientRect()
  - window.innerWidth
  - window.innerHeight
  - window.outerWidth
  - window.outerHeight
  - window.devicePixelRatio
