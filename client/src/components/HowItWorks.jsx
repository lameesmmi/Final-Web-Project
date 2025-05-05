import React from 'react';
// Optional if you want to style further

const HowItWorks = () => {
  const steps = [
    { number: 1, text: "Match with Saudi Locals" },
    { number: 2, text: "Find Unique Experiences" },
    { number: 3, text: "Enjoy your trip!" },
  ];

  return (
    <section className="how-it-works-section text-center py-5 bg-white">
      <div className="container">
        <h2 className="mb-5">
          How It Works
        </h2>

        <div className="d-flex justify-content-center flex-wrap gap-5">
          {steps.map((step, index) => (
            <div key={index} className="how-step text-center">
              <div className="step-number mb-2">
                <h3 style={{ color: '#6a669d' }}><b>{step.number}</b></h3>
              </div>

              <p className="step-text">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
