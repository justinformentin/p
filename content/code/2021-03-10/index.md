---
title: "Your Code is not Self Documenting"
path: "self-documenting-code"
date: "2021-03-10"
category: "Advice"
kind: "Article"
chunk: "No, your code is not self-documenting. Yes, you need to write comments. Self-documenting code is something you strive for, not advice saying you shouldn't write comments."
tags:
    - Coding
    - Self Improvement
published: "true"
---

The term "self-documenting code" is meant to be more of a style suggestion rather than a hard rule.

It's been mischaracterized in such a way that there are people defending the idea that you're somehow bad at writing code if you include comments. I'm sure many people saying this don't mean it specifically in that way, but the danger comes from making absolute statements in the presence of beginners who don't know any better.

It makes me think of "DRY" because they're both misused in a similar way. Some beginners see comments or articles about "keeping your code dry", and it eventually morphs into "Never write duplicate code anywhere or else you're an idiot."

The idea of "self-documenting" code is an ideal. It's something you keep in mind in order to write better code. It's not a rule you are compelled to follow.

The idea is that you should be trying to write code in a way that's more easily understood by everyone. If you feel the need to comment every line, you're doing something wrong.

Either you're writing unnecessary comments

```js
// The combined list
const combinedList = [...listOne, ...listTwo]
```

Or you're writing comments to explain vague code that you should change to be more clear. The two most important rules to follow are that you should [name things properly](./naming-things), and you should construct code logically. If you do both well, the vast majority of your code will be naturally understood without comments.

When you do write a comment, it should be because there's no easier way to convey that information. A good way to think about it is to only write comments that explain **why** some code exists, works a certain way, or is important. Often, if your comments explain **how** some code works, it's because you weren't following the two previously mentioned rules.

Write comments. Write documentation. It's as simple as that. If anybody tells you their code is self documenting and they use that as an excuse to never write a single comment, they're mistaken.

I also often hear about how comments are a code smell, with some half-assed explanations. One good example that I've seen:

>"Outdated comments are as good as useless"

As if that's a good excuse to not write comments in the first place. No kidding outdated comments are useless. You need to update them.

That would be like arguing against writing tests because outdated tests are useless. You need to update them! See a pattern?

Code, tests, comments, and documentation should be viewed the same way. They're all parts of the codebase, they all need to be written in the first place, and they all need to be maintained.

It's also not just for you. Someone will read your code in the future, and that person will inevitably need to re-read your "clean, self documenting code" multiple times to understand what you were doing.

Even if you really are good about naming and structure, maybe the next person that comes along won't have as much experience as you, and they'll need help understanding that totally cool and necessary abstraction that you wrote. Have a little empathy.

It doesn't matter how good you are at naming things, or how clear you think certain parts of the code are. What is obvious to you, and what is obvious to someone else are never the same.

And even if nobody else will ever read your code, there will be a time that **you** need to go back to old code. Maybe it's tomorrow, maybe next week, maybe next year, and maybe and you won't remember exactly what you were thinking at the time of writing. And you will wish you had even a single line comment.

If you're still not convinced, you should try posting your code online and ask for critique. There is a non-zero chance somebody will ask questions.
