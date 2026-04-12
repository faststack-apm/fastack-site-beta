import { Cluster } from "@/vo/infrastructure/cluster";
import { randomDelay } from "./common";
import { FIVE_SECONDS, ONE_SECOND, TEN_SECONDS, THREE_SECONDS } from "../constants/time.constants";
import { FederationActor } from "@/vo/infrastructure/federation-actor";
import { MemberUI } from "@/vo/infrastructure/member-ui";
import { BillingAgent } from "@/vo/infrastructure/billing-agent";
import { MemberApi } from "@/vo/infrastructure/member-api";

const mockClusters: Array<Cluster> = [
    {
        id: 1,
        name: "Cluster 1",
        description: "Cluster 1 description",
        createdAt: new Date(),
        updatedAt: new Date(),
        customerConfigS: [],
        messagingServers: [],
        otelCollectorAgents: [],
        memberUI: new MemberUI(),
        memberApi: new MemberApi(),
        billingAgent: new BillingAgent(),
        dbServers: [],
        messageServers: [
            {
                name: "message-server-1",
                dnsName: "message-server-1.faststack.cloud",
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ],
        metricIntakeAgents: [],
    },

];

export const getClusters = () => {
    return randomDelay(ONE_SECOND, THREE_SECONDS, mockClusters);
}

export const getClusterById = (id: number) => {
    const sel = mockClusters.find((cluster) => cluster.id === id);

    return randomDelay(FIVE_SECONDS, TEN_SECONDS, sel);
}

export const addCluster = (cluster: Cluster) => {
    return randomDelay(FIVE_SECONDS, TEN_SECONDS, cluster);
}

export const updateCluster = (cluster: Cluster) => {
    return randomDelay(FIVE_SECONDS, TEN_SECONDS, cluster);
}
