(function($, root){

    function IndexControl(len){
        this.index = 0;
        this.len = len;
    }

    IndexControl.prototype = {
        prev: function(){
            // if(this.index == 0){
            //     this.index = this.len - 1;
            // }else{
            //     this.index--;
            // }
            this.setIndex(-1);
        },

        next: function(){
            // if(this.index == this.len - 1){
            //     this.index = 0;
            // }else{
            //     this.index++;
            // }
            this.setIndex(1);
        },

        // 计算改变后的索引
        setIndex: function(val){
            let curIndex = this.index;
            let len = this.len;
            this.index = (curIndex + val + len) % len;
        }
    }

    root.IndexControl = IndexControl;

})(window.Zepto, window.player || (window.player = {}));