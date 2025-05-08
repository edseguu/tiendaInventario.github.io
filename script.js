function onScanSuccess(decodedText, decodedResult)
{
    console.log(`Code matched = ${decodedText}`, decodedResult);
    document.getElementById("reader__result").innerHTML = ` Resultado: <b>${decodedText}</b>`;
}
function onScanError(errorMessage) {
  // console.warn(`Scan error: ${errorMessage}`);
}

var html5QrcodeScanner = new Html5QrcodeScanner(
    "reader", { fps: 10, qrbox: {width: 300, height: 120}});
html5QrcodeScanner.render(onScanSuccess, onScanError);
