---
title: "Event Listener Handling"
path: "event-listener-handling"
date: "2020-05-02"
chunk: "A quick look at an important event listener gotcha."
kind: "Random"
category: "Javascriprt"
tags:
    - Development
---

The callback of your event listener must be the exact same function. For example

```js
el.addEventListener('someEvent', () => callbackFunc())
el.removeEventListener('someEvent', () => callbackFunc())
```

will not work and will result in the event listener never being removed. To make this work you need the same 'reference'.

```js
const callbackFunc = () => {}
el.addEventListener('someEvent', callbackFunc)
el.removeEventListener('someEvent', callbackFunc)
```

will work because the 'callbackFunc' you're passing is identical in both the addEventListener and removeEventListener.

The reason for this is because functions are objects in in JavaScript, and each object stored in memory gets a unique reference. This is why if you try entering

```
{} == {}
```

in the console, you'll get false. The JavaScript engine basically sees that as

Object_Reference_1 == Object_Reference_2

and of course that will be false.

To read more about JavaScript objects in another article of mine, [JavaScript Objects](https://justinformentin.com/dev/javascripts-objects). Or you know, any one of the million of articles online about objects. [MDN Docs about Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) is always a good place to start.