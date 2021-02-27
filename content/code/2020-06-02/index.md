---
title: "In defense of Web Components"
path: "web-components-defense"
date: "2020-06-02"
category: "Web Components"
kind: "Article"
chunk: "Most articles I've seen written about web components are mischaracterizations, or views given from a place of inexperience. As someone with professional Web Component experience, I will clear the air."
tags:
    - Coding
published: "false"
---

# In Defense of Web Components

I've been using Web Components professionally for almost two years now, and I work with them every day. In that time I've read through the source code and tested out just about every webcomponent framework and UI library I could find. I've dug into client side code and reverse engineered the web components being used on some larger sites.

And I've done all that to learn as much as I can about web components so I can use that knowledge in my company's product and write the best code I can. I've been able to accomplish every task, and add every new feature from our roadmap, all using webcomponents.

As a result of all of this time spent, reading about, building, and using web components, I have some very strong opinions. I don't think they're perfect, but after reading countless articles written by people about webcomponents, I wanted to write this as a response to all of them. Due to the amount of time I have spent, and what I've built with webcomponents, I believe I have a unique perspective that might benefit some people that are using, want to use, or should be using webcomponents.


I see a lot of articles comparing webcomponents to frameworks. Straight away this is incorrect.

Example - https://dev.to/richharris/why-i-don-t-use-web-components-2cia
I've met Rich Harris and I really appreciate his contributions to Svelte and the front end community as a whole. As a side note, you should attend Svelte meetups.

He gives an example where he compares a svelte component to an HTMLElement component. This is a total mischaracterization/(not disingenious because that implies malice). Svelte is compiled, and the HTMLElement is just the browser native class. Svelte is doing a bunch of things behind the scenes to turn that svelte component into DOM elements. And if we're being really fair, there is far more Svelte code that is required to run to generate the DOM in that example than the HTMLElement example.

A more fair comparison would be to show a component that you would create using any one of the many web component libraries, most of which are only a few KBs and are essentially just wrappers around HTMLElement to make creating custom elements easier (which is what Svelte is, too). If he did that, we would have a much more sane comparison where instead of a whole heap of very low level custom element code, you'd have a few lines. Here's the example from Rich's post, but written using the 3KB [lit-element library](github litelement)

```js
class Adder extends LitElement {
  @property({ type: Number }) a;
  @property({ type: Number }) b;

  render() {
    return html`
      <input @change=${e => (this.a += e.target.value)} />
      <input @change=${e => (this.b += e.target.value)} />
      <p>${this.a} + ${this.b} = ${this.a + this.b}</p>
    `;
  }
}

customElements.define('my-adder', Adder);
```

If you don't want to use the @property decorators you could declare the props like this:

```js
static get properties(){
  return {
    a: {type: Number},
    b: {type: Number}
  }
}
```

Isn't that so much easier to read than the HTMLElement example? And remember, lit-element is only 3.7KB.

And to be honest, I would never recommend anyone use plain HTMLElements. There are plenty of legitimate reasons to do so - like the fact that you can use them without any build step in modern browsers, but the majority of people writing webcomponents should absolutely instead be using a library on top of HTMLElement.

## Reasons

The first and most important reason by far is that you shouldn't be reinventing the wheel. It really doesn't matter what you plan on doing with webcomponents, everybody needs the same things. A way to track props/state/attributes, a way to observer and react to their changes, and a way to render HTML. All of the webcomponent libraries do that for you. And they're the combined effort of multiple developers over long periods of time. It is statistically impossible that you're able to write your own library that comes close to the robustness of pre-existing ones unless you too have a team and multiple months or years to build another one.

Another bennefit you get is bundle size. This is a simple one that literally just boils down to class and function composition. You can either write multiple HTMLElements all containing hand written getters/setters, observed attributed, etc, or you can write a wrapper that handles all of that for each of your elements. That's why the (10 components smaller lib size, link link all ways to make WC).



And remember, lit-element is only 3.7KB.  When using webcomponents, it doesn't make sense **not** to use a framework/library.

Example of page that shows that most of the time it's actually better to use a library because it will result in a smaller size since it's reusuing HTMLElement instead of creating new ones every time.

Also then talk about how using a tried and true, tested framework is almost always better than rolling your own. Everyone loves frameworks like React and Vue and whatever else because it's difficult to write a complex application in just plain javascript.









and I'm writing this as a response to all the confusion, hate, and questions that surround webcomponents.

And then there are tools for more complicated work. I'm sure you've seen or heard numerous snide comments about how terrible web components are. But the reality is web components are the tools that are used to create the pneumatic nailer.
youtube image

spacex uses webcomponents on their onboard crew displays https://www.reddit.com/r/spacex/comments/gxb7j1/we_are_the_spacex_software_team_ask_us_anything/ft6bydt/

youtube uses webcomponents

mixpanel

atlassian bitbucket / jira --- do they?

bloomberg

mcdonalds menus
[https://github.com/Polymer/polymer/wiki/Who's-using-Polymer%3F](https://github.com/Polymer/polymer/wiki/Who's-using-Polymer%3F)

The fact is, most developers are building a few birdhouses per year. They're content with their hand saws and when they see a price tag and learning time required to use a miter saw, they make a comment online about how miter saws are too complicated and ugly and how they'll just bloat your workshop. They'll say you should just get better at sharpening your hand saw's teeth instead, without taking into consideration why someone would want to buy a miter saw in the first place.

Any of these tools are valid tools for building websites. Not everyone needs

Let's pretend

Web components