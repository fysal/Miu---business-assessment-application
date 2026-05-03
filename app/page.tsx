/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { registerForEvent } from "./actions";
import { unknown } from "zod";
import AssessmentForm from "./components/AssessmentForm";
import toast from "react-hot-toast";

export default function EventRegistration() {
  const [step, setStep] = useState(1);
  const [formSubData, setFormSubData] = useState<any>({ targetMarket: [] });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsLoading(true);
    //append values to formData element
    const formData = new FormData();

    Object.entries(formSubData).forEach(([key, value]) => {
      if (key === "targetMarket" && Array.isArray(value)) {
        return formData.append(key, [...value].join(", "));
      } else {
        formData.append(
          key,
          typeof value === "string" ? value : JSON.stringify(value),
        );
      }
    });

    const result = await registerForEvent(unknown, formData);
    setIsLoading(false);

    if (result.success) {
      // Pass data to success page via search params or state management
      toast.success(result.message);
      setStep(1);
      setFormSubData({ targetMarket: [] });
    } else {
      toast.error(result.message);
      //  if (result.error.includes("email")) setErrors({ email: result.error });
    }
  }

  const onHandleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    // console.log(value);
    if (name === "targetMarket") {
      //chcek if value exist and remove it
      const val = formSubData.targetMarket;

      setFormSubData((prev: any) => ({
        ...prev,
        [name]: val.includes(value)
          ? val.filter((v: string) => v !== value)
          : [...val, value],
      }));
    } else setFormSubData((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <AssessmentForm
      step={step}
      formSubData={formSubData}
      prevStep={prevStep}
      nextStep={nextStep}
      handleSubmit={handleSubmit}
      onHandleChange={onHandleChange}
      isLoading={isLoading}
    />
  );
}

/* Reusable Input */
export function Input({
  label,
  name,
  required = false,
  onChange,
  value,
  loading,
}: {
  label: string;
  required?: boolean;
  name: string;
  loading: boolean;
  value?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="label">{label}</label>
      <input
        name={name}
        onChange={onChange}
        required={required}
        value={value ?? ""}
        disabled={loading}
        className="input-styles"
      />
    </div>
  );
}

/* Radio Group */
export function RadioGroup({
  name,
  label,
  options,
  onChange,
  checkedValue,
  loading,
}: {
  name: string;
  label: string;
  options: string[];
  checkedValue: string;
  loading: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}) {
  return (
    <div>
      <p className=" text-white mb-2">{label}</p>
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center gap-2 mb-2 text-white text-xs">
          <input
            type="radio"
            className="checkbox"
            name={name}
            checked={option === checkedValue}
            value={option}
            disabled={loading}
            onChange={onChange}
            required={true}
          />
          {option}
        </label>
      ))}
    </div>
  );
}
