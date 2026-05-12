import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { couponSchema, type CouponFormValues } from '../coupons.schema';
import { COUPON_TYPE_OPTIONS } from '../constants';
import useCreateCoupon from '../hooks/useCreateCoupon';
import useUpdateCoupon from '../hooks/useUpdateCoupon';
import Icon from '@/components/shared/Icon';
import Loading from '@/components/shared/Loading';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DialogClose } from '@/components/ui/dialog';
import type { Coupon, CouponFormMode } from '../types';
import type { DateRange } from 'react-day-picker';

type CouponFormProps = {
  mode: CouponFormMode;
  coupon?: Coupon;
  onSuccess?: () => void;
};

const today = new Date();
today.setHours(0, 0, 0, 0);

function CouponForm({ mode, coupon, onSuccess }: CouponFormProps) {
  const [date, setDate] = useState<DateRange | undefined>(() => {
    if (mode === 'edit' && coupon) {
      return {
        from: new Date(coupon.startDate),
        to: new Date(coupon.endDate),
      };
    }
    return undefined;
  });

  const createCoupon = useCreateCoupon();
  const updateCoupon = useUpdateCoupon();

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
      code: '',
      nameEn: '',
      nameAr: '',
      percentage: 0,
      type: undefined,
    },
  });

  // Prefill when editing
  useEffect(() => {
    if (mode !== 'edit' || !coupon) return;

    reset({
      code: coupon.code,
      nameEn: coupon.nameEn,
      nameAr: coupon.nameAr,
      percentage: coupon.percentage,
      type:
        typeof coupon.type === 'number'
          ? coupon.type
          : coupon.type === 'Global'
            ? 0
            : 1,
      startDate: new Date(coupon.startDate),
      endDate: new Date(coupon.endDate),
    });
  }, [coupon, mode, reset]);

  const typeValue = getValues('type');

  const isSubmitDisabled = !date?.from || !date?.to || typeValue === undefined;

  const onSubmit = (data: CouponFormValues) => {
    if (mode === 'create') {
      createCoupon.mutate(data, {
        onSuccess: () => {
          reset();
          setDate(undefined);
          onSuccess?.();
        },
      });
    }

    if (mode === 'edit' && coupon) {
      const payload = {
        id: coupon.id,
        code: data.code,
        nameEn: data.nameEn,
        nameAr: data.nameAr,
        percentage: data.percentage,
        type: data.type,
        startDate: data.startDate,
        endDate: data.endDate,
      };

      updateCoupon.mutate(payload, {
        onSuccess: () => {
          onSuccess?.();
        },
      });
    }
  };

  const isPending =
    mode === 'create' ? createCoupon.isPending : updateCoupon.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-md">
      {/* Code + Percentage */}
      <div className="flex gap-sm">
        <div className="flex flex-col gap-sm w-1/2">
          <Input
            placeholder="Enter coupon code"
            className="form-input"
            {...register('code')}
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
            {...register('percentage', { valueAsNumber: true })}
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
            {...register('nameEn')}
          />
        </div>

        <div className="flex flex-col gap-sm w-1/2">
          <Input
            placeholder="Name in Arabic"
            className="form-input"
            {...register('nameAr')}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-md">
        {/* Type */}
        <div className="flex flex-col gap-sm w-full">
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value?.toString() ?? ''}
                onValueChange={(v) => field.onChange(Number(v))}
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
        </div>

        {/* Date Range */}
        <Field>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="form-input w-full border-gray-200"
              >
                <Icon name="CalendarIcon" className="mr-2" />

                {date?.from && date?.to
                  ? `${format(date.from, 'dd/MM/yyyy')} - ${format(
                      date.to,
                      'dd/MM/yyyy',
                    )}`
                  : 'Pick date range'}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto">
              <Calendar
                mode="range"
                selected={date}
                numberOfMonths={2}
                disabled={{ before: today }}
                onSelect={(range) => {
                  setDate(range);

                  if (range?.from) setValue('startDate', range.from);
                  if (range?.to) setValue('endDate', range.to);
                }}
              />
            </PopoverContent>
          </Popover>
        </Field>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-sm">
        <Button type="submit" disabled={isPending || isSubmitDisabled}>
          {isPending ? (
            <span className="flex items-center gap-sm">
              <Loading />
              {mode === 'create' ? 'Adding coupon...' : 'Updating coupon...'}
            </span>
          ) : mode === 'create' ? (
            'Add Coupon'
          ) : (
            'Update Coupon'
          )}
        </Button>

        <DialogClose asChild>
          <Button variant="outline" disabled={isPending} className="w-full">
            Cancel
          </Button>
        </DialogClose>
      </div>
    </form>
  );
}

export default CouponForm;
