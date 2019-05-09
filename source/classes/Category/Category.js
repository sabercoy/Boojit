class Category {
  constructor(id: string, userID: number, name: string, isPlus: boolean) {
    this.id = id ? id : '';
    this.userID = userID ? userID : 0;
    this.name = name ? name : '';
    this.isPlus = isPlus ? true : false;
  }
}

export default Category;