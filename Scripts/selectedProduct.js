
function getSelectedProductId(){
    let params = (new URL(document.location)).searchParams;
    let pid = params.get("id");
    return pid;
}

