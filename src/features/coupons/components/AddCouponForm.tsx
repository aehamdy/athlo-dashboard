import Icon from "@/components/shared/Icon";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { couponSchema, type CouponFormValues } from "../coupons.schema";
import { COUPON_TYPE_OPTIONS } from "../constants";
import { DialogClose } from "@/components/ui/dialog";
import useCreateCoupon from "../hooks/useCreateCoupon";
import { toast } from "sonner";
import Loading from "@/components/shared/Loading";

const today = new Date();
today.setHours(0, 0, 0, 0);

function AddCouponForm() {
  const [date, setDate] = useState<DateRange | undefined>();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<CouponFormValues>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      type: undefined,
    },
  });
  const typeValue = getValues("type");
  const isSubmitDisabled =
    !date?.from || !date?.to || typeValue === undefined || typeValue === null;

  const createCoupon = useCreateCoupon();

  const onSubmit = async (data: CouponFormValues) => {
    if (!data.startDate || !data.endDate) {
      toast.error("Please select a valid start and end date");
      return;
    }
    if (data.type === undefined) {
      toast.error("Please select a coupon type");
      return;
    }

    createCoupon.mutate(data, {
      onSuccess: () => {
        reset();
        setDate(undefined);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-md">
      {/* Coupon Code + Value */}
      <div className="flex gap-sm">
        <div className="flex flex-col gap-sm w-1/2">
          <Input
            placeholder="Enter coupon code"
            className="form-input"
            {...register("code", {
              onChange: (e) => {
                e.target.value = e.target.value.toUpperCase();
              },
            })}
          />
          {errors.code && (
            <p className="text-xs text-red-500">{errors.code.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-sm w-1/2">
          <Input
            type="number"
            placeholder="Enter value (%)"
            className="form-input"
            {...register("percentage", { valueAsNumber: true })}
          />
          {errors.percentage && (
            <p className="text-xs text-red-500">{errors.percentage.message}</p>
          )}
        </div>
      </div>

      {/* Names */}
      <div className="flex gap-sm">
        <div className="flex flex-col gap-sm w-1/2">
          <Input
            placeholder="Name in English"
            className="form-input"
            {...register("nameEn")}
          />
          {errors.nameEn && (
            <p className="text-xs text-red-500">{errors.nameEn.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-sm w-1/2">
          <Input
            placeholder="Name in Arabic"
            className="form-input"
            {...register("nameAr")}
          />
          {errors.nameAr && (
            <p className="text-xs text-red-500">{errors.nameAr.message}</p>
          )}
        </div>
      </div>

      {/* Select + Date */}
      <div className="flex flex-wrap gap-md">
        {/* Coupon Type */}
        <div className="flex flex-col gap-sm w-full">
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value?.toString() ?? ""}
              >
                <SelectTrigger className="form-input w-full">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>

                <SelectContent>
                  {COUPON_TYPE_OPTIONS.map((item) => (
                    <SelectItem key={item.value} value={item.value.toString()}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.type && (
            <p className="text-xs text-red-500">{errors.type.message}</p>
          )}
        </div>

        {/* Date Range */}
        <Field className="flex flex-col gap-sm w-full">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="form-input w-full border-gray-200"
              >
                <Icon name="CalendarIcon" className="mr-2" />

                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "dd/MM/yyyy")} -{" "}
                      {format(date.to, "dd/MM/yyyy")}
                    </>
                  ) : (
                    format(date.from, "dd/MM/yyyy")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                selected={date}
                numberOfMonths={2}
                defaultMonth={date?.from ?? new Date()}
                // initialFocus
                disabled={{ before: today }}
                onSelect={(range) => {
                  setDate(range);

                  if (range?.from) setValue("startDate", range.from);
                  if (range?.to) setValue("endDate", range.to);
                }}
              />
            </PopoverContent>
          </Popover>

          {errors.startDate && (
            <p className="text-xs text-red-500">{errors.startDate.message}</p>
          )}
          {errors.endDate && (
            <p className="text-xs text-red-500">{errors.endDate.message}</p>
          )}
        </Field>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-sm">
        <Button
          type="submit"
          disabled={createCoupon.isPending || isSubmitDisabled}
        >
          {createCoupon.isPending ? (
            <span className="flex items-center gap-sm">
              <Loading /> Adding coupon...
            </span>
          ) : (
            "Add Coupon"
          )}
        </Button>

        <DialogClose asChild>
          <Button
            variant="outline"
            disabled={createCoupon.isPending}
            className="w-full"
          >
            Cancel
          </Button>
        </DialogClose>
      </div>
    </form>
  );
}

export default AddCouponForm;
