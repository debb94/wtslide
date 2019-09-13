window.onload = main;



function main(){
	console.log('inicio');
	initSlide('slide',80,true);
}

/*
PARAMETROS PARA SLIDER.
	CONTENT-SLIDE = ID DEL CONTENEDOR DE IMAGENES.
	RANGO DE DESPLAZAMIENTO: CANTIDA DE PIXELES A DESPLAZAR PARA CAMBIAR UNA IMAGEN
	PROBAR SLIDER CON MULTIPLES FOTOS Y CON DOS FOTOS.
*/

function initSlide(id,range, zoom){
	// cord = document.getElementById('cord');
	ctx = document.getElementById(id);							// CONTENEDOR ASIGNADO PARA EL SLIDER.
	// agrego indices a las imagenes.
	imagesSlide = ctx.querySelectorAll('.item-image');
	imagesSlide.forEach((item,index)=>{
		item.dataset.id_img= index;
	})
	totalImages = imagesSlide.length-1;									// CANTIDAD DE IMAGENES DEL SLIDER
	lastImage  	= 0;											// ULTIMO INDICE DE IMAGEN QUE SE MOSTRO.
	bod = document.getElementsByTagName('body')[0];				// CUERPO - BODY HTML
	posx = 0;
	posy = 0;
	img = "undefined";
	url = window.location.href;
	baseUrl = url.split('/').slice(0,length-1).join('/');		// URL BASE DE LA PAGINA PARA OBTENER LAS RUTA.
	image = null;
	if(zoom){
		img = document.createElement('img');
		d = document.createElement('div');
		d.className = "zoomin noview";
		ctx.appendChild(d);
		zoomSection = document.createElement('div');
		zoomSection.className = "zoom-section noview";
		bod.appendChild(zoomSection);
		zoomIn();
	}
	ctx.onmousedown = function(e){
		xInit = e.clientX;
		yInit = e.clientY;
		d.classList.add('noview');
		ctx.onmousemove = function(e){
			d.classList.add('noview');
			// cord.innerText = "coord: x="+e.clientX+" y="+e.clientY;
			if(xInit < e.clientX){ // IMAGEN ANTERIOR
				xSecundario = xInit+ range;
				if(xSecundario < e.clientX){
					console.log('move to RIGHT');
					previousImg = ctx.querySelector('.selected-slide');
					// console.log(previousImg);
					index = parseInt(previousImg.dataset.id_img)-1;
					if(index<0){
						index = totalImages;
					}
					changeImg(index,previousImg);
				}
			}else{ // IMAGEN POSTERIOR
				xSecundario = xInit -range;
				if(xSecundario > e.clientX){
					console.log('move to LEFT');
					previousImg = ctx.querySelector('.selected-slide');
					console.log(previousImg);
					index = parseInt(previousImg.dataset.id_img)+1;
					console.log('indice',index);
					if(index>totalImages){
						index = 0;
					}
					changeImg(index,previousImg);
				}
			}
		}
		ctx.onmouseup = function(e){
			cord.innerText = "arrastre la imagen hacia los lados";
			ctx.onmousemove = function(){
				if(zoom){
					return zoomIn();
				}
			};
		}
	}
}

