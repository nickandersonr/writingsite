/**
 * aviapoly Slider - A responsive jQuery image slider with advanced transition effects
 * (c) Copyright Christian "Kriesi" Budschedl
 * http://www.kriesi.at
 * http://www.twitter.com/kriesi/
 *
 */
(function($){$.fn.aviapoly=function(f,g){var h={animation:false,pluginNameSpace:'aviapoly',transition:'aviapoly_fx',blockHeight:'full',blockWidth:'full',transitionFx:'fade',betweenBlockDelay:100,transitionSpeed:600,cssEasing:'cubic-bezier(0.250, 0.460, 0.450, 0.940)',easing:'easeOutQuad'},options=$.extend({},h,f),methods={aviapoly_fx:function(a){methods.set_slide_option(a);methods.generate_blocks(a);methods.perpare_blocks(a);setTimeout(function(){methods.start_block_transition(a)},100)},set_slide_option:function(a){var b,cur_width,slideWidth=a.width(),slideHeight=a.height();b=options.blockHeight=='full'?slideHeight:options.blockHeight;cur_width=options.blockWidth=='full'?slideWidth:options.blockWidth;a.currentOptions={blockHeight:b,blockWidth:cur_width,slideHeight:slideHeight,slideWidth:slideWidth};a.currentOptions=$.extend({},a.options,a.currentOptions);a.methods.overwrite_options(a.currentSlide,a.currentOptions);if(a.currentOptions.animation){a.methods.use_preset_animation(a,a.currentOptions.animation)}},perpare_blocks:function(a){a.blocks=a.find('.avBlock');if(a.css_active&&a.isMobile){if(a.moveDirection>0){a.blocks=$(a.blocks.get().reverse())}}else if(a.moveDirection<0){a.blocks=$(a.blocks.get().reverse())}switch(a.currentOptions.order){case'diagonal':a.blocks=a.methods.diagonal(a.blocks,a);break;case'random':a.blocks=a.methods.fyrandomize(a.blocks,a);break}},generate_blocks:function(a){a.blockNumber=0;var b=0,posY=0,generateBlocks=true,nextImage=a.nextSlide.find('img:eq(0)').attr('src');while(generateBlocks){a.blockNumber++;var c=$('<div class="avBlock avBlock'+a.blockNumber+'"></div>').appendTo(a).css({zIndex:20,position:'absolute',overflow:'hidden',display:'none',left:b,top:posY,height:a.currentOptions.blockHeight,width:a.currentOptions.blockWidth});var d='';if(nextImage)d='<img src="'+nextImage+'" title="" alt="" />';var e=$('<div class="av_innerBlock">'+d+'</div>').appendTo(c).css({position:'absolute',left:-b,top:-posY,height:a.currentOptions.slideHeight,width:a.currentOptions.slideWidth});b+=a.currentOptions.blockWidth;if(b>=a.currentOptions.slideWidth){b=0;posY+=a.currentOptions.blockHeight}if(posY>=a.currentOptions.slideHeight){generateBlocks=false}}},use_preset_animation:function(a,b){var c={},animationOptions=["fade","slide","square","square-fade","square-random","square-random-fade","bar-vertical-top","bar-vertical-side","bar-vertical-mesh","bar-vertical-random","bar-horizontal-top","bar-horizontal-side","bar-horizontal-mesh","bar-horizontal-random","square-zoom","bar-vertical-zoom","bar-horizontal-zoom"],x=a.currentOptions.slideWidth,y=a.currentOptions.slideHeight,randomCount=animationOptions.length;if(!a.css_active)randomCount-=3;if(b=='random')b=animationOptions[Math.floor(Math.random()*randomCount)];var d=8;switch(b){case"fade":c={blockHeight:y,blockWidth:x,transitionFx:'fade',betweenBlockDelay:50,transitionSpeed:600,order:''};break;case"slide":c={blockHeight:y,blockWidth:x,transitionFx:'side',betweenBlockDelay:50,transitionSpeed:600,order:''};break;case"square":c={blockHeight:Math.ceil(x/d),blockWidth:Math.ceil(x/d),transitionFx:'slide',betweenBlockDelay:50,transitionSpeed:600,order:'diagonal'};break;case"square-fade":c={blockHeight:Math.ceil(x/d),blockWidth:Math.ceil(x/d),transitionFx:'fade',betweenBlockDelay:50,transitionSpeed:600,order:'diagonal'};break;case"square-random":c={blockHeight:Math.ceil(x/d),blockWidth:Math.ceil(x/d),transitionFx:'slide',betweenBlockDelay:50,transitionSpeed:600,order:'random'};break;case"square-random-fade":c={blockHeight:Math.ceil(x/d),blockWidth:Math.ceil(x/d),transitionFx:'fade',betweenBlockDelay:50,transitionSpeed:600,order:'random'};break;case"square-zoom":c={blockHeight:Math.ceil(x/d),blockWidth:Math.ceil(x/d),transitionFx:'zoom',betweenBlockDelay:50,transitionSpeed:600,order:'diagonal'};break;case"bar-vertical-top":c={blockHeight:y,blockWidth:Math.ceil(x/12),transitionFx:'drop',betweenBlockDelay:100,transitionSpeed:600,order:''};break;case"bar-vertical-side":c={blockHeight:y,blockWidth:Math.ceil(x/12),transitionFx:'side-stay',betweenBlockDelay:100,transitionSpeed:600,order:''};break;case"bar-vertical-mesh":c={blockHeight:y,blockWidth:Math.ceil(x/12),transitionFx:'mesh-vert',betweenBlockDelay:100,transitionSpeed:600,order:''};break;case"bar-vertical-random":c={blockHeight:y,blockWidth:Math.ceil(x/12),transitionFx:'fade',betweenBlockDelay:100,transitionSpeed:600,order:'random'};break;case"bar-vertical-zoom":c={blockHeight:y,blockWidth:Math.ceil(x/12),transitionFx:'zoom',betweenBlockDelay:100,transitionSpeed:600,order:''};break;case"bar-horizontal-top":c={blockHeight:Math.ceil(y/6),blockWidth:x,transitionFx:'drop',betweenBlockDelay:100,transitionSpeed:600,order:''};break;case"bar-horizontal-side":c={blockHeight:Math.ceil(y/6),blockWidth:x,transitionFx:'side',betweenBlockDelay:100,transitionSpeed:600,order:''};break;case"bar-horizontal-mesh":c={blockHeight:Math.ceil(y/6),blockWidth:x,transitionFx:'mesh-hor',betweenBlockDelay:100,transitionSpeed:600,order:''};break;case"bar-horizontal-random":c={blockHeight:Math.ceil(y/6),blockWidth:x,transitionFx:'fade',betweenBlockDelay:100,transitionSpeed:600,order:'random'};break;case"bar-horizontal-zoom":c={blockHeight:Math.ceil(y/6),blockWidth:x,transitionFx:'zoom',betweenBlockDelay:100,transitionSpeed:600,order:''};break}$.extend(a.currentOptions,c)},start_block_transition:function(d){d.blocks.each(function(i){var c=$(this);setTimeout(function(){var a=new Array();a['css']={display:'block',opacity:0};a['anim']={opacity:1};switch(d.currentOptions.transitionFx){case'fade':break;case'drop':if(d.isMobile){var b=1;if(d.moveDirection<0)b=b*-1;a['css'][d.css_prefix+'transform-origin']='0 0';a['css'][d.css_prefix+'transform']='rotate(0deg) scale(1, 0.1) skew(0deg, 0deg)';a['anim'][d.css_prefix+'transform']='rotate(0deg) scale(1,1) skew(0deg, 0deg)'}else{a['css']['height']=1;a['css']['width']=d.currentOptions.blockWidth;a['anim']['height']=d.currentOptions.blockHeight;a['anim']['width']=d.currentOptions.blockWidth}break;case'side':var b=-1;if(d.moveDirection<0)b=1;if(d.isMobile){b=b*-1;a['css'][d.css_prefix+'transform']='translateX('+(d.currentOptions.slideWidth*b)+'px)';a['anim'][d.css_prefix+'transform']='translateX(0px)'}else{a['css']['left']=d.currentOptions.slideWidth*b;a['anim']['left']=parseInt(c.css('left'),10)}break;case'side-stay':if(d.isMobile){a['css'][d.css_prefix+'transform']='rotate(0deg) scale(0.1,1) skew(0deg, 0deg)';a['anim'][d.css_prefix+'transform']='rotate(0deg) scale(1,1) skew(0deg, 0deg)'}else{a['css']['width']=1;a['anim']['width']=d.currentOptions.blockWidth}break;case'zoom':a['css'][d.css_prefix+'transform']='rotate(0deg) scale(2) skew(0deg, 0deg)';a['anim'][d.css_prefix+'transform']='rotate(0deg) scale(1) skew(0deg, 0deg)';break;case'mesh-vert':var b=-1;if(i%2)b=1;if(d.isMobile){a['css'][d.css_prefix+'transform']='translateY('+(d.currentOptions.slideWidth*b)+'px)';a['anim'][d.css_prefix+'transform']='translateY(0px)'}else{a['css']['top']=d.currentOptions.slideHeight*b;a['anim']['top']=parseInt(c.css('top'),10)}break;case'mesh-hor':var b=-1;if(i%2)b=1;if(d.isMobile){a['css'][d.css_prefix+'transform']='translateX('+(d.currentOptions.slideWidth*b)+'px)';a['anim'][d.css_prefix+'transform']='translateX(0px)'}else{a['css']['left']=d.currentOptions.slideWidth*b;a['anim']['left']=parseInt(c.css('left'),10)}break;case'slide':if(d.isMobile){a['css'][d.css_prefix+'transform']='rotate(0deg) scale(0.1) skew(0deg, 0deg)';a['anim'][d.css_prefix+'transform']='rotate(0deg) scale(1) skew(0deg, 0deg)'}else{a['css']['height']=1;a['css']['width']=1;a['anim']['height']=d.currentOptions.blockHeight;a['anim']['width']=d.currentOptions.blockWidth}break}c.css(a['css']);d.methods.animate(c,a['anim'],function(){if(i+1==d.blockNumber){d.methods.change_finished(false,d)}},true)},i*d.currentOptions.betweenBlockDelay)})},clean_up_hook:function(a){if(!a.blocks||!a.blocks.length)return;a.methods.remove_css_transition(a.blocks);var b=10;if(a.currentSlide.is('.withCaption'))b=500;a.blocks.animate({opacity:0},b,function(){a.blocks.remove();a.animating=false})},fyrandomize:function(a){var b=a.length,objectSorted=$(a);if(b==0)return false;while(--b){var c=Math.floor(Math.random()*(b+1)),temp1=objectSorted[b],temp2=objectSorted[c];objectSorted[b]=temp2;objectSorted[c]=temp1}return objectSorted},diagonal:function(a,b){var c=a.length,objectSorted=$(a),currentIndex=0,rows=Math.ceil(b.currentOptions.slideHeight/b.currentOptions.blockHeight),columns=Math.ceil(b.currentOptions.slideWidth/b.currentOptions.blockWidth),oneColumn=b.blockNumber/columns,oneRow=b.blockNumber/rows,modX=0,modY=0,i=0,rowend=0,endreached=false,onlyOne=false;if(c==0)return false;for(i=0;i<c;i++){objectSorted[i]=a[currentIndex];if((currentIndex%oneRow==0&&b.blockNumber-i>oneRow)||(modY+1)%oneColumn==0){currentIndex-=(((oneRow-1)*modY)-1);modY=0;modX++;onlyOne=false;if(rowend>0){modY=rowend;currentIndex+=(oneRow-1)*modY}}else{currentIndex+=oneRow-1;modY++}if((modX%(oneRow-1)==0&&modX!=0&&rowend==0)||(endreached==true&&onlyOne==false)){modX=0.1;rowend++;endreached=true;onlyOne=true}}return objectSorted}};return this.avia_base_slider(options,methods)}})(jQuery); 
 
 
/**
 * Avia Base Slider - A responsive jQuery image slider, capable of displaying video and a good starting point for modified slideshows 
 * (c) Copyright Christian "Kriesi" Budschedl
 * http://www.kriesi.at
 * http://www.twitter.com/kriesi/
 *
 * Help Sources:
 * http://www.w3schools.com/css3/css3_user_interface.asp
 * http://googlecode.blogspot.com/2010/08/css3-transitions-and-transforms-in.html
 * http://stackoverflow.com/questions/5819912/webkit-transition-end-in-mozilla-and-opera
 * http://www.the-art-of-web.com/css/css-animation/
 * http://matthewlein.com/ceaser/
 * http://www.zackgrossbart.com/hackito/touchslider/
 * http://www.sitepen.com/blog/2008/07/10/touching-and-gesturing-on-the-iphone/
 * http://www.learningjquery.com/2007/10/a-plugin-development-pattern
 * http://fluidproject.org/blog/2008/08/04/in-praise-of-jqueryextend/
 */


