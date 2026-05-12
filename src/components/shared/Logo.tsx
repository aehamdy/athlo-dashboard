import Heading from './Heading';

type LogoProps = {
  dark?: boolean;
};

function Logo({ dark = false }: LogoProps) {
  return (
    <Heading
      as="h2"
      className={`${dark ? 'text-dark' : 'text-light'} text-4xl lg:text-3xl`}
    >
      ATHLO.
    </Heading>
  );
}

export default Logo;
