$(function(){
	var myOrderObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		loadNumAll:1,
		loadNumPay:1,
		loadNumFahuo:1,
		loadNumShouhuo:1,
		loadNumPingjia:1,
		flag:0,
		state:0,
		init:function(){
			this.bindEvent();
//			this.loadAll();
//			this.loadPay();
//			this.loadFahuo();
//			this.loadShouhuo();
//			this.loadPingjia();
		},
		bindEvent:function(){
			var that=this;
			this.state=Number(location.search.substring(1,2));
			this.selectLoad(this.state);
			this.srcollLoad(this.state);
			$('.myOrderContentTop').find('p').eq(that.state).addClass("myOrderContentShow").siblings().removeClass("myOrderContentShow");
			$('.myOrderContentBottom').find('div').eq(that.state).removeClass('myOrderOff').siblings().addClass('myOrderOff');
			$('.goback').on('click',function(){
				window.history.back()
			});
			$('.myOrderContentTop').find('p').on('click',function(){
				$(this).addClass("myOrderContentShow").siblings().removeClass("myOrderContentShow");
				var index=$(this).index();
				$('.myOrderContentBottom').find('div').eq(index).removeClass('myOrderOff').siblings().addClass('myOrderOff');
				that.state=$(this).attr('state');
				if($('.myOrderContentBottom').children().eq(that.state).children().length==0){
					that.selectLoad(that.state);
					console.log(that.state);
				};
			});
			$('.myOrderContentBottom ').on('click','.fnBtn',function(){
				if($(this).text()=='确认收货'){
					var r=confirm("确定收到该商品");
					var me=$(this);
					if (r==true){
					  $.ajax({
					  	type:"get",
						url:that.urlPath+"/SER/ReceiptHuo",
						async:true,
						data:{
							userid:localStorage.getItem('WP_id'),
							order_id:$(this).parents('ul').attr('order_id'),
							orderno:$(this).parents('ul').attr('order_number')
						},
						success:function(res){
							console.log(res)
							me.parent().parent().remove();
						}
					  })
					}
				}else if($(this).text()=='删除订单'){
					var r=confirm("确定删除该订单");
					var me=$(this);
					console.log($(this).parents('ul').attr('order_id'),$(this).parents('ul').attr('order_number'));
					if (r==true){
					  $.ajax({
					  	type:"get",
						url:that.urlPath+"/SER/DelOrder",
						async:true,
						data:{
							user_id:localStorage.getItem('WP_id'),
							order_id:$(this).parents('ul').attr('order_id')
						},
						success:function(res){
							console.log(res)
							me.parent().parent().remove();
						}
					  })
					}
				}else if($(this).text()=='查看详情'){
					window.location.href="orderInformation.html?"+$(this).parents('ul').attr('order_id')+'?'+$(this).parents('ul').attr('pay_type');
				}
			})
		},
		selectLoad:function(num){
			var that=this;
			num=parseInt(num);
			switch(num){
				case 0:
				that.loadAll();
				break;
				case 1:
				that.loadPay();
				break;
				case 2:
				that.loadFahuo();
				break;
				case 3:
				that.loadShouhuo();
				break;
				case 4:
				that.loadPingjia();
				break;
			}
		},
		isEmpty:function(index){
			if($('.myOrderContentBottom').children().eq(index).children().length==0){
				$('.myOrderContentBottom').hide();
				$('.myOrderEmptyPage').show();
			}else{
				$('.myOrderContentBottom').show();
				$('.myOrderEmptyPage').hide();
			};
		},
		srcollLoad:function(param){
			var that=this;
			$('.myOrderContentBottom').scroll(function(){
				var scrollTop = $(this).scrollTop();
				console.log(scrollTop,$(this).height(),$('.mAll').height());
		       if (scrollTop+$(this).height()>=$('.mAll').height()&&that.state==0){
		        	if(that.flag==0){
		        		that.flag=1;
		        		$('.wait').show();
						that.loadAll();
						return;
		        	}
		       };
		    	if (scrollTop+$(this).height()>=$('.mPay').height()&&that.state==1){
		        	if(that.flag==0){
		        		that.flag=1;
		        		$('.wait').show();
						that.loadPay();
						return;
		        	}
		       };
		       if (scrollTop+$(this).height()>=$('.mFahuo').height()&&that.state==2){
		        	if(that.flag==0){
		        		that.flag=1;
		        		$('.wait').show();
						that.loadFahuo();
						return;
		        	}
		       };
		       if (scrollTop+$(this).height()>=$('.mShouhuo').height()&&that.state==3){
		        	if(that.flag==0){
		        		that.flag=1;
		        		$('.wait').show();
						that.loadShouhuo();
						return;
		        	}
		       };
		       if (scrollTop+$(this).height()>=$('.mPingjia').height()&&that.state==4){
		        	if(that.flag==0){
		        		that.flag=1;
		        		$('.wait').show();
						that.loadPingjia();
						return;
		        	}
		       };
			})
		},
		dealTime:function(param){
			param=param.split('.')[0];
			return param.replace(/T/," ");
		},
		loadAll:function(){
			var that=this;
			//获取全部商品订单
			console.log(that.loadNumAll);
			$.ajax({
				type:"get",
				url:that.urlPath+"/SER/PaybillList",
				async:true,
				data:{
					userid:localStorage.getItem('WP_id'),
					state:-1,
					pagesize:6,
					pageindex:that.loadNumAll
				},
				success:function(res){
					var str=JSON.parse(res).data;
					var con='';
					var info='';
					var data='';
					var top='';
					var bot='';
					var num=0;
					for(var i=0;i<str.length;i++){
						top=that.processFilter(str[i]);
						bot=that.payFilter(str[i]);
						for(var j=0;j<str[i].order_items.length;j++){
							num+=JSON.parse(str[i].order_items[j].quantity)
						info+='<a href="orderInformation.html?'+str[i].order_id+"?"+str[i].pay_type+'" class="clearfix">'									
								+'<h1 class="l">'
								+'<img src="'+str[i].order_items[j].product_img+'" alt="" />'
								+'</h1>'
								+'<h2 class="l fontAll">'
								+str[i].order_items[j].product_name
								+'</h2>'
								+'<h3 class="l">'
								+'<p>'
								+'¥<b>'+str[i].order_items[j].money+'</b>'
								+'</p>'
								+'<p><b>x</b><i>'+str[i].order_items[j].quantity+'</i></p>'
								+'</h3>'											
								+'</a>'
						}
						con+='<ul order_id="'+str[i].order_id+'" pay_type="'+str[i].pay_type+'" order_number="'+str[i].order_number+'" Score="'+str[i].Score+'" combination_fee="'+str[i].combination_fee+'" ecoupon_fee="'+str[i].ecoupon_fee+'" balance_fee="'+str[i].balance_fee+'">'
							+'<li class="clearfix mPT">'
							+'<span class="l fontAll">'
							+that.dealTime(str[i].order_date)
							+'</span>'
							+'<em class="r fontAll">'
							+top
							+'</em>'
							+'</li>'
							+'<li class="clearfix mPC">'
							+info
							+'</li>'
							+'<li class="fontAll mPCC">'
							+'共<span>'+num+'</span>件商品，实付金额：<b>¥</b><em>'+str[i].total_money+'</em>'
							+'</li>'
							+'<li class="mPB">'
							+'<a class="fontAll fnBtn">'+bot+'</a>'
							+'</li>'
							+'</ul>'
						num=0;
						info='';
					}
					$('.mAll').append(con);
					if(that.loadNumAll==1&&that.state==0){
						that.isEmpty(that.state);
					};
					that.loadNumAll++;
					$('.wait').hide();
					that.flag=0;
				}
			});
		},
		loadPay:function(){
			var that=this;//获取待付款
			$.ajax({
					type:"get",
					url:that.urlPath+"/SER/PaybillList",
					async:true,
					data:{
						userid:localStorage.getItem('WP_id'),
						state:0,
						pagesize:6,
						pageindex:that.loadNumPay
					},
					success:function(res){
						var str=JSON.parse(res).data;
						var con='';
						var info='';
						var data='';
						var top='';
						var bot='';
						var num=0;
						for(var i=0;i<str.length;i++){
							for(var j=0;j<str[i].order_items.length;j++){
								num+=JSON.parse(str[i].order_items[j].quantity)
							info+='<a href="orderInformation.html?'+str[i].order_id+"?"+str[i].pay_type+'" class="clearfix">'									
											+'<h1 class="l">'
												+'<img src="'+str[i].order_items[j].product_img+'" alt="" />'
											+'</h1>'
											+'<h2 class="l fontAll">'
												+str[i].order_items[j].product_name
											+'</h2>'
											+'<h3 class="l">'
												+'<p>'
												+'	¥<b>'+str[i].order_items[j].money+'</b>'
												+'</p>'
												+'<p><b>x</b><i>'+str[i].order_items[j].quantity+'</i></p>'
											+'</h3>'											
									+'</a>'
							}
							con+='<ul order_id="'+str[i].order_id+'" pay_type="'+str[i].pay_type+'" Score="'+str[i].Score+'" combination_fee="'+str[i].combination_fee+'" ecoupon_fee="'+str[i].ecoupon_fee+'" balance_fee="'+str[i].balance_fee+'">'
								+'<li class="clearfix mPT">'
									+'<span class="l fontAll">'
									+that.dealTime(str[i].order_date)
									+'</span>'
									+'<em class="r fontAll">'
									+	'等待付款'
									+'</em>'
								+'</li>'
								+'<li class="clearfix mPC">'
									+info
								+'</li>'
								+'<li class="fontAll mPCC">'
									+'共<span>'+num+'</span>件商品，实付金额：<b>¥</b><em>'+str[i].total_money+'</em>'
								+'</li>'
								+'<li class="mPB">'
									+'<a class="fontAll fnBtn">去支付</a>'
								+'</li>'
							+'</ul>'
							num=0;
							info='';
						}
						$('.mPay').append(con);
						if(that.loadNumPay==1&&that.state==1){
							that.isEmpty(that.state);
						};
						that.loadNumPay++;
						$('.wait').hide();
						that.flag=0;
					}
				});
		},
		loadFahuo:function(){	
			//获取发货
			var that=this;
			$.ajax({
				type:"get",
				url:that.urlPath+"/SER/PaybillList",
				async:true,
				data:{
					userid:localStorage.getItem('WP_id'),
					state:1,
					pagesize:6,
					pageindex:that.loadNumFahuo
				},
				success:function(res){
					var str=JSON.parse(res).data;
					var con='';
					var info='';
					var data='';
					var top='';
					var bot='';
					var num=0;
					for(var i=0;i<str.length;i++){
						for(var j=0;j<str[i].order_items.length;j++){
							num+=JSON.parse(str[i].order_items[j].quantity)
						info+='<a href="orderInformation.html?'+str[i].order_id+"?"+str[i].pay_type+'" class="clearfix">'									
										+'<h1 class="l">'
											+'<img src="'+str[i].order_items[j].product_img+'" alt="" />'
										+'</h1>'
										+'<h2 class="l fontAll">'
											+str[i].order_items[j].product_name
										+'</h2>'
										+'<h3 class="l">'
											+'<p>'
											+'	¥<b>'+str[i].order_items[j].money+'</b>'
											+'</p>'
											+'<p><b>x</b><i>'+str[i].order_items[j].quantity+'</i></p>'
										+'</h3>'											
								+'</a>'
						}
						con+='<ul order_id="'+str[i].order_id+'" pay_type="'+str[i].pay_type+'" Score="'+str[i].Score+'" combination_fee="'+str[i].combination_fee+'" ecoupon_fee="'+str[i].ecoupon_fee+'" balance_fee="'+str[i].balance_fee+'">'
							+'<li class="clearfix mPT">'
								+'<span class="l fontAll">'
								+that.dealTime(str[i].order_date)
								+'</span>'
								+'<em class="r fontAll">'
								+	'等待发货'
								+'</em>'
							+'</li>'
							+'<li class="clearfix mPC">'
								+info
							+'</li>'
							+'<li class="fontAll mPCC">'
								+'共<span>'+num+'</span>件商品，实付金额：<b>¥</b><em>'+str[i].total_money+'</em>'
							+'</li>'
							+'<li class="mPB">'
								+'<a class="fontAll fnBtn">查看详情</a>'
							+'</li>'
						+'</ul>'
						num=0;
						info='';
					};
					$('.mFahuo').append(con);
					if(that.loadNumFahuo==1&&that.state==2){
						that.isEmpty(that.state);
					};
					that.loadNumFahuo++;
					$('.wait').hide();
					that.flag=0;
				}
			});
		},
			//获取收货
		loadShouhuo:function(){
			var that=this;
			$.ajax({
				type:"get",
				url:that.urlPath+"/SER/PaybillList",
				async:true,
				data:{
					userid:localStorage.getItem('WP_id'),
					state:2,
					pagesize:6,
					pageindex:that.loadNumShouhuo
				},
				success:function(res){
					var str=JSON.parse(res).data;
					var con='';
					var info='';
					var data='';
					var top='';
					var bot='';
					var num=0;
					for(var i=0;i<str.length;i++){
						for(var j=0;j<str[i].order_items.length;j++){
							num+=JSON.parse(str[i].order_items[j].quantity)
						info+='<a href="orderInformation.html?'+str[i].order_id+"?"+str[i].pay_type+'" class="clearfix">'									
										+'<h1 class="l">'
											+'<img src="'+str[i].order_items[j].product_img+'" alt="" />'
										+'</h1>'
										+'<h2 class="l fontAll">'
											+str[i].order_items[j].product_name
										+'</h2>'
										+'<h3 class="l">'
											+'<p>'
											+'	¥<b>'+str[i].order_items[j].money+'</b>'
											+'</p>'
											+'<p><b>x</b><i>'+str[i].order_items[j].quantity+'</i></p>'
										+'</h3>'											
								+'</a>'
						};
						con+='<ul order_id="'+str[i].order_id+'" order_number="'+str[i].order_number+'"  pay_type="'+str[i].pay_type+'" Score="'+str[i].Score+'" combination_fee="'+str[i].combination_fee+'" ecoupon_fee="'+str[i].ecoupon_fee+'" balance_fee="'+str[i].balance_fee+'">'
							+'<li class="clearfix mPT">'
								+'<span class="l fontAll">'
								+that.dealTime(str[i].order_date)
								+'</span>'
								+'<em class="r fontAll">'
								+	'已发货'
								+'</em>'
							+'</li>'
							+'<li class="clearfix mPC">'
								+info
							+'</li>'
							+'<li class="fontAll mPCC">'
								+'共<span>'+num+'</span>件商品，实付金额：<b>¥</b><em>'+str[i].total_money+'</em>'
							+'</li>'
							+'<li class="mPB">'
								+'<a class="fontAll fnBtn">确认收货</a>'
							+'</li>'
						+'</ul>'
						num=0;
						info='';
					}
					$('.mShouhuo').append(con);
					if(that.loadNumShouhuo==1&&that.state==3){
						that.isEmpty(that.state);
					};
					that.loadNumShouhuo++;
					$('.wait').hide();
					that.flag=0;
				}
			});
		},
		loadPingjia:function(){
			//获取评价
		var that=this;
		$.ajax({
				type:"get",
				url:that.urlPath+"/SER/PaybillList",
				async:true,
				data:{
					userid:localStorage.getItem('WP_id'),
					state:3,
					pagesize:6,
					pageindex:that.loadNumPingjia,
				},
				success:function(res){
					var str=JSON.parse(res).data;
					var con='';
					var info='';
					var data='';
					var top='';
					var bot='';
					var num=0;
					for(var i=0;i<str.length;i++){
						for(var j=0;j<str[i].order_items.length;j++){
							num+=JSON.parse(str[i].order_items[j].quantity)
						info+='<a href="orderInformation.html?'+str[i].order_id+"?"+str[i].pay_type+'" class="clearfix">'									
										+'<h1 class="l">'
											+'<img src="'+str[i].order_items[j].product_img+'" alt="" />'
										+'</h1>'
										+'<h2 class="l fontAll">'
											+str[i].order_items[j].product_name
										+'</h2>'
										+'<h3 class="l">'
											+'<p>'
											+'	¥<b>'+str[i].order_items[j].money+'</b>'
											+'</p>'
											+'<p><b>x</b><i>'+str[i].order_items[j].quantity+'</i></p>'
										+'</h3>'											
								+'</a>'
						}
						con+='<ul order_id="'+str[i].order_id+'" pay_type="'+str[i].pay_type+'" Score="'+str[i].Score+'" combination_fee="'+str[i].combination_fee+'" ecoupon_fee="'+str[i].ecoupon_fee+'" balance_fee="'+str[i].balance_fee+'">'
							+'<li class="clearfix mPT">'
								+'<span class="l fontAll">'
								+that.dealTime(str[i].order_date)
								+'</span>'
								+'<em class="r fontAll">'
								+	'已完成'
								+'</em>'
							+'</li>'
							+'<li class="clearfix mPC">'
								+info
							+'</li>'
							+'<li class="fontAll mPCC">'
								+'共<span>'+num+'</span>件商品，实付金额：<b>¥</b><em>'+str[i].total_money+'</em>'
							+'</li>'
							+'<li class="mPB">'
								+'<a href="orderInformation.html?'+str[i].order_id+'" class="fontAll">查看详情</a>'
							+'</li>'
						+'</ul>'
						num=0;
						info='';
					};
					$('.mPingjia').append(con);
					if(that.loadNumPingjia==1&&that.state==4){
						that.isEmpty(that.state);
					};
					that.loadNumPingjia++;
					$('.wait').hide();
					that.flag=0;
				}
			});
		},
		processFilter:function(param){
			if (param.order_status == 0) {
		        if (param.pay_type== 1 || param.pay_type == 2) return "等待发货";
		        if (param.pay_state == 0) return "等待付款";
		        return "未处理";
		        
		    } else if (param.order_status == 1) {
		        
		        if (param.order_type == 1 || param.order_type == 2) return "等待发货";
		        
		        return "已审核";
		        
		    } else if (param.order_status == 2) {
		        return "已发货";
		    } else if (param.order_status == 3) {
		        return "已收货";
		    } else if (param.order_status == 4) {
		        return "已退货";
		    } else if (param.order_status == 5) {
		        return "已损失";
		    } else if (param.order_status == 6) {
		        return "未审核";
		    } else if (param.order_status == 7) {
		        return "未通过";
		    } else if (param.order_status == 8) {
		        return "已作废";
		    } else if (param.order_status == 9) {
		        return "已开票";
		    } else if (param.order_status == 10) {
		        return "发票待开";
		    } else if (param.order_status == 11) {
		        return "已开随付单 ";
		    } else if (param.order_status == 12) {
		        return "货已配齐";
		    } else if (param.order_status == 13) {
		        return "已包装";
		    } else if (param.order_status == 14) {
		        return "部分退货";
		    } else if (param.order_status == 15) {
		        return "部分换货";
		    } else if (param.order_status == 16) {
		        return "已验货";
		    } else if (param.order_status == 17) {
		        return "已评价";
		    } else if (param.order_status == 18) {
		        return "已付款";
		    } else {
		        return "";
		    }
		},
		payFilter:function(param){
			if (param.order_status == 0) {
		        if (param.pay_type == 1 || param.pay_type == 2) {return "货到付款"};
		        if (param.pay_state == 0) {return "去支付"};
		        return "已付款"; 
		   } else if (param.order_status == 1) {
		        if (param.pay_type == 1 || param.pay_type == 2) return "货到付款";
		        return "已支付";
		    } else if (param.order_status == 2) {
		        return "确认收货";
		    } else if (param.order_status == 8) {
		        return "删除订单";
		    } else {
		        return "查看详情";
		    }
		}
	};
	myOrderObj.init();
})