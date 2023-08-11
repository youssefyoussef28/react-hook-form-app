import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

type FormValues = {
  username: string;
  email: string;
  channel: string;
};

export const YouTubeForm = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState, watch } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted", data);
  };

  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch]);

  return (
    <div>
      <h1>YouTube Form</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: { value: true, message: "Username is required" },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="form-contorl">
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", { required: "Channel is required" })}
          />
          <p className="error">{errors.channel?.message}</p>
        </div>

        <button>Submit</button>
        <DevTool control={control} />
      </form>
    </div>
  );
};
