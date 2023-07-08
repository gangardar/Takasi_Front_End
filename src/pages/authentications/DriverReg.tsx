import { useState } from "react";
import DriverBikeDetails, {
  BikeFormData,
} from "../../components/driver_registration/DriverBikeDetails";
import DriverPersonal, {
  DriverFormData,
} from "../../components/driver_registration/DriverPersonal";
import useCreateDriver from "../../services/queries/useCreateDriver";
import NavBar from "../../components/NavBar";

function DriverReg() {
  const [currentStep, setCurrentStep] = useState(0);
  const [driverInfo, setDriverInfo] = useState<DriverFormData>();
  const [bikeInfo, setBikeInfo] = useState<BikeFormData>();

  if (driverInfo && bikeInfo) {
    const createDriver = useCreateDriver();
  }

  return (
    <>
      <NavBar />
      <DriverPersonal />
    </>
  );
}

export default DriverReg;
