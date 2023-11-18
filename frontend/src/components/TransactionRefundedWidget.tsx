import Preloader from "./Preloader";
import LoadingIcon from "./LoadingIcon";


const TransactionRefundedWidget = (): JSX.Element => {
  return (
    <section className="h-screen bg-[#4461F2]">
      <div className="w-full h-full flex items-center justify-center flex-col">
        <LoadingIcon />
        <p className="text-white text-2xl">Refund Successful. Kindly check your wallet for Refund</p>
        <p className="text-white text-2xl">Thanks for chosing Offlink</p>
        
      </div>
    </section>
  );
};

export default TransactionRefundedWidget;
