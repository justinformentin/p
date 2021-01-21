import React from 'react';
import styled from 'styled-components';

const HeaderSubtitle = styled.div`
  margin: 0;
`;

let mouse = { x: 0, y: 0 };
let cW = 0;
let  cH = 0;
let mouseIsDown = false;
let mouseIsDownDivision = false;
let startPoint
let endPoint;
let midPoint;

const sunsetContainer = document.querySelector('.sunsetContainer');

const sunGrad = 'px, circle, rgba(242,248,247,1) 0%,rgba(249,249,28,1) 3%,rgba(247,214,46,1) 8%, rgba(248,200,95,1) 12%,rgba(201,165,132,1) 30%,rgba(115,130,133,1) 51%,rgba(46,97,122,1) 85%,rgba(24,75,106,1) 100%)';
const sunDayGrad = 'px, circle, rgba(252,255,251,0.9) 0%,rgba(253,250,219,0.4) 30%,rgba(226,219,197,0.01) 70%, rgba(226,219,197,0.0) 70%,rgba(201,165,132,0) 100%)';
const sunSetGrad = 'px, circle, rgba(254,255,255,0.8) 5%,rgba(236,255,0,1) 10%,rgba(253,50,41,1) 25%, rgba(243,0,0,1) 40%,rgba(93,0,0,1) 100%)';

// function updateDimensions() {
//   if (typeof window.innerWidth == 'number') {
//     //Non-IE
//     cW = window.innerWidth;
//     cH = window.innerHeight;
//   } else if (
//     document.documentElement &&
//     (document.documentElement.clientWidth ||
//       document.documentElement.clientHeight)
//   ) {
//     cW = document.documentElement.clientWidth;
//     cH = document.documentElement.clientHeight;
//   } else if (
//     document.body &&
//     (document.body.clientWidth || document.body.clientHeight)
//   ) {
//     cW = document.body.clientWidth;
//     cH = document.body.clientHeight;
//   }
//   startPoint = {x: 0, y: cH}
//   endPoint = {x: cW, y: cH}
//   midPoint = {x: cW / 2, y: 0}
// }

function updateDimensions() {
  cW = sunsetContainer.clientWidth;
  cH = sunsetContainer.clientHeight;
  startPoint = {x: 0, y: cH}
  endPoint = {x: cW, y: cH}
  midPoint = {x: cW / 2, y: 0}
}

updateDimensions();

