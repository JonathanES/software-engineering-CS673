class CategoriesModel {
    constructor(categoryID, projectID, categoryName, dateCreated, isDeleted) {
      this.categoryID = categoryID;
      this.projectID = projectID;
      this.categoryName = categoryName;
      this.dateCreated = dateCreated;
      this.isDeleted = isDeleted;
    }

    get getCategoryID() {
      return this.categoryID;
    }

    get getProjectID() {
        return this.projectID;
    }

    get getCategoryName() {
        return this.categoryName;
    }
    
    get getDateCreated() {
        return this.dateCreated;
    }

    get getIsDeleted() {
        return this.isDeleted;
    }
  }
  
  module.exports = CategoriesModel