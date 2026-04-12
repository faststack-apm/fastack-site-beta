import { useState } from "react";
import DomainDefinitionPanel from "./DomainDefinitionPanel";
import FinalSetupPanel from "./FinalSetupPanel";
import HttpServerSetupPanel from "./HttpServerSetupPanel";
import IntroPanel from "./IntroPanel";
import LogUploadPanel from "./LogUploadPanel";
import UsageProfilePanel from "./UsageProfilePanel";
import { StepProgress } from "@/components/ui/step-progress";
import { Button } from "@/components/ui/button";


const enum WebAnalyticsOnboardingStep {
    Welcome = 1,
    Domains = 2,
    HttpServerSetup = 3,
    LogUpload = 4,
    UsageProfile = 5,
    Finalizing = 6,
}

/**
 * 
 * WebAnalyticsOnboardingPanel
 * 
 * Presented when a user first visits the web analytics page. Provides a guided experience to help the user get started with web analytics.
 * 
 */
const WebAnalyticsOnboardingPanel = () => {

    const [currentStep, setCurrentStep] = useState(WebAnalyticsOnboardingStep.Welcome);

    const advanceNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const retreatPreviousStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const revertState = () => {
        setCurrentStep(WebAnalyticsOnboardingStep.Welcome);
    }

    return (
        <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-transparent pointer-events-none" />
            <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-16">

                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                            Web Analytics
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Onboarding process
                        </p>
                    </div>
                </div>

            </div>

            <div className="p-8 rounded-xl">
                <StepProgress
                    steps={[
                        "Welcome",
                        "Domains",
                        "Http Server Setup",
                        "Log Upload",
                        "Usage Profile",
                        "Finalizing",
                    ]}
                    currentStep={currentStep - 1}
                />
            </div>

            {currentStep === WebAnalyticsOnboardingStep.Welcome && (
                <IntroPanel onContinue={advanceNextStep} onPrevious={retreatPreviousStep} />
            )}

            {currentStep === WebAnalyticsOnboardingStep.Domains && (
                <DomainDefinitionPanel onContinue={advanceNextStep} onPrevious={retreatPreviousStep} />
            )}

            {currentStep === WebAnalyticsOnboardingStep.HttpServerSetup && (
                <HttpServerSetupPanel onContinue={advanceNextStep} onPrevious={retreatPreviousStep} />
            )}

            {currentStep === WebAnalyticsOnboardingStep.LogUpload && (
                <LogUploadPanel onContinue={advanceNextStep} onPrevious={retreatPreviousStep} />
            )}

            {currentStep === WebAnalyticsOnboardingStep.UsageProfile && (
                <UsageProfilePanel onContinue={advanceNextStep} onPrevious={retreatPreviousStep} />
            )}

            {currentStep === WebAnalyticsOnboardingStep.Finalizing && (
                <FinalSetupPanel onContinue={advanceNextStep} />
            )}

            <div>
                <Button onClick={revertState}>Revert State</Button>
            </div>


        </div >
    );
};

export default WebAnalyticsOnboardingPanel;