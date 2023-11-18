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
        }}
      ></button>
    </div>
  );
};

export default TransactionCompletedWidget;
