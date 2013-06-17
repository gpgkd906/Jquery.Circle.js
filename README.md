# Circle

## About ##

Circle is a Javascript global-menu library for jQuery.  
Read more at the website: <http://root.gpgkd906.com/circle/>

## Installation ##

Just include the Javascript file after you've included jQuery.

You need at least jQuery 1.4.2, but use the latest jQuery to get better performance

## Basic usage ##

first make the global menu just as no style.
just make sure that you get the .main and .menu in html.
```html
<div id="circle">
  <a class="main"><img src="img/main.png" ></a>
  <a class="menu" href=""><img src="img/home.png" ></a>
  <a class="menu" href=""><img src="img/profile.png" ></a>
  <a class="menu" href=""><img src="img/schedule.png" ></a>
  <a class="menu" href=""><img src="img/group.png" ></a>
  <a class="menu" href=""><img src="img/add.png" ></a>
  <a class="menu" href=""><img src="img/search.png" ></a>
  <a class="menu" href=""><img src="img/config.png" ></a>
  <a class="menu" href=""><img src="img/add.png" ></a>
</div>
```

```js
$("#circle").circle(option);
```
the option is unnecessary,but you can customize it to make new action.
