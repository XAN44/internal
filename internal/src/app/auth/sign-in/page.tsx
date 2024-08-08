import Image from "next/image";

export default function Page() {
  return (
    <div
      className="
    relative 
    flex
    md:flex-col
    md:w-screen

    xsm:flex-col 
    lg:flex-row 
    xsm:h-screen 
    xsm:w-screen 
    xsm:items-center 
    xsm:justify-center 
    xsm:overflow-hidden
    lg:overflow-hidden
     
     ">
      <div
        className="
        relative
        xsm:-top-[190px] 
        xsm:mx-auto 
        xsm:absolute 
        xsm:h-[400px] 
        xsm:w-[600px] 
        xsm:rounded-b-full 
        
        xsm:bg-gradient-to-br 
      xsm:from-blue-500/90 
      xsm:to-purple-500/100 
        lg:absolute
        lg:rounded-tr-full
        lg:overflow-hidden
        lg:h-[1666px]
        lg:w-[1600px]
        lg:flex
        lg:transform
        lg:top-1/2
        lg:-translate-x-[790px]
        lg:-translate-y-1/2
        ">
        <Image
          src="/vannessLogo.png"
          alt="Vannes Plus"
          width={100}
          height={100}
          className="
          xsm:absolute
          xsm:right-16
          xsm:top-[200px] 
          lg:top-1/2
          xsm:z-10 
          xsm:-translate-x-[100px] 
          sm:-translate-x-[70px]
          md:-translate-x-[70px]
          
          xsm:w-20
          xsm:-translate-y-[2px] 
          xsm:transform xsm:brightness-0 xsm:invert xsm:filter

          lg:hidden
          
          "
        />
        <Image
          src="/headImg.png"
          alt="Vannes Plus"
          width={1075}
          height={400}
          quality={100}
          className="
          xsm:absolute 
          xsm:left-0 xsm:right-0 
          xsm:top-[360px] 
          xsm:z-50 xsm:mx-auto 
          xsm:flex 
          xsm:h-60 w-60 
          xsm:-translate-y-[100px] xsm:transform

          lg:absolute
          lg:w-[400px]
          lg:h-[400px]
          xl:w-[500px]
          xl:h-[500px]
          2xl:w-[500px]
          2xl:h-[500px]
          3xl:w-[600px]
          3xl:h-[600px]
          4xl:w-[600px]
          4xl:h-[600px]

          lg:top-1/2
          lg:transform
          lg:translate-x-[580px]
          xl:translate-x-[530px]
          2xl:translate-x-[430px]
          3xl:translate-x-[400px]
          4xl:translate-x-[350px]
          lg:-translate-y-1/2
          "
        />
      </div>
      <div className="relative">SADASD</div>
    </div>
  );
}
