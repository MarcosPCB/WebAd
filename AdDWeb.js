// JavaScript Document

var jsn; //Objeto JSON contendo as imagens de produtos e selos
var ad_obj = { }; //Objeto JSON contendo o anúncio
var info_state = [ 0, 0, 0, 0, 0 ]; //Determina a atual situação dos campos de informação - 0 não está ativado, 1 está ativado

$('#seloimg').hide(); //Esconde selo

//Carrega a base dos produtos contendo as imagens disponiveis, selos e etc
$.getJSON("_assets/produtos.json", function(d)
{ 
    jsn = d; 
    
    for(var i = 1; i <= jsn['produtos']; i++)
    {
        $('#produto').append('<option value="' + i + '">' + jsn[i.toString()]['produto'] + '</option>');
    }
});

document.getElementById('LOADJSON').addEventListener('change', LoadJSON, false);

//Dá play no visualizador
function PlayFrame()
{
    var s = $('#produto').val(); //Cata o produto atual
    
    GenerateJSON(); //Gera o objeto JSON
    
    var json = btoa(encodeURIComponent(JSON.stringify(ad_obj))); //Transforma em string, codifica certos componentes e transforma em Base 64
    
    //Não sei porque, mas a ordem deve ser essa - recarregar a página e depois mudar o caminho dela
    document.getElementById('Iframe').contentWindow.location.reload(true);
    document.getElementById('Iframe').contentWindow.location.href = 'misc/viewer.html?p=' + jsn[s]['pasta'] + '&json=' + json;
}

//Abre a pagina com a visualização em multiplos dispositivos
function Visualizer()
{  
    var s = $('#produto').val(); //Cata o produto atual
    
    GenerateJSON(); //Gera o objeto JSON
    
    var json = btoa(encodeURIComponent(JSON.stringify(ad_obj))); //Transforma em string, codifica certos componentes e transforma em Base 64
    
    window.open('misc/visualizador.html?p=' + jsn[s]['pasta'] + '&json=' + json); //Muda pra página de visualização
}

//Atualiza o visualizador
function RefreshFrame()
{
    document.getElementById('Iframe').contentWindow.location.reload(true);
}

//Pula para animação do logo no visualizador
function JumpLogo()
{
    document.getElementById('Iframe').contentWindow.$('#WHITE-TRANSITION').trigger('transitionend');
}

//Pula pra parte principal do sistema no visualizador
function JumpMain()
{
    document.getElementById('Iframe').contentWindow.$('#T2').trigger('transitionend');
}

