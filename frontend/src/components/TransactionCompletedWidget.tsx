import { acceptTransaction } from "@/helpers/offlink";

type TransactionCompletedWidgetParams = {
  id: string;
};

const TransactionCompletedWidget = ({
  id,
}: TransactionCompletedWidgetParams): JSX.Element => {
  return (
    <div>
      <p>Transaction Completed</p>
      <button
        onClick={async () => {
          await acceptTransaction(id);
        }} className="py-1 px-3 bg-white text-[7b64f2] rounded-lg mt-3"
      >Confirm Transaction</button>
    </div>
  );
};

export default TransactionCompletedWidget;
