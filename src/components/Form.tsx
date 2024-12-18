import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  description: z.string().min(3),
  amount: z.number().positive(),
  category: z.enum(["groceries", "utilities", "entertainment"]),
});

type FormData = z.infer<typeof schema>;

const Form = () => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = (data: FormData) => {
    console.log(data);
  };
  return (
    <>
      <h1>Budget Tracker</h1>
      <hr />
      <h4>Use this form to submit new expenses.</h4>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            {...register("description")}
            id="description"
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            {...register("amount")}
            id="amount"
            type="number"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            {...register("category")}
            id="category"
            className="form-select"
          >
            <option value="" />
            <option value="groceries">Groceries</option>
            <option value="utilities">Utilities</option>
            <option value="entertainment">Entertainment</option>
          </select>
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      <hr />
      <h4>Filter the table and remove expenses below.</h4>
      <hr />
    </>
  );
};

export default Form;
