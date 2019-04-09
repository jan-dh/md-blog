---
title: Language switcher for Craft 3
date: "2018-07-25"
updated: "2019-04-09"
categories: ['Craft CMS','Twig']
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

Next we’ll get the baseUrl of each language. We'll use `getBaseUrl()` function for this. Don't use the `@web` alias in the baseUrl. It has potential [security risks](https://github.com/craftcms/cms/issues/3559).

```twig
<ul>
	{% for lang in langSwitcher %}
		{# Get base URL #}
		{% set url = lang.getBaseUrl() %}
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
		{% set url = lang.getBaseUrl() %}
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

## And there's more...
As you might've noticed when trying this code at home, the `lang.language|upper` gives a short string for the language. When your site has the language set to `English (United States)`, you will only get back a string `en-US`. There is however a way to get the original name of the language:

```twig
{% set locale = craft.app.i18n.getLocaleById(lang.language) %}
<a href="{{url}}">{{ locale.displayName }}</a>
```

To be able to access the name, you have to pass the string that `lang.language` returns through the internationalization service (i18n). What this will return is the language and the location it belongs to.

`en-US` will return `English (united states)`. While this is a little better, it's maybe a little bit too much. If you want to return only the language you can do this:

```twig
{% set locale = craft.app.i18n.getLocaleById(lang.language|slice(0,2)) %}
```

You slice the string `en-US` to `en`. By passing in only the short string instead of `en-US` you will get back the language without the location, in this case: `English`.


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

*Do note that there's a bugfix on the way for the `|without` filter. Currently this will give you all the sites, even the one passed within the filter. - This was fixed in release 3.0.17*

