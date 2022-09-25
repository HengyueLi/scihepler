




var selectorID = 'select-mode'
var matchModeKey = 'matchMode'

 // -------------------- set mode ---------------------------------------
document.getElementById(selectorID).addEventListener('change', function() {
    value = document.getElementById(selectorID).value
    GlobalVariable_matchMode.set(value)
}, false);



 // -------------------- read mode ---------------------------------------
let selector = document.getElementById(selectorID);
GlobalVariable_matchMode.get_with_callback(sub=function(v){
  if (v == null ) {v=2}
  selector.value = v
})
