var comScore = 0;                   // computer 점수
var userScore = 0;                  // user 점수
var isComputerTurn = true;          // 슛 차례 초기화
var shotsLeft = 15;                 // 슛 남은 횟수 초기화

// id="text"에 들어가는 문장 수정하는 함수
function showText(txt) {
    var textElem = document.getElementById('text');
    textElem.innerHTML = txt;
}

// computer 점수를 최신화 하는 함수
function updateComputerScore(score) {
    comScore += score;
    var comScoreElem = document.getElementById('computer-score');
    comScoreElem.innerHTML = comScore;
}

// user 점수를 최신화 하는 함수
function updateUserScore(score) {
    userScore += score;
    var userScoreElem = document.getElementById('user-score');
    userScoreElem.innerHTML = userScore;
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

// btn-computer 버튼이 클릭되면 실행되는 함수
function computerShoot() {
    // computer 차례가 아니면 함수 실행 안 함
    if (!isComputerTurn) {
        return;
    }

    var shootType = Math.random() < 0.5 ? 2 : 3;

    if (shootType === 2) {
        if (Math.random() < 0.5) {
            showText('컴퓨터가 2점슛을 성공시켰습니다!');
            updateComputerScore(2);
        } else {
            showText('컴퓨터가 2점슛을 실패했습니다.');
        }
    } else {
        if (Math.random() < 0.33) {
            showText('컴퓨터가 3점슛을 성공시켰습니다!');
            updateComputerScore(3);
        } else {
            showText('컴퓨터가 3점슛을 실패했습니다.');
        }
    }

    // computer가 슛을 한 뒤 컴퓨터 차례 false 처리
    isComputerTurn = false;
    
    // 남은 슛 횟수 감소
    shotsLeft--;

    disableComputerButtons(true);
    disableUserButtons(false);

    // 남은 슛 횟수 화면 표시
    var shotsLeftElem = document.getElementById('shots-left');
    shotsLeftElem.innerHTML = shotsLeft;

    // 승부 판정
    if (shotsLeft === 0) {
        if (userScore > comScore) {
            showText('승리했습니다!');
        } else if (userScore < comScore) {
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
    if (isComputerTurn) {
        return;
    }

    if (shootType === 2) {
        if (Math.random() < 0.5) {
            showText('2점슛이 성공했습니다!!');
            updateUserScore(2);
        } else {
            showText('2점슛이 실패했습니다.');
        }
    } else {
        if (Math.random() < 0.33) {
            showText('3점슛이 성공했습니다!');
            updateUserScore(3);
        } else {
            showText('3점슛이 실패했습니다.');
        }
    }

    // user가 슛을 한 뒤 컴퓨터 차례 true 처리
    isComputerTurn = true;

    disableComputerButtons(false);
    disableUserButtons(true);
}