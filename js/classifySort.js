$(function(){
	var classifySortObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		searchvalue:null,
		index:1,
		pageSize:8,
		sort:'销量',
		c_no:null,
		source:null,
		flag:0,
		init:function(){
			this.getId();
			this.bindEvent();
			this.scrollLoad();
		},
		getId:function(){
			var that=this;
			var hr=window.location.href;
			this.searchvalue=hr.split('?')[1];
			var cno=hr.split('?')[2];
			switch(cno){
				case 'bj':
					that.c_no="白酒";
					break;
				case 'ptj':
					that.c_no="葡萄酒";
					break;
				case 'yj':
					that.c_no="洋酒";
					break;
				case 'hj':
					that.c_no="黄酒";
					break;
				case 'ysj':
					that.c_no="养生酒";
					break;
				case 'pj':
					that.c_no="啤酒";
					break;
				case 'jjzb':
					that.c_no="酒具周边";
					break;
			}
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
			//筛选
			$('.filter').on('click',function(){
				if(!$('.chooseContent ul li')[0]){
					that.loadCondition();
				}
				$('.choose').show();
			});
			//返回上个子页面
			$('.revert').on('click',function(){
				$('.choose').hide();
			});
			//排序切换
			$('.tColum').on('click',function(){
				$('.goodsArea ul').removeClass('twoColumn').addClass('rowSort');
			});
			$('.rSort').on('click',function(){
				$('.goodsArea ul').removeClass('rowSort').addClass('twoColumn');
			});
			//返回上个子页面
			$('.revert2').on('click',function(){
				$('.options').hide();
				$('.chooseContent').show();
			});
			//进入参数
			$('.chooseContent ul').on('click','li',function(){
				$('.chooseContent').hide();
				$('.options').show();
				that.source=$(this).find('.category').text();
				console.log(that.source);
				that.screenOut(that.source);
			});
			//选择参数
			$('.options ul').on('click','li',function(){
				var hasValue=$(this).find('.nameItem').text();
				var idValue=$(this).data('id');
				$('.category').each(function(){
					if($(this).text()==that.source){
						$(this).siblings('.selectedValue').css('color','#fab022').text(hasValue).attr('data-id',idValue);
					}
				});
				$('.options').hide();
				$('.chooseContent').show();
			});
			//提交参数
			$('.makeSure').on('click',function(){
				var str='';
				$('.chooseContent ul li .selectedValue').each(function(){
					str+=JSON.stringify($(this).data('id'))+',';
				})
				str=str.substring(0,str.length-1);
				that.searchvalue=str;
				that.loadData();
				$('.choose').hide();
				$('.filter').addClass('redWord').siblings().removeClass('redWord');
				$('.optionBar').children().children().removeClass('redWord');
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
			        	that.index++;
			        	that.flag=1;
						that.loadData('goScroll');
					}
		       };
			})
		},
		loadData:function(param){
			var that=this;
			if(param!='goScroll'){
        		that.index=1;
        	};
			$.ajax({
				url:that.urlPath+"/SER/GetSearcTiJiaoResult",
				type:'get',
				data: { 
                	searchvalue:that.searchvalue,
                	index:that.index,
                	pageSize:that.pageSize,
                	sort:that.sort,
                },
                dataType: "json",
                success:function(res){
                	console.log(res);
                	if(res.info=='暂无数据'){
                		if(that.index==1){
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
		},
		screenOut:function(param){
			var that=this;
			$.ajax({
				url:that.urlPath+"/SeR/GetSearcTiJiao",
				type:'get',
				data: { 
                	c_no:that.c_no
                },
                dataType: "json",
                success:function(res){
                	console.log(res);
           			var str=JSON.parse(res.info);
           			var cn='';
           			var cx=null;
           			for(var i in str){
           				if(that.dealData(i)==param){
           					console.log(str,i);
           					cx=str[i]
           				}
           			};
           			console.log(cx);
              		for(var j=0;j<cx.length;j++){
						cn	+=	'<li class="clearfix borB" data-id="'+cx[j].id+'">'
							+		'<div class="nameItem l">'+cx[j].name+'</div>'
							+		'<div class="iconfont icon-dagou r selected"></div>'
							+	'</li>'
              		};
                  	$('.options ul').html(cn);
                  	$('.options').find('.pageTitle').html(param);
	           	}
          	})
		},
		loadCondition:function(){
			var that=this;
			$.ajax({
				url:that.urlPath+"/SeR/GetSearcTiJiao",
				type:'get',
				data: { 
                	c_no:that.c_no
                },
                dataType: "json",
                success:function(res){
           			var str=JSON.parse(res.info);
           			var box="";
           			for(var i in str){
           				box	+=	'<li class="clearfix">'
							+		'<div class="category l">'+that.dealData(i)+'</div>'
							+		'<p class="iconfont icon-gengduo r"></p>'
							+		'<div class="selectedValue r" data-id="-1">全部</div>'
							+	'</li>'
           			}
           			$('.chooseContent ul').html(box);
           		}
         	});
		}
	};
	classifySortObj.init();
})