/* this prevents dom flickering, needs to be outside of dom.ready event: */
document.documentElement.className += ' js_active ';
/*end dom flickering =) */


(function($){var l=0;$.fn.avia_base_slider=function(h,j){var k='avia_base',resize_helper=function(){var a=$(window),resize_timeout="";a.bind('resize.'+k,function(){clearTimeout(resize_timeout);resize_timeout=setTimeout(function(){a.trigger('resize_finished.'+k)},500)})};if(this.length){resize_helper()}return this.each(function(){l++;var g=$(this),methods={preload:function(a){methods.append_caption();var b=0,fadeInSpeed=0;if(a.options.globalDelay){b=l*a.options.globalDelay;fadeInSpeed=10}a.aviaImagePreloader({fadeInSpeed:fadeInSpeed,globalDelay:b},function(){methods.init.apply(a)})},init:function(){methods.init_hook(g);methods.overwrite_options(g,g.options);methods.set_slide_proportions(false,function(){methods.img_ready_hook(g)},true);methods.set_video_slides();methods.bind_events();methods.css_setup_and_display();methods.append_controls();methods.activate_touch_control();methods.start_autorotation()},init_hook:function(a){},img_ready_hook:function(a){},first_img_displayed_hook:function(a){a.removeClass('preloading')},bind_events:function(){var b=$(window);b.bind('resize.'+k,methods.set_slide_proportions);g.bind('switch.'+k,methods.try_slide_transition);g.slides.bind("webkitTransitionEnd oTransitionEnd OTransitionEnd transitionend mozTransitionEnd",methods.change_finished);g.find('a').bind('click.'+k,methods.pause_slider);g.slides.bind('click.'+k,function(){var a=$(this);if(a.is('.comboslide')){if(a.find('img:visible').length){methods.showvideo(a);methods.pause_slider();return false}}})},set_slide_proportions:function(a,b){g.proportions=16/9;if(g.currentImg)g.proportions=g.currentImg.width/g.currentImg.height;var c={height:g.width()/g.proportions};if(a&&a.originalEvent&&a.originalEvent.type=='resize'){methods.remove_css_transition(g);g.css(c)}else{methods.animate(g,c,b,true)}},try_set_slide_proportions:function(){var a=g.nextSlide.find('img').get(0);if(a){var b=a.width/a.height;if(b>g.proportions){g.currentImg=a;methods.set_slide_proportions(false)}}},css_setup_and_display:function(){g.currentSlide.css({zIndex:3,opacity:0,visibility:'visible'});g.slides.each(function(i){if($.browser.msie)$(this).css({backgroundColor:'#000000'});$(this).css({position:'absolute'}).addClass('slide_number_'+(i+1))});g.currentSlide.animate({opacity:1},1200,function(){methods.first_img_displayed_hook(g)})},set_video_slides:function(){g.slides.each(function(i){var a=$(this);var b=a.find('img');var c=a.find('video, embed, object, iframe, .avia_video').attr('wmode','opaque');var d=a.find('iframe');var e=d.attr('src');var f='emptyslide';if(e){if(e.indexOf('?')!==-1){e+="&wmode=opaque"}else{e+="?wmode=opaque"}d.attr('src',e)}if(b.length&&c.length){f='comboslide'}else if(c.length){f='videoslide'}else if(b.length){f='imageslide'}a.addClass(f).append('<span class="slideshow_overlay"></span>');if(f=='videoslide'){c.css({display:"none"});setTimeout(function(){c.css({display:"block"})},10)}})},showvideo:function(a){var b=a.find('iframe'),param=a.find('param[name=movie]'),embed=a.find('embed'),object=a.find('object'),src="";if(b.length){src=b.attr('src');if(src&&g.options.try_video_autoplay){src+="&autoplay=1";b.attr('src',src)}b.css('display','block')}if(object.length){src=param.val();if(src&&g.options.try_video_autoplay){if(src.indexOf('?')!==-1){src+="&amp;autoplay=1"}else{src+="?autoplay=1"}param.val(src)}object.css('display','block')}if(embed.length){src=embed.attr('src');if(src&&g.options.try_video_autoplay){if(src.indexOf('?')!==-1){src+="&amp;autoplay=1"}else{src+="?autoplay=1"}embed.attr('src',src)}embed.css('display','block')}a.find('.slideshow_overlay, .'+g.options.captionClass).stop().animate({opacity:0},function(){$(this).css({zIndex:0,visibility:'hidden',display:'none'})});setTimeout(function(){a.find('img, canvas').stop().animate({opacity:0},function(){$(this).css({zIndex:0,visibility:'hidden',display:'none'})})},200)},set_css_transition:function(a){var b=g.css_prefix+'transition',transition=[];transition[b]='all '+(g.options.transitionSpeed/1000)+'s '+g.options.cssEasing;a.css(transition)},remove_css_transition:function(a){var b=g.css_prefix+'transition',transition=[];transition[b]="none";a.css(transition)},animate:function(a,b,c,d){if(g.css_active){setTimeout(function(){methods.set_css_transition(a)},10);setTimeout(function(){a.css(b)},20);if(c&&d)setTimeout(function(){c.call()},g.options.transitionSpeed)}else{a.animate(b,g.options.transitionSpeed,g.options.easing,c)}},append_controls:function(){if(g.count>1&&(!g.isMobile||g.isMobile&&!g.options.forceMobile)){g.controls.numeric=$('<div class="numeric_controls slide_controls"></div>').insertAfter(g);var a="class='active_item'";g.slides.each(function(i){$('<a '+a+' href="#" data-show-slide="'+i+'" >'+(i+1)+'</a>').appendTo(g.controls.numeric);a=""});var b=['previous','pause_play','next'];g.controls.arrow=$('<div class="arrow_controls slide_controls"></div>').insertAfter(g);for(x in b){var c='class = "ctrl_'+b[x]+'"';if(b[x]=="pause_play"){if(g.options.autorotation==false){b[x]='Play'}else{c='class = "ctrl_active_rotation ctrl_'+b[x]+'"';b[x]='Pause'}}if(typeof b[x]=='string'){$('<a '+c+' href="#" data-show-slide="'+b[x]+'" >'+b[x]+'</a>').appendTo(g.controls.arrow)}}g.pauseButton=g.controls.arrow.find('.ctrl_pause_play');methods.activate_controls()}},activate_controls:function(){g.pauseButton.bind('click',function(){methods.toogle_autorotation();return false});g.controls.numeric.find('a').bind('click',function(){methods.pause_slider();g.trigger('switch.'+k,this);return false});g.controls.arrow.find('a').not('.ctrl_pause_play').bind('click',function(){methods.pause_slider();g.trigger('switch.'+k,this);return false})},new_active_control:function(a){var b=g.controls.numeric.find('a').removeClass('active_item');b.filter(':eq('+a+')').addClass('active_item')},activate_touch_control:function(){if(g.css_active&&g.isMobile){g.touchPos={};if(g.options.forceMobile)g.options.transition='move';g.bind('touchstart',function(a){g.touchPos.X=a.originalEvent.touches[0].clientX;g.touchPos.Y=a.originalEvent.touches[0].clientY});g.bind('touchend',function(a){g.touchPos={};a.preventDefault()});g.bind('touchmove',function(a){if(!g.touchPos.X){g.touchPos.X=a.originalEvent.touches[0].clientX;g.touchPos.Y=a.originalEvent.touches[0].clientY}else{var b=a.originalEvent.touches[0].clientX-g.touchPos.X;var c=a.originalEvent.touches[0].clientY-g.touchPos.Y;if(Math.abs(b)>Math.abs(c)){a.preventDefault();if(!g.animating){if(g.touchPos!=a.originalEvent.touches[0].clientX){if(Math.abs(b)>50){var d=b>0?'previous':'next';methods.pause_slider();methods.try_slide_transition(false,d);g.touchPos={};return false}}}}}})}},start_autorotation:function(){if(g.count){g.interval=setInterval(function(){if(g.options.autorotation){g.trigger('switch.'+k,'next')}},g.options.autorotationTimer*1000)}},toogle_autorotation:function(){if(g.options.autorotation){methods.pause_slider()}else{methods.unpause_slider()}},pause_slider:function(){if(g.pauseButton.length)g.pauseButton.removeClass('ctrl_active_rotation').text('Play');g.options.autorotation=false;clearInterval(g.interval)},unpause_slider:function(){if(g.pauseButton.length)g.pauseButton.addClass('ctrl_active_rotation').text('Pause');g.options.autorotation=true;methods.try_slide_transition(false,'next');methods.start_autorotation()},try_slide_transition:function(a,b){g.moveDirection=false;b=methods.calculate_target(b);if(g.animating)return false;if(b==g.currentIndex)return false;g.nextIndex=b;g.animating=true;methods.change_slides(b)},append_caption:function(c){if(c)g=c;g.slides.each(function(){var a=$(this),caption=a.data('caption'),container="div",link=a.find('a'),href="";if(caption){if(!$(caption).find('a').length&&link.length&&1==2){href="href='"+link.attr('href')+"'";container="a"}a.addClass('withCaption');var b=$("<"+container+" "+href+" class='slideshow_caption'><div class='slideshow_inner_caption'><div class='slideshow_align_caption'>"+caption+"</div></div></"+container+">").appendTo(a)}})},calculate_target:function(a){if(typeof a=='object')a=$(a).data('show-slide');switch(a){case'next':a=g.currentIndex+1;g.moveDirection=1000;break;case'previous':a=g.currentIndex-1;g.moveDirection=-1000;break}if(g.currentIndex>a)g.moveDirection=-1000;if(a<0)a=g.count-1;if(a==g.count)a=0;return a},change_slides:function(a){methods.new_active_control(a);g.nextSlide=g.slides.filter(':eq('+a+')');methods.try_set_slide_proportions();methods[g.options.transition].call(this,g)},fade:function(){g.nextSlide.css({display:'block',zIndex:2,opacity:1});methods.animate(g.currentSlide,{opacity:0},methods.change_finished)},move:function(){var a=g.width(),transition=[],transition2=[],modifier=-1;if(g.currentIndex>g.nextIndex)modifier=1;if(g.moveDirection){if(g.moveDirection>0)modifier=-1;if(g.moveDirection<0)modifier=1}g.nextSlide.css({display:'block',zIndex:4,opacity:1,left:0,top:0});if(g.css_active){var b=g.css_prefix+'transform';g.nextSlide.css(b,"translate("+(a*modifier*-1)+"px,0)");transition[b]="translate("+(a*modifier)+"px,0)";transition2[b]="translate(0,0)"}else{g.nextSlide.css({left:a*modifier*-1});transition['left']=a*modifier;transition2['left']=0}methods.animate(g.nextSlide,transition2,methods.change_finished);methods.animate(g.currentSlide,transition)},change_finished:function(a,b){if(b)g=b;if(a)methods.remove_css_transition($(a.target));g.slides.css({display:'none',zIndex:1});g.currentSlide=g.nextSlide.css({display:'block',zIndex:3,left:0,top:0});g.currentIndex=g.slides.index(g.currentSlide);g.currentImg=g.currentSlide.find('img').get(0);methods.set_slide_proportions();methods.clean_up_hook(g)},clean_up_hook:function(a){a.animating=false},overwrite_options:function(a,b){var c=a.data(),i="";for(i in c){if(typeof c[i]=="string"||typeof c[i]=="number"||typeof c[i]=="boolean"){b[i]=c[i]}}},css3_transition_check:function(){if("webkitTransition"in document.body.style){g.css_active=true;g.css_prefix="-webkit-"}if("msTransition"in document.body.style){g.css_active=true;g.css_prefix="-ms-"}if("MozTransition"in document.body.style){g.css_active=true;g.css_prefix="-moz-"}if("OTransition"in document.body.style){g.css_active=true;g.css_prefix="-o-"}if("transition"in document.body.style){g.css_active=true;g.css_prefix=""}}},defaults={autorotation:false,autorotationTimer:6,transitionSpeed:400,cssEasing:'cubic-bezier(0.560, 0.000, 0.070, 1.000)',easing:'easeInOutQuint',slides:'li',pluginNameSpace:'avia_base',transition:'move',forceMobile:false,captionClass:'slideshow_caption',try_video_autoplay:true,globalDelay:0};g.methods=$.extend(methods,$.fn.avia_base_slider.methods,j);g.options=$.extend({},defaults,$.fn.avia_base_slider.defaults,h);g.slides=g.find(g.options.slides);g.count=g.slides.length;g.animating=false;g.currentIndex=0;g.nextIndex=0;g.currentSlide=g.slides.filter(':eq('+g.currentIndex+')');g.nextSlide=g.currentSlide;g.moveDirection=false;g.currentImg=g.currentSlide.find('img').get(0);g.isMobile='ontouchstart'in document.documentElement;g.proportions=16/9;g.controls={};g.pauseButton={};g.interval=false;g.css_active=false;g.css_prefix=false;if(g.options.pluginNameSpace)k=g.options.pluginNameSpace;methods.css3_transition_check();methods.preload(g)})}})(jQuery);











 



