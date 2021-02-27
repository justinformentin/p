---
title: 'Naming things'
path: 'naming-things'
date: '2020-06-06'
chunk: 'Namting things'
type: 'Article'
category: 'Javascript'
tags:
  - Development
published: 'true'
---

## Naming

I think it's against the law, or at least back luck, to not include Phil Karlton's quote at the top of an article about naming. So just in case you haven't seen it a hundred times already, here you go:

>"There are only two hard things in Computer Science: cache invalidation and naming things".

My opinions towards naming things have become stronger over time, and they have trended towards being more strict. Some of the tips can help avoid actual issues in your code. Others are more "nice to have".

Regardless of your opinions, you should be having discussions with your team to decide what names and naming rules work for you and your codebase.

### Conventions

In general, stick with naming conventions. For example, in python you'll be using snake_case often. In JavaScript, it's camelCase.

You can technically use whatever case you want, but people will give you funny looks if you start naming your JavaScript functions with camel_Snake-KebabCase, so just stick to the conventions that everyone expects.

### Booleans

**No Gerunds**

Avoid gerunds, or any name that is non-fininite, or that could imply an ongoing state of being. One common offender is `isLoading`. If `isLoading` is false, does that mean it finished loading? Did it ever start loading in the first place? In this case, `hasLoaded` might be a better choice.

**No Mixing Tense**

Another problem with `isLoading` and similarly named variables is that the value being false could imply something positive in your code.

If you want to display data, you'd want 'isLoading' to be false. That alone doesn't seem too bad, but if you're mixing positive and negative boolean names all over the place, you're going to quickly increase cognitive load.

I'm sure many people have experienced the mild annoyance of trying to quickly scan through code, only to be slowed down by a group of mixed tense variables names, possibly with mixed bangs or double bangs, taking time to figure out what's going on.

**No Double Negatives**

For similar reasons mentioned above, avoid variable names that will lead you to write double negatives. Don't do this: `if (!notLoaded)`.

### Goldilocks length

There is a sweet spot for name length and verbosity. Usually `list` is way too generic to be useful, but `userCreatedMessageListFetchResults` is too long. Lengthy and super precise names are usually a sign of design problems, and/or your current scope might be too large.

For example, if you're working in a thousand line module that handles every single line of code related to messages in your project, the latter example makes sense because you need to be specific to avoid naming collisions and conflation, or to let the reader know exactly what's going on.

If you break up this giant file to create multiple files with smaller scopes, it becomes easier. Let's say you now have a module `fetchUserMessages`. The return can be as simple as something along the lines of `messageList` or `userMessages`, and it'll be obvious what it is. Half of the information is implied in the scope.

### Abbreviations

There really aren't any arguments you can make for using abbreviations when naming things. At best, you save a few characters, at worst you make it so the reader doesn't know the intended full name.

### Data

Avoid using the word `data` anywhere in your code. What kind of data? There are very few legitimate use cases, and the majority of the time you can be more specific. It doesn't convey any useful information.

### Functions/Methods

There are two schools of thought:

**Two acceptable styles**
1. If it returns a single piece of data, it's ok to use a noun - `messageList`
2. If it changes data in any way, it should be a verb - `updateMessageList`

**One acceptable style**
1. It should always be a verb - `getMessageList`, `updateMessageList`

I'm partial to always using a verb. If the name implies an action, it's easy to understand that it's a function or method. The name `messageList` could just as easily be an array of messages, while `getMessageList` tells you that you need to call this to get the array of messages.

### Avoid using native names

There is some combination of variables, objects, functions, or classes that are a part of the language you're using, and these names should not be used. In JavaScript, a `Map` and a `Set` exist, mean specific things, and are expected to work a certain way. Don't name an object `messageMap`, or an array `messageSet`.

### Enums > Flags

Prefer object enums over string enums and especially over boolean flags.

This list of reasons is taken from my [Use Enum Objects](/code/use-enum-objects) article. Check it out to see examples.

1. They're easier to reason with.
2. You get code completion/intellisense in your editor
3. They're less error prone
4. They're useful when they are part of a larger dynamic system.
5. They're extensible

To summarize, if you're not using an enum object, you will be blindly passing around strings and booleans, and you will make a mistake. If you are using an enum object, you're able to dynamically reference a single unchanging value.

## Broad names

Avoid using names with vague or broad suffixes like "Manager" or "Controller" unless the name is already verbose. Take a "ProcessManager" for example. What processes are being managed? How is it being managed? Most of the time you'll find that you can be much more specific, and more verbose.
