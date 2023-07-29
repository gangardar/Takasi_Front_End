import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useCreateDriver from "../../services/queries/useCreateDriver";
import { useEffect, useState } from "react";
import axios from "axios";
import useGeoLocation from "../../services/hook/useGeoLocation";
import ErrorModal from "../ErrorModal";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const schema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, { message: "Enter a valid name." }).max(50),

  lincenceNo: z.string().min(9, { message: "Enter a valid number." }),

  phone: z.string().min(9, { message: "Enter a valid number" }).max(12),

  email: z.string().email(),

  photo: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0].type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),

  status: z.string().optional(),

  drivingLincence: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0].type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),

  current_latitude: z.string().optional(),
  current_longitude: z.string().optional(),

  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(30, { message: "Your password exceeded our threshold" }),
});

export type DriverFormData = z.infer<typeof schema>;

const DriverPersonal = () => {
  const location = useGeoLocation();
  const createDriver = useCreateDriver();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DriverFormData>({
    resolver: zodResolver(schema),
  });

  // const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   console.log(file, event.target.files);
  //   setSelectedPhoto(file);
  // };

  return (
    <div className="d-flex justify-content-center">
      <form
        encType="multipart/form-data"
        className="form-group form-group-lg"
        onSubmit={handleSubmit((data) => {
          const formData = new FormData();
          formData.append("name", data.name);
          formData.append("photo", data.photo[0]);
          formData.append("email", data.email);
          formData.append("lincenceNo", data.lincenceNo);
          formData.append("phone", data.phone);
          formData.append("status", "active");
          formData.append("password", data.password);
          formData.append("current_latitude", location.lat);
          formData.append("current_longitude", location.long);
          formData.append("drivingLincence", data.drivingLincence[0]);
          // try {
          //   const response = await axios.post(
          //     "http://127.0.0.1:8000/api/driver/register",
          //     formData
          //   );
          //   console.log(response.data);
          // } catch (error) {
          //   console.error(error);
          // }

          createDriver.mutate(formData);

          // createDriver.mutate({
          //   name: data.name,
          //   lincenceNo: data.lincenceNo,
          //   phone: data.phone,
          //   email: data.email,
          //   status: "active",
          //   password: data.password,
          //   drivingLincence: data.drivingLincence[0],
          //   current_latitude: location.lat,
          //   current_longitude: location.long,
          //   photo: data.photo[0],
          // });
        })}
        style={{ width: "80vw" }}
      >
        <div className="mb-3">
          {createDriver.error && <ErrorModal {...createDriver.error} />}
          <input
            {...register("name")}
            type="text"
            id="name"
            className="form-control input-lg"
            placeholder="Enter Your Name"
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>
        <div className="mb-3">
          <input
            {...register("lincenceNo")}
            type="text"
            id="lincenceNo"
            className="form-control"
            placeholder="Enter Your Driving Lincence Number"
          />
          {errors.lincenceNo && (
            <p className="text-danger">{errors.lincenceNo.message}</p>
          )}
        </div>
        <div className="mb-3">
          <input
            {...register("phone")}
            type="text"
            id="phone"
            className="form-control"
            placeholder="Enter Phone Number"
          />
          {errors.phone && (
            <p className="text-danger">{errors.phone.message}</p>
          )}
        </div>
        <div className="mb-3">
          <input
            {...register("email")}
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter Your Email Address"
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="photo" className="form-label">
            Provide Your Photo
          </label>
          <input
            {...register("photo")}
            type="file"
            id="photo"
            className="form-control-file"
            // onChange={(e) => handlePhotoChange(e)}
            placeholder="Your Profile"
            capture="user"
          />

          {errors.photo && (
            <p className="text-danger">{errors.photo.message?.toString()}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="drivingLincence" className="form-label">
            Provide Your Lincence Image
          </label>
          <input
            {...register("drivingLincence")}
            type="file"
            id="drivingLincence"
            className="form-control-file"
            placeholder="Provide Your Driving Lincence Number"
          />
          {errors.drivingLincence && (
            <p className="text-danger">
              {errors.drivingLincence.message?.toString()}
            </p>
          )}
        </div>

        <div className="mb-3">
          <input
            {...register("password")}
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter Strong Password"
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>

        {(errors.current_latitude || errors.current_longitude) && (
          <div className="mb-3">
            <p className="text-danger">{errors.current_latitude?.message};</p>
            <p className="text-danger">{errors.current_longitude?.message};</p>
          </div>
        )}

        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DriverPersonal;