//Altera todos os outros campos quando o produto é selecionado
function SelecaoProduto()
{
    var s = $('#produto').val(); //Pega o produto atual
    
    //Limpa as seleções de imagens
    $('#ci_i1').empty();
    $('#ci_i1').append('<option selected>Nenhum</option>');
    
    $('#ci_i2').empty();
    $('#ci_i2').append('<option selected>Nenhum</option>');
    
    $('#ci_i3').empty();
    $('#ci_i3').append('<option selected>Nenhum</option>');
    
    $('#ci_i4').empty();
    $('#ci_i4').append('<option selected>Nenhum</option>');
    
    $('#ci_i5').empty();
    $('#ci_i5').append('<option selected>Nenhum</option>');
    
    $('#ci_i6').empty();
    $('#ci_i6').append('<option selected>Nenhum</option>');
    
    //Carrega os carrosseis com as imagens corretas
    for(var i = 0; i < jsn[s]['imagens'].length; i++)
    {
        $('#ci_i1').append('<option value="' + i + '">' + jsn[s]['imagens'][i] + '</option>');
        $('#ci_i2').append('<option value="' + i + '">' + jsn[s]['imagens'][i] + '</option>');
        $('#ci_i3').append('<option value="' + i + '">' + jsn[s]['imagens'][i] + '</option>');
        $('#ci_i4').append('<option value="' + i + '">' + jsn[s]['imagens'][i] + '</option>');
        $('#ci_i5').append('<option value="' + i + '">' + jsn[s]['imagens'][i] + '</option>');
        $('#ci_i6').append('<option value="' + i + '">' + jsn[s]['imagens'][i] + '</option>');
        
        $('#ci_i1').next().hide();
        $('#img1').hide();
        $('#ci_i2').hide();
        $('#ci_i2').prev().hide();
        $('#ci_i2').next().hide();
        $('#img2').hide();
        $('#ci_i3').hide();
        $('#ci_i3').prev().hide();
        $('#ci_i3').next().hide();
        $('#img3').hide();
        $('#ci_i4').hide();
        $('#ci_i4').prev().hide();
        $('#ci_i4').next().hide();
        $('#img4').hide();
        $('#ci_i5').hide();
        $('#ci_i5').prev().hide();
        $('#ci_i5').next().hide();
        $('#img5').hide();
        $('#ci_i6').hide();
        $('#ci_i6').prev().hide();
        $('#ci_i6').next().hide();
        $('#img6').hide();
    }
    
    //Limpa o selo
    $('#selo').empty();
    $('#selo').append('<option selected>Nenhum</option>');
    
    //Carrega os selos
    for(i = 0; i < jsn['selos'].length; i++)
        $('#selo').append('<option value="' + i + '">' + jsn['selos'][i] + '</option>');
    
    //Limpa os campos das informações
    $('#i1_i').empty();
    $('#i1_i').append('<option selected>Selecione</option>');
    
    $('#i2_i').empty();
    $('#i2_i').append('<option selected>Selecione</option>');
    
    $('#i3_i').empty();
    $('#i3_i').append('<option selected>Selecione</option>');
    
    $('#i4_i').empty();
    $('#i4_i').append('<option selected>Selecione</option>');
    
    //Carrega os selos no campo de imagens das informações
    for(i = 0; i < jsn['selos'].length; i++)
    {
        $('#i1_i').append('<option value="' + i + '">' + jsn['selos'][i] + '</option>');
        $('#i2_i').append('<option value="' + i + '">' + jsn['selos'][i] + '</option>');
        $('#i3_i').append('<option value="' + i + '">' + jsn['selos'][i] + '</option>');
        $('#i4_i').append('<option value="' + i + '">' + jsn['selos'][i] + '</option>');
    }
    
    document.getElementById('Iframe').contentWindow.location.reload(true);
    document.getElementById('Iframe').contentWindow.location.href = 'misc/viewer.html?p=' + jsn[s]['pasta'];
}

//Recarrega  os campos de informação quando o 'tipo' é alterado
function MudarTipoInfo()
{
    var t = "";
    
    for(var i = 1; i <= 4; i++)
    {
        if(i == 1)
        {
            t = $('#info_1').val();
            
            switch(t)
            {
                case 'Lista':
                    $('#i' + i + '_l1').show();
                    $('#i' + i + '_l1').attr('placeholder', "Linha 1");
                    
                    $('#i' + i + '_l2p').val("");
                    $('#i' + i + '_l2p').hide();
                    
                    $('#i' + i + '_i').val("Selecione");
                    $('#i' + i + '_i').hide();
                    break;
                    
                case 'Paragrafo':
                    $('#i' + i + '_l1').show();
                    $('#i' + i + '_l1').attr('placeholder', "Título");
                    $('#i' + i + '_l2').val("");
                    $('#i' + i + '_l2').hide();
                    $('#i' + i + '_l3').val("");
                    $('#i' + i + '_l3').hide();
                    $('#i' + i + '_l4').val("");
                    $('#i' + i + '_l4').hide();
                    
                    $('#i' + i + '_l2p').show();
                    
                    $('#i' + i + '_i').val("Selecione");
                    $('#i' + i + '_i').hide();
                    break;
                    
                case 'Imagem':
                    $('#i' + i + '_l1').val("");
                    $('#i' + i + '_l1').hide();
                    $('#i' + i + '_l2').val("");
                    $('#i' + i + '_l2').hide();
                    $('#i' + i + '_l3').val("");
                    $('#i' + i + '_l3').hide();
                    $('#i' + i + '_l4').val("");
                    $('#i' + i + '_l4').hide();
                    
                    $('#i' + i + '_l2p').val("");
                    $('#i' + i + '_l2p').hide();
                    
                    $('#i' + i + '_i').show();
                    break;
            }
        }
        else
        {
            if(info_state[i - 1] == 1)
            {
                t = $('#info_' + i).val();
            
                switch(t)
                {
                    case 'Lista':
                        $('#i' + i + '_l1').show();
                        $('#i' + i + '_l1').attr('placeholder', "Linha 1");

                        $('#i' + i + '_l2p').val("");
                        $('#i' + i + '_l2p').hide();

                        $('#i' + i + '_i').val("Selecione");
                        $('#i' + i + '_i').hide();
                        break;

                    case 'Paragrafo':
                        $('#i' + i + '_l1').show();
                        $('#i' + i + '_l1').attr('placeholder', "Título");
                        $('#i' + i + '_l2').val("");
                        $('#i' + i + '_l2').hide();
                        $('#i' + i + '_l3').val("");
                        $('#i' + i + '_l3').hide();
                        $('#i' + i + '_l4').val("");
                        $('#i' + i + '_l4').hide();

                        $('#i' + i + '_l2p').show();

                        $('#i' + i + '_i').val("Selecione");
                        $('#i' + i + '_i').hide();
                        break;

                    case 'Imagem':
                        $('#i' + i + '_l1').val("");
                        $('#i' + i + '_l1').hide();
                        $('#i' + i + '_l2').val("");
                        $('#i' + i + '_l2').hide();
                        $('#i' + i + '_l3').val("");
                        $('#i' + i + '_l3').hide();
                        $('#i' + i + '_l4').val("");
                        $('#i' + i + '_l4').hide();

                        $('#i' + i + '_l2p').val("");
                        $('#i' + i + '_l2p').hide();

                        $('#i' + i + '_i').show();
                        break;
                }
            }
        }
    }
}

