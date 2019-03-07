---
title: Sketch Tailwind
date: "2019-03-10"
updated: ""
categories: ['Sketch','Tailwind CSS','Css']
featuredImage: "./sketch-tailwind.png"
intro: "A plugin that tries to bridge the gap between designs and code. Sketch Tailwind lets you export aspects of a design made in Sketch to javascript files that are ready to use with Tailwind CSS."
---

For those who don't know [Tailwind CSS](https://tailwindcss.com), it is a utility-first CSS framework for rapidly building custom user interfaces. It's developed and maintained by [Adam Wathan](https://twitter.com/adamwathan) and it has known a huge increase in popularity. He goes in depth in to the philopshy behind the framework in a very interesting blogpost: [CSS Utility Classes and "Separation of Concerns"](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/). If you haven't read that post, make sure the give it a read, it's worth it.

## Designing for code
Tailwind at it's core works with a `tailwind.js` configuration file. In this file you define the properties you will be using in your project:

- colors
- font-families
- font-sizes
- line-height
- paddings
- margins
- ....

The colors, for example, look something like this:
```javascript
let colors = {
  'transparent': 'transparent',
  'black': '#22292f',
  'grey-darkest': '#3d4852',
  'grey-darker': '#606f7b',
  'grey-dark': '#8795a1',
  'grey': '#b8c2cc',
```

As a developer it's very handy to know most of these properties when you begin to set up a new project. They form the base of your styling, so once they are all defined, you can dive straight into the code without having to think too much about them. It increases productivity a lot.

### Creating your theme
As a designer working in Sketch, you'll work with Layer Styles and Text Styles. Those are the base styles you define and reuse all in your design. Basically, what we would need in our `tailwind.js`. 🤔

![Layer styles](./layer-styles.png)

The plugin let's you export properties from your design so you can use them in your Tailwind configuration. At this point the plugin picks up:
- colors
- font-families
- text-sizes. 




## Coding with design
The exported file will look something like this:
```javascript
const theme = {
  colors: {
    'blue-dark': '#092e38',
    bordeaux: '#853a51',
    beige: '#eed0a3',
    blue: '#4574b3',
    ...
  },
  fontSizes: {
    sm: '0.9375rem',
    base: '1rem',
    lg: '1.25rem',
    xl: '1.3125rem',
    ...
  },
  fonts: {
    helvetica: 'Helvetica',
    roboto: 'Roboto',
    adelle: 'Adelle'
  }
};
export default theme;
```

Notice the export at the bottom. This let's us import the theme file in to the `tailwind.js`  configuration file, like so:

```javascript
import theme from './theme';
```

Using the spread operator at the end of each property you can add the colors, fonts and font-sizes to your configuration file.
```javascript{8}
let colors = {
  'transparent': 'transparent',
  'black': '#22292f',
  'grey-darkest': '#3d4852',
  'grey-darker': '#606f7b',
  'grey-dark': '#8795a1',
  'grey': '#b8c2cc',
  ...theme.colors,
```
By adding the colors at the end, the theme will overwrite values that were are already present before the spread operator. This way you make sure you're using the colors you defined, not the defaults already present.

## Try it!

Ready to take it for a spin? You can download it from [Github](https://github.com/jan-dh/sketch-tailwind). The plan is to implement more properties to extract from Sketch and keep it compatible with the upcoming Tailwind 1.0 changes. Have some thoughts or ideas on it? Let me know!