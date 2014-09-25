/**
 * 应用画图类
 * @class sl.picShower
 * @constructor
 */
sl.picShower = (function() {
	return {
		/**
         * 根据参数页面显示图片
         * @param {Object} file 文本对象
         * @param {String} renderEl 渲染目标
         * @param {String} renderW 渲染宽度
         * @param {String} renderH 渲染高度
         * @method render
         * @example sl.picShower.render(file, "img", 100, 50)
         */
		render: function(file, renderEl, renderW, renderH) {
			if (FileReader == undefined) {
				console.log("该浏览器不支持 FileReader");
				return ;
			}
			var filereader = new FileReader();
			filereader.readAsDataURL(file);
		    filereader.onload = function(event) {
		        var blob = new Blob([event.target.result]);
		        var img = new Image();
		        img.onload = function() {
		        	var toAppend = document.getElementById(renderEl);
		            var c = document.createElement('canvas');
			        c.width = renderW;
			        c.height = renderH;
			        var ctx = c.getContext('2d');
			        ctx.scale(c.width / img.width, c.height / img.height);
			        ctx.drawImage(img, 0, 0, img.width, img.height);
			        toAppend.src = c.toDataURL('image/png');
		        }
		        img.src = event.target.result;
		        img.title = 'Imported via file upload';
		    };
		},
		
		/**
         * 清除图片
         * @param {String} renderEl 清除目标
         */
		clear: function(renderEl) {
			var toClear = document.getElementById(renderEl);
			toClear.src = "";
		}
	}
})();
		