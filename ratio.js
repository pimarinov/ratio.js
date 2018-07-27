var Ratio = (function () {
    var instance;
    function createInstance() { return new Object; }
    
    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
                document.body.setAttribute("onresize", "ratio.keep()");
                
                instance.ratioElements = document.querySelectorAll('[data-ratio]');
                instance.sizes = [];
                
                for(var i = 0; i < instance.ratioElements.length; i++){
                    var current = instance.ratioElements[i];
                    var size = {};
                    if(current.hasAttribute("width")){
                        size.w = parseInt(current.getAttribute("width"), 10);
                    } else {
                        console.log("Error: width attribute is required:\n", current);
                        continue;
                    }
                    if(current.hasAttribute("height")){
                        size.h = parseInt(current.getAttribute("height"), 10);
                    } else {
                        console.log("Error: height attribute is required:\n", current);
                        continue;
                    }
                    current.style.position="relative";
                    current.style.display="inline-block";
                    current.style.width=size.w+"px";
                    current.style.height=size.h+"px";
                    if(typeof vastUrl==="undefined" && window.location.href.indexOf("vastUrl")===-1 && current.innerHTML.trim().length===0){
                        current.setAttribute("data-size-info","");
                    }
                    instance.sizes[i] = size;
                }
            }
            instance.keep = function() {
                for(var i = 0; i < instance.ratioElements.length; i++){
                    var current = instance.ratioElements[i];
                    var size = instance.sizes[i];
                    
                    if(typeof size === "undefined"){continue;}

                    var cBound = current.parentNode.getBoundingClientRect();
                    var cItemCS = window.getComputedStyle(current.parentNode);
                    var cItem = {"width": parseInt(cItemCS.width, 10), "height":parseInt(cItemCS.height, 10)};
                    //console.log(cBound.width+"/"+cBound.height, cItem.width+"/"+cItem.height);
                    var ratioV = size.w/size.h;
                    var ratioC = cItem.width/cItem.height;
                    
                    if(size.w > cItem.width || size.h > cItem.height){
                        if(ratioV < ratioC){
                            current.style.height=cItem.height+"px";
                            current.style.width=(cItem.height*(size.w/size.h))+"px";
                            //console.log("size-y");
                        } else {
                            current.style.width=cItem.width+"px";
                            current.style.height=(cItem.width*(size.h/size.w))+"px";
                            //console.log("size-x");
                        }
                    } else {
                        current.style.width=size.w+"px";
                        current.style.height=size.h+"px";
                    }
                    if(current.hasAttribute("data-size-info")){
                        current.style.backgroundColor="rgba(0,0,0,.1)";
                        current.innerHTML = "<span style=\"display:inline-block; position:relative; top:50%; left:50%; transform:translate(-50%,-50%); font-size:10px; line-height:100%; font-family:arial; text-align:center; color:rgba(0,0,0,.3)\">"+
                                                 size.w+"/"+size.h+" &rarr; "+
                                                 parseInt(current.style.width,10)+"/"+parseInt(current.style.height,10)+
                                             "</span>";
                    }
                }
            };
            instance.keep();
            return instance;
        }
    };
})();
var ratio = Ratio.getInstance();
