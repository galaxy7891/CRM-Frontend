const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-custom text-center mb-9 font-bold text-font-black text-xl lg:text-[32px]">
      {children}
    </div>
  );
};

export default Title;
