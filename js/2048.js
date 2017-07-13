var oWrap = document.getElementById('wrap');
var oLi = document.querySelectorAll('#wrap .modes li');
var board = new Array();//定义数组用于标识每个单元格
var score = 0;//分数
var num = 0;//显示模块矩阵数3x3,4x4,5x5,6x6
var indexm = 0,indexc = 0;//分别记录可合并方块值和当前方块值
init();
function init() {
    for(var i = 0 ;i < oLi.length ; i++){
        ~function(i) {
            oLi[i].onclick = function () {
                selectMode(i);
            };
        }(i);
    };
};

function  startGame() {
    var oCon = document.querySelector('#wrap .content');
    var oScore = document.querySelector(' #wrap .scoreBorad #score');
    oScore.innerHTML = score;
    var oMaxScore = document.querySelector(' #wrap .scoreBorad #maxScore');
    oMaxScore.innerHTML = score;
    var oI = [];
    updateBoardView();
    document.onkeydown = function (e) {
        e = e||window.event;
        //console.log(e.keyCode);//w:87,A:65 S:83 D:68 ;上:38 下:40 左:37 右:39

        gameover();//判断游戏是否结束
        switch (e.keyCode){
            case 87:
                if(moveTop()){
                    generateOneNumber();
                    oScore.innerHTML = score;
                    oMaxScore.innerHTML = score;
                };
                break;
            case 83:
                if(moveBottom()){
                    generateOneNumber();
                    oScore.innerHTML = score;
                    oMaxScore.innerHTML = score;
                };
                break;break;
            case 65:
                if(moveLeft()){
                    generateOneNumber();
                    oScore.innerHTML = score;
                    oMaxScore.innerHTML = score;
                };
                break;
            case 68:
                if(moveRight()){
                    generateOneNumber();
                    oScore.innerHTML = score;
                    oMaxScore.innerHTML = score;
                };
                break;
            case 38:
                if(moveTop()){
                    generateOneNumber();
                    oScore.innerHTML = score;
                    oMaxScore.innerHTML = score;
                };
                break;
            case 40:
                if(moveBottom()){
                    generateOneNumber();
                    oScore.innerHTML = score;
                    oMaxScore.innerHTML = score;
                };
                break;
            case 37:
                if(moveLeft()){
                    generateOneNumber();
                    oScore.innerHTML = score;
                    oMaxScore.innerHTML = score;
                };
                break;
            case 39:
                if(moveRight()){
                    generateOneNumber();
                    oScore.innerHTML = score;
                    oMaxScore.innerHTML = score;
                };
                break;
        }
        updateBoardView();
    };

};
function jungleboard() {
    var arr=[];
    for (var i =0;i<num;i++){
        for(var j =0 ;j<num;j++){
            arr.push(board[i][j]);

        }
    }
    console.log(arr);
}
function generateOneNumber(){//获取
    // 随机位置和随机数字并显示
    if(nospace())
        return false;
    //随机位置
    var randx=parseInt(Math.floor(Math.random()*num));
    var randy=parseInt(Math.floor(Math.random()*num));
    while(true){
        if(board[randx][randy]==0){

            break;
        }else{
            randx=parseInt(Math.floor(Math.random()*num));
            randy=parseInt(Math.floor(Math.random()*num));
        }
    }
    //随机数字
    var randNumber=Math.random()<0.5?2:4;
    //在随机位置显示数字
    board[randx][randy]=randNumber;
    showNumber(randx,randy,board[randx][randy]);
    return true;

};
function showNumber(i,j,number){
    /*
     * 在指定i，j的位置上生成2048小方块
     * 注意：定位值,宽高，背景色，显示数字，数字颜色,字体大小
     *
     */
    var oCon = document.querySelector('#wrap .content');
    var grid_w = document.querySelectorAll(' #wrap .content  .grid-cell')[0].clientWidth;//格子宽度
    var grid_h = document.querySelectorAll(' #wrap .content  .grid-cell')[0].clientHeight;//格子高度
    var top = i*(grid_h + 5)+5;
    var left = j*(grid_w + 5)+5;
    var gridBlock = document.createElement('div');
    gridBlock.className = 'gridBlock';
    gridBlock.setAttribute('id','gridBlock-'+i+'-'+j);
    gridBlock.style.top =  top+'px';
    gridBlock.style.left =  left+'px';
    gridBlock.style.width = grid_w+'px';
    gridBlock.style.height = grid_h+'px';
    gridBlock.style.lineHeight = grid_h+'px';
    gridBlock.style.backgroundColor = getNumberBackgroundColor(number);
    gridBlock.innerText = number;
    gridBlock.style.color = getNumberColor(number);
    gridBlock.style.fontSize = 180/num +'px'; //2048小方块的字体大小随方块阵的行列个数变换
    gridBlock.style.transition = '0.1s';
    score+=number;
    oCon.appendChild(gridBlock);
};
function updateBoardView(){
    score=0;
    var gridcell = document.querySelectorAll('#wrap .content .gridBlock');
    for(var i=0;i<gridcell.length;i++){
        gridcell[i].parentNode.removeChild(gridcell[i]);
    }
    setTimeout(function () {
        for(var i=0;i<num;i++){
            for(var j=0;j<num;j++){
                if(board[i][j]!=0){
                    showNumber(i,j,board[i][j]);
                }
            }
        }
    },10);
};

