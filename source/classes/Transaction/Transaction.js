interface FirebaseTimestamp {
  seconds: number,
  nanoseconds: number
}

const formatDate = (date: FirebaseTimestamp): Date => {
  const milliseconds = date.seconds * 1000 + date.nanoseconds / 1000000;
  return new Date(milliseconds);
};

class Transaction {
  constructor(id: string, userID: string, categoryName: string, amount: number, date: FirebaseTimestamp) {
    this.id = id ? id : 0;
    this.userID = userID ? userID : '';
    this.categoryName = categoryName ? categoryName : '';
    this.amount = amount ? amount : '';
    this.date = date ? formatDate(date) : new Date();
  }
}

export default Transaction;