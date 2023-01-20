//Consulta cep em massa
function ConsultaemMassa(){
    var consulta_cep_em_massa = document.getElementById('cep').value;
    //console.log('Valor digitado ' + consulta_cep_em_massa);

    //Retorna array
    var resultado = consulta_cep_em_massa.split(",");

    //Contador posicoes
    //console.log('Ceps digitados ' + resultado.length); 

    for(var i = 0; i <resultado.length ; i++){
        //console.log('Resultado vetorizado ' + resultado[i]);
        
        //Pesquisa cep
        var url_recebe = 'https://viacep.com.br/ws/'+ resultado[i] +'/json/'

        //retorna endereço via cep
        $.ajax({
            url: url_recebe,
            type: 'GET',
            success: function(response){
                //replace cep
                var cep_formatado = response.cep.replace('-' , '');

                //Criando elemento
                let consultaEmMassaTr = document.createElement('tr');
                let consultaEmMassaTd = document.createElement('td');

                //valida montagem cep
                switch (response.logradouro) {
                    case '':
                        //Sem logradouro
                        consultaEmMassaTd.textContent = cep_formatado + '|0|' + response.bairro + '|' + response.localidade + '|' + response.uf + '|' + response.ibge;
                        break;

                        default: 
                        console.log(cep_formatado + '|' + response.logradouro + '|' + response.bairro + '|' + response.localidade + '|' + response.uf + '|' + response.ibge);

                        consultaEmMassaTd.textContent = cep_formatado + '|' + response.logradouro + '|' + response.bairro + '|' + response.localidade + '|' + response.uf + '|' + response.ibge;

                        //Adicionando td na tr
                        consultaEmMassaTr.appendChild(consultaEmMassaTd);

                        //Adicionando dados na tabela
                        let table = document.querySelector('#consulta-em-massa');
                        table.appendChild(consultaEmMassaTr);

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