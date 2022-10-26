
function getSelectedProductId(){
    let params = (new URL(document.location)).searchParams;
    let pid = params.get("product_id");
    return pid;
}

alert(getSelectedProductId());