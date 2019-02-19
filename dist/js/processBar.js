(function($, root){

    let duration, frameId, startTime, lastPer = 0;

    function renderAllTime(allTime){
        console.log(allTime);

        duration = allTime;
        let time = formatTime(allTime);
        $('.all-time').html(time);
    }

    function formatTime(t){
        t = Math.round(t);
        let m = Math.floor(t / 60);
        let s = t - m * 60;
        m = m < 10 ? '0' + m : m;
        s = s < 10 ? '0' + s : s;
        return m + ':' + s;
    }

    // 进度条开始运动
    function start(p){
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();

        lastPer = p == undefined ? lastPer : p;

        function frame(){
            // 单位是ms
            let curTime = new Date().getTime();
            // duration 单位是s
            let per = lastPer + (curTime - startTime) / (duration * 1000);
            if(per <= 1){
                // 更新进度条
                update(per);
            }else{
                cancelAnimationFrame(frameId);
            }
            frameId = requestAnimationFrame(frame);
        }

        frame();
    }

    function update(per){
        let time = formatTime(per * duration);
        $('.cur-time').html(time);
        let x = (per - 1) * 100;
        $('.pro-top').css({
            transform: `translateX(${x}%)`
        });
    }

    function stop(){
        cancelAnimationFrame(frameId);
        let stopTime = new Date().getTime();
        lastPer = lastPer + (stopTime - startTime) / (duration * 1000);
    }

    // 将renderAllTime暴露出去，点击切歌时调用
    root.pro = {
        renderAllTime: renderAllTime,
        start: start,
        stop: stop,
        update: update
    }

})(window.Zepto, window.player || (window.player = {}));