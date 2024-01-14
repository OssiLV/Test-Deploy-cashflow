import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="absolute top-[0%] left-[6%] lg:top-[8%] lg:left-[8%]">
            {children}
        </div>
    );
}
