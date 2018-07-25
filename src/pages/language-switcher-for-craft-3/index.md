---
title: Language switcher for Craft 3
date: "2018-07-25T13:10:00.284Z"
categories: ['craft','twig']
featuredImage: "./language-switch.jpg"
intro: "Craft 3 introduced some changes to locales and the multi-site setup. On top of that there are also a number of templating changes, so your old language switcher probably won't work anymore. So today we're building a brand new language switcher for Craft 3."
---

The basic approach for this switcher will be: check if the entry or the category exists in the other language. If not, set the toggle url to the homepage of that other language.

We start of by getting all the sites.  
```twig
{# Create an array with the homepages #}
{% set langSwitcher = craft.app.sites.getAllSites() %}
<ul>
	{% for lang in langSwitcher %}
```

Next we'll get the current slug and set the url for our language switcher default to the baseUrl of that site. Notice the use of the new function `alias`. This wil replace the `@web` property with your actual `baseUrl`.

```twig
{# get slug #}
{% set slug = craft.app.request.segments|last %}
{# set homepage as default #}
{% set url = lang.baseUrl|replace('@web', alias('@web')) %}
```

This would be a working solution. The only downside of this approach is that the user would always be redirected to the homepage of the other language. Not very ideal. We would rather have the user stay on the same page.

We test if the current slug we set matches either an entry or a category in the current site.

```twig
{# test for entry or category #}
{% set testEntry = craft.entries.slug(slug).one().id ?? null %}
{% set testCategory = craft.entries.slug(slug).one().id ?? null %}
```

If that's the case, then we'll look in the other site if there's an entry or a category that matches the current entry of category (based on their `id`).

```twig
{# entry found with id that matches current slug #}
{% if testEntry %}
	{# check if that entry exists in other locale #}
	{% set otherLocaleEntry = craft.entries.siteId(lang.id).id(testEntry).one() %}
	{% if otherLocaleEntry %}
		{% set url = otherLocaleEntry.url %}
	{% endif %}
{# category found with id that matches current slug #}
{% elseif	testCategory %}
	{# check if that entry exists in other locale #}
	{% set otherLocaleCat = craft.categories.siteId(lang.id).id(testEntry).one() %}
	{% if otherLocaleCat %}
		{% set url = otherLocaleCat.url %}
	{% endif %}
{% endif %}
```

Now we have a `url` variable for each site that has either the homepage or a link to a matching entry or category. We set the active class if our current site `id` matches the language in our loop.

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
<ul>
	{% for lang in langSwitcher %}
		{# get slug #}
		{% set slug = craft.app.request.segments|last %}
		{# set homepage as default #}
		{% set url = lang.baseUrl|replace('@web', alias('@web')) %}
		{# test for entry or category #}
		{% set testEntry = craft.entries.slug(slug).one().id ?? null %}
		{% set testCategory = craft.entries.slug(slug).one().id ?? null %}
		{# entry found with id that matches current slug #}
		{% if testEntry %}
			{# check if that entry exists in other locale #}
			{% set otherLocaleEntry = craft.entries.siteId(lang.id).id(testEntry).one() %}
			{% if otherLocaleEntry %}
				{% set url = otherLocaleEntry.url %}
			{% endif %}
		{# category found with id that matches current slug #}
		{% elseif	testCategory %}
			{# check if that entry exists in other locale #}
			{% set otherLocaleCat = craft.categories.siteId(lang.id).id(testEntry).one() %}
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

The reason why I like this approach is provides a lot of flexibility. If you have some custom routes you want to check you could easily add them to the tests you perform to match an entry or category in an other language. You can also transform this to a select dropdown excluding the current site like so:
```twig
{% set langSwitcher = craft.app.sites.getAllSites()|without(currentSite) %}
```

Do note that there's a bugfix on the way for the `|without` filter. Currently this will give you all the sites, even with the filter.
