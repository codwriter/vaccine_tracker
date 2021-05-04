import React from 'react';
import { useForm } from 'react-hook-form';

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Name" {...register("Name", { required: true, maxLength: 80 })} />
      <input type="text" placeholder="Afm" {...register("Afm", { required: true, max: 9, min: 9, maxLength: 9, pattern: /^[0-9]+$/i })} />
      <input type="text" placeholder="Address" {...register("Address", { required: true })} />
      <input type="number" placeholder="Vaccine doses available" {...register("Vaccine doses available", {maxLength: 12})} />
      
      <input type="submit" />
    </form>
  );
}