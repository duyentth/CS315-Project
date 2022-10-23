//export
 class User {
    constructor(fname, lname, email, phone = "", address = "", password, isManager = false) {
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.password = password;
        this.isManager = isManager;
    }
}

let manager1 = new User('Duyen', 'Tran', 'duyen.tran@miu.edu', '4433013648',
    "R13 Granville St", "HelloGirls@123", true);
let manager2 = new User('Sharada', 'Khatiwada', 'sharada.khatiwada@miu.edu', '4453013648',
    "R23 Granville St", "HelloGirls@123", true);
let user1 = new User('Ruby', 'Le', 'ruby.le@miu.edu', '4133013668',
"R13 Granville St", "HelloGirls@123", false);

//export let users = [user1, manager1, manager2];

 function showListUsers() {
    let myP = document.querySelector("#list");
    let mystr = "";
    for ( let user of users) {
        mystr += user.fname + " ";
    }
    myP.innerHTML = mystr;
 }