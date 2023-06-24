import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface Props {
  onSubmit: (data: PassengerRegFormData) => void;
}

const schema = z.object({
  name: z.string(),
  phone: z.string(),
  age: z.number(),
  email: z.string(),
  password: z.string(),
});

type PassengerRegFormData = z.infer<typeof schema>;

function PassengerReg() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PassengerRegFormData>({ resolver: zodResolver(schema) });

  return (
    <form className="m-4">
      <div className="mb-3">
        <input
          className="form-control form-control-lg"
          {...register("name")}
          id="name"
          type="text"
          placeholder="Enter Your Name"
        />
        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>

      <div className="mb-3">
        <input
          className="form-control form-control-lg"
          {...register("phone")}
          id="phone"
          type="text"
          placeholder="Enter Your Phone"
        />
        {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
      </div>

      <div className="mb-3">
        <input
          className="form-control form-control-lg"
          {...register("age", { valueAsNumber: true })}
          id="age"
          type="text"
          placeholder="Your Age"
        />
        {errors.age && <p className="text-danger">{errors.age.message}</p>}
      </div>

      <div className="mb-3">
        <input
          className="form-control form-control-lg"
          {...register("email")}
          id="email"
          type="email"
          placeholder="Your Email Address"
        />
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
      </div>

      <div className="mb-3">
        <input
          className="form-control form-control-lg"
          {...register("password")}
          id="password"
          type="password"
          placeholder="Please Enter Strong Password"
        />
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
      </div>

      <div className="d-flex justify-content-end">
        <button className="btn btn-primary btn-lg" disabled={!isValid}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default PassengerReg;
