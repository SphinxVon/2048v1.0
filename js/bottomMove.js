/**
 * Created by qin on 2017/6/5.
 */
function canmoveBottom(){//判断能否下移
    /*
     * 1.下移操作，最后一行不用判断
     * 2.当前行列有方块时，但方块值等于下一行列的值或者下一行列没有方块时可以下移
     * */
    for(var i=0;i<num-1;i++){
        for(var j=0;j<num;j++){
            if(board[i][j]!=0){
                if(board[i+1][j]==0||board[i+1][j]==board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
};

function noBlockB(column,last,cur){//判断同一列中的当前行之后是否存在2048方块
    for(var i=cur+1;i<last;i++){
        if(board[i][column]!=0){
            return false;
        }
    }
    return true;
}
function moveBottom(){
    if(!canmoveBottom()){
        return false;
    }
    for(var j=0;j<num;j++){
        indexm=0;
        indexc=0;
        for(var i = num-1;i >= 0; i--){
            if(board[i][j]!=0){//遍历到有方块的位置，判断同一列的后面的行内是否存在方块
                for(var k=num-1;k>i;k--){
                    if(board[k][j]==0&&noBlockB(j,k,i)){
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                        showMove(i,j,k,j);
                        break;
                    }
                    else if(board[k][j]==board[i][j]&&noBlockB(j,k,i)){
                        if(board[k][j]!=(indexm+indexc)){
                            indexm=board[k][j];//记录可合并的方块值
                            indexc=board[i][j];//记录当前方块值
                            board[k][j]+=board[i][j];//值合并
                            score=parseInt(score)+parseInt(board[i][j])+parseInt(board[k][j]);//分数改变
                            board[i][j]=0;//当前方块已经移动并合并，清空标识
                            break;
                        }else{
                            board[k-1][j]=board[i][j];
                            board[i][j]=0;
                            break;
                        }
                        showMove(i,j,k,j);

                    }

                }
            }
        }
    }

    return true;
};

