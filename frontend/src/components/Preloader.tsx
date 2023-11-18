import LoadingIcon from "@/components/LoadingIcon";

const Preloader = (): JSX.Element => {
  return (
    <section className="h-screen bg-red-200">
      <div className="w-full h-full flex items-center justify-center">
        <LoadingIcon />
      </div>
    </section>
  );
};

export default Preloader;
