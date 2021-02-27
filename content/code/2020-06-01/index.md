---
title: "You can save 15 minutes or more a day by switching to Rollup"
path: "webpack-to-rollup"
date: "2020-06-01"
category: "Code"
kind: "Article"
chunk: "A riveting tale of how one man stood up to Webpack and said no more"
tags:
    - Webpack
    - Rollup
published: "true"
---


I became fed up with my long Webpack build times. I knew there was a better way. This is a story outlining the different options I explored before settling on Rollup.

This is not to convince you to switch away from Webpack. I still use Webpack every day in other codebases that have complex configs and I have no complaints. It was just with this codebase in particular that had long build times for whatever reason.

## Time wasted

Let's start with some numbers, which were the catalyst for this change. Let's say that rebuilds occur 50 times a day, and I think that's a very conservative estimate.

It took about 30 seconds to go from saving the file, to Webpack rebuilding, to the browser refreshing.

That's 50 rebuilds * 30 seconds, or 1500 seconds per day.

Assuming I'm writing code 5 days a week for 50 weeks, that's 250 days.

1500 seconds per day for 250 days is 375000 seconds per year.

375000 divided by 60 seconds, divided by 60 minutes, divided by 24 hours is 4.3 days.

In a year, I spend **over half a week** waiting for my dev server to refresh. I was tired of waiting, and I knew I could find a better way.

## The Formative Years

Early in this codebase's life, it was more of a lightly configurable application. In the quest to always try to pick the right tool for the job, I used Webpack since the general consensus is that Webpack is for bundling applications. Most importantly, I already had experience using Webpack.

As the product and the codebase progressed, it turned into a full-fledged SDK. It became a set of tools, and tools *normally* don't get built with Webpack, and for good reason.

One reason that's unrelated to build time is how it handles different outputs.

If you're trying to build a website, nobody cares what the different outputs are, just take whatever they give you in the default configs, test if your site runs in chrome, firefox, and safari, and you're good to go.

When you're building a tool that other developers are consuming and using in their projects, the output files matter. And this is the first place where Webpack falls short.

I'm not saying Webpack is unusable in this regard. I have been successfully using Webpack up until this point. But the second you want to do anything other than a basic build for a website, you need to start writing hacky workarounds.

These often boil down to leveraging Webpack's build hooks to inject strings before, during, or after the files get built, for things like ESM exports, globalThis handling, etc.

These issues, in conjunction with the long rebuild time, made me decide enough was enough and I should say goodbye to Webpack.

## The Suitors

Taking a look around, Rollup was the only real choice for my use case. But I had played around with using Rollup for this codebase in the past, and I remember the build times being similar, so I decided to test the waters to see what my options were.

### Snowpack

Snowpack is great. It really is as fast as they claim, and it's simple. After installing the few dependecies and copying the starter config file, I had a running dev environment in literally seconds. When I saved a change for the first time, the page refreshed so quickly I didn't even notice it had happened.

