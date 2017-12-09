$(function(){
	var indexObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		init:function(){
			this.bindEvent();
			this.render();
			$('#foot ul li a').eq(3).addClass('current').parent().siblings().find('a').removeClass('current');
			$('.index_bot').eq(1).find("img").eq(0).show().siblings().hide();
			$('.index_bot').eq(2).find("img").eq(0).show().siblings().hide();
			$('.index_bot').eq(0).find("img").eq(0).show().siblings().hide();
			$('.index_bot').eq(3).find("img").eq(1).show().siblings().hide();
		},
		bindEvent:function(){
			
		},
		render:function(){
			var that=this;
			var user=localStorage.getItem('username');
			if(user){
				$('.loginPic').hide();
				$('.myAccount').show();
				
			}else{
				$('.loginPic').show();
				$('.myAccount').hide();
			}
				
		$.ajax({//获取个人信息
			type:"get",
			url:that.urlPath+"/SeR/SelfInfor",
			async:true,
			data:{
				id:localStorage.getItem('WP_id'),
				vastr:$.md5("!@#$"+localStorage.getItem('WP_id')+"*&^%")
			},
			success:function(res){
				
				var str=JSON.parse(res).data;
				var con='';
				var name='';
				if(str.name){
					name=str.name;
				}else{
					name='亲，您还没有昵称!'
				}
				if(JSON.parse(res).status==0){
					con='<div class="portrait l"><img src="'+str.avatar+'" alt="" title=""></div>'
						+'<a class="personalInfo l" href="pages/personalCenter.html" user_id="'+str.user_id+'" account="'+str.account+'" gender="'+str.gender+'" money="'+str.money+'" finalorder="'+str.finalorder+'" inwayorder="'+str.inwayorder+'" wait_comment_product="'+str.wait_comment_product+'" encoupn_count="'+str.encoupn_count+'" Score="'+str.Score+'" toSendCount="'+str.toSendCount+'" toPayCount="'+str.toPayCount+'" toReviceCount="'+str.toReviceCount+'" toEvaluation="'+str.toEvaluation+'" cancelOdrCount="'+str.cancelOdrCount+'" ExtFiled="'+str.ExtFiled+'" wxShopId="'+str.wxShopId+'">'
							+'<p class="nickname over">昵称：<i>'+name+'</i></p>'
							+'<p class="level">会员称号：<i>'+str.level+'</i></p>'
						+'</a>'
						+'<a class="r administration" href="pages/personalCenter.html">'
							+'<span>账户管理</span>'
							+'<i class="iconfont icon-gengduo"></i>'
						+'</a>'
						$('.myAccount').html(con);
						//我的订单数据
						$('.balance').html(str.money)
						$('.Coupon').html(str.encoupn_count)
						$('.integral').html(str.Score)
						localStorage.setItem("phone",str.mob)
						if(str.toSendCount==0){
							$('.borD').find('li').eq(1).find('span').hide();
						}else{
							$('.borD').find('li').eq(1).find('span').show();
							$('.borD').find('li').eq(1).find('span').html(str.toSendCount);
						}
						if(str.toPayCount==0){
							
							$('.borD').find('li').eq(0).find('span').hide();
						}else{$('.borD').find('li').eq(0).find('span').show();
							$('.borD').find('li').eq(0).find('span').html(str.toPayCount);
						}
						if(str.toReviceCount==0){
							
							$('.borD').find('li').eq(2).find('span').hide();
						}else{$('.borD').find('li').eq(2).find('span').show();
							$('.borD').find('li').eq(2).find('span').html(str.toReviceCount);
						}
						if(str.toEvaluation==0){
							
							$('.borD').find('li').eq(3).find('span').hide();
						}else{$('.borD').find('li').eq(3).find('span').show();
							$('.borD').find('li').eq(3).find('span').html(str.toEvaluation);
						}
				}else{
					alert(str.msg)
				}
			}
		});
		$.ajax({//获取我的足迹数量
			type:"get",
			url:that.urlPath+"/SeR/FootList",
			async:true,
			data:{
				userid:localStorage.getItem('id'),
				pagesize:999,
				pageindex:1
			},
			success:function(res){
				
				if(res.total_num){
					$('.footprint').find('.fooNum').html(res.total_num)
				}else{
					$('.footprint').find('.fooNum').html(0)
				}
				
			}
		})
		$.ajax({//获取我的收藏数量
			type:"get",
			url:that.urlPath+"/SeR/CollectionList",
			async:true,
			data:{
				userid:localStorage.getItem('id'),
				pagesize:999,
				pageindex:1
			},
			success:function(res){
				
				if(res.total_num){
					$('.collect').find('.colNum').html(res.total_num)
				}else{
					$('.collect').find('.colNum').html(0)
				}
				
			}
		})
		
		
		}
	}
	indexObj.init();
})