---
title: Language switcher for Craft 3
date: "2018-07-25T13:10:00.284Z"
categories: ['craft','twig']
featuredImage: "./language-switch.jpg"
intro: "Craft 3 introduced some changes to locales and the multi-site setup. On top of that there are also a number of templating changes, so your old language switcher probably won't work anymore. So today we're building a brand new language switcher for Craft 3."
---

As from Craft 3, locales are replaced by sites. Each site can have it's own language. For clarity, I will refer to other sites by language for the rest of this post.

## Basic approach

The basic approach for this switcher will be: check if the entry or the category exists in the other language; if not, set the toggle url to the homepage of that other language.

We start off by getting an array of all the sites as well as the current slug:
```twig
{# Create an array with the homepages #}
{% set langSwitcher = craft.app.sites.getAllSites() %}

{# Get slug #}
{% set slug = craft.app.request.segments|last %}
```

Next we’ll get the baseUrl of each language. Notice the use of the new function `alias()` - this will replace any use of the `@web` alias in the baseUrl with its value.

```twig
<ul>
	{% for lang in langSwitcher %}
		{# Get base URL #}
		{% set url = lang.baseUrl|replace('@web', alias('@web')) %}
		<li>
			<a href="{{url}}" {% if lang.id == currentSite.id %}class="active"{% endif %}>{{lang.language|upper}}</a>
		</li>
	{% endfor %}
</ul>
```

This would be a working solution. The only downside of this approach is that the user would always be redirected to the homepage of the other language. Not very ideal - we would rather have the user to land on the current page but in the selected language.

## A dynamic language switch

So, right after we set the url variable, we should test if the current slug we set matches either an entry or a category in the current language.

```twig
{# Test for entry or category #}
{% set testEntry = craft.entries.slug(slug).one().id ?? null %}
{% set testCategory = craft.categories.slug(slug).one().id ?? null %}
```

If that's the case, then we'll check each language in the loop to see if there's an entry or a category that matches the current entry or category (based on their `id`).

```twig
{# Entry found with id that matches current slug #}
{% if testEntry %}
	{# Check if that entry exists in other locale #}
	{% set otherLocaleEntry = craft.entries.siteId(lang.id).id(testEntry).one() %}
	{% if otherLocaleEntry %}
		{% set url = otherLocaleEntry.url %}
	{% endif %}
{# Category found with id that matches current slug #}
{% elseif testCategory %}
	{# Check if that entry exists in other locale #}
	{% set otherLocaleCat = craft.categories.siteId(lang.id).id(testCategory).one() %}
	{% if otherLocaleCat %}
		{% set url = otherLocaleCat.url %}
	{% endif %}
{% endif %}
```

Now we have a `url` variable for each language that has either the homepage or a link to a matching entry or category. We set the active class if our current site `id` matches the language in our loop.

```twig
	<li>
		<a href="{{url}}" {% if lang.id == currentSite.id %}class="active"{% endif %}>{{lang.language|upper}}</a>
	</li>
	{% endfor %}
</ul>
```

The complete language switcher:

```twig
{# Create an array with the homepages #}
{% set langSwitcher = craft.app.sites.getAllSites() %}
{# Get slug #}
{% set slug = craft.app.request.segments|last %}
<ul>
	{% for lang in langSwitcher %}
		{# Set homepage as default #}
		{% set url = lang.baseUrl|replace('@web', alias('@web')) %}
		{# Test for entry or category #}
		{% set testEntry = craft.entries.slug(slug).one().id ?? null %}
		{% set testCategory = craft.categories.slug(slug).one().id ?? null %}
		{# Entry found with id that matches current slug #}
		{% if testEntry %}
			{# Check if that entry exists in other locale #}
			{% set otherLocaleEntry = craft.entries.siteId(lang.id).id(testEntry).one() %}
			{% if otherLocaleEntry %}
				{% set url = otherLocaleEntry.url %}
			{% endif %}
		{# Category found with id that matches current slug #}
		{% elseif testCategory %}
			{# Check if that entry exists in other locale #}
			{% set otherLocaleCat = craft.categories.siteId(lang.id).id(testCategory).one() %}
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

The reason why I like this approach is because it provides a lot of flexibility. If you have some custom routes you want to check you could easily add them to the tests you perform to match an entry or category in another language. You could also limit the language switcher to only include the sites in the current site group by adding a check to see if the language `groupId` matches the current one.

```twig
{% for lang in langSwitcher %}
	{% if lang.groupId == currentSite.groupId %}
	...
```

If you want to exclude the current site you could do that by using the `|without` filter:
```twig
{% set langSwitcher = craft.app.sites.getAllSites()|without(currentSite) %}
```



*Do note that there's a bugfix on the way for the `|without` filter. Currently this will give you all the sites, even the one passed within the filter.*
