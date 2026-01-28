import { useEffect, useState } from 'react';
import styles from './guessNumber.less';

/**
 * Bài 1: Trò chơi đoán số
 * - Sinh số ngẫu nhiên từ 1 đến 100
 * - Tối đa 10 lượt đoán
 * - Thông báo cao / thấp / đúng
 */

export default function GuessNumber() {
  const MAX_TURN = 10;

  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [turn, setTurn] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  // Sinh số ngẫu nhiên khi bắt đầu game
  useEffect(() => {
    const number = Math.floor(Math.random() * 100) + 1;
    setRandomNumber(number);
  }, []);

  const handleGuess = () => {
    if (turn >= MAX_TURN) return;

    const userNumber = Number(guess);
    if (isNaN(userNumber) || userNumber < 1 || userNumber > 100) {
      setMessage('Vui lòng nhập số hợp lệ từ 1 đến 100');
      return;
    }

    const newTurn = turn + 1;
    setTurn(newTurn);

    if (userNumber < randomNumber) {
      setMessage('Bạn đoán quá thấp!');
    } else if (userNumber > randomNumber) {
      setMessage('Bạn đoán quá cao!');
    } else {
      setMessage('🎉 Chúc mừng! Bạn đã đoán đúng!');
      return;
    }

    if (newTurn === MAX_TURN) {
      setMessage(`❌ Bạn đã hết lượt! Số đúng là ${randomNumber}`);
    }

    setGuess('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Bài 1: Trò chơi đoán số</div>

      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          type="number"
          value={guess}
          placeholder="Nhập số từ 1 đến 100"
          onChange={(e) => setGuess(e.target.value)}
        />
        <button className={styles.button} onClick={handleGuess}>
          Đoán
        </button>
      </div>

      <div className={styles.status}>Lượt chơi: {turn} / {MAX_TURN}</div>
      <div className={styles.status}>{message}</div>
    </div>
  );
}