class AccountTypeModel {
    constructor(accountTypeID, typeName) {
      this.accountTypeID = accountTypeID; 
      this.typeName = typeName;
    }

    get getAccountTypeID() {
      return this.accountTypeID;
    }
  
    get getTypeName() {
      return this.typeName;
    }
  }
  
  module.exports = AccountTypeModel