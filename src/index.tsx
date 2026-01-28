// Import React và các hook cần dùng
import React, { useState, useEffect } from 'react';

// Import các component từ Ant Design
import { Card, InputNumber, Button, Typography, Space, message } from 'antd';

// Tách các component chữ cho gọn
const { Title, Text } = Typography;

// Số lượt đoán tối đa
const MAX_TURN = 10;

// Component chính của Bài 1 – Đoán số
const Bai1DoanSo: React.FC = () => {

  // Số ngẫu nhiên hệ thống sinh ra
  const [randomNumber, setRandomNumber] = useState<number>(0);

  // Số người chơi nhập
  const [guess, setGuess] = useState<number | null>(null);

  // Số lượt đã đoán
  const [turn, setTurn] = useState<number>(0);

  // Trạng thái kết thúc game hay chưa
  const [finished, setFinished] = useState<boolean>(false);

  // useEffect chạy 1 lần khi component được render lần đầu
  // Dùng để khởi tạo game
  useEffect(() => {
    resetGame();
  }, []);

  // Hàm reset game
  const resetGame = () => {
    // Sinh số ngẫu nhiên từ 1 đến 100
    const number = Math.floor(Math.random() * 100) + 1;

    // Cập nhật lại toàn bộ trạng thái
    setRandomNumber(number);
    setGuess(null);
    setTurn(0);
    setFinished(false);
  };

  // Hàm xử lý khi bấm nút "Đoán"
  const handleGuess = () => {

    // Nếu chưa nhập số
    if (guess === null) {
      message.warning('Vui lòng nhập số!');
      return;
    }

    // Nếu game đã kết thúc thì không cho đoán nữa
    if (finished) return;

    // Tăng số lượt đoán
    const newTurn = turn + 1;
    setTurn(newTurn);

    // Trường hợp đoán đúng
    if (guess === randomNumber) {
      message.success('🎉 Chúc mừng! Bạn đã đoán đúng!');
      setFinished(true);
      return;
    }

    // Trường hợp đoán sai
    if (guess < randomNumber) {
      message.info('Bạn đoán quá thấp!');
    } else {
      message.info('Bạn đoán quá cao!');
    }

    // Hết lượt chơi
    if (newTurn >= MAX_TURN) {
      message.error(`Bạn đã hết lượt! Số đúng là ${randomNumber}`);
      setFinished(true);
    }
  };

  // Giao diện hiển thị
  return (
    <Card
      style={{
        maxWidth: 420,
        margin: '60px auto',
        textAlign: 'center',
      }}
    >
      {/* Tiêu đề */}
      <Title level={3}>Game Đoán Số</Title>

      {/* Mô tả luật chơi */}
      <Text>
        Hệ thống đã sinh một số từ <b>1 đến 100</b>
        <br />
        Bạn có tối đa <b>{MAX_TURN}</b> lượt đoán
      </Text>

      {/* Các thành phần nhập liệu và nút bấm */}
      <Space direction="vertical" size="middle" style={{ width: '100%', marginTop: 20 }}>
        
        {/* Ô nhập số */}
        <InputNumber
          min={1}
          max={100}
          value={guess}
          onChange={(value) => setGuess(value)}
          placeholder="Nhập số bạn đoán"
          style={{ width: '100%' }}
          disabled={finished}
        />

        {/* Nhóm nút bấm */}
        <Space>
          <Button type="primary" onClick={handleGuess} disabled={finished}>
            Đoán
          </Button>
          <Button onClick={resetGame}>
            Chơi lại
          </Button>
        </Space>

        {/* Hiển thị số lượt đã dùng */}
        <Text>Số lượt đã dùng: {turn}/{MAX_TURN}</Text>
      </Space>
    </Card>
  );
};

// Export component
export default Bai1DoanSo;
