import { getEnabledProviders } from "@/lib/auth-providers";
import RegisterForm from "./RegisterForm";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  const enabledProviders = getEnabledProviders();
  return <RegisterForm enabledProviders={enabledProviders} />;
}
