window.onload = function (){

    //VARIABLES
    const BORDEDERECHA = 1200;
    const BORDEIZQUIERDA = 0;
    const BORDEINFERIOR = 1220;
    const BORDESUPERIOR = 0;
    const playerHeight = 50;
    const playerWidth = 50;
    let id1;    

    //CANVAS
    canvas = document.getElementById("miCanvas");
	// Generamos el contexto de trabajo
	ctx = canvas.getContext("2d");	

    //SPRITE

    class Sprite{
        constructor({position}){
            this.position = position;
            this.image = new Image();
            this.image.src = './assets/Escenario.png';
        }

        draw(){
            ctx.drawImage(this.image, this.position.x, this.position.y)
        }

    }

    const backgroundLevel = new Sprite({
        position: {
            x: 0,
            y: 0
        }
    })

    //PLAYER
    class Player{
        constructor(){
            this.position ={
                x: 100,
                y: 1000
            }
            
            this.velocity = {
                x:0,
                y:0
            }

            this.gravity = 1;
            this.width = 50;
            this.height = 50;

            this.sides = {
                bottom:this.position.y + this.height,
                top:this.position.y,
                left:this.position.x,
                right:this.position.x + this.width
            }
        }

        draw(){
            ctx.fillStyle = 'red';
            ctx.fillRect(this.position.x,this.position.y,this.width,this.height);
        }

        update(){
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;

            this.sides.left = this.position.x;
            this.sides.right = this.position.x + this.width;
            this.sides.bottom = this.position.y + this.height;

            //por encima del borde inferior
            if( this.sides.bottom + this.velocity.y < BORDEINFERIOR ){
                this.velocity.y += this.gravity;
            } else {this.velocity.y = 0;}


        }

    }


    const player = new Player();
    
    // trues y falses para las teclas
    const keys = {
        w: {
            pressed: false,
        },
        a: {
            pressed: false,
        },
        d: {
            pressed: false,
        },
        
    }
    
    //LOOP - Animacion
    function animate(){
        window.requestAnimationFrame(animate);
        ctx.clearRect(0,0, BORDEDERECHA, BORDEINFERIOR);

        backgroundLevel.draw(); //Dibujar fondo
        player.velocity.x =0;   //Si no se pone a 0, nunca se parará una vez presionada la tecla.
        if (keys.a.pressed) player.velocity.x = -5;
        else if(keys.d.pressed) player.velocity.x = 5;
        


        player.draw(); //Dibujar el rectangulo
        player.update(); //La actualización que este recibe al realizar procesos.
        
    }

    animate();

    window.addEventListener('keydown', (event)=>{
        switch (event.key) {
            
            
            // Salto.
            case 'w':
                if (player.velocity.y === 0) player.velocity.y = -15;
                break;

            case 'a':
                keys.a.pressed = true;
                break;
            
            case 'd':
                keys.d.pressed = true;
                break;

        }


    })

    window.addEventListener('keyup', (event)=>{
        switch (event.key) {

            case 'a':
                keys.a.pressed = false;
                break;
            
            case 'd':
                keys.d.pressed = false;
                break;

        }


    })




}