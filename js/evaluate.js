$(function(){
	var evaluateObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		init:function(){
			this.bindEvent();
		},
		bindEvent:function(){
			var that=this;
			var manyi=0;
			var index=0;
			var url=location.search.substring(1,999).split("?");//console.log(url1[0])
			var url1=url[0];//普通商品
			var url2=url[1];//状态
			$('.goback').on('click',function(){
				window.history.back()
			});
			//满意图标’
			$('.smileP').on("click",function(){
				manyi=$(this).index();
				$(this).siblings().find('.evaL').removeClass("evaHide").siblings().addClass("evaHide");
				$(this).siblings().find('span').removeClass("smiColor");
				$(this).find(".evaR").removeClass("evaHide").siblings().addClass("evaHide");
				$(this).find('span').addClass("smiColor");
			})
			//评价星星
			$('.evaDes h2').on("click",function(){
				$('.evaDes img').attr("src","../img/bt_star_a.png")
			})
			$('.evaDes img').on("click",function(){
				
				$('.evaDes img').attr("src","../img/bt_star_a.png")
				index=$(this).index();
				for(var i=0;i<index+1;i++){
					$('.evaDes img').eq(i).attr("src","../img/m_star_b.png")
				}
			})
			//发表评价
			$('.pubEva h2').on("click",function(){
				if($('.evaluateT textarea').val()==""){
					alert("亲,您还没有添加内容")
				}else{
					$.ajax({
						type:"post",
						url:that.urlPath+"/SeR/AddGoodsComment",
						async:true,
						data:{
							order_id:url1,
							user_id:localStorage.getItem("WP_id"),
							product_id:url2,
							type:manyi+1,
							content:$('.evaluateT textarea').val(),
							star:index+1,
							img_data:''
						},
						dataType:"json",
						success:function(res){
							if(res.status==0){
								alert(res.msg);
								window.location.href="myOrder.html";
							}else{
								alert(res.msg)
							}
						}
					});
				}
			})
			
		}
	};
	evaluateObj.init();
})