function updateSun(e) {
  mouse.x = e.clientX || e.pageX;
  mouse.y = e.clientY || e.pageY;

  updateDimensions();

  //if(mouseIsDown) {

  const setGrad = (type, grad) => {
    document.getElementById(type).style.background = '-webkit-radial-gradient(' + mouse.x + 'px ' + mouse.y + grad;
    document.getElementById(type).style.background = '-moz-radial-gradient(' + mouse.x +  'px ' +  mouse.y + grad;
    document.getElementById(type).style.background = '-ms-radial-gradient(' + mouse.x + 'px ' + mouse.y + grad;
  }
  setGrad('sun', sunGrad);
  setGrad('sunDay', sunDayGrad);
  setGrad('sunSet', sunSetGrad);

  document.getElementById('waterReflectionContainer').style.perspectiveOrigin = ((mouse.x / cW) * 100).toString() + '% -15%';
  document.getElementById('waterReflectionMiddle').style.left = (mouse.x - cW - cW * 0.03).toString() + 'px';

  document.getElementById('sun').style.width = document.body.clientWidth;
  document.getElementById('sun').style.left = '0px';
  document.getElementById('sunDay').style.width = document.body.clientWidth;
  document.getElementById('sunDay').style.left = '0px';

  var sky = document.getElementById('sun');
  var water = document.getElementById('water');
  var waterHeight = water.clientHeight;
  var skyHeight = sky.clientHeight;
  var skyRatio = mouse.y / skyHeight;
  var waterRatio = waterHeight / cH;
  document.getElementById('darknessOverlay').style.opacity = Math.min((mouse.y - cH / 2) / (cH / 2), 1);
  document.getElementById('darknessOverlaySky').style.opacity = Math.min((mouse.y - (cH * 7) / 10) / (cH - (cH * 7) / 10), 1 );
  document.getElementById('moon').style.opacity = Math.min((mouse.y - (cH * 9) / 10) / (cH - (cH * 9) / 10), 0.65 );
  document.getElementById('horizonNight').style.opacity = (mouse.y - (cH * 4) / 5) / (cH - (cH * 4) / 5);
  document.getElementById('starsContainer').style.opacity = mouse.y / cH - 0.6;
  document.getElementById('waterDistance').style.opacity = mouse.y / cH + 0.6;
  document.getElementById('sunDay').style.opacity = 1 - mouse.y / cH;
  document.getElementById('sky').style.opacity = Math.min(1 - mouse.y / cH, 0.99);
  document.getElementById('sunSet').style.opacity = mouse.y / cH - 0.2;

  if (mouse.y > 0) {
    var clouds = document.getElementsByClassName('cloud');
    for (var i = 0; i < clouds.length; i++) {
      clouds[i].style.left = Math.min(
        cW * (Math.pow(mouse.y, 2) / Math.pow(cH / 2, 2)) * -1,
        0
      );
    }
    //}

    var stars = document.getElementsByClassName('star');
    for (var i = 0; i < stars.length; i++) {
      stars[i].style.opacity = mouse.y / cH - 0.6;
    }

    if (mouse.y > cH / 2) {
      document.getElementById('sun').style.opacity = Math.min((cH - mouse.y) / (cH / 2) + 0.2, 0.5);
      document.getElementById('horizon').style.opacity = (cH - mouse.y) / (cH / 2) + 0.2;
      document.getElementById('waterReflectionMiddle').style.opacity = (cH - mouse.y) / (cH / 2) - 0.1;
    } else {
      document.getElementById('horizon').style.opacity = Math.min(mouse.y / (cH / 2), 0.99);
      document.getElementById('sun').style.opacity = Math.min(mouse.y / (cH / 2), 0.5);
      document.getElementById('waterReflectionMiddle').style.opacity = mouse.y / (cH / 2) - 0.1;
    }
  } else if (mouseIsDownDivision) {
    var sunElement = document.getElementById('sun');
    var water = document.getElementById('water');
    var division = document.getElementById('division');
    sunElement.style.height = mouse.y.toString() + 'px';
    document.getElementById('sunDay').style.height =
      mouse.y.toString() + 'px';
    division.style.top = mouse.y.toString() + 'px';
    var waterHeight = cH - mouse.y;
    water.style.height = waterHeight.toString() + 'px';

    document.getElementById('sun').style.height = mouse.y.toString() + 'px';
    document.getElementById('sunDay').style.height = mouse.y.toString() + 'px';
    document.getElementById('horizon').style.height = mouse.y.toString() + 'px';
    document.getElementById('waterDistance').style.height = (cH - mouse.y).toString() + 'px';
    document.getElementById('oceanRippleContainer').style.height = (cH - mouse.y).toString() + 'px';
    document.getElementById('darknessOverlay').style.height = (cH - mouse.y).toString() + 'px';
  }
}


// function nightToDay(){
//   const startX = startPoint.x;
//   const startY = startPoint.y;
//   const endX = midPoint.x;
//   const endY = midPoint.y;
//   let currX = startX;
//   let currY = startY;
//   function updatePoints(){
//     console.log('updatePoints');
//     const incX = currX + 1 < endX && currY % 2 === 0
//     const yFinished = currY < 2;
//     if(incX || yFinished) currX = currX + 1;
//     if(currY - 1 > endY) currY = currY - 1;
//     updateSun({clientX: currX, clientY: currY})

