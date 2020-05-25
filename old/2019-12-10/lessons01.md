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
  new Promise(resolve => {
    let data = {};
    const update = data =>
      fetch(`/items/${itemId}`, {
        method: "POST",
        body: data
      })
        .then(r => r.json())
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
  new Promise(resolve => {
    let data = {};
    const update = data =>
      fetch(`/item/${itemId}`, {
        method: "POST",
        body: JSON.stringify(data)
      })
        .then(r => r.json())
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
      convertLocation(itemLocation).then(location => {
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
  new Promise(resolve =>
    fetch(`/item/${itemId}`, {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(r => r.json())
      .then(resolve)
  );
```

And now let's add the new properties and convert the second version of the function.

```js
const updateItemName = (itemId, itemName) => itemFetch(itemId, { itemName });

const updateItemPhoto = (itemId, itemPhoto) => itemFetch(itemId, { itemPhoto });

const updateItemAge = (itemId, itemPrice) => itemFetch(itemId, { itemPrice });

const updateItemLocation = (itemId, itemLocation) =>
  convertLocation(itemLocation).then(location =>
    itemFetch(itemId, { location })
  );

const itemFetch = (itemId, data) =>
  new Promise(resolve =>
    fetch(`/items/${itemId}`, {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(r => r.json())
      .then(resolve)
  );
```

These functions do the same thing in fewer lines of more explicit code. Each can be tested individually, and you don't need to worry about shooting yourself in the foot by adding or changing anything in a single monster function. If you need to make any additions you just add new functions.

1. ...
