---
title: "Your Code is not Self Documenting"
path: "self-documenting-code"
date: "2020-05-24"
category: "Advice"
kind: "Article"
chunk: "No, your code is not self-documenting. Yes, you need to write comments. Self-documenting code is something you strive for, not advice saying you shouldn't write comments."
tags:
    - Coding
published: "true"
---

The term "self-documenting code" is meant to be more of a style suggestion rather than a hard rule.

It's been mischaracterized in such a way that there are people defending the idea that you're somehow bad at writing code if you include comments. I'm sure many people making though defenses don't mean it specifically in that way, but the danger comes from making absolute statements in the presence of beginners who don't know any better.

I keep going back to "DRY", but it feels exactly like that. Some beginners hear "Keep your code dry", and turn it into "Never write any duplicate code anywhere or else you're an idiot."

The idea of "self-documenting" code is an ideal. It's a 0000 something you keep in mind in order to write better code, it's not a rule you are compelled to follow.

The idea is that you should be trying to write code in a way that's more easily understood by everyone.

Overcommenting is definitely something to be avoided, but there's of course a sweet spot.

```js
// Change message dates
const changeMessages = (n, o) => {
  // The new message array
  const arr = [...n, ...o]
  return arr.map((v) =>
    // Add formatted date
    v.id && { ...v, updated: formatDate(v.updated) }
    // Remove empty array items
  ).map(Boolean);
}
```

```js
// Change message dates
const changeMessages = (n, o) => {
  // The new message array
  const arr = [...n, ...o]
  const updatedMessages = arr.filter(m => !!m.updated);
  const formattedDateMEssages = updatedMessages.map(m => ({...m, updated: formatDate(m.updated)}))
}
```

In many ways(--),
it's been mischaracterized in (ways) similar to the term "DRY". As with pretty nuch anything in life, there are two extremes on either end of a spectrum, with the ideal being somewhere inbetween.

Don't fill your code up with comments and explain every single line, but you also shouln't avoid writing any comments at all.



Write comments. Write documentation. It's as simple as that. If anybody tells you their code is self documenting, they're mistaken.

You'd have to be pretty conceited to believe that your code is so amazing and clear that you don't need to write any comments at all, and everyone will just perfectly understand your code the first time they read it.

That phrase has almost turned into a joke, yet I still hear people say that their code is self document and mean it seriously.

I also often hear about how comments are a code smell.

>"If you need a lot of comments, that just means you didn't name things well enough."

I agree that you should work on naming things well. (link to naming article). You should also work on not creating bugs but nobody's perfect.

>"Outdated comments are as good as useless"

As if that's a good excuse to not write comments in the first place. No kidding outdated comments are useless. You need to update them.

That would be like arguing against writing tests because outdated tests are useless. You need to update them. See a pattern here?

Code, tests, comments, and documentation should be viewed the same way. They're all part of the codebase, they all need to be written in the first place, and they all need to be maintained.

It's also not just for you. Someone will read your code in the future, and that person will inevitably need to re-read your "clean, self documenting code" multiple times to understand what you were doing.

Even if you really are good about naming, structure, whatever, maybe the next person that comes along won't have as much experience as you, and they'll need help understanding that totally cool and necessary abstraction that you wrote. Have a little empathy.

It doesn't matter how good you are at naming things, or how clear you think certain parts of the code are - what is obvious to you, and what is obvious to someone else are never the same.

And even if nobody else will ever read your code, there will be a time that **you** need to go back to old code. Maybe it's tomorrow, maybe next week, maybe next year, and maybe and you won't remember exactly what you were thinking at the time of writing. And you will wish you had even a single line comment.

If you're still not convinced, you should try posting your code online and ask for critique. There is a non-zero chance somebody will ask questions.