// -------------------------------------------------------------------------------------------
// show/hide controls
// -------------------------------------------------------------------------------------------

(function($)
{
	$.fn.avia_base_control_hide = function() 
	{
		return this.each(function()
		{
			var container 	= $(this).parent();
			var controls;
			var isMobile    = 'ontouchstart' in document.documentElement
			
			if(!isMobile)
			{
					//next button click
					container.delegate('.nextSlide', 'click', function()
					{
						container.find('.ctrl_next').trigger('click');
					});
					
					
					/*
					container.delegate('.slideshow_caption, .slideshow_inner_caption', 'mouseleave', function(event)
					{
						container.trigger('mouseenter');
					});
					
					container.delegate('.slideshow_caption, .slideshow_inner_caption', 'mouseenter', function(event)
					{
						container.trigger('mouseleave');
					});
		*/
					
					
					//hover event
					container.hover(function(event)
					{
						//if($(event.target).is('.slideshow_caption, .slideshow_inner_caption')) return;
						controls = container.find('.slide_controls a').stop().css({display:'block', opacity:0}).animate({opacity:0.9});
					},
					
					function(event)
					{
						if(!controls) return;
					
						controls.stop().animate({opacity:0}, function()
						{
							controls.css({opacity:0});
						});
					});
			
			}

		});
	};
})(jQuery);



