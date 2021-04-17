---
title: "Event Listener Removal"
path: "event-listener-removal"
date: "2020-06-19"
chunk: "A quick look at an important event listener gotcha."
kind: "JavaScript"
category: "JavaScript"
tags:
    - Coding
    - JavaScript
published: "true"
---

To properly [remove an event listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener), the callback of your event listener must be the same function reference.

## Function Objects
The reason for this is that [Functions are Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions).

We can see that this is the case by checking the instance of a function.

```js
function whatAmI(){}

whatAmI instanceof Function // true
whatAmI instanceof Object // true
```

## Memory Reference
When [objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) are created, they're stored in memory as unique pieces of information. We can prove this by  checking equality or strict equality of two seemingly identical objects.

```js
{} === {} // false
```

This check evaluates to `false` because the JavaScript engine is basically seeing

```js
"Object Reference One" === "Object Reference Two"
```

Of course that wouldn't be equal.

## Event Removal

If we added an event with an anonymous function as the callback, it wouldn't get removed for the reasons above. Even though the function looks identical to us, in memory they are two completely separate, unique references.

```js
el.addEventListener('someEvent', (e) => console.log(e));
el.removeEventListener('someEvent', (e) => console.log(e));
```

To make this work, you need both callbacks to be the same function reference.

```js
const callbackFunc = (e) => console.log(e);
el.addEventListener('someEvent', callbackFunc);
el.removeEventListener('someEvent', callbackFunc);
```