//Esta função é chamada toda vez que o texto de entrada ou de informações são alteradas ou inseridas
//Caso a linha 1 seja preenchida, a linha 2 é ativada e assim por diante
//Caso o campo de informações 1 seja ativado, o campo de informações 2 é ativado e assim por diante

function TextoEntrada()
{
    for(var i = 1; i <= 4; i++)
    {
        if($('#te_l' + i).val().length > 0)
            $('#te_l' + (i + 1)).show();
        else
        {
            $('#te_l' + (i + 1)).val("");
            $('#te_l' + (i + 1)).hide();
        }
        
            for(var j = 1; j < 4; j++)
            {
                if($('#i' + i + '_l' + j).val().length > 0 && $('#info_' + i).val() == 'Lista')
                    $('#i' + i + '_l' + (j + 1)).show();
                else
                {
                    $('#i' + i + '_l' + (j + 1)).val("");
                    $('#i' + i + '_l' + (j + 1)).hide();

                }
            }

            if(($('#i' + i + '_l1').val().length > 0 || $('#i' + i + '_i').val() != 'Selecione'))
                info_state[i] = 1;
            else
            {
                info_state[i] = 0;
                
                for(j = i + 1; j <= 4; j++)
                {
                    info_state[j] = 0;
                    $('#i' + j + '_l1').val("");
                    $('#i' + j + '_i').val("Selecione");
                }
            }
    
        if(i > 1 && info_state[i - 1] == 1)
        {
            $('#info_' + i).show();
            $('#info_' + i).prev().show();

            var t = $('#info_' + i).val();

            t = $('#info_' + i).val();

            switch(t)
            {
                case 'Lista':
                    $('#i' + i + '_l1').show();
                    $('#i' + i + '_l1').attr('placeholder', "Linha 1");

                    $('#i' + i + '_l2p').val("");
                    $('#i' + i + '_l2p').hide();

                    $('#i' + i + '_i').val("Selecione");
                    $('#i' + i + '_i').hide();
                    break;

                case 'Paragrafo':
                    $('#i' + i + '_l1').show();
                    $('#i' + i + '_l1').attr('placeholder', "Título");
                    $('#i' + i + '_l2').val("");
                    $('#i' + i + '_l2').hide();
                    $('#i' + i + '_l3').val("");
                    $('#i' + i + '_l3').hide();
                    $('#i' + i + '_l4').val("");
                    $('#i' + i + '_l4').hide();

                    $('#i' + i + '_l2p').show();

                    $('#i' + i + '_i').val("Selecione");
                    $('#i' + i + '_i').hide();
                    break;

                case 'Imagem':
                    $('#i' + i + '_l1').val("");
                    $('#i' + i + '_l1').hide();
                    $('#i' + i + '_l2').val("");
                    $('#i' + i + '_l2').hide();
                    $('#i' + i + '_l3').val("");
                    $('#i' + i + '_l3').hide();
                    $('#i' + i + '_l4').val("");
                    $('#i' + i + '_l4').hide();

                    $('#i' + i + '_l2p').val("");
                    $('#i' + i + '_l2p').hide();

                    $('#i' + i + '_i').show();
                    break;
            }
        }
        else
        if(i > 1 && info_state[i - 1] == 0)
        {
            $('#info_' + i).hide();
            $('#info_' + i).prev().hide();

            $('#i' + i + '_l1').val("");
            $('#i' + i + '_l1').hide();
            $('#i' + i + '_l2').val("");
            $('#i' + i + '_l2').hide();
            $('#i' + i + '_l3').val("");
            $('#i' + i + '_l3').hide();
            $('#i' + i + '_l4').val("");
            $('#i' + i + '_l4').hide();

            $('#i' + i + '_l2p').val("");
            $('#i' + i + '_l2p').hide();

            $('#i' + i + '_i').val("Selecione");
            $('#i' + i + '_i').hide();
        }
    }
}

