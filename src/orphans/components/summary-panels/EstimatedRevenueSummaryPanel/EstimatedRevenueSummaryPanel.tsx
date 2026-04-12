import { MetricCard } from "@/components/MetricCard/MetricCard";
import { PanelAction } from "@/components/PanelActions/PanelActions";
import { PanelErrorState } from "@/components/PanelErrorState/PanelErrorState";
import { PanelLoadingState } from "@/components/PanelLoadingState/PanelLoadingState";
import { getCustomerSummary, getEstimatedRevenueSummary, getSupportTicketSummary } from "@/lib/services/control-panel-summary.service";
import { useQuery } from "@tanstack/react-query";
import { DollarSign, Users } from "lucide-react";


interface Props {
    onHidePanel: () => void;
    onViewDetails: () => void;
    metricCardActions: PanelAction[];
}

export default function EstimatedRevenueSummaryPanel({ onHidePanel, onViewDetails, metricCardActions }: Props) {

    const { data, isLoading, error } = useQuery({
        queryKey: ["estimated-revenue-summary"],
        queryFn: getEstimatedRevenueSummary,
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
                label="Estimated Revenue"
                value="$854.7k"
                change={{ value: "+8.3%", type: "positive" }}
                icon={<DollarSign className="w-6 h-6" />}
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