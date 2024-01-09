///-------------------------------------------///
/// developer: Donovan
///
/// Document Ready
///-------------------------------------------///
fnb.hyperion.ready(function() {
	fnb.hyperion.controller.init();
});
///-------------------------------------------///
/// developer: Donovan
///
/// Function for debouncing window resize
///-------------------------------------------///
fnb.hyperion.windowResizeDebounce = fnb.hyperion.debounce(function() {
	fnb.hyperion.controller.resize();
}, 200);
///-------------------------------------------///
/// developer: Donovan
///
/// Document Resize
///-------------------------------------------///
window.onresize = function(event) {
	fnb.hyperion.windowResizeDebounce();
};
