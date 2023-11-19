import LoadingIcon from "./LoadingIcon";
import Link from "next/link";

const TransactionReleasedWidget = (): JSX.Element => {
  return (
    <section className="h-screen bg-[#4461F2] text-center">
        <div className="w-full h-full text-center flex items-center justify-center flex-col">
        <LoadingIcon />
        <p className="text-white text-2xl text-center">Transaction completed. Kindly check your wallet to confim payment</p>
        <p className="text-white text-2xl text-center">Thanks for chosing Offlink. Do you like to perform another transaction?</p>
        <Link href="/offramp" className=" py-1 px-3 bg-white text-[7b64f2] rounded-lg mt-3">Click here</Link>
      </div>
    </section>
  );
};

export default TransactionReleasedWidget;
