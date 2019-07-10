class CategoriesModel {
    constructor(categoriesID, projectID, categoryName, dateCreated, isDeleted) {
      this.categoriesID = categoriesID;
      this.projectID = projectID;
      this.categoryName = categoryName;
      this.dateCreated = dateCreated;
      this.isDeleted = isDeleted;
    }

    get getCategoriesID() {
      return this.categoriesID;
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