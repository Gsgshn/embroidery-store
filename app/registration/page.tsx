import RegistrationForm from "@/components/ui/registration-form"

export default function Page(){

    return(
        <main className="flex mt-[5%] justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[800px] flex-col space-y-2.5 p-4 ">
               
               
                <RegistrationForm/>
               
            </div>
        </main>
    )
}