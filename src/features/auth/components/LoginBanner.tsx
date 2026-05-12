import AppImage from '@/components/shared/AppImage';
import loginBanner from '../../../assets/images/auth/login-page.webp';
import Logo from '@/components/shared/Logo';

function LoginBanner() {
  return (
    <div className="relative h-full rounded-e-3xl overflow-hidden">
      <div className="w-full h-full overflow-hidden">
        <AppImage
          src={loginBanner}
          alt="Login page banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-accent/5" />

      {/* Content */}
      <div className="absolute top-0 start-0 w-full h-dvh z-10">
        <div className="flex flex-col justify-between h-full p-8 text-white">
          <Logo />

          <div className="space-y-sm">
            <h2 className="text-3xl font-semibold">
              Control Everything in One Place
            </h2>

            <p className="text-sm text-white/80">
              Manage operations, insights, and growth with ease.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginBanner;
