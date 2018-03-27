var re='';
$(function(){
    mui.init({
        swipeBack:true //启用右滑关闭功能
    });
    var slider = mui("#slider");
    slider.slider({
        interval: 5000
    });
    //底部导航选择
    $('.big-button').click(function(){
        $(this).siblings().removeClass('action');
        $(this).addClass('action');
    });
    //换一批功能
    $('.change-btn').on('touchstart',function(){
        var my=$(this);
        var index=my.attr('value');
        var page=my.attr('page');
        page++;
        var r=pag(page,index);
        console.log(r);
        if(r==''){
            pag(1,index);
        }
    });
});
function pag(page,index){
    $.ajax({
        url:'index',
        type:'post',
        async:false,
        dataType:'json',
        data:{'page':page,'type':index},
        success:function(e){
            // console.log(e);
            if(e.length!=0){
                if(index==0){
                    $('.sug-card').html('');
                    var res='';
                    $.each(e,function(k,va){
                        res+='<div>'+
                                '<div class="mui-card">'+
                                        '<a href="/index/money/details?id='+va.id+'"><div class="mui-card-header mui-card-media" style="height: 150px;background-image:url('+va.fronimage+')"></div></a>'+
                                        '<div class="smal-avatar">'+
                                            '<img class="img-avatar" src="'+va.avatar+'" alt="">'+
                                            '<span class="sug-te">'+va.teach+'</span>'+
                                        '</div>'+
                                    '<a href="/index/money/details?id='+va.id+'"><p class="sug-title">'+va.name+'</p></a>'+
                                    '<p>'+va.hits+'次学习</p>'+
                                '</div>'+
                            '</div>';
                    });
                    $('.sug-card').append(res);
                }
                else{
                    $('.free').remove();
                    var res='';
                    $.each(e,function(k,val){
                        res+='<div style="padding: 2px 10px;" class="free">'+
                                '<div class="mui-row set_list">'+
                                    '<div class="mui-col-xs-5">'+
                                        '<a href="/index/money/details?id='+val.id+'"><img src="'+val.fronimage+'" alt="" ></a>'+
                                    '</div>'+
                                    '<div class="mui-col-xs-7 mui-row " style="padding-left: 10px;font-size: 16px;">'+
                                        '<div class="mui-col-xs-12" style="height: 60px;">'+
                                            '<a href="/index/money/details?id='+val.id+'"><p class="content_p">'+val.name+'</p></a>'+
                                            '<span class="font1">'+val.teach+' |</span>&nbsp<span class="font1">共'+val.num+'节课</span>'+
                                        '</div>'+
                                        '<div class="mui-col-xs-6 content_div" >'+
                                            '<span  class="font2">'+val.hits+'次学习</span>'+
                                        '</div>'+
                                        '<div class="mui-col-xs-6 content_div" style="text-align: right;">'+
                                            '<span class="font2"><s>'+val.old+'</s></span>'+
                                            '<span class="font2" style="color: red">￥'+val.now+'</span>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';
                    });
                    $('#free').after(res);
                }
                $('button[value="'+index+'"]').attr('page',page);
                re=1;
            }
            else{
                re='';
            }
        }
    });
    return re;
}