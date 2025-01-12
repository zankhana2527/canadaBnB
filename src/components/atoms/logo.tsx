import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex flex-row items-center">
      <img src={logo} width={68} height={48} />
      <p
        data-testid="logo-name"
        className="font-medium text-xl text-red-700 mt-1"
      >
        CanadaBnB
      </p>
    </div>
  );
};

export default Logo;
