---
title: 'Naming Things'
path: 'naming-things'
date: '2021-03-07'
chunk: 'Communication and the ability to name things is what separates us from animals. That and our freakishly large brains.'
type: 'Article'
category: 'Javascript'
tags:
  - Coding
  - Self Improvement
published: 'true'
---

## Naming

I think it's against the law, or at least back luck, to not include Phil Karlton's quote at the top of an article about naming. So just in case you haven't seen it a hundred times already, here you go:

> "There are only two hard things in Computer Science: cache invalidation and naming things".

My opinions towards naming things have changed over time. Your opinions will also differ depending on the type of work you do.

Regardless of your opinions, you should be having discussions with your team to decide what names and naming rules work for you and your codebase.

### Conventions

In general, stick with naming conventions. In python you'll be using snake_case often. In JavaScript, it's camelCase.

You can technically use whatever case you want, but people will give you funny looks if you start naming your JavaScript functions with camel_Snake-KebabCase, so just stick to the conventions that everyone expects.

### Booleans

**No Gerunds**

Avoid gerunds, or any name that is non-finite, or that could imply an ongoing state of being. One common offender is `isLoading`. If `isLoading` is false, does that mean it finished loading? Did it ever start loading in the first place? In this case, `hasLoaded` might be a better choice.

**No Mixing Tense**

Another problem with `isLoading` and similarly named variables is that the value being false could imply something positive in your code.

If you want to display data, you'd want 'isLoading' to be false. That alone doesn't seem too bad, but if you're mixing positive and negative boolean names all over the place, you're going to quickly increase cognitive load.

I'm sure many people have experienced the mild annoyance of trying to quickly scan through code, only to be slowed down by a group of mixed tense variable names, possibly with mixed bangs or double bangs, taking time to figure out what's going on.

**No Double Negatives**

For similar reasons mentioned above, avoid variable names that will lead you to write double negatives. Don't do this: `if (!notLoaded)`.

### Goldilocks length

There is a sweet spot for name length and verbosity. Usually `list` is way too generic to be useful, but `userCreatedMessageListFetchResults` is too long. Lengthy and super precise names are usually a sign of design problems, and/or your current scope might be too large.

If you're working in a multiple thousand line module that handles every single line of code related to messages in your project, the latter example makes sense because you need to be specific to avoid naming collisions and conflation, or to let the reader know exactly what's going on.

If you break up this giant file to create multiple files with smaller scopes, it becomes easier. Let's say you now have a module `fetchUserMessages`. The return can be as simple as something along the lines of `messageList` or `userMessages`, and it'll be obvious what it is. Half of the information is implied in the scope.

### Abbreviations

There really aren't any arguments you can make for using abbreviations when naming things. At best, you save a few characters, at worst you make it so the reader doesn't know the intended full name.

### Almost meaningless names

There are a few names that you should really try to avoid because they convey little to no meaningful information.

Avoid using the word `data` anywhere in your code. What kind of data? There are very few legitimate use cases, and the majority of the time you can be more specific. It doesn't convey any useful information.

Other words like value, event, and list are similar.

### Avoid using native names

There is some combination of variables, objects, functions, or classes that are a part of the language you're using, and these names should not be used. In JavaScript, a `Map` and a `Set` exist, mean specific things, and are expected to work a certain way. Don't name an object `messageMap`, or an array `messageSet`.

### Functions/Methods

There are two schools of thought:

**Two acceptable styles**

1. If it returns a single piece of data, it's ok to use a noun - `messageList`
2. If it creates or transforms data in any way, it should be a verb - `updateMessageList`

**One acceptable style**

1. It should always be a verb - `getMessageList`, `updateMessageList`

If the name implies an action, it's easy to understand that it's a function or method. The name `messageList` could just as easily be an array of messages, while `getMessageList` tells you that you need to call this to get the array of messages.

One important note about naming functions is to avoid dynamically named functions like the plague. Like one of these monstrosities:

```js
this[variableName]();
```

I've definitely been guilty of doing this, but we all make mistakes and I've done my penance. Not only is this unnecessarily difficult to read and reason about, it makes it so you can't grep it. When debugging, refactoring, or trying to search code, you're going to miss it.

## Reality

My opinions are obviously painted by my experiences and area of expertise. People using different languages or tools might have opinions that are totally different from my own.

They're not laws, and they can change over time. What is important is that you discuss these conventions with your teammates and come to a consensus. Agree to certain rules and a general direction, and then work with it. Use tools to help, like building a custom lint rule set for your team. There's no reason to be spending a lot of time discussing naming every code review or any time you talk about new features.
