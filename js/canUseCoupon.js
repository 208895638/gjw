$(function(){
	var canUseCouponObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		WP_id:null,
		cartid:null,
		product_counts:null,
		init:function(){
			this.bindEvent();
			this.getData();
			this.render();
		},
		bindEvent:function(){
			$('.goback').on('click',function(){
				window.history.back()
			});
			$('ul').on('click','li',function(){
				var ecoupon_id=$(this).attr('id');
				var ecoupon_fee=$(this).find('h2').html().split(' ')[1];
				console.log(ecoupon_id,ecoupon_fee);
				localStorage.setItem('ecoupon_id',ecoupon_id);
				localStorage.setItem('ecoupon_fee',ecoupon_fee);
				window.location.href="fillOrder.html";
			});
		},
		getData:function(){
			var hr=window.location.href;
			this.product_counts=hr.split('?')[1];
			this.WP_id=localStorage.getItem('WP_id');
			this.cartid=localStorage.getItem('cartid');
			this.cartid=this.cartid.substring(0,this.cartid.length-1);
		},
		render:function(){
			var that=this;
			console.log(that.WP_id,that.cartid,that.product_counts)
			$.ajax({
				url:that.urlPath+"/h_user/encoupon_usecheck",
				type:'post',
				data: { 
					user_id:that.WP_id,
					product_ids:that.cartid,
					product_counts:that.product_counts,
                },
                dataType: "json",
                success:function(res){
                	console.log(res);
                	if(res.data==''){
                		alert(res.msg);
                		$('.goodsCollectionPage').show();
                		$('.couponTabBottomC').hide();
                	}else{
                		var result=res.data;
                		var content='';
                		for(var i=0;i<result.length;i++){
                			content	+=	'<li class="clearfix fontAll" ID="'+result[i].ID+'" Name="'+result[i].Name+'" Password="'+result[i].Password+'" Number="'+result[i].Number+'" Mystate="'+result[i].Mystate+'" rowindex="'+result[i].rowindex+'">'
									+		'<div class="l couponTabBottomLeft">'
									+			'<h2 class="fontAll">¥ '+result[i].Value+'</h2>'
									+			'<h3 class="fontAll">满'+result[i].LimitMoney+'使用</h3>'
									+		'</div>'
									+		'<div class="l couponTabBottomCenter fontAll">'
									+			'<h5>'
									+				'<span class="fontAll">生效期：</span>'
									+				'<em class="fontAll">'+that.dealData(result[i].StartTime)+'</em>'
									+			'</h5>'
									+			'<h6>'
									+				'<span class="fontAll">有效期至：</span>'
									+				'<em class="fontAll">'+that.dealData(result[i].EndTime)+'</em>'
									+			'</h6>'
									+		'</div>'
									+		'<div class="r couponTabBottomRight">'
									+		'<img src="../img/ksy.png" alt="" />'
									+		'</div>'
									+	'</li>'
                		}
                		$('.couponTabBottomC ul').html(content);
                	}
                }
          	});
		},
		dealData:function(str){
			return str.split('T')[0];
		}
	};
	canUseCouponObj.init();
})