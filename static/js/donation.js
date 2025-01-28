// function makePayment(amount) {
//     // Properly encode all parameters
//     const upiId = "aochuba52@oksbi"; // Your UPI ID
//     const name = "DreamOn"; // Your business name
//     const note = `Coffee Donation`;
    
//     // Construct URL with proper encoding
//     const url = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;

//     console.log("Generated URL: " + url);

//     const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

//     if (isMobile) {
//         window.location.href = url;
//     } else {
//         const qrContainer = document.getElementById("qr-code-container");
//         qrContainer.innerHTML = "";

//         if (qrContainer) {
//             new QRCode(qrContainer, {
//                 text: url,
//                 width: 256,
//                 height: 256,
//                 colorDark: "#000000",
//                 colorLight: "#ffffff",
//                 correctLevel: QRCode.CorrectLevel.H
//             });
//             document.getElementById("qr-instructions").style.display = "block";
//             qrContainer.style.display = "block";
//         }
//     }
// }