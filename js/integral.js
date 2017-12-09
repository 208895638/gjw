$(function(){
	var integralObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		init:function(){
			this.bindEvent();
			this.render();
		},
		bindEvent:function(){
			$('.goback').on('click',function(){
				window.history.back()
			});
			$('.integralTab').find('li').on("click",function(){
				var i=$(this).index();
				$(this).addClass('integralTabColor').siblings().removeClass('integralTabColor');
				$('.integralTabCon').find('ul').eq(i).removeClass('integralTabHide11').siblings().addClass('integralTabHide11')
			})
		},
		render:function(){
			var that=this;
			$.ajax({//获取剩余积分
				type:"get",
				url:that.urlPath+"/SeR/GetUserScore",
				async:true,
				data:{
					user_id:localStorage.getItem('WP_id'),
					state:0,
					type:0,
					currentPage:0,
					pageSize:999
				},
				success:function(res){
					console.log(res,typeof(res))
					var str=JSON.parse(res).data;
					var con=0;
					con=str.CanUseScore;
					$('.integralContent').find('h2').find('span').html(con)
				}
			});
			$.ajax({ //获取收入
				type:"get",
				url:that.urlPath+"/SER/GetAmt",
				async:true,
				data:{
					user_id:localStorage.getItem('WP_id'),
					type:0,
					currentPage:1,
					pageSize:999,
					state:0
				},
				success:function(res){
					console.log(res,typeof(res))
					var str=JSON.parse(res).data;
					var con='';
					if(JSON.parse(res).status==0){
						for(var i=0;i<str.length;i++){
							con+='<li class="clearfix fontAll">'
									+'<span class="l">'
										+'<h1 style="width:100%;" class="over">'+str[i].explain+'</h1>'
										+'<h4 style="width:100%;" class="over">'+str[i].AddTime+'</h4>'
									+'</span>'
									+'<em class="l"> + '+str[i].Score+'</em>'
								+'</li>'
						}
						$('.integralTabCon').find('ul').eq(0).html(con)
					}
				}
			});
			$.ajax({ //获取支出
				type:"get",
				url:that.urlPath+"/SER/GetAmt",
				async:true,
				data:{
					user_id:localStorage.getItem('WP_id'),
					type:1,
					currentPage:1,
					pageSize:999,
					state:0
				},
				success:function(res){
					console.log(res,typeof(res))
					var str=JSON.parse(res).data;
					var con='';
					if(JSON.parse(res).status==0){
						for(var i=0;i<str.length;i++){
							con+='<li class="clearfix fontAll">'
									+'<span class="l">'
										+'<h1 style="width:100%;" class="over">'+str[i].explain+'</h1>'
										+'<h4 style="width:100%;" class="over">'+str[i].AddTime+'</h4>'
									+'</span>'
									+'<em class="l">-  '+str[i].Score+'</em>'
								+'</li>'
						}
						$('.integralTabCon').find('ul').eq(1).html(con)
					}
				}
			});
		}
	};
	integralObj.init();
})