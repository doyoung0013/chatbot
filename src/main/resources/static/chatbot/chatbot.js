/**
 * 
 */
//var sock = new SockJS('/ws-green-bot');
var client;
var key;
let flag=false;
// 브라우저가 WebSocket을 지원하는지 확인하는 함수
function isWebSocketSupported() {
    return 'WebSocket' in window;
}

// WebSocket 지원 여부를 출력
if (isWebSocketSupported()) {
    console.log("이 브라우저는 WebSocket을 지원합니다.");
} else {
    console.log("이 브라우저는 WebSocket을 지원하지 않습니다.");
}
function formatTime(now){
	
	var ampm=(now.getHours()>11)?"오후":"오전";
	var hour=now.getHours()%12;
	if(hour==0)hour=12;
	var minute=now.getMinutes();
	return `${ampm} ${hour}:${minute}`;
}

function formatDate(now){
	const year=now.getFullYear();
	//0월~
	const month=now.getMonth()+1;
	
	const date=now.getDate();
	//일:0 월:1 화:2~ 토:6
	
	const dayOfWeek=now.getDay();
	const days=["일요일", "월요일","화요일","수요일","목요일","금요일","토요일"];
	
	return `${year}년 ${month}월 ${date}일 ${days[dayOfWeek]}`;
}

//대화내용 추가
function showMessage(tag){
	$("#chat-content").append(tag);
	//스크롤을 제일 아래로
	$("#chat-content").scrollTop($("#chat-content").prop("scrollHeight"));
}

function generateUniqueKey(){
	return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

//웹소켓종료 연결 후 인사말 출력
function connect() {
	client = Stomp.over(new SockJS('/ws-green-bot'));
	client.connect({}, (frame) => {
		key = generateUniqueKey();
		//console.log(frame)
		//구독설정
		client.subscribe(`/topic/bot/${key}`, (answer) => {
			var msgObj = answer.body;
			//console.log("answer:", answer);
			//console.log("msg:", msgObj);
			var now = new Date();
			var time = formatTime(now);
			var date = formatDate(now);
			var tag = `
					<div class="flex center date">${date}</div>
					<div class="msg bot flex">
						<div class="icon">
							<img src="/images/icon/robot-solid.svg">
						</div>
						<div class="message">
							<div class="part">
								<p>${msgObj}</p>
							</div>
							<div class="time">${time}</div>
						</div>
					</div>
					`;
			
			
			showMessage(tag);
			
		});
		
		//json
		//*
		var data={
			key: key,
			content: "hello",
			name: "guest"
		}
		//접속하자마자 연결시도
		client.send("/bot/hello",{},JSON.stringify(data));
		//*/
	})
}
//웹소켓종료
function disconnect() {
	client.disconnect(() => {
		console.log("Disconnected...")
	});
}
//종료(X) 클릭 시 이벤트

function btnCloseClicked() {
	$("#bot-container").hide();
	//대화창 리셋
	$("#chat-content").html("");
	disconnect();
	flag=false;
}

//챗봇 시작 버튼 이벤트
function btnBotClicked() {
	if(flag)return; //여기서 종료
	//1. 소켓 접속
	$("#bot-container").show();
	connect();
	flag=true;
}
function clearQuestion(){
	$("#question").val("");
}
//메세지 전송
//채팅 입력했을때
function btnMsgSendClicked(){
	var question = $("#question").val().trim();
	if(question.length<2){
		alert("질문은 최소 2글자 이상으로");
		//clearQuestion();
		return;
	}
	var now = new Date();
	var time = formatTime(now);
	var tag = `
			<div class="msg user flex">
				<div class="message">
					<div class="part">
						<p>${question}</p>
					</div>
					<div class="time">${time}</div>
				</div>
			</div>
			`;
	showMessage(tag);
	
	var data={
			key: key,
			content: "question",
			name: "guest"
		}
		//접속하자마자 연결시도
		client.send("/bot/question",{},JSON.stringify(data));
		clearQuestion()
}

$(function() {
	$("#btn-bot").click(btnBotClicked);
});