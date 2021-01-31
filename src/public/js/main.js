window.addEventListener('DOMContentLoaded' , () => {
    $('a.clearcart').on('click' , () =>{
        if(!confirm('Confirm Clear cart')){
            return false;
        }
    });
})