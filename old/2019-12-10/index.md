---
title: "Writing software for other developers - designing better APIs and SDKs"
path: "writing-software-for-other-developers"
cover: ""
date: "2019-12-10"
chunk: ""
category: "Javascript"
tags:
  - SDK
  - API
  - Development
---

Below I'll go over some improvements that should be considered when building your own product to avoid some of the pitfalls I encountered.

## Naming

Naming is difficult. You need to convey 0000000000000000000

### Booleans
A general rule is to stay far away from gerunds. Any name that is nonfinite, or that could imply an ongoing state of being. 'isLoading' is one of the most common offenders of this rule. If 'isLoading' is false, what does that mean - did it finish loading? Did it ever start loading? A much better name would be 'isLoaded' or 'hasLoaded', which if true immediately tells you that it did load, and it is done loading currently. Another problem with 'isLoading' is the backwards 00000 / negative. If you're checking if something is loading, you're looking for if 'isLoading' is false. That alone doesn't seem too bad, but if you're mixing positive and negative boolean names all over the place, you're going to quickly increase the cognitive load of just figuring out what's going on in the code. I'm sure many people have had experiences trying to calculate a string of booleans in their head qhile scanning through some code only to have to pause to break down each variable.

```js
if(!isLoading && dataExists && !dataDisplaying){
  showNewData()
}

if(hasLoaded && dataExists && dataHasDisplayed){
  showNewData()
}
```
FINSISH - FIX CODE EXAMPLE VARS

### Functions/Methods

Two schools of thought
Two styles of function names:
1. If it returns a single piece of data, it's ok to be a noun - 'messageList'
2. If it changes data in any way, it should be a verb - 'updateMessageList'

One style of funciton name
1. It should always be a verb 'getMessageList', 'updateMessageList'

### Avoid using native names

There are variables, objects, and functions that are a part of Javascript, or a part of the browser, and these names should not be used. There are reserved keywords, object properties, global objects, functions, etc. Naming anything with part of those names 0000000000000000 should be avoided 0000000

Don't name an object 'messageMap', or 'messageSet' for example. Sets and Maps exist, and they are expected to work a certain way. If part of your product needs to listen to events, do not create a function or worse, an object property, 'addEventListener', for example.

```js

```

### Your code is not self documenting

Write comments. Write documentation. It's as simple as that. If anybody tells you their code is self documenting, they're mistaken. The people whose code truly is as close to self documenting as possible, wouldn't say that phrase. You'd have to be incredibly conceited to believe that your code is so amazing and clear that you don't need to write even any comments. That phrase has almost turned into a joke, yet I still hear people say that their code is self document and mean it seriously.

Also, the argument "Well outdated comments are as good as useless" as if that's an argument to not write comments in the first place. No kidding outdated comments are useless. You need to update them. That would be like arguing against buying a plant because they're useless unless you water them. If you don't want to kill plants, your two options are 1. Don't buy a plant or 2. Water the plant. There's no third option. Same with comments. You will update functions in the future. At the same time, you update the comment. That's it. And unless you're completely changing a function, even a slightly outdated comment will be more helpful than none at all. It doesn't matter how good you are at naming things, or how clear you think certain parts of the code are, what is obvious to you, and what is obvious to someone else are never the same. There will be a time that you come back maybe next week, maybe next year, and you won't remember exactly what's going on in the code. And you will wish you had even a single line comment. And even if you know you'll never come back to the code, just have a little empathy for the next person that will inevitable need to re-read your "clean, self documenting code" to understand what you were doing. If you're still not convinced, you should try one or both of these exercises. Go find someone else that claims their code is self documenting and task yourself with reading and understanding a portion of it. Or better yet, post your code online and ask for criticism and when someone inevitably asks a question about something, you're only allowed to say "But my code is self documenting" and see how people react.

## Function / Method Arguments

When you write a function, there are a few ways to pass arguments. As an object, positionally, or a mixture of the two.

Positional arguments must be passed in the correct order, and the argument names don't matter to the function. Although they do matter to other developers reading your code. Don't be the person that writes single letters for everything. Take this function for example:

