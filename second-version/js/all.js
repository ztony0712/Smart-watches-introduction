function outSide() {
    alert("You are visiting outside website. Please pay attention.");
}

var scrollTopLast = 0;
window.onscroll=function(e){
    var scrollTop = e.target.scrollingElement.scrollTop;
    if(scrollTop > scrollTopLast){
        $("nav").css("transition", "0.5s")
        $("nav").css("opacity", "0")
    }else{
        $("nav").css("transition", "0.5s")
        $("nav").css("opacity", "1")
    }
    scrollTopLast = scrollTop;
}

