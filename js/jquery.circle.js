/**
 *
 *   Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 *   author: chenhan,gpgkd906@gmail.com
 */

(function($) {
    "use strict";
    $.fn.circle = (function() {    
        return function(s) {
            var env, box, size, in_process = false, status = "close",
            targets = [], home = {},
            preconfig = {
                main : {
                    width : 64
                },
                item : [],
                dip : -15,
                radius : 50,
                easing : "linear",
                duration : 100,
                range : 360,
                open : function() {},
                close : function() {},
                animate : "circle",
                zIndex : 0,
                delay : 0,
                corner : true,
                direct : 1,
                cursor : "pointer",
                reveser : true
	    },
            animation = (function() {
                var offset, dip, rad, locations = [], delay, from, end;
                return {
                    circle : function(size) {
                        var j;
                        if (locations.length === 0) {
                            offset = env.range / size * env.direct;
                            dip = env.dip + 180 - offset;
                            rad = Math.PI / 180;
                            for (j = 0; j <= size; j += 1) {
                                locations[locations.length] = {
                                    top : (env.main.square + Math.sin(dip * rad) * (env.radius + env.main.square)) + "px",
                                    left : (env.main.square - Math.cos(dip * rad) * (env.radius + env.main.square)) + "px"
                                };
                                dip += offset;
                            }
                        }
                        return locations;
                    },
                    panel : function(size) {
                        var j;
                        if (locations.length === 0) {
                            for (j = 0; j <= size; j += 1) {
                                locations[locations.length] = {
                                    top : - 1 * env.direct * (j * env.main.half + env.main.square) + env.main.square + "px",
                                    left : "0px"
                                }
                            }
                        }
                        return locations;
                    },
                    feather : function(size) {
                        var j;
                        if (locations.length === 0) {
                            offset = env.range / size * env.direct;
                            dip = env.dip + 180 - offset;
                            rad = Math.PI / 180;
                            for (j = 0; j <= size; j += 1) {
                                locations[locations.length] = {
                                    top : (env.main.square + Math.sin(dip * rad) * (env.radius)) * Math.pow(1 + j/40, 5) + "px",
                                    left : (env.main.square - Math.cos(dip * rad) * (env.radius)) * Math.pow(1 + j/40, 5) + "px"
                                };
                                dip += offset;                                
                            }
                        }
                        return locations;
                    },
                    chaos : function(size) {
                        var j, direct_x, direct_y;
                        for (j = 0; j <= size; j += 1) {
                            direct_x = Math.random() > 0.5 ? 1 : -1;
                            direct_y = Math.random() > 0.5 ? 1 : -1;                            
                            locations[locations.length] = {
                                top : direct_x * (env.radius + env.main.square * Math.random() * j) + "px",
                                left : direct_y * (env.radius + env.main.square * Math.random() * j) + "px"
                            };
                            dip += offset;                                
                        }
                        return locations;                        
                    }
                }
            })(),
            action = (function() {
                var locations = [], delay, from, end, locate;
                return {
                    open : function(i, targets, callback) {
                        if (typeof env.animate === "function" ){
                            locate = env.animate;
                        }
                        else if (typeof env.animate === "string" && typeof animation[env.animate] === "function" ){
                            locate = animation[env.animate];
                        }
                        else {
                            return false;
                        }
                        locations = locate(size);
                        from = $.extend(true, {}, { opacity : 0, display : "block" }, locations[i]);
                        end = $.extend(true, {}, { opacity : 1 }, locations[i + 1]);
                        delay = (env.duration / 3) * env.delay;
                        targets[i].css(from).delay(delay * i).animate(end, env.duration, env.easing, function() {
                            callback(i);
                        });
                    },
                    close : function(i, targets, callback) {
                        var local_delay;
                        targets[i].css("zIndex", env.zIndex - 1);
                        targets[i].delay(delay * i * 2).animate(home, env.duration, env.easing, function() {
                            $(this).css("display", "none");
                            callback(i);
                        });
                    },
                    reveser_close : function(i, targets, callback) {
                        if (typeof env.animate === "function" ){
                            locate = env.animate;
                        }
                        else if (typeof env.animate === "string" && typeof animation[env.animate] === "function" ){
                            locate = animation[env.animate];
                        }
                        else {
                            return false;
                        }
                        locations = locate(size);
                        from = $.extend(true, {}, { opacity : 1 }, locations[i + 1]);
                        end = $.extend(true, {}, { opacity : 0, display : "block" }, locations[i]);
                        delay = (env.duration / 3) * env.delay;
                        targets[i].css(from).delay(delay * (size - i)).animate(end, env.duration, env.easing, function() {
                            callback(i);
                        });
                    }
                };
            })(),
            click_main = function() {
                if (in_process) {
                    return false;
                }
                in_process = true;
                var i, close = action.close;
                switch (status) {
                case "close":
                    for (i = 0; i < targets.length; i += 1) {
                        action.open(i, targets, function(j) {
                            if (j + 1 === i) {
                                in_process = false;
                                status = "open";
                                env.open.call(targets[j]);
                            }
                        });
                    }
                    break;
                case "open":
                    if (env.reveser) { close = action.reveser_close }
                    for (i = 0; i < targets.length; i += 1) {
                        close(i, targets, function(j) {
                            if (j === 0) {
                                in_process = false;
                                status = "close";
                                env.close.call(this);
                            }
                        });
                    }
                    break;
                }
            },
            init = function(elem) {
                box = $(elem);
                var main = box.find(".main"), item = box.find(".menu"), img = main.find("img"), item_style, i, url, img_file, current, a;
                box.css("position","absolute");
                main.css({
                    position : "absolute",
                    cursor : env.cursor
                });
                env.main.half = env.main.width / 2;
                env.main.square = env.main.half / 2;
                img.css({
                    "width" : env.main.width + "px",
                    "border-radius" : env.main.half + "px"
                });
                size = item.length + env.item.length;
                item_style = {
                    "display" : "none",
                    "position" : "absolute",
                    "top" : env.main.square + "px",
                    "left" : env.main.square + "px",
                    "width" : env.main.half + "px",
		    "max-width" : "none"
                };
                if (env.corner) {
                    item_style["border-radius"] = env.main.half / 2 + "px";
                }
                home = {
                    zIndex : env.zIndex,
                    opacity : 0,
                    top : env.main.square + "px",
                    left : env.main.square + "px"
                };
                item.each(function() {
                    var img = $(this).find("img");
                    img.css(item_style);
                    targets[targets.length] = img;
                });
                if (env.item.length > 0) {
                    for (i = 0; i < env.item.length; i += 1) {
                        current = env.item[i];
                        url = current.hasOwnProperty("url") ? current.url : "";
                        img_file = current.hasOwnProperty("img_file") ? current.img_file : "";
                        a = $("<a class='item' href=" + url + "><img src=" + img_file + " ></a>");
                        a.find("img").css(item_style);
                        if (current.hasOwnProperty("onclick") && typeof current.onclick === "function") {
                            a.click(function() {
                                current.onclick
                            });
                        }
                        box.append(a);
                        targets[targets.length] = a.find("img");
                    }
                }
                main.click(click_main);
            };
	    env = $.extend(true, {}, preconfig, s);
            env.direct = env.direct > 0 ? 1 : -1;
            init(this);
        };
    })();
})(jQuery);