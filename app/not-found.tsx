import Image from "next/image";
import Icon from "@/public/icon.svg";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Image src={Icon} alt="icon" width={100} height={100} />
      <h1 className="mt-6 mb-4 font-mono max-w-sm text-balance text-center">
        We couldn't find the page you were looking for.
      </h1>
    </div>
  );
};

export default NotFound;
