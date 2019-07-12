/* 高度自适应 */
import $ from "jquery";

function heightAuto(row){
    var hei = document.documentElement.clientHeight;
    $(row).css("height", hei - 178);
    $(window).resize(function () {
        var wid = document.documentElement.clientWidth,
            hei = document.documentElement.clientHeight;
        $(row).css("height", hei - 178);
    });
}
export {heightAuto}
