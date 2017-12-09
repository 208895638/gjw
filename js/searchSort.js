$(function(){
	var searchSortObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		keyword:null,
		pageindex:1,
		pageSize:8,
		sort:'销量',
		arrRecord:[],
		flag:0,
		init:function(){
			this.getKey();
			this.bindEvent();
			this.scrollLoad();
		},
		getKey:function(){
			var hr=window.location.href;
			this.keyword=decodeURI(hr.split('?')[1]);
			$('.pageTitle').html(this.keyword);
			if(localStorage.getItem('searchRecord')){
				this.arrRecord=JSON.parse(localStorage.getItem('searchRecord'));
			};
			this.arrRecord.push(this.keyword);
			localStorage.setItem('searchRecord',JSON.stringify(this.arrRecord));
		},
		bindEvent:function(){
			var that=this;
			//返回
			$('.goback').on('click',function(){
				window.history.back()
			});
			//排序图标切换
			$('.editor').find('i').on('click',function(){
				$(this).addClass('searchHide').siblings().removeClass('searchHide');
			});
			//综合
			$('.comprehensiveT').on('click',function(){
				$('.optionBar').show();
				$('.comprehensive').show().siblings().not('.vague').hide();
			});
			$('.comprehensive .cItem').on('click',function(){
				that.sort=$(this).find('h4').text();
				$(this).addClass('redWord').siblings().removeClass('redWord').parent().siblings().children().removeClass('redWord');
				$('.comprehensiveT').addClass('redWord').siblings().removeClass('redWord');
				$('.optionBar').hide();
				that.loadData();
			});
			//销量
			$('.salePrice').on('click',function(){
				$('.optionBar').show();
				$('.priceArea').show().siblings().not('.vague').hide();
			});
			$('.priceArea .pItem').on('click',function(){
				that.sort=$(this).data('val');
				$(this).addClass('redWord').siblings().removeClass('redWord').parent().siblings().children().removeClass('redWord');
				$('.salePrice').addClass('redWord').siblings().removeClass('redWord');
				$('.optionBar').hide();
				that.loadData();
			});
			//模态框点击返回
			$('.vague').on('click',function(){
				$('.optionBar').hide();
			})
			//排序切换
			$('.tColum').on('click',function(){
				$('.goodsArea ul').removeClass('twoColumn').addClass('rowSort');
			});
			$('.rSort').on('click',function(){
				$('.goodsArea ul').removeClass('rowSort').addClass('twoColumn');
			});
			//销量
			$('.saleAccount').on('click',function(){
				that.sort=$(this).text();
				$(this).addClass('redWord').siblings().removeClass('redWord');
				$('.optionBar').children().children().removeClass('redWord');
				that.loadData();
			})
		},
		scrollLoad:function(){
			var that=this;
			this.loadData();
			$('.goodsArea').scroll(function(){
				var scrollTop = $(this).scrollTop();
		        var scrollHeight = $('.goodsArea ul').height();
		       if (scrollTop+$('body').height()>scrollHeight) {
			       	if(that.flag==0){
				   		that.flag=1;
			        	that.pageindex++;
						that.loadData('goScroll');
					}
		       };
			})
		},
		loadData:function(param){
			var that=this;
			if(param!='goScroll'){
        		that.pageindex=1;
        	};
			$.ajax({
				url:that.urlPath+"/SER/Search",
				type:'get',
				data: { 
                	keyword:that.keyword,
                	pageindex:that.pageindex,
                	pageSize:that.pageSize,
                	sort:that.sort,
                	orderby:'',
                	userid:''
                },
                dataType: "json",
                success:function(res){
                	console.log(res);
                	if(res.state==0){
                		if(that.pageindex==1){
                			$('.noResult').show().siblings().hide();
                		};
                	}else{
                		var result=JSON.parse(res.info);
	               		var content='';
	                	for(var i=0;i<result.length;i++){
		                	content	+= 	'<li  row_number='+result[i].row_number+' regtime='+result[i].regtime+' regtime='+result[i].regtime+' ProductId='+result[i].ProductId+' saleAccount='+result[i].销量+'>'
									+		'<a href="detail.html?'+result[i].id+'" class="clearfix">'
									+			'<div class="picWrapper">'
									+				'<img src="'+that.imgPath+result[i].图片路径+'" alt="" />'
									+			'</div>'
									+			'<div class="contentWrap"><p class="over2">'+result[i].品名+'</p>'
									+			'<div class="discount">'+that.dealDiscount(result[i].优惠条件)+'</div>'
									+			'<div class="price">'
									+				'<strong>¥<i>'+result[i].本站价+'</i></strong>'
									+			'</div>'
									+			'<div class="appraise"><span>'+result[i].好评+'</span>好评 &nbsp;<b>'+result[i].评价数+'</b>人评价</div>'
									+			'</div>'
									+		'</a>'
									+	'</li>'
	                	};
	                	if(param=='goScroll'){
	                		$('.goodsArea ul').append(content);
	                	}else{
	                		$('.goodsArea ul').html(content);
	                		$('.goodsArea').scrollTop(0);
	                	};
	                	that.disBg();
	                	that.flag=0;
                	}
                }
			})
		},
		dealDiscount:function(str){
			var result=str.split(',');
			var content='';
			for(var i=0;i<result.length;i++){
				content+='<i>'+result[i]+'</i>'
			}
			return content;
		},
		disBg:function(){
			var arr=$('.discount i');
			for(var i=0;i<arr.length;i++){
				if(arr.eq(i).text()=='满减'||arr.eq(i).text()=='多买多优惠'){
					arr.eq(i).css('background','#fa8322');
				}else if(arr.eq(i).text()=='买赠'||arr.eq(i).text()=='秒杀价'){
					arr.eq(i).css('background','#fa22de');
				}else if(arr.eq(i).text()=='会员价'){
					arr.eq(i).css('background','#fa2c11');
				}else if(arr.eq(i).text()=='满赠'){
					arr.eq(i).css('background','#2274fa');
				}else if(arr.eq(i).text()=='限时抢购'){
					/*var hr=arr.eq(i).parent().parent().attr('href');*/
					arr.eq(i).css('background','#fa8322')/*.parent().parent().attr('href',hr+'?ms')*/;
				}
			};
		},
		dealData:function(param){
			return param.split('_')[0];
		}
	};
	searchSortObj.init();
})