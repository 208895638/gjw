$(function(){
	
	var orderInformationObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		spid:null,
		status:null,
		box:[],
		init:function(){
			this.bindEvent();
			this.render();
		},
		bindEvent:function(){
			var that=this;
			$('.goback').on('click',function(){
				window.history.back()
			});
			$('.removeOrder').on("click",function(){
				$.ajax({
					type:"get",
					url:that.urlPath+"/SER/DelOrder",
					data:{
						user_id:localStorage.getItem("id"),
						order_id:that.order_id
					},
					dataType:"json",
					success:function(res){
						alert(res.msg)
					}
				});
			});
			$('.oBL').on('click',function(){
				$.ajax({
					type:"get",
					url:that.urlPath+"/SER/CancelOrder",
					async:true,
					data:{
						userid:localStorage.getItem('WP_id'),
						orderid:that.order,
						orderno:that.orderNumber
					},
					success:function(res){
						console.log(res);
						var str=JSON.parse(res);
						if(str.status==0){
							alert(str.msg)
							window.location.href='myOrder.html'
						}
					}
				});
			});
			$('.confirmGoods').on('click',function(){//确认收货，没数据
				$.ajax({
					type:'get',
					url:that.urlPath+'/SER/ReceiptHuo',
					data:{
						userid:localStorage.getItem('id'),
						order_id:that.orderid,
						orderno:that.orderNumber
					},
					dataType:"json",
					success:function(res){
						console.log(res,typeof(res))
					}
				});
			});
		},
		dealDay:function(dayTime){
			var result=dayTime.replace(/-/g, "/");
			return result;
		},
		interVal:function(begtime,alltime){
			var that=this;
			var timer=setInterval(function(){
				var data=new Date(that.dealDay(begtime)).getTime()+alltime;
				var nowTime=new Date().getTime();
				var t =data - nowTime; 
				var d=Math.floor(t/1000/60/60/24);
				var h=Math.floor(t/1000/60/60%24); 
				var m=Math.floor(t/1000/60%60); 
				var s=Math.floor(t/1000%60);
				if(d<=0){
					$('.orderICTL').find('b').hide();
				}else{
					$('.orderICTL').find('b').html(d);
				}
				$('.orderICTL').find('span').html(h);
				$('.orderICTL').find('em').html(m);
				$('.orderICTL').find('i').html(s);								
				if(t<=0){
					clearInterval(timer)
					$('.orderICTL').find('h2').html(orderState)
    				$('.orderICTL').find('h3').html('订单已失效')
    				$('.orderICTR').find('img').attr('src','../img/cg2x.png')									
					$('.oB').hide();
					$('.removeOrder').show();
				}
			},1000)
		},
		render:function(){
			var sign=location.search.substring(1,999).split("?");//console.log(url1[0])
			this.spid=sign[0];//普通商品
			this.type=sign[1];//状态
			var that=this;
			var orderNumber=0;
			console.log(localStorage.getItem('id'),that.spid);
			$.ajax({
				type:"get",
				url:that.urlPath+"/SER/getorderreturnpro",
				async:true,
				data:{
					user_id:localStorage.getItem('id'),
					strorder:that.spid
				},
				dataType:'json',
				success:function(res){
					console.log(res);
					if(res.data.length!=0){
						for(var i=0;i<res.data;i++){
							that.box.push(res.data[i].OdrProductID);
						}
					};
					$.ajax({
						type:"get",
						url:that.urlPath+"/SER/GetOrderInfo",
						data:{
							userid:localStorage.getItem('id'),
							order_id:that.spid
						},
						dataType:'json',
						success:function(result){
							result=result.data;
							$('oNT').find('em').html(result.order_number);
							$('oDC ').find('h3').html(result.RecieveCityName);
							$('oDC ').find('span').html(result.ConsigneeName);
							$('.oCen').find('h2').find('em').html(result.PayWayName);
							$('.oDR').html(result.Tel);
							if(result.UsrMsg){//买家留言
								$('.mjly').find('b').html(result.UsrMsg);
							}else{
								$('.mjly').hide();
							}
							if(result.InvoiceTitle){//发票信息
								$('.fpxx').find('b').html(result.InvoiceTitle+'  '+result.InvoiceContent);
							}else{
								$('.fpxx').hide();
							}
							var sign=that.filterSign(result);
							that.filterPic(sign);		
						}
					});
				}
			});
			/*$.ajax({
				type:"get",
				url:that.urlPath+"/SER/GetOrderInfo",
				async:true,
				data:{
					userid:localStorage.getItem('id'),
					order_id:that.spid
				},
				success:function(res){
					console.log(res,typeof(res))
					var str=JSON.parse(res).data;
					var con='';
					var num=JSON.parse(str.order_product);//商品总总数
					that.orderNumber=str.order_number;
					console.log(str.order_status,str.pay_state)
					var sign=that.filterSign(str);
					that.filterPic(sign);			    
					if(str.UsrMsg){//买家留言
						$('.mjly').find('b').html(str.UsrMsg);
					}else{
						$('.mjly').hide();
					}
					if(str.InvoiceTitle){//发票信息
						$('.fpxx').find('b').html(str.InvoiceTitle+'  '+str.InvoiceContent);
					}else{
						$('.fpxx').hide();
					}
					
					$('.oNT').find('em').html(str.order_number);
					$('.oDC').find('h2').find('span').html(str.ConsigneeName);
					$('.oDC').find('h3').html(str.RecieveCityName);
					$('.oDR').html(str.Tel);
					
					$('.oCen').find('h2').find('em').html(str.PayWayName)
					
					$('.yf').html(str.Freight)
					var tiaojianCon='';
					var tiaojian='';
					var jian='';
					var jine='';
					var dis='';
					var evaluate='';//评价按钮
					//物流传值
					$('.oNB').find('a').attr('href',"wLorder.html?"+str.order_id+'?'+str.order_number)
					
					//console.log(jian,tiaojian,jine,typeof(jine))
					//console.log(tiaojian,jian)
					//console.log(jine)
					//console.log(typeof(jine))
					if(str.order_discount){
						dis=str.order_discount.split(' ');
						jian=dis[1];
						tiaojianCon=dis[2].split('：');
						tiaojian=tiaojianCon[0];
						jine=tiaojianCon[1].split('¥')[1];
						$('.discount').show()
						$('.discount').find('span').html(tiaojian)
						$('.discount').find('i').html(jian)
						$('.discount').find('b').html(jine)
					}else{
						$('.discount').hide()
					}
					var shifu=0;
					for(var i=0;i<num.length;i++){
						shifu+=parseFloat(num[i].product_price)*parseFloat(num[i].quantity)
						console.log(orderState)
						if(orderState=='交易结束'){
							if(num[i].IsComment==0){
								evaluate='<a href="evaluate.html?'+str.order_id+"?"+num[i].product_id+'">'
												+'去评价'
											+'</a>'
								
							}else{
								evaluate='<h5>'
												+'已评价'
											+'</h5>'
										
							}
							$('.oB').hide();
						}else{
							evaluate='';
							
							$('.oB').show();
						}
						
						if(num[i].order_gift){
							var zp=JSON.parse(num[i].order_gift)
							con+='<dl>'
								+	'<dt class="clearfix">'
										+'<div class="oInL l" >'
											+'<img src="'+num[i].product_img+'" alt="" />'
										+'</div>'
										+'<a class="l over2" href="detail.html?'+num[i].product_id+'">'
											+num[i].product_name
										+'</a>'
										+'<div class="oInR r">'
											+'<h2>'
												+'¥<span>'+num[i].product_price+'</span>'
											+'</h2>'
											+'<h3>'
												+'x <span>'+num[i].quantity+'</span>'
											+'</h3>'
											+'<div class="evaluate">'
											+evaluate
											+'<div>'
										+'</div>'
									+'</dt>'
									+'<dd class="clearfix">'
										+'<div class="oInL l">'
											+'<img src="'+zp[0].ProGiftpic+'" alt="" />'
										+'</div>'
										+'<div class="oInC l clearfix">'
											+'<span class="l">'
												+'【赠品】'
											+'</span>'
											+'<em class="l" style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">'
												+zp[0].ProGiftName
											+'</em>'
										+'</div>'										
										+'<div class="oInR r">'											
											+'<h3>'
												+'x<span>'+zp[0].ProGiftCount+'</sapn>'
											+'</h3>'
										+'</div>'
									+'</dd>'
								+'</dl>'
						}else{
								con+='<dl>'
								+	'<dt class="clearfix">'
										+'<div class="oInL l" >'
											+'<img src="'+num[i].product_img+'" alt="" />'
										+'</div>'
										+'<a class="l over2" href="detail.html?'+num[i].product_id+'">'
											+num[i].product_name
										+'</a>'
										+'<div class="oInR r">'
											+'<h2>'
												+'¥<span>'+num[i].product_price+'</span>'
											+'</h2>'
											+'<h3>'
												+'x <span>'+num[i].quantity+'</span>'
											+'</h3>'
											+'<div class="evaluate">'
											+evaluate
											+'<div>'
										+'</div>'
									+'</dt>'
								+'</dl>'
						}
					}
					
					$('.oIn').html(con)
					//console.log(shifu,jine,typeof(shifu),typeof(jine))
					$('.spze').html(shifu)//实付是总价
					$('.money').find('b').html(shifu-jine+str.Freight)
				}
			});*/
		},
		filterCZ:function(obj){
			if (obj.order_status == 0) {
		        if (obj.pay_type == 1 || obj.pay_type == 2) {return "货到付款"};
		        if (obj.pay_state == 0) {return "去支付"};
		        return "已付款";
		        
		    } else if (obj.order_status == 1) {
		        
		        if (obj.pay_type == 1 || obj.pay_type == 2) {return "货到付款"};
		        
		        return "已支付";
		        
		    } else if (obj.order_status == 2) {
		        return "确认收货";
		    } else if (obj.order_status == 8) {
		        return "删除订单";
		    } else {
		        return "查看详情";
		    }
		},
		filterSign:function(obj){
			if (obj.order_status == 0) {
        
		        if (obj.pay_type == 1 || obj.pay_type == 2) {return 'OrderStatusTypeHDFK'};
		        
		        if (obj.pay_state == 0)  {return 'OrderStatusTypeDFK'};
		            
		        return 'OrderStatusTypeSH';
		        
		    } else if (obj.order_status == 1) {
		        
		        if (obj.pay_type == 1 || obj.pay_type == 2) {return 'OrderStatusTypeHDFK'};
		        
		        return 'OrderStatusTypeDFH';
		        
		    } else if (obj.order_status == 2) {
		        
		        if (obj.pay_type == 1 || obj.pay_type == 2) {
		            
		            if (obj.pay_state == 0) {return 'OrderStatusTypeDSHWithWFK'};
		                
		            return 'OrderStatusTypeDSHWithYFK';
		        }
		        return 'OrderStatusTypeDSH';
		        
		    } else if (obj.order_status == 3) {
		        return 'OrderStatusTypeDPJ';
		    } else if (obj.order_status == 8) {
		        return 'OrderStatusTypeDelete';
		    } else if (obj.order_status == 18) {
		        return 'OrderStatusTypeDFH';
		    } else {
		        return 'OrderStatusTypeSuccess';
		    }
		},
		filterBTN:function(){
			//根据订单状态 底部左侧按钮标题
		    /*if (self.orderStatus == OrderStatusTypeDPJ)     return @"去评价";
		    
		    if (self.orderStatus == OrderStatusTypeHDFK)    return @"取消订单";
		    
		    if (self.orderStatus == OrderStatusTypeDSH)     return @"确认收货";
		    
		    if (self.orderStatus == OrderStatusTypeDFH)     return @"取消订单";
		    
		    if (self.orderStatus == OrderStatusTypeSH)      return @"取消订单";
		    
		    if (self.orderStatus == OrderStatusTypeDFK)     return @"去支付";
		    
		    if (self.orderStatus == OrderStatusTypeDSHWithWFK) return @"确认收货";
		    
		    if (self.orderStatus == OrderStatusTypeDSHWithYFK) return @"确认收货";
		    
		    return @"删除订单";

		    if (self.orderStatus == OrderStatusTypeDFK)     return @"取消订单";
		    
		    if (self.orderStatus == OrderStatusTypeHDFK)    return @"取消订单";
		    
		    return @"查看物流";*/

		},
		filterPic:function(obj){
			switch(obj){
				case 'OrderStatusTypeSuccess':
					$('.cg').show();
					$('.orderICTL h2').html("交易结束");
					/*$('.oBL').show().html('删除订单');
					$('.oBR').show().html('查看物流');*/
					break;
				case 'OrderStatusTypeDPJ':
					$('.dpj').show();
					$('.orderICTL h2').html("交易结束");
					/*$('.oBL').show().html('去评价');
					$('.oBR').show().html('查看物流');*/
					break;
				case 'OrderStatusTypeDSH':
					$('.dsh').show();
					$('.orderICTL h2').html("卖家已发货");
					$('.oBL').show().html('确认收货');
					$('.oBR').show().html('查看物流');
					break;
				case 'OrderStatusTypeDFH':
					$('.dfh').show();
					$('.orderICTL h2').html("等待卖家发货");
					/*$('.oBL').show().html('取消订单');
					$('.oBR').show().html('查看物流');*/
					break;
				case 'OrderStatusTypeSH':
					$('.dfh').show();
					$('.orderICTL h2').html("卖家正在审核");
					$('.oBL').show().html('取消订单');
					$('.oBR').show().html('查看物流');
					break;
				case 'OrderStatusTypeDFK':
					$('.dfk').show();
					$('.orderICTL h2').html("等待买家付款");
					$('.oBL').show().html('去支付');
					$('.oBR').show().html('取消订单');
					break;
				case 'OrderStatusTypeHDFK':
					$('.dfh').show();
					$('.orderICTL h2').html("等待卖家发货");
					$('.oBL').show().html('取消订单');
					$('.oBR').show().html('取消订单');
					break;
				case 'OrderStatusTypeDSHWithWFK':
					$('.dfh').show();
					$('.orderICTL h2').html("卖家已发货");
					$('.oBL').show().html('确认收货');
					$('.oBR').show().html('查看物流');
					break;
				case 'OrderStatusTypeDSHWithYFK':
					$('.dfh').show();
					$('.orderICTL h2').html("卖家已发货");
					$('.oBL').show().html('确认收货');
					$('.oBR').show().html('查看物流');
					break;
				default:
					$('.sb').show();
					$('.orderICTL h2').html("交易结束");
					$('.oBL').show().html('删除订单');
					$('.oBR').show().html('查看物流');
					/*if (self.orderStatus == OrderStatusTypeDFH || self.orderStatus == OrderStatusTypeDPJ || self.orderStatus == OrderStatusTypeSuccess || _isHideBottomView == YES) {
				        _bottomView.hidden = YES;       //隐藏底部视图
				    } else {
				        
				        _bottomView.hidden = NO;
				        if (self.orderStatus == OrderStatusTypeSH  || self.orderStatus == OrderStatusTypeHDFK || self.orderStatus == OrderStatusTypeDelete) {
				            cancelBtn.hidden = YES;  //隐藏右边按钮视图
				        }
				    }
				*/
				/*if (orderStatus == OrderStatusTypeSuccess) return "cg";
		    
			    if (orderStatus == OrderStatusTypeDPJ)     return "dpj";
			    
			    if (orderStatus == OrderStatusTypeDSH)     return "dsh";
			    
			    if (orderStatus == OrderStatusTypeDFH)     return "dfh";
			    
			    if (orderStatus == OrderStatusTypeSH)      return "dfh";
			    
			    if (orderStatus == OrderStatusTypeDFK)     return "dfk";
			    
			    if (orderStatus == OrderStatusTypeHDFK)    return "dfh";
			    
			    if (orderStatus == OrderStatusTypeDSHWithWFK)    return "dfh";
			    
			    if (orderStatus == OrderStatusTypeDSHWithYFK)    return "dfh";
			    
			    return "sb";*/
			   /* if (orderStatus == OrderStatusTypeSuccess) return "交易结束";
		    
			    if (orderStatus == OrderStatusTypeDPJ)     return "交易结束";
			    
			    if (orderStatus == OrderStatusTypeDSH)     return "卖家已发货";
			    
			    if (orderStatus == OrderStatusTypeDFH)     return "等待卖家发货";
			    
			    if (orderStatus == OrderStatusTypeSH)      return "卖家正在审核";
			    
			    if (orderStatus == OrderStatusTypeDFK)     return "等待买家付款";
			    
			    if (orderStatus == OrderStatusTypeHDFK)    return "等待卖家发货";
			    
			    if (orderStatus == OrderStatusTypeDSHWithWFK) return "卖家已发货";
			    
			    if (orderStatus == OrderStatusTypeDSHWithYFK) return "卖家已发货";
			    
			    return "交易结束";*/
				};
			}
		};
	orderInformationObj.init();
})