$(function(){
	var personalCenterObj={
		imgPath:'http://img0.gjw.com',
		urlPath:'http://g.china-mail.com.cn',
		init:function(){
			this.bindEvent();
			this.render();
		},
		bindEvent:function(){
			var that=this;
			$('.goback').on('click',function(){
				window.history.back()
			});
			$('.touxiang').on('click',function(){
				$('.pcMask').removeClass('pCHide');
				$('.pcMaskContent').find('div').on('click',function(){
					$('.pcMask').addClass('pCHide');
				
				})
				$('.pcMask').on('click',function(){
					$('.pcMask').addClass('pCHide');

				})
				$(".columnPic").change(function(){
		
				   readURL(this);
//					var src=$('.touxiang').find('img').attr('src').split(',');
//					var srcAdd=src[src.length-1]
//					console.log(src)
//					$.ajax({
//						type:"post",
//						url:that.imgPath+"/SER/getUpload",
//						async:true,
//						data:{
//							file:srcAdd
//						},
//						success:function(res){
//							console.log(res)
//						}
//					});
				
				});	
				//点击保存
				$.ajax({
//					type:"post",
//					url:that.urlPath+"/SER/EditInfor",
//					async:true,
//					data:{
//						id:localStorage.getItem('id'),
//						nickname:$('.pName').find('textarea').val(),
//						sex:$('.pSex').find('select').val(),
//						photo:,
//						mobile:localStorage.getItem('phone'),
//						birth
//					},
//					success:function(res){
//						
//					}
				});
			})
			function readURL(input) {
				console.log(1)
			  if (input.files && input.files[0]) {		
			       var reader = new FileReader();	
					console.log(reader)
			       reader.onload = function (e) {	
					console.log(e.target.result)
			           $('#blah').attr('src', e.target.result);
						
						var src=e.target.result.split(',');
						var srcAdd=src[src.length-1]
						console.log(src,src.length,srcAdd)
						function dataURLtoBlob(dataurl) {
						  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
						    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
						  while(n--){
						    u8arr[n] = bstr.charCodeAt(n);
						  }
						  return new Blob([u8arr], {type:mime});
						}
						$.ajax({
							type:"post",
							url:that.urlPath+"/SER/getUpload",
							async:true,
							data:{
								file:dataURLtoBlob(e.target.result)
							},
							success:function(res){
								console.log(res)
							}
						});
			       }						
			       reader.readAsDataURL(input.files[0]);						
			   }			
			}		
		},
		render:function(){
			var that=this;
			$.ajax({
				type:'get',
				url:that.urlPath+'/SER/SelfInfor',
				data:{
					id:localStorage.getItem('WP_id'),
					vastr:$.md5("!@#$"+localStorage.getItem('WP_id')+"*&^%")
				},
				success:function(res){
					console.log(res,typeof(res))
					var str=JSON.parse(res).data;
					$('.pTouxiang').find('img').attr('src',str.avatar);
					$('.pPhone').find('em').html(str.mob)
					$('.pName').find('textarea').html(str.name)
					//$('.pSex').find('select').val(str.)没数据
				}
			})
		}
	};
	personalCenterObj.init();
})
	
