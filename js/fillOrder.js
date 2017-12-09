$(function(){
	var fillOrderObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		user_id:null,
		WP_id:null,
		arryspid:null,
		cartid:null,
		total_price:null,
		province:null,
		city:null,
		area:null,
		moneyPay:null,
		goods:null,
		state:0,
		paystyle:null,
		numstr:'',
		ecoupon_fee:null,
		balance_fee:null,
		flag:0,
		sum:null,
		init:function(){
			this.bindEvent();
			this.render();
		},
		bindEvent:function(){
			var that=this;
			$('.goback').on('click',function(){
				localStorage.removeItem('ecoupon_id');
				localStorage.removeItem('ecoupon_fee');
				localStorage.removeItem('fpInfo');
				window.history.back()
			});
			$('.payStyle').on('change','input',function(){
				if($(this).prop('checked')){
					$(this).css('background','url(../img/yes.png) no-repeat').addClass('payWay').parent().siblings().find('input').removeClass('payWay').css('background','url(../img/no.png) no-repeat');
				};
			});
			$('.deleteVal').on('click',function(){
				$(this).parent().prev().val('');
			});
			$('.coupon').on('click',function(){
				window.location.href='canUseCoupon.html?'+that.numstr;
			});
			$('textarea').on('input',function(){
				var content=$(this).val();
				$(this).val(that.dealData(content));
				if(content.length>50){
					content=content.substring(0,50);
					$(this).val(content);
				};
			});
			$('.fillOrderBottom a').on('click',function(){
				that.submitOrder();
				
			});
			$('.integral input').on('input',function(){
				var content=parseInt($(this).val());
				console.log(content,that.ecoupon_fee);
				if(isNaN(content)){
					content='';
				}else if(content>that.ecoupon_fee){
					content=that.ecoupon_fee;
				};
				$(this).val(content);
				if($(this).val()!=''){
					$(this).next().find('img').show();
				}else{
					$(this).next().find('img').hide();
				};
				that.calcMoney();
			});
			$('.balance input').on('input',function(){
				var content=parseInt($(this).val());
				console.log(content,that.balance_fee);
				if(isNaN(content)){
					content='';
				}else if(content>that.balance_fee){
					content=that.balance_fee;
				};
				$(this).val(content);
				if($(this).val()!=''){
					$(this).next().find('img').show();
				}else{
					$(this).next().find('img').hide();
				};
				that.calcMoney();
			});
		},
		getData:function(){
			this.arryspid=localStorage.getItem('arryspid');
			this.cartid=localStorage.getItem('cartid');
			this.goods=localStorage.getItem('fillOrder');
			$('.fillOrderGoods').html(this.goods);
			$('.goodsContent').removeAttr('href');
			$('.subtract').html('X');
			console.log(this.cartid);
			this.cartid=this.cartid.substring(0,this.cartid.length-1);
			this.user_id=localStorage.getItem('id');
			this.WP_id=localStorage.getItem('WP_id');
			if(localStorage.getItem('fpInfo')){
				$('.fpInfo a h5').html(localStorage.getItem('fpInfo'));
			};
			if(localStorage.getItem('ecoupon_fee')){
				$('.fillOrderCoupon ul .coupon a h4 span').html('¥ '+localStorage.getItem('ecoupon_fee')).css('color','#cb0617');
				this.flag=1;
			};
			if(localStorage.getItem('ecoupon_id')){
				$('.fillOrderCoupon ul .coupon').attr('ecoupon_id',localStorage.getItem('ecoupon_id'));
			};
			this.numstr='';
			var that=this;
			$('.numShow').each(function(){
				that.numstr +=	','+$(this).text()
			});
			this.numstr=this.numstr.substr(1);
		},
		render:function(){
			var that=this;
			this.getData();
			console.log(that.user_id,that.WP_id,that.arryspid,that.cartid);
         	/*$.ajax({
				url:that.urlPath+"/SER/get_product_pay",
				type:'get',
				data: { 
					userid:that.WP_id,
                	id:that.cartid
                },
                dataType: "json",
                success:function(res){
                	console.log(res);
                	if(res.msg=='获取成功'){
                		var result=JSON.parse(res.data);
                		var content='';
                		for(var i=0;i<result.length;i++){
                			content += '<span  class="fontAll">'
									+		'<input type="radio" name="payStyle" payId="'+result[i].id+'">'+result[i].name
									+	'</span>'
                		};
                		$('.payStyle h3').html(content);
                		$('.payStyle h3 input').eq(0).attr('checked','checked').addClass('payWay');
                	}
                }
         	});*/
         	//获得地址
         	$.ajax({
				url:that.urlPath+"/SER/addresslist",
				type:'get',
				data: { 
					userid:that.WP_id,
                },
                dataType: "json",
                success:function(res){
                	console.log(res);
                	if(res.msg=='暂无数据'){
                		$('.consigneeMessageExit').addClass('fillOrderHide').siblings().removeClass('fillOrderHide');
                	}else{
                		$('.consigneeMessageDis').addClass('fillOrderHide').siblings().removeClass('fillOrderHide');
//              		var result=JSON.parse(res.data);
						var result=res.data;
						console.log(result);
                		var content='';
                		if(!localStorage.getItem('address_id')){
                			console.log('没选地址');
	                		for(var i=0;i<result.length;i++){
	                			if(result[i].is_default==1){
	                				console.log('有默认地址')
	                			that.state=1;
	                			content	+='<div class="receiveInfo" flight="'+result[i].flight+'" addressId="'+result[i].id+'" rgn_CountyID="'+result[i].rgn_CountyID+'">'
										+		'<h2 class="clearfix">'
										+			'<i class="l">收货人:<sapn>'+result[i].contact+'</sapn>'
										+			'</i>'
										+			'<span class="r">'+result[i].phone+'</span>'
										+		'</h2>'
										+		'<h3 province="'+result[i].province+'" city="'+result[i].city+'" area="'+result[i].area+'" address="'+result[i].address+'">'+result[i].province+result[i].city+result[i].area+result[i].address+'</h3>'
										+'</div>'
								that.province=result[i].province;
	                			that.city=result[i].city;
	                			that.area=result[i].area;
								};
	                		};
                		}else{
                			console.log('有选择地址');
                			for(var i=0;i<result.length;i++){
	                			if(result[i].id==localStorage.getItem('address_id')){
	                			that.state=1;
	                			content	+='<div class="receiveInfo" flight="'+result[i].flight+'" addressId="'+result[i].id+'" rgn_CountyID="'+result[i].rgn_CountyID+'">'
										+		'<h2 class="clearfix">'
										+			'<i class="l">收货人:<sapn>'+result[i].contact+'</sapn>'
										+			'</i>'
										+			'<span class="r">'+result[i].phone+'</span>'
										+		'</h2>'
										+		'<h3 province="'+result[i].province+'" city="'+result[i].city+'" area="'+result[i].area+'" address="'+result[i].address+'">'+result[i].province+result[i].city+result[i].area+result[i].address+'</h3>'
										+'</div>'
								that.province=result[i].province;
	                			that.city=result[i].city;
	                			that.area=result[i].area;
								}
	                		};
                		};
                		console.log(that.state);
                		if(that.state==1){
                			$('.consigneeMessageExit').html(content);
                		}else{
                			console.log('没默认地址，没选地址');
                			$('.consigneeMessageExit').removeClass('fillOrderHide').siblings().addClass('fillOrderHide');	
                		};
                		//获得优惠后价格
                		$.ajax({
							url:that.urlPath+"/SER/Get_CartTotalPrice",
							type:'get',
							data: { 
								userid:that.userid,
			                	arryspid:that.arryspid
			                },
			                dataType: "json",
			                success:function(res){
			                	console.log(res);
			                	that.total_price=res.total_price;
			                	$('.totalPrice h4 span').html(res.total_price);
			                	console.log(that.total_price,that.cartid,that.province,that.city,that.area);
			                	//获得运费
			                	$.ajax({
									url:that.urlPath+"/SER/GetAddorderFreight",
									type:'post',
									data: { 
										order_money:that.total_price,
										strProduct:that.cartid,
										province:that.province,
										city:that.city,
										area:that.area,
					                },
					                dataType: "json",
					                success:function(res){
					                	console.log(res);
					                	$('.freight h4 span').html(res.data);
					                	that.calcMoney();
					                	/*that.moneyPay=res.data+that.total_price;
					                	console.log(that.moneyPay);*/
					                }
					         	});
			                }
			         	});
                	}
                }
         	});
         	//显示可用余额
         	$.ajax({
				type:"get",
				url:that.urlPath+"/SER/User_MyAcount",
				async:true,
				data:{
					user_id:localStorage.getItem('WP_id'),
					page_size:999,
					current_page:0 
				},
				dataType: "json",
				success:function(res){
					var result=res.data;
					var content=0;
					if(res.msg=="查询成功"){
						for(var i=0;i<result.length;i++){
							content+=result[i].money
						};
						that.balance_fee=content;
						$('.balance input').attr('placeholder','可用余额:'+content);
					};
				}
			});
			//显示可用积分
			$.ajax({
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
				dataType: "json",
				success:function(res){
					var result=res.data;
					if(res.msg=="操作成功"){
						that.ecoupon_fee=result.CanUseScore;
						$('.integral input').attr('placeholder','可用积分:'+result.CanUseScore);
					}
				}
			});
			//获得优惠前总价
			$.ajax({
				url:that.urlPath+"/SER/Get_CartTotalPrice",
				type:'get',
				data: { 
					userid:that.user_id,
					arryspid:that.arryspid
                },
                dataType: "json",
                success:function(res){
                	console.log(res);
                	that.sum=parseFloat(res.total_price)+parseFloat(res.youhui_price);
                }
        	});
		},
		//提交订单
		submitOrder:function(){
			var invoice_content;
			var invoice_head;
			var ecoupon_id;
			var ecoupon_fee;
			console.log($('.fpInfo h5').text(),$('.coupon a h4 span').text())
			if($('.fpInfo h5').text().trim()=='不需要发票'){
				invoice_content='';
				invoice_head='';
			}else{
				invoice_content=$('.fpInfo h5').text().split(' ')[0];
				invoice_head=$('.fpInfo h5').text().split(' ')[1];
			};
			if($('.coupon a h4 span').text().trim()=='选取优惠券'){
				ecoupon_id=0;
				ecoupon_fee=0;
			}else{
				ecoupon_id:$('.coupon').attr('ecoupon_id');
				ecoupon_fee:$('.coupon a h4 span').html().split(' ')[1];
			}
			var that=this;
			console.log('user_id:'+that.user_id,'address_id:'+$('.receiveInfo').attr('addressid'),'pay_method:'+$('.payWay').parent().text(),'pay_method_id:'+$('.payWay').attr('payid'),'invoice_content:'+invoice_content,'invoice_head:'+invoice_head,'comment:'+$('textarea').val(),'products:'+that.cartid,'quantity:'+that.numstr,'money:'+that.sum,'shipping_fee:'+$('.freight h4 span').html(),'ecoupon_id:'+ecoupon_id,'ecoupon_fee:'+ecoupon_fee,'balance_fee:'+$('.balance input').val(),'quota_fee:'+$('.integral input').val(),'combination_fee:'+'0','total_fee:'+$('.totalPrice h4 span').text(),'arryspid:'+that.arryspid,'vastr:'+$.md5("!@#$"+that.user_id+$('.freight h4 span').html()+$('.balance input').val()+$('.integral input').val()+0+$('.totalPrice h4 span').text()+that.arryspid+"*&^%"))
			$.ajax({
				url:that.urlPath+"/SER/SubmitOrder",
				type:'post',
				data: { 
					user_id:that.user_id,
					address_id:$('.receiveInfo').attr('addressid'),
					pay_method:$('.payWay').parent().text(),
				    pay_method_id:$('.payWay').attr('payid'),
				    invoice_content:invoice_content,
				    invoice_head:invoice_head,
				    comment:$('textarea').val(),
				    products:that.cartid,
				    quantity:that.numstr,
				    money:that.sum,
				    shipping_fee:$('.freight h4 span').html(),
				    ecoupon_id:ecoupon_id,
				    ecoupon_fee:ecoupon_fee,
				    balance_fee:$('.balance input').val(),
				    quota_fee:$('.integral input').val(),
				    combination_fee:0,
				    total_fee:$('.totalPrice h4 span').text(),
				    arryspid:that.arryspid,
				    /*vastr		md5加密（）格式:"!@#$"+userid+shipping_fee+balance_fee+quota_fee+0+totalMoney+arryspid+"*&^%"*/
				    vastr:$.md5("!@#$"+that.user_id+$('.freight h4 span').html()+$('.balance input').val()+$('.integral input').val()+0+$('.totalPrice h4 span').text()+that.arryspid+"*&^%")
			    },
                dataType: "json",
                success:function(res){
                	console.log(res);
                	if(res.status==0){
                		localStorage.removeItem('ecoupon_id');
						localStorage.removeItem('ecoupon_fee');
						localStorage.removeItem('fpInfo');
						window.location.href="payCenter.html";
                	}else{
                		alert(res.msg);
                	}
                }
          })
		},
		//评论文字输入限制
		dealData:function(value) {
			var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；： ”“'。，、？]") 
			var rs = ""; 
			for (var i = 0; i < value.length; i++) {
			rs = rs+value.substr(i, 1).replace(pattern, ''); 
			} 
			return rs;
		},
		//计算价格
		calcMoney:function(){
			this.moneyPay=parseFloat($('.totalPrice h4 span').text())+parseFloat($('.freight h4 span').text());
			console.log(this.moneyPay,$('.freight h4 span').text(),$('.totalPrice h4 span').text());
			if(this.flag=1){
				this.moneyPay=this.moneyPay-localStorage.getItem('ecoupon_fee');
			};
			if($('.integral input').val()/100>this.moneyPay){
				$('.integral input').val(this.moneyPay*100);
			};
			this.moneyPay=this.moneyPay-$('.integral input').val()/100;
			if($('.balance input').val()>this.moneyPay){
				$('.balance input').val(this.moneyPay);
			};
			this.moneyPay=this.moneyPay-$('.balance input').val();
			$('.fillOrderBottom span em').html(this.moneyPay.toFixed(2));
		}
	};
	fillOrderObj.init();
})