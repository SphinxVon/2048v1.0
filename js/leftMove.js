/**
 * Created by qin on 2017/6/5.
 */
function canmoveLeft(){//判断能否上移
    /*
     * 1.左移操作，第一列不用判断
     * 2.当前行列有方块时，但方块值等于上一行列的值或者上一行列没有方块时可以上移
     * */
    for(var i=0;i<num;i++){
        for(var j=1;j<num;j++){
            if(board[i][j]!=0){
                if(board[i][j-1]==0||board[i][j-1]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
};
function noBlockL(row,prveCol,curCol){//判断同一列中的当前行左边是否存在2048方块
    for(var i=prveCol+1;i<curCol;i++){
        if(board[row][i]!=0){
            return false;
        }
    }
    return true;
}
function moveLeft(){
    if(!canmoveLeft()){
        return false;
    }
    for(var i=0;i<num;i++){
        indexm=0;
        indexc=0;
        for(var j=0;j<num;j++){
            if(board[i][j]!=0){//遍历到有方块的位置，判断同一行的右边面的列中是否存在方块
                for(var k=0;k<j;k++){
                    if(board[i][k]==0&&noBlockL(i,k,j)){

                        board[i][k]=board[i][j];
                        board[i][j]=0;
                        showMove(i,j,i,k);
                        break;
                    }
                    else if(board[i][k]==board[i][j]&&noBlockL(i,k,j)){

                        if(board[i][k]!=(indexm+indexc)){
                            indexm=board[i][k];//记录可合并的方块值
                            indexc=board[i][j];//记录当前方块值
                            board[i][k]+=board[i][j];//值合并
                            score=parseInt(score)+parseInt(board[i][j])+parseInt(board[i][k]);//分数改变
                            board[i][j]=0;//当前方块已经移动并合并，清空标识
                            break;
                        }else{
                            board[i][k+1]=board[i][j];
                            board[i][j]=0;
                            showMove(i,j,i,k);
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


