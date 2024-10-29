interface CustomerInfoItemProps {
    label: string;
    value?: string;
  }
  
  const CustomerInfo: React.FC<CustomerInfoItemProps> = ({ label, value }) => {
    return (
      <div className="">
        <p className="font-medium dark:text-font-white font-custom text-font-black text-xs md:text-base mb-1">
          {label}
        </p>
        <p className="font-custom dark:text-font-white text-font-black text-xs md:text-base truncate">
          {value || "N/A"}
        </p>
      </div>
    );
  };
  
  export default CustomerInfo;
  