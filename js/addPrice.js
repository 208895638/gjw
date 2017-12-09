$(function(){
	var addPriceObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		user_id:null,
		jjgId:null,
		selectedGood:null,
		price:null,
		init:function(){
			this.bindEvent();
			this.getData();
			this.selected();
		},
		bindEvent:function(){
			var that=this;
			$('.goback').on('click',function(){
				window.history.back()
			});
			$('button').on('click',function(){
				$.ajax({
					type:'get',
					url:that.urlPath+'/SeR/AddJiaJiaGouCart',
					data: { 
	                	parent_gid:that.selectedGood,
	                	num:1,
	                	child_gid:that.jjgId,
	                	price:that.price,
	                	userid:that.user_id,
	                },
	                dataType: "json",
	                success:function(res){
	                	console.log(res);
						window.location.href='../index.html#cart';
					}
	          });
			})
		},
		getData:function(){
			var hr=window.location.href;
			var str=decodeURI(hr.split('?')[2]);
			this.selectedGood=hr.split('?')[1];
			this.user_id=localStorage.getItem('id');
			var arr=JSON.parse(str);
			console.log(arr);
			var content='';
			for(var i=0;i<arr.length;i++){
				content	+=	'<li class="clearfix" data-id="'+arr[i].id+'" data-xg="'+arr[i].xian_gou+'">'
						+		'<div class="selectWrapper l">'
						+			'<input type="radio" class="selectItem"/>'
						+		'</div>'
						+		'<a class="addPrice clearfix l">'
						+			'<img src="'+this.imgPath+arr[i].图片路径+'" class="l" alt="" />'
						+			'<div class="l moR">'
						+				'<p class="over2"><span>【加价购】</span><i>'+arr[i].品名+'</i></p>'
						+				'<div class="giftsNum">¥<i>'+arr[i].price+'</i></div>'
						+			'</div>'
						+		'</a>'
						+	'</li>'
			};
			$('ul').html(content);
		},
		selected:function(){
			var that=this;
			$('ul').on('change','input[type=radio]',function(){
				if($(this).prop('checked')){
					$(this).css('background-image','url(../img/yes.png)').parents('li').siblings().find('input[type=radio]').css('background-image','url(../img/no.png)');
					that.jjgId=$(this).parents('li').data('id');
					that.price=$(this).parents('li').find('.giftsNum').find('i').text();
					$('button').removeAttr('disabled').css('background','#cd0011');
					console.log(that.selectedGood,that.jjgId,that.price,that.user_id)
				}else{
					$(this).css('background-image','url(../img/no.png)');
				}
			});
		}
	};
	addPriceObj.init();
})