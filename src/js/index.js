require('../less/index.less')

window.addEventListener('load',function(){
    
    

    var sections=document.querySelectorAll('section');
    var section_wrap=document.querySelector('.section_wrap');
    var author=document.querySelector('.author');
    var introduce_word=document.querySelector('.introduce_word');
    var introduce_details=introduce_word.querySelectorAll('p')
    var nav_items=document.querySelectorAll('.header_nav>ul>li');
    var more_btn = document.querySelector('.header_more');
    var more_nav = document.querySelector('.header_more_nav');
    var more_nav_items = document.querySelectorAll('.header_more_nav>ul>li');
    var page_1_icons=document.querySelectorAll('.skill_item_icon');
    var page_1_details=document.querySelectorAll('.skill_item_detail');
    var page_1_otherSkill=document.querySelector('.other_skill');
    var project_scroll_wrap=document.querySelector('.project_scroll_wrap');
    var points=document.querySelectorAll('.control_points>span');
    var project_imgs=document.querySelectorAll('.project_scroll_wrap img')
    var length=sections.length;
    var nowIndex=0;
    var isMoving=false;
    var project_img_arr = [require("../img/project_01.jpg"), require("../img/project_02.jpg"), require("../img/project_03.jpg"), require("../img/project_04.jpg"), require("../img/project_05.jpg"), require("../img/project_06.jpg")]

    
    loading_fn();
    
    switchNav_fn();
    wheelPage_fn();
    switchProject_fn();

    //滚轮滚动切换页面
    function wheelPage_fn(){
        window.addEventListener('mousewheel', function (e) {
            
            if (isMoving) {
                return
            }

            if (e.wheelDelta < 0) {
                isMoving = true;
                nowIndex++;
                if(nowIndex>=length-1){
                    nowIndex=length-1;
                }
                scrollPage_fn();
            }
            else if (e.wheelDelta > 0) {
                isMoving = true;
                nowIndex--;
                if (nowIndex <=0) {
                    nowIndex =0;
                }
                scrollPage_fn()
            }
            //改变导航按钮样式
            setNav_fn();
        })
        
    }
    //点击导航互动页面
    function switchNav_fn(){
        for (var i = 0; i < nav_items.length; i++) {
            //给每个导航绑定事件
            (function(i){
                nav_items[i].addEventListener('click', function () {
                    if (isMoving) {
                        return
                    }else{
                        isMoving = true;
                        nowIndex=i;

                        scrollPage_fn()
                    }
                   
                    
                    //改变导航按钮样式
                    setNav_fn();
                })
                more_nav_items[i].addEventListener("click",function(){
                    if (isMoving) {
                        return
                    } else {
                        isMoving = true;
                        nowIndex = i;
                        more_btn.click();
                        scrollPage_fn()
                    }

                    //改变导航按钮样式
                    setNav_fn();
                })
            })(i)
        }
    }
    
    //改变导航样式
    function setNav_fn() {
        for (var i = 0; i < nav_items.length; i++) {
            nav_items[i].classList.remove('nav_active')
            more_nav_items[i].classList.remove('nav_active')
        }
        nav_items[nowIndex].classList.add('nav_active')
        more_nav_items[nowIndex].classList.add('nav_active')
    }
    //页面滚动函数
    function scrollPage_fn(){
        switch (nowIndex) {
            case 1:
                for (var i = 0; i < page_1_icons.length; i++) {
                    page_1_icons[i].style.animation = "icon_fromLeft 2s ease both ." + i + "s"
                    page_1_details[i].style.animation = "skill_opaciy 2s ease both 2." + i + "s"

                }
                page_1_otherSkill.style.animation = "other_skill 1s ease both 1.5s"
            break;
            case 2:
                for(var j=0;j<project_imgs.length;j++){
                    project_imgs[j].src=project_img_arr[j];
                }
        }
        section_wrap.style.transform = "translate3d(0," + (-nowIndex) * (100 / length) + "%,0)"
        setTimeout(function () {
            isMoving = false;
        }, 1000)
    }
    //项目切换滚动函数
    function switchProject_fn(){
        var nowIndex=0;
        var lastIndex=0;
        for(var i=0;i<points.length;i++){
            (function(i){
                points[i].addEventListener('click', function () {
                    project_scroll_wrap.style.transform = "translateX(" + -350 *i+"px)"
                    lastIndex=nowIndex;
                    nowIndex=i;
                    points[lastIndex].classList.remove('point_active');
                    this.classList.add('point_active');
                    
                })
            })(i)
        }
    }

    function loading_fn() {
        document.querySelector('.loading').style.transform = "translateY(-100%)";
        setTimeout(function () {
            document.querySelector('.loading').style.display = "none";
            author.style.animation ="author_scale 2s ease both,author_shadow 2s ease infinite alternate"
            introduce_word.style.animation ="introduce_scale 1s ease both 1s"
            for(var i=0;i<introduce_details.length;i++){
                introduce_details[i].style.animation ="authorWord_opacity 2s ease both, authorWord_toTop 2s ease 1."+i*2+"s both"
            }
        }, 500)
    }

    more_nav_fn()

    function more_nav_fn(){
        var onOff = false;
        more_btn.addEventListener('click',function(){
            onOff = !onOff;
            if (onOff) {
                more_nav.style.display = "block";
            } 
            else {
                more_nav.style.display = "none";
            }
        })
    }
})