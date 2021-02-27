---
title: 'Writing software for other developers'
path: 'writing-software-for-other-developers'
date: '2020-05-20'
chunk: 'An overview of how to design better APIs and SDKs.'
type: 'Article'
category: 'Javascript'
tags:
  - SDK
  - API
  - Development
published: 'true'
---

I've spent the past two years working on a product that other developers use in their code. Tooling and SDKs are such an important and large part of the 0000, but I've found surprisingly little information written about the subject online. In this post I wanted to compile my learnings from these past two years. It includes best practices, tips, and opinions that I have picked up while working 00000. I've had the opportunity to work with people who have a lot more experience than I do, and I've had the opportunity to work closely with cross-platform teams.

## Understanding your product

This seems obvious, but it's one of the most important things you can do. How you understand the product you're building will color all of your work in the future. 00000 It will lead to less bikeshedding and keep you and your team focused on the parts that matter.

## Naming

I'm sure everyone reading this has heard the quote from Phil Karlton - "There are only two hard things in Computer Science: cache invalidation and naming things". Below are some tips to make naming easier, and make your codebases better for it.

### Conventions

In general, stick with naming conventions. If you're writing python, you'll be using snake_case for most things. In JavaScript, it's camelCase.

You can technically use whatever case you want, but people will give you funny looks if you start naming your JavaScript functions with camel_Snake_Case, so just stick to the conventions that everyone immediately understands.

### Booleans

**Gerunds**

Avoid gerunds, or any name that is non-fininite, or that could imply an ongoing state of being. One common offender is `isLoading`. If `isLoading` is false, does that mean it finished loading? Did it ever start loading in the first place? In this case, `hasLoaded` might be a better choice.

**Tense**

Another problem with `isLoading` and similarly named variables is that the value being false could imply something positive in your code.

If you want to display data, you'd want 'isLoading' to be false. That alone doesn't seem too bad, but if you're mixing positive and negative boolean names all over the place, you're going to quickly increase cognitive load.

I'm sure many people have experienced the mild annoyance of trying to quickly scan through code, only to be slowed down by a group of mixed tense variables names, with mixed bangs or double bangs, taking time to figure out what's going on.

### Goldilocks length

There is a sweet spot for name length and verbosity. Usually `list` is way too generic to be useful, but `userCreatedMessageListFetchResults` is too long. Long, super precise names are usually a sign of design problems, and your current scope might be too large.

For example, if you're working in a thousand line module that handles every single line of code related to message lists in your project, the latter example makes sense because you need to be specific to avoid naming collisions and conflation, or to let the reader know exactly what's going on.

If you break up this giant file to create multiple files with smaller scopes, it becomes easier. Let's say you now have a module `fetchUserMessages`. Now your variable can just be named a plain `messageList` and it'll be obvious that it is the result of the user message list resource request. Half of the information is implied in the scope.

### Abbreviations

There really aren't any arguments you can make for using abbreviations when naming things. At best, you save a few characters, at worst you make it so the reader doesn't know if the 000000 (cat - category - catalog, CHANGE EXAMPLE)

### Data

Avoid using the word `data` anywhere in your code. What kind of data? There are very few legitimate use cases, and the majority of the time you can be more specific. It just doesn't convey any useful information.

### Functions/Methods

There are two schools of thought:

**Two acceptable styles**
1. If it returns a single piece of data, it's ok to use a noun - `messageList`
2. If it changes data in any way, it should be a verb - `updateMessageList`

**One acceptable style**
1. It should always be a verb - `getMessageList`, `updateMessageList`

I'm partial to always using a verb. If the name implies an action, it's easy to immediately understand it's a function or method. For example, `messageList` could just as easily be an array of messages, while `getMessageList` tells you that you need to call this to get the array of messages.

### Avoid using native names

There is some combination of variables, objects, functions, or classes that are a part of the language you're using, and these names should not be used. For example, in JavaScript, a `Map` and a `Set` exist, mean specific things, and are expected to work a certain way. Don't name an object `messageMap`, or an array `messageSet`.


## Errors

Errors are notoriously difficult to deal with. Naturally, developers using your product will encounter errors that you didn't think of. Sometimes you'll get a bug report for something you didn't think was possible.

