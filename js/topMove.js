/**
 * Created by qin on 2017/6/4.
 */
function canmoveTop(){//判断能否上移
    /*
    * 1.上移操作，第一行不用判断
    * 2.当前行列有方块时，但方块值等于上一行列的值或者上一行列没有方块时可以上移
    * */
    for(var i=1;i<num;i++){
        for(var j=0;j<num;j++){
            if(board[i][j]!=0){
                if(board[i-1][j]==0||board[i-1][j]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
};
function noBlockT(column,firstRow,curRow){//判断同一列中的当前行之前是否存在2048方块
    for(var i=firstRow+1;i<curRow;i++){
        if(board[i][column]!=0){
            return false;
        }
    }
    return true;
}
function moveTop(){
    if(!canmoveTop()){
        return false;
    }
    for(var j=0;j<num;j++){
        indexm=0;
        indexc=0;
        for(var i=1;i<num;i++){
            if(board[i][j]!=0){//遍历到有方块的位置，判断同一列的前面的行内是否存在方块
                for(var k=0;k<i;k++){
                    if(board[k][j]==0&&noBlockT(j,k,i)){

                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        showMove(i,j,k,j);
                        break;
                    }
                    else if(board[k][j]==board[i][j]&&noBlockT(j,k,i)){

                        if(board[k][j]!=(indexm+indexc)){
                            indexm=board[k][j];//记录可合并的方块值
                            indexc=board[i][j];//记录当前方块值
                            board[k][j]+=board[i][j];//值合并
                            score=parseInt(score)+parseInt(board[i][j])+parseInt(board[k][j]);//分数改变
                            board[i][j]=0;//当前方块已经移动并合并，清空标识
                            break;
                        }else{
                            board[k+1][j]=board[i][j];
                            board[i][j]=0;
                            showMove(i,j,k,j);
                            break;
                        }

                    }

                }
            }
        }
    }

     // setTimeout(updateBoardView(),100);
    return true;
};

function showMove(curX,curY,tarX,tarY) {
    document.getElementById('gridBlock-i-j');
    var gridBlock = document.getElementById('gridBlock-'+curX+'-'+curY);
    gridBlock.style.top = tarX*(gridBlock.clientHeight + 5)+5+'px';
    gridBlock.style.left = tarY*(gridBlock.clientWidth + 5)+5+'px';
    gridBlock.style.transition = '0.1s';
}

