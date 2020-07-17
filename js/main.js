$(function(){
    //登录界面
    //改变选中的输入框前面logo的颜色
    var $login = $('.login');
    var $homepage = $('.homepage'); 
    var $username = $login.find('.loginmain input');
    $username[0].focus();
    $username.on('focus', function(){
        $(this).prev().css('color', 'rgb(73, 214, 219)')
    });
    $username.on('blur', function(){
        $(this).prev().css('color', '#999')
    });
    var $portrait = $('.login .loginmain .rad .img1');
    var path = null;
    $username[0].oninput = function(){
        if($(this).val() == '官思绮'){
            path = './img/2.png';
        }else{
            path = "./img/1.png";
        }
        $portrait.attr('src', path);
    }
    //判断用户名和密码是否正确
    var $sure = $('.login .loginmain .bt1');
    var $word = $('.login .loginmain .word');
    var $man = $('.login .loginmain .man');
    $sure.on('click', function(){
        var password = $word.val();
        var useMan = $man.val(); 
        if(useMan == ''){
            alert('亲，请输入用户名哟！');
        }
        else if(password == ''){
            alert('亲，请输入密码哟！');
        }
        else if(useMan == '官思绮' && password == 'guansiqi'){
            $login.hide();
            $homepage.show();
        }
        else{
            alert('亲，用户名或者密码错误哟！');
        }
    });
});


(function(window,document,undefined){
    var hearts = [];
    
    window.requestAnimationFrame = (function(){
        return window.requestAnimationFrame || 
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         function (callback){
             setTimeout(callback,1000/60);
         }
    })();
    
    init();
 
    function init(){
        css(".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: absolute;}.heart:after{top: -5px;}.heart:before{left: -5px;}");
        attachEvent();
        gameloop();
    }
 
    function gameloop(){
        for(var i=0;i<hearts.length;i++){
            if(hearts[i].alpha <=0){
                document.body.removeChild(hearts[i].el);
                hearts.splice(i,1);
                continue;
             }
 
             hearts[i].y--;
             hearts[i].scale += 0.004;
             hearts[i].alpha -= 0.013;
             hearts[i].el.style.cssText = "left:"+hearts[i].x+"px;top:"+hearts[i].y+"px;opacity:"+hearts[i].alpha+";transform:scale("+hearts[i].scale+","+hearts[i].scale+") rotate(45deg);background:"+hearts[i].color;
        }
 
        requestAnimationFrame(gameloop);
    }
 
    function attachEvent(){
        var old = typeof window.onclick==="function" && window.onclick;
        window.onclick = function(event){
            old && old();
            createHeart(event);
        }
    }
 
    function createHeart(event){
        var d = document.createElement("div");
        d.className = "heart";
        hearts.push({
            el : d,
            x : event.clientX - 5,
            y : event.clientY - 5,
            scale : 1,
            alpha : 1,
            color : randomColor()
        });
 
        document.body.appendChild(d);
    }
 
    function css(css){
        var style = document.createElement("style");
        style.type="text/css";
        try{
            style.appendChild(document.createTextNode(css));
        }
        catch(ex){
            style.styleSheet.cssText = css;
        }
 
        document.getElementsByTagName('head')[0].appendChild(style);
    }
 
    function randomColor(){
        return "rgb("+(~~(Math.random()*255))+","+(~~(Math.random()*255))+","+(~~(Math.random()*255))+")";
    }
    
})(window,document);