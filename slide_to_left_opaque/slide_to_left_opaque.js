//左から移動×不透明度１へ
function slideShowFromLeft($delay_speed,$element,$duration,$for_dist){
    $($element).each(function(i){
        $(this).delay(i*($delay_speed)).queue(function(){
            $(this).stop(true,true)
                .animate({opacity: 1},
                    {duration: $duration, 
                    step: function(now){
                        var dist = $for_dist - ($for_dist * now);
                        $(this).css({transform: 'translateX(-' + dist + 'px)'});
                    }}); 
        });
    });
}