// computer object
var computer = {
    score: 0,           // computer 점수
    percent2: 0.5,      // computer 2점슛 확률
    percent3: 0.33      // computer 3점슛 확률
}

// user object
var user = {
    score: 0,           // user 점수
    percent2: 0.5,      // user 2점슛 확률
    percent3: 0.33      // user 3점슛 확률
}

// game object
var game = {
    isComputerTurn: true,       // 슛 차례 초기화
    shotsLeft: 15               // 슛 남은 횟수 초기화
}              

// id="text"에 들어가는 문장 수정하는 함수
function showText(txt) {
    var textElem = document.getElementById('text');
    textElem.innerHTML = txt;
}

// computer 점수를 최신화 하는 함수
function updateComputerScore(score) {
    computer.score += score;
    var comScoreElem = document.getElementById('computer-score');
    comScoreElem.innerHTML = computer.score;
}

// user 점수를 최신화 하는 함수
function updateUserScore(score) {
    user.score += score;
    var userScoreElem = document.getElementById('user-score');
    userScoreElem.innerHTML = user.score;
}

// computer 버튼을 boolValue에 따라 활성/비활성 하는 함수
function disableComputerButtons(boolValue) {
    var computerButtons = document.getElementsByClassName('btn-computer');
    for (var i = 0; i < computerButtons.length; i++) {
        computerButtons[i].disabled = boolValue;
    }
}

// user 버튼을 boolValue에 따라 활성/비활성 하는 함수
function disableUserButtons(boolValue) {
    var userButtons = document.getElementsByClassName('btn-user');
    for (var i = 0; i < userButtons.length; i++) {
        userButtons[i].disabled = boolValue;
    }
}

// user와 computer 점수 차이에 따라 슛 득점 확률 조정
function updateAI() {
    var diff = user.score - computer.score;

    if (diff >= 10) {
        computer.percent2 = 0.7;
        computer.percent3 = 0.43;
    } else if (diff >= 6) {
        computer.percent2 = 0.6;
        computer.percent3 = 0.38;
    } else if (diff <= -10) {
        computer.percent2 = 0.3;
        computer.percent3 = 0.23;
    } else if (diff <= -6) {
        computer.percent2 = 0.4;
        computer.percent3 = 0.28;
    }
}

// btn-computer 버튼이 클릭되면 실행되는 함수
function computerShoot() {
    // computer 차례가 아니면 함수 실행 안 함
    if (!game.isComputerTurn) {
        return;
    }

    updateAI();

    var shootType = Math.random() < 0.5 ? 2 : 3;

    if (Math.random() < computer['percent' + shootType]) {
        showText('컴퓨터가' + shootType + '점슛을 성공시켰습니다!');
        updateComputerScore(shootType);
    } else {
        showText('컴퓨터가' + shootType + '점슛을 실패했습니다.')
    }

    // computer가 슛을 한 뒤 컴퓨터 차례 false 처리
    game.isComputerTurn = false;
    
    // 남은 슛 횟수 감소
    game.shotsLeft--;

    disableComputerButtons(true);
    disableUserButtons(false);

    // 남은 슛 횟수 화면 표시
    var shotsLeftElem = document.getElementById('shots-left');
    shotsLeftElem.innerHTML = game.shotsLeft;

    // 승부 판정
    if (game.shotsLeft === 0) {
        if (user.score > computer.score) {
            showText('승리했습니다!');
        } else if (user.score < computer.score) {
            showText('아쉽게도 졌습니다...');
        } else {
            showText('비겼습니다');
        }
        
        disableComputerButtons(true);
        disableUserButtons(true);
    }
}

// btn-user 버튼이 클릭되면 실행되는 함수
function userShoot(shootType) {
    // user 차례가 아니면 함수 실행 안 함
    if (game.isComputerTurn) {
        return;
    }

    if (Math.random() < user['percent' + shootType]) {
        showText(shootType + '점슛이 성공했습니다!');
        updateUserScore(shootType);
    } else {
        showText(shootType + '점슛이 실패했습니다.')
    }

    // user가 슛을 한 뒤 컴퓨터 차례 true 처리
    game.isComputerTurn = true;

    disableComputerButtons(false);
    disableUserButtons(true);
}