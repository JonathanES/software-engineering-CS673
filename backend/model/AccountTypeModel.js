class AccountTypeModel {
    constructor(accountTypeID, typename) {
      this.accountTypeID = accountTypeID; 
      this.typename = typename;
    }

    get getaccountTypeID() {
      return this.accountTypeID;
    }
  
    get gettypename() {
      return this.typename;
    }
  

  }
  
  module.exports = AccountTypeModel