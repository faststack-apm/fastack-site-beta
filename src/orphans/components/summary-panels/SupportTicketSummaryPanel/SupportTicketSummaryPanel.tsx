import { MetricCard } from "@/components/MetricCard/MetricCard";
import { PanelAction } from "@/components/PanelActions/PanelActions";
import { PanelErrorState } from "@/components/PanelErrorState/PanelErrorState";
import { PanelLoadingState } from "@/components/PanelLoadingState/PanelLoadingState";
import { getCustomerSummary, getSupportTicketSummary } from "@/lib/services/control-panel-summary.service";
import { useQuery } from "@tanstack/react-query";
import { MessageSquare, Users } from "lucide-react";

interface Props {
    onHidePanel: () => void;
    onViewDetails: () => void;
    metricCardActions: PanelAction[];
}

export default function SupportTicketSummaryPanel({ onHidePanel, onViewDetails, metricCardActions }: Props) {

    const { data, isLoading, error } = useQuery({
        queryKey: ["support-ticket-summary"],
        queryFn: getSupportTicketSummary,
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
                label="Support tickets"
                value="100"
                change={{ value: "+10", type: "positive" }}
                icon={<MessageSquare className="w-6 h-6" />}
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