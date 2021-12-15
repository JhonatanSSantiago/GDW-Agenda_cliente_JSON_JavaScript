document.getElementById("btCadastrar").addEventListener("click",
    (evento)=>{
        evento.preventDefault();
        let pessoa=pegaDados();
        var grupo=[];
        if(localStorage.dados!=undefined){
            grupo=JSON.parse(localStorage.dados);
        }
        grupo.push(pessoa);
        let textoJson=JSON.stringify(grupo);
        localStorage.dados=textoJson;
        mostrarRelatorio();
    }
);

mostrarRelatorio=()=>{
    let pessoas=JSON.parse(localStorage.dados);
    let texto="";
    for(let pessoa of pessoas)
        texto+=criaLinha(pessoa);
    document.getElementById("relatorio").innerHTML=texto;
}

onload=mostrarRelatorio;

function pegaDados(){
    let p={};
    p.nome=document.getElementById("nome").value;
    p.idade=parseInt(document.getElementById("idade").value);
    p.telefones=pegaTelefones();
    return p;
}

function pegaTelefones()
{   
    let numeros=document.querySelectorAll(".numero");
    let tam=numeros.length;
    let telefones=[];  
    for(let i= 0;i< tam ; i++) {
      telefones.push(numeros[i].value);
    }
    return telefones;
}

function criaLinha(pessoa){
    return `<tr class="pessoa"><td>${pessoa.nome}</td><td>${pessoa.idade}</td><td>${pessoa.telefones}</td><td><button >Editar</button></td><td><button onclick=excluir(this)>Excluir</button></td></tr> `;
}


document.getElementById("btAdd").onclick=()=>{
    let texto='<div>\
                    NUMERO:<input type="text" class="numero" placeholder="(00) 00000-0000">\
                    <button type="button" class="btRem" onclick=remover(this)>X</button>\
               </div>';
    document.getElementById("telefones").innerHTML+=texto;
}

function remover(botao){
    let pai = botao.parentNode;
    pai.parentNode.removeChild(pai);
}

function excluir(bt){ 
    /*Função excluir nao esta excluindo no localStorage
        Pelo que entendi, ele cria uma chave Dados e coloca as Pessoas nela.
        Nome, Idade, Telefones, nao sao chaves de pessoas, sao dados junto com pessoa da Chave Dados
        Digitando localStorage no console. embaixo aparece os dados armazenados e quantas chaves existem
        Se digita localStorage.dados, mostra os dados dessa chave. e nao é possivel usar o metodo localStorage.getItem() ou localStorage.removeItem()

    */
    let td = bt.parentNode;
    let tr = td.parentNode;
    let ps = document.querySelectorAll(".pessoa");
    let tam = ps.length;
    
    for(let i=0; i < tam; i++){
        if(ps[i]==tr)
            if(tr.nodeType == 1)   {  
                console.log(tr.firstChild);
                let nome =tr.firstChild.firstChild.nodeValue; // retorna o nome do contato
                let dado = localStorage.getItem(nome);
                console.log(dado); //Retona null
            }       
            
            //Metodo abaixo apaga todos os contatos do localStorage
          //  localStorage.removeItem("dados");
        
    }


    tr.parentNode.removeChild(tr);
    
}