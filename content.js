


function main() {


	var blacklist = [
		"baidu.com",
		"google.com",
		"localhost",
		"github.com",
		"aws",
		"10.",
		"127.0.0.1",
		OperationOnURL.getSciHubRootUrl(), //scihub
	];

	var whiteliest = [
		'journals.aps.org',
		"www.science.org",
		"science.sciencemag.org",
		"www.sciencedirect.com",
		"journals.aps.org",
		"journals.jps.jp",
		"advances.sciencemag.org",
		"www.osapublishing.org",
		"scitation.org",
		"tandfonline",
		"ieeexplore.ieee.org",
		"www.nature.com",
		"iopscience.iop.org",
		"worldscientific.com",
		"springer.com",
		"opg.optica.org",
		"elsevier.com",
		"onlinelibrary.wiley.com",
	];





GlobalVariable_matchMode.get_with_callback(sub= function (matchMode) {

	if (matchMode == null ) {matchMode=2} // set default



	if (matchMode == 0) {
		// turn off
	} else if (matchMode == 1) {
		// turn on
		render()
	} else if (matchMode == 2) {
		// auto match

		// only use whiteliest
		var IsInwhiteList = false;
		for (var i = 0; i < whiteliest.length; i++) {
			if (window.location.hostname.includes(whiteliest[i])) {
				IsInwhiteList = true;
				break;
			} //
		}
		if (!IsInwhiteList) {
			return;
		}
	 render()
	}

})



}







// window.addEventListener('load', () => {
// 	main()
// });
main()
