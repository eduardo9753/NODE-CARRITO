const hbshelpers = {};

//FIRT PAGE
hbshelpers.firtPagina = (current) => {
    if (current) {
        let li = '<li class="page-item"><a class="page-link" href="#">Firt Page</a></li>'
        return li;
    } else {
        let li = '<li class="page-item"><a class="page-link" href="#">Firt Page</a></li>'
        return li;
    }
}


//PAGINATIONS
hbshelpers.paginationProduct = (current, paginas) => {
    let list = [];
    let i = (Number(current) > 5 ? Number(current) - 4 : 1);
    if (i !== 1) {
        let li = '<li class="page-item"><a class="page-link" href="#">........</a></li>'
        list.push(li);
    }
    for (; i <= (Number(current) + 4) && i <= paginas; i++) {
        if (i == current) {
            let li = '<li class="page-item"><a class="page-link" href="' + i + '">' + i + '</a></li>';
            list.push(li);
        } else {
            let li = '<li class="page-item"><a class="page-link" href="/products/all/' + i + '">' + i + '</a></li>';
            list.push(li);
        } if (i == Number(current) + 4 && i < paginas) {
            let li = '<li class="page-item"><a class="page-link" href="#">........</a></li>'
            list.push(li);
        }
    } //CIERRE FOR
    let lista = list.join("");
    return lista;
}


//PAGINATION CATEGORI
hbshelpers.paginationCateries = (current, paginas) => {
    let list = [];
    let i = (Number(current) > 5 ? Number(current) - 4 : 1);
    if (i !== 1) {
        let li = '<li class="page-item"><a class="page-link" href="#">......</a></li>';
        list.push(li);
    }
    for (; i <= (Number(current) + 4) && i <= paginas; i++) {
        if (i == current) {
            let li = '<li class="page-item"><a class="page-link" href="' + i + '">' + i + '</a></li>';
            list.push(li);
        } else {
            let li = '<li class="page-item"><a class="page-link" href="//' + i + '">' + i + '</a></li>';
            list.push(li);
        } if (i == Number(current) + 4 && i < paginas) {
            let li = '<li class="page-item"><a class="page-link" href="#">.......</a></li>';
            list.push(li);
        }
    }  // CIERRE FOR
    let lista = list.join("");
    return lista;
}


//LAST PAGINA
hbshelpers.lastPagina = (current, paginas) => {
    if (current = paginas) {
        let li = '<li class="page-item"><a class="page-link">Last Page</a></li>';
        return li;
    } else {
        let li = '<li class="page-item"><a class="page-link" href="' + paginas + '">Last Page</a></li>';
        return li;
    }
}


module.exports = hbshelpers;