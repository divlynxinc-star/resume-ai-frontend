import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import {
  LandingPageScreen,
  Dashboard,
  ResumeBuilderScreen,
  TemplatesScreen,
  TailoringScreen,
  PricingScreen,
  NotFound,
  AccountManagementScreen,
  InterviewScreen,
  AIChatModal,
  Signup,
  SubscriptionScreen,
  PaymentSuccessScreen,
  TermsOfServiceScreen,
  PrivacyPolicyScreen,
  HelpCenterScreen,
  MyResumesScreen,
  UserDetailsScreen,
  DocumentationScreen,
  FAQScreen,
  CookiePolicyScreen,
  SecurityScreen,
  ContactUsModal,
  LoginScreen,
  OnboardingScreen,
  EnterpriseScreen,
} from "./components";

const routes: Record<string, ComponentType<any>> = {
  home: LandingPageScreen,
  dashboard: Dashboard,
  resumes: ResumeBuilderScreen,
  templates: TemplatesScreen,
  tailoring: TailoringScreen, // AI Tools
  pricing: PricingScreen,
  subscribe: SubscriptionScreen,
  success: PaymentSuccessScreen,
  account: AccountManagementScreen,
  interview: InterviewScreen,
  "ai-chat": AIChatModal,
  signup: Signup,
  login: LoginScreen,
  onboarding: OnboardingScreen,
  terms: TermsOfServiceScreen,
  privacy: PrivacyPolicyScreen,
  "help-center": HelpCenterScreen,
  "my-resumes": MyResumesScreen,
  "user-details": UserDetailsScreen,
  documentation: DocumentationScreen,
  faq: FAQScreen,
  "cookie-policy": CookiePolicyScreen,
  security: SecurityScreen,
  "contact-us": ContactUsModal,
  enterprise: EnterpriseScreen,
};

function getRoute(): string {
  const hash = window.location.hash.replace(/^#/, "");
  return hash || "home";
}

export default function App() {
  const [route, setRoute] = useState<string>(getRoute());

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Scroll to top whenever route changes (footer navigation included)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [route]);

  const Screen = routes[route] || NotFound || LandingPageScreen;
  return <Screen />;
}
