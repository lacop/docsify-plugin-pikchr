(function () {
    var pikchrReady = typeof PikchrModule === "function"
        ? PikchrModule()
        : Promise.reject(new Error("PikchrModule not loaded"));

    function render(pikchr, source) {
        var svgClass = "pikchr";
        var pnWidthPtr = pikchr._malloc(4);
        var pnHeightPtr = pikchr._malloc(4);
        try {
            var svg = pikchr.ccall(
                "pikchr",
                "string",
                ["string", "string", "number", "number", "number"],
                [source, svgClass, 0, pnWidthPtr, pnHeightPtr]
            );
            var width = pikchr.getValue(pnWidthPtr, "i32");
            var height = pikchr.getValue(pnHeightPtr, "i32");
            return { svg: svg, width: width, height: height };
        } finally {
            pikchr._free(pnWidthPtr);
            pikchr._free(pnHeightPtr);
            pikchr._free(svg);
        }
    }

    function plugin(hook) {
        hook.doneEach(function () {
            var blocks = document.querySelectorAll(
                'pre[data-lang="pikchr"], pre[data-lang="Pikchr"]'
            );
            if (!blocks.length) return;

            pikchrReady.then(function (pikchr) {
                blocks.forEach(function (pre) {
                    var code = pre.querySelector("code");
                    var source = code ? code.textContent : pre.textContent;
                    var result = render(pikchr, source);
                    var container = document.createElement("div");
                    container.className = "pikchr-diagram";
                    container.innerHTML = result.svg;
                    if (result.width > 0 && result.height > 0) {
                        container.style.maxWidth = result.width + "px";
                    }
                    pre.parentNode.replaceChild(container, pre);
                });
            }).catch(function (err) {
                console.error("docsify-plugin-pikchr:", err);
            });
        });
    }

    window.$docsify = window.$docsify || {};
    window.$docsify.plugins = [].concat(plugin, window.$docsify.plugins || []);
})();
