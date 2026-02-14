import { useState } from "react";
import ProductInfoForm from "./forms/ProductInfoForm";
import ProductImagesForm from "./forms/ProductImagesForm";
import ProductVariantsForm from "./forms/ProductVariantsForm";

type stepType = 0 | 1 | 2;

function AddProductWizard() {
  const [step, setStep] = useState<stepType>(0);
  const [productId, setProductId] = useState<number | null>(null);

  const handleBack = () => {
    setStep((prev) => (prev === 0 ? 0 : ((prev - 1) as stepType)));
  };

  const handleSuccess = () => {
    setStep((prev) => (prev === 2 ? 2 : ((prev + 1) as stepType)));
  };

  return (
    <>
      {step === 0 && (
        <ProductInfoForm
          onSuccess={(id) => {
            setProductId(id);
            setStep(1);
          }}
        />
      )}

      {step === 1 && productId && (
        <ProductImagesForm
          productId={productId}
          onBack={handleBack}
          onSuccess={handleSuccess}
        />
      )}

      {step === 2 && productId && (
        <ProductVariantsForm
          productId={productId}
          onBack={handleBack}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
}

export default AddProductWizard;
