import Confetti from 'react-confetti';

const Submission = () => {

  return (
    <div className="white-container">
      <Confetti />
      <div className="white-text" style={{ textAlign: 'center' }}>
        <h2>Congratulations Your On The Map!</h2>
      </div>
    </div>
  );
};

export default Submission;
