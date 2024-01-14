import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="absolute top-[15%] left-[10%] lg:left-[40%] ">
            {children}
        </div>
    );
}
