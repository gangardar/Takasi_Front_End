import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  onSubmit: (data: BikeFormData) => void;
}

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const schema = z.object({
  manufacturer_name: z
    .string()
    .min(3, { message: "Please Enter Valid Manufacturer" })
    .max(25),

  bike_model: z.string().min(3).max(10),

  bike_year: z.number().min(4, { message: " Please Input Valid Year" }).max(4),

  bike_lincence: z
    .string()
    .min(8, { message: " Lincence Number are at least 8 characters" })
    .max(10),

  bike_lincence_image: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  bike_front_pic: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
  bike_right_pic: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),

  bike_back_pic: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),

  bike_left_pic: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

export type BikeFormData = z.infer<typeof schema>;

const DriverBikeDetails = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BikeFormData>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="d-flex justify-content-center">
      <form
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
        style={{ width: "70vw" }}
      >
        <div className="mb-3">
          <input
            {...register("manufacturer_name")}
            type="text"
            id="manufacturer_name"
            className="form-control"
            placeholder="Enter Manufacturer Name"
          />
          {errors.manufacturer_name && (
            <p className="text-danger">{errors.manufacturer_name.message}</p>
          )}
        </div>
        <div className="mb-3">
          <input
            {...register("bike_model")}
            type="text"
            id="bike_model"
            className="form-control"
            placeholder="Enter Bike Model"
          />
          {errors.bike_model && (
            <p className="text-danger">{errors.bike_model.message}</p>
          )}
        </div>
        <div className="mb-3">
          <input
            {...register("bike_year")}
            type="year"
            id="bike_year"
            className="form-control"
            placeholder="Bike Purchased Year"
          />
          {errors.bike_year && (
            <p className="text-danger">{errors.bike_year.message}</p>
          )}
        </div>
        <div className="mb-3">
          <input
            {...register("bike_lincence")}
            type="text"
            id="bike_lincence"
            className="form-control"
            placeholder="Enter Bike Lincence Plate No."
          />
          {errors.bike_lincence && (
            <p className="text-danger">{errors.bike_lincence.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="bike_lincence_image" className="form-label">
            Provide Your Bike Lincence Image
          </label>
          <input
            {...register("bike_lincence_image")}
            type="file"
            id="bike_lincence_image"
            className="form-control-file"
            placeholder="Provide Bike Lincence"
          />
          {/* {errors.bike_lincence_image && (
            <p className="text-danger">{errors.bike_lincence_image.message}</p>
          )} */}
        </div>
        {/* Bike 360* photo */}
        <div className="mb-3">
          <label htmlFor="bike_front_pic" className="form-label">
            Provide Your Bike Front Image
          </label>
          <input
            {...register("bike_front_pic")}
            type="file"
            id="bike_front_pic"
            className="form-control-file"
            placeholder="Provide Front View Of Your Bike"
          />
          {/* {errors.bike_front_pic && (
            <p className="text-danger">{errors.bike_front_pic.message}</p>
          )} */}
        </div>

        <div className="mb-3">
          <label htmlFor="bike_right_pic" className="form-label">
            Provide Your Bike Right Image
          </label>
          <input
            {...register("bike_right_pic")}
            type="file"
            id="bike_right_pic"
            className="form-control-file"
            placeholder="Provide Right View Of Your Bike"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="bike_back_pic" className="form-label">
            Provide Your Bike Back Image
          </label>
          <input
            {...register("bike_back_pic")}
            type="file"
            id="bike_back_pic"
            className="form-control-file"
            placeholder="Provide Back View Of Your Bike"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="bike_left_pic" className="form-label">
            Provide Your Bike Left Image
          </label>
          <input
            {...register("bike_left_pic")}
            type="file"
            id="bike_left_pic"
            className="form-control-file file-input"
            placeholder="Provide Left View Of Your Bike"
          />
        </div>

        <div className="d-flex justify-content-between mb-5">
          <button className="btn btn-primary" onClick={history.back}>
            Next
          </button>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DriverBikeDetails;