Guard against these errors as much as you can. It's impossible to be able to write an error message for every single possible error that you don't even know about, but you can cast a wide net and handle reasonable error cases. For example, you can expose HTTP status codes which are universally understood.

If exposing methods that return Promises, be sure to allow for their `catch()` to be accessible.

Write error messages that are actually helpful. This sounds obvious, but I feel that it still needs to be said. I have gotten so many error messages that contain almost no information, and I'm sure most people share that experience.

When writing an error message, it's better to overshare. When possible, mention where the error happened, the related method name, related values that were incorrectly typed or missing, suggestions of how to fix the error, and external links to related documentation.

<!--  -->
The cold hard truth is that most consumers of your product won't read your documentation, no matter how meticulously written and maintained it is.


## Offering defaults

It's often easy to fall into the trap of thinking offering a lot of defaults is better. It makes you feel like you're being helpful - you're giving options that'll lead the user on the right path, and make it easier for them to use your product, right? Almost never. I'm hesitant to say it, but sometimes using a lot of defaults is an anti-pattern or indicative of a larger design issue.

For some tools/libraries/etc, having defaults just makes sense. Take a UI library for example. People are using this library _because_ it offers defaults, and gives a good starting point. The users _want_ their button to look like the UI library's default button, and then have some options for variants like `disabled`, `outline`, `text`, `primary`, `small`, whatever. The point is the user is using this library because they don't want to care about dealing with this button. They just want to set a couple of options and then call it a day. However, if your product's value add is **not** a set of defaults, try to avoid them.

The issue is that nobody will ever be happy. You can create great designs, offer a couple of defaults, and you will invariably get comments about changing the defaults, working aroudn the, wjhatever------00000


### Methods

If, for example, instead of a button your product contains an API that interfaces with a backend, having multiple options might not be the best design. Let's pretend we have a method that is handling some regular old CRUD stuff - fetching, updating, etc, resources from a backend.

If you're really sadistic, you could offer a `handleResources` method with the signature

```js
handleResources({type: 'get' | 'update' | 'delete', resourceId: string, data?: Object})
```

Lots of options there. You pick the type of action with the `type` string, and if you chose `update`, you need to pass in the `data` argument, which contains the data that will be updated. This would of course need to be documented, since it's not obvious from the signature why the data argument is optional, and when to use it.

Don't do this.

Instead, we can just offer

```ts
getResource(resourceId: string)

updateResource(resourceId: string, data: Object)

deleteResource(resourceId: string)
```

That's much easier to understand, and easier to document.

As soon as you start adding optional arguments or condensing methods, you're opening a can of worms where you're going to need to add way more documentation explaining the methods, and you'd likely need to add a lot of extra conditional logic and error handling within your methods. All of which could be avoided if you just split the functions up into signatures that are self-explanatory.

There's nothing wrong with condensing or abstracting methods, but those should be internal. If the user cares about updating the resource, they should use the method that reflects that, and not a frankenstein method that requires a thorough read of the documentation to figure out how to write the signature correctly.

This is a perfect example of why it's so important to empathize with the consumers of your product

## Empathize with your consumers

The cold hard truth is that it doesn't matter how much time you spent on your documentation, most people won't even read it. They'll skim through it and copy and paste snippets they think they need. If your product doesn't work in the absolute simplest way possible, this will lead to consumers asking questions.

## Methods Signature Construction

**Arguments**

Avoid positional arguments in public methods. If a method is part of your product's public API, positional arguments means you’re locking the method into having those exact arguments in that order forever. In the future, if something about the method needs to be changed in a way that relates to the arguments, the only way out is through deprecation.

Instead, use object arguments. In some specific use cases, a mix of positional and object argument is fine. For example, if you have a method that makes an http request, and you know that you will always need the resource id for any type of request, it’s fine for the first argument to be a positional id argument, with the rest of the arguments being an object.

```js
// Avoid
someMethod = (id, name) => {};

// Ok
someMethod = ({ id, name }) => {};

// Ok sometimes
someMethod = (id, { name }) => {};
```

### Async Methods

Be careful of accidental `catch()` and `then()` interception. Whenever possible, allow them to be passed up.

It is important to handle errors appropriately, and usually that means writing custom errors messages to help the consumer of your code. It is important to preserve these error messages.

Dealing with multiple methods or chained promises can make it difficult to keep track of everything, and it's important to make sure the original error makes it up to the consumer's `catch()`, instead of getting intercepted by an erroneous `catch()` inside your code.

