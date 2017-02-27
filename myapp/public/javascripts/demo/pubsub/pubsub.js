/*
@authoer Litao
@desc   观察者模式的简单实现。可以订阅、发布、取消订阅
@usage
    <script src="pubsub.js"></script>
    <script>
        var myCallback = function(data){
            console.log( data );
        }
        Pubsub.listen('event1',myCallback); // 订阅
        Pubsub.trigger('event1','sdfsdfsdf'); // 发布
        Pubsub.remove('event1',myCallback);  // 取消订阅
        Pubsub.trigger('event1','sdfsdfsdf');
    </script>
@ 问题1： 如果需要remove()取消订阅，则在listen()订阅的时候就必须穿入具名函数。因为remove()函数内部是判断函数相等的方式来查找的。
@ 问题2： 如果不同人使用，为同一个事件绑定2个回调，不幸函数名重复，则在remove()的时候，会把两个回调都取消订阅。
*/
var Pubsub = (function(){
    var eContainer = {};
    var listen = function( event,cb ){
        if( !eContainer[ event ] ){
            eContainer[ event ] = [];
        }
        if( typeof cb !== 'function' ){
            throw Error('param error,\'function\' needed');
        }
        eContainer[ event ].push(cb);
    }
    var trigger = function( event,data ){
        if( !eContainer[ event ] ){
            console.warn( 'no event registered named ' + event );
            return false;
        }
        else if( eContainer[ event ].length === 0 ){
            console.warn( 'no callback registered for event ' + event );
        }
        eContainer[ event ].forEach(function(item,index){
            item(data);
        });
    }
    /*
    @要求remove()在使用时，cb必须是一个具名函数，且在listen()的时候，穿入的也是同一个具名函数。
    */
    var remove = function( event,cb ){
        var cbs = eContainer[ event ];

        if( !cbs ){
            return false;
        }
        // 如果未传入回调cb，则删除当前穿入的event事件。
        if( !cb ){
            delete eContainer[ event ];
        }
        else{
            for( var i=0;i<cbs.length;i++ ){
                if( cb === cbs[i] ){
                    cbs.splice(i,1);
                }
            }
        }
    }
    return {
        listen:listen,
        trigger:trigger,
        remove:remove
    }
})();