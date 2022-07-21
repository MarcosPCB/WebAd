<?php
//Funcionamento - o parâmetro 'p' define a pasta do produto e 'ad' o nome do arquivo do anúncio
//O script procura o arquivo: caminho do produto + valor de 'ad' + '.txt'
//Decodifica o JSON e carrega a página
//O JSON é simples, caso o redator quisesse fazer alguma alteração direto no arquivo, era só mexer lá, facilmente dá para as configurações


//Caso não ache os parâmetros - vai para a página principal da HM
if(!isset($_GET['p']) || !isset($_GET['ad']))
{
    header("Location: https://www.maishm.com.br");
    die();
}

$folder = "_assets/" . $_GET['p'] . '/'; //diretório do ad
$ad = $folder . $_GET['ad'] . '.txt'; //o anuncio é um JSON em txt

//Se não conseguir carregar o anúncio,
//dá um alerta e joga pra página principal da HM
if(($str = file_get_contents($ad, FILE_TEXT)) == false)
{
    echo("<script>alert(\"AdDWeb não encontrado\")</script>");
    header("Location: https://www.maishm.com.br");
    die();
}

$jsn = json_decode($str, true); //decodifica o JSON


//Daqui para frente, o PHP vai gerar as linhas HTML com estilo, imagem e texto corretos, de acordo com o JSON
?>


<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo($jsn['titulo_pagina']); ?></title>
    <!-- Bootstrap 4.0 -->
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    
    <link href="style.css" rel="stylesheet">
      
    <link <?php echo('href="' . $folder . 'estilo.css"'); ?> rel="stylesheet">
      
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@700&display=swap" rel="stylesheet">
  </head>