//Toda vez que uma imagem é selecionada, ativa a próxima seleção de imagens
function CarrosselImagem()
{
    var s = $('#produto').val();
    
    for(var i = 1; i <= 6; i++)
    {
        if($('#ci_i' + i).val() == 'Nenhum')
        {
            $('#ci_i' + (i + 1)).val("Nenhum");
            $('#ci_i' + (i + 1)).hide();
            $('#ci_i' + (i + 1)).prev().hide();
            $('#ci_i' + (i + 1)).next().hide();
            $('#img' + (i + 1)).hide();
        }
        else
        {
            $('#ci_i' + (i + 1)).show();
            $('#ci_i' + (i + 1)).prev().show();
        }
        
        if($('#ci_i' + i).val() != 'Nenhum')
        {
            $('#ci_i' + i).next().show();
            $('#img' + i).show();
        }
        else
        {
            $('#ci_i' + i).next().hide();
            $('#img' + i).hide();
        }
            
        $('#img' + i).attr('src', "_assets/" + jsn[s]['pasta'] + '/' + jsn[s]['imagens'][parseInt($('#ci_i' + i).val())] + ".jpg");
    }
}

//Carrega o preview do selo
function Selo()
{
    let selo_val = jsn['selos'][parseInt($('#selo').val())];

    if(selo_val == undefined)
        $('#seloimg').hide();
    else
    {
        $('#seloimg').show();
        $('#seloimg').attr('src', "_assets/_selos/" + selo_val + ".png");
    }
}

//Carrega um anuncio JSON
function LoadJSON(e)
{
    var f = e.target.files;
    
    var r = new FileReader();
    
    r.onload = function(e)
    {
        ad_obj = JSON.parse(e.target.result); 
        var d = ad_obj;
        var s = "";
        
        //Checa se o anuncio possui um produto válido
        for(var i = 1; i <= jsn['produtos']; i++)
        {
            s = i.toString();
            
            if(d['titulo_pagina'] == jsn[s]['produto'])
            {
                $('#produto').val(s);
                break;
            }
        }
        
        //Com o produto selecionado, carrega os campos com as informações corretas
        SelecaoProduto();
        
        //Preenche os campos com os textos e imagens do anuncio
        for(i = 1; i <= 4; i++)
        {
            $('#te_l' + i).val(d['texto_entrada']['linha_' + i]);
            
            $('#info_' + i).val(d['informacoes']['info_' + i]['tipo'].charAt(0).toUpperCase() + d['informacoes']['info_' + i]['tipo'].slice(1));
            
            if(d['informacoes']['info_' + i]['tipo'] == 'lista')
            {
                for(var j = 1; j <= 4; j++)
                    $('#i' + i + '_l' + j).val(d['informacoes']['info_' + i]['linha_' + j]);
            }
            
            if(d['informacoes']['info_' + i]['tipo'] == 'paragrafo')
            {
                $('#i' + i + '_l1').val(d['informacoes']['info_' + i]['titulo']);
                $('#i' + i + '_l2p').val(d['informacoes']['info_' + i]['texto']);
            }
            
            if(d['informacoes']['info_' + i]['tipo'] == 'imagem')
            {
                for(j = 0; j < jsn['selos'].length; j++)
                {
                    if(d['informacoes']['info_' + i]['imagem'] == jsn['selos'][j])
                    {
                        $('#i' + i + '_i').val(j.toString());
                        break;
                    }
                }
            }
        }
        
        for(i = 1; i <= 6; i++)
        {   
            for(j = 0; j < jsn[s]['imagens'].length; j++)
            {
                if(d['imagens']['imagem_' + i] == jsn[s]['imagens'][j])
                {
                    $('#ci_i' + i).val(j.toString());
                    break;
                }
            }
        }
        
        if(typeof d['selo'] != 'undefined')
        {
            for(j = 0; j < jsn['selos'].length; j++)
            {
                if(d['selo'] == jsn['selos'][j])
                {
                    $('#selo').val(j.toString());
                    break;
                }
            }
        }
        
        //Com o anuncio carregado, libera os campos de textos e imagens preenchidos
        CarrosselImagem();
        TextoEntrada();
    };
    
    r.readAsText(f[0]);
}

