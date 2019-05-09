class Transaction {
  constructor(id: number, userID: number, categoryName: string, amount: number, date: Date) {
    this.id = id ? id : 0;
    this.userID = userID ? userID : '';
    this.categoryName = categoryName ? categoryName : '';
    this.amount = amount ? amount : '';
    this.date =  date ? date : new Date();
  }
}

export default Transaction;