It was astonishing and I hope web development trends in this direction for the forseeable future. But, Snowpack is also not for building tools. If you want to learn more about how awesome snowpack is, go to [snowpack.dev](https://www.snowpack.dev/). They're not paying me, I swear.

### TSC, Babel, and ES-Dev-Server

The next thing I tried was rolling my own setup. I had TypeScript compile my ts files into js, babel took the js files and turning them into ES5, and then es-dev-server to serve all of it, with each script running in watch mode.

This was honestly a nightmare. First of all, to watch everything concurrently, I had set the script to open three terminals all running the build + watch scripts, and compiling/transpiling with typescript and then babel led to having two extra directories in the project with hundreds of files. Of course, they can be .gitignored, and having a few terminals running isn't actually a big deal.

I had such high hopes for this but the real issue was that I never even got it completely working.

Error after error, I searched github issue threads, stack overflow, and combed through docs. After I solved one error, another immediately followed. After spending way too much time debugging, I decided to move on.

I actually want to revisit this in the near future, because I've gotten something similar working in the past, and it seems pretty straightforward in theory, so I feel like my issues were caused by the tunnel vision I inevitably acquired after reading mountains of docs and Stackoverflow questions.

### Parcel

I thought, maybe instead of es-dev-server, I'll use something to bundle and serve at the same time. That would alleviate the majority of the errors I was getting. So I tried [Parcel](https://parceljs.org/). It worked, and it was fast. It took about 45 seconds to first set up, and then when I made a change in a file it would refresh the page in a couple of seconds. It was pretty great. But, there was a major issue with this setup as well.

First, the reason why parcel is fast is because it breaks apart your project into multiple smaller files in a cache directory. This is why it takes a little while for the initial build, and why it's so fast on subsequent builds. When you make a change and it reloads, it only needs to edit a tiny segment of your project. While this is great for website, the project I'm working on is not a website.

Speaking of the caching, and since I complained about a lot of build files previously, I would be remiss if I didn't mention the fact that Parcel generated 800 some odd files out of my ~150 file codebase. Again, having a ton of extra files in a big ol' cache directory is .gitignore-able so that's a non-issue.

The real issue is that the output Parcel produces in dev isn't real. The product that I'm working on is a single embeddable file. While writing code, I'm actively testing out the product since it's in the same format that it will be when others consume it. Using parcel, it was not. Parcel's generation of 800 micro-files was possibly the farthest I could get from having my development and production environment be similar.

### Rollup

I had some experience using Rollup in the past, but as I previously mentioned, I didn't try it initially because when I played around it with a few months prior, the build times were the same as Webpack.

I couldn't think of anywhere else to go, so I bit the bullet and figured I could at least try work out a way to reduce the build time if it ended up being similar again.

And it was not only similar to my Webpack build time, it was just about identical. Rebuilding watched files would take just about 30 seconds, and that just wasn't acceptable since those build times were the whole reason I started this whole ordeal. So I headed back to google.

I tried a few things. Some suggestions were to enable the cache, which has some downsides, and also complicates the config file. I tried it out, but there was no improvement.

I came across a discussion in a github issue that seemed promising. Apparently, some people were claiming the TypeScript Rollup plugin I was also using caused a build slowdown in their project. The maintainer mentioned adding some flag to the config to help out. So I did, and it brought the build time down from ~30 seconds, to ~25 seconds. Not as good as I had hoped.

I tried looking in the plugin's sourcecode. Of course I was unable to gain any insight - this issue wasn't as simple as finding the source of a bug and patching it.

### The Rollup Climax

So I thought if the plugin is causing these extended build times, why not just *not* use the plugin? There's no guarentee that the plugin is causing **all** of the build time, but I already had the necessary build steps setup to run the TypeScript compiler from my previous attempts. It couldn't hurt to try.

So I comment out the typescript plugin from my Rollup config, and change my build script to essentially

```bsdh
npm run tsc --watch && npm run rollup --watch && npm run es-dev-server --watch
```

It took 15 seconds to build initially, and then when I saved a file I saw something beautiful.

```
created dist\bundle.js in 1.6s
```

I was so happy. It actually worked.

But then I noticed something annoying. Every time I saved a file and the scripts ran, my browser reloaded twice.

The product makes a few requests to our company's backend on page load, so making double the requests was just a waste if it can be avoided. So I needed to figure out a way around that to be truly satisfied.

I took a look at what all the cool kids were using for serving and live reloading a Rollup build and I immediately found the two plugins `rollup-plugin-serve` and `rollup-plugin-livereload`. Duh. I should have thought about that earlier.

Once I made the necessary changes to my dev Rollup config, I was able to change my build script. Since the live reloading server was now an integrated part of the Rollup build, I was able to pare down my build script to be simply

```
npm run tsc --watch && npm run rollup --watch
```

And that worked! The browser reloaded exactly once, and the time to reload stayed at ~2 seconds. The last test was to run the production build script. The end result was that the build made with Rollup was about 12% smaller than the Webpack build.

I'd say this was a huge success. With just a few hours of banging my head against the wall, I was able to reduce my dev reload time from ~30 seconds to ~2 seconds, and reduce the production build size by 12%.
