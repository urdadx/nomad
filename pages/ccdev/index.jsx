/* eslint-disable @next/next/no-img-element */
const IConnect = () => {
  return (
    <>
      <nav className="container border-b bg-white w-full h-20 flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-xl">Iconnect</h2>
        </div>
        <div className="flex items-center gap-6">
          <span>Home</span>
          <span>Features</span>
          <span>Community</span>
          <button className="font-semibold bg-red-900 text-white rounded-lg px-10 p-2">
            Login
          </button>
        </div>
      </nav>
      <section className="container h-auto w-full border-b-2">
        <div className="container flex items-center justify-between h-full mb-10 ">
          <div className="w-[500px]">
            <h2 className="font-semibold text-5xl tracking-normal">
              Lessons and insights{' '}
              <span className="text-red-900">from 8 years</span>
            </h2>
            <h3 className="my-2 text-lg">
              Where you go to grow your bussiness or social media?
            </h3>
            <button className="font-semibold my-4 bg-red-900 text-white rounded-lg px-10 p-3">
              Register
            </button>
          </div>
          <div className="w-[300px] h-[300px] my-12">
            <img
              src="https://www.hrcloud.com/hs-fs/hubfs/3-May-06-2021-05-58-17-43-AM.png?width=350&name=3-May-06-2021-05-58-17-43-AM.png"
              className="w-full h-full bg-cover"
              alt="bg-image"
            />
          </div>
        </div>
      </section>
      <section className="w-screen h-full">
        <div className="flex justify-center my-6">
          <h2 className="font-semibold text-3xl">Our Clients</h2>
          <p></p>
        </div>
      </section>
    </>
  );
};

export default IConnect;
