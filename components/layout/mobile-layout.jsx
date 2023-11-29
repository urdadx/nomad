const MobileLayout = ({ children }) => {
  return (
    <>
      <section className="lg:w-[400px] mx-auto lg:p-2 border min-h-full rounded-t-xl lg:mt-6">
        {children}
      </section>
    </>
  );
};

export default MobileLayout;
