const modal = {
    open() {
        //abrir modal
        //add a classe active modal
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close() {
        //fechar o modal
        //remover a class active modal
        document.querySelector('.modal-overlay').classList.remove('active')
    }

    // pesquisar function "toggle"

}

const transations = [{
        id: 1,
        description: 'Luz',
        amount: -20000,
        date: '15/09/2021'
    },
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '15/09/2021'
    },
    {
        id: 3,
        description: 'Água',
        amount: -15000,
        date: '15/09/2021'
    }
]

const Transations = {
    incomes() {
        //somar entradas
    },
    expenses() {
        //somar saídas  
    },
    total() {
        //somar total
    }
}

const DOM = {
    transationsContainer: document.querySelector('#data-table tbody'),
    addTransaction(transation, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transation)
        
        DOM.transationsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transation) {

        const CSSclass= transation.amount > 0 ? "income" : "expense"

        const html = `
       
            <td class='description'>${transation.description}</td>
            <td class="expense">${transation.amount}</td>
            <td class='date'>${transation.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover Transação">
            </td>
        
        `
        return html
    }
}
transations.forEach(function(transation){
    DOM.addTransaction(transation)
})