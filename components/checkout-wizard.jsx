const CheckoutWizard = ({ activeStep = 0 }) => {
  return (
    <div className="mb-5 flex flex-wrap">
      {["Sign in", "Shipping Details", "Payment Method", "Order Summary"].map(
        (step, index) => (
          <div
            key={step}
            className={`flex-1 border-b-2 text-center ${
              index <= activeStep
                ? "border-foreground text-foreground"
                : "border-slate-500 text-slate-500"
            }`}
          >
            {step}
          </div>
        ),
      )}
    </div>
  );
};

export default CheckoutWizard;
