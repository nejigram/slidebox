$(function(){

    var click = window.ontouchstart===null?"touchstart":"click";

    var nowctar = {};

    var moveflg = true;

    $("[id^=slidebox_]").each(function(){
        $(this).find(".defbox").find(".parts").width($(this).find(".defbox").width());
        btnline($(this).find(".defbox").find(".parts").length,$(this).find(".btnline"),0);
        nowctar[$(this).attr("id")] = 0;
    });

    $("[id^=slidebox_] .prev").on(click,function(){
        slide_prev(this);
    });

    $("[id^=slidebox_] .next").on(click,function(){
        slide_next(this);
    });

    function btnline(num,data,nowct){
        data.html("");
        for(var i = 0;i < num;i++){
            if(nowct == i){
                data.append('<img src="https://www.nejigram.com/assets/img/icon/maru_ylw.png">');
            }else{
                data.append('<img src="https://www.nejigram.com/assets/img/icon/maru_gry.png">');
            }
        }
    }

    $('#slidebox_1 .defbox,#slidebox_2 .defbox,#slidebox_3 .defbox,#slidebox_4 .defbox,#slidebox_5 .defbox').on('touchstart', onTouchStart); //指が触れたか検知
    $('#slidebox_1 .defbox,#slidebox_2 .defbox,#slidebox_3 .defbox,#slidebox_4 .defbox,#slidebox_5 .defbox').on('touchmove', onTouchMove); //指が動いたか検知
    $('#slidebox_1 .defbox,#slidebox_2 .defbox,#slidebox_3 .defbox,#slidebox_4 .defbox,#slidebox_5 .defbox').on('touchend', onTouchEnd); //指が離れたか検知
    var direction, position;

    //スワイプ開始時の横方向の座標を格納
    function onTouchStart(event) {
        no_scroll();
      position = getPosition(event);
      direction = ''; //一度リセットする
    }

    //スワイプの方向（left／right）を取得
    function onTouchMove(event) {
      if (position - getPosition(event) > 70) { // 70px以上移動しなければスワイプと判断しない
        direction = 'left'; //左と検知
      } else if (position - getPosition(event) < -70){  // 70px以上移動しなければスワイプと判断しない
        direction = 'right'; //右と検知
      }
    }

    function onTouchEnd(event) {
      if (direction == 'right'){
          slide_prev($(event.currentTarget).prev(".prev"));
      } else if (direction == 'left'){
          slide_next($(event.currentTarget).next(".next"));
      }else{
          return_scroll();
      }
    }

    //横方向の座標を取得
    function getPosition(event) {
      return event.originalEvent.touches[0].pageX;
    }

    function slide_prev(data){
        if(!moveflg){
            return false;
        }
        moveflg = false;

        var slideid = $(data).parent().attr("id");
        var nowleft = parseInt($(data).next(".defbox").find(".line").css("left").replace("px",""));
        var moveleft = parseInt($(data).next(".defbox").width());

        $("#" + slideid).find(".parts").eq($("#" + slideid).find(".parts").length - 1).insertBefore($("#" + slideid).find(".parts").eq(0));
        $(data).next(".defbox").find(".line").css("left",0 - moveleft);

        nowctar[slideid]--;
        if(nowctar[slideid] < 0){
            nowctar[slideid] = $("#" + slideid).find(".parts").length - 1;
        }
        $(data).next(".defbox").find(".line").animate({left:0},300,function(){
            btnline($("#" + slideid).find(".parts").length,$("#" + slideid).find(".btnline"),nowctar[slideid]);

            moveflg = true;
            return_scroll();
        });
    }
    function slide_next(data){
        if(!moveflg){
            return false;
        }
        moveflg = false;

        var slideid = $(data).parent().attr("id");
        var nowleft = parseInt($(data).prev(".defbox").find(".line").css("left").replace("px",""));
        var moveleft = parseInt($(data).prev(".defbox").width());

        $(data).prev(".defbox").find(".line").css("left",0);

        nowctar[slideid]++;
        if(nowctar[slideid] > $("#" + slideid).find(".parts").length - 1){
            nowctar[slideid] = 0;
        }

        $(data).prev(".defbox").find(".line").animate({left:-moveleft},300,function(){

            $("#" + slideid).find(".line").css("left",0);

            $("#" + slideid).find(".parts").eq(0).insertAfter($("#" + slideid).find(".parts").eq($("#" + slideid).find(".parts").length - 1));

            btnline($("#" + slideid).find(".parts").length,$("#" + slideid).find(".btnline"),nowctar[slideid]);

            moveflg = true;
            return_scroll();
        });


    }

});
    //スクロール禁止用関数
function no_scroll(){
    //PC用
    var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    $(document).on(scroll_event,function(e){e.preventDefault();});
    //SP用
    $(document).on('touchmove.noScroll', function(e) {e.preventDefault();});
}

//スクロール復活用関数
function return_scroll(){
    //PC用
    var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
    $(document).off(scroll_event);
    //SP用
    $(document).off('.noScroll');
}