//     const xyDone = currX < endX && currY > endY;
//     xyClose = currX <= endX + 2 && currY >= endY + 2;
//     if(xyDone || xyClose) setTimeout(updatePoints, 10)

//     else{
//       setTimeout(dayToNight, 3000)
//     }
//   }
//   updatePoints()
// }


// function dayToNight(){
//   const startX = midPoint.x;
//   const startY = midPoint.y;
//   const endX = endPoint.x;
//   const endY = endPoint.y;
//   let currX = startX;
//   let currY = startY;
//   console.log('DTN currY', currY)
//   console.log('DTN endY', endY)
//   function updatePoints(){
//     console.log('updatePoints');
//     const incX = currX + 1 < endX && currY % 2 === 0
//     const yFinished = currY < 2;
//     if(incX || yFinished) currX = currX + 1;
//     if(currY + 1 < endY) currY = currY + 1;
//     updateSun({clientX: currX, clientY: currY})

//     const xyDone = currX === endX && currY === endY;
//     xyClose = currX <= endX + 2 && currY <= endY + 2;
//     if(xyDone || xyClose) setTimeout(updatePoints, 10)
//   }
//   updatePoints()
// }
// // function nightToDay(){
// //   const startX = startPoint.x;
// //   const startY = startPoint.y;
// //   const endX = midPoint.x;
// //   const endY = midPoint.y;
// //   let currX = startX;
// //   let currY = startY;
// //   function updatePoints(){
// //     if(currX + 1 < endX && currY % 3 === 0) currX = currX + 1;
// //     if(currY - 1 > endY) currY = currY - 1;
// //     updateSun({clientX: currX, clientY: currY})
// //     if(currX < endX && currY > endY) setTimeout(updatePoints, 500)
// //   }
// //   updatePoints()

// //   // for(let i = 0; i < startY; i++){
// //   //   if(startX + i < endX && currY % 3 === 0) currX = startX + i;
// //   //   if(startY - i > endY) currY = startY - i;

// //   //   const nc = {currX, currY};
// //   //   console.log('nc', nc)

// //   //   setTimeout(()=> updateSun({clientX: currX, clientY: currY}), 300);
// //   //   if(startX + i === endX && startY - i === endY) break;
// //   // }
// }

function dataToggle(kind){
  // kind = dayToNight || nightToDay;
  const toggleKind = {
    nightToDay: {
      yInc: -1,
      startX: startPoint.x,
      startY: startPoint.y,
      endX: midPoint.x,
      endY: midPoint.y
    },
    dayToNight: {
      yINc: 1,
      startX: midPoint.x,
      startY: midPoint.y,
      endX: endPoint.x,
      endY: endPoint.y
    }
  }
  const k = toggleKind[kind]
  const yInc = k.yInc;
  const startX = k.startX;
  const startY = k.startY;
  const endX = k.endX;
  const endY = k.endY;
  let currX = startX;
  let currY = startY;
  function updatePoints(){
    const incX = currX + 1 < endX && currY % 2 === 0
    const yFinished = currY < 2;
    if(incX || yFinished) currX = currX + 1;
    if(currY + yInc > endY) currY = currY + yInc;
    updateSun({clientX: currX, clientY: currY})
    const xyDone = currX === endX && currY === endY;
    const yClose = kind === 'nightToDay' ? currY >= endY + 2 : currY <= endY + 2;
    const xyClose = currX <= endX + 2 && yClose;
    if(xyDone || xyClose) setTimeout(updatePoints, 1)

  }
  updatePoints()
}

