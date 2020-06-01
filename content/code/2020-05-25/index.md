---
title: "The power of the String.prototype.replace callback"
path: "strin-replace-callback-power"
date: "2020-05-25"
category: "Advice"
kind: "Article"
chunk: "Harness the power of String.prototype.replace with a callback"
tags:
    - Coding
---

The string replace method is an indispensable tool if you need to do any from of string manipulation.

It takes two arguments. The first argument is a string or a regex of what you're trying to match, and the second is what you want to replace the match with.

The first thing to know about the replace method is that if you are trying to match a string, it will only match the first instance.

```js
const text = "My name is Bond, James Bond."
text.replace('Bond', 'Werberjagermanjensen')
// "My name is Werberjagermanjensen, James Bond.
```

To match all instances, a regex match must be used.

```js
const text = "My name is Bond, James Bond."
text.replace(/Bond/gi, 'Werberjagermanjensen')
// "My name is Werberjagermanjensen, James Werberjagermanjensen.
```

But that's nothing. The real power comes from passing a callback function as the second argument instead of a string. With it, you can run all kinds of logic to make more complicated replacements.

In this example, we'll make a function that converts camelCase strings to snake_case.

```js
const convertVarToSnake = string =>
  string.replace(/[A-Z]/g, (match, offset) => {
    // If it's the first character, don't add an underscore
    const underScore = offset > 0 ? '_' : ''
    return underScore + match.toLowerCase();
})
convertVarToSnake("someVariableName")
// some_variable_name
```

This isn't even the tip of the iceberg regarding complex string replacements. To read more, check out the
[MDN article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)
