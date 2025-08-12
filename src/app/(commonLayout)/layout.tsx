import { Navbar } from "@/components/shared/Navbar";

const commonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default commonLayout;