```js
const posisitionalArgs = (name, age) => {
  const doubleAge = age * 2;
  const newName = name.toUpperCase();
  return newName + " is " + doubleAge;
};
positionalArgs("bob", 20);
// 'BOB is 40
```

If you switch the position of the name and the age, you'll get a TypeError because you can't `* 2` a string, and you can't `.toUpperCase()` a number.

Now what if you decide that the name isn't really important, and it can be optional or removed from the function. If it's in an app or website you're writing, this is totally fine. Just switch the arguments around, add conditionals to the function, do whatever you want because it's your function, and you're the only one using it.

But what if this is a function that's exposed and other developers are using it? You can't just switch the position of the arguments because everybody's code will break. If you're using semantic versioning, you could always bump the major version of your project so people need to conscientiously upgrade the package, and then change their code. But you probably would like to save yourself the embarassment of upgrading from version 2 to 3 for "repositioning arguments".

The simple solution is to use an object as the argument, or named arguments. The position of individual parameters doesn't matter, and the names do matter.

```js
const objectArg = ({ name, age }) => {
  const doubleAge = age * 2;
  const newName = name.toUpperCase();
  return newName + " is " + doubleAge;
};
objectArg({ age: 20, name: "bob" });
```

Generally speaking, it's good practice to use the object argument in functions you are exposing to consumers of your code. However, in some cases a mixture of positional and object arguments can be used. A good example would be a function that will absolutely 100% always need a specific argument. Let's say you have a function that manipulates data in an array. To access the exact item in the array, you will find/findIndex/filter/etc using the item's id. So you know you will always require the id.

```js
const arr = [
  { id: "x8h9d34", price: 5, color: "blue" },
  { id: "j9i68d0", price: 9, color: "red" },
  { id: "h3f7a9s", price: 7, color: "green" }
];
const updateItem = (id, { color }) => {
  const idx = arr.findIndex(item => item.id === id);
  if (idx !== -1) {
    const newArr = arr.slice();
    newArr.splice(idx, 1, { ...arr[idx], color });
    return newArr;
  } else {
    return "Item not found.";
  }
};
updateItem('j9i68d0', { color: "purple" });
```


## Flexibility

You need to find a balance between having your sdk be really locked down, and way too flexible. If it's too flexible, you're going to have to handle so many optional or conditional cases and the complexity of each part will dramatically increase, and be so much harder to test and also inevitably debug. Verbosity is beneficial in this case.

## Be as helpful as you can
## Think of the person using your product
## Be 0000 of the person

The developers using your product will manage to break it in all of the ways you didn't even think of.

You wrote a few helpful error messages and guards against certain undesirable behavior, and then someone using your SDK will come back to you with an error that you can't even imagine how it happened. So you ask them for steps to reproduce it, you try to debug the issue, and you can't reproduce it.

You ask them for steps to reproduce. They give it to you, but you still can't reproduce it. You  ask them to log some info and give it to you. It's not helpful. Finally you ask them to give you the code, or at least a snippet of the code they wrote that is leading to the bug/error. You still can't reproduce it. So the bug is related to something ELSE in their code that isn't part of the snippet they sent you.

You wrote a few helpful error messages and guards against certain undesirable behavior, and then someone using your SDK will come back to you with an error that you can't even imagine how it happened. So you try debugging it in your code, and you can't reproduce it. You ask them for steps to reproduce and to log some info and give it to you. It's not helpful. Finally you ask them to give you the code, or at least a snippet of the code they wrote that uses your product. You still can't reproduce it. So the bug is related to something ELSE in their code that isn't part of the snippet they sent you.

There are a few ways to guards against these wild goose chases. The first and most important, is to architect your product in a way that your public methods are explicit, and have them only do specific things. The issues I ran into came from a lack of architectural planning. The product was in its infancy, and new features were getting added so quickly with such a time timeframe, that most additions just ended up getting patched on. In the end, many methods did too many things, and were full of conditionals, and optional arguments.
