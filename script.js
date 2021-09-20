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
const Storage = {
    get(){
        return JSON.parse(localStorage.getItem("dev.finances:transaction")) || []
    },
    set(transaction){
        localStorage.setItem('dev.finances:transaction', JSON.stringify(transaction))
    }
}
const Transactions = {
        all:Storage.get(),
    add(transaction){
        Transactions.all.push(transaction)

        App.reload()
    },
    remove(index){
        Transactions.all.splice(index, 1)

        App.reload()
    },
    incomes() {
        let income = 0
        Transactions.all.forEach((transaction) => {
            if (transaction.amount > 0 ){
                income += transaction.amount
            }
        })

        return income
    },
    expenses() {
        let expense = 0
        Transactions.all.forEach((transaction) => {
            if (transaction.amount < 0 ){
                expense += transaction.amount
            }
        })

        return expense
        
    },
    total() {
        return Transactions.incomes() + Transactions.expenses()
    }
}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index
        
        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction, index) {

        const CSSclass= transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
       
            <td class='description'>${transaction.description}</td>
            <td class=${CSSclass}>${amount}</td>
            <td class='date'>${transaction.date}</td>
            <td>
                <img onclick="Transactions.remove(${index})"src="./assets/minus.svg" alt="Remover Transação">
            </td>
        
        `
        return html
    },
    updateBalance(){
        
        document.getElementById('incomeDisplay')
        .innerHTML= Utils.formatCurrency(Transactions.incomes())

        document.getElementById('expenseDisplay')
        .innerHTML= Utils.formatCurrency(Transactions.expenses())

        document.getElementById('totalDisplay')
        .innerHTML= Utils.formatCurrency(Transactions.total())
        
    },
    clearTransactions(){
        DOM.transactionsContainer.innerHTML=''
    }
}

const Utils = {
    formatAmount(value){   
        value = Number(value)*100    
        return value 
    },
    formatDate(date){
       
        const splittedDate = date.split('-')
        return (`${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`)
    },

    formatCurrency(value){
        const signal = Number(value) < 0 ? '-' : ''

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString('pt-BR', {
            style: "currency",
            currency:"BRL"
        })
        return signal + value
    }
}

const Form = {
    description:document.querySelector('input#description'),
    amount:document.querySelector('input#amount'),
    date:document.querySelector('input#date'),

    getValues(){
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        }
    },
    validadeFields(){
        const {description, amount, date} = Form.getValues()
        if(
            description.trim() === "" || 
            amount.trim() === "" || 
            date.trim() === "" ){
                throw new Error("Por favor, preencha todos os campos")
        }
    },
    formateValues(){
        let {description, amount, date} = Form.getValues()

        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)

        return{
            description,
            amount,
            date
        }
    },
    clearFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event){
        
        event.preventDefault()


        try {
            //verificar se o form esta vazio 
            Form.validadeFields()
    
            //formatar os dados para Salvar
            const transaction = Form.formateValues()
            
            // salvar os dados //att a aplicacao
            Transactions.add(transaction)

            //fechar modal 
            modal.close()

            //apagar os dados do form
            
            Form.clearFields()

        
        } catch (error) {
            alert(error.message)
        }
       
    }   
}
const App = {
    init() {

        //forEach() -> para cada transação do momento, rode o código.
        Transactions.all.forEach((transaction, index) => {

            DOM.addTransaction(transaction, index)

        })

        DOM.updateBalance()  
        Storage.set(Transactions.all) 

    },
    reload(){
        DOM.clearTransactions(),
        App.init()    
    }
}

App.init()



