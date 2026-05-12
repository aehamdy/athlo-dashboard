import LoginBanner from '../components/LoginBanner';
import LoginCard from '../components/LoginCard';

function Login() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-dvh bg-light-muted">
      <section className="hidden lg:block lg:h-dvh">
        <LoginBanner />
      </section>

      <section className="grid place-items-center">
        <div className="w-9/10 lg:w-7/10">
          <LoginCard />
        </div>
      </section>
    </section>
  );
}

export default Login;
