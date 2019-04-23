---
title: Updating to Babel 7.4
date: "2019-04-19"
updated: 
categories: ['Javascript','Webpack','Babel']
featuredImage: "./babel.jpg"
intro: "Babel 7.4 changed things up a bit with how the polyfills work. A short overview on everything you need to know to get started."
---

In a [previous post](https://www.thebasement.be/working-with-babel-7-and-webpack/) I talked about what Babel is, how to set it up with Webpack and what it can do. Since the release of Babel 7.4 there are some breaking changes to the way the polyfilling works. Let's have a look.

## Update Babel
For starters, update the following packages:
- @babel/core
- @babel/register
- @babel/preset-env

Make sure they are all at least version 7.4.

## Core-js 3

As we learned in the [Working with babel 7 and Wepack - post](https://www.thebasement.be/working-with-babel-7-and-webpack/), `@babel/preset-env` takes care of what transforms should be applied and `@babel/polyfill` provides polyfills to make sure all browsers you defined in your browserlist are supported.

All those polyfills that were provided in `@babel/polyfill` were provided by a package called `core-js`, maintained by [Denis Pushkarev](https://github.com/zloirock). 

Babel 7.4 uses the newest version of this package, `core-js@3`, which is incompatible with the previous version (`core-js@2`), so we will have to make some changes to our config.

### Updating your config
So in order to get your setup working with Babel 7.4 there are some things you have to adjust

-  First of all, install the latest version of `core-js`

```javascript
npm i core-js@3
```

- Update your `.babelrc`
Make sure you explicitly set the version of `core-js`.

```javascript
presets: [
   ["@babel/preset-env", {
       useBuiltIns: "usage"
       corejs: 3,
   }]
]
```
- Remove `@babel/polyfill`
Since `core-js` is now being used directly for the polyfills, the `@babel/polyfill` package is being deprecated. You can remove it from your project.

```javascript
npm uninstall @babel/polyfill
```

### Manually import core-js

If you were importing `@babel/polyfill` directly in to your files, you should update them with the `core-js` package. Change

```javascript
import "@babel/polyfill";
```

to

```javascript
import "core-js/stable";
import "regenerator-runtime/runtime";
```

The `core-js/stable` point to the stable version of your currently installed `core-js`-package, be it version 2 or version 3. `regenerator-runtime/runtime` is for when you are transforming [generators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*). 


Now you should be able to use Babel as you did before.

## Dive deeper
The 7.4 release came with a lot of updates. If you want to dive deeper into this, make sure to check out their [official release post](https://babeljs.io/blog/2019/03/19/7.4.0). 