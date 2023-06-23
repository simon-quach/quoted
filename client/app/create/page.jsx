import CreateForm from "@/components/CreateForm";

const Create = () => {
  return (
    <main className="min-h-[calc(100vh-65px)] py-[48px] px-[24px] bg-[#FAFAFA]">
      <div className="text-[16px] bg-gradient-to-r from-[#5B53FF] to-[#A35BFF] bg-clip-text text-transparent font-bold">
        CREATE
      </div>
      <div className="text-[32px] font-bold">Upload New Quote</div>
      <div className="text-[16px] text-[#656565] font-medium w-[80%]">
        Enter your favorite quote and publish it to the community
      </div>

      <div className="mt-[32px]">
        <CreateForm />
      </div>
    </main>
  );
};

export default Create;
