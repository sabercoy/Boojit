class Transaction {
  constructor(id: number, userID: number, categoryID: number, amount: number, date: Date) {
    this.id = id ? id : 0;
    this.userID = userID ? userID : '';
    this.categoryID = categoryID ? categoryID : 0;
    this.amount = amount ? amount : '';
    this.date =  date ? date : new Date();
  }
}

export default Transaction;