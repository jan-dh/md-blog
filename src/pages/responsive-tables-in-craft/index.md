---
title: Responsive tables in Craft
date: "2018-07-10T22:12:03.284Z"
categories: ['craft','twig']
featuredImage: "https://picsum.photos/768/474"
intro: "Tables today are still a powerful tool for displaying data in a nice and orderly fashion. In this post we’ll make a twig component for Craft CMS that makes working with responsive tables a breeze."
---

I saw a tweet from [Matt Smith](https://twitter.com/AllThingsSmitty/) passing by on responsive tables. Checking out the [pen](https://codepen.io/AllThingsSmitty/pen/MyqmdM) he made, I thought it was an excellent way to implement responsive tables, so I decided to make a small reusable component for my Craft sites.  Have a look at the pen to understand what’s going on: data-attributes are being used to provide content on the mobile version of the table.

## Creating the table
Time to make our own. First we need to make a table field in Craft. We’ll make a table with let’s say 6 columns. Leave the column heading blank and set the handle for each column with a `col` + index. 

![Creating a table field](./create-table.png)

We fill out the new table field with some dummy data. Use the first line as the table header.

![Filling in the table field](./fill-in-table.png)

## Building the template

Make new twig file in your templates folder. This is the actual component you're going to import later on. In the first step we’re going to set our table size, hardcoded for now. Next we'll create an empty object we will use to pass the content of our table header (the first row) to the other rows. Since we don't use the first row, we only need `tableSize - 1` as the amount of iterations. The empty object is now filled with key-value pairs like for example `label1:1`.

```twig
{# Set the table size here #}
{% set tableSize = 6 %}

{# Create empty object #}
{% set emptyObject = [] %}

{% for i in 1..(tableSize -1) %}
 {% set labelName = 'label' ~ i %}
 {% set emptyObject = emptyObject|merge({(labelName): i}) %}
{% endfor %}
```

Next step is to create the actual table. We use the first row to create the table head.

```twig 
<table class="responsive-table">
{% for row in entry.tableField %}
  {% if loop.index == 1%}
  <thead>
    <tr>
      <th scope="col">{{row.col1}}</th>
      {% for i in 2..(tableSize) %}
        {% set colName = "col" ~ i %}
        {% set colValue = attribute(row, colName) %}
        {% set labelName = 'label' ~ i %}
        {% set emptyObject = emptyObject|merge({(labelName): (colValue)}) %}
        <th scope="col">{{colValue}}</th>
      {% endfor %}
    </tr>
  </thead>
  <tbody>
  {% else %}
```

Notice that we also set the `labelName` in our empty object with the corresponding `colValue`. This is used to set the data-attributes in our table:

```twig
  <tr>
   {% for i in 0..(tableSize - 1) %}
    {% if tableSize > i %}
     {% set colName = "col" ~ (i + 1) %}
     {% set labelIndex = 'label' ~ (i + 1) %}
      <td data-label="{% if not loop.first %}{{attribute(emptyObject, labelIndex)}}{% endif %}">{{attribute(row, colName)}}</td>
    {% endif %}
   {% endfor %}
  </tr>
  {% endif %}
 {% endfor %}
 </tbody>
</table>
```

We create the body of the table looping over the table size. For each `td` we set the `data-label` with the corresponding `colValue` and we use the `colName` for the actual content.

## Let's get dynamic

This all works fine but it's not very handy. If the content creator wants to use some different tables that contain 4 or 7 columns, you'll have to rewrite the whole thing again and again, not very DRY.

We'll start by introducing a new variable `width` which we will use to save the actual size of the table.

```twig{1,9,10,14}
{% set width = 1 %}

<thead>
  <tr>
   <th scope="col">{{row.col1}}</th>
   {% for i in 2..(tableSize) %}
     {% set colName = "col" ~ i %}
     {% set colValue = attribute(row, colName) %}
     {% if colValue|length %}
       {% set width = i + 1 %}
       {% set labelName = 'label' ~ i %}
       {% set emptyObject = emptyObject|merge({(labelName): (colValue)}) %}
       <th scope="col">{{colValue}}</th>
    {% endif %}
   {% endfor %}
  </tr>
</thead>
```

In the table head we check if there's a value in the first row (meaning the table head is not empty). If it's not empty we'll increase the width by 1. Next we'll use the `width ` to output only a `td` with the `data-label` if it's within our set size.

```twig{4}
{% else %}
  <tr>	
  {% for i in 0..(tableSize - 1) %}
    {% if width > i %}
      {% set colName = "col" ~ (i + 1) %}
      {% set labelIndex = 'label' ~ (i + 1) %}
      <td data-label="{% if not loop.first %}{{attribute(emptyObject, labelIndex)}}{% endif %}">{{attribute(row, colName)}}</td>
    {% endif %}
  {% endfor %}
  </tr>
{% endif %}
```

If there's an empty column we won't render that column. Our table size is now dynamic based on the content that is entered in Craft.

## Styling

All we need now is a little styling. Add the following snippet of `.scss` to your code. 

```scss
/* Responsive table */
table.responsive-table {
  border: 1px solid #333;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  caption {
   font-size: 1.5em;
   margin: .5em 0 .75em;
  }
  tr {
    background:transparent;
    border: 1px solid #333;
    padding: .35em;
  }
  th,
  td {
    text-align: center;
  }
  td{
    padding:12px 5px;
  }
  th {
    padding:16px;
    font-size: .85em;
    letter-spacing: .1em;
    text-transform: uppercase;
  }
  @media screen and (max-width:480px) {
    border: 0;
    caption {
      font-size: 1.3em;
    }
    thead {
      border: none;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }
    tr {
      border-bottom: 3px solid #333;
      display: block;
      margin-bottom: .625em;
    }
    td {
      border-bottom: 1px solid #333;
      display: block;
      font-size: .8em;
      text-align: right;
    }
    td:before {
      /*
      * aria-label has no advantage, it won't be read inside a table
      content: attr(aria-label);
      */
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }
    td:last-child {
      border-bottom: 0;
    }
  }
}
```


## Wrapping it all up

You can now change the size of your table field to a max-size you want for your tables and give the content creator the simple instructions to leave a columns blank if he doesn't need it. The size will be dynamically calculated and your table will look good on mobile devices. You can offcourse customize the styling to your own needs.

The final component looks something like this. You can adjust the `tableSize` to your own max-size set in the CMS
```twig
{# Set the table size here #}
{% set tableSize = 12 %}

{# Create empty object #}
{% set emptyObject = [] %}

{% for i in 1..(tableSize -1) %}
 {% set labelName = 'label' ~ i %}
 {% set emptyObject = emptyObject|merge({(labelName): i}) %}
{% endfor %}

{% set width = 1 %}

<table class="responsive-table">
{% for row in entry.tableField %}
  {% if loop.index == 1%}
  <thead>
    <tr>
     <th scope="col">{{row.col1}}</th>
     {% for i in 2..(tableSize) %}
       {% set colName = "col" ~ i %}
       {% set colValue = attribute(row, colName) %}
       {% if colValue|length %}
         {% set width = i + 1 %}
         {% set labelName = 'label' ~ i %}
         {% set emptyObject = emptyObject|merge({(labelName): (colValue)}) %}
         <th scope="col">{{colValue}}</th>
      {% endif %}
     {% endfor %}
    </tr>
  </thead>
 <tbody>
  {% else %}
    <tr>	
    {% for i in 0..(tableSize - 1) %}
      {% if width > i %}
        {% set colName = "col" ~ (i + 1) %}
        {% set labelIndex = 'label' ~ (i + 1) %}
        <td data-label="{% if not loop.first %}{{attribute(emptyObject, labelIndex)}}{% endif %}">{{attribute(row, colName)}}</td>
      {% endif %}
    {% endfor %}
    </tr>
  {% endif %}
{% endfor %}
</tbody>
</table>
```