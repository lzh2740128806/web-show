$(function(){
	var sizeScreen = '',ThisOffset = 0,spans="",src,nowPage=0,indexNums=1;
	
	// top头像 滑动偏移量
	if (document.body.clientWidth > 1400) {sizeScreen = 8;ThisOffset = 5} else {sizeScreen = 8;ThisOffset = 0}
	
	//nav： hover状态识别
	var navStyle = function (id){
		$(id).hover(function(){
			if (!$(this).hasClass('active')) {
				if($(this).hasClass('on')  && $(this).siblings('li').hasClass('active')) {
					$(this).addClass('active');
				} else {
					$(this).addClass('active on');
				}
			} else {
				return;
			}
		},function(){

			if (indexNums == 1) {  //如果是第一页 只有鼠标悬浮  不会出现下划线停留
				$(this).removeClass('active');
			} else {

				if ($(this).hasClass('on') && $(this).siblings('li').hasClass('active')) {
					$(this).removeClass('active');
				} else {
					return;
				}
			}
		});
	};

	// 活动轮播图左右箭头触发轮播效果
	var triggers = function(e){
		//判断点击目标触发轮播图左右转动事件
		if (e.currentTarget.className == 'prev-button') {
			$('#starsIF_previous').trigger('click');
		} else {
			$('#starsIF_next').trigger('click');
		}
	};

	//topUser 小头像滑动按钮点击
	var smallArrow = function(){
		var moveWidth = $(this).siblings('.list').width(),  //计算小头像所占宽度
			$this = $(this);
		if ($this.hasClass('headTop-arrow_right')) {
			$this.removeClass('headTop-arrow_right').addClass('headTop-arrow_left');
			$this.siblings('.list').find('ul').animate({marginLeft : -(moveWidth + ThisOffset)}, 800);
		} else {
			$this.removeClass('headTop-arrow_left').addClass('headTop-arrow_right');
			$this.siblings('.list').find('ul').animate({marginLeft : 0}, 800);
		}
		
	};

	//top User 3页文案内容轮播
	var slideTop = function (){
		var li_width = $('ul.topUser-title li').width(); //计算ul所占宽度
		$('ul.topUser-title').animate({left:-(li_width)},1500,function() {
			var txt = $(this).find('li:first');
			$('ul.topUser-title').append(txt).css('left',0);
		});
		setTimeout(slideTop,5000) //循环执行
	};
	
	//合作方img自动加载
	// var parAuto = function (){
	// 	var imgUrl = "",plen = 37; //plen为合作方数量加一
	// 	var parentImgWidth = $('.partnes-pic').width(),
	// 		childImgWidth = parseInt(parentImgWidth/8);
	// 	for (var i = 1; i < plen; i++) {
	// 		imgUrl = '<img class="img-partners col-lg-2 col-md-2 col-sm-2" src="images/'+i+'.png">';
	// 		$('.partnes-pic').append(imgUrl);
	// 	}
	// }();


		//一个内容整体的宽度
	var _width = $('.header-pic').width(),   
		//一个内容整体的高度
		_height = $('.header-pic').height(),		
		contentArr,bgBoolean= false,
		num=0, borNum = parseInt($('#headPic').css('border-width')),timeout;
	
	//让弹幕位置出现在头像下侧
	$('.bullet').css({'top':_height/2,'margin':'0 ' + borNum + 'px'});
	
	//弹幕数据模拟
	contentArr = ['积目','似的士大夫','啊实打实 阿斯顿','萨达','阿三大苏打','阿斯顿阿斯斯顿阿斯斯顿阿斯斯顿阿斯顿？','反对法地方','3微软微软','更换','时代发'];
	
	//弹幕加载 自动轮换模块
	function ele(){
		var currentTime = 18000;
		if (nowPage != 1) {timeout = 1;return;} //如果不是top user页 则return；
		if(timeout) {clearTimeout(timeout);}	//同时清空计时器
		$('.bullet').empty(); 	//每次执行首先清空弹幕父元素中的子元素
		src = src || 'images/top1.jpg';		//弹幕头像有则用 无则默认
		for (var i = 0; i < contentArr.length; i++) {
			//append 所有弹幕到bullet元素中
			spans = '<span class="bullet-random"><img class="bullet-user-header" src="'+src+'"><span> 张三 </span> : <span>'+contentArr[i]+'</span></span><br>';
			$('.bullet').append(spans);
		}

		if (bgBoolean) {  //如果是用户发的虚拟弹幕 则给一个高亮 
			$('.bullet-random:first').addClass('white');
		}
			//弹幕的数量 
		var bulletRandom = document.getElementsByClassName('bullet-random');
		// 给每个弹幕增加原始高度
		for (var i = 0; i < bulletRandom.length; i++) {
			bulletRandom[i].style.top = _height/2 + 24 + 'px';
		}
		// 每条弹幕从下至上用时18s 滑出屏幕
		$('.bullet-random').animate({
	      	top: -(_height + _height/2) + 'px' 
	    }, currentTime);

		// 循环执行定时器
       	timeout = window.setTimeout(function(){  
           	ele();  
          	timeout = null;  
       	}, currentTime); 
	}

	//弹幕发送按钮点击
	$('#sendWord').click(function(){
		if ($('#thinkWord').val() == '') return;
		contentArr.pop();
		var word = $('#thinkWord').val();
		contentArr.unshift(word); 	//弹幕内容加入数组第一位
		bgBoolean = true;
		ele();
		$('#thinkWord').val('');  //发送后input清空
	});

	//top user下的img点击
	var canchange = true;
	$('.head-top').click(function(){

		if(canchange){
			canchange = false;
		}else{
			return false;
		}
		src = $(this).context.src; 
		ele();
		//点击头像添加旋转
		$('#headPic').addClass('head-rotate');
		//向img顶层元素后追加一个img
		var _imgPic = $('<img id="sndPic" class="sndPic" src="'+$(this).context.src+'">');

		//点击头像更换img背景
		$('.img-bg-border').css('background','url('+$(this).context.src+') no-repeat')
		
		setTimeout(function () {
			setTimeout(function () {
				//然后删除顶层img  露出下层追加的img  并把顶层img的id和样式赋值给底层img
				$('#headPic').remove();
				$('.sndPic').attr('id','headPic').removeClass('sndPic').addClass('headPic');

				canchange = true;
			},800);
			//200ms首先把追加内容加入标签
			$('.header-pic').append(_imgPic);
		},200);
	});

	$('.click_button div').on('click', triggers); //活动轮播点击

	navStyle('#menu li'); //nav hover样式           


	$('.headTop-arrow').on('click', smallArrow); //top user小头像点击滑动

	//全屏翻页
	$('#gmuTotalPage').fullpage({
		anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6','page7'], //每页name
		menu: '#menu', //目标id
		afterRender: function () {
            //playing the video
			alert(1);
            $('#video').get(0).play(); //内容渲染结束播放首页背景视频
        },
        afterLoad: function(anchorLink, index){ //内容加载结束
        	// index为页数 从1开始
        	indexNums = index;
			if(indexNums > 1){	
				//如果不是第一页
				$('#video').get(0).pause();
				//如果是第4页
				if(indexNums == 4){
					nowPage = 1;
					ele(); //执行弹幕效果
					slideTop();	//执行文案轮播
				} else {
					nowPage = 0;
				}	
			} else {
				$('#video').get(0).play(); 
			}	
		},
		miniresize: true,
	});




/***************************/

	;(function(){
		var srcs = [];
		var img = $('.mobilenone .headTop-girl >img');
		var t = $('#touch-change >.team-member')[0];
		img.each(function (i,el) {
			srcs.push(el.src);
        });


		t.ontouchend = function (e) {

			if(canchange){
				canchange = false;
			}else{
				return false;
			}

			var src = srcs[Math.floor(Math.random()*srcs.length)];
            ele();
            //点击头像添加旋转
            $('#headPic').addClass('head-rotate');
            //向img顶层元素后追加一个img
            var _imgPic = $('<img id="sndPic" class="sndPic" src="'+src+'">');

            //点击头像更换img背景
            $('.img-bg-border').css('background','url('+src+') no-repeat')

            setTimeout(function () {
                setTimeout(function () {
                    //然后删除顶层img  露出下层追加的img  并把顶层img的id和样式赋值给底层img
                    $('#headPic').remove();
                    $('.sndPic').attr('id','headPic').removeClass('sndPic').addClass('headPic');

                    canchange = true;
                },600);
                //200ms首先把追加内容加入标签
                $('.header-pic').append(_imgPic);
            },200);

            return false;
        };




	}
	)();

});