<body id="BODY">
    <div class="bg-white" id="WHITE-TRANSITION" style="height: 0%; width: 100%; position: absolute; z-index: 1000; -webkit-transition: height 1s ease-in-out; -webkit-transition-delay: 2s; transition: height 1s; transition-timing-function: ease-in-out; transition-delay: 2s"> </div>
    <div class="container-fluid" id="CT1">
        <div class="row justify-content-center align-items-center bg-color1" id="T1" style="min-height: 100vh">
            <div class="col-10" id="TEXTO_ENTRADA">
                <?php

                //Carrega o texto de entrada e anima ele
                $c = [ 'linha_1', 'linha_2', 'linha_3', 'linha_4' ]; //entradas JSON
                $d = [ ' "', ' anim-delay-03"', ' anim-delay-05"', ' anim-delay-07"' ]; //classes de animação
                    
                for($i = 0; $i < $jsn['texto_entrada']['linhas']; $i++)
                {
                    echo('<h4 class="text-center text-color1 text-animation-1 anim-duration-10 basefont' . $d[$i]);
                    
                    if($i == $jsn['texto_entrada']['linhas'] - 1)
                       echo(' id="TEXT"');
                       
                     echo(' >' . $jsn['texto_entrada'][$c[$i]] . '</h4>');
                }   
                       
                ?>
            </div>
        </div>
        
        <div class="row align-items-center bg-white" style="opacity: 1.0; -webkit-transition: opacity 1s; transition: opacity 1s; display: none;" id="T2">
            <div class="col-12 d-flex flex-wrap justify-content-center align-items-center" style="height: 100vh">
            <!-- Carrega o vídeo do logo animado -->
                <video style="max-width: 100vw; max-height: 100vh;" type="video/mp4" playsinline class="img-fluid" id="LOGO" <?php echo('src=' . $folder . 'Logo.mp4') ?> muted></video>
            </div>
        </div>
    </div>
    <div class="container-fluid" style="opacity: 0.0; -webkit-transition: opacity 0.5s; transition: opacity 0.5s; display: none;" id="T3">
        <div class="row justify-content-center" >
            <!-- Carrossel de imagens -->
            <div class="col-12 " id="IMG01" style="padding-right: 0; padding-left: 0; margin-top: -500px; -webkit-transition: all 1s ease-out; -webkit-transition-delay: 0.5s; transition: all 1s; transition-timing-function: ease-out; transition-delay: 0.5s;">
                <?php
                //Selo que fica acima da imagem (opcional)
                if(isset($jsn['selo']))
                {
                    echo('<div id="SELO" style="display: flex; position: absolute; z-index: 15; max-width: 10vw; max-height: 10vh; margin-left: 10px; margin-top: 10px;">');
                    echo('<img class="img-fluid w-100" style="align-self: flex-start;" src="' . '_assets/_selos/' . $jsn['selo'] . '.png"');
                    echo(' alt="Selo imperdível"></div>');
                }
                       
                ?>
                <div id="IMGCAR" class="carousel slide" data-interval="3000" data-wrap="false" data-touch="true">
                    <ol class="carousel-indicators indicator-circle">
                        <li data-target="#IMGCAR" data-slide-to="0" class="active"></li>
                        <?php
                        //Carrega o indicador do carrossel de acordo com o número de imagens disponíveis
                        for($i = 1; $i < $jsn['imagens']['imagens']; $i++)
                            echo('<li data-target="#IMGCAR" data-slide-to="' . $i . '"></li>');
                        
                        ?>
                      </ol>
                    <div class="carousel-inner">
                        <?php
                        //Carrossel de imagens

                        //Carrega as imagens correspondentes
                        $c = [ 'imagem_1', 'imagem_2', 'imagem_3', 'imagem_4', 'imagem_5', 'imagem_6' ]; //Entradas do JSON
                        
                        for($i = 0; $i < $jsn['imagens']['imagens']; $i++)
                        {
                            if($i == 0)
                                echo('<div class="carousel-item active"><div class="d-flex flex-wrap justify-content-center">');
                            else
                                echo('<div class="carousel-item"><div class="d-flex flex-wrap justify-content-center">');
                            
                            echo('<img class="img-fluid" style="align-self: flex-start; max-height: 600px; width: auto;" src="' . $folder . $jsn['imagens'][$c[$i]] . '.jpg"  alt="Imagem '. $i . ' do empreendimento"></div></div>');
                        }
                        
                        ?>
                    </div>
                </div>
            </div>
            <!-- Carrossel do meio com logo e chamada -->
            <div class="col-12 bg-white" style="height: 0vh; -webkit-transition: height 0.5s ease-out; -webkit-transition-delay: 0.9s; transition: height 0.5s ease-out; transition-delay: 0.9s;" id="WHITEBAR">
                <div id="LOGOCAR" class="carousel slide" data-interval="6000" data-wrap="true">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <div class="d-flex flex-wrap justify-content-center align-items-center" style="height: 10vh;">
                            <!-- Logo do empreendimento -->
                                <img class="img-fluid" id="LOGOPIC" <?php echo('src="' . $folder . 'Logo.png"'); ?> style="height: 0%; -webkit-transition: height 0.5s ease-in-out; -webkit-transition-delay: 1.5s; transition: height 0.5s ease-in-out; transition-delay: 1.5s;" alt="Logo do produto">
                            </div>
                        </div>
                        <div class="carousel-item">
                            <div class="d-flex flex-wrap justify-content-center align-items-center text-center" style="width: 100vw; height: 10vh;">
                                <h7 class="text-center font-weight-bold basefont">FALE COMIGO E SAIBA MAIS</h7>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <!-- Carrossel de informações - 3 tipos: Lista, Parágrafo e Imagem -->
            <div class="col-11 mt-3">
                <div  id="TXTCAR" class="carousel slide" data-interval="6000" data-wrap="false" data-touch="true">
                    <ol class="carousel-indicators" style="bottom: -35px;">
                        <li data-target="#TXTCAR" data-slide-to="0" class="active"></li>
                        <?php

                        //Indicador do carrossel
                        for($i = 1; $i < $jsn['informacoes']['numero']; $i++)
                            echo('<li data-target="#TXTCAR" data-slide-to="' . $i . '"></li>');
                        
                        ?>
                    </ol>
                    <div class="carousel-inner">
                         <?php
                        
                        $c = [ 'linha_1', 'linha_2', 'linha_3', 'linha_4' ]; //Entradas JSON para a lista
                        $e = [ 'info_1', 'info_2', 'info_3', 'info_4' ]; //Entradas JSON para as informações
                        $d = [ 'anim-delay-10', ' anim-delay-12', ' anim-delay-14', ' anim-delay-16' ]; //Classes para animação
                        
                        //Gera o carrossel de acordo com o número de informações e qual tipo
                        for($i = 0; $i < $jsn['informacoes']['numero']; $i++)
                        {
                            if($i == 0)
                                echo('<div class="carousel-item active">');
                            else
                                echo('<div class="carousel-item">');
                            
                            //LISTA - Máximo de 4 linhas
                            if($jsn['informacoes'][$e[$i]]['tipo'] == 'lista')
                            {
                                echo('<ul class="text-center text-color1 list-group text-animation-1 anim-delay-10 anim-duration-03" style="height: 13em">');
                                
                                for($j = 0; $j < $jsn['informacoes'][$e[$i]]['linhas']; $j++)
                                    echo('<li class="list-group-item text-animation-1 anim-duration-05 ' . $d[$j] . ' bg-color2 text-white">' . $jsn['informacoes'][$e[$i]][$c[$j]] . '</li>');
                                
                                echo('</ul>');
                            }
                            
                            //IMAGEM
                            if($jsn['informacoes'][$e[$i]]['tipo'] == 'imagem')
                            {
                                echo('<div class="d-flex flex-wrap justify-content-center align-content-center" style="height: 13em"><img class="img-fluid" src="' . '_assets/_selos/' . $jsn['informacoes'][$e[$i]]['imagem'] . '.png' . '" style="align-self: flex-start; width:auto; height:100%;"></div>');
                            }
                            
                            //PARÁGRAFO - Título e texto curto somente
                            if($jsn['informacoes'][$e[$i]]['tipo'] == 'paragrafo')
                            {
                                echo('<div class="text-center" style="height: 13em">');
                                echo('<h4 class="text-color1 font-weight-bold basefont">' . $jsn['informacoes'][$e[$i]]['titulo'] . '</h4>'); //Título
                                echo('<p class="text-white">' . $jsn['informacoes'][$e[$i]]['texto'] . '</p></div>'); //Texto
                            }
                            
                            echo('</div>');
                        }
                        
                        ?>
                    </div>
                </div>
            </div>
            <!-- FINAL -->
            <div class="col-12 d-flex flex-wrap justify-content-center align-self-end mb-3 mt-5">
                <img src="_assets/HM.png" style="align-self: flex-start; width: auto; min-width: 80px; max-width: 10vh; height: auto;" class="img-fluid" alt="HM">
            </div>
        </div>
        
    </div>
    
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script>
        let video = document.getElementById('LOGO');
        var tick = video.currentTime;
        
        //Código que permite movimentos touch funcionarem nos carrosseis
        $('.carousel').on('touchstart', function(event)
        {
            const xClick = event.originalEvent.touches[0].pageX;
            
            $(this).one('touchmove', function(event)
            {
                const xMove = event.originalEvent.touches[0].pageX;
                const sensitivityInPx = 5;

                if(Math.floor(xClick - xMove) > sensitivityInPx)
                    $(this).carousel('next');
                else
                if(Math.floor(xClick - xMove) < -sensitivityInPx)
                    $(this).carousel('prev');
            });
            
            $(this).on('touchend', function()
            {
                $(this).off('touchmove');
            });
        });
        
        //Sistema de coordenação das animações

        //Assim que a animação do texto de entrada termina
        //carrega a transição para o logo animado
        $('#TEXT').on('animationend', function()
        {
            $('#WHITE-TRANSITION').css('height', '100%');
        });
        
        //Transação do fundo branco termina, dá o play no vídeo
        $('#WHITE-TRANSITION').on('transitionend', function()
        {
            $('#T2').show();
            $('#WHITE-TRANSITION').hide();
            $('#T1').hide();
            $('#BG1').hide();
            
            video.play();
        })
        
        //Efeito de transição fade out no vídeo
        video.addEventListener('timeupdate', function(e)
        {
            tick++;
            
            if(tick == 10)
                $('#T2').css('opacity', '0.0');        
        });
        
        //Assim que a transação do vídeo termina, mostra o Ad em toda sua glória
        $('#T2').on('transitionend', function()
        {
            $('#T2').hide();
            $('#CT1').hide();
            $('#T3').show();
            $('#BODY').addClass('bg-color1');
            $('#T3').css('opacity', '1.0');
            $('#IMG01').css('margin-top', '0px');
            $('#WHITEBAR').css('height', '10vh');
            $('#LOGOPIC').css('height', '70%');
            
            $('#IMGCAR').carousel('cycle');

            $('#TXTCAR').carousel('cycle');
            
            $('#LOGOCAR').carousel('cycle');
        });
        
    </script>
</body>
</html>
