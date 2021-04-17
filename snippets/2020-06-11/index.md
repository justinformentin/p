---
title: "Converting any digit hex to rgba"
path: "hex-to-rgba"
date: "2020-06-11"
lang: JavaScript
chunk: "Convert 3, 4, 6, and 8 digit hex codes to RGBA. Especially useful since not all browsers support 8 digit hex."
published: "true"
---




```js
const convertHexUnitTo255 = (hexStr) =>
  parseInt(hexStr.repeat(2 / hexStr.length), 16);


// 8 digit hex isn't supported by all browsers, convert to rgba.
// Works for 3, 4, 6, and 8 digit hex.
function hexToRGBA(hex) {
  const isHex = /^([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);
  // const isHex = !isNaN(Number('0x' + hex));
  if (isHex) {
    // Needed to break the hex down if it's a multiple of 2 or 3.
    const chunkSize = Math.floor(hex.length / 3);
    // Gets array, 'ff7700cc' will be ['ff', '77', '00', 'cc'];
    const hexArr = hex.match(new RegExp(`.{${chunkSize}}`, 'g'));
    // Convert hex chunk to rgb 255 val.
    const arr = hexArr.map(convertHexUnitTo255);
    // Converts alpha 255 into number between 0 and 1 with three significant figures.
    const alpha = arr[3] || arr[3] === 0 ? (arr[3] / 255).toFixed(2) : 1;
    return `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, ${alpha})`;
  } else {
    return hex;
  }
}
``````