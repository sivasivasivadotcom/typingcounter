'use strict';

{
	const typearea = document.getElementById('typearea');
	const startBtn = document.getElementById('startBtn');
	const stopBtn = document.getElementById('stopBtn');
	const restartBtn = document.getElementById('restartBtn');
	const quitBtn = document.getElementById('quitBtn');
	const retryBtn = document.getElementById('retryBtn');
	const timeCounter = document.getElementById('timeCounter');
	const resultLength = document.getElementById('resultLength');
	const resultArea = document.getElementById('resultArea');
	const exampleArea = document.getElementById('exampleArea');
	const exampleBtn = document.getElementById('exampleBtn');
	
	let time = 0;
	let elapsedTime = 0;// stopされた時間を記録する。
	// 再代入するのでletで宣言のみ
	let typeareaCount;
	let timeM;
	let result;
	let startTime;
	let stoppedTime;
	let timeoutId;

	// リロード時のBtn状態
	function beforeStart() {
		startBtn.classList.remove('hidden');
		stopBtn.classList.add('hidden');
		restartBtn.classList.add('hidden');
		quitBtn.classList.add('hidden');
		retryBtn.classList.add('hidden');
		typearea.readOnly = true;
	}

	// 入力時のBtn状態
	function started() {
		startBtn.classList.add('hidden');
		stopBtn.classList.remove('hidden');
		restartBtn.classList.add('hidden');
		quitBtn.classList.add('hidden');
		retryBtn.classList.add('hidden');
		typearea.readOnly = false;
	}

	// 中断時のBtn状態
	function stopped() {
		startBtn.classList.add('hidden');
		stopBtn.classList.add('hidden');
		restartBtn.classList.remove('hidden');
		quitBtn.classList.remove('hidden');
		retryBtn.classList.add('hidden');
		typearea.readOnly = true;
	}

	// 終了時のBtn状態
	function fine() {
		startBtn.classList.add('hidden');
		stopBtn.classList.add('hidden');
		restartBtn.classList.add('hidden');
		quitBtn.classList.add('hidden');
		retryBtn.classList.remove('hidden');
		typearea.readOnly = true;
	}

	// 残り時間を表示する
	function count() {
		timeM = Math.floor(time / 60);
		timeCounter.textContent = timeM;
		console.log(time);
	}

	// quitBtn, 時間が終了したときの挙動
	function textCount() {
		fine();
		clearTimeout(timeoutId);
		resultArea.classList.remove('hidden');
		typeareaCount = typearea.value.replace(/\n| |　/g, "");
		resultLength.textContent = typeareaCount.length;
	}

	// timeを1sごとに増やす
	function timeCount() {
		if (time === 600) {// 後で600に戻す
			textCount();
			return;
		}

		time++;

		timeoutId = setTimeout(() => {
			count();
			timeCount();
		}, 1000);// 1000msごとにtimeCounter()自身を呼び出す
	}

	// startBtn, restartBtnを押した時の挙動
	function countSet() {
		typearea.focus();
		count();
		started();
		timeCount();
		// typeareaをdisabled=falseにしたい
		// time = 600の時textCountを実行する
	}

	// stopBtnを押した時の挙動
	function stopSet() {
		stopped();
		clearTimeout(timeoutId);
		// typeareaをdisabledにしたい
	}

	// retryBtnを押した時の挙動
	function retry() {
		time = 0;
		beforeStart();
		resultArea.classList.add('hidden');
		timeCounter.textContent = '';
		typearea.value = '';
	}

	// 入力例を押した時の挙動
	function exampleHidden() {
		exampleArea.classList.toggle('hidden');
	}
	
	beforeStart();
	startBtn.addEventListener('click', countSet);
	stopBtn.addEventListener('click', stopSet);
	restartBtn.addEventListener('click', countSet);
	quitBtn.addEventListener('click', textCount);
	retryBtn.addEventListener('click', retry);

	exampleBtn.addEventListener('click', exampleHidden);
}