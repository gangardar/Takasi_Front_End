import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AnyZodObject, ZodAny, z } from "zod";
import UseMultistepForm from "./UseMultistepForm";

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
  driver_name: z.string().min(3, { message: "Enter a valid name." }).max(50),

  driver_lincence: z.string().min(9, { message: "Enter a valid number." }),

  driver_phone: z.string().min(9, { message: "Enter a valid number" }).max(12),

  driver_email: z.string().email(),

  driver_profile: z
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

  driver_lincence_image: z
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

  driver_password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(30, { message: "Your password exceeded our threshold" }),
});

type ExpenseFormData = z.infer<typeof schema>;

const DriverPersonal = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(schema),
  });
  return (
    <div className="d-flex justify-content-center">
      <form
        className="form-group form-group-lg"
        onSubmit={handleSubmit((data) => {
          onSubmit(data);
        })}
        style={{ width: "70vw" }}
      >
        <div className="mb-3">
          <input
            {...register("driver_name")}
            type="text"
            id="driver_name"
            className="form-control input-lg"
            placeholder="Enter Your Name"
          />
          {errors.driver_name && (
            <p className="text-danger">{errors.driver_name.message}</p>
          )}
        </div>
        <div className="mb-3">
          <input
            {...register("driver_lincence")}
            type="text"
            id="driver_lincence"
            className="form-control"
            placeholder="Enter Your Driving Lincence Number"
          />
          {errors.driver_lincence && (
            <p className="text-danger">{errors.driver_lincence.message}</p>
          )}
        </div>
        <div className="mb-3">
          <input
            {...register("driver_phone")}
            type="text"
            id="driver_phone"
            className="form-control"
            placeholder="Enter Phone Number"
          />
          {errors.driver_phone && (
            <p className="text-danger">{errors.driver_phone.message}</p>
          )}
        </div>
        <div className="mb-3">
          <input
            {...register("driver_email")}
            type="email"
            id="driver_email"
            className="form-control"
            placeholder="Enter Your Email Address"
          />
          {errors.driver_email && (
            <p className="text-danger">{errors.driver_email.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="driver_profile" className="form-label">
            Provide Your Photo
          </label>
          <input
            {...register("driver_profile")}
            type="file"
            id="driver_profile"
            className="form-control-file"
            placeholder="Your Profile"
            capture="user"
          />

          {/* {errors.driver_profile && (
            <p className="text-danger">{errors.driver_profile.message}</p>
          )} */}
        </div>

        <div className="mb-3">
          <label htmlFor="driver_lincence_image" className="form-label">
            Provide Your Lincence Image
          </label>
          <input
            {...register("driver_lincence_image")}
            type="file"
            id="driver_lincence_image"
            className="form-control-file"
            placeholder="Provide Your Driving Lincence Number"
          />
          {/* {errors.driver_lincence_image && (
            <p className="text-danger">
              {errors.driver_lincence_image.message}
            </p>
          )} */}
        </div>

        <div className="mb-3">
          <input
            {...register("driver_password")}
            type="password"
            id="driver_password"
            className="form-control"
            placeholder="Enter Strong Password"
          />
          {errors.driver_password && (
            <p className="text-danger">{errors.driver_password.message}</p>
          )}
        </div>

        <div className="mb-3">
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
};

export default DriverPersonal;