function nightToDay(){
    const startX = startPoint.x;
    const startY = startPoint.y;
    const endX = midPoint.x;
    const endY = midPoint.y;
    let currX = startX;
    let currY = startY;
    function updatePoints(){
      const incX = currX + 1 < endX && currY % 2 === 0
      const yFinished = currY < 2;
      if(incX || yFinished) currX = currX + 1;
      if(currY - 1 > endY) currY = currY - 1;
      updateSun({clientX: currX, clientY: currY})
      const xyDone = currX === endX && currY === endY;
      const xyClose = currX <= endX + 2 && currY >= endY + 2;
      if(xyDone || xyClose) {
        setTimeout(updatePoints, 1)
      } else{
        setTimeout(dayToNight, 1000)
      }
    }
    updatePoints()
  }

  function dayToNight(){
    const startX = midPoint.x;
    const startY = midPoint.y;
    const endX = endPoint.x;
    const endY = endPoint.y;
    let currX = startX;
    let currY = startY;
    function updatePoints(){
      const incX = currX + 1 < endX && currY % 2 === 0
      const yFinished = currY < 2;
      if(incX || yFinished) currX = currX + 1;
      if(currY + 1 < endY) currY = currY + 1;
      updateSun({clientX: currX, clientY: currY})

      const xyDone = currX === endX && currY === endY;
      const xyClose = currX <= endX + 2 && currY <= endY + 2;
      if(xyDone || xyClose) setTimeout(updatePoints, 1)
    }
    updatePoints()
  }

setTimeout(nightToDay, 3000)


document.addEventListener('mousemove', updateSun, false);



function startMove() {
  mouseIsDown = true;
}

function stopMove() {
  mouseIsDown = false;
  mouseIsDownDivision = false;
  var sky = document.getElementById('sun');
}

function startDraggingDivision() {
  mouseIsDownDivision = true;
}

function windowResize() {
  updateDimensions();
  var skyHeight = document.getElementById('horizon').clientHeight;

  // update to new sky height
  skyHeight = document.getElementById('sun').clientHeight;
  document.getElementById('waterDistance').style.height = cH - skyHeight;
  document.getElementById('division').style.top = skyHeight;
}

const Header = ({ children, title }) => (
  <div
    class="sunsetContainer"
    style="width: 100%; height: 100%; margin: 0; padding: 0"
    onmouseup="stopMove();"
    onresize="windowResize();"
  >
    <div id="starsContainer" onmousedown="startMove();" onmouseup="stopMove();">
      <div id="stars" onmousedown="startMove();" onmouseup="stopMove();"></div>
    </div>

    <div id="sun" onmousedown="startMove();" onmouseup="stopMove();"></div>

    <div id="sunDay" onmousedown="startMove();" onmouseup="stopMove();"></div>

    <div id="sunSet" onmousedown="startMove();" onmouseup="stopMove();"></div>

    <div id="sky" onmousedown="startMove();" onmouseup="stopMove();"></div>

    <div class="star" style="left: 250px; top: 30px;"></div>
    <div class="star" style="left: 300px; top: 25px;"></div>
    <div class="star" style="right: 40px; top: 40px;"></div>
    <div class="star" style="right: 80px; top: 45px;"></div>
    <div class="star" style="right: 120px; top: 20px;"></div>

    <div id="horizon" onmousedown="startMove();" onmouseup="stopMove();"></div>

    <div
      id="horizonNight"
      onmousedown="startMove();"
      onmouseup="stopMove();"
    ></div>

    <div id="moon" onmousedown="startMove();" onmouseup="stopMove();"></div>

    <div
      id="division"
      onmousedown="startDraggingDivision();"
      onmouseup="stopMove();"
    ></div>

    <div id="water" onmousedown="startMove();" onmouseup="stopMove();"></div>

    <div
      id="waterReflectionContainer"
      onmousedown="startMove();"
      onmouseup="stopMove();"
    >
      <div
        id="waterReflectionMiddle"
        onmousedown="startMove();"
        onmouseup="stopMove();"
      ></div>
    </div>
    <div
      id="waterDistance"
      onmousedown="startMove();"
      onmouseup="stopMove();"
    ></div>
    <div
      id="darknessOverlaySky"
      onmousedown="startMove();"
      onmouseup="stopMove();"
    ></div>
    <div id="darknessOverlay"></div>
  </div>
);

export default Header;
