;(function(window,document,jQuery,undefined){

    'use strict';

    var root = window;
    var $ = root.jQuery;

    root.main = {
        selections:{
            fabric:{
                front:{
                    type:'CS',
                    value:'CS5'
                },
                back:{
                    type:'CS',
                    value:'CS5'
                }
            },
            collar:{
                front:{
                    value:'XFLG'
                },
                back:{
                    value:''
                }
            },
            mj:{
                front:{
                    value:'ZMMJ'
                },
                back:{
                    value:''
                }
            },
            hb:{
                front:{
                    value:'SZ'
                },
                back:{
                    value:'SZ'
                }
            },
            cuffs:{
                front:{
                    value:'YJ1Y'
                },
                back:{
                    value:'YJ1Y'
                }
            },
            pocket:{
                front:{
                    value:'empty'
                },
                back:{
                    value:''
                }
            },
            button:{
                front:{
                    color:'CS5',
                    value:'YK'
                },
                back:{
                    color:'CS5',
                    value:'YK'
                }
            }
        },
        init:function(){
            this.bindClick();
            this.subscribeEvent();
            this.bindChangeNav();
            this.bindBtnRotate();
        },
        bindClick:function(){
            var _this = this;

            $('.content-list-inner-wrapper').on('click','ul li',function(){
                var $this       = $(this);
                var _category   = $this.parent().data('category');
                var _value      = $this.data('value');
                var _selections = _this.selections;

                $this.siblings().removeClass('content-sel');
                $this.addClass('content-sel');
                // 如果是布料，则多设置一下“类型”属性。（纯色、条纹、格子）
                if( _category === 'fabric' ){
                    var _type = _value.replace(/\d/g,'');
                    _selections[ _category ].front.type = _type;
                    _selections[ _category ].back.type = _type;
                }
                // 如果是扣子，则多获取并设置一下“颜色”属性
                if( _category === 'button' ){
                    var _buttonColor = $this.data('color');
                    // 顺色，则采用布料的颜色
                    _buttonColor = _buttonColor === 'SS' ? _selections.fabric.front.value : _buttonColor;
                    _selections[ _category ].front.color = _buttonColor;
                    _selections[ _category ].back.color = _buttonColor;
                }
                _selections[ _category ].front.value = _value;
                _selections[ _category ].back.value = _value;
                
                Pubsub.trigger('update',_selections);
            });
        },
        // 修改面料
        mFabric:function(selections){
            console.log( selections.fabric.front.value );
            var _src = 'all_new/XZ_BL_' + selections.fabric.front.value + '_Z.png';
            var _src_back = 'all_new/XZ_BL_' + selections.fabric.back.value + '_F.png';

            $('.fabric img').attr('src',_src);
            $('.fabric-b img').attr('src',_src_back);
        },
        // 修改袖口
        mCuffs:function(selections){
            var _src      = 'all_new/XZ_ZS_XT_Z_ZMXT_CX_' + selections.fabric.front.type + '_' + selections.fabric.front.value + '_Z_.png';
            var _src_back = 'all_new/XZ_ZS_XT_F_CX_' + selections.cuffs.back.value + '_' + selections.fabric.back.type + '_' + selections.fabric.back.value + '_F_.png'

            $('.cuffs img').attr('src',_src);
            $('.cuffs-b img').attr('src',_src_back);
        },
        // 修改领子。背面领子被包含在大身里面了？？
        mCollar:function(selections){
            var _src = 'all_new/XZ_ZS_LZ_' + selections.collar.front.value + '_' + selections.fabric.front.type + '_' + selections.fabric.front.value + '_Z_.png';

            $('.collar img').attr('src',_src);
        },
        // 修改口袋
        mPocket:function(selections){
            var _value = selections.pocket.front.value;
            var _src = '';

            if( _value === 'empty' ){
                _src = 'all_new/empty.png';
            }
            else{
                _src = 'all_new/XZ_ZS_KD_Z_' + selections.pocket.front.value + '_' + selections.fabric.front.type + '_' + selections.fabric.front.value + '_Z_.png';
            }

            $('.pocket img').attr('src',_src);
        },
        // 修改门襟
        mMj:function(selections){
            var _src = 'all_new/XZ_ZS_MJ_' + selections.mj.front.value+ '_' + selections.fabric.front.type + '_' + selections.fabric.front.value + '_Z_.png';

            $('.mj img').attr('src',_src);
        },
        // 修改门襟遮盖层
        mMj_cover_button:function(selections){
            var _mjValue = selections.mj.front.value;
            var _src = '';

            // 如果门禁是暗门襟，则遮罩层也采用mj层的图，以盖住button。否则mj遮罩层用空图片
            _mjValue === 'ZAMJ' ? _src = 'all_new/XZ_ZS_MJ_' + selections.mj.front.value+ '_' + selections.fabric.front.type + '_' + selections.fabric.front.value + '_Z_.png'
                    : _src = 'all_new/empty.png';  
            $('.mj_cover_button img').attr('src',_src);
        },
        // 修改扣子
        mButton:function(selections){
            var _src = 'all_new/XZ_MJ_XDw_WLK_KZ_' + selections.button.front.value + '_' + selections.button.front.color + '_Z_.png';
            var _src_back = 'all_new/XZ_XT_KZ_FS_' + selections.button.back.value + '_' + selections.button.back.color + '_F_.png';

            $('.button img').attr('src',_src);
            $('.button-b img').attr('src',_src_back);
        },
        // 修改过肩
        mGj:function(selections){
            var _src = 'all_new/XZ_ZS_GJ_F_ZCGJ_' + selections.fabric.back.type + '_' + selections.fabric.back.value + '_F_.png';

            $('.gj-b img').attr('src',_src);
        },
        // 修改后背
        mHb:function(selections){
            var _value = selections.hb.back.value;
            var _src = '';

            // SSJGJ使用带布料颜色轮廓的后背图
            if( _value === 'SSJGJ' ){
                _src = 'all_new/XZ_ZS_GJ_F_' + _value + '_' + selections.fabric.back.type + '_' + selections.fabric.back.value + '_F_.png';
            }
            else{
                _src = 'all_new/XZ_BM_' + _value + '_F.png';
            }
            $('.hb-b img').attr('src',_src);
        },
        // 订阅
        subscribeEvent:function(){
            Pubsub.listen('update',this.mFabric);
            Pubsub.listen('update',this.mCuffs);
            Pubsub.listen('update',this.mCollar);
            Pubsub.listen('update',this.mPocket);
            Pubsub.listen('update',this.mMj);
            Pubsub.listen('update',this.mMj_cover_button);
            Pubsub.listen('update',this.mButton);
            Pubsub.listen('update',this.mGj);
            Pubsub.listen('update',this.mHb);
        },
        // 切换nav
        bindChangeNav:function(){
            var _this = this;

            $('.nav-list-inner-wrapper').on('click','ul li',function(){
                var $this = $(this);
                $this.siblings().removeClass('nav-sel');
                $this.addClass('nav-sel');

                var _category = $(this).data('category');
                if( _category === 'hb' || _category === 'cuffs' ){
                    _this.rotateShirt('back');
                }
                else{
                    _this.rotateShirt('front');
                }
                var _content = $('.content-list-inner-wrapper').find('ul').filter('[data-category=' + _category + ']');

                _content.siblings('ul').addClass('lt_hide');
                _content.removeClass('lt_hide');
            });
        },
        // 整体翻转衬衫拼图。'back'显示背面 'front'显示正面 ''或无参数显示相反方向
        rotateShirt:function(direction){
            var $front = $('#container-front');
            var $back = $('#container-back');

            if( typeof direction === 'undefined' || direction === '' ){
                $front.toggleClass('lt_hide');
                $back.toggleClass('lt_hide');
            }
            else if( direction === 'back' ){
                $front.addClass('lt_hide');
                $back.removeClass('lt_hide');    
            }
            else if( direction === 'front' ){
                $front.removeClass('lt_hide');
                $back.addClass('lt_hide');    
            }
            else{
                console.warn('wrong param.');
            }
        },
        // 绑定翻转按钮
        bindBtnRotate:function(){
            var _this = this;

            $('.btn-turn-back').on('click',function(){
                _this.rotateShirt();
            });
        }
    }
})(window,document,jQuery);

$(document).ready(function(){
    
    var root = window;
    var $ = root.jQuery;

    root.main.init();
});