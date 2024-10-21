import Link from "next/link";
import CardActivityLog from "./card-activitylog";
import CurrentMonthYear from "./current-mont";

const ActivityLog = () => {
  return (
    <div className="grid grid-rows">
      <div className="p-4">
        <div className="bg-font-white dark:bg-dark-navy shadow-lg rounded-lg p-6 h-full">
          <div className="grid grid-cols-12 w-full h-full">
            <div className="col-span-12 grid grid-cols-12 gap-4">
              <div className="col-span-12 flex justify-between items-center">
                <p className="font-custom dark:text-font-white text-font-black md:text-2xl font-medium text-sm">
                  Aktivitas
                </p>
                <Link href="#">
                  <button className="py-1 px-4 lg:py-3 lg:px-6 text-xs text-font-brown font-custom md:text-base font-medium bg-light-gold rounded-[10px] hover:opacity-80 transition-opacity duration-200 hover:shadow-md shadow-md">
                    Detail
                  </button>
                </Link>
              </div>
              <div className="col-span-12 space-y-4">
                <CurrentMonthYear />
                <CardActivityLog
                  title="Tambah Data - Halaman Leads"
                  date="20 September 2024, 12:00 WIB"
                  description="User telah menambahkan data leads Hanni"
                />
                <CardActivityLog title="halo" date="halo" description="halo" />
                <CardActivityLog title="halo" date="halo" description="halo" />
                <CardActivityLog title="halo" date="halo" description="halo" />
                <CardActivityLog title="halo" date="halo" description="halo" />
                <CardActivityLog title="halo" date="halo" description="halo" />
                <CardActivityLog title="halo" date="halo" description="halo" />
                <CardActivityLog title="halo" date="halo" description="halo" />
                <CardActivityLog title="halo" date="halo" description="halo" />
                <CardActivityLog title="halo" date="halo" description="halo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
