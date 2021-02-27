---
title: "Object Literals vs Switch Statements"
path: "object-literal-vs-switch"
date: "2020-05-26"
category: "Advice"
kind: "Article"
chunk: "Object Literals vs Switch Statements"
tags:
    - Coding
published: "true"
---




This post is not to argue the use of one over the other. As with pretty much everything related to programming, you should decide what syntax, structure, style, etc. to use that best fits your needs.

This post is just an overview of what's possible, because the more you know, the better equipped you'll be to make those decisions in the future.

### Switch

```js
const numberCheck = numStr => {
  switch(numStr) {
   case("one"):
     return "Its number one!"
   case("two"):
     return "Its number two!"
   default:
     return "Nothing"
  }
}
```
Switches are nice because it's easy to see what's going on- there are clear returns. You can use any complex logic, return functions, whatever you want and the structure won't get more complicated than that.

### Object Literals

An object literal is just that.

```js
const obj = {
'one': 'Its number one!',
'two': 'Its number two!'
}

const two = obj.two
// Its number two!
```

Let's turn it into a function

```js
const numberCheck = (numStr) => ({
  'one': 'Its number one!',
  'two': 'Its number two!'
})[numStr]
numberCheck('two')
// 'Its number two!'
```

The array at the end is basically what you'd be doing by writing out the object like `obj[numStr]`, or think of it like the switch's `case` (but it isn't really).

It's totally subjective, but I think object literals are a nice alternative for very simple switches. They're just more compact and look nicer, to me anyway. Of course, if you have a *really* simple switch/object literal, ifs are the way to go.

One issue with object literals is as soon as you need to do more complicated lookups/returns, the code quickly becomes less readable.

Again, this is all just opinion since the more tools you have at your disposal, the better. If something works for you, use it.

To get another point of reference, check out an [article by Drew Hoover](https://spin.atomicobject.com/2016/11/06/switch-statements-object-literals/)