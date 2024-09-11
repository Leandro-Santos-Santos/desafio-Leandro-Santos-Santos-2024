
const recintos = [
    { numero: 1, habitat: ['savana'], tamanhoTotal: 10, animaisAtuais: [{ tipo: 'MACACO', quantidade: 3 }] },
    { numero: 2, habitat: ['floresta'], tamanhoTotal: 5, animaisAtuais: [] },
    { numero: 3, habitat: ['savana', 'rio'], tamanhoTotal: 7, animaisAtuais: [{ tipo: 'GAZELA', quantidade: 1 }] },
    { numero: 4, habitat: ['rio'], tamanhoTotal: 8, animaisAtuais: [] },
    { numero: 5, habitat: ['savana'], tamanhoTotal: 9, animaisAtuais: [{ tipo: 'LEAO', quantidade: 1 }] }
];


const animais = {
    'LEAO': { tamanho: 3, habitats: ['savana'] },
    'LEOPARDO': { tamanho: 2, habitats: ['savana'] },
    'CROCODILO': { tamanho: 3, habitats: ['rio'] },
    'MACACO': { tamanho: 1, habitats: ['savana', 'floresta'] },
    'GAZELA': { tamanho: 2, habitats: ['savana'] },
    'HIPOPOTAMO': { tamanho: 4, habitats: ['savana', 'rio'] }
};


function encontrarRecintosViaveis(tipoAnimal, quantidade) {
    
    if (quantidade < 1) {
        return ["Quantidade inválida"];
    }

    
    const animal = animais[tipoAnimal];
    if (!animal) {
        return ["Animal inválido"];
    }

    const recintosViaveis = [];

    
    for (const recinto of recintos) {
       
        if (!recinto.habitat.some(habitat => animal.habitats.includes(habitat))) {
            continue;
        }

        
        let espacoOcupado = recinto.animaisAtuais.reduce((soma, atual) => soma + (animais[atual.tipo].tamanho * atual.quantidade), 0);
        let espacoDisponivel = recinto.tamanhoTotal - espacoOcupado;

      
        if (tipoAnimal === 'MACACO' && recinto.animaisAtuais.length === 0) {
            continue; 
        }

        if (tipoAnimal === 'HIPOPOTAMO' && !recinto.habitat.includes('rio')) {
            continue; 
        }

        
        if (recinto.animaisAtuais.length > 0) {
            espacoDisponivel -= 1; 
        }

        
        if (espacoDisponivel >= (animal.tamanho * quantidade)) {
            const espacoRestante = espacoDisponivel - (animal.tamanho * quantidade);
            recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoRestante} total: ${recinto.tamanhoTotal})`);
        }
    }

    
    return recintosViaveis.length > 0 ? recintosViaveis : ["Não há recinto viável"];
}


const resultado = encontrarRecintosViaveis('MACACO', 12);
console.log(resultado);