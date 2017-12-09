$(function(){
	var depreciateObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		user_id:null,
		PageIndex:3,
		PageSize:4,
		init:function(){
			this.render();
			this.bindEvent();
		},
		getId:function(){
			this.user_id=localStorage.getItem('id');
		},
		bindEvent:function(){
			$('.goback').on('click',function(){
				window.history.back()
			})
		},
		render:function(){
			var that=this;
			this.getId();
			console.log(this.user_id);
			$.ajax({
				url:that.urlPath+"/SeR/Get_InformMessage",
				type:'get',
				data: { 
                	user_id:that.user_id,
                	type:3,
                	PageIndex:that.pageIndex,
                	PageSize:that.pageSize
                },
                dataType: "json",
                success:function(res){
                	console.log(res);
           			var arr=JSON.parse(res.info);
           			if(!arr[0]){
           				$('.main .noResult').show().siblings().hide();
           			}else{
           				$('.main ul').show().siblings().hide();
           				var content='';
           				for(var i=0;i<arr.length;i++){
           					content	+=	'<li>'
									+		'<a href="detail.html?'+arr[i].jj_proid+'">'
									+			'<h3 class="over">'+arr[i].jj_title+'</h3>'
									+			'<div class="upLoadTime">'+arr[i].pushtime+'</div>'
									+			'<div class="picWrapper">'
									+				'<img src="'+that.imgPath+arr[i].jj_pic+'"/>'
									+			'</div>'
									+			'<div class="clearfix activityEntry">'
									+				'<div class="subtitle l">'+arr[i].jj_content+'</div>'
									+				'<div class="r iconfont icon-gengduo"></div>'
									+			'</div>'
									+		'</a>'
									+	'</li>'
           				}
           				$('.main ul').append(content);
           			}
				}
			});
		}
	};
	depreciateObj.init();
})