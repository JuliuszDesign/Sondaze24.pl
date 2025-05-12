import React from "react";

interface HeaderProps {
  siteName: string;
}

export const Header: React.FC<HeaderProps> = ({ siteName }) => {
  return (
    <header className="items-stretch border-b-[color:var(--UI-Colors-Muted-Lilac,#D6CEE4)] flex min-h-14 w-full flex-col justify-center bg-white px-4 py-3 border-b border-solid">
      <div className="justify-between items-center border-[color:var(--UI-Colors-Snow-White,#FFF)] flex w-full gap-[40px_100px] flex-1 h-full bg-white border-0 border-solid">
        <div className="text-[#2C2233] text-base leading-[24px)]">
          {siteName}
        </div>
        <div className="items-center border-[color:var(--UI-Colors-Snow-White,#FFF)] self-stretch flex gap-2.5 w-[30px] bg-white my-auto p-2 border-0 border-solid">
          <div className="items-stretch border-[color:var(--UI-Colors-Snow-White,#FFF)] self-stretch flex w-full flex-col overflow-hidden justify-center flex-1 shrink basis-[0%] bg-white my-auto py-0.5 border-0 border-solid">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/8205ddd08bac4b4aaddeda162d0cd29f/06620203a073e6270ba7635ae0aa771c95f3e2cd?placeholderIfAbsent=true"
              className="aspect-[1.17] object-contain w-3.5 fill-[#2C2233]"
              alt="Navigation icon"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