The same applies to resolved data. Sometimes you may need to manipulate data before returning it to the consumer, and other times you're dealing with an internal Promise that has already taken care of the data manipulation. Just like being considerate of where you place `catch()`, don't duplicate `then()` when it isn't needed.

In a similar vein, even if the method is returning a Promise, it isn't necessary to wrap everything in a `new Promise`; sometimes it's best to just plainly return a Promise returning method without adding on any `then()` or `catch()`, knowing that they have already been handled appropriately.

```js
const postRequest = (url) =>
    new Promise((resolve) => {
        fetch(url)
            .then(r => r.json())
            .then(response => resolve({resultList: response.results}))
            .catch(customErrorHandler)
    })

// Avoid
public fetchData = (url) => {
    return new Promise((resolve, reject) => {
        postRequest(url)
            .then(resolve)
            .catch(reject)
    })
}

// Ok
public fetchData = (url) => {
    return postRequest(url)
}
```

Not adding a `catch()` to `fetchData()` allows the consumer to receive the correct error that was previously handled within `postRequest()`. The above example is very simple, but in reality methods can get complex and harder to see what’s happening under the hood at a glance.

## Compilation Considerations

If size is important in your project, and let's be honest, it is important no matter what people tell you, then a few considerations should be made that effect compiled size.

For example, if you're targeting older browsers, your code will need to be compiled down to ES5 for maximum compatibility. This means a lot of modern features need to be converted at build time.

Sometimes it is necessary to use newer methods. Sometimes, they're just nice to have. But very often their use can be avoided altogether. Compiled ES5 code is normally much larger than the modern code written in the project. This is why ES Modules can be so much smaller than ES5 compatible syntax.

