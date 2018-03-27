// 加入学习
$('footer[value="0"]').on('touchstart',function(){
	var val=$(this).attr('value');
	if(val==0){
		$('#pay').show();
		$('.sure').show();
		var price=$('.price-now span').eq(1).text();
		var sale=$('#price').val().slice(2,6);
		price=parseFloat(price);
		sale=parseFloat(sale);
		var pay=price-sale;
		// console.log(pay);
		$('#should').text('￥'+pay);
		$('#pa').text(pay);
		// console.log(jQuery.type(price));
	}
});
// 支付
$('.pay-way').on('touchstart',function(){
	$('#pay-sure').show();
	$('.sure').hide();
	$('footer').attr('value',1);
	$('footer .mui-row div').text('已加入学习');
});
//关闭提示窗
$('#pay-sure p').on('touchstart',function(){
	$('#pay').hide();
	$('#pay-sure').hide();
});
// 关闭支付窗
$('.cancel').on('touchstart',function(){
	$('#pay').hide();
});
// 导航
$('.nav li').on('touchstart',function(){
	var index=$(this).parent().index();
	$('.nav li').removeClass('action');
	$('.nav').each(function(k,v){
		$(v).find('.mui-row div').eq(index).find('li').addClass('action');
	});
	switch(index){
		case 0:$('.class').show();$('.comment').hide();$('.catalog').hide();
		break;
		case 1:$('.class').hide();$('.comment').hide();$('.catalog').show();
		break;
		case 2:$('.class').hide();$('.comment').show();$('.catalog').hide();
		break;
	}
});
// 滑动滚动条
$(window).scroll(function(){
	// 滚动条距离顶部的距离 大于 200px时
	if($(window).scrollTop() >= 249){
		$(".roll").show(); // 开始淡入
	} else{
		$(".roll").hide();
	}
});
function Subtr(arg1,arg2){
    var r1,r2,m,n;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
//last modify by deeka
//动态控制精度长度
    n=(r1>=r2)?r1:r2;
    return ((arg1*m-arg2*m)/m).toFixed(n);
}
//支付价格
$('#price').change(function(){
	var price=$('.price-now span').eq(1).text();
	var sale=$('#price').val().slice(2,6);
	price=parseFloat(price);
	sale=parseFloat(sale);
	// console.log(Subtr(price,sale));

	var pay=Subtr(price,sale);
	// console.log(pay);
	// console.log(sale);
	// console.log(price);
	$('#should').text('￥'+pay);
	$('#pa').text(pay);
});
 //加载更多
    $('.more').click(function(){
    	var $this=$(this);
        var page=$this.attr('page');
        var type=$this.attr('value');
        var kind=$this.attr('kind');
        page++;
        $.ajax({
            url:'details',
            type:'post',
            dataType:'json',
            data:{'page':page,'type':type,'kind':kind},
            success:function(e){
                // console.log(e);return;
                var r='';
                if(e.length!=0){
                	if(kind==0){
                		$.each(e,function(k,v){
	                        r+='<div class="mui-content cat-list">'+
	                        	'<div class="mui-row">'+
								        '<div class="mui-col-xs-4">'+
								           '<img class="cat-img" src="'+v.baimage+'">'+
								        '</div>'+
								        '<div class="mui-col-xs-6">'+
								            '<p>'+v.name+'</p>'+
								            '<p>'+
								            	'<span>'+v.learntimes+'</span><span>次学习</span>'+
								            '</p>'+
								            '<p>'+
								            	'<span>'+v.creat_time+'</span>'+
								            '</p>'+
								        '</div>'+
								        '<div class="mui-col-xs-2">'+		        			            
								            '<i class="iconfont icon-iconset0114"></i>'+		        	
								        '</div>'+
							    	'</div>'+
								'</div>';
	                    });
                	}
                	else{
                		$.each(e,function(k,va){
	                        r+='<div class="mui-content">'+
									'<div class="mui-row">'+
								        '<div class="mui-col-xs-3 c-img">'+
								           '<img src="'+va.name.avatar+'" alt="">'+
								        '</div>'+
								        '<div class="mui-col-xs-9">'+
								            '<p>'+va.name.name+'</p>'+
								            '<p>'+
								            	'<span>'+va.create_time+'</span>'+
								            '</p>'+
								            '<p>'+va.cont+'</p>'+		           
								        '</div>'+		     
							    	'</div>'+
								'</div>';
	                    });
                	}                
                    // console.log(r);return;
                    $this.before(r);
                    $this.attr('page',page);
                }
                else{
                    layer.msg('已加载全部');
                    $this.hide();
                }
            }
        });
    });
