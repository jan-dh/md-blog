---
title: Language switcher for Craft 3
date: "2018-07-25"
updated: "2018-07-31"
categories: ['craft','twig']
featuredImage: "./language-switch.jpg"
intro: "Craft 3 introduced some changes to locales and the multi-site setup. On top of that there are also a number of templating changes, so your old language switcher probably won't work anymore. So today we're building a brand new language switcher for Craft 3."
---

As from Craft 3, locales are replaced by sites. Each site can have it's own language. For clarity, I will refer to other sites by language for the rest of this post.

## Basic approach

The basic approach for this switcher will be: check if the entry or the category exists in the other language; if not, set the toggle url to the homepage of that other language.

We start off by getting an array of all the languages:
```twig
{# Create an array with the homepages #}
{% set langSwitcher = craft.app.sites.getAllSites() %}
```

Next we’ll get the baseUrl of each language. Notice the use of the new function `alias()` - this will replace any use of the `@web` alias in the baseUrl with its value.

```twig
<ul>
	{% for lang in langSwitcher %}
		{# Get base URL #}
		{% set url = alias(lang.baseUrl) %}
		<li>
			<a href="{{url}}" {% if lang.id == currentSite.id %}class="active"{% endif %}>{{lang.language|upper}}</a>
		</li>
	{% endfor %}
</ul>
```

This would be a working solution. The only downside of this approach is that the user would always be redirected to the homepage of the other language. Not very ideal - we would rather have the user to land on the current page but in the selected language.

## A dynamic language switch

So, right after we set the array of our languages, we should test if the current page we are on is either an entry or a category in the current language. If that's the case, then we'll check each language in the loop to see if there's an entry or a category that matches the current entry or category (based on their `id`).

```twig
{# Entry is defined #}
{% if entry is defined %}
	{# Check if that entry exists in other locale #}
	{% set otherLocaleEntry = craft.entries.siteId(lang.id).id(entry.id).one() %}
	{% if otherLocaleEntry %}
		{% set url = otherLocaleEntry.url %}
	{% endif %}
{# Category is defined #}
{% elseif category is defined %}
	{# Check if that entry exists in other locale #}
	{% set otherLocaleCat = craft.categories.siteId(lang.id).id(category.id).one() %}
	{% if otherLocaleCat %}
		{% set url = otherLocaleCat.url %}
	{% endif %}
{% endif %}
```

Now we have a `url` variable for each language that has either the homepage or a link to a matching entry or category. We set the active class if our current site `id` matches the language in our loop.

The complete language switcher:

```twig
{# Create an array with the homepages #}
{% set langSwitcher = craft.app.sites.getAllSites() %}
<ul>
	{% for lang in langSwitcher %}
		{# Set homepage as default #}
		{% set url = alias(lang.baseUrl) %}
		{# Entry is defined #}
		{% if entry is defined %}
			{# Check if that entry exists in other locale #}
			{% set otherLocaleEntry = craft.entries.siteId(lang.id).id(entry.id).one() %}
			{% if otherLocaleEntry %}
				{% set url = otherLocaleEntry.url %}
			{% endif %}
		{# Category is defined #}
		{% elseif category is defined %}
			{# Check if that entry exists in other locale #}
			{% set otherLocaleCat = craft.categories.siteId(lang.id).id(category.id).one() %}
			{% if otherLocaleCat %}
				{% set url = otherLocaleCat.url %}
			{% endif %}
		{% endif %}
		<li>
			<a href="{{url}}" {% if lang.id == currentSite.id %}class="active"{% endif %}>{{lang.language|upper}}</a>
		</li>
	{% endfor %}
</ul>
```

## Flexibility

The reason why I like this approach is because it provides a lot of flexibility. If you have some custom routes you want to check you could easily add them to the tests you perform to match an entry or category in another language. You could also limit the language switcher to only include the sites in the current site group by setting the group first, based on the `currentSite.groupId` - and then get all the sites from within that group using `group.getSites()`.

```twig
{% set group = craft.app.getSites().getGroupById(currentSite.groupId) %}
{% for lang in group.getSites() %}
	...
```

If you want to exclude the current site you could do that by using the `|without` filter:

```twig
{% set langSwitcher = craft.app.sites.getAllSites()|without(currentSite) %}
```

If you are using Craft Commerce you could check to see if you are on a product page or not:

```twig
{% if product is defined %}
	{# Check if that product exists in other locale #}
	{% set otherLocaleProduct = craft.entries.siteId(lang.id).id(product.id).one() %}
	{% if otherLocaleProduct %}
		{% set url = otherLocaleProduct.url %}
	{% endif %}
```
<br>

*Do note that there's a bugfix on the way for the `|without` filter. Currently this will give you all the sites, even the one passed within the filter.*
