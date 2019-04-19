class User {
  constructor(id: number, username: string, password: string) {
    this.id = id ? id : 0;
    this.username = username ? username : '';
    this.password = password ? password : '';
  }
}

export default User;