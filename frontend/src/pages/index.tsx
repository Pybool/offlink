import Image from "next/image";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import p2p from "../../public/images/p2pnew.png";

export default function Home() {
  return (
    <div className=" bg-[#4461F2]">
      <div className=" ">
        <Navbar />
      </div>
      <section
        id="main-content"
        className="container px-4 md:px-4  mx-auto h-[93vh] md:py-8 lg:p-0
   md:flex block lg:flex-row flex-col justify-between items-center w-full space-y-6 md:space-y-0"
      >
        <div className="landing w-full pt-8 md:pt-0 ">
          <div className="landing-mini w-full  flex md:flex-row flex-col md:items-center">
            <div className="md:w-[50%] w-full  flex flex-col space-y-6">
              <div className="space-y-6" id="">
                <p className="wel lg:text-5xl md:text-4xl text-3xl font-bold text-black">
                  Welcome to OffLink
                </p>
                <p className="lg:text-3xl md:text-2xl text-xl font-semibold text-white ">
                  Empowering P2P Crypto <br />
                </p>
                  <p className="text-white pb-2 text-2xl">Trading on Offlink</p>
                <p className="font-medium text-white">
                  {" "}
                  your gateway to a decentralized, peer-to-peer (P2P) ecosystem
                  for seamless Celo cryptocurrency transactions.
                </p>
              </div>
              <div className="">
                <Link href="/login">
                  <button
                    id="navigateButton"
                    className="rounded-lg text-white font-medium py-2 px-3 flex items-center bg-[#764ba2] justify-center"
                  >
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
            <div className="md:w-[50%] w-full flex items-center justify-center">
              <Image
                src={p2p}
                alt="p2p"
                width={500}
                height={420}
                className="md:h-[27rem] h-[22rem] object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
