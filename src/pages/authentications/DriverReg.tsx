import { useState } from "react";
import DriverBikeDetails from "../../components/driver_registration/DriverBikeDetails";
import DriverDocDetail from "../../components/driver_registration/DriverDocDetail";
import DriverPersonal from "../../components/driver_registration/DriverPersonal";

function DriverReg() {
  const [currentStep, setCurrentStep] = useState(0);

  // const { steps, currentStepIndex, step, next } = UseMultistepForm([
  //   <DriverPersonal
  //     onClick={1}
  //     onSubmit={(data) => console.log(data)}
  //   />,
  //   <DriverBikeDetails onSubmit={(data) => console.log(data)} />,
  //   <DriverDocDetail onSubmit={(data) => console.log(data)} />,
  // ]);

  return (
    <>
      {currentStep === 0 && (
        <DriverPersonal
          onSubmit={(data) => {
            setCurrentStep(1);
            console.log(data);
          }}
        />
      )}
      {currentStep === 1 && (
        <DriverDocDetail
          onSubmit={(data) => {
            setCurrentStep(2);
            console.log(data);
          }}
        />
      )}
      {currentStep === 2 && (
        <DriverBikeDetails
          onSubmit={(data) => {
            console.log(data);
          }}
        />
      )}
    </>
  );
}

export default DriverReg;
