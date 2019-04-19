class Category {
  constructor(id: number, userID: number, name: string, isPlus: boolean) {
    this.id = id ? id : 0;
    this.userID = userID ? userID : 0;
    this.name = name ? name : '';
    this.isPlus = isPlus ? true : false;
  }
}

export default Category;