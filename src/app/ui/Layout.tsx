"use client";
import ScanIcon from './ScanIcon';

const AppLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="">
      <div className="flex justify-between items-center p-4 border border-gray-300">
        <div className="flex items-center gap-2">
          <ScanIcon />
          <h1 className="font-semibold text-orange-600 text-2xl">
            BillSplit <span className="bg-o">Fake</span>
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-5 mx-auto mt-10 w-80">{children}</div>
    </div>
  );
};
export default AppLayout;
