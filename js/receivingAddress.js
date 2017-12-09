$(function(){
	var receivingAddressObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		user_id:null,
		addrid:null,
		name:null,
		tel:null,
		address:null,
		area_id:null,
		isaddr:0,
		state:false,
		init:function(){
			this.bindEvent();
			this.getData();
		},
		getData:function(){
			var hr=window.location.href;
			this.user_id=localStorage.getItem('WP_id');
			if(hr.split('?')[1]&&hr.split('?')[1]!='#'){
				this.state=true;
				this.addrid=hr.split('?')[7];
				this.name=decodeURI(hr.split('?')[2]);
				this.tel=hr.split('?')[3];
				this.address=decodeURI(hr.split('?')[4]);
				this.area_id=hr.split('?')[5];
				this.isaddr=hr.split('?')[6];
				var address3=decodeURI(hr.split('?')[1]);
				$('#recevingMan').val(this.name);
				$('#recevingPhone').val(this.tel);
				$('#recevingAddres').val(this.address);
				$('#consignee').attr('isaddr',this.isaddr);
				$('#showCityPicker3').html(address3).attr('addressid',this.area_id);
				console.log(address3,this.area_id)
				if(this.isaddr==1){
					$('#consignee .off').show().siblings().hide();	
				}else{
					$('#consignee .show').show().siblings().hide();	
				};
			}
		},
		bindEvent:function(){
			var that=this;
			$('.goback').on('click',function(){
				window.history.back()
			});
			$('#consignee img').on("click",function(){
				that.isaddr++;
				that.isaddr=that.isaddr%2;
				console.log(that.isaddr);
				$('#consignee').attr('isaddr',that.isaddr);
				$(this).hide().siblings().show();
			});
			$('button').on('click',function(){
				      var phone = $("#recevingPhone").val();
				      var flag = false;
				      var message = "";
				      var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;       
				      if(phone == ''){
				        alert ("手机号码不能为空！") ;
				      }else if(phone.length !=11){
				       alert("请输入有效的手机号码！");
				      }else if(!myreg.test(phone)){
				        alert("请输入有效的手机号码！");
				      }else{
							console.log(that.state);
				         if(that.state){
	//				     	修改收货地址
							console.log(that.state,that.user_id,that.addrid,$('#recevingMan').val(),$('#recevingPhone').val(),$('#recevingAddres').html().trim(),$('#showCityPicker3').attr('addressid'),$('#consignee').attr('isaddr'))
							$.ajax({
								type:"get",
								url:that.urlPath+"/SER/addressEdit",
								async:true,
								data:{
									userid:that.user_id,
									addrid:that.addrid,
									name:$('#recevingMan').val().trim(),
									tel:$('#recevingPhone').val().trim(),
									address:$('#recevingAddres').val().trim(),
									area_id:$('#showCityPicker3').attr('addressid').trim(),
									isaddr:$('#consignee').attr('isaddr').trim()
								},
								success:function(res){
									console.log(res)
									alert(JSON.parse(res).msg);
									var hr=window.location.href;
									if(hr.split('?')[1]&&hr.split('?')[hr.split('?').length-1]=='#'){
										window.location.href='addressMange.html?#';
									}else{
										window.location.href='addressMange.html';
									}
								}
							});
						}else{
							//新增收货地址
							console.log(that.state,that.user_id,$('#recevingMan').val(),$('#recevingPhone').val(),$('#recevingAddres').html().trim(),$('#showCityPicker3').attr('addressid'),$('#consignee').attr('isaddr'))
							$.ajax({
								type:"get",
								url:that.urlPath+"/SER/Addaddress",
								async:true,
								data:{
									userid:that.user_id,
									name:$('#recevingMan').val().trim(),
									tel:$('#recevingPhone').val().trim(),
									address:$('#recevingAddres').val().trim(),
									area_id:$('#showCityPicker3').attr('addressid').trim(),
									isaddr:$('#consignee').attr('isaddr').trim()
								},
								success:function(res){
									console.log(res)
									alert(JSON.parse(res).msg);
									var hr=window.location.href;
									if(hr.split('?')[1]&&hr.split('?')[hr.split('?').length-1]=='#'){
										window.location.href='addressMange.html?#';
									}else{
										window.location.href='addressMange.html';
									}
								}
							});
						}
				      }
				      
			})
		}
	};
	receivingAddressObj.init();
})