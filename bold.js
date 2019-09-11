window.onload = main;



function main(){
	console.log('inicio');
	initSlide('slide',80,true);
}

/*
PARAMETROS PARA SLIDER.
	CONTENT-SLIDE = ID DEL CONTENEDOR DE IMAGENES.
	RANGO DE DESPLAZAMIENTO: CANTIDA DE PIXELES A DESPLAZAR PARA CAMBIAR UNA IMAGEN
*/





function initSlide(id,range, zoom){
	cord = document.getElementById('cord');
	ctx = document.getElementById(id);
	posx = 0;
	posy = 0;

	if(zoom){
		d = document.createElement('div');
		d.className = "zoomin noview";
		ctx.appendChild(d);
		zoomIn();
	}
	ctx.onmousedown = function(e){
		xInit = e.clientX;
		yInit = e.clientY;
		d.classList.add('noview');
		document.onmousemove = function(e){
			cord.innerText = "coord: x="+e.clientX+" y="+e.clientY;
			if(xInit < e.clientX){
				xSecundario = xInit+ range;
				if(xSecundario < e.clientX){
					console.log('move to RIGHT');
				}
			}else{
				xSecundario = xInit -range;
				if(xSecundario > e.clientX){
					console.log('move to LEFT');
				}
			}
		}
		document.onmouseup = function(e){
			cord.innerText = "arrastre la imagen hacia los lados";
			document.onmousemove = function(){
				if(zoom){
					return zoomIn();
				}
			};
		}
	}
}

function zoomIn(){

	ctx.onmousemove = function(e){
		// console.log(e);
		d.classList.remove('noview');
		posx = e.offsetX;
		posy = e.offsetY;
		d.style.left = posx+"px";
		d.style.top = posy+window.scrollY+"px";
	}
	ctx.onmouseleave = function(e){
		posx = e.clientX;
		posy = e.clientY;
		console.log(d,'afuera');
		d.classList.add('noview');
	}
}























// function main(){
// 	console.log('a');
// 	ctx = document.querySelector('.content-image');
// 	// ctx.addEventListener('dragstart',clicker);


// 	div = document.getElementById('cord');

// 	ctx.onmousedown = function(e){
// 		console.log('down', e.clientX, e.clientY);
// 	    document.onmousemove = function(e){
// 	        div.innerText = '('+e.pageX +', '+e.pageY+')';
// 	        if()
// 	    }
// 	    document.onmouseup = function(e){
// 	        div.innerText = 'Click Me!';
// 	        document.onmousemove = function(){};
// 	    }
// 	}
// }




// function clicker(e){
// 	// console.log(e.clientX, e.clientY);
// 	console.log(e);
// 	cord(e.clientX,e.clientY);
// 	el = e.target;
// 	// el.addEventListener("mousemove", function(){
// 	// 	console.log(e);
// 	// })
// }
// function cord(x,y){
// 	document.getElementById('cord').innerText = "cord: x="+x+"  y="+y;
// }
// function start(e){
// 	console.log(e);
// 	console.log('start',e.clientX, e.clientY);
// }

// function enter(e){
// 	console.log('enter');
// }
// function leave(e){
// 	console.log('leave');
// }
// function over(e){
// 	console.log('over');
// }
// function drag(e){
// 	console.log('drag');
// }
// function end(e){
// 	console.log('end');
// }