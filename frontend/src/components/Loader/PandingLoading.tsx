import LoadingIcon from "../LoadingIcon";
import { cancelTransaction } from "@/helpers/offlink";

type CancelTransactiondWidgetParams = {
  id: string;
};

const PendingLoading = ({id}: CancelTransactiondWidgetParams): JSX.Element => {
  return (
    <section className="h-screen bg-[#8981b1] text-center">
      <div className="w-full h-full flex items-center justify-center flex-col">
        <LoadingIcon />
      <p className="text-white text-2xl">Transaction pending. Waiting trader to accept transaction</p>
      <button
      onClick={async () => {
        await cancelTransaction(id);
      }} className="py-1 px-3 bg-white text-[7b64f2] rounded-lg mt-3"
      >Cancel Transaction</button>
      </div>
    </section>
  );
};

export default PendingLoading;
