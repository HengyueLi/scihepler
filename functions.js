// python formater
function SetPythonStringFormat() {
	String.prototype.format = function() {
		var i = 0,
			args = arguments;
		return this.replace(/{}/g, function() {
			return typeof args[i] != "undefined" ? args[i++] : "";
		});
	};
}
SetPythonStringFormat();


class GlobalVariable_matchMode {

	static set(val) {
		chrome.storage.sync.set({'matchMode': val});
	}

	static get_with_callback(sub) {
		chrome.storage.sync.get('matchMode', function(result) {sub( result['matchMode'] )})
	}

}



class OperationOnURL {
	static getSciHubRootUrl() {
		return "sci-hub.se";
	} //'sci-hub.do'

	static getCurrentPageUrl() {
		//return  [protocol,url], where url without "https://"
		var protocol = window.location.protocol.replace(":", "");
		var url = window.location.href.split("//")[1];
		return [protocol, url];
	}

	static getScihubURLofCurrentPage() {
		var [protocol, url] = this.getCurrentPageUrl();
		var httpUrl = "{}://{}".format(protocol, url);
		var downloadURL = "https://{}/{}".format(this.getSciHubRootUrl(), httpUrl);
		return downloadURL;
	}

}







class pharseTitleFromURL {
	// input:
	//    page url
	// output:
	//    title of the paper
	static httpGet(theUrl) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET", theUrl, false); // false for synchronous request
		xmlHttp.send(null);
		return xmlHttp.responseText;
	}

	static pharse(url) {
		var resURL = "https://autocite.citation-api.com/api/v3/query" + "?" + "url=" + url
		var res = this.httpGet(resURL)
		res = JSON.parse(res)
		return res["results"][0]["csl"]["title"]
	}


}












class FloatObject {
	// FloatObject.setFloatButton(ButtonList) to set float button
	// each button in setFloatButton is [Name,function]

	static uuidv4() {
	  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
	    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	  );
	}


	static setFloatButton(ButtonList) {
		var buttonGroupUID = "float-button" + this.uuidv4()
		// alert(buttonGroupUID)
		let innerStr = "";
		for (let i = 0; i < ButtonList.length; i++) {
			let Name = ButtonList[i][0];
			let uid = Name + "_id_";

			let inStr = `<div style="margin-top: 6px;padding: 6px 10px ;font-size: 18px;color: white;cursor: pointer;border-radius: 4px;border: 1px solid #eeeeee;background-color: #018f5b;" id="{}">[{}]</div>`.format(uid, Name);

			innerStr = innerStr + inStr;
		}
		// append close button
		innerStr = innerStr + `<div style="margin-top: 4px;height: 34px;width: 34px;line-height: 34px;display: inline-block;font-size: 20px;color: white;border-radius: 50px;background-color: rgba(0, 0, 0, 0.5);cursor: pointer;" id="{}-close">&times</div> `.format(buttonGroupUID);





		var $section = document.createElement("section");
		$section.id = buttonGroupUID ;
		$section.style.position = "fixed";
		$section.style.zIndex = "9999";
		$section.style.bottom = "20px";
		$section.style.right = "20px";
		$section.style.textAlign = "center";
		$section.innerHTML = innerStr;
		document.body.appendChild($section);

		let closeButton = document.getElementById("{}-close".format(buttonGroupUID));
		closeButton.addEventListener("click", function() {
			$section.remove();
		});

		for (let i = 0; i < ButtonList.length; i++) {
			let Name = ButtonList[i][0];
			let uid = Name + "_id_";
			let func = ButtonList[i][1];
			let button = document.getElementById(uid);
			button.addEventListener("click", function() {
				func();
			});
		}
	}
}



function render() {
	// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	FloatObject.setFloatButton([
		// -----------------------------------------------------------------------
		[
			"Sci-hub",
			function() {
				window.open(OperationOnURL.getScihubURLofCurrentPage());
			},
		],
		// -----------------------------------------------------------------------
		[
			"arXiv",
			function() {
				var title = pharseTitleFromURL.pharse(window.location.href)
				var arXivURL = "https://arxiv.org/search/?query=" + title + "&searchtype=all&source=header"
				window.open(arXivURL);
			},
		],
		// -----------------------------------------------------------------------
		[
			"G-Scholar",
			function() {
				var title = pharseTitleFromURL.pharse(window.location.href)
				var googleScholarURL = "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=" + title + "&btnG="
				window.open(googleScholarURL);
			},
		],
	]);
}
