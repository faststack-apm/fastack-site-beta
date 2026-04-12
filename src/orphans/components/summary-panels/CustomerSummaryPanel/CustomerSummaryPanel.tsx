import { MetricCard } from "@/components/MetricCard/MetricCard";
import { PanelAction } from "@/components/PanelActions/PanelActions";
import { PanelErrorState } from "@/components/PanelErrorState/PanelErrorState";
import { PanelLoadingState } from "@/components/PanelLoadingState/PanelLoadingState";
import { getCustomerSummary } from "@/lib/services/control-panel-summary.service";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";

interface Props {
    onHidePanel: () => void;
    onViewDetails: () => void;
    metricCardActions: PanelAction[];
}

export default function CustomerSummaryPanel({ onHidePanel, onViewDetails, metricCardActions }: Props) {

    const { data, isLoading, error } = useQuery({
        queryKey: ["customer-summary"],
        queryFn: getCustomerSummary,
    });

    const getContent = () => {

        if (error) {
            return (
                <PanelErrorState />
            )
        }

        if (isLoading) {
            return (
                <PanelLoadingState />
            )
        }

        return (

            <MetricCard
                label="Customer Count"
                value="1,855"
                change={{ value: "+12.5%", type: "positive" }}
                icon={<Users className="w-6 h-6" />}
                subtitle="Last 7 days"
                panelActions={metricCardActions}
                onHidePanel={onHidePanel}
                onViewDetails={onViewDetails}

            />
        )

    }

    return (
        <>
            {getContent()}
        </>
    )
}