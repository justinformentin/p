---
title: 'Use Enum Objects'
path: 'use-enum-objects'
date: '2020-06-05'
chunk: 'An overview of how to design better APIs and SDKs.'
type: 'Article'
category: 'Javascript'
tags:
  - SDK
  - API
  - Development
published: 'true'
---


Prefer object enums over string enums and especially over boolean flags.

1. They're easier to reason with
2. You get code completion/intellisense in your editor
3. They're less error prone
4. They're useful when they are part of a larger dynamic system
5. They're extensible

Boolean flags
```js
// No thanks, booleans
let isSmall = false,
    isMedium = false,
    isLarge = true;

if(!isSmall && !isMedium && isLarge){
  // Something big
}
```

Enum strings

```js
// Almost there, but not quite.
let size = 'large' // 'medium' or 'small'

switch(size){
  case 'small':
    // Something small
  case 'medium':
    // Something medium
  case 'large':
    // Something big
}

Enum object.

// Much better
const sizes = Object.freeze({
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
})

switch(size){
  case sizes.SMALL:
    // Something small
  case sizes.MEDIUM:
    // Something medium
  case sizes.LARGE:
    // Something big
}

```

When using the object enum, you only ever have strings in one place. Freeze the object to prevent modification. Another benefit is how easy it is to extend. Let's say you the enum becomes more complicated. You can build on top of your object to handle whatever you need.


You can have varying proprties.
```js
const messageStyles = {
  ERROR: {color: 'red', message: 'This is an error'},
  WARNING: {color: 'yellow', message: 'This is a warning'},
  SUCCESS: {color: 'green', message: 'Success!'},
}
```


If you need to share, you can make a second!
```js
const sizes = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
}

const messageSizes = {
  WARNING: sizes.SMALL,
  ERROR: sizes.MEDIUM,
  LOADING: sizes.MEDIUM,
  SUCCESS: sizes.LARGE,
  WELCOME: sizes.LARGE
}

```
