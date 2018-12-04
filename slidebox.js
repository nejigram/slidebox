$(function(){

    var click = window.ontouchstart===null?"touchstart":"click";

    var nowctar = {};

    var moveflg = true;

    $("[id^=slidebox_]").each(function(){
        $(this).find(".parts").width($(this).width());
        btnline($(this).find(".parts").length,$(this).find(".btnline"),0);
        nowctar[$(this).attr("id")] = 0;
    });

    $("[id^=slidebox_] .prev").on(click,function(){
        if(!moveflg){
            return false;
        }
        moveflg = false;

        var slideid = $(this).parent().attr("id");
        var nowleft = parseInt($(this).next(".line").css("left").replace("px",""));
        var moveleft = parseInt($(this).parent().width());

        $("#" + slideid).find(".parts").eq($("#" + slideid).find(".parts").length - 1).insertBefore($("#" + slideid).find(".parts").eq(0));
        $(this).next(".line").css("left",0 - moveleft);

        nowctar[slideid]--;
        if(nowctar[slideid] < 0){
            nowctar[slideid] = $("#" + slideid).find(".parts").length - 1;
        }
        $(this).next(".line").animate({left:0},300,function(){
            btnline($("#" + slideid).find(".parts").length,$("#" + slideid).find(".btnline"),nowctar[slideid]);

            moveflg = true;
        });
    });
    $("[id^=slidebox_] .next").on(click,function(){
        if(!moveflg){
            return false;
        }
        moveflg = false;

        var slideid = $(this).parent().attr("id");
        var nowleft = parseInt($(this).prev(".line").css("left").replace("px",""));
        var moveleft = parseInt($(this).parent().width());

        $(this).prev(".line").css("left",0);

        nowctar[slideid]++;
        if(nowctar[slideid] > $("#" + slideid).find(".parts").length - 1){
            nowctar[slideid] = 0;
        }

        $(this).prev(".line").animate({left:-moveleft},300,function(){

            $("#" + slideid).find(".line").css("left",0);
            $("#" + slideid).find(".parts").eq(0).insertAfter($("#" + slideid).find(".parts").eq($("#" + slideid).find(".parts").length - 1));

            btnline($("#" + slideid).find(".parts").length,$("#" + slideid).find(".btnline"),nowctar[slideid]);

            moveflg = true;
        });

    });

    function btnline(num,data,nowct){
        data.html("");
        for(var i = 0;i < num;i++){
            if(nowct == i){
                data.append("<span class='btn col_bk'>●</span>");
            }else{
                data.append("<span class='btn col_bk'>○</span>");
            }
        }
    }

});