function selectMode(index) {
    oWrap.innerHTML = '';
    var scoreBorad = document.createElement('div');
    scoreBorad.className = 'scoreBorad clearfix';
    var content = document.createElement('div');
    content.className = 'content';
    var mode = document.createElement('div');
    mode.className = 'mode';
    var mtitle = document.createElement('h5');
    mtitle.innerHTML = '2048';
    var mSpan = document.createElement('span');
    var oScore = document.createElement('div');
    oScore.className = 'score';
    var stitle = document.createElement('h5');
    stitle.innerHTML = '分数';
    var sSpan = document.createElement('span');
    sSpan.setAttribute('id','score');
    sSpan.innerHTML= score;//初始分数
    var maxScore = document.createElement('div');
    maxScore.className = 'maxScore';
    var mstitle = document.createElement('h5');
    mstitle.innerHTML = '最高分';
    var msSpan = document.createElement('span');
    msSpan.setAttribute('id','maxScore');
    msSpan.innerHTML = score;//记录最高分
    oWrap.appendChild(scoreBorad);
    oWrap.appendChild(content);
    scoreBorad.appendChild(mode);
    scoreBorad.appendChild(oScore);
    scoreBorad.appendChild(maxScore);
    mode.appendChild(mtitle);
    mode.appendChild(mSpan);
    oScore.appendChild(stitle);
    oScore.appendChild(sSpan);
    maxScore.appendChild(mstitle);
    maxScore.appendChild(msSpan);
    switch (index){
        case 0:mSpan.innerHTML = 'Three';num = 3;break;
        case 1:mSpan.innerHTML = 'Four';num = 4;break;
        case 2:mSpan.innerHTML = 'Five';num = 5;break;
        case 3:mSpan.innerHTML = 'Six';num = 6;break;
    };
    createGrid();
    startGame();

};
function createGrid() {//背景布局
    var oCon = document.querySelector('#wrap .content');
    oCon.style.height = oCon.clientWidth +'px';
    for(var i = 0 ;i < num; i++){
        board[i]=new Array();
        var oUl = document.createElement('ul');
        oUl.className = 'row';
        oUl.style.width = '100%';
        oUl.style.height = oCon.clientHeight /num+'px';
        oCon.appendChild(oUl);
        for(var j = 0 ; j < num;j++){
            board[i][j]=0;//初始每个单元格的值为0，代表其中没有2048小方块
            var w = (oUl.clientWidth -5*(num+1))/num,
                h = (oCon.clientHeight -5*(num+1))/num,
                top = i*(h + 5)+5,//每一个单元格距离顶部的位置所在行数相关
                left = j*(w + 5)+5;//每一个单元格距离左边的位置与所在列数相关
            var grid = document.createElement('li');//每一行创建n个方块;
            grid.setAttribute('id','grid-'+i+'-'+j);
            grid.className = 'grid-cell';
            grid.style.width = w +'px';
            grid.style.height = h +'px';
            grid.style.top = top +'px';
            grid.style.left = left +'px';
            if(j == num-1){
                grid.className+=' lastR';
                if(i == num-1){grid.className+=' last'}
            }
            oUl.appendChild(grid);
        }
    }
    generateOneNumber();
    generateOneNumber();//初始生成两个2048小方块
};
//不同的分值的方块有不同的背景色
function getNumberBackgroundColor(number){
    switch(number){
        case 2:return"#eee4da";break;
        case 4:return"#ede0c8";break;
        case 8:return"#f2b179";break;
        case 16:return"#f59563";break;
        case 32:return"#f67c5f";break;
        case 64:return"#f65e3b";break;
        case 128:return"#edcc61";break;
        case 256:return"#f2b179";break;
        case 512:return"#9c0";break;
        case 1024:return"#33b5e5";break;
        case 2048:return"#09c";break;
        case 4096:return"#a6c";break;
        case 8192:return"#93c";break;
    }
    return "black";
};
//不同的分值的方块有不同的字体色
function getNumberColor(number){
    if(number<4){
        return "#776e65"
    }else{
        return "#fff";
    }
};
//判断是否还有空格
function nospace(){
    for(var i=0;i<num;i++){
        for(var j=0;j<num;j++){
            if(board[i][j]==0){
                return false;
            }
        }
    }
    return true;
}
function nomove(){
    if(moveTop()||moveBottom()||moveLeft()||moveRight())
        return false;
    return true;
}
function gameover(){
    if(nospace(num)&&nomove()){
        var over = document.createElement('div');
        over.setAttribute('id','over');
        var title = document.createElement('h3');
        title.innerHTML='Game Over';
        var oP = document.createElement('p');
        oP.innerHTML='总分：';
        var sumScore = document.createElement('span');
        sumScore.className = 'getsocre';
        sumScore.innerHTML = score;
        var restar = document.createElement('div');
        restar.className = 'restar';
        restar.innerHTML = '重新开始';
        oWrap.appendChild(over);
        over.appendChild(title);
        over.appendChild(oP);
        over.appendChild(restar);
        oP.appendChild(sumScore);
        restar.onclick = function () {
            window.location.reload();
        }
    }
}