// -------------------------------------------------------------------------------------------
// external controls
// -------------------------------------------------------------------------------------------

(function($)
{
	$.fn.avia_external_controls = function() 
	{
		return this.each(function()
		{
			var container 	= $(this).parent();
			var controls 	= container.next('.thumbnails_container'),
				thumbs 		= controls.find('.slideThumb');

			if(!controls.length) return;
			
			//next button click
			controls.delegate('.slideThumb', 'click', function(event)
			{
				thumbs.removeClass('activeslideThumb');
				var current = $(this).addClass('activeslideThumb');
				var index = thumbs.index(this);
				container.find('.numeric_controls a:eq('+index+')').trigger('click');
			});

		});
	};
})(jQuery);



// -------------------------------------------------------------------------------------------
// image preloader
// -------------------------------------------------------------------------------------------

(function($)
{
	var aviaGlobalCount = 0

	$.fn.aviaImagePreloader = function(variables, callback) 
	{
		var defaults = 
		{
			css_before_show:{},
			css_show:{},
			fadeInSpeed: 800,
			delay:0,
			maxLoops: 10,
			thisData: {},
			globalDelay:0,
			data: ''
		};
		
		var options 	= $.extend(defaults, variables),
			isMobile	= 'ontouchstart' in document.documentElement;
		
		aviaGlobalCount = aviaGlobalCount + this.find('img').length;
		
		return this.each(function()
		{
			var container 	= $(this),
				images		= $('img', this),
				parent = images.parent(),
				imageCount = images.length,
				interval = '',
				animTime = 300,
				greyscale_active = container.parents('.greyscale-active').length || container.is('.greyscale-active'),
				allImages = images ;
			
			if(isMobile) greyscale_active = false;			
			
			var methods = 
			{
				checkImage: function()
				{
					images.each(function(i)
					{
						if(this.complete == true) 
						{
							images = images.not(this);
							if(greyscale_active) methods.greyscaler(this);
						}
					});
					
					if(images.length && options.maxLoops >= 0)
					{
						options.maxLoops--;
						setTimeout(methods.checkImage, 500);
					}
					else
					{
						methods.showImages();
					}
					
					
				},
				
				showImages: function()
				{
					setTimeout(function()
					{
						allImages.each(function(i)
						{
							var currentImage = $(this);
							methods.showSingleImage(currentImage, i);
						});
					},
					options.globalDelay);
				},
				
				showSingleImage: function(currentImage, i)
				{	
					aviaGlobalCount --;
					
					if(options.css_before_show) currentImage.css(options.css_before_show);
					if(options.css_show) currentImage.animate(options.css_show, options.fadeInSpeed);
					
					if(allImages.length == i+1) 
					{
						if(aviaGlobalCount == 0) { $(window).trigger('avia_images_loaded'); }
						
						methods.callback(i);
					}
				},
				
				callback: function()
				{		
					if (variables instanceof Function) { callback = variables; }
					if (callback  instanceof Function) { callback.call(options.thisData, options.data);  }
				},
				
				greyscaler: function(image)
				{
					var clone, $img = $(image);
				
					if ($.browser.msie && $.browser.version < 9) 
					{
						clone = $img.clone().addClass('greyscale-image').insertBefore($img);
						
						var cloneEl = clone.get(0);
						cloneEl.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(grayScale=1)";
					} 
					else 
					{
						clone = avia_grayscale(image, $img)
						clone.insertAfter($img).addClass('greyscale-image');
					}
				},
				
				greyscale_bindings: function()
				{
					$(".greyscale-active").delegate(".flex_column", "mouseenter", function() 
					{
						var column 	= $(this), image = column.find('.greyscale-image');
					  	image.stop().animate({opacity:0},animTime);
					}
					).delegate(".flex_column", "mouseleave", function() 
					{
						var column 	= $(this), image = column.find('.greyscale-image');
					  	image.stop().animate({opacity:1},animTime);
					});

				}
			};
			if ($.browser.msie && $.browser.version < 9) { animTime = 600; }
			if(greyscale_active) methods.greyscale_bindings();
			if(!images.length) { methods.callback(); if(aviaGlobalCount == 0) { $(window).trigger('avia_images_loaded'); } return }
			
			methods.checkImage();

		});
	};
})(jQuery);






