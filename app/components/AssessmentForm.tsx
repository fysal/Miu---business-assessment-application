/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mail, Phone, Send, User } from "lucide-react";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Input, RadioGroup } from "../page";
import Image from "next/image";

const AssessmentForm = ({
  handleSubmit,
  formSubData,
  step,
  prevStep,
  nextStep,
  onHandleChange,
  isLoading,
}: {
  step: number;
  formSubData: any;
  isLoading: boolean;
  prevStep: () => void;
  nextStep: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  onHandleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
}) => {
  return (
    <div className="min-h-screen h-full flex items-center justify-center p-3 md:p-6">
      <Toaster position="top-center" />

      {/* Glow effects */}
      <div className="absolute w-[500px] h-[500px] bg-red-600/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-red-500/10 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      <div className="relative max-w-3xl w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-3 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
            {/* <User className="w-7 h-7 text-red-400" /> */}
            <Image
              src="/images/logo.png"
              unoptimized
              alt="logo"
              width={500}
              height={500}
            />
          </div>

          <h1 className="text-3xl font-semibold text-white">
            Business Assessment
          </h1>

          <p className="text-gray-400 mt-1 text-sm">
            Step {step} of 3 • Pilot Program
          </p>

          {/* Progress */}
          <div className="w-full bg-white/10 h-1 mt-5 rounded-full">
            <div
              className="h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Brand Name"
                name="brandName"
                value={formSubData.brandName}
                loading={isLoading}
                onChange={onHandleChange}
                required={true}
              />
              <Input
                label="Contact Name"
                name="contactName"
                required={true}
                value={formSubData.contactName}
                loading={isLoading}
                onChange={onHandleChange}
              />

              <div className="md:col-span-2">
                <label className="label">Email Address</label>
                <div className="relative flex">
                  <Mail className="icon" />
                  <input
                    type="email"
                    name="email"
                    value={formSubData.email}
                    disabled={isLoading}
                    className="input-styles pl-10"
                    required
                    onChange={onHandleChange}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="label">Phone Number</label>
                <div className="relative">
                  <Phone className="icon" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formSubData.phone}
                    disabled={isLoading}
                    placeholder="+256"
                    onChange={onHandleChange}
                    className="input-styles  pl-10"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="label">Product Category</label>
                <select
                  name="category"
                  required
                  className="input-styles"
                  value={formSubData.category || ""}
                  disabled={isLoading}
                  onChange={onHandleChange}>
                  <option value="">Select category</option>
                  {[
                    "Food & Beverages",
                    "Cosmetics",
                    "Agriculture",
                    "Other",
                  ].map((v: string, idx: number) => (
                    <option key={idx} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="grid md:grid-cols-2 gap-6">
              <RadioGroup
                name="sellingStage"
                label="Where are you currently selling?"
                checkedValue={formSubData.sellingStage}
                onChange={onHandleChange}
                loading={isLoading}
                options={[
                  "Not selling yet",
                  "Informal (markets, word of mouth)",
                  "Retailer shelves",
                  "Export",
                ]}
              />

              <RadioGroup
                name="packaging"
                label="Packaging & Branding quality"
                checkedValue={formSubData.packaging}
                onChange={onHandleChange}
                loading={isLoading}
                options={[
                  "None",
                  "Basic",
                  "Retail acceptable",
                  "Shelf/export ready",
                ]}
              />

              <RadioGroup
                name="consistency"
                label="Product consistency / standardization"
                checkedValue={formSubData.consistency}
                onChange={onHandleChange}
                loading={isLoading}
                options={[
                  "No consistency",
                  "Some consistency",
                  "Mostly standardized",
                  "Fully standardized",
                ]}
              />

              <RadioGroup
                name="market"
                label="Market clarity"
                checkedValue={formSubData.market}
                onChange={onHandleChange}
                loading={isLoading}
                options={[
                  "No clear market",
                  "Some idea",
                  "Defined market",
                  "Very clear positioning",
                ]}
              />

              <div className="md:col-span-2">
                <RadioGroup
                  name="scaling"
                  label="Ability to scale production"
                  checkedValue={formSubData.scaling}
                  onChange={onHandleChange}
                  loading={isLoading}
                  options={[
                    "Cannot scale",
                    "Limited capacity",
                    "Moderate capacity",
                    "High capacity",
                  ]}
                />
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Monthly Production Capacity"
                name="productionCapacity"
                loading={isLoading}
                value={formSubData.productionCapacity}
                onChange={onHandleChange}
              />

              <div>
                <label className="label">Target Market</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Local", "Regional", "Export"].map((item) => (
                    <label key={item} className=" flex gap-2 items-center">
                      <input
                        type="checkbox"
                        className="checkbox"
                        name="targetMarket"
                        onChange={onHandleChange}
                        disabled={isLoading}
                        value={item}
                      />
                      <span className="text-white text-xs"> {item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="label">Biggest Challenge</label>
                <textarea
                  name="challenge"
                  onChange={onHandleChange}
                  value={formSubData.challenge ?? ""}
                  className="input-styles h-24"
                />
              </div>

              <div className="md:col-span-2">
                <RadioGroup
                  name="investment"
                  onChange={onHandleChange}
                  checkedValue={formSubData.investment}
                  loading={isLoading}
                  label="Willing to invest in packaging improvements?"
                  options={["Yes", "No"]}
                />
              </div>
            </div>
          )}

          {/* NAV */}
          <div className="flex gap-4 pt-4">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                disabled={isLoading}
                className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg transition">
                Back
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:opacity-90 text-white py-3 rounded-lg transition">
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-3 rounded-lg flex justify-center gap-2">
                {isLoading ? "Submitting..." : "Submit"}
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssessmentForm;
