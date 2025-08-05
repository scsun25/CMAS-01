import { Button } from "primereact/button";
import { Card } from "primereact/card";

import { useAuth } from "../../context/authProvider";

const LoginPage: React.FC = () => {
  const { signIn } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await signIn();
    } catch (err: any) {
      console.log(err.message || "Google sign-in failed");
    }
    console.log("Google sign-in successful");
  };

  return (
    <Card>
      <div className="std-layout">
        {/* <InputText
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full"
        />
        <Password
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          toggleMask
          feedback={false}
          className="w-full"
          inputClassName="w-full"
        />
        <Button
          label="Sign In"
          className="w-full"
          onClick={handleEmailLogin}
          disabled={!(email.length > 0 && password.length > 0)}
        /> */}
        <Button
          outlined
          label="Sign in with Google"
          className="w-full"
          onClick={handleGoogleLogin}
        />
      </div>
    </Card>
  );
};

export default LoginPage;
