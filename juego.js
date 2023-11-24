window.onload = function () {

    //VARIABLES
    const BORDEDERECHA = 1200;

    const BORDEINFERIOR = 1220;


    //CANVAS
    canvas = document.getElementById("miCanvas");
    // Generamos el contexto de trabajo
    ctx = canvas.getContext("2d");

    //SPRITE

    class Sprite {
        constructor({ position }) {
            this.position = position;
            this.image = new Image();
            this.image.src = './assets/Escenario.png';
        }

        draw() {
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
    class Player {
        constructor() {
            this.floor = false;
            this.position = {
                x: 150,
                y: 100
            }

            this.velocity = {
                x: 0,
                y: 0
            }

            this.gravity = 1;
            this.width = 50;
            this.height = 50;

            this.sides = {
                bottom: this.position.y + this.height,
                top: this.position.y,
                left: this.position.x,
                right: this.position.x + this.width
            }
        }

        draw() {
            ctx.fillStyle = 'red';
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }

        update() {

            this.sides.left = this.position.x;
            this.sides.right = this.position.x + this.width;
            this.sides.bottom = this.position.y + this.height;

            //por encima del borde inferior
            /* if (this.sides.bottom + this.velocity.y < BORDEINFERIOR) {
                this.velocity.y += this.gravity;
            } else { this.velocity.y = 0; } */
            this.velocity.y += this.gravity;
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;

        }

    }

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

    //PLATFORM 

    class Platform {

        constructor(position, width, height, inclinacion) {
            this.position = position;
            this.width = width;
            this.height = height;
            this.inclinacion = inclinacion;

        }

        draw() {



            ctx.fillStyle = 'rgba(200,200,0,3)';
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);


        }

    }

    const player = new Player();


    const platforms = [
        new Platform(
            position = {
                x: 804,
                y: 995
            }
            , 195, 40, 0),

        new Platform(
            position = {
                x: 608,
                y: 980
            }
            , 196, 40, 3.5),

        new Platform(
            position = {
                x: 410,
                y: 965
            }
            , 200, 40, -4),

        new Platform(
            position = {
                x: 210,
                y: 950
            }
            , 200, 40, 4.4),

        new Platform(
            position = {
                x: 145,
                y: 940
            }
            , 0, 40, -3.75),
        new Platform(
            position = {
                x: 806,
                y: 662
            }
            , 196, 40, 4.2),

        new Platform(
            position = {
                x: 673,
                y: 649
            }
            , 133, 40, 4.2),

        new Platform(
            position = {
                x: 540,
                y: 640
            }
            , 133, 40, 4.2),

        new Platform(
            position = {
                x: 410,
                y: 628
            }
            , 133, 40, 4.2),

        new Platform(
            position = {
                x: 277,
                y: 615
            }
            , 133, 40, 4.2),

        new Platform(
            position = {
                x: 145,
                y: 605
            }
            , 133, 40, 4.2),
        new Platform(
            position = {
                x: 217,
                y: 828
            }
            , 196, 40, 4.2),

        new Platform(
            position = {
                x: 410,
                y: 814
            }
            , 198, 40, 4.2),

        new Platform(
            position = {
                x: 608,
                y: 800
            }
            , 198, 40, 4.2),

        new Platform(
            position = {
                x: 805,
                y: 785
            }
            , 198, 40, 4.2),

        new Platform(
            position = {
                x: 1000,
                y: 779
            }
            , 65, 40, 4.2),

        new Platform(
            position = {
                x: 215,
                y: 493
            }
            , 133, 40, 4.2),

        new Platform(
            position = {
                x: 345,
                y: 485
            }
            , 133, 40, 4.2),

        new Platform(
            position = {
                x: 477,
                y: 473
            }
            , 133, 40, 4.2),

        new Platform(
            position = {
                x: 610,
                y: 465
            }
            , 133, 40, 4.2),

        new Platform(
            position = {
                x: 742,
                y: 455
            }
            , 133, 40, 4.2),

        new Platform(
            position = {
                x: 875,
                y: 445
            }
            , 133, 40, 4.2),

        new Platform(
            position = {
                x: 1005,
                y: 435
            }
            , 70, 40, 4.2),



        new Platform(
            position = {
                x: 875,
                y: 325
            }
            , 130, 40, 4.2),

        new Platform(
            position = {
                x: 741,
                y: 315
            }
            , 133, 40, 4.2),

        new Platform(
            position = {
                x: 148,
                y: 310
            }
            , 593, 38, 4.2),

        new Platform(
            position = {
                x: 152,
                y: 1135
            }
            , 853, 43, -0.1),

        new Platform(
            position = {
                x: 810,
                y: 1115
            }
            , 272, 43, -3.1),

    ]




    //LOOP - Animacion
    function animate() {
        window.requestAnimationFrame(animate);
        ctx.clearRect(0, 0, BORDEDERECHA, BORDEINFERIOR);

        player.velocity.x = 0;   //Si no se pone a 0, nunca se parará una vez presionada la tecla.
        if (keys.a.pressed) player.velocity.x = -5;
        else if (keys.d.pressed) player.velocity.x = 5;

        backgroundLevel.draw(); //Dibujar fondo

        for (platform of platforms) {
            platform.draw()
            if (
                player.position.x <= platform.position.x + platform.width && // si el jugador está dentro de la x del bloque
                player.position.x + player.width >= platform.position.x &&
                player.position.y + player.height + player.velocity.y >= platform.position.y && //y la parte baja del jugador más la velocidad es mayor o igual que la parte superior del bloque
                player.position.y < platform.position.y //para que haga el salto la parte superior del jugador tiene que estar más alta que el bloque
            ) {
                player.position.y = platform.position.y - player.height; //el jugador se situará a la misma altura que el bloque menos su altura
                player.velocity.y = 0; // la velocidad se pone a 0
                player.floor = true; //se pone que el jugador está en el suelo
            }
            if (
                player.position.y + player.velocity.y <= platform.position.y + platform.height && //si el jugador va a meterse por debajo del bloque
                player.position.x <= platform.position.x + platform.width && // y el jugador está dentro de la x del bloque
                player.position.x + player.width >= platform.position.x &&
                player.position.y > platform.position.y
            ) {
                player.velocity.y = 0;
                player.position.y = platform.position.y + platform.height;
            }
        }




        player.draw(); //Dibujar el rectangulo
        player.update(); //La actualización que este recibe al realizar procesos.


    }

    animate();

    window.addEventListener('keydown', (event) => {
        switch (event.key) {


            // Salto.
            case 'w':
                if (player.floor) {
                    player.velocity.y = -14
                    player.floor = false
                };
                break;

            case 'a':
                keys.a.pressed = true;
                break;

            case 'd':
                keys.d.pressed = true;
                break;

        }


    })

    window.addEventListener('keyup', (event) => {
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