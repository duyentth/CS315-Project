export class User {
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

export let initData = function () {

    if (localStorage.getItem("userList") != null) 
        return;

    let manager1 = new User('Duyen', 'Tran', 'duyen.tran@miu.edu', '4433013648',
        "R13 Granville St", "HelloGirls@123", true);
    let manager2 = new User('Sharada', 'Khatiwada', 'sharada.khatiwada@miu.edu', '4453013648',
        "R23 Granville St", "HelloGirls@123", true);
    let user1 = new User('Ruby', 'Le', 'ruby.le@miu.edu', '4133013668',
        "R13 Granville St", "HelloGirls@123", false);

    let users = [user1, manager1, manager2];

    let users_json = JSON.stringify(users);
    localStorage.setItem("userList", users_json);
}

export let addUser = (user) => {
    var users = getUsers();
    users.push(user);
    let users_json = JSON.stringify(users);
    localStorage.setItem("userList", users_json);
}
export let getUsers = () => {
    let users_raw = JSON.parse(localStorage.getItem("userList") );
    
    let users = [];
    for(var i = 0; i<users_raw.length; i++){ 
        var item = users_raw[i];
        users.push(new User(item.fname, item.lname, item.email, item.phone, item.address, item.password, item.isManager));
    }

    return users;
}
