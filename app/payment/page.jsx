import { CheckoutWizard, Container } from "@/components/index";

const PaymentSelectionPage = () => {
  return (
    <Container>
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="mb-5 font-montserrat text-xl font-bold">
          Payment Method Selection
        </h1>

        {/* checkout wizard start */}
        <CheckoutWizard activeStep={2} />
        {/* checkout wizard end */}
      </div>
    </Container>
  );
};

export default PaymentSelectionPage;
