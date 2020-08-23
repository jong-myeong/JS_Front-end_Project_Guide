var SCISSORS = '가위',
    ROCK = '바위',
    PAPER = '보';

var userInput = prompt('가위, 바위, 보!');

if (userInput !== SCISSORS && userInput !== ROCK && userInput !== PAPER) {
    alert('가위, 바위, 보 중 하나를 입력해야합니다!');
} else {
    var computerInput;

    // Math.random()은 0부터 1사이의 임의의 값을 리턴
    var randomValue = Math.random();
    if ( randomValue < 0.33) {
        computerInput = SCISSORS;
    } else if (randomValue >= 0.33 && randomValue < 0.66) {
        computerInput = ROCK;
    } else {
        computerInput = PAPER;
    }

    switch(userInput) {
        case SCISSORS:
            switch(computerInput) {
                case SCISSORS:
                    alert('컴퓨터: ' + computerInput + ' - 컴퓨터와 비겼습니다.');
                    break;
                case ROCK:
                    alert('컴퓨터: ' + computerInput + ' - 컴퓨터에게 졌습니다...');
                    break;
                default:
                    alert('컴퓨터: ' + computerInput + ' - 컴퓨터를 이겼습니다!');
                    break;
            }
            break;

        case ROCK:
            switch(computerInput) {
                case SCISSORS:
                    alert('컴퓨터: ' + computerInput + ' - 컴퓨터를 이겼습니다.');
                    break;
                case ROCK:
                    alert('컴퓨터: ' + computerInput + ' - 컴퓨터와 비겼습니다.');
                    break;
                default:
                    alert('컴퓨터: ' + computerInput + ' - 컴퓨터에게 졌습니다...');
                    break;
            }
            break;
            
        default:
            switch(computerInput) {
                case SCISSORS:
                    alert('컴퓨터: ' + computerInput + ' - 컴퓨터에게 졌습니다...');
                    break;
                case ROCK:
                    alert('컴퓨터: ' + computerInput + ' - 컴퓨터를 이겼습니다!');
                    break;
                default:
                    alert('컴퓨터: ' + computerInput + ' - 컴퓨터와 비겼습니다.');
                    break;
            }
            break;
    }
}