function avia_grayscale(image, $img)
{

		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		var newData = $img.data();
		
		if(newData.imgh > 0)
		{
			canvas.width = newData.imgw;
			canvas.height = newData.imgh;
		}
		else
		{
			var w = $img.attr('width'), h = $img.attr('height');
			if(w && h)
			{
				canvas.width = w;
				canvas.height = h;
			}
		}
		
		
		
	  	ctx.drawImage(image, 0, 0); 
		var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
		for(var y = 0; y < imgPixels.height; y++){
			for(var x = 0; x < imgPixels.width; x++){
				var i = (y * 4) * imgPixels.width + x * 4;
				var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
				imgPixels.data[i] = avg; 
				imgPixels.data[i + 1] = avg; 
				imgPixels.data[i + 2] = avg;
			}
		}
		ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
		
		return jQuery(canvas);
		  
		
    }









jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});









function avia_log(text) 
{
	var ios = navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad)/);
	( (window.console && console.log && !ios) || (window.opera && opera.postError && !ios) ||  avia_text_log).call(this, text);
	
	function avia_text_log(text)
	{
		var logfield = jQuery('.avia_logfield');
		if(!logfield.length) logfield = jQuery('<pre class="avia_logfield"></pre>').appendTo('body').css({	zIndex:100000, 
																											padding:"20px", 
																											backgroundColor:"#ffffff", 
																											position:"fixed", 
																											top:0, right:0, 
																											width:"300px",
																											borderColor:"#cccccc",
																											borderWidth:"1px",
																											borderStyle:'solid',
																											height:"600px",
																											overflow:'scroll',
																											display:'block',
																											zoom:1
																											});
		var val = logfield.html();
		var text = avia_get_object(text);
		logfield.html(val + "\n<br/>" + text);
	}
	
	function avia_get_object(obj)
	{
		var sendreturn = obj;
		
		if(typeof obj == 'object' || typeof obj == 'array')
		{
			for (i in obj)
			{
				sendreturn += "'"+i+"': "+obj[i] + "<br/>";
			}
		}
		
		return sendreturn;
	}
}