//Gera um objeto JSON com o anuncio
function GenerateJSON()
{
    var s = $('#produto').val();
    var te_l, c_n, i_n, i_l = [4];
    
    //Conta o numero de linhas do texto de entrada foram preenchidas
    for(te_l = 1; te_l <= 4; te_l++)
    {
        if($('#te_l' + te_l).val().length == 0)
            break;
    }
    
    te_l--;
    
    //Conta o numero de imagens que foram selecionadas
    for(c_n = 1; c_n <= 6; c_n++)
    {
        if($('#ci_i' + c_n).val() == 'Nenhum')
            break;
    }
    
    c_n--;
    
    //Conta o numero de informaç~çoes do carrossel e quantas linhas (caso seja do tipo 'Lista') foram preenchidas
    for(i_n = 1; i_n <= 4; i_n++)
    {
        if($('#info_' + i_n).val() == 'Lista')
        {
            for(i_l[i_n - 1] = 1; i_l[i_n - 1] <= 4; i_l[i_n - 1]++)
            {
                if($('#i' + i_n + '_l' + i_l[i_n - 1]).val().length == 0)
                    break
            }
            
            i_l[i_n - 1]--;
             
            if(i_l[i_n - 1] == 0)
                break;
            
            continue;
        }
        else
        if($('#info_' + i_n).val() == 'Paragrafo')
        {
            if($('#i' + i_n + '_l1').val().length == 0)
                break;
            
            continue;
        }
        else
        {
            if($('#i' + i_n + '_i').val() == 'Nenhum')
                break;
            
            continue;
        }
    }
    
    i_n--;
    
    //Gera objetos para cada informação
    if(i_n > 0)
    {
        var info1_obj = {
                tipo: $('#info_1').val().toLowerCase(),
                linhas: i_l[0],
                linha_1: $('#i1_l1').val().length > 0 ? $('#i1_l1').val() : " ",
                linha_2: $('#i1_l2').val().length > 0 ? $('#i1_l2').val() : " ",
                linha_3: $('#i1_l3').val().length > 0 ? $('#i1_l3').val() : " ",
                linha_4: $('#i1_l4').val().length > 0 ? $('#i1_l4').val() : " ",
                titulo: $('#i1_l1').val().length > 0 && $('#info_1').val() == 'Paragrafo' ? $('#i1_l1').val() : " ",
                texto: $('#i1_l2p').val().length > 0 ? $('#i1_l2p').val() : " ",
                imagem: $('#i1_i').val() != 'Nenhum' ? jsn['selos'][parseInt($('#i1_i').val())] : " "
        };
    }
    
    if(i_n > 1)
    {
        var info2_obj = {
                tipo: $('#info_2').val().toLowerCase(),
                linhas: i_l[1],
                linha_1: $('#i2_l1').val().length > 0 ? $('#i2_l1').val() : " ",
                linha_2: $('#i2_l2').val().length > 0 ? $('#i2_l2').val() : " ",
                linha_3: $('#i2_l3').val().length > 0 ? $('#i2_l3').val() : " ",
                linha_4: $('#i2_l4').val().length > 0 ? $('#i2_l4').val() : " ",
                titulo: $('#i2_l1').val().length > 0 && $('#info_2').val() == 'Paragrafo' ? $('#i2_l1').val() : " ",
                texto: $('#i2_l2p').val().length > 0 ? $('#i2_l2p').val() : " ",
                imagem: $('#i2_i').val() != 'Nenhum' ? jsn['selos'][parseInt($('#i2_i').val())] : " "
        };
    }
    
    if(i_n > 2)
    {
        var info3_obj = {
                tipo: $('#info_3').val().toLowerCase(),
                linhas: i_l[2],
                linha_1: $('#i3_l1').val().length > 0 ? $('#i3_l1').val() : " ",
                linha_2: $('#i3_l2').val().length > 0 ? $('#i3_l2').val() : " ",
                linha_3: $('#i3_l3').val().length > 0 ? $('#i3_l3').val() : " ",
                linha_4: $('#i3_l4').val().length > 0 ? $('#i3_l4').val() : " ",
                titulo: $('#i3_l1').val().length > 0 && $('#info_3').val() == 'Paragrafo' ? $('#i3_l1').val() : " ",
                texto: $('#i3_l2p').val().length > 0 ? $('#i3_l2p').val() : " ",
                imagem: $('#i3_i').val() != 'Nenhum' ? jsn['selos'][parseInt($('#i3_i').val())] : " "
        };
    }
    
    if(i_n > 3)
    {
        var info4_obj = {
                tipo: $('#info_4').val().toLowerCase(),
                linhas: i_l[3],
                linha_1: $('#i4_l1').val().length > 0 ? $('#i4_l1').val() : " ",
                linha_2: $('#i4_l2').val().length > 0 ? $('#i4_l2').val() : " ",
                linha_3: $('#i4_l3').val().length > 0 ? $('#i4_l3').val() : " ",
                linha_4: $('#i4_l4').val().length > 0 ? $('#i4_l4').val() : " ",
                titulo: $('#i4_l1').val().length > 0 && $('#info_4').val() == 'Paragrafo' ? $('#i4_l1').val() : " ",
                texto: $('#i4_l2p').val().length > 0 ? $('#i4_l2p').val() : " ",
                imagem: $('#i4_i').val() != 'Nenhum' ? jsn['selos'][parseInt($('#i4_i').val())] : " "
        };
    }
    
    //Objeto principal
    var ad = {
        
        titulo_pagina: jsn[s]['produto'],
        texto_entrada:
        {
            linhas: te_l,
            linha_1: $('#te_l1').val().length > 0 ? $('#te_l1').val() : " ",
            linha_2: $('#te_l2').val().length > 0 ? $('#te_l2').val() : " ",
            linha_3: $('#te_l3').val().length > 0 ? $('#te_l3').val() : " ",
            linha_4: $('#te_l4').val().length > 0 ? $('#te_l4').val() : " "
        },
        
        imagens:
        {
            imagens: c_n,
            imagem_1: $('#ci_i1').val() != 'Nenhum' ? jsn[s]['imagens'][parseInt($('#ci_i1').val())] : " ",
            imagem_2: $('#ci_i2').val() != 'Nenhum' ? jsn[s]['imagens'][parseInt($('#ci_i2').val())] : " ",
            imagem_3: $('#ci_i3').val() != 'Nenhum' ? jsn[s]['imagens'][parseInt($('#ci_i3').val())] : " ",
            imagem_4: $('#ci_i4').val() != 'Nenhum' ? jsn[s]['imagens'][parseInt($('#ci_i4').val())] : " ",
            imagem_5: $('#ci_i5').val() != 'Nenhum' ? jsn[s]['imagens'][parseInt($('#ci_i5').val())] : " ",
            imagem_6: $('#ci_i6').val() != 'Nenhum' ? jsn[s]['imagens'][parseInt($('#ci_i6').val())] : " "
        },
        
        informacoes:
        {
            numero: i_n
        }
    };
    
    if($('#selo').val() != 'Nenhum')
       ad.selo = Object.assign(jsn['selos'][parseInt($('#selo').val())]);
    
    if(typeof info1_obj != 'undefined')
        ad.informacoes.info_1 = Object.assign(info1_obj);
    
    if(typeof info2_obj != 'undefined')
        ad.informacoes.info_2 = Object.assign(info2_obj);
    
    if(typeof info3_obj != 'undefined')
        ad.informacoes.info_3 = Object.assign(info3_obj);
    
    if(typeof info4_obj != 'undefined')
        ad.informacoes.info_4 = Object.assign(info4_obj);
    
    ad_obj = ad;
}

//Gera um arquivo com o objeto JSON em string com sua devida formatação para leitura humana
function DownloadJSON()
{
    GenerateJSON();
    
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(ad_obj, null, "\t")));
    element.setAttribute('download', 'anuncio.txt');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
