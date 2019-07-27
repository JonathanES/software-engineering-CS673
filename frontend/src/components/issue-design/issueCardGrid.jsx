import React from 'react';

class IssueCardGrid {
    constructor(props, numberOfCards, issues, cardsPerRow=3){
        this.props = props;
        this.numberOfCards = numberOfCards;
        this.issues = issues;
        this.cardRows = [];
        this.cardsPerRow = cardsPerRow;
    }

    generateRows(){
        // For loop here
    }

    getGrid(){
        return(this.grid);
    }

}
