$(function(){
	var searchObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		arrRecord:null,
		init:function(){
			this.getRecords();
			this.bindEvent();
			this.render();
		},
		bindEvent:function(){
			var that=this;
			$('.goback').on('click',function(){
				window.history.back()
			});
			$('.icon-lajitong').on('click',function(){
				localStorage.removeItem('searchRecord');
				$('.searchRecord li').remove();
				that.arrRecord=null;
			});
			$('.search input').on('input',function(){
				var searchValue=$(this).val().trim();
				console.log(searchValue);
				if(searchValue!=''){
					$('.searchDefault').hide();
					$('.searchAnswers').show();
					that.loadData(searchValue);
				}else{
					$('.searchAnswers').hide();
					$('.searchDefault').show();
				}
			});
			$('.search input').on('keypress',function(e){
				var keycode = e.keyCode;  
                var searchName = $(this).val();  
                if(keycode=='13') {  
                    e.preventDefault();
                   	window.location.href='searchSort.html?'+encodeURI(searchName);
                }
			})
		},
		render:function(){
			var that=this;
			$.ajax({
				url:that.urlPath+"/SER/GetHotWords",
				type:'get',
                dataType: "json",
                success:function(res){
                	if(res.state==0){
               			return;
                }else{
                	var result=JSON.parse(res.info);
                	var content="";
                	for(var i=0;i<result.length;i++){
                		content	+= '<li class="l"><a href="searchSort.html?'+encodeURI(result[i].热搜词)+'">'+result[i].热搜词+'</a></li>'
                	}
                	$('.hotSearch ul').html(content);
                	}
                }
            });
            $.ajax({
				url:that.urlPath+"/SeR/GetDefaultWords",
				type:'get',
                dataType: "json",
                success:function(res){
                	if(res.state==0){
               			return;
	                }else{
	                	var result=res.info;
	                	$('.search input').attr('placeholder',result);
	                }
                }
            })
		},
		loadData:function(param){
			var that=this;
			$.ajax({
				url:that.urlPath+"/SER/FuzzySearch",
				type:'get',
                dataType: "json",
                data:{
                	ProName:param
                },
                success:function(res){
                	if(res.state==0){
               			return;
	                }else{
	                	var result=JSON.parse(res.info);
	                	var content='';
	                	for(var i=0;i<result.length;i++){
	                		content	+=	'<li ProductId="'+result[i].ProductId+'" data-id="'+result[i].id+'">'
									+		'<a href="searchSort.html?'+encodeURI(result[i].品名)+'" class="over">'+result[i].品名+'</a>'
									+	'</li>'
	                	}
	                	$('.searchAnswers').html(content);
	                }
                }
            })
		},
		getRecords:function(){
			if(!localStorage.getItem('searchRecord')){
				this.arrRecord=[];
			}else{
				this.arrRecord=JSON.parse(localStorage.getItem('searchRecord'));
				var content='';
				for(var i=0;i<this.arrRecord.length;i++){
					content	+=	'<li class="l"><a href="searchSort.html?'+encodeURI(this.arrRecord[i])+'">'+this.arrRecord[i]+'</a></li>'
				};
				$('.searchRecord').html(content);
			}
		}
	};
	searchObj.init();
})