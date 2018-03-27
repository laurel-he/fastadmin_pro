$(function(){
    // $('.plays').click(function(){
    //     $(this).addClass('pause');
    //     $(this).addClass('icon-zanting');
    //     $(this).removeClass('plays');
    //     $(this).removeClass('icon-icon-');
    // });
    // $('.pause').click(function(){
    //     $(this).addClass('plays');
    //     $(this).removeClass('pause');
    //     $(this).addClass('icon-icon-');
    //     $(this).removeClass('icon-zanting');
    // });
});
//暂停播放
var i=0;//0播放1暂停
//触发播放事件
var audio=document.getElementById('ao');
audio.addEventListener("canplay", function()
    {
        var duration=audio.duration;
        $(".range").attr({'max':duration});
        $('.max').html(timeToStr(duration));
        $('.cur').text('00:00');
    }
);
function playOrPaused(obj){
   if(i==0){
       var duration=audio.duration;
       $(obj).addClass('icon-zanting');
       $(obj).removeClass('icon-icon-');
       $(".range").attr({'max':duration});
       $('.max').html(timeToStr(duration));
       audio.play();
       function timer(){
           var t=parseInt(Math.round(audio.currentTime));
           $(".range").val(t);
           $('.cur').text(timeToStr(t));
           t=parseInt(audio.currentTime);
           if(t<duration){
               var max=audio.duration;
               var now=audio.currentTime/max;
               var next=100-(now.toFixed(2)*100);
               $('.range').css('background-size',now.toFixed(2)*100+'% '+next+'%');
               setTimeout(timer, 1000);
           }else{
               clearTimeout(timer);
           }
       }
       timer();
       i++;
   }
   else{
       audio.pause();
       $(obj).addClass('icon-icon-');
       $(obj).removeClass('icon-zanting');
       i--;
   }
}
//将秒数转为00:00格式
function timeToStr(time) {
    var m = 0,
        s = 0,
        _m = '00',
        _s = '00';
    time = Math.floor(time % 3600);
    m = Math.floor(time / 60);
    s = Math.floor(time % 60);
    _s = s < 10 ? '0' + s : s + '';
    _m = m < 10 ? '0' + m : m + '';
    return _m + ":" + _s;
}
// $('.plays').on('click',function(){
//     var duration=audio.duration;
//     $(".range").attr({'max':duration});
//     $('.max').html(timeToStr(duration));
//     audio.play();
//     function timer(){
//         var t=parseInt(Math.round(audio.currentTime));
//         $(".range").val(t);
//         $('.cur').text(timeToStr(t));
//         t=parseInt(audio.currentTime);
//         if(t<duration){
//             setTimeout(timer, 1000);
//         }else{
//             clearTimeout(timer);
//         }
//     }
//     timer();
// });
// $('.pause').on('click', function(){
//     audio.pause();
// })
//监听滑块，可以拖动
$(".range").on('change',function(){
    audio.currentTime=this.value;
    $(".range").val(this.value);
    var max=audio.duration;
    var now=this.value/max;
    var next=100-(now.toFixed(2)*100);
    $('.range').css('background-size',now.toFixed(2)*100+'% '+next+'%');
});
