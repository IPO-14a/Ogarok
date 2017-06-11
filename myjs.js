/**
* @var ie4 int Netscape ie4  
* @var ie3 int Netscape ie4  
* @var boardSiz int Размер игрового поля
* @var userSq int Очередь пользователя
* @var machSq int Очередь машины
* @var blinkSq int Очередь (определение)
* @var myTurn  bool Инициализирующая очередь пользователя
* @var winningMove int  Выигрышная комбинация
* @var openFour  int Выигрышная комбинация 2
* @var twoThrees  int Выигрышная комбинация 3
*/
ie4 = ( navigator.appName.indexOf ("Microsoft") != -1 && parseInt( navigator.appVersion ) > 3 ) ?true:false;
ie3 = ( navigator.appName.indexOf ("Microsoft") != -1 && parseInt( navigator.appVersion ) < 4 ) ?true:false;
boardSiz = 15;
userSq = 1;
machSq = -1;
nblinkSq = "b-1";
myTurn = false;
winningMove = 9999999;
openFour = 8888888;
twoThrees = 7777777;
if (document.images) {
    uImg = new Image( 16, 16 ); 
    uImg.src='s'+userSq+'.gif';
    mImg = new Image( 16, 16 ); 
    mImg.src='s'+machSq+'.gif';
    bImg = new Image( 16, 16); 
    bImg.src='s0.gif';
}
/**
* @var f Array Массив первого столбца
* @var s Array Массив второго столбца
* @var q Array Массив третьего столбца
*/
var f = new Array();
var s = new Array();
var q = new Array();
for (i = 0; i < 20; i ++) {
    f[i] = new Array();
    s[i] = new Array();
    q[i] = new Array();
        for (j = 0; j < 20; j ++) {
            f[i][j] = 0;
            s[i][j] = 0;
            q[i][j] = 0;
        }
}
/**
* @var iLastUserMove int Сохранение движения пользователя [i]
* @var jLastUserMove int Сохранение движения пользователя [j]
*/
iLastUserMove = 0;
jLastUserMove = 0;
/**
* Функция обработки клика по полю
*
* Обрабатывает нажатие по полю и заполнение поля пустыми блоками.
* Так же обрабатывается нажатие по заполненной клетке.
*@param iMove положение 
*@param jMove положение 
*@return текущее положение 
*/
function clk( iMove, jMove ) {
    if ( myTurn ) {
        return;
    }
    if ( f [iMove] [jMove] != 0 ) {
        alert('This square is not empty! Please choose another.'); 
        return; 
    }
    f[iMove] [jMove] = userSq;
    drawSquare( iMove, jMove, userSq );    
    myTurn = true;
    iLastUserMove = iMove;
    jLastUserMove = jMove;
    dly = (document.images)?10:boardSize*30;    if (winningPos( iMove, jMove, userSq ) == winningMove) {
        setTimeout("alert('You won!');", dly);
    } else {
        setTimeout("machineMove(iLastUserMove,jLastUserMove);", dly);
    }
}
/**
* Функция заполнения поля компьютером
*
* В зависимости от поставленной пользователем метки
* компьютер пытается перекрыть ближайший символ.
*@param iUser
*@param jUser
*/
function machineMove( iUser, jUser ) {
    maxS=evaluatePos( s, userSq );
    maxQ=evaluatePos( q, machSq );
    if ( maxQ >= maxS ) {
        maxS = -1;
        for ( i = 0; i < boardSize; i++ ) {
            for ( j = 0; j < boardSize; j++ ) {
                if ( q[i] [j] == maxQ && s[i] [j] > maxS ) {
                    maxS = s[i] [j]; 
                    iMach = i;
                    jMach = j;
                }
            }
        }
    } else {
     maxQ = -1;
     for ( i=0; i<boardSize; i++) {
         for ( j=0; j<boardSize; j++) {
             if (s[i] [j] == maxS && q[i] [j] > maxQ ) {
                 maxQ = q[i] [j]; 
                 iMach = i;
                 jMach = j;
            }
        }
    }
}
f[iMach][jMach] = machSq;
    if (document.images) {
        drawSquare( iMach, jMach, blinkSq );
        setTimeout("drawSquare(iMach,jMach,machSq);", 900);
    } else {
        drawSquare( iMach, jMach, machSq);
        }
    if (winningPos( iMach, jMach, machSq) == winningMove) {
	    setTimeout("alert('I won!')", 900);
    } else {
        setTimeout("myTurn=false;", 950);
    }
}
/**
* Функция определение сосодних точек
*
* Определяет массив из точек, которые нужно соединить.
*
* @param i Координата по [i]
* @param j Координата по [j]
*
* @return Возвращает 0 или 1 в зависимости от того
* можно ли провести точку или нет.
*
*/
function hasNeighbors( i, j ) {
    if ( j > 0 && f[i][j-1] != 0 ) {
        return 1;
    }
    if ( j + 1 < boardSize && f[i] [j+1] != 0 ) {
        return 1;
    }
    if ( i > 0 ) {
        if ( f[i-1] [j] != 0 ) {
        return 1;
    }	
    if ( j > 0 && f[i-1] [j-1] != 0 ) {
        return 1;
    }
    if ( j + 1 < boardSize && f[i-1] [j+1] !=0 ) {
        return 1;
        }
    }
    if ( i + 1 < boardSize ) {
        if ( f[ i + 1 ][j] != 0 ) {
        return 1;
	}
    if ( j > 0 && f[ i + 1 ][ j - 1 ] != 0 ) {
        return 1;
	}
    if ( j + 1 < boardSize && f[ i + 1 ][ j + 1 ] != 0 ) {
        return 1; 
	    }
    }
       return 0;
}
/**
* @var w Array Выигрышная  позиция 
* @var nPos Array Текущая позиция
* @var dirA Array Направление позиции
*/
w = new Array( 0, 20, 17, 15.4, 14, 10 );
nPos = new Array();
dirA = new Array();
}
