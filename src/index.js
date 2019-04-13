import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
      return (
        <button 
        className="square" 
        onClick={() => props.onClick()}
        >
          {props.value}
        </button>
      );
  }
  
  class Board extends React.Component {
      constructor(props){
          super(props);
          this.state = {
              squares: Array(9).fill(null).map(() => new Array(9).fill(null)),
          };
      }
      componentDidMount(){
          this.setDefaultValues();
      }
    setInitValues(){
        window.location.reload(); 
    }

    setDefaultValues(){
        var defaultValues = this.state.squares.map(function(arr) {
            return arr.slice();
        });
        defaultValues[0][2] = 7
        defaultValues[0][4] = 2
        defaultValues[0][6] = 6
        defaultValues[0][7] = 9
        defaultValues[1][0] = 9
        defaultValues[1][2] = 5
        defaultValues[2][1] = 8
        defaultValues[2][2] = 6
        defaultValues[2][3] = 5
        defaultValues[2][4] = 4
        defaultValues[2][8] = 1
        defaultValues[3][2] = 3
        defaultValues[3][3] = 9
        defaultValues[3][5] = 2
        defaultValues[3][8] = 6
        defaultValues[4][0] = 1
        defaultValues[4][1] = 2
        defaultValues[4][4] = 6
        defaultValues[5][3] = 7
        defaultValues[5][6] = 2
        defaultValues[6][1] = 5
        defaultValues[6][3] = 4
        defaultValues[6][4] = 8
        defaultValues[6][5] = 6
        defaultValues[6][7] = 1
        defaultValues[6][8] = 3
        defaultValues[7][7] = 2
        defaultValues[7][8] = 4
        defaultValues[8][4] = 7
        defaultValues[8][5] = 3
        this.setState({squares: defaultValues})
    }
    renderSquare(i, j) {
      return (
      <Square 
      value={this.state.squares[i][j]} 
      onClick={() => this.handleClick(i, j)}
      />
      );
    }
    handleClick(i, j){
        const squares = this.state.squares.slice();
        if(squares[i][j] === null ){
            squares[i][j] = 1
        }
        else if(squares[i][j] > 0 && squares[i][j] < 9){
            squares[i][j] ++
        }
        else squares[i][j] = null;
        this.setState({squares:squares});
    }
    smallHelp(){
        console.clear()
        var grid = this.state.squares
        var numbersInRow = []
        var allNumbers = [1,2,3,4,5,6,7,8,9]
        var missingNumbers = []
        var usedIndices = []
        var unusedInidices = []

        for(var r = 0; r < grid.length; r++){
            numbersInRow = []
            missingNumbers = []
            usedIndices = []
            unusedInidices = []
            var missingCounter = 0
            var insertAtColumn = []
            
            for(var c = 0; c < grid.length; c++){
                if(grid[r][c] !== null){
                    numbersInRow.push(grid[r][c])
                    usedIndices.push(c)
                }
                else unusedInidices.push(c)
            }
            missingNumbers = allNumbers.filter(allNumbers => !numbersInRow.includes(allNumbers))
            //console.log("missing numbers in row "+r)
            //console.log(missingNumbers)

            for (var missingNumber of missingNumbers){
                missingCounter = 0
                insertAtColumn = []
                for(var unusedC of unusedInidices){
                    var addToPossibleColumns = true
                        for(var row = 0; row < 9; row ++){
                            //console.log("checking number "+missingNumber + " in row "+row +" and column "+unusedC)
                            if(missingNumber === grid[row][unusedC]){
                                //console.log("found missing number "+missingNumber+ "in column " +unusedC + " in row "+row)
                                missingCounter ++
                                row = 9
                                if(!addToPossibleColumns){
                                    insertAtColumn.pop()
                                }
                                addToPossibleColumns = false
                            }
                            if(addToPossibleColumns){
                                insertAtColumn.push(unusedC)
                                addToPossibleColumns = false
                            }
                        }
                    }
                    console.log("===============================")
                    if(missingCounter === unusedInidices.length -1){
                        console.log("Trust me. Insert "+missingNumber+" of row "+r +" in Column "+insertAtColumn[0])
                        grid[r][insertAtColumn[0]] = missingNumber
                    }
                    else if(missingCounter === unusedInidices.length -2 ){
                        console.log("two possible fields, number: "+missingNumber+" of row "+r +": " + insertAtColumn)
                        console.log("checking surroundings of "+r+"/"+insertAtColumn)
                        for(var possibleColumn of insertAtColumn){
                            var surroundingCounter = 0
                            if(this.checkSurrounding(r, possibleColumn, missingNumber)){
                                surroundingCounter++
                            }
                            if(surroundingCounter==1){
                                console.log("safe Insert possible")
                            }
                        } 
                    }
                    else if(missingCounter === unusedInidices.length -3 ){
                        console.log("three possible fields, number: "+missingNumber+" of row "+r +": " + insertAtColumn)
                        console.log("checking surroundings of "+r+"/"+insertAtColumn)
                        for(var possibleColumn of insertAtColumn){
                            var surroundingCounter = 0
                            if(this.checkSurrounding(r, possibleColumn, missingNumber)){
                                surroundingCounter++
                            }
                            if(surroundingCounter==2){
                                console.log("safe Insert possible")
                            }
                        } 
                    }
 
                }
            }
        this.setState({squares: grid})
    }
    checkSurrounding(row, column, missingNumber){
        var rowLooper = this.getSurroundingRowIndices(row);
        var columnLooper = this.getSurroundingColumnIndices(column);
        for(var rowLoop = rowLooper.from; rowLoop < rowLooper.to; rowLoop++){
            for(var columnLoop = columnLooper.from; columnLoop < columnLooper.to; columnLoop++){
                if(this.state.squares[rowLoop][columnLoop] === missingNumber){
                    console.log("found same number in surroundings of "+rowLoop+"/"+columnLoop)
                    return true
                }
            }
        }
        console.log("found nothing in surroundings of "+rowLoop+"/"+columnLoop)
        return false
    
    }

    getSurroundingRowIndices(row){
        if (row < 3 ){
            return {
                from: 0,
                to: 2
            }
        }
        if (row > 2 && row < 6 ){
            return {
                from: 3,
                to: 5
            }
        }
        if (row > 5 ){
            return {
                from: 6,
                to: 8
            }
        }
    }
    getSurroundingColumnIndices(row){
        if (row < 3 ){
            return {
                from: 0,
                to: 2
            }
        }
        if (row > 2 && row < 6 ){
            return {
                from: 3,
                to: 5
            }
        }
        if (row > 5 ){
            return {
                from: 6,
                to: 8
            }
        }
    }


    renderRow(i){
        return (
        <div className = "board-row">
            {i}
            {this.renderSquare(i, 0)}
            {this.renderSquare(i, 1)}
            {this.renderSquare(i, 2)}
            {this.renderSquare(i, 3)}
            {this.renderSquare(i, 4)}
            {this.renderSquare(i, 5)}
            {this.renderSquare(i, 6)}
            {this.renderSquare(i, 7)}
            {this.renderSquare(i, 8)}
        </div>
        );
    }
  
    render() {
   return (
        <div>
          {this.renderRow(0)}
          {this.renderRow(1)}
          {this.renderRow(2)}
          {this.renderRow(3)}
          {this.renderRow(4)}
          {this.renderRow(5)}
          {this.renderRow(6)}
          {this.renderRow(7)}
          {this.renderRow(8)}
          <button 
            className="smallHelp" 
            onClick={() => this.smallHelp()}
            >
            kleine Hilfe
        </button>
        <button 
            className="smallHelp" 
            onClick={() => this.setInitValues()}
            >
            reset 
        </button>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  