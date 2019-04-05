---
title: Craft multi-site setup
date: "2019-04-15"
updated: ""
categories: ['Craft CMS','Twig']
featuredImage: "./multi-site.jpg"
intro: "One year ago, when Craft 3 launched, it introduced the concept of a multi-site setup. It opened up a whole new set of possibilities, but with great power comes great responsibility. Here are some things you might like to know."
---

## Introduction

### What is a multi-site setup? 
- One site multiple languages
- One CMS, multiple sites,

### When would you go multi-site
- Group multiple instances of sites onder 1 hood
- Share templates between multiple sites
- Share content between multiple sites

## The setup
- two sites, shared templates, multi-language

### Configuration
- Using Craft 3 - project config, introduced in 3.1
- .env file for base url + alias in base in config
- convertFilenamesToAscii
- Routing: tricky, htaccess rewrite or redirect plugin but gets messy soon

### CMS 
1. Sites: Defining your sites
 - handle
 - language
 - Does it have it’s own url
 - baseUrl (from .env --> alias)
2. Propagate across all Sites
 - Section/channels
 - categories
4. Volumes:
 - Not on a per site base
 - You can set up volumes for different sites, easy 
5. Fields: 
 - Translation methods  (screenshot omzetten naar tekst)
6. User groups:
 - Editors per site / sitegroup

### Templates
- Language switcher: 
 - templating tricks 
 - Changes coming in 3.2 (or 4)
- Translations: 
 - Translate CMS 
 - Enupal plugin: saved on server
- SEOmatic per site setup
- Multiple templates
 CRAFT_TEMPLATES_PATH




