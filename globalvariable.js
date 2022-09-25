//
//
// // 0: turn off
// // 1: turn on
// // 2: auto
// var globalVar = {
//   'matchMode' : 1 ,  // 0=turn off, 1=turn on, 2 = atuo
// }
//
//
//
//
//
// // chrome.storage.sync.set({'matchMode': matchMode}, function() {
// //   console.log('Value is set to ' + matchMode);
// // });
//
//
//
//
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(sender.tab ?
//                 "from a content script:" + sender.tab.url :
//                 "from the extension");
//     console.log("server,"+JSON.stringify(request))
//     if (request['operation'] === "get") {
//       console.log( "globalVar="+ JSON.stringify(globalVar) )
//       sendResponse({'value': globalVar[ request['key'] ]});
//     } else if (request['operation'] === "set") {
//       globalVar[request[key]] = request[value]
//       sendResponse({'value': globalVar[request[key]]});
//     }
//
//   }
// );
