$(function(){

	var provice=$('#provice');
	var city=$('#city');
	var area=$('#area');
   var shuju=[];
    $.ajax({
      type:"POST", 
      url:'http://www.clearbos.com/BaseService.ashx',
      dataType:'jsonp',
      data:{operationType:'area'},
    success: function(data){ 
    	shuju=data.data;
    	 for (var i = 0; i < shuju.length; i++) {
    	 	if(shuju[i].parentid=='0'){
    	 		 $('<option codeid='+shuju[i].codeid+'>'+shuju[i].cityName+'</option>').appendTo(provice)
    	 	}
		
	   };
         provice.on('change',function(){
         	city.empty()
         	area.empty()
         	$('<option>市</option>').appendTo(city);
         	 $('<option>区</option>').appendTo(area)
         	var index;
         	var option=provice.find('option')
            for (var i = 0; i<option.length; i++) {
            	if(option[i].selected){
            		index=$(option[i]).attr('codeid');
     
            	}
            };
             
             var arr=[]
            for (var j = 0; j < shuju.length;j++) {
    	 	if(shuju[j].parentid==index){
    	 		 $('<option codeid='+shuju[j].codeid+'>'+shuju[j].cityName+'</option>').appendTo(city);
    	 		 arr.push(shuju[j].codeid)
    	 	 }
		
	       };
         	for(var m=0;m<arr.length;m++){
         	  for (var k = 0; k < shuju.length;k++) {
    	 	 if(shuju[k].parentid==arr[m]){
    	
    	 	 	  $('<option codeid='+shuju[k].codeid+'>'+shuju[k].cityName+'</option>').appendTo(area)
    	 	   }
		
	          };	
         	}
         	 

         })


         city.on('change',function(){
         	area.empty()
         	 $('<option>区</option>').appendTo(area)
         	var index;
         	var option=city.find('option')
            for (var i = 0; i<option.length; i++) {
            	if(option[i].selected){
            		index=$(option[i]).attr('codeid');
            	}
            };
             
            for (var j = 0; j < shuju.length;j++) {
    	 	 if(shuju[j].parentid==index){
    	
    	 		 $('<option codeid='+shuju[j].codeid+'>'+shuju[j].cityName+'</option>').appendTo(area)
    	 	}
		
	      };
         	
         })
  
    },
    error: function(){
       console.log("fail");
      }

    });
   $('<option>省份</option>').appendTo(provice)
   $('<option>市</option>').appendTo(city)
   $('<option>区</option>').appendTo(area)
  
})


