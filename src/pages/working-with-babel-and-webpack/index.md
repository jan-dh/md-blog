---
title: Working with Babel 7 and Webpack
date: "2018-09-09"
categories: ['javascript','webpack','babel']
featuredImage: "./tables2.jpg"
intro: "With the recent release of Babel 7, it's the perfect time to really get to know it. A post on what Babel is, what it does and how you can use it to optimize your workflow in combination with Webpack "
---

## What is Babel?
Babel is used in a lot of javascript projects out there, but as a beginner it can be a little tricky to understand what exactly it does and how to use it. So, what is Babel? This is what the [website](https://babeljs.io/docs/en) says:
> Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.

Babel can do a lot things, but at it's core it enables you to write next-generation javascript and makes sure that websites and [node](https://nodejs.org/en/) can use that javascript.

The functionality of Babel is split up in different npm-packages, so you can pick the parts you need for your project. Do note that the packages all share the same namespace. Babel moved to a monorepo structure, meaning that all packages share the same [repository](https://github.com/babel/babel). The packages used to have their own repository, so if you're installing them, make sure you install the right version.

A short overiew of the packages we'll be using:
### @babel/core
This package, as the name would suggest, is the core package. The package is responsible for compiling javascript code and outputting usable code. By default it uses your local configuration, but we'll get to that later on.
### @babel/register
This package will allow you to run Babel just by requiring files. This is not ment for production but don't worry about that. It will enable us to use ES6 in our Webpack config.
### @babel/preset-env
Knowing what browser supports what javascript feature is essential in transforming your code. Here's where `preset-env` comes in. It handles what transforms should be applied, based on your own input. You tell Babel: "I Need support for those browser" and it will transform your javascript so it will work on the browserlist you provide.
### @babel/polyfill
Sometimes the browsers you want to support need a little extra help for certain features. `@babel/polyfill` will provide polyfills for those featured, based on what browsers you wish to support.
### babel-loader
Since we will be using Webpack, this package allows us to transpile our code using Babel and Webpack.

## Setting up Babel
I made a demo-project you can download [PROJECT TO COME](here) with a basic Webpack setup. This post assumes a basic knowledge of webpack. You can follow along with the demo files or just integrate this in your current workflow. Just make sure that you have Webpack installed and a working `webpack.config.js`.

### Installing all the dependencies
We'll go ahead and install all the depencies we need. Make sure that you install `@babel/polyfill` as a dependency, not a dev-dependency:
```js
npm install --save-dev @babel/core @babel/register @babel/preset-env babel-loader
npm install --save  @babel/polyfill`
```

### .babelrc

## Babel and webpack
### Using ES5 in your webpack config
### babel-loader
- docs a bit unclear
- define your presets in `.babelrc`
### Using browserlist
- why (postcss share same point of truth)
- easy
### Polyfill your code

## Bonus: Splitchunks
### Why splitchunking?
### How?
