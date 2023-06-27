import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  onSubmit: (data: ExpenseFormData) => void;
}

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const schema = z.object({
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

type ExpenseFormData = z.infer<typeof schema>;

const DriverDocDetail = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: {},
  } = useForm<ExpenseFormData | any>({
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
      </form>
    </div>
  );
};

export default DriverDocDetail;