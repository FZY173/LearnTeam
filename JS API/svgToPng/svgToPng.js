(function (global) {
    global.svgToPng = function (svgHtml) {
        this.svgHtml = svgHtml;
    };
    global.svgToPng.prototype = {
        change:function (filename) {
            var This = this;
            [
                ['version', 1.1],
                ['xmlns', "http://www.w3.org/2000/svg"],
            ].forEach(function(item){
                This.svgHtml.setAttribute(item[0], item[1]);
            });
            var str = This.svgHtml.parentNode.innerHTML;

            //2.生成img
            var img = document.createElement('img');

            img.onload = function(){
                //3生成canvas
                var canvas = document.createElement('canvas');
                var context = canvas.getContext("2d");

                canvas.width = img.width;
                canvas.height = img.height;

                context.drawImage(img, 0, 0);

                var canvasData = canvas.toDataURL("image/png");
                var img2 = document.createElement('img');
                img2.onload = function () {
                    console.log('change2');
                    var a = document.createElement("a");
                    a.download = filename + ".png";
                    a.href = img2.getAttribute('src');
                    a.click();
                };
                // Make pngImg's source the canvas data.
                img2.setAttribute('src', canvasData);
            };

            // Make the new img's source an SVG image.
            img.setAttribute('src', 'data:image/svg+xml;base64,'+ btoa(unescape(encodeURIComponent(str))));
        }
    }
}(this));
