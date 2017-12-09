$(function(){
    var saleDetailObj={
        imgPath:'http://img0.gjw.com',
        urlPath:'http://g.china-mail.com.cn',
        init:function(){
            this.bindEvent();
            this.render();
        },
        bindEvent:function(){
            $('.goback').on('click',function(){
                window.history.back()
            });
            
        },
        render:function(){
            var that=this;
            var url=decodeURI(location.search.substring(1,999).split("?")[0]);
            console.log(url);
            var con=JSON.parse(localStorage.getItem('shouhuo'));
            console.log(con)
            var kuaidi='';
            var dingdan='';
            if(con.ExprCompRemark == 5){
                kuaidi='宅急送'
            }else if(con.ExprCompRemark == 25){
                kuaidi='圆通快递'
            }else if(con.ExprCompRemark == -1){
                kuaidi='其他'
            }else{
              kuaidi=''  
            }
            var q=con.orderNumber;
            
            if(q=='null'){
                q='';
            }else{
                q=con.orderNumber
            }
            var w=con.ProductPic;
            if(w=='null'){
                w='';
            }else{
                w=con.ProductPic
            }
            var e=con.ProductName;
            if(e=='null'){
                e='';
            }else{
                e=con.ProductName
            }
            var r=con.Price;
            if(r=='null'){
                r='';
            }else{
                r=con.Price
            }
            var t=con.ReturnChangeCount;
            if(t=='null'){
                t='';
            }else{
                t=con.ReturnChangeCount
            }
            var y=con.Price;
            if(y=='null'){
                y='';
            }else{
                y=con.Price
            }
            var u=con.SumMoney;
            if(u=='null'){
                u='';
            }else{
                u=con.SumMoney
            }
            var i=con.Waybill;
            if(i=='null'){
                i='';
            }else{
                i=con.Waybill
            }
            var o=con.CreateTime;
            if(o=='null'){
                o='';
            }else{
                o=con.CreateTime
            }
            var p=con.CancerTime;
            if(p=='null'){
                p='';
            }else{
                p=con.CancerTime
            }
            var a=con.FinishTime;
            if(a=='null'){
                a='';
            }else{
                a=con.FinishTime
            }
            
           console.log(q,w,e,r,t,y,u,i,o,p,a)
            var con=JSON.parse(localStorage.getItem('shouhuo'))
            $('.shxqT').find('li').eq(0).find('i').html(q)
            $('.shxqT').find('li').eq(1).find('i').html(url)
            
            $('.shxqC').find('li').eq(0).find('img').attr('src',w)
            $('.shxqC').find('li').eq(1).html(e)
            $('.shxqC').find('li').eq(2).find('em').html(r)
            $('.shxqC').find('li').eq(2).find('i').html(t)
            
            $('.shxqB').find('li').eq(0).find('b').html(y)
            $('.shxqB').find('li').eq(1).find('b').html(u)
            $('.shxqB').find('li').eq(2).find('b').html(kuaidi)
            $('.shxqB').find('li').eq(3).find('b').html(i)
            $('.shxqB').find('li').eq(4).find('b').html(o)
            $('.shxqB').find('li').eq(5).find('b').html(p)
            $('.shxqB').find('li').eq(6).find('b').html(a)
        }
    };
    saleDetailObj.init();
})