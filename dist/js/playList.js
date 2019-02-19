(function($, root){

    function renderPlayList(list){
        list.forEach(function(item, index){
            let str = `<span>${item.song}-${item.album}</span><span>${item.singer}</span>`;
            $('<div class="play-item"></div>').html(str).attr('data-index', index).appendTo('.play-list');
        })
    }

    root.list = {
        renderPlayList: renderPlayList
    }

})(window.Zepto, window.player || (window.player = {}));