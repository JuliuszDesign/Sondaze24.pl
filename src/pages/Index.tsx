import React from "react";
import HomePresidentialView from "@/components/presidential/HomePresidentialView";

const Index: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#EEEAF3] flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-[#2C2233] mb-8 text-center">
        Presidential Poll Visualization
      </h1>
      <HomePresidentialView />
    </main>
  );
};

export default Index;
