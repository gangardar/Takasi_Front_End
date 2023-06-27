import { useState } from "react";
import NavBar from "./NavBar";
import DriverBikeDetails from "./driver_registration/DriverBikeDetails";
import DriverDocDetail from "./driver_registration/DriverDocDetail";
import DriverPersonal from "./driver_registration/DriverPersonal";
import UseMultistepForm from "./driver_registration/UseMultistepForm";

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
      <NavBar />

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
