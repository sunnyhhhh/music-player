// function a(num){
//     debugger;
//     num++;
//     return num;
// }

// console.log(a(2));

let root = window.player;

// let nowIndex = 0;

let dataList;
// let len;

let audio = root.audioManager;
let listControl = root.list;

let IndexControl = root.IndexControl;
let index;
let timer;

function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            console.log(data);
            dataList = data;
            // len = data.length;
            // root.pro.renderAllTime(dataList[0].duration);
            index = new IndexControl(data.length);
            // root.render(dataList[0]);
            // audio.getAudio(data[0].audio);
            listControl.renderPlayList(dataList);
            bindEvent();
            bindTouch();
            $('body').trigger('play:change', 0);
        },
        error: function () {
            console.log('error');
        }
    })
}

function bindEvent() {
    // 自定义事件 函数必须写上参数e，否则会报错
    $('body').on('play:change', function (e, index) {
        audio.getAudio(dataList[index].audio);
        root.render(dataList[index]);
        root.pro.renderAllTime(dataList[index].duration);
        if (audio.status == 'play') {
            rotated(0);
            audio.play();
        }
        $('.img-box').attr('data-deg', 0).css({
            'transform': `rotateZ(0deg)`,
            'transition': 'none'
        })
    });

    // 切歌
    $('.prev').on('click', function () {
        index.prev();
        $('body').trigger('play:change', index.index);
        root.pro.start(0);
        if (audio.status == 'pause') {
            root.pro.stop();
        }
    });

    $('.next').on('click', function () {
        index.next();
        $('body').trigger('play:change', index.index);
        root.pro.start(0);
        if (audio.status == 'pause') {
            root.pro.stop();
        }
    });

    $('.play').on('click', function () {
        if (audio.status == 'pause') {
            audio.play();
            root.pro.start();
            let deg = $('.img-box').attr('data-deg');
            rotated(deg);
        } else {
            clearInterval(timer);
            audio.pause();
            root.pro.stop();
        }

        $('.play').toggleClass('playing');
    });

    $('.list').on('click', function () {
        let $playList = $('.play-list');
        let isShow = $playList.attr('data-show');
        if (isShow == 'no') {
            $playList.show();
            $playList.attr('data-show', 'yes');
        } else {
            $playList.hide();
            $playList.attr('data-show', 'no');
        }
    });

    $('.close').on('click', function () {
        $('.play-list').hide();
    })

    $('.play-item').on('click', function () {
        let index = $(this).attr('data-index');
        if (index) {
            $('body').trigger('play:change', index);
            $('.play-list').hide();
            root.pro.start(0);
            if (audio.status == 'pause') {
                root.pro.stop();
            }
        }
    })
}

function bindTouch() {
    let $dot = $('.slider-dot');
    let bottom = $('.pro-bottom').offset();
    let left = bottom.left;
    let width = bottom.width;

    $dot.on('touchstart', function () {
        root.pro.stop();
    });

    $dot.on('touchmove', function (e) {
        let x = e.changedTouches[0].clientX;
        let per = (x - left) / width;
        if (per >= 0 && per <= 1) {
            root.pro.update(per);
        }
    });

    $dot.on('touchend', function (e) {
        let x = e.changedTouches[0].clientX;
        let per = (x - left) / width;
        if (per >= 0 && per <= 1) {
            let time = per * dataList[index.index].duration;
            root.pro.start(per);
            audio.playTo(time);
            audio.play();
            audio.status = 'play';
            $('.play').addClass('playing');
        }
    })
}

function rotated(deg) {
    deg = +deg;
    clearInterval(timer);
    timer = setInterval(function () {
        deg += 2;
        $('.img-box').attr('data-deg', deg).css({
            'transform': `rotateZ(${deg}deg)`,
            'transition': 'all 1s linear'
        })
    }, 200);
}

getData('../mock/data.json');

// 信息 + 图片 渲染到页面上  --> render
// 点击按钮  
// 音频的播放与暂停 切歌  
// 进度条运动  拖拽
// 图片旋转
// 列表切歌
// 模块化开发 每个功能一个模块