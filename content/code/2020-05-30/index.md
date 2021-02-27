---
title: "You should read MDN"
path: "read-mdn"
date: "2020-05-30"
category: "Advice"
kind: "Article"
chunk: "Seriously, you should read it like a book."
tags:
    - Coding
published: "true"
---




Seriously, you should read it like a book.

I'm not going to name names, but I've seen blog posts and tweets from people are are senior engineers, principal engineers, and similar, that admit to not knowing such basic, fundamental things like Date.toLocaleString or Node.parentElement.

I'm not saying I'm perfect, there's plenty I don't know, and I'm learning new things all the time. But if your job is to tell other developers what to do, or architect whole sections of your company's product, I at least expect you to have perused the MDN docs. You know, that great documentation site for the tools you use every day?

I think frameworks are partially to blame. And I'm saying that as someoner who loves React and has used it for years. These frameworks abstract away so much of the browser, that I often see developers with years of experience not know basic browser related things. I think Vue is a lot better in this regard since you're working a lot closer to vanilla JS and HTML, but it still abstracts away a lot. React is the worst by far. I won't go into it here, but I think the industry has a big problem with "React Developers" not being interchangeable with "JavaScript Developer". I've interviewed people who technically had more years of experience than I do, but they didn't know how to use Element.addEventListener. And with how wide spread the React ecosystem is, there's a package for literally everything. This is a great thing for many reasons. First, very often it makes little sense to code something yourself when you can use an existing package in a fraction of the time. Then there are some things you **shouldn't** code yourself because regardless how much experience you have, the thing you coded over the past few days has absolutely no chance of being as robust, extensible, or useful as something that a team of people have been working on for a year.

But the problems come when people don't look past their own noses and when they need to add something to their project, the first thing they do is search npm or github. Reading is fine, but you gain the most experience from actually **doing**. So instead of just pulling in another dependency, you could look up how to build something yourself, try it out, and in the end you'll have learned something. Because there is a difference between someone that actually knows JavaScript, is able to make educated decisions based on experience, and someone that is able to import packages and use in their app.
