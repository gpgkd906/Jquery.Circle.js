$(function(){
    $("#circle").circle();

    $("#circle2").circle({
        direct : -1,
	    delay : 1,
        item : [
            {
                url : "",
                img_file : "img/search.png",
                mouseover : function(){
                    alert("here we got the mouseover event");
                }
            }
        ]
    }); 

    $("#circle3").circle({
        animate : "feather",
        range : 270,
        dip : 40,
        delay : 1,
        open : function() {
            alert("this is a open function");
        },
        close : function() {
            alert("this is a close function");
        }
    });

    $("#circle4").circle({
	duration : 0,
        animate : "panel"
    });

})