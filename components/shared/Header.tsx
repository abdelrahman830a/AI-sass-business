import React from "react";

const Header = ({
  title = "Imaginative Service",
  subtitle = "here you can get innovative",
}: {
  title: string;
  subtitle?: string;
}) => {
  return (
    <>
      <h2 className="h2-bold text-dark-600">{title}</h2>
      {subtitle && <p className="p-16-regular mt-4">{subtitle}</p>}
    </>
  );
};

export default Header;
