import Image from "next/image";

export default function Page() {
  return (
    <div
      className=" 
    relative 
    w-screen h-screen 
    overflow-hidden 
    flex 
    lg:flex-row
    xsm:flex-col
  ">
      {/* Left Card */}
      <div
        className="
    flex items-center justify-center
    lg:flex-1
    lg:h-full
    lg:w-full
     ">
        <div
          className="
     
      relative
      xsm:absolute
      xsm:rounded-b-full
      xsm:top-0
      xsm:transform
      xsm:w-[760px]
      xsm:h-[500px]
      xsm:-translate-y-[270px]

    
      lg:absolute
      lg:top-1/2
      lg:rounded-full
      lg:w-[2000px]
      lg:h-[2000px]
      lg:transform
      lg:-translate-y-1/2
      lg:-translate-x-[800px]
      
      xl:-translate-x-[700px]

      2xl:-translate-x-[600px]

      3xl:-translate-x-[500px]

      4xl:-translate-x-[400px]
      
      bg-gradient-to-br
      xsm:from-blue-500/90 
      xsm:to-purple-500/100 
        ">
          <Image
            src="/vannessLogo.png"
            alt="Vannes Plus"
            quality={100}
            width={100}
            height={100}
            className="
          xsm:absolute
          xsm:right-16
          xsm:top-[200px] 
          lg:top-1/2
          xsm:z-10 
          xsm:-translate-x-[180px] 
          sm:-translate-x-[150px]
          md:-translate-x-[150px]
          
          xsm:w-20
          xsm:translate-y-[100px] 
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
              xsm:h-72 w-72 
              xsm:-translate-y-[10px] xsm:transform

              lg:absolute
              lg:w-[400px]
              lg:h-[400px]
              xl:w-[500px]
              xl:h-[500px]
              2xl:w-[600px]
              2xl:h-[600px]
              3xl:w-[700px]
              3xl:h-[700px]
              4xl:w-[800px]
              4xl:h-[800px]

              lg:top-1/2
              lg:transform
              lg:translate-x-[800px]
              xl:translate-x-[700px]
              2xl:translate-x-[600px]
              3xl:translate-x-[500px]
              4xl:translate-x-[450px]
              lg:-translate-y-1/2
          "
          />
        </div>
      </div>
      {/* Right Card */}
      <div
        className="
        flex-1
        flex
        lg:items-center
        lg:justify-center

        xsm:items-start
        xsm:justify-center
        z-50">
        TEST
      </div>
    </div>
  );
}
