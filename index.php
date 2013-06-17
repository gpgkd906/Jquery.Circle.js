<?php 

$lang = explode(",",$_SERVER["HTTP_ACCEPT_LANGUAGE"]);

if ($lang[0] === "ja-JP") {
  require "ja.html";
} else {
  require "zh.html";
}