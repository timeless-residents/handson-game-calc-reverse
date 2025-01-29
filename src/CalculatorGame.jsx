import { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

const CalculatorGame = () => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState('スタートを押して遊び始めましょう！');

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsRunning(false);
            setMessage('時間切れです！もう一度遊びますか？');
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    if (timeLeft === 0) {
      resetTimer();
    } else {
      setIsRunning(!isRunning);
      setMessage(isRunning ? 'タイマーを一時停止しました' : 'タイマーが動いています！');
    }
  };

  const resetTimer = () => {
    setTimeLeft(600);
    setIsRunning(false);
    setMessage('リセットしました。スタートを押して遊び始めましょう！');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const numberGuide = [
    { number: '0', letter: 'O' },
    { number: '1', letter: 'I' },
    { number: '2', letter: 'Z' },
    { number: '3', letter: 'E' },
    { number: '4', letter: 'h' },
    { number: '5', letter: 'S' },
    { number: '6', letter: 'g' },
    { number: '7', letter: 'L' },
    { number: '8', letter: 'B' },
    { number: '9', letter: 'g' },
  ];

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Timer className="w-6 h-6" />
            <span className="text-4xl font-bold">{formatTime(timeLeft)}</span>
          </div>
          <p className="text-lg mb-4">{message}</p>
        </div>

        <div className="flex justify-center gap-4">
          <button 
            onClick={toggleTimer}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                一時停止
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                {timeLeft === 0 ? '再スタート' : 'スタート'}
              </>
            )}
          </button>
          <button 
            onClick={resetTimer}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            リセット
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-center">数字→文字 変換ガイド</h3>
          <div className="grid grid-cols-5 gap-2">
            {numberGuide.map(({number, letter}) => (
              <div key={number} className="text-center p-2 border rounded">
                <div className="font-bold">{number}</div>
                <div className="text-sm">↓</div>
                <div>{letter}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorGame;