$(function(){
	var newInvoiceObj={
		init:function(){
			this.bindEvent();
		},
		bindEvent:function(){
			var that=this;
			$('.goback').on('click',function(){
				window.history.back()
			});
			$('.newInvoiceTop').find('p').on('click',function(){
				var i=$(this).index();
				$(this).addClass('borderAll').siblings().removeClass('borderAll');
				if(i==1){
					$('.newInvoiceContent').addClass('newInvoiceHide');
				}
				if(i==0){
					$('.newInvoiceContent').removeClass('newInvoiceHide');
				}
			});
			$('.newInvoiceBottom').find('span').on('click',function(){
				$(this).find('b').addClass('borderColor').parent().siblings().find('b').removeClass('borderColor');
			});
			$('textarea').on('input',function(){
				var content=$(this).val();
				$(this).val(that.dealData(content));
				if(content.length>50){
					content=content.substring(0,50);
					$(this).val(content);
				};
			});
			$('.newInvoiceBtn').on('click',function(){
				var fpInfo='';
				if($('.borderAll').text()=='不需要发票'){
					fpInfo=$('.borderAll').text()
				}else{
					fpInfo=$('textarea').val().trim()+' '+$('.borderColor').parent().text().trim();
				};
				localStorage.setItem('fpInfo',fpInfo);
				window.location.href='fillOrder.html';
			});
		},
		dealData:function(value) {
			var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；： ”“'。，、？]") 
			var rs = ""; 
			for (var i = 0; i < value.length; i++) {
			rs = rs+value.substr(i, 1).replace(pattern, ''); 
			} 
			return rs;
		}
	};
	newInvoiceObj.init();
})