1. *Do not* use array destructuring. To give an example of the vast difference in compiled code, [here is a babel repl](https://babeljs.io/repl#?browsers=defaults&build=&builtIns=false&spec=true&loose=false&code_lz=MYewdgzgLgBA2uApgGhlA7iAujAvDAQwCciBuIA&debug=false&forceAllTransforms=true&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Ces2015&prettier=false&targets=&version=7.12.9&externalPlugins=%40babel%2Fplugin-proposal-class-properties%407.12.1)
2. When writing asynchronous functions, prefer using `new Promise` and `then()` instead of `async` and `await`. Babel repl [using then()](https://babeljs.io/en/repl#?browsers=defaults&build=&builtIns=false&spec=true&loose=false&code_lz=MYewdgzgLgBFCm0BiBXMwoEtwwLwwAoBKPAPhgG8AoASAWgAUAnEAW0wnmIDooALeGAIEAJgEMoYkrnKhIIADbxuCkAHNREqUSoBfIA&debug=false&forceAllTransforms=true&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Ces2015%2Cenv&prettier=false&targets=&version=7.11.6&externalPlugins=)and using [async/await](https://babeljs.io/en/repl#?browsers=defaults&build=&builtIns=false&spec=true&loose=false&code_lz=FAYw9gdgzgLgBDAprAglAnhEcC8cCGGWcAFAJS4B8cA3sHAJDjTxwAm-M-uBA7vgEt4SWAAUATmAC2AqInIBuYAF8gA&debug=false&forceAllTransforms=true&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=env%2Ces2015%2Cenv&prettier=false&targets=&version=7.11.6&externalPlugins=)
3. Some Array and Object methods are not available in ES5, for example Array.includes, or Object.entries, so polyfills will be automatically added at build time. More often than not, these methods are unnecessary and can be re-written in only a few lines of ES5 compatible code.


<!-- dk============================== -->














Below I'll go over some improvements that should be considered when building your own product to avoid some of the pitfalls I encountered.

## Naming

Naming is difficult. You need to convey 0000000000000000000

### Booleans

A general rule is to stay far away from gerunds. Any name that is nonfinite, or that could imply an ongoing state of being. 'isLoading' is one of the most common offenders of this rule. If 'isLoading' is false, what does that mean - did it finish loading? Did it ever start loading? A much better name would be 'isLoaded' or 'hasLoaded', which if true immediately tells you that it did load, and it is done loading currently. Another problem with 'isLoading' is the backwards 00000 / negative. If you're checking if something is loading, you're looking for if 'isLoading' is false. That alone doesn't seem too bad, but if you're mixing positive and negative boolean names all over the place, you're going to quickly increase the cognitive load of just figuring out what's going on in the code. I'm sure many people have had experiences trying to calculate a string of booleans in their head qhile scanning through some code only to have to pause to break down each variable.

```js
if (!isLoading && dataExists && !dataDisplaying) {
  showNewData();
}

if (hasLoaded && dataExists && dataHasDisplayed) {
  showNewData();
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
  return newName + ' is ' + doubleAge;
};
positionalArgs('bob', 20);
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
  return newName + ' is ' + doubleAge;
};
objectArg({ age: 20, name: 'bob' });
```

Generally speaking, it's good practice to use the object argument in functions you are exposing to consumers of your code. However, in some cases a mixture of positional and object arguments can be used. A good example would be a function that will absolutely 100% always need a specific argument. Let's say you have a function that manipulates data in an array. To access the exact item in the array, you will find/findIndex/filter/etc using the item's id. So you know you will always require the id.

```js
const arr = [
  { id: 'x8h9d34', price: 5, color: 'blue' },
  { id: 'j9i68d0', price: 9, color: 'red' },
  { id: 'h3f7a9s', price: 7, color: 'green' },
];
const updateItem = (id, { color }) => {
  const idx = arr.findIndex((item) => item.id === id);
  if (idx !== -1) {
    const newArr = arr.slice();
    newArr.splice(idx, 1, { ...arr[idx], color });
    return newArr;
  } else {
    return 'Item not found.';
  }
};
updateItem('j9i68d0', { color: 'purple' });
```

## Flexibility

You need to find a balance between having your sdk be really locked down, and way too flexible. If it's too flexible, you're going to have to handle so many optional or conditional cases and the complexity of each part will dramatically increase, and be so much harder to test and also inevitably debug. Verbosity is beneficial in this case.

## Be as helpful as you can

## Think of the person using your product

## Be 0000 of the person

The developers using your product will manage to break it in all of the ways you didn't even think of.

You wrote a few helpful error messages and guards against certain undesirable behavior, and then someone using your SDK will come back to you with an error that you can't even imagine how it happened. So you ask them for steps to reproduce it, you try to debug the issue, and you can't reproduce it.

You ask them for steps to reproduce. They give it to you, but you still can't reproduce it. You ask them to log some info and give it to you. It's not helpful. Finally you ask them to give you the code, or at least a snippet of the code they wrote that is leading to the bug/error. You still can't reproduce it. So the bug is related to something ELSE in their code that isn't part of the snippet they sent you.

You wrote a few helpful error messages and guards against certain undesirable behavior, and then someone using your SDK will come back to you with an error that you can't even imagine how it happened. So you try debugging it in your code, and you can't reproduce it. You ask them for steps to reproduce and to log some info and give it to you. It's not helpful. Finally you ask them to give you the code, or at least a snippet of the code they wrote that uses your product. You still can't reproduce it. So the bug is related to something ELSE in their code that isn't part of the snippet they sent you.

There are a few ways to guards against these wild goose chases. The first and most important, is to architect your product in a way that your public methods are explicit, and have them only do specific things. The issues I ran into came from a lack of architectural planning. The product was in its infancy, and new features were getting added so quickly with such a time timeframe, that most additions just ended up getting patched on. In the end, many methods did too many things, and were full of conditionals, and optional arguments.

<!-- . -->

## Lessons learned when creating an SDK for other developers to create an application with millions of users

1. The developers using your library/SDK/package will manage to break it in all of the ways you didn't even think of.

You wrote a few helpful error messages and guards against certain undesirable behavior, and then someone using your SDK will come back to you with an error that you can't even imagine how it happened. So you try debugging it in your code, and you can't reproduce it. You ask them for steps to reproduce and to log some info and give it to you. It's not helpful. Finally you ask them to give you the code, or at least a snippet of the code they wrote that uses your product. You still can't reproduce it. So the bug is related to something ELSE in their code that isn't part of the snippet they sent you.

There are a few ways to guards against these wild goose chases. The first and most important, is to architect your product in a way that your public methods are explicit, and have them only do specific things. The issues I ran into came from a lack of architectural planning. The product was in its infancy, and new features were getting added so quickly with such a time timeframe, that most additions just ended up getting patched on. In the end, many methods did too many things, and were full of conditionals, and optional arguments.

This led to difficulty in testing, as well as annoying, hard to find bugs. Below I'll go over some improvements that should be considered when building your own product to avoid some of the pitfalls I encountered.

2. You should almost always use an object as arguments for all public methods/functions. I'll explain why I used "almost" in a minute. For example, if you have an 'updateItem' function, you don't want this.

```js
updateItem(itemId, itemPhoto, itemName);
```

What if in the future you want to make the itemPhoto optional, or remove it entirely? Now everyone that is using your code with have broken code, or you need to update your version by a major version to indicate breaking changes. And introducing breaking changes by moving around arguments is not a good look. It would be better to have it be

```js
updateItem({ itemId, itemPhoto, itemName });
```

Then your users can add the arguments in whatever order they want since they're named. The reason why I previously said "almost always", is because sometimes you absolutely KNOW that an argument won't change. For example, to change the itemPhoto or itemName you're always going to need to pass the itemId to be able to know what item you're updating. So in that case, you can make the function signature

```js
updateItem(itemId, { itemPhoto, itemName });
```

1. You need to find a balance between having your sdk be really locked down, and way too flexible. If it's too flexible, you're going to have to handle so many optional or conditional cases and the complexity of each part will dramatically increase, and be so much harder to test and also inevitably debug. Verbosity is beneficial in this case. For example, let's keep going with the updateItem function.

If you want to give the developers the option to pass different variables to update the item, your functions will quickly become a mess of conditionals.

```js
const updateItem = (itemId, { itemPhoto, itemName }) =>
  new Promise((resolve) => {
    let data = {};
    const update = (data) =>
      fetch(`/items/${itemId}`, {
        method: 'POST',
        body: data,
      })
        .then((r) => r.json())
        .then(resolve);

    if (itemPhoto) {
      data.itemPhoto = itemPhoto;
    }
    if (itemName) {
      data.itemName = itemName;
    }
    update(JSON.stringify(data));
  });
```

This is a small example and is of course manageable. But it will get out of hand if it ever needs to get more complex. Maybe the passed arguments get more complicated, maybe some data you need is from Promise resolution. Let's try adding a few things.

```js
const updateItem = (itemId, { itemPhoto, itemName, itemPrice, itemLocation }) =>
  new Promise((resolve) => {
    let data = {};
    const update = (data) =>
      fetch(`/item/${itemId}`, {
        method: 'POST',
        body: JSON.stringify(data),
      })
        .then((r) => r.json())
        .then(resolve);

    if (itemPhoto) {
      data.itemPhoto = itemPhoto;
    }
    if (itemName) {
      data.itemName = itemName;
    }
    if (itemPrice) {
      data.itemPrice = itemPrice;
    }
    if (itemLocation) {
      convertLocation(itemLocation).then((location) => {
        data.itemLocation = location;
        update(data);
      });
    } else {
      update(data);
    }
  });
```

Gross.

Any time you want to add or change something you're increasing the complexity of the function and so you're risking regressions, and making it harder to test.

Let's refactor the first version of the function into multiple, easier to reason with functions.

```js
const updateItemName = (itemId, itemName) => itemFetch(itemId, { itemName });

const updateItemPhoto = (itemId, itemPhoto) => itemFetch(itemId, { itemPhoto });

const itemFetch = (itemId, data) =>
  new Promise((resolve) =>
    fetch(`/item/${itemId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then(resolve)
  );
```

And now let's add the new properties and convert the second version of the function.

```js
const updateItemName = (itemId, itemName) => itemFetch(itemId, { itemName });

const updateItemPhoto = (itemId, itemPhoto) => itemFetch(itemId, { itemPhoto });

const updateItemAge = (itemId, itemPrice) => itemFetch(itemId, { itemPrice });

const updateItemLocation = (itemId, itemLocation) =>
  convertLocation(itemLocation).then((location) =>
    itemFetch(itemId, { location })
  );

const itemFetch = (itemId, data) =>
  new Promise((resolve) =>
    fetch(`/items/${itemId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then(resolve)
  );
```

These functions do the same thing in fewer lines of more explicit code. Each can be tested individually, and you don't need to worry about shooting yourself in the foot by adding or changing anything in a single monster function. If you need to make any additions you just add new functions.

1. ...
