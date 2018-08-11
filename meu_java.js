//Inicio do jogo//
	var timer_id = null;
	var balao;
	function iniciarJogo(){
		var dificuldade= document.getElementById('dificuldade').value;
		if(dificuldade == "" || dificuldade == null){
			alert('Selecione um nível de dificuldade');
			return false;
		}
		window.location.href = 'jogo.html?' + dificuldade;
	}	

	function inicio_jogo(){
		var url= window.location.search;
		var nivel_jogo = parseInt(url.replace("?", ""));
		var tempo_segundos = 0;
		switch(nivel_jogo){
			case 1:
				tempo_segundos= 120;
				break;
			case 2:
				tempo_segundos= 60;
				break;
			case 3:
				tempo_segundos= 45;
				break;
		}
		document.getElementById('cronometro').innerHTML = tempo_segundos;

		var qtde_baloes = 88;
		document.getElementById('balao_vivo').innerHTML = qtde_baloes;
		var balao_estourados = 0;
		document.getElementById('balao_estourados').innerHTML = balao_estourados;

		criarBaloes(qtde_baloes);
		cont_tempo(tempo_segundos + 1);
	}
	function cont_tempo(segundos){

		segundos = segundos - 1;
		if (segundos == -1) {
			clearTimeout(timer_id);


			gameover();
			remove_eventos_baloes();

			return false;
		}
		document.getElementById('cronometro').innerHTML = segundos;
		timer_id = setTimeout("cont_tempo("+segundos+")", 1000);
	}
	function gameover(){
		alert('Fim de jogo, você perdeu!');
	}
	function criarBaloes(qtde_baloes){
		for(var i=1;i <= qtde_baloes; i++){
			var balao = document.createElement("img");
			balao.src = 'imagens/balao_azul_pequeno.png'
			balao.style.margin = '9px';
			balao.id = 'b'+i
			balao.onclick = function(){ estourar(this);}
			document.getElementById('cenario').appendChild(balao);

		}
	}
	function estourar(e){
		var id_balao = e.id;
		document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
		pontuacao(-1);
		document.getElementById(id_balao).onclick = function(){""}
		
	}
	function pontuacao(action){
		var baloes_inteiros = document.getElementById('balao_vivo').innerHTML;
		var baloes_estourados = document.getElementById('balao_estourados').innerHTML;
		baloes_inteiros= parseInt(baloes_inteiros);
		baloes_estourados = parseInt(baloes_estourados);
		baloes_inteiros = baloes_inteiros + action;
		baloes_estourados = baloes_estourados - action;

		 document.getElementById('balao_vivo').innerHTML= baloes_inteiros;
		 document.getElementById('balao_estourados').innerHTML= baloes_estourados;
	
		 situacao_jogo();
	}	
	function situacao_jogo(){
		var baloes_inteiros = document.getElementById('balao_vivo').innerHTML;
			baloes_inteiros = parseInt(baloes_inteiros);
			if (baloes_inteiros == 0) {
				clearTimeout(timer_id);
				alert('parabéns, você completou o jogo!');
				window.location.href = 'index.html';
			}

	}
	function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}