import LoadingIcon from "./LoadingIcon";
import Link from "next/link";
const TransactionCancelledWidget = (): JSX.Element => {
  return (
    <section className="h-screen bg-[#8981b1]">
      <div className="w-full h-full flex items-center justify-center flex-col">
        <LoadingIcon />
      <p className="text-white text-2xl">Transaction Canceled. Thank you for choosing OFFLINK</p>
      <Link href="/dashboard" className=" text-[#8981b1] text-xl py-2 px-2 bg-white rounded-xl mt-2">Home</Link>
      </div>
    </section>
  );
};

export default TransactionCancelledWidget;
