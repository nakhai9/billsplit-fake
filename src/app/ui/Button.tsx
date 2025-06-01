type ButtonProps = {
  type?: "button" | "submit" | "reset";
  text: string;
};

const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ type = "button", text = "Submit" }) => {
  return (
    <button
      type={type}
      className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded text-white transition-colors"
    >
      {text}
    </button>
  );
};

export default Button;