function zoomIn(){
	let el = ctx.querySelector('.selected-slide');
	image = baseUrl+"/"+el.getAttribute('image-zoom');
	// console.log(image);
	if(typeof(img) == "undefined"){
		console.log('creando img');
		// img = document.createElement('img');
		img = new Image();
		if(img.src != image){
			console.log('src');
			// img.src =image;
			img.src = image;
			img.onload = imgLoad;

			// imgWidth = img.width;	// ancho imagen cargada
			// imgHeight = img.height;	// alto imagen cargada
		}
	}else{
		if(img.src != image){
			console.log('src');
			img.src = image;
			img.onload = imgLoad;
			// imgWidth = img.width;	// ancho imagen cargada
			// imgHeight = img.height;	// alto imagen cargada
		}
		console.log('coor');
		imgLoad();
	}
	// imgWidth = img.width;	// ancho imagen cargada
	// imgHeight = img.height;	// alto imagen cargada
	// console.log('ejecutado asigno imagen');
	// zoomSection.style.background = "url("+image+")";
	// ctx.onmousemove = function(e){
	// 	console.log(e.clientX);
	// 	zoomSection.classList.remove('noview');
	// 	// zoomSection.style.background = "url("+image+")";

	// 	// posicion puntero image
	// 	pleft 	= e.clientX-this.offsetLeft;
	// 	ptop	= e.clientY-this.offsetTop;
	// 	console.log(pleft,ptop);
	// 	//razones de desplazamiento.
	// 	console.log(imgWidth,imgHeight)
	// 	rleft = pleft*imgWidth/el.width;
	// 	rtop  = ptop*imgHeight/el.height;

	// 	console.log(rleft,rtop);
	// 	leftzoom =rleft-150;
	// 	topzoom = rtop -150; // 150 tama;o de la caja
	// 	console.log(leftzoom,topzoom);
	// 	if(leftzoom <= 0){
	// 		leftzoom =0;
	// 	}
	// 	if(topzoom <= 0){
	// 		topzoom =0;
	// 	}
	// 	zoomSection.style.backgroundPosition = "-"+leftzoom+"px -"+topzoom+"px";
	// }
	// ctx.onmouseleave = function(e){
	// 	d.classList.add('noview');
	// 	zoomSection.classList.add('noview');
	// 	ctx.onmousemove = function(){
	// 		console.log(222);
	// 		zoomIn();
	// 	};
	// }
}

function imgLoad(){
	el = ctx.querySelector('.selected-slide');
	imgWidth = img.width;	// ancho imagen cargada
	imgHeight = img.height;	// alto imagen cargada
	console.log('ejecutado asigno imagen');
	zoomSection.style.background = "url("+image+")";
	ctx.onmousemove = function(e){
		// console.log(e.clientX);
		zoomSection.classList.remove('noview');
		// zoomSection.style.background = "url("+image+")";

		// posicion puntero image
		pleft 	= e.clientX-this.offsetLeft;
		ptop	= e.clientY-this.offsetTop;
		// console.log(pleft,ptop);
		//razones de desplazamiento.
		// console.log(imgWidth,imgHeight)
		rleft = pleft*imgWidth/el.width;
		rtop  = ptop*imgHeight/el.height;

		// console.log(rleft,rtop);
		leftzoom =rleft-150;
		topzoom = rtop -150; // 150 tama;o de la caja
		// console.log(leftzoom,topzoom);
		if(leftzoom <= 0){
			leftzoom =0;
		}
		if(topzoom <= 0){
			topzoom =0;
		}
		zoomSection.style.backgroundPosition = "-"+leftzoom+"px -"+topzoom+"px";
	}
	ctx.onmouseleave = function(e){
		d.classList.add('noview');
		zoomSection.classList.add('noview');
		ctx.onmousemove = function(){
			console.log(222);
			zoomIn();
		};
	}
}





function changeImg(index,previousImg){
	console.log(index);
	console.log(lastImage);
	// DEFINO QUE TRANSICION SE USARA.
	if(index < lastImage){
		nameTransitionNewImage = 'move-right-new';
		nameTransitionPreviousImage = 'move-right-previous';
	}else{
		nameTransitionNewImage = 'move-left-new';
		nameTransitionPreviousImage = 'move-left-previous';
		lastImage = index;
	}
	lastImage = index;
	//quito la imagen previa
	previousImg.classList.remove('selected-slide');
	previousImg.style.animationName = nameTransitionPreviousImage;
	//agrego la nueva imagen
	imagesSlide[index].classList.add('selected-slide');
	imagesSlide[index].style.animationName = nameTransitionNewImage;
	ctx.onmousemove = function(e){
		return zoomIn();
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