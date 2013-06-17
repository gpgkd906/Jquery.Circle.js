$(function(){
    $("#circle").circle();

    $("#circle2").circle({
        direct : -1,
	delay : 1
    }); 

    $("#circle3").circle({
        animate : "feather",
        range : 480,
        dip : 40,
        delay : 1,
        open : function() {
            alert("opened!!");
        },
        close : function() {
            alert("closed!!!");
        }
    });

    $("#circle4").circle({
	duration : 0,
        animate : "panel"
    });

})