import { useRef } from "react";

const VerifyEmail = () => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = inputRefs.current
      .map((ref) => {
        console.log(ref?.value);
        return ref?.value;
      })
      .join("");
    console.log("Verification Code:", verificationCode);
    // Perform further operations with the verification code
  };
  return (
    <>
      <h2 className="capitalize text-3xl font-bold text-center min-[375px]:p-3 min-[375px]:text-center ">
        Please verify your email
      </h2>
      <div className="w-[350px] flex flex-col items-start text-center justify-start ">
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          <p className="text-gray-500 mb-4">
            A verification link has been sent to your email address. Please
            verify.
          </p>
          <p className="text-gray-500 mb-4">Verified?</p>
          <button className="bg-blue-500 w-32 mx-auto text-white py-2 px-4 rounded-md">
            Back to Login
          </button>
        </form>
      </div>
    </>
  );
};

export default VerifyEmail;
