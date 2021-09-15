const modal = {
    open(){
        //abrir modal
        //add a classe active modal
        document.querySelector('.modal-overlay').classList.add('active')
    },
    close(){
        //fechar o modal
        //remover a class active modal
        document.querySelector('.modal-overlay').classList.remove('active')
    }

}