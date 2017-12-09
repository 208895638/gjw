$(function(){
	var secKillObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		userid:0,
		current_page:1,
		page_size:6,
		inDex:0,
		tid:null,
		starttime:null,
		ctd:null,
		init:function(){
			this.bindEvent();
			this.render();
		},
		bindEvent:function(){
			var that=this;
			$('.goback').on('click',function(){
				window.history.back()
			});
			$('.timeList').on('click','li',function(){
				that.tid=JSON.parse($(this).attr('id'));
				that.starttime=$(this).attr('startDate');
				that.inDex=$(this).index();
				if($(this).find('p').html()=="正在进行"){
					$('.remindLabel').html('抢购中');
					$('.timeLabel').html('距结束: ');
				}else{
					$('.remindLabel').html('秒杀预告');
					$('.timeLabel').html('距开始: ');
				};
				$(this).addClass('clickSelect').siblings().removeClass('clickSelect');
				if(!$('.goodsList ul').eq(that.inDex).find('li')[0]){
					that.loadData(that.userid,that.tid,that.current_page,that.page_size,that.starttime,that.inDex);
				};
				$('.goodsList ul').eq($(this).index()).show().siblings().hide();
				if(that.inDex==0){
					window.clearInterval(that.ctd);
					var st=$('.timeList li').eq(that.inDex).attr('startdate');
					var et=$('.timeList li').eq(that.inDex).attr('endTime');
					console.log(st,et);
					that.countDown(st,et);
				}else{
					window.clearInterval(that.ctd);
					var st=$('.timeList li').eq(that.inDex).attr('startdate');
					var bt=$('.timeList li').eq(that.inDex).find('h4').html();
					that.countDown(st,bt);
				}
			})
		},
		loadData:function(user_id,tid,current_page,page_size,starttime,index){
			var that=this;
			$.ajax({
				type:"get",
				url:that.urlPath+"/SER/GetMiaoShaQiangGou",
				data:{
					userid:that.userid,
					tid:that.tid,
					current_page:current_page,
					page_size:page_size,
					starttime:starttime,
				},
				dataType: "json",
				success:function(res){
					var result=JSON.parse(res.info);
					var content="";
					var isCanBuy='';
					if($('.timeList li').eq(index).find('p').html()=="正在进行"){
						for(var i=0;i<result.length;i++){
							if(result[i].has_by<result[i].抢购数量){
								isCanBuy="去抢购";
							}else{
								isCanBuy="抢光了";
							}
							content	+=	'<li tid="'+result[i].tid+'" goBuyNum="'+result[i].抢购数量+'" limitedBuyNum="'+result[i].限购数量+'" isclocked="'+result[i].isclocked+'" clock_num="'+result[i].clock_num+'" has_by="'+result[i].has_by+'">'
								+		'<a href="detail.html?'+result[i].id+'?'+result[i].qid+'" class="clearfix">'
								+			'<img src="'+that.imgPath+result[i].图片路径+'" alt="" class="l"/>'
								+			'<div class="secKillContent l">'
								+				'<p class="over2">'+result[i].品名+'</p>'
								+				'<div class="secKillPrice">'
								+					'<strong>¥ <i>'+result[i].秒杀价+'</i></strong>'
								+					'<del>¥ <i>'+result[i].本站价+'</i></del>'
								+				'</div>'
								+				'<div class="btnWrapper">'
								+					'<span class="buyBtn">'+isCanBuy+'</span>'
								+				'</div>'
								+			'</div>'
								+		'</a>'
								+	'</li>'
						}
						$('.selling').append(content);
					}else{
						var beiginTime=$('.timeList li').eq(index).find('h4').html();
						for(var i=0;i<result.length;i++){
							content	+=	'<li class="clearfix" tid="'+result[i].tid+'" goBuyNum="'+result[i].抢购数量+'" limitedBuyNum="'+result[i].限购数量+'" isclocked="'+result[i].isclocked+'" clock_num="'+result[i].clock_num+'" has_by="'+result[i].has_by+'">'
									+		'<a href="detail.html?'+result[i].id+'?'+result[i].qid+'" class="l picWrapper">'
									+			'<img src="'+that.imgPath+result[i].图片路径+'" alt=""/>'
									+		'</a>'
									+		'<div class="secKillContent l">'
									+			'<a href="detail.html?'+result[i].id+'" class="nameWrapper">'
									+				'<p class="over2">'+result[i].品名+'</p>'
									+			'</a>'
									+			'<div class="secKillPrice clearfix">'
									+				'<a href="detail.html?'+result[i].id+'" class="l">'
									+					'<strong>¥ <i>'+result[i].秒杀价+'</i></strong>'
									+					'<del>¥ <i>'+result[i].本站价+'</i></del>'
									+					'<div class="remindTime"><i>'+beiginTime+'</i>点准时开抢</div>'
									+				'</a>'
									+				'<div class="remindBtn iconfont icon-36 r">提醒我</div>'
									+				'<div class="cancelRemindBtn iconfont icon-36 r">取消提醒</div>'
									+			'</div>'
									+		'</div>'
									+	'</li>'
						}
						$('.goodsList ul').eq(index).append(content);
					}
				}
			})
		},
		countDown:function(startDate,EorBTime){
			var that=this;
			var sd=startDate.replace(/\-/g, "/");
			EorBTime=EorBTime+':00';
			console.log(sd,EorBTime);
			if(EorBTime=="24:00:00"){
				sd=that.dateAdd(sd);
				EorBTime='00:00:00';
			}
			console.log(sd,EorBTime);
			that.ctd=setInterval(function(){
				var EndTime= new Date(sd+' '+EorBTime); //截止时间 
				var NowTime = new Date();
				var t =EndTime.getTime() - NowTime.getTime();
				var h=that.addZero(Math.floor(t/1000/60/60%24)); 
				var m=that.addZero(Math.floor(t/1000/60%60)); 
				var s=that.addZero(Math.floor(t/1000%60));
				$('.panicBuying i').html(h+':'+m+':'+s);
			},1000);
		},
		addZero:function(n){
			    if(n < 10)
			        return "0" + n;
			    else
			        return n;
		},
		dateAdd:function(startDate) {
	        startDate = new Date(startDate);
	        startDate = +startDate + 1000*60*60*24;
	        startDate = new Date(startDate);
	        var nextStartDate = startDate.getFullYear()+"/"+(startDate.getMonth()+1)+"/"+startDate.getDate();
        	return nextStartDate;
    	},
		render:function(){
			var that=this;
			$.ajax({
				type:"get",
				url:that.urlPath+"/SER/GetHuodong_time",
				data:{
					type:1
				},
				dataType: "json",
				success:function(res){
					var result=JSON.parse(res.info);
					var content="";
					for(var i=0;i<result.length;i++){
						content	+= 	'<li class="l" id="'+result[i].id+'" startDate="'+result[i].startDate+'" endTime="'+result[i].endTime+'">'
								+		'<h4>'+result[i].beginTime+'</h4>'
								+		'<p>即将开始</p>'
								+	'</li>'
					};
					$('.timeList').html(content);
					var StartTime= new Date((result[0].startDate).replace(/-/g, "/")+' '+result[0].beginTime+':00'); //开始时间 
					var Nowtime = new Date(); 
					if(StartTime-Nowtime<0){
						$('.timeList li').eq(0).addClass('clickSelect').find('p').html('正在进行');
						that.countDown(result[0].startDate,result[0].endTime);
					}else{
						that.countDown(result[0].startDate,result[0].beginTime);
					};
					that.tid=JSON.parse($('.timeList li').eq(0).attr('id'));
					that.starttime=$('.timeList li').eq(0).attr('startDate');
					that.loadData(that.userid,that.tid,that.current_page,that.page_size,that.starttime,that.inDex);
				}
			});
		}
	};
	secKillObj.init();
})