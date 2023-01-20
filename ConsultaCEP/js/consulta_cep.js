//formata url cep
function consultaCep(){
    var cep = document.getElementById('cep').value;

    if(cep.includes(',')){
        alert('Por favor, realizar uma consulta em massa')
    }else{
    var url_recebe = 'https://viacep.com.br/ws/'+ cep +'/json/'

    //limpa campo cep
    document.getElementById('cep').value = '';

    //retorna endereço via cep
    $.ajax({
        url: url_recebe,
        type: 'GET',
        success: function(response){
            //debug API CEP
            //console.log(response);

            //Input recebe dados API
            document.getElementById('cep_resultado').value = response.cep;
            document.getElementById('rua_resultado').value = response.logradouro;
            document.getElementById('bairro_resultado').value = response.bairro;
            document.getElementById('cidade_resultado').value = response.localidade;
            document.getElementById('uf_resultado').value = response.uf;
            document.getElementById('cod_ibge_resultado').value = response.ibge;

            //replace cep
            var cep_formatado = response.cep.replace('-' , '');

            //valida montagem cep
            switch (response.logradouro) {
                case '':
                    //Sem logradouro
                    document.getElementById('valor_formatado_resultado').value = cep_formatado + '|0|' + response.bairro + '|' + response.localidade + '|' + response.uf + '|' + response.ibge;
                    break;

                default: 
                    document.getElementById('valor_formatado_resultado').value = cep_formatado + '|' + response.logradouro + '|' + response.bairro + '|' + response.localidade + '|' + response.uf + '|' + response.ibge;
                    break;
            }
     
        },
        error: function(xhr){
            if(cep == ''){
                //debug cep não preenchido
                console.log('Cep não preenchido');

                alert('Campo CEP não preenchido');
            }else{
                //debug cep invalido
                console.log('Cep invalido');
                
                alert('CEP invalido');
                }
        }
    })
    }
}

