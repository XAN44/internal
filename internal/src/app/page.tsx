import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="hero h-screen w-screen bg-gradient-to-r from-blue-500 to-blue-400 text-white overflow-hidden flex items-center justify-center">
      <div className="hero-content flex flex-col lg:flex-row-reverse w-full lg:w-4/5 p-6 lg:p-12">
        <div className="w-full lg:w-1/2">
          <Image
            alt="Training Portal Image"
            width={960}
            height={960}
            src="/website.svg"
            className="max-w-full h-auto rounded-lg  "
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center lg:pl-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Welcome to Our Training Portal!
          </h1>
          <p className="text-lg lg:text-xl mb-6 leading-relaxed">
            At our platform, we offer a wide range of courses designed to help
            employees enhance their skills and advance their careers. Whether
            you're interested in improving your soft skills, mastering hard
            skills, or learning how to use new software tools, we have something
            for everyone.
          </p>
          <Link href="/auth/sign-in">
            <button className="btn btn-primary py-3 px-6 text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
