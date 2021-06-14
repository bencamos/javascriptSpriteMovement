//<img src="" id="player" style="position: absolute; left: 50%; top: 92%; width: 2%; height: 4%;">
//<img src="" id="car" style="position: absolute; left: 25%; top: 94%; width: 10%; height: 5%;">

var onFoot = 1;
var carLocation;

document.onkeypress = function (e) {
    if (onFoot) {
      switch (e.key) {
        case "w": {
          zUpdate(0);
          break;
        }
        case "a": {
          xUpdate(0)
          break;
        }
        case "d": {
          xUpdate(1)
          break;
        }
        case "f": {
          enterCar();
          break;
        }
        default: {
          break;
        }
      }
    } else {
      switch (e.key) {
        case "a": {
          xCarUpdate(0)
          break;
        }
        case "d": {
          xCarUpdate(1)
          break;
        }
        case "f": {
          leaveCar();
          break;
        }
        default: {
          break;
        }
      }
    }

}

function getPositionAtCenter(element) {
  const {top, left, width, height} = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2
  };
}

function getDistanceBetweenElements(a, b) {
 const aPosition = getPositionAtCenter(a);
 const bPosition = getPositionAtCenter(b);

 return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
}

function enterCar() {
  var dist = getDistanceBetweenElements(document.getElementById("player"), document.getElementById("car"));
  if (dist < 50) {
    onFoot = 0;
    document.getElementById("player").style.display = "none";
  }
}

function leaveCar() {
  onFoot = 1;
  var a=document.getElementById('car').style.left;
  var x = parseFloat(a.slice(0, -1));
  var k = x - 2;
  document.getElementById('player').style.left= k + "%";
  document.getElementById("player").style.display = "block";
}

async function gravity() {
  var a=document.getElementById('player').style.top
  var x = parseFloat(a.slice(0, -1))
  while (x < 91) {
    if (x >= 100 || x <= 0) return;
    var a=document.getElementById('player').style.top
    var x = parseFloat(a.slice(0, -1))
    if (x >= 99) {
      var i = 100 / x;
      var k = x + i;
    } else {
      var k = x + 1
    }
    document.getElementById('player').style.top= k + "%";
    sleep(250);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function xUpdate(j) {
  var a=document.getElementById('player').style.left;
  var x = parseFloat(a.slice(0, -1));
  if (x >= 100 || x <= 0) return;
  if (j) {
    var k = x + 0.5;
  } else {
    var k = x - 0.5;
  }
  document.getElementById('player').style.left= k + "%";
}

async function xCarUpdate(j) {
  var a=document.getElementById('car').style.left;
  var x = parseFloat(a.slice(0, -1));
  if (x >= 100 || x <= 0) return;
  if (j) {
    var k = x + 0.75;
  } else {
    var k = x - 0.75;
  }
  var i = 0;
  while (i < 10) {
    i++;
    document.getElementById('car').style.left= k + "%";
  }
}


async function zUpdate(j) {
  var a=document.getElementById('player').style.top;
  var x = parseFloat(a.slice(0, -1));
  if (x >= 100 || x <= 0) return;
  var i = 0;
  var k = x;
  while (i < 4) {
      i++;
      var k = k - 1;
      document.getElementById('player').style.top= k + "%"
      sleep(250);
  }
  setTimeout(function() { gravity(); }, 500);
}


//Move elements smoothly.
/*function translate( elem, x, y ) {
    var left = parseInt( css( elem, 'left' ), 10 ),
        top = parseInt( css( elem, 'top' ), 10 ),
        dx = left - x,
        dy = top - y,
        i = 1,
        count = 20,
        delay = 20;

    function loop() {
        if ( i >= count ) { return; }
        i += 1;
        elem.style.left = ( left - ( dx * i / count ) ).toFixed( 0 ) + 'px';
        elem.style.top = ( top - ( dy * i / count ) ).toFixed( 0 ) + 'px';
        setTimeout( loop, delay );
    }

    loop();
}

function css( element, property ) {
    return window.getComputedStyle( element, null ).getPropertyValue( property );
}*///Source: https://stackoverflow.com/questions/7454983/javascript-smooth-animation-from-x-y-to-x1-y1
