$(function(){
		var shouhuo='';
	var mySaleObj={
		
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
			
			
		
		},
		render:function(){
			var that=this;
			//我的售后
			$.ajax({
				type:'get',
				url:that.urlPath+'/SeR/GetOrderReturnList',
				data:{
					 PageIndex:0,
					 PageSize:999,
					 user_id:localStorage.getItem('WP_id')
				},
				success:function(res){
					console.log(res)
					var str=JSON.parse(res).data.dt;
					console.log(str,typeof(str),str.length)
					var con='';
					var top='';
					var bot='';
					var num=0;
					if(str[0]){
							for(var i=0;i<str.length;i++){
						if(str[i].State==4){//顶部状态判断
							if(str[i].Type==2){
								top='待退款'
							}else{
								top='买家已收货'
							}
						}else if(str[i].State==5){
							if(str[i].Type==0){
								top='卖家已重新发货'
							}else{
								top='卖家已退款'
							}
						}else if(str[i].State==6){
							top='已完成'
						}else{
							top='已作废'
						}
						
						if(str[i].State==2){//底部状态判断
							if(str[i].Type==0||str[i].Type){
								bot='填写信息'
							}else{
								bot='查看详情'
							}
						}else{
							bot='查看详情'
						}
						
						con+='<a href="saleDetail.html?'+top+'">'//
								+'<div class="mySC" odr_orderID="'+str[i].odr_orderID+'" orderNumber="'+str[i].orderNumber+'" CreateTime="'+str[i].CreateTime+'" FinishTime="'+str[i].FinishTime+'" CancerTime="'+str[i].CancerTime+'" ReturnNewOrderID="'+str[i].ReturnNewOrderID+'" RefurnNewOrder="'+str[i].RefurnNewOrder+'" rowindex="'+str[i].rowindex+'" ProductPic="'+str[i].ProductPic+'" ProductName="'+str[i].ProductName+'" SumMoney="'+str[i].SumMoney+'" ReturnChangeCount="'+str[i].ReturnChangeCount+'" Price="'+str[i].Price+'" pro_productID="'+str[i].pro_productID+'" lgs_DistributionUnit="'+str[i].lgs_DistributionUnit+'" ExprCompRemark="'+str[i].ExprCompRemark+'" Waybill="'+str[i].Waybill+'">'
									+'<h2 class="clearfix">'
										+'<span class="l">'+str[i].CreateTime+'</span>'
										+'<em class="r">'+top+'</em>'
									+'</h2>'
									+'<ul class="clearfix">'
										+'<li class="l myUL">'
											+'<img src="'+str[i].ProductPic+'" alt="" />'
										+'</li>'
										+'<li class="l myUC">'
											+str[i].ProductName
										+'</li>'
										+'<li class="l myUR">'
											+'<h3>'
												+'¥ <span>'
													+str[i].Price
												+'</span>'
											+'</h3>'
											+'<h4>'
												+'x <span>'
													+str[i].ReturnChangeCount
												+'</span>'
											+'</h4>'
										+'</li>'
									+'</ul>'
									+'<h5>'
										+'共<span> '+str[i].ReturnChangeCount+' </span>件商品,实付金额：<em>¥</em><i>'+str[i].SumMoney+'</i>'
									+'</h5>'
									+'<h6>'
										+'<button href="javascript:;">'
											+bot
										+'</button>'
									+'</h6>'
								+'</div>'
							+'</a>'
							}
						$('.mySaleCon').html(con)
						console.log(con)
					
					
					}else{
						$('.mySaleTopC').removeClass("mySaleHide")
					}
				
					
					$('.mySaleCon').on('click','a',function(){
						var index=$(this).index();
						shouhuo = {//点击售后详情存在本地得售后数据
					        'odr_orderID':$('.mySaleCon').find('a').eq(index).find($('.mySC')).attr('odr_orderID'),
					       	'orderNumber':$('.mySaleCon').find('a').eq(index).find($('.mySC')).attr('orderNumber'),
					       	'CreateTime':$('.mySaleCon').find('a').eq(index).find($('.mySC')).attr('CreateTime'),
					       	'FinishTime':$('.mySaleCon').find('a').eq(index).find($('.mySC')).attr('FinishTime'),
					       	'CancerTime':$('.mySaleCon').find('a').eq(index).find($('.mySC')).attr('CancerTime'),
					       	'ReturnNewOrderID':$('.mySaleCon').find('a').eq(index).find($('.mySC')).attr('ReturnNewOrderID'),
					       	'RefurnNewOrder':$('.mySaleCon').find('a').eq(index).find($('.mySC')).attr('RefurnNewOrder'),
					       	'rowindex':$('.mySaleCon').find('a').eq(index).find($('.mySC')).attr('rowindex'),
					       	'ProductPic':$('.mySaleCon').find('a').eq(index).find($('.mySaleCon').find('a').eq(index).find($('.mySC'))).attr('ProductPic'),
					       	'ProductName':$('.mySaleCon').find('a').eq(index).find($('.mySC')).attr('ProductName'),
					       	'SumMoney':$('.mySaleCon').find('a').eq(index).find($('.mySC')).attr('SumMoney'),
					       	'ReturnChangeCount':$('.mySaleCon').find('a').eq(index).find($('.mySC')).attr('ReturnChangeCount'),
					       	'Price':$('.mySaleCon').find('a').eq(index).find($('.mySC')).attr('Price'),
					       	'pro_productID':$('.mySaleCon').find('a').eq(index).find($('.mySC')).attr('pro_productID'),
					       	'lgs_DistributionUnit':$('.mySaleCon').find('a').eq(index).find($('.mySC')).attr('lgs_DistributionUnit'),
					       	'ExprCompRemark':$('.mySaleCon').find('a').eq(index).find($('.mySC')).attr('ExprCompRemark'),
					       	'Waybill':$('.mySaleCon').find('a').eq(index).find($('.mySC')).attr('Waybill')
					    };
					    console.log(shouhuo)
					    localStorage.setItem('shouhuo',JSON.stringify(shouhuo))	
				    })
				}
			})
			
		}
	};
	mySaleObj.init();
})