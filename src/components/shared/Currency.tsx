type CurrencyProps = {
  className?: string;
  symbol?: boolean;
};

function Currency({ className, symbol }: CurrencyProps) {
  return (
    <span className={`${className} text-xs`}>{symbol ? 'E£' : 'EGP'}</span>
  );
}

export default Currency;
